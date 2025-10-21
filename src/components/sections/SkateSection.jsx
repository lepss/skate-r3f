import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import Scene from "../Scene";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function SkateSection() {
  const container = useRef();
  // const cubeRef = useRef();

  useGSAP(
    () => {
      // gsap.to(
      //   ".title1",
      //   { opacity: 1, y: -100 },
      //   {
      //     scrollTrigger: {
      //       trigger: ".section1",
      //       start: "top center",
      //       end: "bottom center",
      //       scrub: true,
      //     },
      //     opacity: 0,
      //     duration: 3,
      //   }
      // );
      // gsap.fromTo(
      //   ".title2",
      //   { opacity: 0 },
      //   {
      //     scrollTrigger: {
      //       trigger: ".section2",
      //       start: "top center",
      //       end: "bottom center",
      //       scrub: true,
      //     },
      //     opacity: 1,
      //     duration: 3,
      //   }
      // );
      // gsap.fromTo(
      //   ".title3",
      //   { opacity: 0 },
      //   {
      //     scrollTrigger: {
      //       trigger: ".section3",
      //       start: "top center",
      //       end: "bottom center",
      //       scrub: true,
      //     },
      //     opacity: 1,
      //     duration: 3,
      //   }
      // );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="wrapper relative">
      {/* Scène 3D fixée au centre */}
      <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
        <Scene />
      </div>

      {/* Sections */}
      <section
        id="section1"
        className="section1 h-screen flex flex-col items-end justify-center"
      >
        {/* <h1 id="title1" className="title1 text-5xl font-bold">
          Perform a Kickflip
        </h1> */}
      </section>

      <section
        id="section2"
        className="section2 h-screen flex items-center justify-start px-20"
      >
        {/* <h1 id="title2" className="title2 text-5xl font-bold">
          Now Spin!
        </h1> */}
      </section>

      <section
        id="section3"
        className="section3 h-screen flex items-center justify-end px-20"
      >
        {/* <h1 id="title3" className="title3 text-5xl font-bold">
          Treflip !
        </h1> */}
      </section>
      <section
        id="section4"
        className="section4 h-screen flex items-center justify-start px-20"
      >
        {/* <h1 id="title4" className="title3 text-5xl font-bold">
          Treflip !
        </h1> */}
      </section>
    </div>
  );
}
