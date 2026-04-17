import { useMemo, useState } from 'react';
import { Part, ProjectData } from './types';
import { PartForm } from './components/PartForm';
import { PartInspector } from './components/PartInspector';
import { PartsTable } from './components/PartsTable';
import { ThreeScene } from './components/ThreeScene';
import { CutPlan } from './components/CutPlan';
import { JsonIO } from './components/JsonIO';

export const App = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  const selectedPart = useMemo(
    () => parts.find((part) => part.id === selectedPartId) ?? null,
    [parts, selectedPartId],
  );

  const addPart = (part: Part) => {
    setParts((prev) => [...prev, part]);
    setSelectedPartId(part.id);
  };

  const updatePart = (updated: Part) => {
    setParts((prev) => prev.map((part) => (part.id === updated.id ? updated : part)));
  };

  const deletePart = (id: string) => {
    setParts((prev) => prev.filter((part) => part.id !== id));
    setSelectedPartId((current) => (current === id ? null : current));
  };

  const loadProject = (project: ProjectData) => {
    setParts(project.parts);
    setSelectedPartId(project.parts[0]?.id ?? null);
  };

  const projectData: ProjectData = {
    version: '0.1.0',
    unit: 'mm',
    parts,
  };

  return (
    <div className="app-root">
      <header>
        <h1>DIY/建築 3D構造シミュレーター (MVP)</h1>
        <p>単位: mm / Windowsブラウザ対応想定 (Chrome, Edge)</p>
      </header>

      <main className="layout">
        <div className="left-column">
          <PartForm onAdd={addPart} />
          <PartInspector part={selectedPart} onUpdate={updatePart} onDelete={deletePart} />
          <JsonIO project={projectData} onLoad={loadProject} />
        </div>

        <div className="center-column">
          <ThreeScene parts={parts} selectedPartId={selectedPartId} onSelectPart={setSelectedPartId} />
        </div>

        <div className="right-column">
          <PartsTable parts={parts} selectedPartId={selectedPartId} onSelectPart={setSelectedPartId} />
          <CutPlan parts={parts} />
        </div>
      </main>
    </div>
  );
};
