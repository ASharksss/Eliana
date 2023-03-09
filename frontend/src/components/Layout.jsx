import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";

//components
import Header from "./Header";
import Footer from "./Footer";
import {useDispatch} from "react-redux";
import {fetchNewToken, fetchProtect} from "../redux/slices/authSlice";


const Layout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        let life = localStorage.getItem('life')
        let user = localStorage.getItem('user')
        if (life && (new Date(Date.parse(life)) > new Date(new Date() - 24*3600 * 1000))) {
            dispatch(fetchProtect(JSON.parse(user)))
        } else {
            dispatch(fetchNewToken())
        }
    }, [navigate])
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;