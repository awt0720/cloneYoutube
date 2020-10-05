import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment({ CommentsList, refresh }) {
    const [inputText, setInputText] = useState('')
    let { videoId } = useParams()
    const user = useSelector(state => state.userState)

    const handleClick = (e) => {
        setInputText(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const value = {
            content: inputText,
            writer: user.userData._id,
            postId: videoId
        }

        axios.post('/api/comment/saveComment', value)
            .then(res => {
                if (res.data.success) {
                    setInputText("")
                    refresh(res.data.result)
                } else {
                    console.log('댓글 저장 실패')
                }
            })
    }
    return (
        <div>
            <p> 댓글</p>
            <hr />
            {CommentsList && CommentsList.map((comment, index) => (
                (!comment.responseTo &&
                    <div>
                        <SingleComment comment={comment} postId={videoId} refresh={refresh} />
                        <ReplyComment CommentsList={CommentsList} parentCommentId={comment._id} postId={videoId} refresh={refresh} />
                    </div>)
            ))}
            <hr />
            <form onSubmit={onSubmit}>
                <textarea value={inputText} onChange={handleClick} placeholder="댓글을 작성해주세요" />
                <br />
                <button onClick={onSubmit}>작성완료</button>
            </form>
        </div>
    )
}

export default Comment
