import "./VoteController.css"
import { useEffect, useState } from "react"
import { setVote, clearVote } from '../../utils/votes'
import { getToken } from '../../utils/auth'
import { useNavigate } from 'react-router'
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

export default function VoteController({
    contentTypeId,
    objectId,
    score = 0,
    userVote = 0,
}
){
    const [currentScore, setCurrentScore] = useState(score)
    const [myVote, setMyVote] = useState(userVote)
    const navigate = useNavigate()

    useEffect(() => setCurrentScore(score), [score])
    useEffect(() => setMyVote(userVote), [userVote])

    const applyvote = (nextVote) => {
        const nextScore = currentScore + (nextVote - myVote)
        setMyVote(nextVote)
        setCurrentScore(nextScore)
    }

    const handleVote = async(value, e) => {
        e?.preventDefault?.()
        e?.stopPropagation?.()
        if (!getToken()){
            return navigate('/sign-in/')
        }

        const oldVote = myVote
        const oldScore = currentScore

        try {
            if (myVote === value){
                applyvote(0)
                await clearVote(contentTypeId, objectId)
            } else {
                applyvote(value)
                await setVote(contentTypeId, objectId, value)
            }
        } catch (error) {
            setMyVote(oldVote)
            setCurrentScore(oldScore)
            onChange && onChange(oldScore, oldVote)
        }
        
    }
    console.log(myVote)
    return(
        <>
            <div className="voteControls" onClick={(e)=>e.stopPropagation()}>
                <button
                type="button"
                className={`voteBtn up ${myVote===1?'active':''}`}
                onClick={(e)=>handleVote(1, e)}
                >
                <FaArrowUp />
                </button>

                <span className={`voteScore ${myVote === 1 ? "upvoted" : ""} ${myVote === -1 ? "downvoted" : ""}`}>{currentScore}</span>

                <button
                type="button"
                className={`voteBtn down ${myVote===-1?'active':''}`}
                onClick={(e)=>handleVote(-1, e)}
                >
                <FaArrowDown />
                </button>
            </div>
            
        </>
    )
}