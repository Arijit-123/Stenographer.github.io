import { createGlobalStyle } from "styled-components";


export const GlobalStyle=createGlobalStyle`

*,
*::after,
*::before{
    box-sizing:border-box;
}

body{
    background:${({theme})=> theme.background};
    color: ${({theme})=> theme.title};
    padding:0;
    margin:0;
    transition:all 0.25s linear;
    overflow-y: scroll;
}
body::-webkit-scrollbar{
    display: none;
}

.container{
    display:grid;
    grid-auto-flow:row;
    grid-templete-row:auto 1fr auto;
    gap:0.5rem;
    padding:1rem;
    align-item:center;
   width:100vw;
    min-height:100vh;
}

.typing-box{
    width:1000px;
    height:150px;
    margin-inline:auto;
    overflow:hidden;
}

.words{
    font-size:30px;
    display:flex;
    flex-wrap:wrap;
    align-content:center;
    width:100%;
}
.word{
 margin:5px;
}
.hidden-input{
    border:2px solid blue;
    opacity:0;
}
.correct{
    color:green;
}
.incorrect{
    color:red;
}

.blinking{
    border-left:1px solid;
    animation:blink 2s infinite;
    animation-timing-function:ease;

    @keyframes blink
    {0% {border-left-color:${({theme})=> theme.title};}
    25% {border-left-color:${({theme})=> theme.background};}
    50% {border-left-color:${({theme})=> theme.title};}
    75% {border-left-color:${({theme})=> theme.background};}
    100% {border-left-color:${({theme})=> theme.title};}
    }

   
}

.right{
    border-right:1px solid;
    animation:blinkRight 2s infinite;
    animation-timing-function:ease;

    @keyframes blinkRight
    {
        0% {border-left-color:${({theme})=> theme.title};}
        25% {border-left-color:${({theme})=> theme.background};}
        50% {border-left-color:${({theme})=> theme.title};}
        75% {border-left-color:${({theme})=> theme.background};}
        100% {border-left-color:${({theme})=> theme.title};}
    }    
}

   
.upperMenu
{
    display:flex;
    width:1000px;
    justify-content:space-between;
    margin-left:auto;
    margin-right:auto;
    color: ${({theme})=> theme.typeBoxText}
}



.rightSection{
    display:flex;
    // padding-right:10px
    gap:10px
}
.time:hover{
    color: ${({theme})=> theme.title};
    cursor:pointer
}
.statsBox{
    display:flex;
    max-width:1000px;
    height:auto;
    margin-left:auto;
    margin-right:auto;
}
 .title{
    font-size:20px;
    color:grey;
 }

 .subtitle{
    font-size:30px;
    color:gold;
 }
 .title1{
    font-size:15px;
    color:white;
 }
.leftStats{
    width:30%;
    padding:30px;
}
.rightStats{
    width:70%;
}

.footer{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    align-items:center;
    height:60px;
}
.header{
    display:flex;
    
    justify-content:space-between;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    
    height:60px;
}

.actual-footer{
    display: flex;
    justify-content: space-between;
    width:1000px;
}

.result-graph,.table
{
    width:1000px;
    margin:auto;
}
.user-profile{
    width: 1000px;
    margin: auto;
    display: flex;
    min-height: 15rem;
    background: ${({theme})=>theme.typeBoxText};
    border-radius: 20px;
    justify-content: center;
    align-text: center;
}
.user{
    width: 70%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5rem;
    padding: 1rem;
    border-right: 2px solid;
}
.info{
    width: 40%;
    padding: 1rem;
    margin-top: 1rem;
}
.picture{
    width: 40%;
}
.total-tests{
    width: 50%;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.graph, .table{
    width: 1000px;
    margin: auto;
}
.center-of-screen{
    display:flex;
    min-height:100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 3rem;
}
.logo{
    display: flex;
    gap: 10px;
}
.compare-btn{
    cursor: pointer;
    color: ${({theme})=>theme.background};
    background: ${({theme})=>theme.title};
    padding: 0.3rem;
    border-radius: 5px;
    margin-top: -5px;
}
.instruction{
    color: ${({theme})=>theme.title};
}
.hint{
    kbd{
        background: ${({theme})=>theme.title};
        color: ${({theme})=>theme.background};
        padding: 2.5px 5px;
        border-radius: 4px; 
    }
}

.time-modes, .word-modes{
    display:flex;
}
.time, .no-of-word{
    margin-right:5px;
}
.time:hover, .no-of-word:hover{
    color:${({theme})=>theme.typeBoxText};
    cursor: pointer;
}
.mode:hover{
    color:${({theme})=>theme.typeBoxText};
    cursor: pointer;
}
.reset-btn{
    display:block;
     margin:auto;
    transform:scale(2)

}
`

