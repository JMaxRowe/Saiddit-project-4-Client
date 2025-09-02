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

    return(
        <main className='homePage'>
            <h1>Home</h1>
            <div className="postsGrid">
                {isLoading 
                ? 'Loading...'
                :
                posts.length > 0 ? (
                    posts.map((post) => {
                        return (
                        <div key={post.id} className="postTile">
                            <PostTile post={post}/>
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