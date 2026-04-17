import { Part } from '../types';
import { buildCutPlan } from '../lib/cutPlan';

type Props = {
  parts: Part[];
};

export const CutPlan = ({ parts }: Props) => {
  const items = buildCutPlan(parts);

  return (
    <section className="panel">
      <h2>簡易カット割り/集計</h2>
      {items.length === 0 ? (
        <p>部材を追加すると材料別の集計を表示します。</p>
      ) : (
        <ul className="cut-plan-list">
          {items.map((item) => (
            <li key={item.materialName}>
              <strong>{item.materialName}</strong>
              <span> 点数: {item.count}</span>
              <span> 長さ合計: {item.totalLengthM.toFixed(2)} m</span>
              <span> 面積合計: {item.totalAreaM2.toFixed(2)} ㎡</span>
              <span> 推定必要枚数: {item.estimatedSheets}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="note">※ 板材は面積ベースの概算です。厳密なネスティング最適化ではありません。</p>
    </section>
  );
};
