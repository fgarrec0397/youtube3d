/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 C:\Users\fgarr\Documents\lab\youtube3d\apps\admin\public\assets\hub6.glb --types 
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube014: THREE.Mesh
    Cube015: THREE.Mesh
    Cube016: THREE.Mesh
    Mesh: THREE.Mesh
    Mesh_1: THREE.Mesh
    Cylinder: THREE.Mesh
    Cube017: THREE.Mesh
    Cube059: THREE.Mesh
    Cube059_1: THREE.Mesh
    Cube019: THREE.Mesh
    Cube020: THREE.Mesh
    Cube007: THREE.Mesh
    Cube007_1: THREE.Mesh
    Cube022: THREE.Mesh
    Cube023: THREE.Mesh
    Cube024: THREE.Mesh
    Neon002: THREE.Mesh
    Neon003: THREE.Mesh
    Cube025: THREE.Mesh
    Cube026: THREE.Mesh
    Cube027: THREE.Mesh
    Cube028: THREE.Mesh
    Cube029: THREE.Mesh
    Cube030: THREE.Mesh
    Cube031: THREE.Mesh
    Cube032: THREE.Mesh
    Cube033: THREE.Mesh
    Cube034: THREE.Mesh
    Cube035: THREE.Mesh
  }
  materials: {
    ['Marble.010']: THREE.MeshStandardMaterial
    ['Marble.011']: THREE.MeshStandardMaterial
    ['Marble.012']: THREE.MeshStandardMaterial
    ['01 - Default']: THREE.MeshStandardMaterial
    Marble: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Glowing red']: THREE.MeshStandardMaterial
    ['Marble.003']: THREE.MeshStandardMaterial
    ['Marble.013']: THREE.MeshStandardMaterial
    ['Glowing red.001']: THREE.MeshStandardMaterial
    ['Marble.014']: THREE.MeshStandardMaterial
    ['Marble.015']: THREE.MeshStandardMaterial
    ['Neon.002']: THREE.MeshStandardMaterial
    ['Neon.003']: THREE.MeshStandardMaterial
    ['Marble.016']: THREE.MeshStandardMaterial
    ['Plain.001']: THREE.MeshStandardMaterial
    ['Marble.017']: THREE.MeshStandardMaterial
    ['Marble.018']: THREE.MeshStandardMaterial
    ['black concrete.001']: THREE.MeshStandardMaterial
    ['black concrete.009']: THREE.MeshStandardMaterial
    ['black concrete.010']: THREE.MeshStandardMaterial
    ['black concrete.011']: THREE.MeshStandardMaterial
    ['black concrete.012']: THREE.MeshStandardMaterial
    ['black concrete.013']: THREE.MeshStandardMaterial
    ['Marble.019']: THREE.MeshStandardMaterial
  }
}

