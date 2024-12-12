import './Home.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import Recommendations from '../components/Recommendations';

const Home = (props) => {

    const [displayablePosts, setDisplayablePosts] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    // const [recommendedUsers, setRecommendedUsers] = useState([]);

    // const getRecommendedUsersData = () => {

    //     setRecommendedUsers([]);
    //     axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
    //         .then((res) => {
    //             setRecommendedUsers(() => {
    //                 return res.data
    //             })
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         })
    // }

    const loadAllFollowedUsers = () => {
        if (props.user === null) return

        axios.post('https://akademia108.pl/api/social-app/follows/allfollows')
            .then((res) => {
                setFollowedUsers(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getLatestPosts = () => {
        axios.post('https://akademia108.pl/api/social-app/post/latest')
            .then((response) => {
                setDisplayablePosts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const getPrevPosts = () => {
        let firstPostDate = displayablePosts[0].created_at;
        axios.post('https://akademia108.pl/api/social-app/post/newer-then', {
            date: firstPostDate
        })
            .then((response) => {
                setDisplayablePosts(response.data.concat(displayablePosts));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const getNextPosts = () => {
        let lastPostDate = displayablePosts[displayablePosts.length - 1].created_at;
        axios.post('https://akademia108.pl/api/social-app/post/older-then', {
            date: lastPostDate
        })
            .then((response) => {
                setDisplayablePosts(displayablePosts.concat(response.data));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const deletePost = (id) => {
        axios.post('https://akademia108.pl/api/social-app/post/delete', {
            "post_id": id
        })
            .then(() => {
                setDisplayablePosts((posts) => {
                    return posts.filter((post) => post.id !== id);
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        getLatestPosts();
        loadAllFollowedUsers();
    }, [props.user]);

    return (
        <div className='home'>
            {/* {props.user && <Recommendations getLatestPosts={getLatestPosts} getRecommendedUsersData={getRecommendedUsersData} recommendedUsers={recommendedUsers}/>} */}
            {props.user && <Recommendations getLatestPosts={getLatestPosts} displayablePosts={displayablePosts}/>}
            {props.user && <AddPost getPrevPosts={getPrevPosts} />}
            <div className="postContainer">
                {displayablePosts.map((post) => {
                    // return <Post post={post} user={props.user} key={post.id} followedUsers={followedUsers} deletePost={deletePost} getLatestPosts={getLatestPosts} getRecommendedUsersData={getRecommendedUsersData}/>
                    return <Post post={post} user={props.user} key={post.id} getLatestPosts={getLatestPosts}  followedUsers={followedUsers} deletePost={deletePost} />
                })}
            </div>
            <button className='btn' onClick={getNextPosts}>Next Posts</button>
        </div>
    )
}

export default Home;