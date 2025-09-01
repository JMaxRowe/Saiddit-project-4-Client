import './Navbar.css'
import {Link} from 'react-router'
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from '../../utils/auth';
import { useNavigate } from 'react-router';

export default function Navbar(){
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate("/");
        removeToken();
        setUser(null);
    };
    return(
        <header>
            <div className="logo">Saiddit</div>
            <nav>
                <Link to='/'>Home</Link>
                {user ?(
                    <>
                        <button
                        type="button"
                        className="signout-btn"
                        onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </>
                ):
                <>
                    <Link to='/sign-in'>Sign-in</Link>
                    <Link to='/sign-up'>Sign-up</Link>
                </>
                
                }
                
            </nav>
        </header>
    )
}