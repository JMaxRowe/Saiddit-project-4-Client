import './PostTile.css'
import { Link } from "react-router";
import { useEffect, useState } from 'react'
import { setVote } from '../../utils/votes'
import { getToken } from '../../utils/auth'
import VoteController from '../VoteController/VoteController';
import { useNavigate } from 'react-router';
import { MdOutlineInsertComment } from "react-icons/md";


export default function PostTile ({post}){
    const navigate = useNavigate()

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