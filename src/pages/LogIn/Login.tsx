import React, { useEffect } from 'react'
import { isAuthenticated } from 'src/services/Auth/service';
import { useNavigate } from 'react-router-dom';
import FormLogin from 'src/components/FormLogin/FormLogin';

const Login:React.FC = () =>{
    const navigate = useNavigate()

    useEffect(() =>{
        isAuthenticated() ? navigate("/dashboard") : navigate("/register")
    }, [navigate])

    return(
        <FormLogin/>
    )
}

export default Login;