import './Navbar.css'
import {Link} from 'react-router'

export default function Navbar(){
    return(
        <header>
            <div className="logo">Saiddit</div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/sign-in'>Sign-in</Link>
                <Link to='/sign-up'>Sign-up</Link>
            </nav>
        </header>
    )
}