
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';
import AlertSnackbar from './Components/Alert';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Typing from './Components/Typing';
import { useTheme } from './Context/ThemeContext';
import { auth } from './firebaseConfig';
import ComparePage from './Pages/ComparePage';
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';
import { GlobalStyle } from './Styles/global'
// var randomWords = require('random-words');

function App() {
  // var words=randomWords(50);
  const {theme}=useTheme()
  
  console.log(auth);
  // console.log(theme);

  // let theme1={
  //   label: 'Red Theme',
  //   background: 'red',
  //   title: "white",
  //   typeBoxText: 'blue',
  //   stats: 'purple'
  // }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
     <AlertSnackbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/user" element={<UserPage/>}/>
      <Route path="/compare/:username" element={<ComparePage/>}/>
    </Routes>
    </ThemeProvider>
   

    




  );
}

export default App;
