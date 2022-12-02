import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "./Button"

export default function Home() {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }
    })
    return (
        <div>
            <Button handleAction={handleLogout} title="Logout"></Button>
        </div>
    )
}
