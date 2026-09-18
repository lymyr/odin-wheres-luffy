import { useEffect, useRef } from "react"
import oneWally from "../assets/oneWally.png"
import styles from "./Waldo.module.css"
import { useState } from "react"
import BoxClick from "../components/BoxClick"
import BoxContext from "../../hooks/BoxContext.js"
import Dropdown from "../components/Dropdown.jsx"

export default () => {
    const [normCoord, setNormCoord] = useState({x: "uninitialized", y: "uninitialized"})
    const [boxPos, setBoxPos] = useState()
    
    const waldoRef = useRef()
    const headerRef = useRef()
    const [imgSize, setImgSize] = useState()
    const [wSize, setWSize] = useState(window.innerWidth)

    const boxSize = 4;

    function handleClick(e) {
        setNormCoord({
            x: (e.pageX - e.target.offsetLeft) / e.target.width,
            y: (e.pageY - e.target.offsetTop) / e.target.height
        })
        if (!boxPos) {
            setBoxPos({
                x: e.pageX/window.innerWidth,
                y: e.pageY/window.innerHeight
            })
            setImgSize({
                width: e.target.width,
                height: e.target.height
            })
        }
        else {
            setBoxPos()
        }
    }

    useEffect(() => {
        if (waldoRef)
            setImgSize({
                width: waldoRef.current.width,
                height: waldoRef.current.height
            })
    }, [wSize])

    useEffect(() => {
        function handleWindowSizeChange () {
            setWSize({width: window.innerWidth, height: window.innerHeight});
        };
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);


    return (
        <>
            <header style={{backgroundColor: "white"}} ref={headerRef}>
                <div>
                    <img />
                    <p>Luffy</p>
                </div>
                <div >
                    {normCoord.x}, {normCoord.y}
                </div>
            </header>
            <main>
                <img 
                    src={oneWally} 
                    className={styles.waldo}
                    onClick={handleClick}
                    ref={waldoRef}
                />
                {
                    boxPos && 
                    <BoxContext value={[styles, waldoRef, normCoord, imgSize]}>
                        <BoxClick boxSize={boxSize}/>
                        <Dropdown boxSize={boxSize} names={["luffy", "zoro", "sanji"]}/>
                    </BoxContext>
                }
            </main>
            
        </>
        
    )
}