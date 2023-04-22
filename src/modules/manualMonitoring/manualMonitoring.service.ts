import { PondService } from '@modules/pond/pond.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChangingWater,
  ChangingWaterDocument,
} from 'schema/changingWater.schema';
import { Feeding, FeedingDocument } from 'schema/feeding.schema';
import { Sampling, SamplingDocument } from 'schema/sampling.schema';
import { Transparency, TransparencyDocument } from 'schema/transparency.schema';

@Injectable()
export class ManualMonitoringService {
  @InjectModel(Sampling.name)
  private readonly samplingModel: Model<SamplingDocument>;

  @InjectModel(Feeding.name)
  private readonly feedingModel: Model<FeedingDocument>;

  @InjectModel(ChangingWater.name)
  private readonly changingWaterModel: Model<ChangingWaterDocument>;

  @InjectModel(Transparency.name)
  private readonly transparencyModel: Model<TransparencyDocument>;

  @Inject()
  private readonly pondService: PondService;

  async getAll(pondId: string) {
    const pond = await this.pondService.getOrThrowError(pondId);
    const sampling = await this.samplingModel
      .find({ pond })
      .sort({ createdAt: 'asc' });
    const feeding = await this.feedingModel
      .find({ pond })
      .sort({ createdAt: 'asc' });
    const changingWater = await this.changingWaterModel
      .find({ pond })
      .sort({ createdAt: 'asc' });
    const transparency = await this.transparencyModel
      .find({ pond })
      .sort({ createdAt: 'asc' });

    return { sampling, feeding, changingWater, transparency };
  }

  async createSampling(body: any): Promise<void> {
    await this.pondService.getOrThrowError(body.pond);
    await this.samplingModel.create({ ...body, averageMass: 0 });
  }

  async createFeeding(body: any): Promise<void> {
    await this.pondService.getOrThrowError(body.pond);
    await this.feedingModel.create(body);
  }

  async createChangingWater(body: any): Promise<void> {
    await this.pondService.getOrThrowError(body.pond);
    await this.changingWaterModel.create(body);
  }

  async createTransparency(body: any): Promise<void> {
    await this.pondService.getOrThrowError(body.pond);
    await this.transparencyModel.create(body);
  }
}
