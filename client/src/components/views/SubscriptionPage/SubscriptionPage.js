import React, { useEffect, useState } from 'react'
import axios from 'axios'

function SubscriptionPage() {
    const [Video, setVideo] = useState([])
    useEffect(() => {

        const value = { userFrom: localStorage.getItem('userId') }
        axios.post('/api/video/getSubscriptionVideo', value)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    setVideo(res.data.videos)
                } else {
                    console.log('비디오 목록 가져오기 실패')
                }
            })
    }, [])

    const renderCards = Video.map((video, index) => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration - minutes * 60);
        return <div key={index} style={{ display: 'flex' }}>
            <a href={`/video/${video._id}`}>
                <div>
                    <img src={`http://localhost:8000/${video.thumbnail}`} alt="썸네일" />
                    <div>
                        <span>{minutes} : {seconds}</span>
                    </div>
                </div>
            </a>

            <br />
            <div>{video.title}</div>
            <div>{video.description}</div>
        </div>


    })

    return (
        <>
            <div style={{ margin: '20px 0px 20px 10px' }}>
                시작 페이지
        </div>
            {renderCards}
        </>
    )
}

export default SubscriptionPage 
