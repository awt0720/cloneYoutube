import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_action/user_action'
import { withRouter } from 'react-router-dom'
import './Register.css'

function Register({ history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pw1, setPw1] = useState('');
    const [pw2, setPw2] = useState('')
    const [check, setCheck] = useState({
        fail: false,
        success: false
    });

    const dispatch = useDispatch();

    const onName = (e) => {
        setName(e.target.value)
    }
    const onEmail = (e) => {
        setEmail(e.target.value)
    }
    const onPassword1 = (e) => {
        setPw1(e.target.value)
    }
    const onPassword2 = (e) => {
        setPw2(e.target.value)
    }

    const isMatchPassword = () => {
        if (pw1 !== '' && pw2 !== '') {
            if (pw1 === pw2) {
                setCheck({ success: true });
            }
            else {
                setCheck({ fail: true });
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let user = {
            name,
            email,
            password: pw1
        }
        dispatch(registerUser(user))
        history.push('/login')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onName} value={name} placeholder="이름" />
                <input type="email" onChange={onEmail} value={email} placeholder="예) test@gmail.com" />
                <input type="password" onChange={onPassword1} value={pw1} onBlur={isMatchPassword} placeholder="비밀번호" />
                <input type="password" onChange={onPassword2} value={pw2} onBlur={isMatchPassword} placeholder="비밀번호 확인" />
                <span className={`fail ${check.fail ? 'show' : ''}`}>비밀번호가 틀립니다</span>
                <span className={`success ${check.success ? 'show' : ''}`}>비밀번호가 같습니다</span>
                <button type="submit">회원 가입</button>
            </form>
        </div>
    )
}

export default withRouter(Register)
