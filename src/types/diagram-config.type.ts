export type BaseDiagramConfig = {
  yMin: number;
  yMax: number;
  frameNumber: number;
};

export type SensorDataDiagramConfig = BaseDiagramConfig & {
  idealMin: number;
  idealMax: number;
  normalMin: number;
  normalMax: number;
};

export type SamplingDiagramConfig = BaseDiagramConfig & {
  fcrIdeal: number;
  fcrNormal: number;
};

export type MortalityDiagramConfig = BaseDiagramConfig & {
  ideal: number;
  normal: number;
};
