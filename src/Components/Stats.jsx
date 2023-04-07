import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAlert } from '../Context/AlertContext';
import { auth, db } from '../firebaseConfig';
import Graph from './Graph'
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Stats = ({ wpm, accuracy, graphData, correctChar, incorrectChars, missedChars, extraChars,reset }) => {
  const { setAlert } = useAlert();
  const [user] = useAuthState(auth)
  var timeSet = new Set();
  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushResultToDB = async () => {
    const resultRef = db.collection('Results');
    const { uid } = auth.currentUser;
    if (!isNaN(accuracy)) {
      //push the result into database
      await resultRef.add(
        {
          userId: uid,
          wpm: wpm,
          accuracy: accuracy,
          characters: `${correctChar}/${incorrectChars}/${missedChars}/${extraChars}`,
          timeStamp: new Date()
        }
      )
        .then((res) => {
          setAlert(
            {
              open: true,
              type: "success",
              message: "result save to Database"
            }
          )
        })
    }
    else {
      setAlert(
        {
          open: true,
          type: "error",
          message: "Invalid test"
        }
      )
    }
  }

  useEffect(() => {
    if (user) {
      pushResultToDB();
    }
    else {
      setAlert(
        {
          open: true,
          type: "warning",
          mesage: "login to save Results!!"

        }
      )
    }
  }, [])
  return (
    <div className="statsBox">
      <div className="leftStats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}%</div>
        <div className="title">Characters</div>
        <div className="title1">(Correct/InCorrect/Missed/Extra)</div>
        <div className="subtitle">{correctChar}/{incorrectChars}/{missedChars}/{extraChars}</div> {/* char/incorect/missed/extra */}
      <RestartAltIcon onClick={reset} className='reset-btn'/>
      </div>
      <div className="rightStats">
        <Graph graphData={newGraph} />
      </div>
    </div>
  )
}

export default Stats