import { describe, expect, it } from 'vitest';
import { sanitizeProjectData } from '../projectSanitizer';

describe('sanitizeProjectData', () => {
  it('欠損フィールドを補正して取り込める', () => {
    const raw = {
      parts: [
        {
          name: 'A',
          materialId: '',
          sizeMm: { x: 'bad', y: 10, z: 20 },
        },
      ],
    };

    const project = sanitizeProjectData(raw);

    expect(project).not.toBeNull();
    expect(project?.parts).toHaveLength(1);
    expect(project?.parts[0].materialId).toBe('plywood');
    expect(project?.parts[0].sizeMm.x).toBe(100);
    expect(project?.parts[0].sizeMm.y).toBe(10);
  });
});
