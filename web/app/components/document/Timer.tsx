'use client';

import { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState({
    hours: 5,
    mins: 51,
    secs: 20
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        let { hours, mins, secs } = prevTime;
        
        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hours > 0) {
              hours--;
            } else {
              // Reset timer when it reaches zero
              hours = 23;
              mins = 59;
              secs = 59;
            }
          }
        }
        
        return { hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-orange-50 rounded-lg p-4 mb-6">
      <div className="text-center text-[#f59e0b] font-bold mb-2">
        24-HOUR SPECIAL PRICE ENDS IN:
      </div>
      <div className="flex justify-center gap-2">
        <div className="bg-[#f59e0b] rounded px-4 py-2 text-white min-w-[60px] text-center">
          <div className="text-2xl font-bold">{String(time.hours).padStart(2, '0')}</div>
          <div className="text-xs">HOURS</div>
        </div>
        <div className="bg-[#f59e0b] rounded px-4 py-2 text-white min-w-[60px] text-center">
          <div className="text-2xl font-bold">{String(time.mins).padStart(2, '0')}</div>
          <div className="text-xs">MINS</div>
        </div>
        <div className="bg-[#f59e0b] rounded px-4 py-2 text-white min-w-[60px] text-center">
          <div className="text-2xl font-bold">{String(time.secs).padStart(2, '0')}</div>
          <div className="text-xs">SECS</div>
        </div>
      </div>
    </div>
  );
} 