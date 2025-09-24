import React, { useEffect, useState } from 'react'
import './App.css'
/* import { questionData } from '../data/item'*/
import questionData from './data/data.js';
function Quiz() {
  const [currentQuestion,setCurrentQuestion] = useState(0);
  const [score,setScore] = useState(0);
  const [showScore,setShowScore] = useState(false);
  const [timer,setTimer] = useState(10);

  useEffect(()=>{
    let interval;
    if(timer>0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer)=> prevTimer - 1)
      }, 1000);
    }else{
      clearInterval(interval);
      setShowScore(true);
    }
    return()=> clearInterval(interval);
  },[timer,showScore])

  const handleAnsweClick = (selectedOption)=>{
    if(selectedOption===questionData[currentQuestion].correctOption){
      setScore((prevScore) => prevScore + 1)
    }
    if(currentQuestion<questionData.length-1){
      setCurrentQuestion((prevScore) => prevScore + 1);
      setTimer(10)
    }else{setShowScore(true)}
    
  }
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10)
  }

  return (
    <div className='quiz-app'>
      {showScore ? (
        <div className='score-section'>
        <h2>Your Score : {score}/{questionData.length}</h2>
        <button onClick={handleRestartQuiz}>Restart</button>
        </div>
      ):( <div className='question-section'>
        <h2>Questions {currentQuestion+1}</h2>
        <p>{questionData[currentQuestion].question}</p>
        <div className='options'>
          {questionData[currentQuestion].optinos.map((option,index)=>(
            <button key={index}onClick={()=>handleAnsweClick(option)}>{option}</button>
          ))}
        </div>
        <div className='timer'>
          <p>Time Left: <span>{timer}</span></p>
        </div>
      </div>)}
     
    </div>
  )
}

export default Quiz;
