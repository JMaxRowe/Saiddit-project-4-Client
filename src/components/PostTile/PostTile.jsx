import './PostTile.css'
import { Link } from "react-router";
import { useEffect, useState } from 'react'
import { setVote } from '../../utils/votes'
import { getToken } from '../../utils/auth'

export default function PostTile ({post}){

    return(
        <Link to={`/posts/${post.id}/`}>
            <div className="postCard" onClick={(e)=>e.stopPropagation()}>
                <div className="communityInfo">
                    <p>{post.community.name}</p>
                    <p>{post.poster.username}</p>
                </div>
                <div className="PostTitle">
                    <h2>{post.title}</h2>
                </div>
                <div className="postBody">
                    <p>{post.body}</p>
                    <p>{post.score}</p>
                    
                </div>
            </div>
        </Link>
    )
}