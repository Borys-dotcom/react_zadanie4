import './Post.css'
import { useState } from "react"

const Post = (props) => {

    const [likesCount, setLikesCount] = useState(props.post.likes.length);

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
                <div className="likes">{likesCount}</div>
                <div className='btnContainer'>
                    {(props.user === props.post.user.username) &&
                        <button className='btn' onClick={()=>props.deletePost(props.post.id)}>usuń post</button>}
                </div>
            </div>
        </div>
    )
}

export default Post