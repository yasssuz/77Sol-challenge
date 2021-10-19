import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function InitialAnimation() {
  const logoRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logoRef.current = gsap
      .timeline()
      .to(logoRef.current, {
        delay: 0.5,
        y: "0",
        duration: 1.5,
        ease: "back",
      })
      .to(logoRef.current, {
        delay: 0.2,
        rotation: "+=360",
        duration: 2.5,
        ease: "back.inOut",
      })
      .to(logoRef.current, {
        delay: 0.2,
        y: "220%",
        duration: 1,
        ease: "power1.in",
      })
      .to(containerRef.current, {
        css: {
          display: "none",
        },
      });
  }, []);

  return (
    <Container ref={containerRef}>
      <Logo ref={logoRef} src='/rounded-logo.png' alt='77Sol' />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  overflow: hidden;
  height: 200px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
  transform: translateY(230%);
`;
