import { ProjectData, Part } from '../types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readNumber = (value: unknown, fallback = 0): number => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const sanitizePart = (raw: unknown, index: number): Part | null => {
  if (!isRecord(raw)) return null;

  const id = typeof raw.id === 'string' && raw.id.length > 0 ? raw.id : `imported-${index}`;
  const name = typeof raw.name === 'string' && raw.name.length > 0 ? raw.name : `部材${index + 1}`;
  const materialId = typeof raw.materialId === 'string' && raw.materialId.length > 0 ? raw.materialId : 'plywood';

  const sizeMm = isRecord(raw.sizeMm) ? raw.sizeMm : {};
  const positionMm = isRecord(raw.positionMm) ? raw.positionMm : {};
  const rotationDeg = isRecord(raw.rotationDeg) ? raw.rotationDeg : {};

  return {
    id,
    name,
    materialId,
    sizeMm: {
      x: Math.max(0.1, readNumber(sizeMm.x, 100)),
      y: Math.max(0.1, readNumber(sizeMm.y, 100)),
      z: Math.max(0.1, readNumber(sizeMm.z, 100)),
    },
    positionMm: {
      x: readNumber(positionMm.x, 0),
      y: readNumber(positionMm.y, 0),
      z: readNumber(positionMm.z, 0),
    },
    rotationDeg: {
      x: readNumber(rotationDeg.x, 0),
      y: readNumber(rotationDeg.y, 0),
      z: readNumber(rotationDeg.z, 0),
    },
    quantity: Math.max(1, Math.round(readNumber(raw.quantity, 1))),
  };
};

export const sanitizeProjectData = (raw: unknown): ProjectData | null => {
  if (!isRecord(raw)) return null;

  const partsRaw = Array.isArray(raw.parts) ? raw.parts : [];
  const parts = partsRaw
    .map((item, index) => sanitizePart(item, index))
    .filter((part): part is Part => part !== null);

  return {
    version: typeof raw.version === 'string' ? raw.version : '0.1.0',
    unit: 'mm',
    parts,
  };
};
