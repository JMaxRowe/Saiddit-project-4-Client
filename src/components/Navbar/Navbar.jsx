import './Navbar.css'
import {Link} from 'react-router'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from '../../utils/auth';
import { useNavigate } from 'react-router';
import { communitiesIndex } from '../../services/communities';
import { LiaRobotSolid } from "react-icons/lia";
import { GiPublicSpeaker } from "react-icons/gi";




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
                console.log('hello')
                const { data } = await communitiesIndex();
                setCommunities(data);
            } catch (error) {
                setErrors(error);
            } finally {
                setIsLoading(false);
            }
            };
            getCommunitiesData();
        }, [user]);

    const handleSignOut = () => {
        navigate("/");
        removeToken();
        setUser(null);
    };

    const myCommunities = communities.filter(c => c.is_member === true)

    return(
        <header>
            <div className="logoSection">
                <div className="logo"><GiPublicSpeaker /></div>
                <div className='logoName'>Saiddit</div>
            </div>
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
                        <h4>Joined Communities:</h4>
                        <div className="communitiesGrid">
                            {isLoading 
                            ? 'Searching for communities...'
                            :
                            myCommunities.length > 0 ? (
                            myCommunities.map((community) => {
                                return (
                                <div key={community.id} className="communityTile">
                                    <Link to={`/communities/${community.id}/`} >{community.name}</Link>
                                </div>
                                );
                            })
                            ) : (
                            <p>You haven't joined any communities :(</p>
                            )
                            }

                        </div>
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