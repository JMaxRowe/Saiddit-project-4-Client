import './SignInForm.css'
import { useState, useContext } from 'react'
import {signIn } from '../../services/users'
import { Link, useNavigate } from 'react-router'
import { setToken, getUser } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

export default function SignInForm(){
    const {setUser} = useContext(UserContext)

    const [formData, setformData] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        setError(null)
        e.preventDefault()
        try {
            const {data} = await signIn(formData)
            setToken(data.access)
            setUser(getUser())
            navigate("/")
        } catch (error) {
            console.log(error)
            setError(error.response.data)
        }
    }

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <form className="form" onSubmit={handleSubmit}>


            <label htmlFor="username">Username</label>
            <input type="text" name='username' id='username' placeholder='username' value={formData.username} onChange={handleChange} />

            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' placeholder='********' value={formData.password} onChange={handleChange}/>

            {error && <p className='error-message'>Please ensure your username/email and password are correct</p>}
            <button type="submit">Sign-In</button> 
            <Link to={"/sign-up/"}>Don't have an account?</Link>
        </form>
    )
}