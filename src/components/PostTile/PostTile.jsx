import './PostTile.css'
import { Link } from "react-router";
import { useEffect, useState, useContext } from 'react'
import { setVote } from '../../utils/votes'
import { getToken } from '../../utils/auth'
import VoteController from '../VoteController/VoteController';
import { useNavigate } from 'react-router';
import { MdOutlineInsertComment } from "react-icons/md";
import { UserContext } from '../../contexts/UserContext';
import { joinCommunity } from '../../services/communities';
import { leaveCommunity } from '../../services/communities';


export default function PostTile ({post}){
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const [isMember, setIsMember] = useState(false)
    const [error, setError] = useState({})

    useEffect(() => {
    if (user === post.community.members) {
        setIsMember(post.community.members.includes(user.id))
    }
}, [user, post])

    const handleToggle = async (e) => {
    e.stopPropagation()
    setError({})
    if (!user) {
        return navigate("/sign-in/")
    }

    try {
        if (isMember) {
            await leaveCommunity(post.community.id)
            setIsMember(false)
        } else {
            await joinCommunity(post.community.id)
            setIsMember(true)
        }
    } catch (err) {
        setError("Failed to toggle membership:")
    }
}




    return(
        <div className="postCard" onClick={(e)=>e.stopPropagation()}>
            <div className="communityInfo">
                {post.is_deleted ? 
                <p>[Anonymous]</p>
                :
                <>
                <div className="communityInfoDetails">
                    <p>{post.community.name}</p>
                    <p>{post.poster.username}</p>
                </div>
                <div className="communityActions">
                    <button 
                        className={`toggleJoin ${isMember ? "leave" : "join"}`} 
                        onClick={handleToggle}
                    >
                        {isMember ? "Leave" : "Join"}
                    </button>
                </div>
                </>
                
                }
            </div>
            {post.is_deleted ? 
                <h2>[Deleted Post]</h2>
                :
                <Link to={`/posts/${post.id}/`}>
                    <div className="PostTitle">
                        <h2>{post.title}</h2>
                    </div>
                    <div className="postBody">

                        {post.type === 'text' ? (
                            <p>{post.body}</p>
                        ) : post.type === 'image' ? (
                            post.media_url ? (
                            <img
                                className="postMedia"
                                src={post.media_url}
                                alt={post.title}
                            />
                            ) : null
                        ) : post.type === 'video' ? (
                            post.media_url ? (
                            <video
                                className="postMedia"
                                src={post.media_url}
                                controls
                                preload="metadata"
                                playsInline
                            >
                            </video>
                            ) : null
                        ) : null}
                    </div>
                </Link>
            }
            <div className="postInteractions">
                <VoteController
                contentTypeId={post.contentTypeId}
                objectId={post.id}
                score={post.score}
                userVote={post.user_vote ?? 0}
                comments_count={post.comments_count}
                />
                <div className="commentsButton" >
                    <button
                    type='button'
                    className="comments"
                    onClick={(e) => { e.stopPropagation(); navigate(`/posts/${post.id}/`) }}
                    >
                        <MdOutlineInsertComment /> {post.comments_count}
                    </button>
            </div>

            </div>

        </div>
    )
}