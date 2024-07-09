import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../../src/cssfiles/Home.css'
import { useEffect, useState } from "react";
export function Home(){
    const[loginstyle,setLoginstyle]=useState('d-none');
    const[logoutstyle,setLogoutstyle]=useState('d-block text-white btn btn-dark');
    const[msg,setMsg]=useState('d-none')
    const [cookies,setCookies,removeCookies]=useCookies('userid');
    var navigate = useNavigate();

    function HandleSingOut(){
        removeCookies('userid');
    }
    function HandleLogin(){
        if(cookies['userid']){
           setLoginstyle('d-none');
           setLogoutstyle('d-block text-white text-decoration-none btn btn-dark');
           setMsg('mt-5 fs-5 d-block')
        }
        else{
            setLoginstyle('d-block text-white  btn btn-dark');
            setLogoutstyle('d-none');
            setMsg('d-none')
        }
    }
    useEffect(()=>{
        HandleLogin();
    },[])

    return(
        <div className="shade" >
           <div className="container-fluid">
                
                <header className="d-flex justify-content-between mt-5">
                    <div className="brand-title"><span>DocBooker. </span></div>
                    <nav>
                        <span style={{padding:'10px'}}><Link to='/' className="mx-4 text-dark text-decoration-none fs-4" >Home</Link></span>
                        <span style={{padding:'10px'}} ><Link to='add-appointment'className="mx-4 text-dark text-decoration-none fs-4">Appointment</Link></span>
                        <span  style={{padding:'10px'}}><Link to='aboutus' className="mx-4 text-dark text-decoration-none fs-4">About Us</Link></span>
                    </nav>
                    <div>
                        <span className={logoutstyle} onLoad={HandleLogin} onClick={HandleSingOut} ><Link className="text-decoration-none text-white" to='/login'>Sign out</Link></span>
                        <span className={loginstyle} onLoad={HandleLogin}><Link className="text-decoration-none text-white" to='login' >Login</Link></span>
                    </div>
                </header>
                <section>
                <span className={msg}>Hello - {cookies['userid']}</span> 
                    <main>
                        <div>
                            <div className="home-title">Welcome to DocBooker Your Trusted Healthcare provider</div>
                            <div className="home-subtitle">DocBooker is a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and expertise. At DocBooker, we prioritize your well-being, ensuriing a harmonius journey towards optional halth and wellness.</div>
                        </div>
                        <div className="home-img">
                            
                        </div>
                    </main>


                    <div className="biography">
                        <div className="biography-img">

                        </div>
                        <div className="biography-content">
                            <div className="biography-title">Biography</div>
                            <div className="biography-subtitle">Who We are ?</div>
                            <p className="biography-p1">The DocBooker is a comprehensive software solution designed to streamline and optimize the administrative, operational, and clinical processes within a healthcare facility. It serves as a centralized platform for managing various aspects of hospital operations, including patient information, appointment scheduling, billing and invoicing, inventory management, and staff coordination.</p>
                            <p className="biography-p2">Patients can schedule appointments with doctors or specialists through the system, reducing wait times and improving accessibility to healthcare services. The system also manages appointment reminders and notifications to minimize no-shows</p>
                        </div>
                    </div>



                    <div className="departments">
                        <div className="department-title">Departments</div>
                        <div className="department">
                            <div className="department-1">
                                <span>PEDIATRICS</span>
                            </div>
                            <div className="department-2">
                                <span>ORTHOPEDICS</span>
                            </div>
                            <div className="department-3">
                                <span>CARDIOLOGY</span>
                            </div>
                            <div className="department-4">
                                <span>NEUROLOGY</span>
                            </div>
                            <div className="department-5">
                                <span>ONCOLOGY</span>
                            </div>
                            <div className="department-6">
                                <span>PEDIATRICS</span>
                            </div>
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