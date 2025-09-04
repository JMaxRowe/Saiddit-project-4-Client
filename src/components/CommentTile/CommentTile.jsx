import "./CommentTile.css"
import { Link } from "react-router";
import VoteController from "../VoteController/VoteController";
import { deleteComment, restoreComment } from "../../utils/comments";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function CommentTile ({comment}){
    const [error, setError] = useState(null)
    const {user} = useContext(UserContext)
    const [isDeleted, setIsDeleted] = useState(comment.is_deleted)

    const toggleRemoveComment = async() => {


        

        try {
            if(isDeleted){
                await deleteComment(comment.id)
            } else {
                await restoreComment(comment.id)
            }
        } catch (error) {
            setError(error)
        }
    }

    return(
            <div className="commentCard">
                <div className="commentInfo">
                    {isDeleted ? <div className='userInfo'>[Anonymous User]</div> : <div className="userInfo">{comment.commenter.username}</div>}
                    {user.id === comment.commenter.id && 
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