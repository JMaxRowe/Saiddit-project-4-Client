import "./CommentTile.css"
import { Link } from "react-router";
import VoteController from "../VoteController/VoteController";

export default function CommentTile ({comment}){

    return(
            <div className="commentCard">
                <div className="userInfo">{comment.commenter.username}</div>
                <div className="commentTitle">
                    <p className="commentMessage">{comment.body}</p>
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