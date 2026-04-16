import { useRouter } from "next/router";
import { useEffect } from "react";

export function GsapEffects() {
  const router = useRouter();

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const hero = document.querySelector<HTMLElement>('[data-gsap="hero"]');
        if (hero) {
          gsap.fromTo(
            hero,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
        }

        const fadeUpElements = gsap.utils.toArray<HTMLElement>('[data-gsap="fade-up"]');
        fadeUpElements.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 86%",
                once: true,
              },
            }
          );
        });
      });

      cleanup = () => ctx.revert();
    };

    animate();
    return () => cleanup?.();
  }, [router.asPath]);

  return null;
}
