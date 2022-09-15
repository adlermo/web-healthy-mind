import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormPatient from 'src/components/FormPatient/FormPatient';
import { isAuthenticated } from 'src/services/Auth/service';

const RegisterPatient: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Se usuário está autenticado navega para o Dashboard
    if (isAuthenticated()) navigate('/dashboard');
  }, [navigate]);

  return <FormPatient />;
};

export default RegisterPatient;
