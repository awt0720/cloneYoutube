import React from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';

function TopNav({ history }) {
    const user = useSelector(state => state.userState)
    const Logout = () => {
        axios.get('/api/users/logout')
            .then(res => {
                if (res.data.success) {
                    console.log('로그 아웃 성공')
                    window.location.replace('/')
                } else {
                    console.log('로그아웃 실패')
                }
            })
    }
    if (user.userData && !user.userData.isAuth) {
        return (
            <div>
                <a href='/register'>
                    회원가입
            </a>
                <br />
                <a href='/login'>
                    로그인
            </a>
            </div>
        )
    }
    else {
        return (
            <>
                <div>
                    <a href="/video/upload">비디오 업로드</a>
                </div>
                <a href='/subscription'>
                    구독한 페이지
            </a>
                <div onClick={Logout}>
                    로그아웃
            </div>
            </>
        )
    }
}

export default withRouter(TopNav)
