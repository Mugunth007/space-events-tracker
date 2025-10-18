
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  if (!isClient) {
    return null; // Don't render on server to avoid hydration mismatch
  }
  
  const hasTimeLeft = Object.values(timeLeft).some(val => val > 0);

  return (
    <div>
      <p className="text-xs text-slate-400 mb-2">Countdown</p>
      {hasTimeLeft ? (
        <div className="flex items-center space-x-2 text-center">
            <div className="flex flex-col w-12">
                <span className="text-xl font-bold text-slate-100">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-xs text-slate-400">D</span>
            </div>
            <span className="text-xl font-bold text-slate-400">:</span>
            <div className="flex flex-col w-12">
                <span className="text-xl font-bold text-slate-100">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-xs text-slate-400">H</span>
            </div>
            <span className="text-xl font-bold text-slate-400">:</span>
            <div className="flex flex-col w-12">
                <span className="text-xl font-bold text-slate-100">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-xs text-slate-400">M</span>
            </div>
            <span className="text-xl font-bold text-slate-400">:</span>
            <div className="flex flex-col w-12">
                <span className="text-xl font-bold text-slate-100">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-xs text-slate-400">S</span>
            </div>
        </div>
      ) : (
        <p className="text-lg font-bold text-green-400">Event in Progress!</p>
      )}
    </div>
  );
};

export default Countdown;
