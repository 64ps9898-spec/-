import { Part } from '../types';

type Props = {
  part: Part | null;
  onUpdate: (part: Part) => void;
  onDelete: (id: string) => void;
};

type NumericField = 'x' | 'y' | 'z';

const numberValue = (raw: string): number => {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const PartInspector = ({ part, onUpdate, onDelete }: Props) => {
  if (!part) {
    return (
      <section className="panel">
        <h2>寸法/位置/回転 編集</h2>
        <p>3Dビューまたは部材表で部材を選択してください。</p>
      </section>
    );
  }

  const updateSize = (axis: NumericField, value: string) => {
    onUpdate({ ...part, sizeMm: { ...part.sizeMm, [axis]: Math.max(0.1, numberValue(value)) } });
  };

  const updatePosition = (axis: NumericField, value: string) => {
    onUpdate({ ...part, positionMm: { ...part.positionMm, [axis]: numberValue(value) } });
  };

  const updateRotation = (axis: NumericField, value: string) => {
    onUpdate({ ...part, rotationDeg: { ...part.rotationDeg, [axis]: numberValue(value) } });
  };

  return (
    <section className="panel">
      <h2>寸法/位置/回転 編集</h2>
      <label>
        部材名
        <input value={part.name} onChange={(e) => onUpdate({ ...part, name: e.target.value })} />
      </label>

      <h3>寸法 (mm)</h3>
      <div className="triple-grid">
        <label>X <input type="number" value={part.sizeMm.x} onChange={(e) => updateSize('x', e.target.value)} /></label>
        <label>Y <input type="number" value={part.sizeMm.y} onChange={(e) => updateSize('y', e.target.value)} /></label>
        <label>Z <input type="number" value={part.sizeMm.z} onChange={(e) => updateSize('z', e.target.value)} /></label>
      </div>

      <h3>位置 (mm)</h3>
      <div className="triple-grid">
        <label>X <input type="number" value={part.positionMm.x} onChange={(e) => updatePosition('x', e.target.value)} /></label>
        <label>Y <input type="number" value={part.positionMm.y} onChange={(e) => updatePosition('y', e.target.value)} /></label>
        <label>Z <input type="number" value={part.positionMm.z} onChange={(e) => updatePosition('z', e.target.value)} /></label>
      </div>

      <h3>回転 (deg)</h3>
      <div className="triple-grid">
        <label>X <input type="number" value={part.rotationDeg.x} onChange={(e) => updateRotation('x', e.target.value)} /></label>
        <label>Y <input type="number" value={part.rotationDeg.y} onChange={(e) => updateRotation('y', e.target.value)} /></label>
        <label>Z <input type="number" value={part.rotationDeg.z} onChange={(e) => updateRotation('z', e.target.value)} /></label>
      </div>

      <label>
        数量
        <input
          type="number"
          min={1}
          value={part.quantity}
          onChange={(e) => onUpdate({ ...part, quantity: Math.max(1, Math.round(numberValue(e.target.value))) })}
        />
      </label>

      <button type="button" className="danger" onClick={() => onDelete(part.id)}>
        選択部材を削除
      </button>
    </section>
  );
};
