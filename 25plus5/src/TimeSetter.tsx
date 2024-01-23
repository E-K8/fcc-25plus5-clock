import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface TimerSetterProps {
  time: number;
  setTime: (time: number) => void;
  min: number;
  max: number;
  interval: number;
  type: 'break' | 'session';
}

const TimeSetter: React.FC<TimerSetterProps> = ({
  time,
  setTime,
  min,
  max,
  interval,
  type,
}) => {
  const [displayTime, setDisplayTime] = useState(time);

  useEffect(() => {
    setDisplayTime(time);
  }, [time]);

  return (
    <div>
      <button
        onClick={() =>
          displayTime > min ? setTime(displayTime - interval) : null
        }
        id={`${type}-decrement`}
      >
        <FaArrowDown />
      </button>
      <span id={`${type}-length`}>{displayTime / interval}</span>
      <button
        onClick={() =>
          displayTime < max ? setTime(displayTime + interval) : null
        }
        id={`${type}-increment`}
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default TimeSetter;
