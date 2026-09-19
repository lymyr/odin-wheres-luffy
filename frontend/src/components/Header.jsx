export default ({
    normCoord,
    names
}) => {
    return (
        <header 
            style={{backgroundColor: "white"}}
        >
            <ul>
                {names.map(name => {
                    return (
                        // todo: change class name if found
                        <li className="" key={name.name}>
                            <img />
                            <p>{name.name}</p>
                        </li>
                    )
                })}
                
            </ul>
            <div >
                {normCoord.x}, {normCoord.y}
            </div>
        </header>
    ) 
}