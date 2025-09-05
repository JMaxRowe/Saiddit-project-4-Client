import './PostPage.css'
import { useEffect, useState, useContext } from "react";
import { getPost, deletePost } from '../../utils/posts';
import { Link, useParams, useNavigate } from "react-router";
import { UserContext } from '../../contexts/UserContext';
import { topLevelComments } from '../../utils/comments';
import CommentTile from '../CommentTile/CommentTile';
import VoteController from '../VoteController/VoteController';
import { FaEdit } from "react-icons/fa";
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";
import { MdOutlineInsertComment } from "react-icons/md";
import CreateComment from '../CreateComment/CreateComment';
import { getToken } from '../../utils/auth';



export default function PostPage(){
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const is_signed_in = getToken()

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

    const handleCommentUpdated = (updated) => {
        setComments(prev =>
            prev.map(c => c.id === updated.id ? { ...c, ...updated } : c)
        )
}

    const archivePost = async() => {
        try {
            console.log('deleting')
            await deletePost(postId)
            console.log('deleted')
        } catch (error) {
            console.log(error)
            setError('failed to delete post')
        }
    }

    if (isLoading) return <p>Loading…</p>
    if (error) return <p>Post not found </p>
    if (!post) return <p>Where's the post?</p>

    return(
        <main className='postPage'>
            <div className="postSection">
                <div className="postHeader">
                    {post.is_deleted ? 
                    <p>[Anonymous]</p>
                    :
                    <div className="postInfo">
                        <p>{post.community.name}</p>
                        <p>{post.poster.username}</p>
                    </div>
                    }
                    
                    {is_signed_in && !post.is_deleted && (post.poster.id === user?.id) && (
                        <div className="ownerOptions">
                        <button className='editPostButton' onClick={() => navigate(`/posts/${postId}/edit/`)}><FaEdit /></button>
                        <button className='archivePostButton' onClick={archivePost}><HiMiniArchiveBoxXMark /></button>
                    </div>
                    )}
                    
                </div>
                {post.is_deleted ? 
                <h2>[Deleted Post]</h2>
                :
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
                }           

                <div className="postInteractions">
                    <VoteController 
                    contentTypeId={post.contentTypeId}
                    objectId={post.id}
                    score={post.score}
                    userVote={post.user_vote ?? 0}
                    />
                    <div className="commentsButton" >
                            <MdOutlineInsertComment /> {post.comments_count}
                    </div>
                </div>
            </div>
            <div className="commentsSection">
                {is_signed_in &&<div className="postcomment">
                    <CreateComment postId={postId} />
                </div>}
                
                <h4>Comments:</h4>
                    {isLoading 
                    ? 'Loading...'
                    :
                    comments.length > 0 ? (
                        comments.map((comment) => {
                            return (
                            <div key={comment.id} className="commentTile">
                                <CommentTile comment={comment} onUpdate={handleCommentUpdated}/>
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