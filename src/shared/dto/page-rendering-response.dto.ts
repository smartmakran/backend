import { Expose } from 'class-transformer';

export class PageRenderingResponseDto {
  @Expose()
  title: string;

  @Expose()
  script: string;
}
