import { describe, expect, it } from 'vitest';
import { buildCutPlan } from '../cutPlan';

describe('buildCutPlan', () => {
  it('板材の面積と必要枚数を概算できる', () => {
    const result = buildCutPlan([
      {
        id: 'p1',
        name: '天板',
        materialId: 'plywood',
        sizeMm: { x: 910, y: 12, z: 910 },
        positionMm: { x: 0, y: 0, z: 0 },
        rotationDeg: { x: 0, y: 0, z: 0 },
        quantity: 2,
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].materialName).toBe('合板');
    expect(result[0].totalAreaM2).toBeCloseTo(1.6562, 4);
    expect(result[0].estimatedSheets).toBe(1);
  });

  it('木材の長さを集計できる', () => {
    const result = buildCutPlan([
      {
        id: 'l1',
        name: '脚',
        materialId: '2x4',
        sizeMm: { x: 89, y: 38, z: 1000 },
        positionMm: { x: 0, y: 0, z: 0 },
        rotationDeg: { x: 0, y: 0, z: 0 },
        quantity: 4,
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].materialName).toBe('2x4');
    expect(result[0].totalLengthM).toBe(4);
    expect(result[0].estimatedSheets).toBe(0);
  });
});
