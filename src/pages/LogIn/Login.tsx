import React, { useEffect } from 'react'
import { isAuthenticated } from 'src/services/Auth/service';
import { useNavigate } from 'react-router-dom';
// import { Container, ContainerLogin } from './styles';
import FormLogin from 'src/components/FormLogin/FormLogin';

const Login:React.FC = () =>{
    const navigate = useNavigate()

    useEffect(() =>{
        if(isAuthenticated()){
            navigate("/dashboard")
        }
        // isAuthenticated() ? navigate("/dashboard") : navigate("/register")
    }, [navigate])

    return(
        // <Container>
        //     <ContainerLogin>
        //         {/* <LoginTitle>Mente Sã</LoginTitle> */}
        //         <FormLogin/>
        //     </ContainerLogin>
        // </Container>
        <FormLogin/>
    )
}

export default Login;