import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import '../cssfiles/register.css'
export function Register(){

    const [msg,setMsg]=useState('');
    const [msgClass,setMsgClass]=useState('');
    var navigate = useNavigate();
    const formik=useFormik({
        initialValues:{
            UserId:'',
            FirstName:'',
            LastName:'',
            Mobile:'',
            Email:'',
            Password:''
        },
        onSubmit:(user)=>{
            axios.post('http://127.0.0.1:5050/register-user',user)
            .then(()=>{
                alert('User Registered successfully');
                navigate('/login');
            })
        }
    })
    function HandleKeyChange(e){
        axios.get('http://127.0.0.1:5050/get-users').then(response=>{
           
            var users = response.data;
            users.map(user=>{
                if(user.UserId===e.target.value){
                    setMsg("UserId taken-Try another");
                    setMsgClass('text-danger');
                }else{
                    setMsg('User Id available');
                    setMsgClass('text-success');
                }
            })
                
            
        })
    }
    return(
        <div className="mb-5 register-bg container-fluid">
            <h1 className="text-primary fw-bold text-center">DocBooker.</h1>
            <div className=" d-flex justify-content-center align-content-center" >
            <form onSubmit={formik.handleSubmit} className="p-4 m-3 border border-4 border-secondary rounded-2">
                <div className="bi bi-person fs-2 text-center fw-bold">Register</div>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" required name="UserId" onKeyUp={HandleKeyChange} onChange={formik.handleChange} className="form-control text-dark" /></dd>
                    <dd className={msgClass}>{msg}</dd>
                    <dt>First Name</dt>
                    <dd><input type="text" name="FirstName" onChange={formik.handleChange}  className="form-control" /></dd>
                    <dt>Last Name</dt>
                    <dd><input type="text" name="LastName" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" required name="Mobile" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" required name="Email" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" required name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Register</button>
                <div>
                    <Link className="fs-5" to='/login'>sign in </Link>
                </div>
            </form>
        </div>
        </div>
    )
}