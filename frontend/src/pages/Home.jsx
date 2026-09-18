import { NavLink } from "react-router"

export default () => {
    return (
        <div>
            <div>
                <h1>Where's</h1>
                <h1>Luffy</h1>
            </div>
            <div>
                <NavLink to="/sail">
                    <button>Sail the seas!</button>
                </NavLink>
                <p>Let's go find Luffy!</p>
            </div>
        </div>
    )
}