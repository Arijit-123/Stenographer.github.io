import { Box,TextField,Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext'
import { auth } from '../firebaseConfig';
import errorMapping from '../Utils/ErrorMessage';

const LoginForm = ({handleClose}) => {

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    const{theme}=useTheme()
    const{setAlert}=useAlert();

    const handleLogin=()=>
    {
        // console.log(email,password);
        if(!email || !password ){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Please enter all details'
            });
            return;
        }

       

        auth.signInWithEmailAndPassword(email,password)
        .then((ok)=>
        {
            setAlert({
                open: true,
                type: 'success',
                message: 'Logged In'
            });
            handleClose()
        })
        .catch((err)=>
        {
            setAlert({
                open: true,
                type: 'error',
                message: errorMapping[err.code] || "Some error occured"
            });
            handleClose()
        })
    }
  return (
    <Box
    p={3}
    style={{
        display:'flex',
        flexDirection:'column',
        gap:'20px',
        backgroundColor:'transparent',
        padding:10,
        marginTop: '5px'
    }}    
>
    <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        onChange={(e)=>setEmail(e.target.value)}
        
        InputLabelProps={
            {
                style:{
                    color: theme.title
                }
            }
        }
        InputProps={{
            style:{
                color: theme.title
            }
        }}
        
    >
    
    </TextField>
    <TextField
        variant='outlined'
        type='password'
        label='Enter password'
        onChange={(e)=>setPassword(e.target.value)}
        InputLabelProps={
            {
                style:{
                    color: theme.title
                }
            }
        }
        InputProps={{
            style:{
                color: theme.title
            }
        }}
       >
    
    </TextField>
    <Button
    variant='contained'
    size='large'
    style={{backgroundColor:theme.title, color: theme.background}}
    onClick={handleLogin}
    >
        Login
    </Button>
</Box>
  )
}

export default LoginForm