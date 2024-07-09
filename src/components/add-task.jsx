
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import '../../src/cssfiles/Home.css';
import '../cssfiles/add-task.css';

export function AddTask(){
    const[formstyle,setFormstyle]=useState('disabled btn btn-success')
    const[loginstyle,setLoginstyle]=useState('d-none');
    const[logoutstyle,setLogoutstyle]=useState('d-block text-white btn btn-dark');
    const[msg,setMsg]=useState('d-none');
    const [cookies,setCookies,removeCookies]=useCookies('userid');
    var navigate = useNavigate();

    function HandleSingOut(){
        removeCookies('userid');
    }

    function HandleLogin(){
        if(cookies['userid']){
           setLoginstyle('d-none');
           setLogoutstyle('d-block text-white text-decoration-none btn btn-dark');
           setFormstyle('active btn btn-success');
           setMsg('d-none');
        }
        else{
            setLoginstyle('d-block text-white  btn btn-dark');
            setLogoutstyle('d-none');
            setFormstyle('disabled btn btn-success')
            setMsg('d-block text-danger fs-5')
        }
    }
    useEffect(()=>{
        HandleLogin();
    },[])

    const formik=useFormik({
        initialValues:{
            Appointment_Id:0,
            FirstName:'',
            LastName:'',
            Moile:'',
            Gender:'',
            Age:0,
            DOB:'',
            AppointmentDOB:'',
            Message:'',
            UserId:cookies['userid']
        },
        onSubmit:(task)=>{
            axios.post('http://127.0.0.1:5050/add-task',task)
            alert('Appointment taken successfully..');
            navigate('/appointments');
        }
    })
    return(
        <div className="shade">
           <div className="container-fluid">
                <header className="d-flex justify-content-between mt-5">
                    <div className="brand-title">DocBooker.</div>
                    <nav>
                        <span style={{padding:'10px'}}><Link to='/' className="mx-4 text-dark text-decoration-none fs-4" >Home</Link></span>
                        <span style={{padding:'10px'}}><Link to='/add-appointment'className="mx-4 text-dark text-decoration-none fs-4">Appointment</Link></span>  
                        <span style={{padding:'10px'}}><Link to='/aboutus' className="mx-4 text-dark text-decoration-none fs-4">About Us</Link></span>
                    </nav>
                    <div>
                        <span className={logoutstyle} onLoad={HandleLogin} onClick={HandleSingOut} ><Link className="text-decoration-none text-white" to='/login'>Sign out</Link></span>
                        <span className={loginstyle} onLoad={HandleLogin}><Link className="text-decoration-none text-white" to='/login' >Login</Link></span>
                    </div>
                </header>
                <section>
                <main className="add-task-main">
                        <div>
                            <div className="home-title">Schedule Your Appointment at | DocBooker</div>
                            <div className="home-subtitle">DocBooker is a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and expertise. At DocBooker, we prioritize your well-being, ensuriing a harmonius journey towards optional halth and wellness.</div>
                        </div>
                        <div className="app-home-img">
                            
                        </div>
                </main>

           <div className="fs-2 text-center mt-5 p-4 m-3 bg-white">{cookies['userid']} Add Your appointment</div>
            <div className="form-container">
            <form className=' fs-5 bg-white text-dark m-3' onSubmit={formik.handleSubmit}>
                <h3 className="bi bi-person-fill mb-4 fw-bold text-center text-center">Fill Patient Information</h3>
                <dl>
                    <dt>First Name</dt>
                    <dd><input type="text" name="FirstName" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Last Name</dt>
                    <dd><input name="LastName" onChange={formik.handleChange} className="form-control"></input></dd>
                    <dt>Gender</dt>
                    <dd><input type="radio" name="Gender" value={'Male'} onChange={formik.handleChange} className="form-check-inline" /><label htmlFor="Gender">Male</label></dd>
                    <dd><input type="radio" name="Gender" value={'Female'} onChange={formik.handleChange} className="form-check-inline" /><label htmlFor="Gender">Female</label></dd>
                    <dt>Age</dt>
                    <dd><input type="number" name="Age" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>DOB</dt>
                    <dd><input type="date" name="DOB" className="form-date-iput" onChange={formik.handleChange}/></dd>
                    <dt>Appointment Date</dt>
                    <dd><input type="date" name="Appointment" onChange={formik.handleChange} className="form-date-iput" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="number" name="Mobile" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Message</dt>
                    <dd><textarea name="Message" rows={4}  className="form-control" onChange={formik.handleChange}></textarea></dd>
                </dl>
                <div className="d-flex justify-content-between mt-3">
                   <div>
                   <button className={formstyle} type="submit">Submit</button>
                   <div className={msg}>Please login to take an appointment.</div>
                   </div>
                    
                    <Link to='/' className='btn btn-lg btn-warning'>Cancle</Link>
                </div>
                
            </form>


            <div className="form-img">

            </div>
            </div>
            

            <div className="hr">
                        <hr />
                    </div>
                </section>
                

                <footer>
                    <div>
                        <div className="footer-title">BookDoctor.</div>
                    </div>
                    <div>
                        <div className="footer-title">Quick Links</div>
                        <nav>
                        <Link to='/'>Home</Link>
                        <Link to='appointments'>Appointments</Link>
                        <Link to='contactus'>Contact-us</Link>
                        </nav>
                    </div>
                    <div>
                        <div className="footer-title">Hours</div>
                        <div className="time">
                        <div>Monday 9:00 AM - 11:00 PM</div>
                        <div>Tuesday 12:00 PM - 12:00 PM</div>
                        <div>Wednesday 10:00 AM - 10:00 PM</div>
                        <div>Thursday 9:00 AM - 9:00 PM</div>
                        <div> Friday 12:00 AM - 5:00 PM</div>
                        <div>Saturday 10:00 AM - 3:00 PM</div>
                        </div>
                    </div>
                    <div>
                         <div className="footer-title">Contact</div>
                         <div><span className="bi bi-telephone-fill"><span className="ms-3">999-999-999</span></span></div>
                         <div><span className="bi bi-envelope-fill"><span className="ms-3">Bookdoctor@gmail.com</span></span></div>
                         <div><span className="bi bi-send-fill"><span className="ms-3">Hyderabad,India</span></span></div>
                    </div>
                </footer>

            </div>
        </div>
    )
}