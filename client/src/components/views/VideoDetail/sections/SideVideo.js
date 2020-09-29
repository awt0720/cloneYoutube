import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Sidevideo() {
    const [SideVideos, setSideVideos] = useState([])
    useEffect(() => {
        axios.get('/api/video/getVideo')
            .then(res => {
                if (res.data.success) {
                    setSideVideos(res.data.videos)
                } else {
                    console.log('비디오 목록 가져오기 실패')
                }
            })
    }, [])
    const renderSideVideos = SideVideos.map((video, index) => {

        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration - minutes * 60);
        return (
            <div key={index} style={{ width: "100%", height: "40vh" }}>
                <a href={`/video/${video._id}`}>
                    <div>ddsfafds</div>
                    <img src={`http://localhost:8000/${video.thumbnail}`} alt='썸네일' />
                    <br />
                    <span>작성자 {video.writer.name}</span>
                    <br />
                    <span>{video.views} 조회수</span>
                    <br />
                    <span>{minutes} : {seconds}</span>
                </a>
            </div>
        )
    })
    return (
        <>
            {renderSideVideos}
        </>
    )
}

export default Sidevideo
