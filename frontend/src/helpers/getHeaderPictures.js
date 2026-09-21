import luffy from "../assets/profiles/luffy.jpg"
import zoro from "../assets/profiles/zoro.jpg"
import sanji from "../assets/profiles/sanji.jpg"
import waldo from "../assets/profiles/waldo.jpg"

// was planning to serve images from backend but nvm
export default () => {
    return {
        Luffy: {
            img: luffy
        },
        Zoro: {
            img: zoro
        },
        Sanji: {
            img: sanji
        },
        Waldo: {
            img: waldo
        }
    }
}