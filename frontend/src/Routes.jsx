import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Waldo from "./pages/Waldo";

export default [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/sail",
        element: <Waldo />
    },
    {
        path: "/sail/leaderboard",
        element: <Leaderboard />
    }
]