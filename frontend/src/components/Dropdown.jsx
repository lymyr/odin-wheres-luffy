import { useContext } from "react"
import BoxContext from "../../hooks/BoxContext.js"

export default ({boxSize, names}) => {
    const [styles, waldoRef, normCoord, imgSize] = useContext(BoxContext)
    return (
        <div 
            className={styles.dropdown}
            style={{
                left: `calc(${(normCoord.x * imgSize.width)+waldoRef.current.offsetLeft}px + ${boxSize/2}vw)`,
                top: `calc(${(normCoord.y * imgSize.height)+waldoRef.current.offsetTop}px + ${boxSize/2}vw)`
            }}
        >
            <ul>
                {names.map(name => {
                    return <li key={name}>{name}</li>
                })}
            </ul>
        </div>
    )
}