import './Home.css'
import { postsIndex } from '../../utils/posts'
import { useEffect, useState } from "react";
import PostTile from '../PostTile/PostTile';


export default function Home(){
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setErrors] = useState(null);

    useEffect(() => {
        const getPostData = async () => {
        setIsLoading(true);
        try {
            const { data } = await postsIndex();
            setPosts(data);
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

    return(
        <main className='homePage'>
            <h1>Home</h1>
            <div className="postsGrid">
                {isLoading 
                ? 'Looking for posts...'
                :
                posts.length > 0 ? (
                    posts.map((post) => {
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