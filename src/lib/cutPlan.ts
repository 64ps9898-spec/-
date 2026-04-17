import { getMaterialById } from '../data/materials';
import { Part } from '../types';

export type CutPlanItem = {
  materialName: string;
  count: number;
  totalLengthM: number;
  totalAreaM2: number;
  estimatedSheets: number;
};

export const buildCutPlan = (parts: Part[]): CutPlanItem[] => {
  const map = new Map<string, CutPlanItem>();

  for (const part of parts) {
    const material = getMaterialById(part.materialId);
    if (!material) continue;

    const key = material.id;
    const current = map.get(key) ?? {
      materialName: material.name,
      count: 0,
      totalLengthM: 0,
      totalAreaM2: 0,
      estimatedSheets: 0,
    };

    const qty = Math.max(1, part.quantity);
    current.count += qty;

    if (material.kind === 'lumber' || material.kind === 'metal') {
      current.totalLengthM += (part.sizeMm.z * qty) / 1000;
    } else {
      current.totalAreaM2 += ((part.sizeMm.x * part.sizeMm.z) * qty) / 1_000_000;

      if (material.sheetSizeMm) {
        const sheetAreaM2 = (material.sheetSizeMm.x * material.sheetSizeMm.y) / 1_000_000;
        current.estimatedSheets = Math.ceil(current.totalAreaM2 / sheetAreaM2);
      }
    }

    map.set(key, current);
  }

  return Array.from(map.values()).sort((a, b) => a.materialName.localeCompare(b.materialName, 'ja'));
};
