import './CreateComment.css'
import { useState } from 'react'
import { createComment } from '../../utils/comments'
import {useNavigate} from 'react-router'

export default function CreateComment({postId, }){
    const [formData, setFormData] = useState({
        body: '',
        post: postId
    })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
            e.preventDefault()
            setSubmitting(true)
            try {
                
                const {data} = await createComment(formData)
                setFormData(prev => ({ ...prev, body: '' }))
                navigate(`/posts/${postId}`)
            } catch (error) {
                console.log(error)
                setError(error.response.data)
            } finally {
                setSubmitting(false)
            }
        }

        const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    return (
    <form className="createCommentForm" onSubmit={handleSubmit}>
        <textarea
            className='commentBox'
            type="text"
            name="body"
            placeholder="Write a comment…"
            value={formData.body}
            onChange={handleChange}
            disabled={submitting}
        />
        <button className= 'commentSubmitBtn' type="submit" disabled={submitting}>
            {submitting ? 'Posting…' : 'Submit'}
        </button>
        {error && <p className="error-message">{error}</p>}
        </form>
    )
}