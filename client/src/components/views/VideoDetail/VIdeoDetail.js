import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import SideVideos from './sections/SideVideo'
import Subscribe from './sections/Subscribe'
import Comment from './sections/Comment'
import LikeDisLikes from './sections/LikeDisLikes'

function VideoDetail() {
    const [videoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    let { videoId } = useParams()
    const variable = { videoId: videoId }
    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable)
            .then(res => {
                if (res.data.success) {
                    setVideoDetail(res.data.videoData)
                } else {
                    console.log('비디오 정보 가져오기 실패')
                }
            })

        axios.post('/api/video/getComment', variable)
            .then(res => {
                if (res.data.success) {
                    setComments(res.data.comments)
                } else {
                    console.log('비디오디테일페잊에서 전체코멘드 가져오기 실패')
                }
            })
    }, [])
    const refresh = (newComment) => {
        setComments(Comments.concat(newComment))
    }

    if (videoDetail.writer) {

        const subscribeBtn = videoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={videoDetail.writer._id} userFrom={localStorage.getItem('userId')} />
        return (
            <div>
                <div>
                    <video src={`http://localhost:8000/${videoDetail.filePath}`} controls />
                </div>
                <div>
                    <span>{videoDetail.title}</span>
                    <span>{videoDetail.writer.name}</span>
                    <span>{videoDetail.description}</span>
                </div>
                {subscribeBtn}
                <LikeDisLikes video videoId={videoId} userId={localStorage.getItem('userId')} />
                <div style={{ border: '1px solid grey' }}>
                    <Comment refresh={refresh} CommentsList={Comments} />
                </div>
                <div style={{ width: "50vW", height: '30vh', marginTop: '40px' }}>
                    <SideVideos />
                </div>
            </div>
        )
    } else {
        return <div>로딩중</div>
    }
}

export default VideoDetail
