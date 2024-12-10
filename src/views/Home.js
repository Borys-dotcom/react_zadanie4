import './Home.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import AddPost from '../components/AddPost';

const Home = (props) => {

    const [displayablePosts, setDisplayablePosts] = useState([]);

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
                })})
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        getLatestPosts();
    }, [props.user]);

    return (
        <div className='home'>
            {props.user && <AddPost getPrevPosts={getPrevPosts} />}
            <div className="postContainer">
                {displayablePosts.map((post) => {
                    return <Post post={post} user={props.user?.username} key={post.id} deletePost={deletePost} />
                })}
            </div>
            <button className='btn' onClick={getNextPosts}>Next Posts</button>
        </div>
    )
}

export default Home;