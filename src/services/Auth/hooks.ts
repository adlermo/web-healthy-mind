import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {  fetchLoginUser, fetchRegisterUser } from "./service";
import { AuthResponseDto } from "./dtos/authResponse.dto";

export function useLoginUser(email: string, password:string):UseQueryResult<AuthResponseDto>{
    const queryKey = ['loginUser']

    return useQuery(queryKey, () => fetchLoginUser({email, password}),{
        keepPreviousData: true,
    } );
}

export function useRegisterUser(email: string, password:string):UseQueryResult<AuthResponseDto>{
    const queryKey = ['registerUser']

    return useQuery(queryKey, () => fetchRegisterUser({email, password}),{
        keepPreviousData: true,
    } );
}