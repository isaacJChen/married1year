import background from './court_room.jpg';
import yumi from './yumi.png';
import pupu from './pupu.png';
import yumi_dress from './yumi_dress.png';
import { useState } from 'react';
import './App.css';

function App() {
  const pupuGoal = 3;
  const [yumiPositionY, setYumiPositionY] = useState(0);
  const [yumiPositionX, setYumiPositionX] = useState(0);
  const [yumiImage, setYumiImage] = useState(yumi);
  const [questPositionY, setQuestPositionY] = useState(500);
  const [questPositionX, setQuestPositionX] = useState(500);
  const [questPoints, setQuestPoints] = useState(0);
  const [questMessage, setQuestMessage] = useState('You are about to get married, but Pupu stole your wedding dress, catch ' + pupuGoal + ' Pupus to get your dress back');
  const maxHeight = window.innerHeight - 200;
  const maxWidth = window.innerWidth - 200;
  const pupuRun = () => {
    let rng = Math.random();
    let newX = questPositionX;
    let newY = questPositionY;
    if (rng < 0.25) {
      newX = newX - 30;
    } else if (rng < 0.5) {
      newX = newX + 30;
    } else if (rng < 0.75) {
      newY = newY + 30;
    } else {
      newY = newY - 30;
    }
    if (newX >= maxWidth || newY >= maxHeight || newX <= 0 || newY <= 0) {
      pupuRun();
      return;
    } else {
      setQuestPositionX(newX);
      setQuestPositionY(newY);
    }
  }
  const questInteraction = () => {
    pupuRun();
    let yumi = document.getElementById('yumi');
    let yumiHeight = yumi.clientHeight;
    let yumiWidth = yumi.clientWidth;
    let yumiBottom = yumiPositionY + yumiHeight;
    let yumiTop = yumiPositionY;
    let yumiLeft = yumiPositionX;
    let yumiRight = yumiPositionX + yumiWidth;
    let pupu = document.getElementById('pupu');
    let offsetY = pupu.clientHeight / 2;
    let offsetX = pupu.clientWidth / 2;
    let questPositionXWithOffset = questPositionX + offsetX;
    let questPositionYWithOffset = questPositionY + offsetY;
    if (questPositionXWithOffset >= yumiLeft && questPositionXWithOffset <= yumiRight && questPositionYWithOffset >= yumiTop && questPositionYWithOffset <= yumiBottom) {
      if (questPoints == pupuGoal - 1) {
        setQuestPoints(questPoints + 1);
        setYumiImage(yumi_dress);
        setQuestMessage('Pupu is angwy and now throwing his poop at you! Dodge them until he runs out of poop: ');
      } else if (questPoints < pupuGoal) {
        let newHeight = Math.random() * maxHeight;
        let newWidth = Math.random() * maxWidth;
        setQuestPositionX(newWidth);
        setQuestPositionY(newHeight);
        setQuestPoints(questPoints + 1);
      }
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="background" alt="background" />
        <q className='questMessage'>{questMessage}: {questPoints}</q>
        <img src={yumiImage} className='yumi' id='yumi' style={{'position': 'absolute', 'top': yumiPositionY, 'left': yumiPositionX, 'height': '30%'}}/>
        <img src={pupu} className='quest' id='pupu' style={{'position': 'absolute', 'top': questPositionY, 'left': questPositionX, 'height': 150, 'display': questPoints == pupuGoal ? 'none' : ''}}/>
        <div className='controls'>
          <div className='controlsRow1'>
            <button className='controlUp' onClick={
              () => {
                setYumiPositionY(yumiPositionY - 50);
                questInteraction();
              }
            }>⬆️</button>
          </div>
          <div className='controlsRow2'>
            <button className='controlLeft'  onClick={
              () => {
                setYumiPositionX(yumiPositionX - 50);
                questInteraction();
              }
            }>⬅️</button>

            <button className='controlDown'  onClick={
              () => {
                setYumiPositionY(yumiPositionY + 50);
                questInteraction();
              }
            }>⬇️</button>

            <button className='controlRight'  onClick={
              () => {
                setYumiPositionX(yumiPositionX + 50);
                questInteraction();
              }
            }>➡️</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
