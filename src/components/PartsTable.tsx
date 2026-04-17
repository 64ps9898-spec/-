import { getMaterialById } from '../data/materials';
import { Part } from '../types';
import { mm } from '../lib/format';

type Props = {
  parts: Part[];
  selectedPartId: string | null;
  onSelectPart: (id: string) => void;
};

export const PartsTable = ({ parts, selectedPartId, onSelectPart }: Props) => {
  return (
    <section className="panel">
      <h2>部材表</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>部材名</th>
              <th>材料</th>
              <th>寸法 (X×Y×Z)</th>
              <th>数量</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr
                key={part.id}
                className={part.id === selectedPartId ? 'selected' : ''}
                onClick={() => onSelectPart(part.id)}
              >
                <td>{part.name}</td>
                <td>{getMaterialById(part.materialId)?.name ?? '-'}</td>
                <td>{`${mm(part.sizeMm.x)} × ${mm(part.sizeMm.y)} × ${mm(part.sizeMm.z)}`}</td>
                <td>{part.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
