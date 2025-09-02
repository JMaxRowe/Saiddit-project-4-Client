import './Postpage.css'
import { useEffect, useState, useContext } from "react";
import { getPost, deletePost } from '../../utils/posts';
import { Link, useParams, useNavigate } from "react-router";
import { UserContext } from '../../contexts/UserContext';
import { topLevelComments } from '../../utils/comments';

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
                <h1>{post.title}</h1>
            </div>
            <div className="commentsSection">
                    {isLoading 
                    ? 'Loading...'
                    :
                    comments.length > 0 ? (
                        comments.map((comment) => {
                            return (
                            <div key={comment.id} className="commentTile">
                                commenter: {comment.commenter.username} <br />
                                {comment.body}
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