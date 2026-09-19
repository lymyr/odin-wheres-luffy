import { useState, useEffect } from "react";

export default () => {
    const [wSize, setWSize] = useState(window.innerWidth)

    useEffect(() => {
        function handleWindowSizeChange () {
            setWSize({width: window.innerWidth, height: window.innerHeight});
        };
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return wSize
}