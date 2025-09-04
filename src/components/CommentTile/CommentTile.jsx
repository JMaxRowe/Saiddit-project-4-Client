import "./CommentTile.css"
import { Link } from "react-router";
import VoteController from "../VoteController/VoteController";
import { deleteComment } from "../../utils/comments";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function CommentTile ({comment}){
    const [error, setError] = useState(null)
    const {user} = useContext(UserContext)

    const removeComment = () => {
        try {
            deleteComment(comment.id)
        } catch (error) {
            setError(error)
        }
    }

    return(
            <div className="commentCard">
                <div className="commentInfo">
                    {comment.is_deleted ? <div className='userInfo'>[Anonymous User]</div> : <div className="userInfo">{comment.commenter.username}</div>}
                    {user.id === comment.commenter.id && <button className="deleteButton" onClick={removeComment}>delete </button>}
                    
                </div>
                
                <div className="commentTitle">
                    {comment.is_deleted ? <p className="commentMessage">[Comment Removed]</p> : <p className="commentMessage">{comment.body}</p>}
                </div>
                <div className="commentInteractions">
                    <VoteController
                    contentTypeId={comment.contentTypeId}
                    objectId={comment.id}
                    score={comment.score}
                    userVote={comment.user_vote ?? 0}
                    />
                </div>
            </div>
    )
}