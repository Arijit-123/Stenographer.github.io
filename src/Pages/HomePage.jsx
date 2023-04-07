import React from 'react'
import { ThemeProvider } from 'styled-components'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Typing from '../Components/Typing'



const HomePage = () => {
   
    return (
        
            <div className='container'>
               
                <Header />
                <Typing />
                <Footer />
            </div>
       
    )
}

export default HomePage