import { useContext, useEffect, useRef } from "react"
import oneWally from "../assets/oneWally.png"
import styles from "./Waldo.module.css"
import { useState } from "react"
import BoxClick from "../components/BoxClick"
import BoxContext from "../hooks/BoxContext.js"
import Dropdown from "../components/Dropdown.jsx"
import useWindowSize from "../hooks/useWindowSize.js"
import Header from "../components/Header.jsx"
import TokenContext from "../hooks/TokenContext.js"
import { useNavigate } from "react-router"
import FoundMarker from "../components/FoundMarker.jsx"


export default () => {
    const [token] = useContext(TokenContext)
    const nav = useNavigate()
    const [normCoord, setNormCoord] = useState({x: "N/A", y: "N/A"})
    const [found, setFound] = useState([])

    const [imgSize, setImgSize] = useState()

    const waldoRef = useRef()
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

    useEffect(() => {
        if (!token)
            nav("/")
        else if (token.data.persons.length == 0)
            nav("/sail/leaderboard")
    }, [token])

    return (
        <>
           <Header normCoord={normCoord} tokenData={token?.data}/>
            <main className={styles.main}>
                <img 
                    src={oneWally} 
                    className={styles.waldo}
                    onClick={handleClick}
                    ref={waldoRef}
                />
                {
                    (normCoord.x != "N/A" || normCoord.y != "N/A") && 
                    <BoxContext value={[styles, waldoRef, normCoord, imgSize, resetCoord]}>
                        <BoxClick boxSize={boxSize}/>
                        <Dropdown boxSize={boxSize} names={token?.data.persons} setFound={setFound} found={found}/>
                    </BoxContext>
                }
                {
                    found.length > 0 && found.map((m, i) => {
                        return <FoundMarker coords={m.coords} imgSize={imgSize} waldoRef={waldoRef} key={i}/>
                    })
                    
                }
            </main>
        </>
        
    )
}