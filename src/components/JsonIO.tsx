import { ChangeEvent } from 'react';
import { ProjectData } from '../types';

type Props = {
  project: ProjectData;
  onLoad: (project: ProjectData) => void;
};

export const JsonIO = ({ project, onLoad }: Props) => {
  const save = () => {
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diy-structure-project.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const load = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const parsed = JSON.parse(text) as ProjectData;

    if (parsed.version && parsed.unit === 'mm' && Array.isArray(parsed.parts)) {
      onLoad(parsed);
    } else {
      alert('無効なJSON形式です。');
    }

    event.target.value = '';
  };

  return (
    <section className="panel">
      <h2>JSON 保存 / 読込</h2>
      <div className="actions-row">
        <button type="button" onClick={save}>JSON保存</button>
        <label className="file-input">
          JSON読込
          <input type="file" accept="application/json" onChange={load} />
        </label>
      </div>
    </section>
  );
};
