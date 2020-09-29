import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import SideVideos from './sections/SideVideo'

function VideoDetail() {
    const [videoDetail, setVideoDetail] = useState([])
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
    }, [videoDetail])
    if (videoDetail.writer) {
        return (
            <div>
                <div>
                    <video src={`http://localhost:8000/${videoDetail.filePath}`} controls />
                </div>
                <div>
                    <span>{videoDetail.title}</span>
                    <span>{videoDetail.writer.name}</span>
                    <span>{videoDetail.description}</span>
                    <span></span>
                </div>
                <div>
                    댓글
            </div>
                <div>
                    <SideVideos />
                </div>
            </div>
        )
    } else {
        return <div>로딩중</div>
    }
}

export default VideoDetail
