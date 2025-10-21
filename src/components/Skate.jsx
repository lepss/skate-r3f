import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function Skate(props) {
  const ref = useRef();
  const cubeRef = useRef();
  const tl = useRef();

  useGSAP(() => {
    tl.current = gsap.timeline();

    if (!ref.current) return;

    // SECTION 1: Kickflip (rotation X)
    tl.current.to(ref.current.rotation, {
      scrollTrigger: {
        trigger: ".section1",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: true,
      },
      z: Math.PI * 4,
      ease: "power1.inOut",
    });

    // SECTION 2: Rotation Y
    tl.current.to(ref.current.rotation, {
      scrollTrigger: {
        trigger: ".section2",
        start: "250px center",
        end: "top 100px",
        scrub: 1,
        markers: true,
      },
      y: Math.PI * 2.5,
      ease: "power1.inOut",
    });

    // SECTION 2: Rotation Y
    tl.current.to(ref.current.rotation, {
      scrollTrigger: {
        trigger: ".section3",
        start: "top center",
        end: "top 100px",
        scrub: 1,
        markers: true,
      },
      z: Math.PI * 4,
      y: Math.PI * 2.5,
      // ease: "power1.inOut",
    });
  }, []);

  return (
    <group {...props} ref={ref} dispose={null} rotation={[0, Math.PI / 2, 0]}>
      <mesh>
        <boxGeometry ref={cubeRef} args={[1, 0.2, 3]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
}
