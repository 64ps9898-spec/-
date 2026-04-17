import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Part } from '../types';
import { getMaterialById } from '../data/materials';

type Props = {
  parts: Part[];
  selectedPartId: string | null;
  onSelectPart: (id: string) => void;
};

const scale = 0.001;

export const ThreeScene = ({ parts, selectedPartId, onSelectPart }: Props) => {
  return (
    <div className="scene-wrapper">
      <Canvas camera={{ position: [2.2, 1.8, 2.2], fov: 50 }}>
        <color attach="background" args={['#f4f6fb']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 2]} intensity={0.8} />
        <gridHelper args={[10, 20, '#7a7a7a', '#bfbfbf']} />
        <axesHelper args={[1]} />

        {parts.map((part) => {
          const material = getMaterialById(part.materialId);
          const selected = part.id === selectedPartId;
          return (
            <mesh
              key={part.id}
              position={[part.positionMm.x * scale, part.positionMm.y * scale, part.positionMm.z * scale]}
              rotation={[
                (part.rotationDeg.x * Math.PI) / 180,
                (part.rotationDeg.y * Math.PI) / 180,
                (part.rotationDeg.z * Math.PI) / 180,
              ]}
              onClick={(event) => {
                event.stopPropagation();
                onSelectPart(part.id);
              }}
            >
              <boxGeometry args={[part.sizeMm.x * scale, part.sizeMm.y * scale, part.sizeMm.z * scale]} />
              <meshStandardMaterial color={selected ? '#ff7f50' : material?.color ?? '#8fa'} />
            </mesh>
          );
        })}

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};
