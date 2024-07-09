import axios from "axios";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../cssfiles/login.css'

export function Login(){
    const [cookies,setCookies,removeCookies]=useCookies('userid');
    var navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            UserId:'',
            Password:'',
        },
        onSubmit:(user)=>{
            axios.get('http://127.0.0.1:5050/get-users')
            .then(response=>{
                var client = response.data.find(record=>record.UserId===user.UserId);
                if(client){
                    if(client.Password===user.Password){
                        setCookies('userid',user.UserId)
                        navigate('/');
                    }
                    else{
                        navigate('/invalid')
                    }
                }else{
                    navigate('/invalid')
                }
            })
        }
    })
    return(
        <div className="container-fluid">
            <h1 className="text-center text-primary" style={{marginTop:'100px'}}>DocBooker.</h1>
            <div className="d-flex justify-content-center align-items-center" style={{height:'75vh'}}>
            <form onSubmit={formik.handleSubmit} className="m-3 p-4 border border-secondary border-3 rounded-3">
                <div className="bi bi-person-fill fs-2 fw-bold text-center">Login</div>
                <dl>
                    <dt>User Id</dt>
                    <dd><input onChange={formik.handleChange} type="text"name="UserId" placeholder="Enter userId here" className="form-control"/></dd>
                    <dt>Password</dt>
                    <dd><input onChange={formik.handleChange} type="password" name='Password' placeholder="enter password" className="form-control" /></dd>

                </dl>
                <button type="submit" className="btn btn-success w-100" >Login</button>
                
                <div><Link to='/register'>New user Register </Link></div>
            </form>
            </div>
        </div>
    )
}