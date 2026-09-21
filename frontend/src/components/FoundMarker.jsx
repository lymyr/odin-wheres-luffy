import styles from "./FoundMarker.module.css"

export default ({coords, imgSize, waldoRef}) => {
    const size = 4;
    return (
        <div 
            className={styles.box}
            style={{
                "--size": `${size}vw`,
                left: `calc(${(coords.x * imgSize.width)+waldoRef.current.offsetLeft}px - ${size/2}vw)`,
                top: `calc(${(coords.y * imgSize.height)+waldoRef.current.offsetTop}px - ${size/2}vw)`
            }}
        >
        </div>
    )
    
}