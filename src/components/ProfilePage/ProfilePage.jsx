import { useContext, useState, useEffect } from 'react'
import './ProfilePage.css'
import { UserContext } from '../../contexts/UserContext'
import { postsIndex } from '../../utils/posts'
import PostTile from '../PostTile/PostTile'


export default function ProfilePage(){
    const { user } = useContext(UserContext)
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setErrors] = useState(null);
    
    useEffect(() => {
        const getPostData = async () => {
        setIsLoading(true);
        try {
            const { data } = await postsIndex();
            console.log('out')
            setPosts(data);
            console.log(posts)
        } catch (error) {
            setErrors(error);
        } finally {
            setIsLoading(false);
        }
        };
        getPostData();
    }, []);

    const handleCommunityUpdate = (updatedCommunity) => {
        setPosts(prevPosts =>
            prevPosts.map(p =>
                p?.community?.id === updatedCommunity?.id
                    ? { ...p, community: updatedCommunity }
                    : p
            )
        );
    };

    if (isLoading) return <main className='profilePage'><p>Looking for posts…</p></main>
    if (error)     return <main className='profilePage'><p>Couldn’t load posts.</p></main>
    if (!user)     return <main className='profilePage'><p>Please sign in.</p></main>

    const myPosts = posts.filter(post => post?.poster?.id === user?.id)

    return(
        <main className='profilePage'>
            <h1>{user.username}'s Profile Page</h1>
            <div className="postsGrid">
                            {isLoading 
                            ? 'Looking for posts...'
                            :
                            myPosts.length > 0 ? (
                                myPosts.map((post) => {
                                    return (
                                    <div key={post.id} className="postTile">
                                        <PostTile post={post} onCommunityUpdate={handleCommunityUpdate}/>
                                    </div>
                                    );
                                })
                                ) : (
                                <p>There are no posts</p>
                                )
                            }
                            
                        </div>
        </main>
    )
}