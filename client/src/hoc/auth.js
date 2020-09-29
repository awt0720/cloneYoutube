import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action'

export default function (SpecificComponent, option, adminRouter = null) {
    function AuthenticationCheck({ history }) {
        const dispatch = useDispatch()

        useEffect(() => {

            dispatch(auth())
                .then(res => {
                    //로그인 X
                    if (!res.payload.isAuth) {
                        if (option) {
                            history.push('/login')
                        }
                    } else {

                        //로그인 O
                        if (adminRouter && !res.payload.isAdmin) {
                            history.push('/')
                        }
                        else {
                            if (option === false) {
                                history.push('/')
                            }
                        }

                    }
                })
        }, [])
        return <SpecificComponent />
    }
    return AuthenticationCheck
}
