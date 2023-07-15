import { FarmService } from '@modules/farm/farm.service';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { ParamIdDto } from 'dto/paramId.dto';
import { ICreate, IGetAll, IGetOne } from 'interface';
import { Model } from 'mongoose';
import { Pond, PondDocument } from 'schema/pond.schema';
import {
  GetAllPondQueryDto,
  GetAllPondsResponseDto,
  GetOnePondResponseDto,
} from './dto';
import { PondCreateBodyDto } from './dto/create-body.dto';
import { extname } from 'path';
import { UploadService } from 'shared/services/upload.service';
import { unlink, unlinkSync } from 'fs';
import { PondImage, PondImageDocument } from 'schema/pond-image.schema';
import { AddImageBodyDto } from './dto/add-image-body.dto';
import { CreateDiagramConfigBodyDto } from './dto/create-diagram-config-body.dto';
import {
  DiagramConfig,
  DiagramConfigDocument,
} from 'schema/diagram-config.schema';
import { SensorService } from '@modules/sensor/sensor.service';
import { UpdateDiagramConfigBodyDto } from './dto/update-diagram-config-body.dto';
import { Sampling, SamplingDocument } from 'schema/sampling.schema';
import { Feeding, FeedingDocument } from 'schema/feeding.schema';
import { Transparency, TransparencyDocument } from 'schema/transparency.schema';
import { Fatality, FatalityDocument } from 'schema/fatality.schema';

@Injectable()
export class PondService
  implements
    IGetAll<GetAllPondQueryDto, GetAllPondsResponseDto>,
    IGetOne<GetOnePondResponseDto>,
    ICreate<PondCreateBodyDto>
{
  @InjectModel(Pond.name)
  private readonly pondModel: Model<PondDocument>;

  @InjectModel(PondImage.name)
  private readonly pondImageModel: Model<PondImageDocument>;

  @InjectModel(DiagramConfig.name)
  private readonly diagramConfigModel: Model<DiagramConfigDocument>;

  @InjectModel(Sampling.name)
  private readonly samplingModel: Model<SamplingDocument>;

  @InjectModel(Feeding.name)
  private readonly feedingModel: Model<FeedingDocument>;

  @InjectModel(Transparency.name)
  private readonly transparencyModel: Model<TransparencyDocument>;

  @InjectModel(Fatality.name)
  private readonly fatalityModel: Model<FatalityDocument>;

  @Inject()
  private readonly farmService: FarmService;

  @Inject()
  private readonly uploadService: UploadService;

  @Inject()
  private readonly sensorService: SensorService;

  async getAll(query: GetAllPondQueryDto): Promise<GetAllPondsResponseDto> {
    const { skip, limit } = query;
    const [data, count] = await Promise.all([
      this.pondModel.find({ skip, limit }),
      this.pondModel.countDocuments(),
    ]);

    return plainToInstance(
      GetAllPondsResponseDto,
      {
        count,
        data,
      },
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      },
    );
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
    const pond = await this.pondModel.findOne({ _id: params.id }).lean();
    if (!pond || pond.deleted) {
      throw new NotFoundException('استخری با این شناسه یافت نشد.');
    }

    const diagramConfig = await this.diagramConfigModel.findOne({ pond });
    const sensorData = await this.sensorService.getSensorDataByPondId(pond._id);
    const samplingData = await this.samplingModel.find({ pond });
    const feedingData = await this.feedingModel.find({ pond });
    const transparencyData = await this.transparencyModel.find({ pond });
    const fatalityData = await this.fatalityModel.find({ pond });

    console.log({
      ...pond,
      diagramConfig,
      sensorData,
      samplingData,
      feedingData,
      transparencyData,
      fatalityData,
    });

    return plainToInstance(
      GetOnePondResponseDto,
      {
        ...pond,
        diagramConfig,
        sensorData,
        samplingData,
        feedingData,
        transparencyData,
        fatalityData,
      },
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      },
    );
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

  async addImage(payload: AddImageBodyDto) {
    let result = null;
    try {
      result = await this.uploadService.uploadBase64File(payload.file);
    } catch (e) {
      throw new InternalServerErrorException('upload was not successful.');
    }

    try {
      await this.pondImageModel.create({
        pond: payload.pondId,
        type: payload.type,
        file: `${process.env.ARVAN_S3_BASE_URL}${result.fileName}`,
        createdAt: payload.createdAt,
      });

      return {
        file: `${process.env.ARVAN_S3_BASE_URL}${result.fileName}`,
      };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async createDiagramConfig(
    params: ParamIdDto,
    payload: CreateDiagramConfigBodyDto,
  ) {
    const pond = await this.getOrThrowError(params.id);

    const diagramConfig = await this.diagramConfigModel.findOne({ pond });
    if (diagramConfig) {
      throw new ConflictException('There is a diagram config for this pond!');
    }

    await this.diagramConfigModel.create({
      pond,
      ph: payload.ph,
      oxygen: payload.oxygen,
      orp: payload.orp,
      ec: payload.ec,
      ammonia: payload.ammonia,
      nitrite: payload.nitrite,
      nitrate: payload.nitrate,
      temperature: payload.temperature,
      transparency: payload.transparency,
      sampling: payload.sampling,
      feeding: payload.feeding,
      changingWater: payload.changingWater,
      mortality: payload.mortality,
    });
  }

  async updateDiagramConfig(
    params: ParamIdDto,
    payload: UpdateDiagramConfigBodyDto,
  ) {
    const pond = await this.getOrThrowError(params.id);

    const diagramConfig = await this.diagramConfigModel.findOne({ pond });
    if (!diagramConfig) {
      throw new NotFoundException();
    }

    await this.diagramConfigModel.updateOne(
      { _id: diagramConfig._id },
      {
        pond,
        ph: payload.ph || diagramConfig.ph,
        oxygen: payload.oxygen || diagramConfig.oxygen,
        orp: payload.orp || diagramConfig.orp,
        ec: payload.ec || diagramConfig.ec,
        ammonia: payload.ammonia || diagramConfig.ammonia,
        nitrite: payload.nitrite || diagramConfig.nitrite,
        nitrate: payload.nitrate || diagramConfig.nitrate,
        temperature: payload.temperature || diagramConfig.temperature,
        transparency: payload.transparency || diagramConfig.transparency,
        sampling: payload.sampling || diagramConfig.sampling,
        feeding: payload.feeding || diagramConfig.feeding,
        changingWater: payload.changingWater || diagramConfig.changingWater,
        mortality: payload.mortality || diagramConfig.mortality,
      },
    );
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
