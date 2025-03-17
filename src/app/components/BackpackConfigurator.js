import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function BackpackConfigurator() {
  const [model, setModel] = useState(null);
  const [material, setMaterial] = useState('leather');
  const [color, setColor] = useState('brown');
  const [furniture, setFurniture] = useState('silver');
  const [is3DView, setIs3DView] = useState(false);

  const modelRef = useRef();
  const textureLoader = new THREE.TextureLoader();
  const [textures, setTextures] = useState(null);

  const colors = {
    brown: 0x8b4513,
    black: 0x000000,
    darkBlue: 0x00008b,
  };

  const furnitureColors = {
    silver: 0xc0c0c0,
    black: 0x2f2f2f,
    gold: 0xffd700,
  };

  useEffect(() => {
    const loadTextures = () => {
      setTextures({
        denim: {
          baseColor: textureLoader.load('/models/denim_baseColor.jpg'),
          normal: textureLoader.load('/models/denim_normal.jpg'),
          roughness: textureLoader.load('/models/denim_occlusionRoughnessMetallic.jpg'),
        },
        fabric: {
          baseColor: textureLoader.load('/models/fabric_baseColor.jpg'),
          normal: textureLoader.load('/models/fabric_normal.jpg'),
          roughness: textureLoader.load('/models/fabric_occlusionRoughnessMetallic.jpg'),
        },
        leather: {
          baseColor: textureLoader.load('/models/leather_baseColor.jpg'),
          normal: textureLoader.load('/models/leather_normal.jpg'),
          roughness: textureLoader.load('/models/leather_occlusionRoughnessMetallic.jpg'),
        },
      });
    };

    const loader = new GLTFLoader();
    loader.load('/models/backpack.glb', (gltf) => {
      setModel(gltf.scene);
      modelRef.current = gltf.scene;
    });

    loadTextures();
  }, []);

  useEffect(() => {
    if (!modelRef.current || !textures) return;

    modelRef.current.traverse((child) => {
      if (child.isMesh) {
        if (child.name.includes('Mesh_2')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures[material].baseColor,
            normalMap: textures[material].normal,
            roughnessMap: textures[material].roughness,
            roughness: 0.6,
            metalness: 0.1,
          });
          child.material.color.set(colors[color]); // Устанавливаем цвет
        }
        if (child.name.includes('Mesh_1')) {
          child.material = new THREE.MeshStandardMaterial({
            color: furnitureColors[furniture],
            metalness: 1,
            roughness: 0.3,
          });
        }
      }
    });
  }, [material, color, furniture, textures]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {!is3DView ? (
        <div 
          style={{ width: '300px', height: '400px', background: `url('/images/backpack.jpg') center/cover`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          onClick={() => setIs3DView(true)}
        >
          <p style={{ color: 'white', fontSize: '20px', background: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px' }}>Посмотреть в 3D</p>
        </div>
      ) : (
        <>
          <Canvas camera={{ position: [0, 1, 2.5], fov: 50 }} style={{ height: '500px', width: '100%' }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} />
            {model && <primitive object={model} scale={[0.3, 0.3, 0.3]} />}
            <OrbitControls />
          </Canvas>
          <button onClick={() => setIs3DView(false)} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Закрыть 3D</button>
          <div style={{ marginTop: '10px' }}>
            <p>Материал:</p>
            {['denim', 'fabric', 'leather'].map((mat) => (
              <button key={mat} onClick={() => setMaterial(mat)} style={{ margin: '5px', padding: '10px', background: mat === material ? 'gray' : 'white' }}>{mat}</button>
            ))}
          </div>
          <div>
            <p>Цвет:</p>
            {Object.keys(colors).map((col) => (
              <button key={col} onClick={() => setColor(col)} style={{ margin: '5px', padding: '10px', background: col === color ? `#${colors[col].toString(16)}` : 'white' }}>{col}</button>
            ))}
          </div>
          <div>
            <p>Фурнитура:</p>
            {Object.keys(furnitureColors).map((furn) => (
              <button key={furn} onClick={() => setFurniture(furn)} style={{ margin: '5px', padding: '10px', background: furn === furniture ? `#${furnitureColors[furn].toString(16)}` : 'white' }}>{furn}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
