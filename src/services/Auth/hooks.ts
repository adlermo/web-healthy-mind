import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchLoginUser, fetchRegisterUser } from './service';
import { IAuthLoginModel, IAuthRegisterModel } from './dtos/IAuthModel';
import { IAuthLoginParser } from './dtos/IAuthParser';

export function useLoginUser({
  email,
  password,
  userType,
}: IAuthLoginModel): UseQueryResult<IAuthLoginParser> {
  const queryKey = ['loginUser'];

  return useQuery(queryKey, () => fetchLoginUser({ email, password, userType }), {
    keepPreviousData: true,
  });
}

export function useRegisterUser({
  name,
  email,
  password,
  confirmPassword,
}: IAuthRegisterModel): UseQueryResult<IAuthLoginParser> {
  const queryKey = ['registerUser'];

  return useQuery(queryKey, () => fetchRegisterUser({ name, email, password, confirmPassword }), {
    keepPreviousData: true,
  });
}
