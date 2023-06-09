import { FarmService } from '@modules/farm/farm.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { GetAllResponseDto } from 'dto';
import { ParamIdDto } from 'dto/paramId.dto';
import { ICreate, IGetAll, IGetOne } from 'interface';
import { Model } from 'mongoose';
import { Pond, PondDocument } from 'schema/pond.schema';
import { GetAllPondQueryDto, GetOnePondResponseDto } from './dto';
import { PondCreateBodyDto } from './dto/create-body.dto';
import { extname } from 'path';
import { UploadService } from 'shared/services/upload.service';
import { unlink, unlinkSync } from 'fs';
import { PondImage, PondImageDocument } from 'schema/pond-image.schema';

@Injectable()
export class PondService
  implements
    IGetAll<GetAllPondQueryDto, GetAllResponseDto<GetOnePondResponseDto>>,
    IGetOne<GetOnePondResponseDto>,
    ICreate<PondCreateBodyDto>
{
  @InjectModel(Pond.name)
  private readonly pondModel: Model<PondDocument>;

  @InjectModel(PondImage.name)
  private readonly pondImageModel: Model<PondImageDocument>;

  @Inject()
  private readonly farmService: FarmService;

  @Inject()
  private readonly uploadService: UploadService;

  async getAll(
    query: GetAllPondQueryDto,
  ): Promise<GetAllResponseDto<GetOnePondResponseDto>> {
    const { skip, limit } = query;
    const [data, count] = await Promise.all([
      this.pondModel.find({ skip, limit }),
      this.pondModel.countDocuments(),
    ]);

    return plainToInstance(GetAllResponseDto<GetOnePondResponseDto>, {
      count,
      data,
    });
  }

  async create(payload: PondCreateBodyDto): Promise<any> {
    const { name, farm, dimensions, larvaCount, startFarming } = payload;
    await this.farmService.getOrThrowError(farm);
    return await this.pondModel.create({
      farm,
      name,
      dimensions,
      larvaCount,
      density: 0, // TODO: calculate density
      startFarming,
    });
  }

  async getOne(params: ParamIdDto): Promise<GetOnePondResponseDto> {
    const pond = await this.pondModel.findOne({ _id: params.id });
    if (!pond || pond.deleted) {
      throw new NotFoundException('استخری با این شناسه یافت نشد.');
    }
    // const pond = await this.getOrThrowError(params.id);
    return plainToInstance(GetOnePondResponseDto, pond, {
      excludeExtraneousValues: true,
    });
  }

  async update(params: ParamIdDto, payload: PondCreateBodyDto): Promise<void> {
    const pond = await this.getOrThrowError(params.id);
    const { name, dimensions } = payload;

    pond.name = name;
    pond.dimensions = dimensions;

    await pond.save();
  }

  async delete(params: ParamIdDto): Promise<void> {
    const pond = await this.getOrThrowError(params.id);
    pond.deleted = true;
    pond.deletedAt = new Date();
    await pond.save();
  }

  async getOrThrowError(id: string): Promise<PondDocument> {
    const pond = await this.pondModel.findOne(
      { _id: id },
      {},
      { populate: 'farm' },
    );

    if (!pond || pond.deleted) {
      throw new NotFoundException('استخری با این شناسه یافت نشد.');
    }
    return pond;
  }

  async addImage(payload: any, file) {
    try {
      const result = await this.uploadService.uploadFile(file.path);
      if (result.$metadata.httpStatusCode !== 200) {
        throw new Error('upload was not successful.');
      }

      await this.pondImageModel.create({
        pond: payload.pondId,
        type: payload.type,
        file: `${process.env.ARVAN_S3_BASE_URL}${file.filename}`,
        createdAt: payload.createdAt,
      });

      return {
        file: `${process.env.ARVAN_S3_BASE_URL}${file.filename}`,
      };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    } finally {
      unlinkSync(file.path);
    }
  }

  static editFileName(req, file, callback) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  }

  static imageFilter(req, file, callback) {
    const fileTypes = PondService.fileAcceptType().join('|');
    const regex = new RegExp(`\\.(${fileTypes})$`, 'i');
    if (!file.originalname.match(regex)) {
      return callback(
        new BadRequestException('فایل مورد نظر معتبر نمی باشد!'),
        false,
      );
    }
    callback(null, true);
  }

  static fileAcceptType(): string[] {
    return ['jpg', 'jpe', 'jpeg', 'jpe', 'png', 'gif'];
  }

  static fileSizeLimitation(): number {
    return 3; // 3 MB
  }
}
