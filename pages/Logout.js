import { useCookies } from "react-cookie"
import { serialize } from "react-cookie"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import {login, logout} from './store/user'
export default function Logout() {
    const [cookie, setCookie , removeCookie] = useCookies(["user"])
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const router = useRouter()
    const   Logoutapp=async()=> {
        removeCookie("user");
        dispatch(logout())
        router.push('/Login')

    }


    useEffect(() => {
        Logoutapp()
      },[]);

   


    return (
        <>
      <h1>Logged out </h1>

        </>


    ) }


    

    