import './CommunityPage.css'
import { postsIndex } from '../../utils/posts'
import { useEffect, useState } from "react";
import PostTile from '../PostTile/PostTile';
import { useParams, useNavigate } from "react-router";
import { getCommunity } from '../../services/communities';

export default function CommunityPage(){
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setErrors] = useState(null);
    const { communityId } = useParams()
    const [community, setCommunity] = useState(null)



    useEffect(() => {
        const getCommunityData = async () => {
        setIsLoading(true);
        try {
            const { data } = await getCommunity(communityId);
            setCommunity(data);
            console.log(community)
        } catch (error) {
            setErrors(error);
        } finally {
            setIsLoading(false);
        }
        };
        getCommunityData();
    }, []);
    

    useEffect(() => {
        const getPostData = async () => {
        setIsLoading(true);
        try {
            const { data } = await postsIndex();
            const filteredData = data.filter(p => p.community.id === Number(communityId))
            setPosts(filteredData);
            console.log(posts)
        } catch (error) {
            setErrors(error);
        } finally {
            setIsLoading(false);
        }
        };
        getPostData();
    }, []);

    if (isLoading) return <p>Looking for posts…</p>
    if (error) return <p>{error.message} </p>
    if (!posts) return <p>Posts not found</p>
    if (!community) return <p>Community not found</p>

    return(
        <main className='communityPage'>
            <h1>{community.name}</h1>
            <div className="postsGrid">
                {isLoading 
                ? 'Looking for posts...'
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