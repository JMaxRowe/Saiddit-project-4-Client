import "./ImageUploadField.css"
import { uploadImage } from "../../services/cloudinary"
import { useState } from "react"

export default function ImageUploadField({image, setImage, imageUrl, setIsUploading, type = false}){
    const [error, setError] = useState('')

    const handleFileUpload = async (e) =>{
        setError('')
        setIsUploading(true)
        try {
            const file = e.target.files[0]
            if (type === 'video' && !file.type.startsWith('video/')) {
                setError('You did not upload a video file.')
                setIsUploading(false)
                return
            }

            if (type === 'image' && !file.type.startsWith('image/')) {
                setError('You did not upload an image file.')
                setIsUploading(false)
                return
            }
            const {data} = await uploadImage(file)
            setImage(data.secure_url)
        } catch (error) {
            setError('Media file upload failed.')
        } finally {
            setIsUploading(false)
        }
    }

    const displayImage = imageUrl

    return(
        <>
        {displayImage ? (
        <img className={`uploaded ${image}`} src={displayImage} />) : null}
        <input type="file" name={image} id={image} onChange={handleFileUpload}/>
        {error && <p className='error-message'>{error}</p>}
        </>
    )
}