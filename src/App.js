import React,{useState} from 'react'
import ScrollToTop from './components/ScrollToTop'
import Signin from './pages/examples/Signin';
import HomePage from './pages/HomePage';

import useToken from './storageSession/useToken';
import { withCookies,useCookies } from 'react-cookie';

import { Redirect } from "react-router-dom";
import { Routes } from "./routes";
import "./App.css"; 

export default function App() {

    return (
        <>
         <ScrollToTop/>
         <HomePage />
        </>
    )
}
