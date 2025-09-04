import './Navbar.css'
import {Link} from 'react-router'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from '../../utils/auth';
import { useNavigate } from 'react-router';
import { communitiesIndex } from '../../services/communities';

export default function Navbar(){
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [communities, setCommunities] = useState([])
    const [errors, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
            const getCommunitiesData = async () => {
            setIsLoading(true);
            try {
                const { data } = await communitiesIndex();
                setCommunities(data);
            } catch (error) {
                setErrors(error);
            } finally {
                setIsLoading(false);
            }
            };
            getCommunitiesData();
        }, []);

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
                        <Link to='/profile/'>{user.username}'s profile</Link>
                        <Link to='/posts/create/'>Create a Post</Link>
                        <button
                        type="button"
                        className="signout-btn"
                        onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                        <h4>Communities:</h4>
                        <div className="communitiesGrid">
                            {isLoading 
                            ? 'Searching for communities...'
                            :
                            communities.length > 0 ? (
                            communities.map((community) => {
                                return (
                                <div key={community.id} className="communityTile">
                                    <Link to={`/communities/${community.id}/`} >{community.name}</Link>
                                </div>
                                );
                            })
                            ) : (
                            <p>There are no communities</p>
                            )
                            }

                        </div>
                        
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