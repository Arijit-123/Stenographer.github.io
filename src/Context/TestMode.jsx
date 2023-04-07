import { createContext, useContext, useState } from "react"

const TestModeContext=createContext();
export const TestModeContextProvider=({children})=>
{
    const[testTime,setTestTime]=useState(15);
    const[testWord,setTestWord]=useState(10);
    const[testMode,setTestMode]=useState("time")
    const values={
        testTime,
        setTestTime,
        testWord,
        setTestWord,
        testMode,
        setTestMode
    }

    return(
        <TestModeContext.Provider value={values}>
            {children}
        </TestModeContext.Provider>
    )

}

export const useTestMode=()=>useContext(TestModeContext);