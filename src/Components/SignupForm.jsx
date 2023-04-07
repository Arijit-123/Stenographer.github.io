import { Box,TextField,Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext'
import { auth, db } from '../firebaseConfig';
import errorMapping from '../Utils/ErrorMessage';

const SignupForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const{theme}=useTheme()
    const{setAlert}=useAlert();
//    console.log(theme);

const checkUsernameAvailability = async()=>{
    const ref = db.collection('usernames');
    const response = await ref.doc(username).get();
    console.log(response.exists);
    return !response.exists;
}
   
    const handleSubmit=async()=>
    {
        if(!email || !password || !confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Please enter all details'
            });
            return;
        }

        if(password!==confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Password Mismatch'
            });
            return;
        }
        // console.log("y");

        if( await checkUsernameAvailability())
        {
               auth.createUserWithEmailAndPassword(email, password).then(async(response) => {
                const ref = await db.collection('usernames').doc(username).set({
                   uid:  response.user.uid
                });
                setAlert({
                    open: true,
                    type: 'success',
                    message: 'account created!'
                });
                handleClose();
            })
            .catch((err)=>
            {
                console.log(err);
                setAlert({
                    open: true,
                    type: 'error',
                    message: errorMapping[err.code] || "Some error occured"
                });
            })
            // console.log("usename not  available")
        }
        else
        {
            setAlert({
                open: true,
                type: 'warning',
                message: "usename already taken"
            });
        }
       
    }
  return (
    <Box
    p={3}
    style={{
        display:'flex',
        flexDirection:'column',
        gap:'20px',
        backgroundColor:'transparent',
        padding:10
    }}    
>
     <TextField
        variant='outlined'
        type='text'
        label='Enter username'
        onChange={(e)=>setUsername(e.target.value)}
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
        type='email'
        label='Enter email'
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
        }}>

    </TextField>
    <TextField
        variant='outlined'
        type='password'
        label='Confirm password'
        onChange={(e)=>setConfirmPassword(e.target.value)}
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
        }}>
    
    </TextField>
    <Button
    variant='contained'
    size='large'
    style={{backgroundColor:theme.title, color: theme.background}}
    onClick={handleSubmit}
    >
        Signup
    </Button>
</Box>
  )
}

export default SignupForm