import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import * as THREE from "three";

export function SkateModel(props) {
  const { nodes, materials } = useGLTF("/skate_parts.gltf");
  const uvMap = useLoader(THREE.TextureLoader, "/uv_map.png");
  const colorMap = useLoader(
    THREE.TextureLoader,
    "/skate_DefaultMaterial_BaseColor.png"
  );

  if (materials.Material.map) {
    materials.Material.map.encoding = THREE.sRGBEncoding;
  }
  if (uvMap) {
    uvMap.flipY = false;
    uvMap.encoding = THREE.sRGBEncoding;
  }
  if (colorMap) {
    colorMap.flipY = false;
    colorMap.encoding = THREE.sRGBEncoding;
  }

  // Matériau flat
  // const flatMaterial = new THREE.MeshBasicMaterial({ map: uvMap });

  // // Matériau original (copie pour ne pas casser l’original)
  // const originalMaterial = materials.Material.clone();

  // Sauvegarde des maps d’origine pour pouvoir les restaurer
  // const originalMaps = {
  //   map: materials.Material.map,
  //   normalMap: materials.Material.normalMap,
  //   roughnessMap: materials.Material.roughnessMap,
  //   metalnessMap: materials.Material.metalnessMap,
  //   displacementMap: materials.Material.displacementMap,
  // };

  const rootRef = useRef();

  //Wheels
  const wheelRefBL = useRef();
  const wheelRefBR = useRef();
  const wheelRefTL = useRef();
  const wheelRefTR = useRef();

  //Wheels Bolts
  const wheelBoltRefBL = useRef();
  const wheelBoltRefBR = useRef();
  const wheelBoltRefTL = useRef();
  const wheelBoltRefTR = useRef();

  //Bearings
  const bearing01RefBL = useRef();
  const bearing02RefBL = useRef();
  const bearing01RefBR = useRef();
  const bearing02RefBR = useRef();
  const bearing01RefTL = useRef();
  const bearing02RefTL = useRef();
  const bearing01RefTR = useRef();
  const bearing02RefTR = useRef();

  const tl = useRef();

  // useHelper(wheelRefBR, THREE.BoxHelper);

  useGSAP(() => {
    if (!rootRef.current) return;

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper", // un conteneur qui englobe toutes tes sections
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
      },
    });

    tl.current
      //MAIN ROOT ANIMATION
      .to(rootRef.current.position, { x: 0, y: 0, z: -0.5 }, "section2")
      .to(
        rootRef.current.rotation,
        { y: -Math.PI * 0.3, z: +Math.PI * 0.8 },
        "section2"
      )
      .to(rootRef.current.position, { z: 1.25 }, "section3")
      .to(rootRef.current.rotation, { y: 0, z: +Math.PI * 0.8 }, "section3")

      //EXPLODE ANIMATION
      //Wheels Bolts
      .to(wheelBoltRefBL.current.position, { x: 1.5 }, "section3")
      .to(wheelBoltRefBR.current.position, { x: -1.5 }, "section3")
      .to(wheelBoltRefTL.current.position, { x: 1.5 }, "section3")
      .to(wheelBoltRefTR.current.position, { x: -1.5 }, "section3")

      //Bearings 01
      .to(bearing01RefBL.current.position, { x: 1.25 }, "section3")
      .to(bearing01RefBR.current.position, { x: -1.25 }, "section3")
      .to(bearing01RefTL.current.position, { x: 1.25 }, "section3")
      .to(bearing01RefTR.current.position, { x: -1.25 }, "section3")

      //Wheels
      .to(wheelRefBL.current.position, { x: 1.0 }, "section3")
      .to(wheelRefBR.current.position, { x: -1.0 }, "section3")
      .to(wheelRefTL.current.position, { x: 1.0 }, "section3")
      .to(wheelRefTR.current.position, { x: -1.0 }, "section3")

      //Bearings 02
      .to(bearing02RefBL.current.position, { x: 0.75 }, "section3")
      .to(bearing02RefBR.current.position, { x: -0.75 }, "section3")
      .to(bearing02RefTL.current.position, { x: 0.75 }, "section3")
      .to(bearing02RefTR.current.position, { x: -0.75 }, "section3")

      // === Revenir au matériau d’origine si on remonte ===
      .call(
        () => {
          materials.Material.map = colorMap;
          materials.Material.displacementScale = 1;
          materials.Material.metalness = 1;
          materials.Material.roughness = 1;
          materials.Material.normalScale = new THREE.Vector2(1, 1);
          materials.Material.bumpScale = 1;
          materials.Material.needsUpdate = true;
        },
        null,
        "section3"
      ) // 👈 ça restaure dès qu’on remonte avant section3

      // === Switch vers UV flat ===
      .call(
        () => {
          materials.Material.map = uvMap;
          materials.Material.displacementScale = 0;
          materials.Material.metalness = 0;
          materials.Material.roughness = 1;
          materials.Material.normalScale = new THREE.Vector2(0, 0);
          materials.Material.bumpScale = 0;
          materials.Material.needsUpdate = true;
        },
        null,
        "section3"
      );
  });

  return (
    <group
      {...props}
      ref={rootRef}
      dispose={null}
      position={[0, 0, 1]}
      rotation={[Math.PI * 0.5, -Math.PI / 2, 0]}
    >
      <mesh
        geometry={nodes.board_low.geometry}
        material={materials.Material}
        position={[-0.003, 0.525, 0]}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <group position={[0, 0.192, -1.304]} rotation={[0.397, 0, Math.PI / 2]}>
        <mesh
          geometry={nodes.Cylinder005.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Cylinder005_1.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Cylinder005_2.geometry}
          material={materials.Material}
        />
      </group>
      <mesh
        geometry={nodes.base_low.geometry}
        material={materials.Material}
        position={[0, 0.417, 1.265]}
        rotation={[0.033, 0, Math.PI]}
      />
      <mesh
        geometry={nodes.rubber_low.geometry}
        material={materials.Material}
        position={[0, 0.197, -1.211]}
        rotation={[-0.215, 0, Math.PI]}
      />
      <mesh
        geometry={nodes.steel_low.geometry}
        material={materials.Material}
        position={[0, 0.309, -1.186]}
        rotation={[-0.215, 0, Math.PI]}
      />
      <mesh
        ref={wheelRefBL}
        geometry={nodes.wheels_low.geometry}
        material={materials.Material}
        position={[0.481, 0.14, 1.295]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        ref={bearing02RefBL}
        geometry={nodes.bearings_low.geometry}
        material={materials.Material}
        position={[0.445, 0.14, 1.296]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.riser_low.geometry}
        material={materials.Material}
        position={[0, 0.458, 1.264]}
        rotation={[0.033, 0, Math.PI]}
      />
      <mesh
        geometry={nodes.bolts_low.geometry}
        material={materials.Material}
        position={[0, 0.119, 1.207]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low009.geometry}
        material={materials.Material}
        position={[0, 0.233, 1.183]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low010.geometry}
        material={materials.Material}
        position={[0, 0.235, -1.202]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        ref={wheelBoltRefTL}
        geometry={nodes.bolts_low011.geometry}
        material={materials.Material}
        position={[0.55, 0.139, -1.317]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        ref={wheelBoltRefTR}
        geometry={nodes.bolts_low012.geometry}
        material={materials.Material}
        position={[-0.55, 0.139, -1.317]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low013.geometry}
        material={materials.Material}
        position={[-0.107, 0.413, -1.1]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low014.geometry}
        material={materials.Material}
        position={[0.107, 0.413, -1.1]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low015.geometry}
        material={materials.Material}
        position={[0.107, 0.402, -1.462]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low016.geometry}
        material={materials.Material}
        position={[-0.107, 0.402, -1.462]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low017.geometry}
        material={materials.Material}
        position={[0, 0.119, -1.227]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low018.geometry}
        material={materials.Material}
        position={[-0.107, 0.415, 1.08]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low019.geometry}
        material={materials.Material}
        position={[0.107, 0.413, 1.08]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low020.geometry}
        material={materials.Material}
        position={[-0.107, 0.402, 1.442]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.bolts_low021.geometry}
        material={materials.Material}
        position={[0.107, 0.402, 1.442]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        ref={wheelBoltRefBL}
        geometry={nodes.bolts_low022.geometry}
        material={materials.Material}
        position={[0.55, 0.139, 1.296]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        ref={wheelBoltRefBR}
        geometry={nodes.bolts_low023.geometry}
        material={materials.Material}
        position={[-0.55, 0.139, 1.296]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <group position={[0, 0.192, 1.284]} rotation={[0.397, 0, Math.PI / 2]}>
        <mesh
          geometry={nodes.Cylinder036.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Cylinder036_1.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Cylinder036_2.geometry}
          material={materials.Material}
        />
      </group>
      <mesh
        ref={wheelRefTR}
        geometry={nodes.wheels_low001.geometry}
        material={materials.Material}
        position={[-0.48, 0.14, -1.315]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        ref={wheelRefTL}
        geometry={nodes.wheels_low002.geometry}
        material={materials.Material}
        position={[0.481, 0.14, -1.315]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        ref={wheelRefBR}
        geometry={nodes.wheels_low003.geometry}
        material={materials.Material}
        position={[-0.48, 0.14, 1.295]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.base_low001.geometry}
        material={materials.Material}
        position={[0, 0.417, -1.285]}
        rotation={[0.033, 0, Math.PI]}
      />
      <mesh
        geometry={nodes.riser_low001.geometry}
        material={materials.Material}
        position={[0, 0.458, -1.284]}
        rotation={[0.033, 0, Math.PI]}
      />
      <mesh
        geometry={nodes.steel_low001.geometry}
        material={materials.Material}
        position={[0, 0.309, 1.166]}
        rotation={[-0.215, 0, Math.PI]}
      />
      <mesh
        geometry={nodes.steel_low002.geometry}
        material={materials.Material}
        position={[0, 0.152, 1.2]}
        rotation={[-0.215, 0, Math.PI]}
      />
      <mesh
        geometry={nodes.steel_low003.geometry}
        material={materials.Material}
        position={[0, 0.152, -1.22]}
        rotation={[-0.215, 0, Math.PI]}
      />
      <mesh
        geometry={nodes.rubber_low001.geometry}
        material={materials.Material}
        position={[0, 0.197, 1.19]}
        rotation={[-0.215, 0, Math.PI]}
      />
      <mesh
        ref={bearing01RefTL}
        geometry={nodes.bearings_low001.geometry}
        material={materials.Material}
        position={[0.516, 0.14, -1.317]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        ref={bearing02RefTL}
        geometry={nodes.bearings_low002.geometry}
        material={materials.Material}
        position={[0.445, 0.14, -1.317]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        ref={bearing02RefTR}
        geometry={nodes.bearings_low003.geometry}
        material={materials.Material}
        position={[-0.445, 0.14, -1.317]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        ref={bearing01RefTR}
        geometry={nodes.bearings_low004.geometry}
        material={materials.Material}
        position={[-0.516, 0.14, -1.317]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        ref={bearing02RefBR}
        geometry={nodes.bearings_low005.geometry}
        material={materials.Material}
        position={[-0.445, 0.14, 1.296]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        ref={bearing01RefBR}
        geometry={nodes.bearings_low006.geometry}
        material={materials.Material}
        position={[-0.516, 0.14, 1.296]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
      <mesh
        ref={bearing01RefBL}
        geometry={nodes.bearings_low007.geometry}
        material={materials.Material}
        position={[0.516, 0.14, 1.296]}
        rotation={[-1.534, 0, Math.PI / 2]}
      />
    </group>
  );
}

useGLTF.preload("/skate_parts.gltf");
