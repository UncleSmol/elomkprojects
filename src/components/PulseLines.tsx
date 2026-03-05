import { useEffect, useState } from 'react';

const PulseLines = () => {
  const [lines, setLines] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newLines = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: `${(i * 20) + 10}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${10 + Math.random() * 10}s`,
    }));
    setLines(newLines);
  }, []);

  return (
    <div className="grid-pulse-container fixed inset-0 pointer-events-none z-0">
      {lines.map((line) => (
        <div key={line.id} className="pulse-line" style={{ left: line.left, animationDelay: line.delay, animationDuration: line.duration }} />
      ))}
    </div>
  );
};

export default PulseLines;