type ActionName = 'DoorAction'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/hub6.glb') as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Area" position={[-24.029, 8.43, 36.2]} rotation={[-1.207, -0.124, -0.088]} />
        <group name="Area001" position={[19.306, 8.43, 36.2]} rotation={[-1.207, -0.124, -0.088]} />
        <spotLight name="Point" intensity={62775.882} angle={0.888} penumbra={1} decay={2} distance={44.17} position={[33.937, 15.617, 69.599]} rotation={[-0.568, 0.839, -0.486]}>
          <group position={[0, 0, -1]} />
        </spotLight>
        <spotLight name="Point001_1" intensity={54351.413} angle={0.888} penumbra={1} decay={2} distance={51.36} position={[-33.792, 15.617, 72.43]} rotation={[-0.38, -0.457, -0.698]}>
          <group position={[0, 0, -1]} />
        </spotLight>
        <spotLight name="Point002_1" intensity={54351.413} angle={0.888} penumbra={1} decay={2} position={[-11.791, 15.617, 35.969]} rotation={[-2.7, 0.055, -2.568]}>
          <group position={[0, 0, -1]} />
        </spotLight>
        <spotLight name="Point003_1" intensity={54351.413} angle={0.888} penumbra={1} decay={2} distance={40} position={[18.935, 15.617, 31.427]} rotation={[-2.672, 0.096, 1.282]}>
          <group position={[0, 0, -1]} />
        </spotLight>
        <spotLight name="Point004_1" intensity={61563.843} angle={0.487} penumbra={1} decay={2} distance={40} position={[0.615, 15.617, 65.369]} rotation={[-1.586, 0.007, 1.28]}>
          <group position={[0, 0, -1]} />
        </spotLight>
        <mesh name="Cube014" geometry={nodes.Cube014.geometry} material={materials['Marble.010']} position={[0.179, -10.489, 52.093]} rotation={[Math.PI / 2, 0, 0]} scale={[1.562, 1.289, 349.822]} />
        <mesh name="Cube015" geometry={nodes.Cube015.geometry} material={materials['Marble.011']} position={[0.413, 9.328, 73.466]} rotation={[Math.PI, 0, Math.PI / 2]} scale={[9.368, 37.699, 0.03]} />
        <mesh name="Cube016" geometry={nodes.Cube016.geometry} material={materials['Marble.012']} position={[0.413, 9.328, 30.761]} rotation={[Math.PI, 0, Math.PI / 2]} scale={[9.368, 37.699, 0.348]} />
        <group name="Door" position={[0.407, 4.033, 17.965]} rotation={[Math.PI / 2, 0, 0]} scale={[0.006, 0.003, 0.009]}>
          <mesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials['01 - Default']} />
          <mesh name="Mesh_1" geometry={nodes.Mesh_1.geometry} material={materials.Marble} />
        </group>
        <mesh name="Cylinder" geometry={nodes.Cylinder.geometry} material={materials['Material.002']} position={[-0.142, -11.196, 66.04]} />
        <mesh name="Cube017" geometry={nodes.Cube017.geometry} material={materials.Marble} position={[-24.625, 0.439, 32.192]} />
        <group name="Cube018" position={[-22.733, 0.439, 40.025]}>
          <mesh name="Cube059" geometry={nodes.Cube059.geometry} material={materials['Glowing red']} />
          <mesh name="Cube059_1" geometry={nodes.Cube059_1.geometry} material={materials.Marble} />
        </group>
        <mesh name="Cube019" geometry={nodes.Cube019.geometry} material={materials['Marble.003']} position={[0.413, 19.004, 52.209]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={[-21.804, -37.699, -0.339]} />
        <mesh name="Cube020" geometry={nodes.Cube020.geometry} material={materials['Marble.013']} position={[-36.938, 9.328, 52.206]} rotation={[-Math.PI / 2, -Math.PI / 2, 0]} scale={[-9.368, -22.057, -0.379]} />
        <group name="Cube021" position={[22.869, 0.439, 40.025]} rotation={[-Math.PI, 0, 0]} scale={-1}>
          <mesh name="Cube007" geometry={nodes.Cube007.geometry} material={materials['Glowing red.001']} />
          <mesh name="Cube007_1" geometry={nodes.Cube007_1.geometry} material={materials['Marble.014']} />
        </group>
        <mesh name="Cube022" geometry={nodes.Cube022.geometry} material={materials['Marble.014']} position={[24.761, 0.439, 32.192]} rotation={[-Math.PI, 0, 0]} scale={-1} />
        <mesh name="Cube023" geometry={nodes.Cube023.geometry} material={materials['Marble.015']} position={[37.153, 9.328, 52.206]} rotation={[-Math.PI / 2, -Math.PI / 2, 0]} scale={[-9.368, -22.057, -0.379]} />
        <mesh name="Cube024" geometry={nodes.Cube024.geometry} material={materials.Marble} position={[-21.702, 8.97, 35.821]} scale={[1.144, 1, 1]} />
        <mesh name="Neon002" geometry={nodes.Neon002.geometry} material={materials['Neon.002']} position={[3.346, 7.289, 24.857]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[-0.066, -5.961, -0.065]} />
        <mesh name="Neon003" geometry={nodes.Neon003.geometry} material={materials['Neon.003']} position={[-3.619, 7.289, 24.857]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[-0.066, -5.961, -0.065]} />
        <mesh name="Cube025" geometry={nodes.Cube025.geometry} material={materials['Marble.016']} position={[-4.896, 3.708, 24.859]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={[1, 0.36, 40.262]} />
        <mesh name="Cube026" geometry={nodes.Cube026.geometry} material={materials['Plain.001']} position={[0, 7.377, 24.859]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.36, 1]} />
        <mesh name="Cube027" geometry={nodes.Cube027.geometry} material={materials['Marble.017']} position={[-0.304, 0, 24.859]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.36, 1]} />
        <mesh name="Cube028" geometry={nodes.Cube028.geometry} material={materials['Marble.018']} position={[4.616, 3.708, 24.859]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={[1, 0.36, 40.262]} />
        <mesh name="Cube029" geometry={nodes.Cube029.geometry} material={materials['black concrete.001']} position={[-30.04, 13.285, 31.221]} rotation={[0, Math.PI / 2, 0]} scale={2.193} />
        <mesh name="Cube030" geometry={nodes.Cube030.geometry} material={materials['black concrete.009']} position={[-21.492, 13.285, 31.221]} rotation={[0, Math.PI / 2, 0]} scale={2.193} />
        <mesh name="Cube031" geometry={nodes.Cube031.geometry} material={materials['black concrete.010']} position={[-12.945, 13.285, 31.221]} rotation={[0, Math.PI / 2, 0]} scale={2.193} />
        <mesh name="Cube032" geometry={nodes.Cube032.geometry} material={materials['black concrete.011']} position={[30.39, 13.285, 31.221]} rotation={[0, Math.PI / 2, 0]} scale={2.193} />
        <mesh name="Cube033" geometry={nodes.Cube033.geometry} material={materials['black concrete.012']} position={[21.843, 13.285, 31.221]} rotation={[0, Math.PI / 2, 0]} scale={2.193} />
        <mesh name="Cube034" geometry={nodes.Cube034.geometry} material={materials['black concrete.013']} position={[13.295, 13.285, 31.221]} rotation={[0, Math.PI / 2, 0]} scale={2.193} />
        <mesh name="Cube035" geometry={nodes.Cube035.geometry} material={materials['Marble.019']} position={[21.633, 8.97, 35.821]} scale={[1.144, 1, 1]} />
      </group>
    </group>
  )
}

useGLTF.preload('/hub6.glb')
