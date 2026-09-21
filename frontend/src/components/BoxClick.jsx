import { useContext } from "react"
import BoxContext from "../hooks/BoxContext"

export default ({boxSize=4}) => {
    const [styles, waldoRef, normCoord, imgSize] = useContext(BoxContext)
    return (
        <div 
            className={styles.box}
            style={{
                "--size": `${boxSize}vw`,
                left: `calc(${(normCoord.x * imgSize.width)+waldoRef.current.offsetLeft}px - ${boxSize/2}vw)`,
                top: `calc(${(normCoord.y * imgSize.height)+waldoRef.current.offsetTop}px - ${boxSize/2}vw)`
            }}
        >
        </div>
    )
}