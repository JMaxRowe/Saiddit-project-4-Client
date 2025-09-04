import './CreatePostPage.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { createPost } from '../../utils/posts'
import ImageUploadField from '../ImageUploadField/ImageUploadField'
import { communitiesIndex } from '../../services/communities'

export default function CreatePostPage(){
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        type:'text',
        media_url: '',
        community_id: ''
    })

    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const [isUploading, setIsUploading] = useState(false)
    const [communities, setCommunities] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const loadCommunities = async () => {
            setIsLoading(true)
            try {
                const{ data } = await communitiesIndex()
                setCommunities(data)
            } catch (error) {
                setErrors(error)
            } finally{
                setIsLoading(false)
            }

        }
        loadCommunities()
    }, [])
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const {data} = await createPost(formData)
            navigate(`/posts/${data.id}`)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        } finally {
            setSubmitting(false)
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleTypeChange = (e) => {
        setFormData({ ...formData, type: e.target.value })
    }

    const setMediaUrl = (url) =>{
        setFormData({...formData, media_url: url})
    }

        const buttonLabel = isUploading
        ? 'Uploading cover art...'
        : submitting
        ? 'submitting...'
        : 'Submit'

    return(
        <form className="CreatePostForm" onSubmit={handleSubmit}>
            <h1>Create a post</h1>

            <label htmlFor="community_id">Community</label>
            <select name="community_id" id="community_id" value={formData.community_id} onChange={handleChange}>
                <option value="" disabled>Select a community…</option>
                {communities.map(community => (
                    <option key={community.id} value={community.id}>{community.name}</option>
                ))}
            </select>
            {errors.community_id && <p className='error-message'>{String(errors.community_id)}</p>}

            <label htmlFor="title">Post Title</label>
            <input type="text" name='title' placeholder='A Cool Title' value={formData.title} onChange={handleChange} />
            {errors.title && <p className='error-message'>{errors.title}</p>}

            <fieldset className="postType">
                <legend>Post Type</legend>
                <label><input type="radio" name="type" value="text"  checked={formData.type==='text'}  onChange={handleTypeChange}/> Text</label>
                <label><input type="radio" name="type" value="image" checked={formData.type==='image'} onChange={handleTypeChange}/> Image</label>
                <label><input type="radio" name="type" value="video" checked={formData.type==='video'} onChange={handleTypeChange}/> Video</label>
            </fieldset>

            {formData.type === 'text' ? (
                <>
                <label htmlFor="body">Body</label>
                <textarea id="body" name="body" rows={8} value={formData.body} onChange={handleChange}/>
                {errors.body && <p className='error-message'>{errors.body}</p>}
                </>
            ) : (
                <>
                <ImageUploadField image="media_url" setImage ={setMediaUrl} imageUrl={formData.media_url} setIsUploading={setIsUploading}/>
                </>
            )}
            {errors.global && <p className='error-message'>{errors.global}</p>}
            <button className='createPost' disabled={isUploading || submitting}type="submit">{buttonLabel}</button>
        </form>
    )

}