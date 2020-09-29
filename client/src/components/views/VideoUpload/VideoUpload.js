import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useSelector } from 'react-redux'

const PrivateOption = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]

const CategoryOPtion = [
    { value: 0, label: "Film" },
    { value: 1, label: "Autos" },
    { value: 2, label: "Music" }
]


function VideoUpload() {
    const [VideoTitle, setVideoTitle] = useState("")
    const [Discription, setDiscription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("");

    const user = useSelector(state => state.userState)

    const onTitle = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    const onDiscription = (e) => {
        setDiscription(e.currentTarget.value)
    }

    const onPrivate = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategory = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'mutipart/form-data' }

        }
        formData.append("file", files[0])

        axios.post('/api/video/uploadfiles', formData, config)
            .then(res => {
                if (res.data.success) {

                    let variable = {
                        url: res.data.url,
                        fileName: res.data.fileName
                    }

                    setFilePath(res.data.url)

                    axios.post('/api/video/thumbnail', variable)
                        .then(res => {
                            if (res.data.success) {
                                setDuration(res.data.Duration)
                                setThumbnailPath(res.data.url)
                            } else {
                                console.log('썸네일 생성 실패')
                            }
                        })

                } else {
                    console.log('업로드 실패')
                }
            })
    }

    const onSumbit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Discription,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        }

        axios.post('/api/video/uploadVideo', variables)
            .then(res => {
                console.log(variables)
                console.log(res.data)
                if (res.data.success) {
                    console.log('업로드 성공')
                } else {
                    console.log('업로드 실패')
                }
            })
    }
    return (
        <div>
            <h1> Upload Video</h1>

            <form onSubmit={onSumbit}>
                <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={10000000000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray' }}{...getRootProps()}>
                            <input {...getInputProps()} />
                        </div>
                    )}
                </Dropzone>
                {ThumbnailPath &&
                    <div>
                        <img src={`http://localhost:8000/${ThumbnailPath}`} alt="썸네일" />
                    </div>
                }
                <br />
                <br />
                <label>제목</label>
                <input type="text" value={VideoTitle} onChange={onTitle} />
                <br />
                <br />
                <label>설명</label>
                <textarea value={Discription} onChange={onDiscription} />
                <br />
                <br />
                <select onChange={onPrivate}>
                    {PrivateOption.map((item, index) => {
                        return <option key={index} value={item.value}>{item.label}</option>
                    })}
                </select>
                <br />
                <select onChange={onCategory}>
                    {CategoryOPtion.map((item, index) => {
                        return <option key={index} value={item.value}>{item.label}</option>
                    })}
                </select>
                <button type="submit" onSubmit={onSumbit}>완료</button>
            </form>
        </div>
    )
}

export default VideoUpload
