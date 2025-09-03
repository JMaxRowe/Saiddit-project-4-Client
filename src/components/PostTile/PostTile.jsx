import './PostTile.css'
import { Link } from "react-router";
import { useEffect, useState } from 'react'
import { setVote } from '../../utils/votes'
import { getToken } from '../../utils/auth'
import VoteController from '../VoteController/VoteController';

export default function PostTile ({post}){

    return(
        <div className="postCard" onClick={(e)=>e.stopPropagation()}>
            <div className="communityInfo">
                <p>{post.community.name}</p>
                <p>{post.poster.username}</p>
            </div>
            <Link to={`/posts/${post.id}/`}>
                <div className="PostTitle">
                    <h2>{post.title}</h2>
                </div>
                <div className="postBody">
                    <p>{post.body}</p>
                </div>
            </Link>
            <div className="postInteractions">
                <VoteController
                contentTypeId={post.contentTypeId}
                objectId={post.id}
                score={post.score}
                userVote={post.user_vote ?? 0}
                />

            </div>
        </div>
    )
}