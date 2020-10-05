import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment({ CommentsList, parentCommentId, postId, refresh }) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [isShowReply, setIsShowReply] = useState(false)
    const videoId = postId

    useEffect(() => {
        let commentNumber = 0;

        CommentsList.map(comment => {
            if (comment.responseTo === parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [CommentsList])

    let renderReply = () => CommentsList.map((comment, index) => (
        <>
            {comment.responseTo === parentCommentId &&
                <div>
                    <SingleComment comment={comment} postId={videoId} refresh={refresh} />
                    <ReplyComment CommentsList={CommentsList} parentCommentId={comment._id} postId={postId} />
                </div>}

        </>
    ))

    const onhandleChange = () => {
        setIsShowReply(!isShowReply)
    }

    return (
        <>
            <div style={{ marginLeft: '20px' }}>
                <div onClick={onhandleChange}>
                    {ChildCommentNumber > 0 && <div>View {ChildCommentNumber} more Comment</div>}
                </div>
                <br />

                {isShowReply && renderReply(parentCommentId)}
            </div>
        </>
    )
}

export default ReplyComment
