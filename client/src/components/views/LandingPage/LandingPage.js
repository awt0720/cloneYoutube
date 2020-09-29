import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

function LandingPage({ history }) {
    const [Video, setVideo] = useState([])
    useEffect(() => {
        axios.get('/api/video/getVideo')
            .then(res => {
                if (res.data.success) {
                    setVideo(res.data.videos)
                    history.push('/')
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

export default withRouter(LandingPage)
