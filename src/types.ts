export type MaterialKind = 'panel' | 'lumber' | 'block' | 'metal' | 'sheet';

export type Material = {
  id: string;
  name: string;
  kind: MaterialKind;
  color: string;
  defaultSizeMm: {
    x: number;
    y: number;
    z: number;
  };
  sheetSizeMm?: {
    x: number;
    y: number;
  };
};

export type Vector3Mm = {
  x: number;
  y: number;
  z: number;
};

export type Part = {
  id: string;
  name: string;
  materialId: string;
  sizeMm: Vector3Mm;
  positionMm: Vector3Mm;
  rotationDeg: Vector3Mm;
  quantity: number;
};

export type ProjectData = {
  version: string;
  unit: 'mm';
  parts: Part[];
};
