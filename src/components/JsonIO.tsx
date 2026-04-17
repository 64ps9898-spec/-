import { ChangeEvent, useState } from 'react';
import { ProjectData } from '../types';
import { sanitizeProjectData } from '../lib/projectSanitizer';

type Props = {
  project: ProjectData;
  onLoad: (project: ProjectData) => void;
};

export const JsonIO = ({ project, onLoad }: Props) => {
  const [message, setMessage] = useState<string>('');

  const save = () => {
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diy-structure-project.json';
    a.click();
    URL.revokeObjectURL(url);
    setMessage('JSONを保存しました。');
  };

  const load = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      const sanitized = sanitizeProjectData(parsed);

      if (!sanitized) {
        setMessage('無効なJSON形式です。');
      } else {
        onLoad(sanitized);
        setMessage('JSONを読込しました。');
      }
    } catch {
      setMessage('JSONの解析に失敗しました。形式を確認してください。');
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
      {message && <p className="note">{message}</p>}
    </section>
  );
};
