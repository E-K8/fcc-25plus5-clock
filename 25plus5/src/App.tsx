import { useEffect, useState } from 'react';
import AlarmSound from './assets/BellSound.mp3';
import './App.css';
import { DisplayState } from './helpers';
import TimeSetter from './TimeSetter';
import Display from './Display';

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: 'Session',
    timerRunning: false,
  });

  useEffect(() => {
    let timerID: number;
    if (!displayState.timerRunning) return;
    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }
    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]);

  // useEffect(() => {
  //   if (displayState.time === 0) {
  //     const audio = document.getElementById('beep') as HTMLAudioElement;
  //     // audio.currentTime = 2;
  //     audio.play().catch((err) => console.log(err));
  //     setDisplayState((prev) => ({
  //       ...prev,
  //       timeType: prev.timeType === 'Session' ? 'Break' : 'Session',
  //       time: prev.timeType === 'Session' ? breakTime : sessionTime,
  //     }));
  //   }
  // }, [displayState, breakTime, sessionTime]);

  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById('beep') as HTMLAudioElement;
      audio.play().catch((err) => console.log(err));

      setTimeout(() => {
        setDisplayState((prev) => ({
          ...prev,
          timeType: prev.timeType === 'Session' ? 'Break' : 'Session',
          time: prev.timeType === 'Session' ? breakTime : sessionTime,
        }));
      }, 1000); // Delay of 1 second to allow "00:00" to show
    }
  }, [displayState, breakTime, sessionTime]);

  const reset = () => {
    setSessionTime(defaultSessionTime);
    setBreakTime(defaultBreakTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: 'Session',
      timerRunning: false,
    });
    const audio = document.getElementById('beep') as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };

  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  };

  const changeSessionTime = (time: number) => {
    if (displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: 'Session',
      timerRunning: false,
    });
  };

  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning) return;
    setBreakTime(time);
  };

  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  };

  return (
    <div className='clock'>
      <h1>25 + 5 clock</h1>
      <div className='setters'>
        <div className='session'>
          <h4 id='session-label'>Session Length</h4>
          <TimeSetter
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            interval={interval}
            type='session'
          />
        </div>
        <div className='break'>
          <h4 id='break-label'>Break Length</h4>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            interval={interval}
            type='break'
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <audio id='beep' src={AlarmSound} />
    </div>
  );
}

export default App;
