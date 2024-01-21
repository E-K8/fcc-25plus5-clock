import { useState } from 'react';
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

  const reset = () => {
    console.log('reset');
  };
  const startStop = (displayState: DisplayState) => {
    console.log('startStop');
  };

  return (
    <div className='clock'>
      <div className='setters'>
        <div className='session'>
          <h4 id='session-label'>Session Length</h4>
          <TimeSetter
            time={sessionTime}
            setTime={setSessionTime}
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
            setTime={setBreakTime}
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
