import { Material } from '../types';

export const MATERIAL_LIBRARY: Material[] = [
  { id: 'plywood', name: '合板', kind: 'panel', color: '#d9b382', defaultSizeMm: { x: 910, y: 12, z: 1820 }, sheetSizeMm: { x: 910, y: 1820 } },
  { id: 'veneer', name: 'ベニヤ', kind: 'panel', color: '#c8a97e', defaultSizeMm: { x: 910, y: 5.5, z: 1820 }, sheetSizeMm: { x: 910, y: 1820 } },
  { id: 'osb', name: 'OSB', kind: 'panel', color: '#b88d5b', defaultSizeMm: { x: 910, y: 9, z: 1820 }, sheetSizeMm: { x: 910, y: 1820 } },
  { id: 'mdf', name: 'MDF', kind: 'panel', color: '#d0b38d', defaultSizeMm: { x: 910, y: 12, z: 1820 }, sheetSizeMm: { x: 910, y: 1820 } },
  { id: 'particle-board', name: 'パーティクルボード', kind: 'panel', color: '#be9a72', defaultSizeMm: { x: 910, y: 15, z: 1820 }, sheetSizeMm: { x: 910, y: 1820 } },
  { id: 'polycarbonate-flat', name: 'ポリカ平板', kind: 'sheet', color: '#a7d8ff', defaultSizeMm: { x: 910, y: 4, z: 1820 }, sheetSizeMm: { x: 910, y: 1820 } },
  { id: 'calcium-silicate', name: 'ケイカル板', kind: 'panel', color: '#ecebe7', defaultSizeMm: { x: 910, y: 6, z: 1820 }, sheetSizeMm: { x: 910, y: 1820 } },
  { id: '1x4', name: '1x4', kind: 'lumber', color: '#b6804c', defaultSizeMm: { x: 89, y: 19, z: 1820 } },
  { id: '1x6', name: '1x6', kind: 'lumber', color: '#b67945', defaultSizeMm: { x: 140, y: 19, z: 1820 } },
  { id: '2x4', name: '2x4', kind: 'lumber', color: '#ad7241', defaultSizeMm: { x: 89, y: 38, z: 1820 } },
  { id: '2x6', name: '2x6', kind: 'lumber', color: '#a56938', defaultSizeMm: { x: 140, y: 38, z: 1820 } },
  { id: '2x8', name: '2x8', kind: 'lumber', color: '#9f6534', defaultSizeMm: { x: 184, y: 38, z: 1820 } },
  { id: 'square-timber', name: '角材', kind: 'lumber', color: '#8f5d34', defaultSizeMm: { x: 45, y: 45, z: 1820 } },
  { id: 'nofuchi', name: '野縁', kind: 'lumber', color: '#9f764e', defaultSizeMm: { x: 45, y: 36, z: 1820 } },
  { id: 'cedar-board', name: '杉板', kind: 'lumber', color: '#c68f64', defaultSizeMm: { x: 120, y: 12, z: 1820 } },
  { id: 'concrete-block', name: 'コンクリートブロック', kind: 'block', color: '#9b9b9b', defaultSizeMm: { x: 390, y: 190, z: 100 } },
  { id: 'half-block', name: '半ブロック', kind: 'block', color: '#a7a7a7', defaultSizeMm: { x: 190, y: 190, z: 100 } },
  { id: 'flat-block', name: '平板', kind: 'block', color: '#b4b4b4', defaultSizeMm: { x: 390, y: 60, z: 100 } },
  { id: 'angle-steel', name: 'アングル鋼', kind: 'metal', color: '#7f8c8d', defaultSizeMm: { x: 40, y: 40, z: 1820 } },
  { id: 'square-pipe', name: '角パイプ', kind: 'metal', color: '#73818a', defaultSizeMm: { x: 50, y: 50, z: 1820 } },
  { id: 'polycarbonate-wave', name: 'ポリカ波板', kind: 'sheet', color: '#9ec9ff', defaultSizeMm: { x: 655, y: 0.8, z: 1820 }, sheetSizeMm: { x: 655, y: 1820 } },
  { id: 'galvalume-wave', name: 'ガルバ波板', kind: 'sheet', color: '#8b9ea6', defaultSizeMm: { x: 650, y: 0.35, z: 1820 }, sheetSizeMm: { x: 650, y: 1820 } },
];

export const getMaterialById = (id: string): Material | undefined => MATERIAL_LIBRARY.find((m) => m.id === id);
