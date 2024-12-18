import axios from 'axios'
import './Recommendations.css'
import { useEffect, useState } from 'react'

const Recommendations = (props) => {

    const [recommendedUsers, setRecommendedUsers] = useState([]);

    const getRecommendedUsersData = () => {

        setRecommendedUsers([]);
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((res) => {
                setRecommendedUsers(() => {
                    return res.data
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const followUser = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/follow', {
            "leader_id": id
        })
        .then((res) => {
            // getRecommendedUsersData();
            props.getLatestPosts();
        })
        .catch((err) => {
            console.error(err);
        })
    }


    useEffect(() => {
        getRecommendedUsersData();
    }, [props.displayablePosts])

    return (
        <div className='recommendations'>

            {recommendedUsers.map((user, index) => {
                return (<div className='recommendedUser' key={index}>
                    <div className='imageHolder'>
                        <img src={user.avatar_url} />
                        <h3>{user.username}</h3>
                        <button className='btn' onClick={()=>followUser(user.id)}>Follow</button>
                    </div>
                </div>)
            })}

        </div>
    )

}

export default Recommendations