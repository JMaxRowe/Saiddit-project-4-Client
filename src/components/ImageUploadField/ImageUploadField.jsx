import "./ImageUploadField.css"
import { uploadImage } from "../../services/cloudinary"
import { useState } from "react"

export default function ImageUploadField({image, setImage, imageUrl, setIsUploading, showPlaceholder, placeholderSrc = false}){
    const [error, setError] = useState('')

    const handleFileUpload = async (e) =>{
        setError('')
        setIsUploading(true)
        try {
            const file = e.target.files[0]
            const {data} = await uploadImage(file)
            setImage(data.secure_url)
        } catch (error) {
            setError(error)
        } finally {
            setIsUploading(false)
        }
    }

    const displayImage = imageUrl || (showPlaceholder ? placeholderSrc : null)

    return(
        <>
        {displayImage ? (
        <img className={`uploaded ${image}`} src={displayImage} />) : null}
        <input type="file" name={image} id={image} onChange={handleFileUpload}/>
        {error && <p className='error-message'>{error}</p>}
        </>
    )
}