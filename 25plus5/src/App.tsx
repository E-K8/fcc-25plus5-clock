import { useState } from 'react';
import './App.css';

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultBreakTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: 'Session',
    timerRunning: false,
  });
  return (
    <div className='clock'>
      <div className='setters'>
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
      </div>
      <Display />
      <audio id='beep' src={AlarmSound} />
    </div>
  );
}

export default App;
