"use client";
import React, { useEffect, useState } from 'react';

export default function SparkCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div
      className="spark-cursor"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    />
  );
}
