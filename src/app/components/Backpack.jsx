'use client'
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import styles from '../../styles/Backpack.module.css';

export default function Backpack() {
  const [model, setModel] = useState(null);
  const [textureState, setTextureState] = useState(null);
  const textureLoader = new THREE.TextureLoader();
  const [meshColor, setMeshColor] = useState(0x7f4f24);
  const [meshTexture, setMeshTexture] = useState('leather');
  const [mesh1Metall, setMesh1Metall] = useState(0xc0c0c0);
  const [isPopup, setIsPopup] = useState(false);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const textures = {
        denim_texture: {
          baseColor: textureLoader.load('/textures/denim_baseColor.jpg'),
          normal: textureLoader.load('/textures/denim_normal.jpg'),
          occlusion: textureLoader.load(
            '/textures/denim_occlusionRoughnessMetallic.jpg',
          ),
        },
          fabric_texture: {
            baseColor: textureLoader.load('/textures/fabric_baseColor.jpg'),
            normal: textureLoader.load('/textures/fabric_normal.jpg'),
            occlusion: textureLoader.load(
              '/textures/fabric_occlusionRoughnessMetallic.jpg',
            ),
          },
          leather_texture: {
            baseColor: textureLoader.load('/textures/leather_baseColor.jpg'),
            normal: textureLoader.load('/textures/leather_normal.jpg'),
            occlusion: textureLoader.load(
              '/textures/leather_occlusionRoughnessMetallic.jpg',
            ),
          },
          metall_texture: {
            baseColor: textureLoader.load('/textures/metall_baseColor.jpg'),
            normal: textureLoader.load('/textures/metall_normal.jpg'),
            occlusion: textureLoader.load(
              '/textures/metall_occlusionRoughnessMetallic.jpg',
            ),
        },
        strap_texture: {
          baseColor: textureLoader.load('/textures/strap_baseColor.jpg'),
          normal: textureLoader.load('/textures/strap_normal.jpg'),
          occlusion: textureLoader.load(
            '/textures/strap_occlusionRoughnessMetallic.jpg',
          ),
        },
      };
      setTextureState(textures)
    }
  },[])
  
  useEffect(() => {
    const loadModel = () => {
      const loader = new GLTFLoader();
      loader.load('/models/backpack.glb', (glb) => {
        setModel(glb.scene);
        
      });
    };

    loadModel();
  }, []);

  useEffect(() => {
    if (model) {
      model.traverse((child) => {
        if (child.name === 'Mesh') {
        const selectedTexture = textureState[`${meshTexture}_texture`];
        if (!selectedTexture) return;
          
          child.material.color.set(meshColor);
          child.material.map = selectedTexture.baseColor;
          child.material.normalMap = selectedTexture.normal;
          child.material.aoMap = selectedTexture.occlusion;
          child.material.aoMapIntensity = 0.1;
          child.material.roughness = 0.4;
          child.material.metalness = 0.5;

          if (meshColor === 0x7f4f24) {
              child.material.emissive = new THREE.Color(0x000000);
              child.material.emissiveIntensity = 0.5;
              child.material.needsUpdate = true;
          } else if (meshColor === 0x1e3d58) {
              child.material.emissive = new THREE.Color(0x0a1d30);
              child.material.emissiveIntensity = 0.05;
          } else if (meshColor === 0x2a2a2a) {
              child.material.emissive = new THREE.Color(0x333333);
              child.material.emissiveIntensity = 0.5;
          }

          if (meshTexture === 'denim') {
            child.material.roughness = 0.8;
            child.material.metalness = 0;
            child.material.normalScale.set(1.2, 1.2);
            child.material.emissive = new THREE.Color(0x000000);
            child.material.emissiveIntensity = 0;
        } else if (meshTexture === 'fabric') {
            child.material.roughness = 1;
            child.material.metalness = 0;
            child.material.normalScale.set(1.5, 1.5);
            child.material.emissive = new THREE.Color(0x000000);
            child.material.emissiveIntensity = 0;
        } else if (meshTexture === 'leather') {
            child.material.roughness = 0.4;
            child.material.metalness = 0.5;
        }
		  } else if (child.name === 'Mesh_1') {
        child.material.map = textureState.metall_texture.baseColor;
        child.material.normalMap = textureState.metall_texture.normal;
        child.material.aoMap = textureState.metall_texture.occlusion;
        child.material.color.set(mesh1Metall);
          
          if (mesh1Metall === 0xc0c0c0) {
            child.material.metalness = 1;
            child.material.roughness = 0.4;
          } else if (mesh1Metall === 0xffd700) {
            child.material.metalness = 1;
            child.material.roughness = 0.3;
          } else if (mesh1Metall === 0x3d3d3d) {
            child.material.metalness = 1;
            child.material.roughness = 0.5;
          }

        child.material.aoMapIntensity = 1;
        child.material.needsUpdate = true;
		  } else if (child.name === 'Mesh_2') {
        child.material.map = textureState.strap_texture.baseColor;
        child.material.normalMap = textureState.strap_texture.normal;
        child.material.aoMap = textureState.strap_texture.occlusion;
        child.material.color.set(meshColor);
        child.material.aoMapIntensity = 0.1;
        child.material.needsUpdate = true;
		  }
      });
    }
  }, [model,textureState, meshColor, meshTexture, mesh1Metall]);

  const handleColorChange = (newColor) => {
    setMeshColor(newColor);
  };

  const handleTextureChange = (newTexture) => {
    setMeshTexture(newTexture);
  };

  const handleColorMetall = (newColor) => {
    setMesh1Metall(newColor);
  };

  const toggleSettingsVisibility = () => {
    setIsPopup(!isPopup);
  };

  return (
    <div className={styles.container}>
      {isPopup === false
        ? <Image
          src='/images/backpack.jpg'
          className={styles.thumbnail}
          width={400}
          height={400}
          alt='backpack-logo'
        />
        : (
          <>
          <Canvas camera={{ position: [0, 0.5, 2.5], fov: 10 }} className={styles.canvas}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[8, 15, 8]} intensity={1.2} castShadow />
          <directionalLight position={[-8, 15, -8]} intensity={1.2} castShadow />
          <pointLight position={[0, -5, 0]} intensity={1} />
          <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={0.8} />

          {model && <primitive object={model} scale={[0.3, 0.3, 0.3]} />}
          <OrbitControls />
          </Canvas>
            <div className={styles.controls}>
            <div>
              <p>Выберите цвет:</p>
              <button className={styles.button} onClick={() => handleColorChange(0x7f4f24)}>Коричневый</button>
              <button className={styles.button} onClick={() => handleColorChange(0x1e3d58)}>Синий</button>
              <button className={styles.button} onClick={() => handleColorChange(0x2a2a2a)}>Черный</button>
            </div>
            <div>
              <p>Выберите текстуру:</p>
              <button className={styles.button} onClick={() => handleTextureChange('leather')}>Кожа</button>
              <button className={styles.button} onClick={() => handleTextureChange('denim')}>Деним</button>
              <button className={styles.button} onClick={() => handleTextureChange('fabric')}>Ткань</button>
            </div>
            <div>
              <p>Выберите цвет замка:</p>
              <button className={styles.button} onClick={() => handleColorMetall(0xc0c0c0)}>Serebro</button>
              <button className={styles.button} onClick={() => handleColorMetall(0xffd700)}>Gold</button>
              <button className={styles.button} onClick={() => handleColorMetall(0x3d3d3d)}>Black Metall</button>
            </div>
            </div>
          </>
      )}

      <button className={styles.openSettingsButton} onClick={toggleSettingsVisibility}>
        Открыть в 3D
      </button>

    </div>
  );
}
