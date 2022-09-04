import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchLoginUser, fetchRegisterUser } from "./service";
import { IAuthLoginModel } from "./dtos/IAuthModel";
import { IAuthLoginParser } from "./dtos/IAuthParser";

export function useLoginUser({ email, password }: IAuthLoginModel): UseQueryResult<IAuthLoginParser>{
    const queryKey = ['loginUser']

    return useQuery(queryKey, () => fetchLoginUser({email, password}),{
        keepPreviousData: true,
    } );
}

export function useRegisterUser({ email, password }: IAuthLoginModel): UseQueryResult<IAuthLoginParser>{
    const queryKey = ['registerUser']

    return useQuery(queryKey, () => fetchRegisterUser({email, password}),{
        keepPreviousData: true,
    } );
}