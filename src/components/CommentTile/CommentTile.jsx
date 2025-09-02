import "./CommentTile.css"
import { Link } from "react-router";

export default function CommentTile ({comment}){

    return(
            <div className="commentCard">
                <div className="userInfo">{comment.commenter.username}</div>
                <div className="commentTitle">
                    <p className="commentMessage">{comment.body}</p>
                </div>
                <div className="commentInteractions">
                    <span>{comment.score}</span>
                </div>
            </div>
    )
}