import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import FormLogin from 'src/components/FormLogin/FormLogin';
import { isAuthenticated } from 'src/services/Auth/service';

const Login:React.FC = () =>{
    const navigate = useNavigate();

    useEffect(() =>{
        isAuthenticated() && navigate("/dashboard");
    }, [navigate])

    return(
        <FormLogin/>
    )
}

export default Login;