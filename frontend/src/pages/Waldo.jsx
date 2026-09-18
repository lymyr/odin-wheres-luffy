import { useEffect, useRef } from "react"
import oneWally from "../assets/oneWally.png"
import styles from "./Waldo.module.css"
import { useState } from "react"
import BoxClick from "../components/BoxClick"
import BoxContext from "../../hooks/BoxContext.js"
import Dropdown from "../components/Dropdown.jsx"

export default () => {
    const [normCoord, setNormCoord] = useState({x: "N/A", y: "N/A"})
    
    const waldoRef = useRef()
    const headerRef = useRef()
    const [imgSize, setImgSize] = useState()
    const [wSize, setWSize] = useState(window.innerWidth)

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
            setNormCoord({x: "N/A", y: "N/A"})
        
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
                    normCoord.x != "N/A" && 
                    <BoxContext value={[styles, waldoRef, normCoord, imgSize]}>
                        <BoxClick boxSize={boxSize}/>
                        <Dropdown boxSize={boxSize} names={["luffy", "zoro", "sanji"]}/>
                    </BoxContext>
                }
            </main>
            
        </>
        
    )
}