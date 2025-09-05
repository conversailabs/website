'use client';

import React, { useEffect, useRef } from 'react';

const FuturistBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      '#00ffff', // cyan
      '#8b5cf6', // purple
      '#fbbf24', // yellow
      '#ec4899', // pink
      '#f97316', // orange
      '#10b981', // green
      '#3b82f6', // blue
      '#ffffff', // white
      '#ff6b6b', // red
      '#4ecdc4', // teal
    ];

    const dots: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      opacity: number;
      speed: number;
      angle: number;
    }> = [];

    // Create dots
    const createDots = () => {
      dots.length = 0;
      const columns = Math.floor(canvas.width / 35);
      const rows = Math.floor(canvas.height / 35);
      
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          // Add some randomness to positioning
          const x = i * 35 + Math.random() * 15;
          const y = j * 35 + Math.random() * 15;
          
          dots.push({
            x,
            y,
            radius: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.8 + 0.3,
            speed: Math.random() * 0.03 + 0.01,
            angle: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    createDots();

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;
      
      dots.forEach((dot, index) => {
        // Animate opacity with sine wave - more dramatic
        dot.opacity = 0.4 + Math.sin(time * 1.5 + index * 0.1) * 0.6;
        
        // More dynamic position animation
        const offsetX = Math.sin(time * 0.8 + index * 0.05) * 3;
        const offsetY = Math.cos(time * 0.6 + index * 0.05) * 3;
        
        // Add glow effect
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        ctx.arc(dot.x + offsetX, dot.y + offsetY, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = Math.max(0.1, dot.opacity);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      });
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default FuturistBackground;