import './Post.css'
import { useEffect, useState } from "react"
import axios from 'axios';

const Post = (props) => {

    const [likesCount, setLikesCount] = useState(props.post.likes.length);
    const [displayModal, setDisplayModal] = useState(false);
    const [isPostLikedByUser, setIsPostLikedByUser] = useState(false);

    useEffect(() => {
        props.post.likes.forEach((like) => {
            if (like.username === props.user) {
                setIsPostLikedByUser(true);
            }
        })
    }, []);

    const postLike = () => {

        axios.post('https://akademia108.pl/api/social-app/post/like', {
            "post_id": props.post.id
        })
            .then(() => {
                setLikesCount((prevLikesCount) => {
                    return prevLikesCount + 1
                });
                setIsPostLikedByUser(true);
            })
            .catch((err) => {
                console.error(err);
            })

    }

    const postDislike = () => {

        axios.post('https://akademia108.pl/api/social-app/post/dislike', {
            "post_id": props.post.id
        })
            .then((res) => {
                setLikesCount((prevLikesCount) => {
                    return prevLikesCount - 1
                });
                setIsPostLikedByUser(false);
            })
            .catch((err) => {
                console.error(err);
            })

    }

    return (
        <div className='post'>
            <div className="avatar">
                <img src={props.post.user.avatar_url} alt={props.post.user.username} />
            </div>
            <div className="postData">
                <div className="postMeta">
                    <div className="author">{props.post.user.username}</div>
                    <div className="data">{props.post.created_at.substring(0, 10)}</div>
                </div>
                <div className="postContent">{props.post.content}</div>
                <div className='likeDislike'>
                    <div className='likeDislikeBtnContainer'>
                        {!isPostLikedByUser && props.user &&
                            <button className='btn like' onClick={postLike}>Like</button>}
                        {isPostLikedByUser && props.user &&
                            <button className='btn dislike' onClick={postDislike}>Dislike</button>}
                    </div>
                    <div className="likes">{likesCount}</div>
                </div>
                <div className='btnContainer'>
                    {(props.user === props.post.user.username) &&
                        <button className='btn' onClick={() => setDisplayModal(true)}>usuń post</button>}
                </div>
            </div>
            {displayModal &&
                <div className='modalMessage'>
                    <h3>Czy chcesz usunąć post?</h3>
                    <button className='btn yes' onClick={() => props.deletePost(props.post.id)}>Tak</button>
                    <button className='btn no' onClick={() => setDisplayModal(false)}>Nie</button>
                </div>
            }
        </div>
    )
}

export default Post