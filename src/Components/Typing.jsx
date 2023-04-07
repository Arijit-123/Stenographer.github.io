import { DialogTitle } from '@material-ui/core';
import { Dialog } from '@mui/material';
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { useTestMode } from '../Context/TestMode';
import Stats from './Stats';
import UpperMenu from './UpperMenu';

var randomWords = require('random-words');

const Typing = ({ }) => {
    const { testTime, setTestTime, testWord, setTestWord, setTestMode, testMode } = useTestMode()
    const [currWordIndex, setcurrWordIndex] = useState(0)
    const [currCharIndex, setcurrCharIndex] = useState(0)
    const [counterDown, setCounterDown] = useState(() => {
        if (testMode == 'word') {
            counterDown(180);
        }
        else {
            return testTime;
        }
    }

    );
    const [typingStart, setTypingStart] = useState(false)
    const [typingOver, setTypingOver] = useState(false)
    const [intervalId, setIntervalId] = useState(null)
    const [correctChar, setCorrectChar] = useState(0);
    const [correctWord, setCorrectWord] = useState(0);
    const [incorrectChars, setIncorectChars] = useState(0)
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [graphData, setGraphData] = useState([]);
    const [wordArray, setWordArray] = useState(() => {
        if (testMode == 'word') {
            return randomWords(testWord)
        }
        return randomWords(100);
    })
    const [openDialog, setOpenDialog] = useState(false)
    const words = useMemo(() => {
        return wordArray
    }, [wordArray])

    const wordSpanRef = useMemo(() => {
        return Array(words.length).fill(0).map(() => createRef());
    }, [words])



    const resetWordSpanRefClassName = () => {
        wordSpanRef.map((index) => {
            Array.from(index.current.childNodes).map((j) => {
                j.className = "char"
            })
        })
        wordSpanRef[0].current.childNodes[0].className = "char blinking"
        inputFocus();
    }
    const inputRef = useRef();
    // const wordSpanRef = Array(words.length).fill(0).map(() => createRef())
    // console.log(wordSpanRef[0]);



    function counter() {
        let intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId)

        function timer() {
            setCounterDown((prevCount) => {


                setCorrectChar((correctChar) => {
                    setGraphData((data) => {

                        const startTime = (testMode === 'word') ? 180 : testTime;
                        return [...data, [startTime - prevCount, Math.round((correctChar / 5) / ((startTime - prevCount + 1) / 60))]];
                    });
                    return correctChar;
                });

                if (prevCount === 1) {
                    clearInterval(intervalId);
                    setCounterDown(0);
                    setTypingOver(true)
                }
                return prevCount - 1
            })
        }
    }


    const keyPress = (e) => {
        if (!typingStart) {
            counter();
            setTypingStart(true)
        }
        //console.log(e);
        // console.log(e.key);//pressed key
        //console.log(e.keyCode)
        // console.log(wordSpanRef[0].current);
        let allChildrenSpans = wordSpanRef[currWordIndex].current.querySelectorAll('span')
        // console.log(allChildrenSpans);
        // console.log(allChildrenSpans[currCharIndex].innerText);//present 

        // -----------tab logic-----------//
        if (e.keyCode === 9) {
            if (typingStart) {
                clearInterval(intervalId)
            }
            e.preventDefault();
            setOpenDialog(true);
            return;
        }

        // -----------space logic-----------//
        if (e.keyCode === 32) {
            if (currWordIndex === wordArray.length - 1) {
                clearInterval(intervalId);
                setTypingOver(true)
                return;
            }

            const correctchar = wordSpanRef[currWordIndex].current.querySelectorAll('.correct')
            const inCorrectchar = wordSpanRef[currWordIndex].current.querySelectorAll('.incorrect')
            setMissedChars(missedChars + (allChildrenSpans.length - (correctchar.length + inCorrectchar.length)))
            if (correctchar.length === allChildrenSpans.length) {
                setCorrectWord(correctWord + 1);
            }
            setcurrWordIndex(currWordIndex + 1)
            setcurrCharIndex(0);
            if (allChildrenSpans.length < currCharIndex + 1) {
                // console.log(currCharIndex);
                allChildrenSpans[currCharIndex - 1].classList.remove('right')

            }
            else {
                console.log(allChildrenSpans[currCharIndex]);
                allChildrenSpans[currCharIndex].className = allChildrenSpans[currCharIndex].className.replace("blinking", "")
            }


            // after pressing space cursor move to the next first char of nexr word
            wordSpanRef[currWordIndex + 1].current.querySelector('span').className = "char blinking"
            return;

        }

        // -----------Backspace logic-----------//

        if (e.keyCode === 8) {
            if (currCharIndex !== 0) {
                if (currCharIndex === allChildrenSpans.length) {
                    if (allChildrenSpans[currCharIndex - 1].className.includes("extra")) {
                        allChildrenSpans[currCharIndex - 1].remove();
                        allChildrenSpans[currCharIndex - 2].className += " right"
                    }
                    else {
                        allChildrenSpans[currCharIndex - 1].className = "char blinking"
                    }


                    setcurrCharIndex(currCharIndex - 1);
                    return;
                }
                console.log(currCharIndex);
                setcurrCharIndex(currCharIndex - 1);
                allChildrenSpans[currCharIndex].className = "char"
                allChildrenSpans[currCharIndex - 1].className = "char blinking"

            }
            return;
        }

        //-------user press more than number of char present in the word-----//
        if (currCharIndex === allChildrenSpans.length) {
            let newSpan = document.createElement('span')
            newSpan.innerText = e.key;
            newSpan.className = "char incorrect right extra"

            allChildrenSpans[currCharIndex - 1].className = allChildrenSpans[currCharIndex - 1].className.replace("right", "")
            wordSpanRef[currWordIndex].current.append(newSpan)
            setcurrCharIndex(currCharIndex + 1);
            setExtraChars(extraChars + 1);
            return;
        }

        if (e.key == allChildrenSpans[currCharIndex].innerText) {
            // console.log("corect");
            allChildrenSpans[currCharIndex].className = "char correct"
            setCorrectChar(correctChar + 1);
            setcurrCharIndex(currCharIndex + 1)
        }
        else {
            // console.log("incorrect");
            allChildrenSpans[currCharIndex].className = "char incorrect"
            setcurrCharIndex(currCharIndex + 1)
            setIncorectChars(incorrectChars + 1);
        }

        if (currCharIndex + 1 == allChildrenSpans.length) {
            allChildrenSpans[currCharIndex].className += " right"
        }
        else {
            allChildrenSpans[currCharIndex + 1].className = "char blinking";
        }

    }

    const handleDialogBoxEvents = (e) => {

        if (e.keyCode === 32) {
            //logic for redo game
            e.preventDefault();
            redoTest();
            setOpenDialog(false);
            return;
        }
        if (e.keyCode === 9 || e.keyCode === 13) {
            //logic for reset game
            e.preventDefault();
            reset();
            setOpenDialog(false);
            return;
        }

        e.preventDefault();
        setOpenDialog(false);
        counter();
    }

    const redoTest = () => {
        setcurrCharIndex(0);
        setcurrWordIndex(0);
        setTypingStart(false);
        setTypingOver(false);
        clearInterval(intervalId);
        if (testMode === 'word') {
            setCounterDown(180);
            setTestTime(180);
        }
        else {
            setCounterDown(testTime);
            setTestTime(testTime);
        }
        setGraphData([]);
        setCorrectChar(0);
        setCorrectWord(0);
        setExtraChars(0);
       setIncorectChars(0);
        setMissedChars(0);
        resetWordSpanRefClassName();
        inputFocus();
    }
    function reset() {
        setcurrWordIndex(0);
        setcurrCharIndex(0)
        setTypingStart(false);
        setTypingOver(false);
        setCounterDown(testTime)
        clearInterval(intervalId)

        if (testMode == 'word') {
            let random = randomWords(testWord);
            setWordArray(random)
            setCounterDown(180)
        }
        else {
            let random = randomWords(100);
            setWordArray(random)
        }

        setGraphData([]);
        setCorrectChar(0);
        setCorrectWord(0);
        setExtraChars(0);
        setIncorectChars(0);
        setMissedChars(0);
        resetWordSpanRefClassName();
        inputFocus();
    }
    const calculateWPM = () => {
        return Math.round((correctChar / 5) / ((graphData[graphData.length - 1][0] + 1) / 60))
    }
    const calculateAccuracry = () => {
        return (Math.round((correctWord / currWordIndex) * 100))
    }


    const inputFocus = () => {
        inputRef.current.focus();
    }

    useEffect(() => {
        reset();
    }, [testTime, testMode, testWord])


    useEffect(() => {
        inputFocus();
        wordSpanRef[0].current.childNodes[0].className = "char blinking"
    }, [])
    return (
        <div>
           
            {
                typingOver ? (<Stats reset={reset} wpm={calculateWPM()}
                    accuracy={calculateAccuracry()}
                    graphData={graphData}
                    correctChar={correctChar}
                    incorrectChars={incorrectChars}
                    missedChars={missedChars}
                    extraChars={extraChars}
                />) :
                
                    (<>
                        <UpperMenu counterDown={counterDown} currWordIndex={currWordIndex} />
                        <div className="typing-box" onClick={inputFocus}>
                            <div className="words">
                                {words.map((word, index) =>
                                (
                                    <span className='word' key={index} ref={wordSpanRef[index]}>
                                        {word.split("").map((char, i) =>
                                        (
                                            <span key={i} className='char'>{char}</span>
                                        ))}
                                    </span>
                                ))}
                            </div>
                        </div>
                        </>
                    )
            }

            <input ref={inputRef}
                type='text'
                className='hidden-input'
                onKeyDown={(e) => keyPress(e)}
            />
             <Dialog 
            open={openDialog}
            style={{
                backdropFilter: 'blur(2px)'
            }}
            PaperProps={{
                style: {
                    backgroundColor:'transparent',
                    boxShadow: 'none'
                }
            }}
            onKeyDown={handleDialogBoxEvents}
            >
                <DialogTitle>
                    <div className="instruction">press space to redo</div>
                    <div className="instruction">press Tab/Enter to restart</div>
                    <div className="instruction">press any other key to exit</div>
                </DialogTitle>
            </Dialog>
        </div>


    )
}

export default Typing