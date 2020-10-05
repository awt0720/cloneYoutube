import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDisLikes from './LikeDisLikes';

function SingleComment({ postId, comment, refresh }) {
    const [inputText, setInputText] = useState('');
    const [isShow, setIsShow] = useState(false);
    const user = useSelector(state => state.userState);
    const handleClick = (e) => {
        setInputText(e.currentTarget.value)
    }
    const handleIsShow = () => {
        setIsShow(!isShow)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const value = {
            content: inputText,
            writer: user.userData._id,
            postId,
            responseTo: comment._id,
        }
        axios.post('/api/comment/saveComment', value)
            .then(res => {
                if (res.data.success) {
                    refresh(res.data.result)
                } else {
                    console.log('리플 댓글 실패')
                }
            })
        setIsShow(!isShow)
    }
    return (
        <div>
            <div>
                <span>작성자 : {comment.writer.name}</span><br />
                <span>{comment.content}</span>
            </div>
            <button onClick={handleIsShow}>Reply to</button>
            <LikeDisLikes userId={localStorage.getItem('userId')} commentId={comment._id} />
            {isShow && <form onSubmit={onSubmit}>
                <textarea value={inputText} onChange={handleClick} placeholder="댓글을 작성해주세요" />
                <br />
                <button onClick={onSubmit}>작성완료</button>
            </form>}
        </div>
    )
}

export default SingleComment
