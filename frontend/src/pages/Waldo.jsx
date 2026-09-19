import { useEffect, useRef } from "react"
import oneWally from "../assets/oneWally.png"
import styles from "./Waldo.module.css"
import { useState } from "react"
import BoxClick from "../components/BoxClick"
import BoxContext from "../../hooks/BoxContext.js"
import Dropdown from "../components/Dropdown.jsx"
import useWindowSize from "../hooks/useWindowSize.js"
import Dialog from "../components/Dialog.jsx"
import Header from "../components/Header.jsx"


// todo: add give up button
export default () => {
    const [normCoord, setNormCoord] = useState({x: "N/A", y: "N/A"})
    const [imgSize, setImgSize] = useState()
    const [names, setNames] = useState([
        {
            name: "Luffy",
            found: false
        },
        {
            name: "Zoro",
            found: false
        },
        {
            name: "Sanji",
            found: false
        },
        {
            name: "Waldo",
            found: false
        },
    ])
    
    const waldoRef = useRef()
    const dialogRef = useRef()
    
    const wSize = useWindowSize()

    const boxSize = 4;

    function handleClick(e) {
        if (normCoord.x == "N/A") {
            setNormCoord({
                x: (e.pageX - e.target.offsetLeft) / e.target.width,
                y: (e.pageY - e.target.offsetTop) / e.target.height
            })
            setImgSize({
                width: e.target.width,
                height: e.target.height
            })
        }
        else 
            resetCoord()
    }

    function resetCoord() {
        setNormCoord({x: "N/A", y: "N/A"})
    }

    useEffect(() => {
        setImgSize({
            width: waldoRef.current.width,
            height: waldoRef.current.height
        })
    }, [wSize])


    return (
        <>
            {/* todo: add pictures to header & indicator if person is already found */}
           <Header normCoord={normCoord} names={names}/>
           
            <main>
                <img 
                    src={oneWally} 
                    className={styles.waldo}
                    onClick={handleClick}
                    ref={waldoRef}
                />
                {
                    normCoord.x != "N/A" && 
                    <BoxContext value={[styles, waldoRef, normCoord, imgSize, resetCoord]}>
                        <BoxClick boxSize={boxSize}/>
                        {/* todo: make names depend on api */}
                        <Dropdown boxSize={boxSize} names={names} setNames={setNames}/>
                    </BoxContext>
                }
            </main>
            
            {/* placeholder for username prompt after game */}
            <Dialog ref={dialogRef} handleClick={() => {}}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" />
                </div>
            </Dialog>
            <button onClick={() => dialogRef.current.showModal()}>Open</button>
        </>
        
    )
}