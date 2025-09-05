import "./CommentTile.css"
import { Link } from "react-router";
import VoteController from "../VoteController/VoteController";
import { deleteComment, restoreComment } from "../../utils/comments";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getToken } from "../../utils/auth";

export default function CommentTile ({comment, onUpdate}){
    const [error, setError] = useState(null)
    const {user} = useContext(UserContext)
    const [isDeleted, setIsDeleted] = useState(comment.is_deleted)
    const is_signed_in = getToken()
    const [isLoading, setIsLoading] = useState(false)

    const toggleRemoveComment = async () => {
        setError(null)
        setIsLoading(true)
        try {
        const { data: updated } = isDeleted
            ? await restoreComment(comment.id)
            : await deleteComment(comment.id)

        setIsDeleted(updated.is_deleted)

        onUpdate?.(updated)
        } catch (err) {
        setError('Failed to update comment')
        } finally {
        setIsLoading(false)
        }
    }

    return(
            <div className="commentCard">
                <div className="commentInfo">
                    {isDeleted ? <div className='userInfo'>[Anonymous User]</div> : <div className="userInfo">{comment.commenter.username}</div>}
                    {is_signed_in && user.id === comment.commenter.id && 
                        <button className={isDeleted ? "restoreButton" : "deleteButton"} onClick={toggleRemoveComment}>{isDeleted ? "Restore" : "Delete"} </button>}
                    
                </div>
                
                <div className="commentTitle">
                    {isDeleted ? <p className="commentMessage">[Comment Removed]</p> : <p className="commentMessage">{comment.body}</p>}
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