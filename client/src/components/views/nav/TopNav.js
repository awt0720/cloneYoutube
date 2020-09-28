import React from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'

function TopNav({ history }) {
    const Logout = () => {
        axios.get('/api/users/logout')
            .then(res => {
                if (res.data.success) {
                    console.log('로그 아웃 성공')
                } else {
                    console.log('로그아웃 실패')
                }
            })
    }
    return (
        <div>
            <form onSubmit>
                <input type='text' />
                <button type="submit" >검색</button>
            </form>
            <div onClick={() => history.push('/register')}>
                회원가입
            </div>
            <div onClick={() => history.push(('/login'))}>
                로그인
            </div>
            <div onClick={Logout}>
                로그아웃
            </div>
        </div>
    )
}

export default withRouter(TopNav)
