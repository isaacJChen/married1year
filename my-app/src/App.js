import background from './court_room.jpg';
import yumi from './yumi.png';
import pupu from './pupu.png';
import yumi_dress from './yumi_dress.png';
import question_mark from './question_mark.png';
import timmy from './timmy.png';
import puzel from './puzel.png';
import loopy from './loopy.png';
import crowd from './crowd.jpg';
import { useEffect, useState } from 'react';
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
  const [timmyFound, setTimmyFound] = useState(false);
  const [puzelFound, setPuzelFound] = useState(false);
  const [loopyFound, setLoopyFound] = useState(false);
  const [showCrowd, setShowCrowd] = useState(false);
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
  const hideAndSeekFound = (fwenToFind, fwenFunction) => {
    let yumi = document.getElementById('yumi');
    let yumiHeight = yumi.clientHeight;
    let yumiWidth = yumi.clientWidth;
    let yumiBottom = yumiPositionY + yumiHeight;
    let yumiTop = yumiPositionY;
    let yumiLeft = yumiPositionX;
    let yumiRight = yumiPositionX + yumiWidth;

    let fwen = document.getElementById(fwenToFind);
    let fwenOffsetY = fwen.clientHeight / 2;
    let fwenOffsetX = fwen.clientWidth / 2;
    let fwenPositionXWithOffset = fwen.getBoundingClientRect().left + fwenOffsetX;
    let fwenPositionYWithOffset = fwen.getBoundingClientRect().top + fwenOffsetY;
    if (fwenPositionXWithOffset >= yumiLeft && fwenPositionXWithOffset <= yumiRight && fwenPositionYWithOffset >= yumiTop && fwenPositionYWithOffset <= yumiBottom) {
      fwenFunction(true);
    }


  }
  const hideAndSeek = () => {
    hideAndSeekFound('timmy', setTimmyFound);
    hideAndSeekFound('puzel', setPuzelFound);
    hideAndSeekFound('loopy', setLoopyFound);
    if (loopyFound && timmyFound && puzelFound) {
      setQuestMessage('You found all of the fwens but where is Isaac? Find Isaac in the crowd to recue him!');
    }
  }

  const questInteraction = () => {
    if (questPoints < pupuGoal) {
      pupuRun();
    }
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
      if (questPoints === pupuGoal - 1) {
        setQuestPoints(questPoints + 1);
        setYumiImage(yumi_dress);
        setQuestMessage('Yay! You got your dress back! But Isaac is playing hide and seek with his fwens, find all of them!');
      } else if (questPoints < pupuGoal) {
        let newHeight = Math.random() * maxHeight;
        let newWidth = Math.random() * maxWidth;
        setQuestPositionX(newWidth);
        setQuestPositionY(newHeight);
        setQuestPoints(questPoints + 1);
      }
    }
    if (questPoints === pupuGoal) {
      hideAndSeek();
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="background" alt="background" />
        <img src={puzelFound ? puzel : question_mark} className="hideAndSeek" id='puzel' style={{'position': 'absolute', 'top': '70%', 'left': '45%', 'height': '20%'}}/>
        <p style={{'position': 'absolute', 'top': '60%', 'left': '45%', 'display': puzelFound ? 'block' : 'none'}}>Aiya stupido Pupu always causing trouble!</p>
        <img src={loopyFound ? loopy : question_mark} className="hideAndSeek" id='loopy' style={{'position': 'absolute', 'top': '50%', 'left': '90%', 'height': '20%'}}/>
        <p style={{'position': 'absolute', 'top': '40%', 'left': '90%', 'display': loopyFound ? 'block' : 'none'}}>Haaah? What is happening?</p>
        <img src={timmyFound ? timmy : question_mark} className="hideAndSeek" id='timmy' style={{'position': 'absolute', 'top': '80%', 'left': '10%', 'height': '20%'}}/>
        <p style={{'position': 'absolute', 'top': '70%', 'left': '10%', 'display': timmyFound ? 'block' : 'none'}}>You found a bean toe! Kekeke!</p>
        <q className='questMessage'>
          {questMessage} {questPoints === pupuGoal ? '' : ': ' + questPoints} 
          <button style={{'display': puzelFound && timmyFound && loopyFound ? 'block' : 'none', 'position': 'absolute'}} onClick={() => {
            setShowCrowd(true);
          }}>Click me to find Isaac</button>
        </q>
        <img src={yumiImage} className='yumi' id='yumi' style={{'position': 'absolute', 'top': yumiPositionY, 'left': yumiPositionX, 'height': '30%'}}/>
        <img src={pupu} className='quest' id='pupu' style={{'position': 'absolute', 'top': questPositionY, 'left': questPositionX, 'height': 150, 'display': questPoints === pupuGoal ? 'none' : ''}}/>
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

            <button className='controlRight' onClick={
              () => {
                setYumiPositionX(yumiPositionX + 50);
                questInteraction();
              }
            }>➡️</button>
          </div>
        </div>
        <img src={crowd} style={{'position': 'absolute', 'width': '100%', 'height': '95%', 'display': showCrowd ? 'block' : 'none', 'top': '5%'}}/>
      </header>
    </div>
  );
}

export default App;
