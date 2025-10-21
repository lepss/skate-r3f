import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import { SkateModel } from "./SkateModel";

const Scene = () => {
  const ambientLightRef = useRef();
  const directionalLightRef = useRef();
  const environementRef = useRef();

  const tl = useRef();
  useGSAP(() => {
    console.log(environementRef.current);
    console.log(directionalLightRef.current);

    if (!ambientLightRef.current) return;
    console.log(ambientLightRef.current);

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper", // un conteneur qui englobe toutes tes sections
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true,
      },
    });
    // SECTION 2 → Normal setup
    tl.current
      // .to(ambientLightRef.current, { intensity: 0 }, "section2")
      // .to(directionalLightRef.current, { intensity: 1 }, "section2")
      // .to(environementRef.current, { environmentIntensity: 1 }, "section2")

      // // SECTION 3 → Only ambient
      .to(ambientLightRef.current, { value: 10 }, "section3");
    // .to(directionalLightRef.current, { intensity: 0 }, "section3")
    // .to(environementRef.current, { environmentIntensity: 0 }, "section3")
    // .call(
    //   () => {
    //     ambientLightRef.current.intensity = 0;
    //     directionalLightRef.current.intensity = 1;
    //     environementRef.current.environmentIntensity = 1;
    //   },
    //   null,
    //   "section3"
    // )
    // .call(
    //   () => {
    //     ambientLightRef.current.intensity = 1;
    //     directionalLightRef.current.intensity = 0;
    //     environementRef.current.environmentIntensity = 0;
    //   },
    //   null,
    //   "section3"
    // );
    // .call(
    //   () => {
    //     console.log("call 2");
    //     ambientLightRef.current.intensity = 0;
    //     directionalLightRef.current.intensity = 1;
    //     environementRef.current.environmentIntensity = 1;
    //   },
    //   null,
    //   "section3"
    // )

    // // SECTION 3 → Only Ambient
    // .call(
    //   () => {
    //     console.log("call 3");
    //     ambientLightRef.current.intensity = 1;
    //     directionalLightRef.current.intensity = 0;
    //     environementRef.current.environmentIntensity = 0;
    //   },
    //   null,
    //   "section3"
    // );
  });

  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight ref={ambientLightRef} intensity={1} />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={0}
      />
      <Environment
        ref={environementRef}
        preset="city"
        environmentIntensity={1}
      />
      <SkateModel />
      {/* <OrbitControls enableZoom={false} /> */}
    </Canvas>
  );
};

export default Scene;
