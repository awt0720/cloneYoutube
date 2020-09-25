import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../_action/user_action';

function Login() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const dispatch = useDispatch();
    const data = useSelector(state => console.log(state.state))

    const onEmailhandler = (e) => {
        setEmail(e.target.value)

    }
    const onPasswordhandler = (e) => {
        setPw(e.target.value)
    }

    const onSubmithandler = (e) => {
        e.preventDefault();
        let body = {
            email,
            password: pw
        }
        dispatch(loginUser(body))
            .then(res => {
                if (res.payload.loginSuccess) {
                    // props.history.push('/')
                    console.log('로그인 성공')
                }
                else {
                    console.log('로그인 실패')
                }
            })
        console.log(data)
    }

    return (
        <div style={{
            display: "flex", justifyContent: "center", alignItems:
                "center", width: "100%", height: "100vh"
        }}>
            <form onSubmit={onSubmithandler} style={{ display: 'flex', flexDirection: "column" }}>
                <input type="text" value={email} onChange={onEmailhandler} placeholder="id를 입력" />
                <input type="password" value={pw} onChange={onPasswordhandler} placeholder="password를 입력" />
                <br />
                <button type="submit">로그인</button>
            </form>

        </div>
    )
}

export default Login
