"use client";
import { useEffect } from "react";

const WebGLSpotlight = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const size = 512;
    canvas.width = size;
    canvas.height = size;

    let mouseX = size / 2;
    let mouseY = size / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    let radius = 60;
    const speed = 0.15;

    const updateMask = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      ctx.clearRect(0, 0, size, size);

      const gradient = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        radius,
      );

      gradient.addColorStop(0, "black"); // visible
      gradient.addColorStop(1, "transparent"); // hidden

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // 🔥 apply as CSS mask
      const dataURL = canvas.toDataURL();
      document.documentElement.style.setProperty("--mask", `url(${dataURL})`);

      requestAnimationFrame(updateMask);
    };

    updateMask();

    const move = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * size;
      mouseY = (e.clientY / window.innerHeight) * size;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return null;
};

export default WebGLSpotlight;
