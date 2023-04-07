import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs } from '@mui/material';
import { Box, makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTheme } from '../Context/ThemeContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, db } from '../firebaseConfig';
import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAlert } from '../Context/AlertContext';


const useStyle=makeStyles(()=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2.5px)'
    },
    box: {
        width: 400,
        textAlign: 'center',
        border: '1px solid'
    }
}))



const AccountIcon = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    const{setAlert}=useAlert();
    const navigate=useNavigate()
    const handleValueChange = (e, v) => {
        setValue(v)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const logOut=()=>{
        auth.signOut()
        .then((ok)=>
        {
            setAlert(
                {
                    open:true,
                    type:"success",
                    message:"logged out"
                }
            )
        })
        .catch((err)=>
        {
            setAlert(
                {
                    open:true,
                    type:"success",
                    message:"not able to log out"
                }
            )
            
        })
    }
    
    const[user]=useAuthState(auth) //doubt
    const handleAccountIconClick=()=>
    {
        
        if(user)
        {
            navigate("/user")
        }
        else
        {
            setOpen(true);
        }
    }
    
   
    const classes=useStyle();
    const {theme} = useTheme();
    const googleProvider=new GoogleAuthProvider();// as GoogleAuthProvider is a object
    const useSignInWithGoogle=()=>
    {
        signInWithPopup(auth,googleProvider).then(async(response)=>{
            const username = response.user.email.split('@')[0];
            const ref= await db.collection('usernames').doc(username).set({
                uid: response.user.uid
            });
            setAlert({
                open: true,
                type: 'success',
                message: 'login successful'
            });
            handleClose();
        })
        .catch((err)=> 
        {
            setAlert(
                {
                    open:true,
                    type:"error",
                    message:"Not able to use Google authentication"
                }
            )
        })
    }
    return (
        <div>
            <AccountCircleIcon onClick={handleAccountIconClick} />
           { user && <LogoutIcon onClick={logOut} style={{marginLeft:"8px"}}/>} 
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <div className={classes.box}>
                    <AppBar
                     position="static"
                     style={{backgroundColor:'transparent'}}
                    >
                        <Tabs
                            value={value}
                            onChange={handleValueChange}
                            variant="fullWidth"
                        >
                            <Tab label="login"  style={{color:theme.title}}></Tab>
                            <Tab label="Signup"  style={{color:theme.title}}></Tab>
                        </Tabs>

                    </AppBar>
                    {value == 0 && <LoginForm handleClose={handleClose}/>}
                    {value == 1 && <SignupForm handleClose={handleClose}/>}

                    <Box>
                        <span>OR</span>
                        <GoogleButton
                        style={{width:"100%"}}
                        onClick={useSignInWithGoogle}
                        />
                    </Box>
                </div>

            </Modal>
        </div>

    )
}

export default AccountIcon