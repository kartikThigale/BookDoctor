import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";

export function Appointments(){
    var navigate = useNavigate();
    const [cookies,setCookies,removeCookies]=useCookies('userid');
    const [appointments,setAppointments]=useState([{Appointment_Id:0,Title:'',Description:'',AppointmentDOB:'',Date:new Date(),UserId:''}])
    const[loginstyle,setLoginstyle]=useState('d-none');
    const[logoutstyle,setLogoutstyle]=useState('d-block text-white btn btn-dark');
    var navigate = useNavigate();

    function HandleSingOut(){
        removeCookies('userid');
    }
    function HandleLogin(){
        if(cookies['userid']){
           setLoginstyle('d-none');
           setLogoutstyle('d-block text-white text-decoration-none btn btn-dark');
        }
        else{
            setLoginstyle('d-block text-white  btn btn-dark');
            setLogoutstyle('d-none');
        }
    }
   



    useEffect(()=>{
        if(cookies['userid']==undefined){
            navigate("/login")
        }else{
            axios.get(`http://127.0.0.1:5050/view-tasks/${cookies['userid']}`)
            .then(response=>{
                setAppointments(response.data);
            })
        };
        HandleLogin();
    },[])

    function HandleSingOut(){
        removeCookies('userid');
    }
    return(
       <div className="shade">
           <div className="container-fluid">
                <header className="d-flex justify-content-between mt-5">
                    <div className="brand-title">DocBooker.</div>
                    <nav>
                        <Link to='/' className="mx-4  text-dark text-decoration-none fs-4" >Home</Link>
                        <Link to='/add-appointment'className="mx-4  text-dark text-decoration-none fs-4">Appointment</Link>
                        <Link to='/aboutus' className="mx-4  text-dark text-decoration-none fs-4">About Us</Link>
                    </nav>
                    <div>
                      <span className={logoutstyle} onLoad={HandleLogin} onClick={HandleSingOut} ><Link className="text-decoration-none text-white" to='/login'>Sign out</Link></span>
                        <span className={loginstyle} onLoad={HandleLogin}><Link className="text-decoration-none text-white" to='/login' >Login</Link></span>
                    </div>
                </header>

         <div className="bg-white text-dark p-4 m-2 ">
            <div className="d-flex justify-content-between">
                <span className="fs-2 ">{cookies['userid']}  -  Appointments</span>
            </div>
            <Link to='/add-appointment'><button className="bi bi-calendar btn btn-primary mt-4">Add Appointments</button></Link>

        </div>
        <div className="d-flex column-gap-3 flex-wrap">
            {
                appointments.map(appointment=>
                   
                        
                            <div className="card p-2 m-2 mt-3" style={{width:'300px'}}>
                                <div className="card-header">
                                    <dt>Patient Name</dt>
                                    <dd>{appointment.FirstName} {appointment.LastName}</dd>
                                </div>
                                <div className="card-body">
                                    <dt>Age</dt>
                                    <dd>{appointment.Age}</dd>
                                    <dt>Mobile</dt>
                                    <dd>{appointment.Mobile}</dd>
                                    <dt>Gender</dt>
                                    <dd>{appointment.Gender}</dd>
                                </div>
                                <div className="card-footer">
                                    <dt>Appointment Date</dt>
                                    <dd>{moment(appointment.AppointmentDOB).format('dddd MMM Do YYYY')}</dd>
                                </div>
                            </div>     
                )
            }
        </div>
       </div>
    </div>
    )
}