import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function FreelancerDetail() {
    const [user, setUser] = useState([])
    const params =useParams();
    let id = params.id;
    console.group(id)


    useEffect(() => {
        axios.get("http://localhost:3003/user/" + id).then((res) => {
            setUser(res.data.user)
    
    
        }).catch((err) => {
            console.log(err)
        })
    }, [id])

    console.log(user)
    if(!user){
        <div className="Loader"></div>
    }
    else{
        return (
            <div>
                    <section className="inner-header-page">
                        <div className="container">
                            
                            <div className="col-md-8">
                                <div className="left-side-container">
                                    <div className="freelance-image oneimage"> <img src={"http://localhost:3003/"+user?.profile_image} className="img-responsive img-circle" alt=""/></div>
                                    <div className="header-details">
                                        <h4>{user.first_name} {user.last_name}<span className="pull-right"></span></h4>
                                        <p>{user.skills}</p>
                                        <ul>
                                            <li><Link to="#"><i className="fa fa-building"></i> {user.address}</Link></li>
                                          
                                            
                                            <li><div className="verified-action">Approved</div></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4 bl-1 br-gary">
                                <div className="right-side-detail">
                                    <ul>
                                        <li><span className="detail-info">Address No 1</span>{user.address}</li>
                                        <li><span className="detail-info">Address No 2</span>{user.address2}</li>
                                        <li><span className="detail-info">Location</span>{user.country}</li>
                                        <li><span className="detail-info">Phone No</span>{user.phone}</li>
                                    </ul>
                                   
                                </div>
                            </div>
                            
                        </div>
                    </section>
                  <section>
                        <div className="container">
                            
                            <div className="col-md-8 col-sm-8">
                                <div className="container-detail-box">
                                
                                    <div className="apply-job-header">
                                        <h4>{user.first_name} {user.last_name}</h4>
                                        <Link to="company-detail.html" className="cl-success"><span><i className="fa fa-building"></i>{user.address}</span></Link>
                                        <span><i className="fa fa-map-marker"></i>{user.country}</span>
                                    </div>
                                    
                                    <div className="apply-job-detail">
                                  {user.about}
                                  </div>
                                    
                                    <div className="apply-job-detail">
                                        <h5>Skills</h5>
                                        <ul className="skills">
                                            <li>{user.skills}</li>
                                          
                                        </ul>
                                    </div>
                                    
                                    
                                </div>
                                
                                
                               
                            </div>
                            
                            
                            <div className="col-md-4 col-sm-4">
                                
                                <div className="sidebar-container">
                                    <div className="sidebar-box">
                                        <span className="sidebar-status">Available</span>
                                        
                                        <div className="sidebar-inner-box">
                                            <div className="sidebar-box-thumb">
                                                <img src={user.profile_image} className="img-responsive img-circle" alt="" />
                                            </div>
                                            <div className="sidebar-box-detail">
                                                <h4>{user.first_name} {user.last_name}</h4>
                                                <span className="desination">{user.role}</span>
                                            </div>
                                        </div>
                                        <div className="sidebar-box-extra">
                                            <ul>
                                                <li>{user.skills}</li>
                                                
                                            </ul>
                                          
                                        </div>
                                    </div>
                                </div>
                                
                                
                            
                                
                            </div>
                        
                            
                        </div>
                    </section>
            </div>
          )
    }
 
}

export default FreelancerDetail
