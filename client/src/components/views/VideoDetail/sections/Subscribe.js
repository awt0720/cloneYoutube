import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Subscribe({ userTo, userFrom }) {
    const [SubscribeNumber, setSubscribeNumber] = useState('')
    const [Subscribed, setSubscribed] = useState('')
    useEffect(() => {
        let value = { userTo: userTo }
        axios.post('/api/subscribe/subscribeNumber', value)
            .then(res => {
                if (res.data.success) {
                    setSubscribeNumber(res.data.subscribeNumber)
                } else {
                    console.log('구독자 수 가져오지 못함')
                }
            })


        let seubscribeValue = {
            userTo: userTo, userFrom: localStorage.getItem('userId')
        }
        axios.post('/api/subscribe/subscribed', seubscribeValue)
            .then(res => {
                if (res.data.success) {
                    setSubscribed(res.data.subscribed)
                } else {
                    console.log('정보를 가져오지 못함')
                }
            })
    }, [])
    const unSubscribe = () => {

        let subscribeVable = {
            userTo,
            userFrom,
        }
        //이미 구동죽이라면
        if (Subscribed) {
            axios.post('/api/subscribe/unSubscribe', subscribeVable)
                .then(res => {
                    if (res.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        console.log('구독 취소 실패')
                    }
                })

            //구독 아닐 때
        } else {
            axios.post('/api/subscribe/Subscribe', subscribeVable)
                .then(res => {
                    if (res.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        console.log('구독 취소 실패')
                    }
                })
        }
    }
    return (
        <div>
            <button style={{ backgroundColor: `${Subscribed ? 'gray' : 'red'}` }} onClick={unSubscribe}>{SubscribeNumber} {Subscribed ? '구독중' : '구독'}</button>
        </div>
    )
}

export default Subscribe
