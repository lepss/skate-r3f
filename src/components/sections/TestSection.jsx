import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export const TestSection = () => {
  const container = useRef();

  useGSAP(
    () => {
      gsap.to(".a", {
        scrollTrigger: {
          trigger: ".a",
          start: "top center",
          end: "top 100px",
          scrub: 1,
          markers: true,
        },
        x: 800,
        rotation: 360,
        ease: "none",
        duration: 3,
      });

      gsap.to(".b", {
        scrollTrigger: {
          trigger: ".b",
          start: "top center",
          end: "top 100px",
          scrub: 1,
          markers: true,
        },
        x: 800,
        rotation: 360,
        duration: 3,
      });

      gsap.to(".c", {
        scrollTrigger: {
          trigger: ".c",
          start: "top center",
          end: "top 100px",
          scrub: 1,
          markers: true,
        },
        x: 800,
        rotation: 360,
        duration: 3,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="container flex flex-col gap-4">
      <div className="h-200"></div>
      <div className="a h-40 w-40 bg-amber-400 text-2xl flex flex-col items-center justify-center">
        A
      </div>
      <div className="h-200"></div>
      <div className="b h-40 w-40 bg-amber-400 text-center text-2xl flex flex-col items-center justify-center">
        B
      </div>
      <div className="h-200"></div>
      <div className="c h-40 w-40 bg-amber-400 text-center text-2xl flex flex-col items-center justify-center">
        C
      </div>
    </div>
  );
};
