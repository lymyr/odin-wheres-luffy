export default ({
    title="Dialog",
    ref=null,
    handleClick,
    children
}) => {
    
    return (
        <dialog ref={ref}>
            <h3>{title}</h3>
            <div>
                <div>
                    {children}
                </div>
                <div>
                    <button onClick={() => ref.current.close()}>Close</button>
                    {handleClick && <button onClick={handleClick}>Submit</button>}
                </div>
            </div>
        </dialog>
    )
}