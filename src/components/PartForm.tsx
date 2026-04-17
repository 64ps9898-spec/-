import { useMemo, useState } from 'react';
import { MATERIAL_LIBRARY } from '../data/materials';
import { Part } from '../types';
import { v4 as uuid } from 'uuid';

type Props = {
  onAdd: (part: Part) => void;
};

export const PartForm = ({ onAdd }: Props) => {
  const [materialId, setMaterialId] = useState(MATERIAL_LIBRARY[0].id);
  const [name, setName] = useState('新規部材');

  const selectedMaterial = useMemo(
    () => MATERIAL_LIBRARY.find((material) => material.id === materialId) ?? MATERIAL_LIBRARY[0],
    [materialId],
  );

  const addPart = () => {
    onAdd({
      id: uuid(),
      name,
      materialId: selectedMaterial.id,
      sizeMm: { ...selectedMaterial.defaultSizeMm },
      positionMm: { x: 0, y: selectedMaterial.defaultSizeMm.y / 2, z: 0 },
      rotationDeg: { x: 0, y: 0, z: 0 },
      quantity: 1,
    });
  };

  return (
    <section className="panel">
      <h2>部材追加</h2>
      <label>
        部材名
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        材料
        <select value={materialId} onChange={(e) => setMaterialId(e.target.value)}>
          {MATERIAL_LIBRARY.map((material) => (
            <option key={material.id} value={material.id}>
              {material.name}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={addPart}>
        追加
      </button>
    </section>
  );
};
