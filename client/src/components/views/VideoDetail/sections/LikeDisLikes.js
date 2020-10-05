import React, { useEffect, useState } from 'react'
import axios from 'axios'

function LikeDisLikes({ video, videoId, userId, commentId }) {
    const [Likes, setLikes] = useState(0)
    const [DisLikes, setDisLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)
    let value = {}
    console.log(LikeAction)
    if (video) {

        value = { videoId, userId }
    } else {
        value = { commentId, userId }
    }

    useEffect(() => {
        axios.post('/api/like/getLikes', value)
            .then(res => {
                if (res.data.success) {

                    // 좋아요 누른 갯수
                    setLikes(res.data.likes.length)

                    //좋아요를 눌럿는지
                    res.data.likes.map(like => {
                        if (like.userId === userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    console.log('좋아요 정보 가져오기 실패 :(')
                }
            })

        axios.post('/api/like/getDisLikes', value)
            .then(res => {
                if (res.data.success) {

                    // 싫어요 누른 갯수
                    setDisLikes(res.data.dislikes.length)

                    // 싫어요를 눌럿는지
                    res.data.dislikes.map(dislike => {
                        if (dislike.userId === userId) {
                            setDisLikeAction('disliked')
                        } else {
                            console.log('싫어요 정보 가져오기 실패 :(')
                        }
                    })


                } else {
                    console.log('좋아요 정보 가져오기 실패')
                }
            })
    }, [])

    const LikeBtn = () => {
        if (LikeAction === null) {

            axios.post('/api/like/uplike', value)
                .then(res => {
                    if (res.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if (DisLikeAction !== null) {
                            setDisLikeAction(null)
                            setDisLikes(DisLikes - 1)
                        }
                    } else {
                        console.log('좋아요 실패')
                    }
                })
        } else {
            axios.post('/api/like/unlike', value)
                .then(res => {
                    if (res.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        console.log('좋아요 취소 실패')
                    }
                })
        }
    }

    const DisLikeBtn = () => {
        if (DisLikeAction !== null) {

            axios.post('/api/like/unDislike', value)
                .then(res => {
                    if (res.data.success) {
                        setDisLikes(DisLikes - 1)
                        setDisLikeAction(null)
                    } else {
                        console.log('싫어요 취소 실패')
                    }
                })
        } else {
            axios.post('/api/like/upDislike', value)
                .then(res => {
                    if (res.data.success) {
                        setDisLikes(DisLikes + 1)
                        setDisLikeAction('disliked')

                        if (LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        console.log('싫어요 실패')
                    }
                })
        }
    }


    return (
        <div style={{ display: 'flex' }}>
            <div><button onClick={LikeBtn} style={{ backgroundColor: LikeAction === 'liked' ? 'red' : '' }}>좋아요</button><br /> {Likes}</div>
            <div><button onClick={DisLikeBtn} style={{ backgroundColor: DisLikeAction === 'disliked' ? 'red' : '' }}>싫어요</button><br />{DisLikes}</div>

        </div>
    )
}

export default LikeDisLikes
