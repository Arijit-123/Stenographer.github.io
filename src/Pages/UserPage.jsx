import { CircularProgress } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Graph from '../Components/Graph';
import { useTheme } from '../Context/ThemeContext';
import { auth, db } from '../firebaseConfig';

const UserPage = () => {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const [user, loading] = useAuthState(auth);//loading is boolean true if firebase communication with googel server
  const { theme } = useTheme()
  //  console.log(theme);

  const fetchUserData = () => {
    const resultsRef = db.collection('Results');
    const { uid } = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];

    resultsRef.where('userId', '==', uid).orderBy('timeStamp', 'desc').get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        tempData.push({ ...doc.data() });
        tempGraphData.push([doc.data().timeStamp, doc.data().wpm])
      });
      console.log(tempData);
      setData(tempData);
      setGraphData(tempGraphData.reverse())
      setDataLoading(false)

    });
  }

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }

  }, [loading])

  if (loading || dataLoading) {
    return <div className='center-of-screen'><CircularProgress /> </div>
  }

  return (
    <div className="container">
      <div className="user-profile">
        <div className="user">
          <div className="picture">
            <AccountCircleIcon style={{ display: 'block', transform: 'scale(6)', margin: 'auto', marginTop: '3.5rem' }} />
          </div>
          <div className="info">
            <div className="email">
              {user.email}
            </div>
            <div className="joined-at">
              {user.metadata.creationTime}
            </div>
          </div>
        </div>
        <div className="total-tests">
          <span>
            Total Test Taken - {data.length}
          </span>
        </div>
      </div>
      <div className="result-graph">
        <Graph graphData={graphData} type='date' />
      </div>

      <div className='table'>
        <TableContainer style={{ maxHeight: "20rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: "1.5rem", color: theme.title, textAlign: "center", fontFamily: "Impact,Charcoal,sans-serif" }}>
                  WPM
                </TableCell>
                <TableCell style={{ fontSize: "1.5rem", color: theme.title, textAlign: "center", fontFamily: "Impact,Charcoal,sans-serif" }}>
                  Accuracy
                </TableCell>
                <TableCell style={{ fontSize: "1.5rem", color: theme.title, textAlign: "center", fontFamily: "Impact,Charcoal,sans-serif" }}>
                  Characters
                </TableCell>
                <TableCell style={{ fontSize: "1.5rem", color: theme.title, textAlign: "center", fontFamily: "Impact,Charcoal,sans-serif" }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((val) =>
              (
                <TableRow>
                  <TableCell style={{ color: theme.title, textAlign: "center" }}>
                    {val.wpm}
                  </TableCell>
                  <TableCell style={{ color: theme.title, textAlign: "center" }}>
                    {val.accuracy}
                  </TableCell>
                  <TableCell style={{ color: theme.title, textAlign: "center" }}>
                    {val.characters}
                  </TableCell>
                  <TableCell style={{ color: theme.title, textAlign: "center" }}>
                    {val.timeStamp.toDate().toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default UserPage