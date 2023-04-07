import React, { useContext } from 'react'
import { useTestMode } from '../Context/TestMode'

const UpperMenu = ({counterDown,currWordIndex}) => {

    const{testTime,setTestTime,testWord,setTestWord,setTestMode,testMode}=useTestMode()

    const updateTime = (e)=>{
        setTestTime(e.target.id);
    }
  
    const updateWord = (e) =>{
      // console.log(typeof e.target.id);
        setTestWord(Number(e.target.id));
    }
  
    const updateMode = (e)=>{
      setTestMode(e.target.id);
    }
  return (
    <div className="upperMenu">
        <div className="leftSection">
            {(testMode=='time')?counterDown:`${currWordIndex}/${testWord}`}
        </div>
        <div className="modes">
        <span className="mode" id='time' onClick={updateMode}> Time </span>
        <span className="mode" id='word' onClick={updateMode}> Word </span>
      </div>
        
      {(testMode==='time') ? (<div className="time-modes">
        <div className="time" id={15} onClick={updateTime}>15s</div>
        <div className="time" id={30} onClick={updateTime}>30s</div>
        <div className="time" id={60} onClick={updateTime}>60s</div>
      </div>)
      :
      (<div className="word-modes">
        <div className="no-of-word" id={10} onClick={updateWord}>10</div>
        <div className="no-of-word" id={20} onClick={updateWord}>20</div>
        <div className="no-of-word" id={30} onClick={updateWord}>30</div>
      </div>)}
    </div>
  )
}

export default UpperMenu