import './PostPage.css'
import { useEffect, useState, useContext } from "react";
import { getPost, deletePost } from '../../utils/posts';
import { Link, useParams, useNavigate } from "react-router";
import { UserContext } from '../../contexts/UserContext';
import { topLevelComments } from '../../utils/comments';
import CommentTile from '../CommentTile/CommentTile';
import VoteController from '../VoteController/VoteController';

export default function PostPage(){
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        const getPostData = async () => {
            setIsLoading(true)
            try {
                const { data } = await getPost(postId)
                setPost(data)
            } catch (err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
            }
            getPostData()
    }, [postId])

    useEffect(() => {
        const getCommentData = async () => {
            setIsLoading(true)
            try {
                const { data } = await topLevelComments(postId)
                setComments(data)
            } catch (err) {
                console.log(err)
                setError(err)
            } finally {
                setIsLoading(false)
            }
            }
            getCommentData()
    }, [postId])

    if (isLoading) return <p>Loading…</p>
    if (error) return <p>Post not found </p>
    if (!post) return <p>Where's the post?</p>

    return(
        <main className='postPage'>
            <div className="postSection">
                <div className="postInfo">
                    <p>{post.community.name}</p>
                <p>{post.poster.username}</p>
                </div>

                
                

                    <div className="postBody">
                        <h2>{post.title}</h2>

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

                    <div className="postInteractions">
                        <VoteController 
                        contentTypeId={post.contentTypeId}
                        objectId={post.id}
                        score={post.score}
                        userVote={post.user_vote ?? 0}
                        />
                    </div>
            </div>
            <div className="commentsSection">
                <h4>Comments:</h4>
                    {isLoading 
                    ? 'Loading...'
                    :
                    comments.length > 0 ? (
                        comments.map((comment) => {
                            return (
                            <div key={comment.id} className="commentTile">
                                <CommentTile comment={comment} />
                            </div>
                            );
                        })
                        ) : (
                        <p>There are no comments</p>
                        )
                    }
                    
                </div>
            
        </main>
    )
}