import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import FormLoginRegister from 'src/components/FormLoginRegister/FormLoginRegister'
import { isAuthenticated } from 'src/services/Auth/service';

const Login:React.FC = () =>{
    const navigate = useNavigate();

    useEffect(() => {
        isAuthenticated() && navigate("/dashboard");
    }, [navigate])

    return(
        <FormLoginRegister/>
    )
}

export default Login;