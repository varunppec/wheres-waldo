import { useNavigate } from "react-router-dom";
import style from "../styles/styles.css";
const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="header" style={style}>
            <h1 onClick={() => navigate("/")}>Where's Waldo?</h1>
        </div>
    )
}

export default Header;