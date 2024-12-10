import './AddPost.css'
import { useState } from 'react'
import axios from 'axios';

const AddPost = (props) => {

    const [message, setMessage] = useState('');
    const [postData, setPostData] = useState('');

    const handlePostData = (e) => {
        setPostData((prevPostData) => {
            return { ...prevPostData, content: e.target.value }
        })
    }

    const clearMessage = () => {
        setMessage('');
    }

    const uploadPost = (e) => {
        e.preventDefault();
        
        if (!postData.content) return;

        axios.post('https://akademia108.pl/api/social-app/post/add', postData)
            .then((res) => {
                setPostData((prevPostData) => {
                    return {...prevPostData, content: ''};
                });
                props.getPrevPosts();
                setMessage(res.data.message);
                setTimeout(
                    clearMessage
                    , 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='postAdd'>
            <h2>Dodaj nowy post</h2>
            <form className='postAddForm'>
                <textarea placeholder='Wpisz treść posta...' value={postData.content} onChange={handlePostData} />
                {/* <input type='text' onChange={handlePostData}></input> */}
                <button className='btn' onClick={uploadPost}>Dodaj post</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default AddPost