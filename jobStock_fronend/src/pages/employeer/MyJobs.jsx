import React, { useState, useEffect } from 'react'
import banner from '../../img/banner-10.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function MyJobs() {
	const UserContext = useContext(AuthContext);
	const id = UserContext.user?.id
    const [userJob, setUserJob] = useState([])

    useEffect(() => {
		axios
			.get('http://localhost:3003/jobs-by-employer/' + id)
			.then((response) => {
				// Handle successful response
				setUserJob(response.data.jobs)
			})
			.catch((error) => {

				console.error(error);

			})

	}, [id])
	console.log(userJob)
	const del = () =>{
		axios.get('http://localhost:3003/jobs-by-employer/' + id)
			.then((response) => {
				// Handle successful response
				setUserJob(response.data.jobs)
			})
			.catch((error) => {

				console.error(error);

			})

console.log(userJob)
	}
	const handeldelete = (id) => {
		axios.delete("http://localhost:3003/job-delete/" + id).then((res) => {
			if (res.data.status == true) {
				del();

			}

			toast.success("Job Delete successfully!");
		}).catch((err) => {
			console.log(err)
			toast.error("Error");
		})

	}




  return (
   
      <div>
		<ToastContainer/>
				<div className="clearfix"></div>
				<section className="inner-header-title" style={{ backgroundImage: `url(${banner})` }}>
					<div className="container">
						<h1>My jobs</h1>
					</div>
				</section>
				<div className="clearfix"></div>

				<section className="manage-resume gray">
					<div className="container">


						<div className="row">
							<div className="col-md-12">
								{
									userJob?.map((job) => {
								 
											return (
												<article>
													<div className="mng-resume">
														<div className="col-md-1 col-sm-1 freepic">
															<div className="mng-resume-pic">
																<img src={"http://localhost:3003/" + job.user.profile_image} className="img-responsive" alt="" />
															</div>
														</div>
														<div className="col-md-6 col-sm-6">
															<div className="mng-resume-name">
																<Link to={`/proposals/${job._id}`}><h4>{job.title} <span className="cand-designation">({job.skillsRequired})</span></h4></Link>
																<i className="fa fa-map-marker marker  "> {job.location}</i><span className="cand-status">{job.user.budget}</span>
															</div>
														</div>
														
														<div className="col-md-2 col-sm-2">
															<div className="mng-employee-skill">
																<span>{job.jobtype}</span><br/>
																<span className='status'>{job.status}</span>
																

															</div>
														</div>
														<div className="col-md-2 col-sm-2">
															<div className="mng-resume-action">
																<div className="per-hour-rate">
																	<p><i className="fa fa-money"></i> $ {job.budget}</p>
																	{
																		(job.status == "open")?(<><button className='btn btn-danger' onClick={(id)=>{handeldelete(job._id)}}>Delete</button>
																		<Link  to={`/edit-job/${job._id}`} className='btn btn-info'>Edit</Link></>) : null
																	}
																	<p>
																		
																	</p>
																</div>
															</div>
														</div>
			
													</div>
												</article>
											)
										
									
									})
								}



							</div>
						</div>


					</div>
				</section>
			</div>
  
  )
}

export default MyJobs
