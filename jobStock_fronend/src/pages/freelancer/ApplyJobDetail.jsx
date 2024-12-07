import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';



function ApplyJobDetail() {

	const params =useParams();
    let id = params.id;
	const [job, setJob] = useState([])

	
	
	useEffect(()=>{
		axios.get("http://localhost:3003/job-detail/"+id).then((res)=>{
			setJob(res.data.job)
		}).catch((err)=>{
			console.log(err)
		})
	},[id])
	 
	console.log(job)

	return (
		<div>
			<div className="clearfix"></div>


			<section className="inner-header-page">
				<div className="container">
					
					<div className="col-md-8">
						<div className="left-side-container">
						<div className="freelance-image"><a href="company-detail.html"><img src={"http://localhost:3003/"+job.user?.profile_image} className="img-responsive" alt="" /></a></div>

							<div className="header-details">
								<h4>{job.title}</h4>
								<p>{job.category}</p>
								<ul>
									

									<li><div className="verified-action">{job.status}</div></li>
								</ul>
							</div>
						</div>
					</div>

					<div className="col-md-4 bl-1 br-gary">
						<div className="right-side-detail">
							<ul>
								<li><span className="detail-info">Availability</span>{job.jobtype}</li>
								<li><span className="detail-info">Budget</span>$ {job.budget}</li>
								<li><span className="detail-info">Deadline</span>{job.deadline}</li>
							</ul>
							
						</div>
					</div>

				</div>
			</section>
			<div className="clearfix"></div>

			<section>
				<div className="container">

					<div className="col-md-8 col-sm-8">
						<div className="container-detail-box">

							<div className="apply-job-header">
								<h4>{job.title}</h4>
								<span><i className="fa fa-building"></i>{job.category}</span><br/>
								<span><i className="fa fa-map-marker"></i>{job.location}</span>
							</div>

							<div className="apply-job-detail">
							{job.description}
							<br/>
							
							</div>
							<div>
								<Link className='btn btn-info ajdimage' target='_blank' to={"http://localhost:3003/" + job.file} >View File</Link>
							
							</div>

							<div className="apply-job-detail">
								<h5 >Skills</h5>
								<ul className="skills">
									<li>{job.skillsRequired}</li>
									
								</ul>
							</div>

							

							<Link to={`/create-proposal/${job._id}`} className="btn btn-success">Apply For This Job</Link>

						</div>



					</div>


					<div className="col-md-4 col-sm-4">

						<div className="sidebar-container">

							<div className="sidebar-box">
								<span className="sidebar-status">{job.jobtype}</span>
								<h4 className="flc-rate">${job.budget}</h4>
								<div className="sidebar-inner-box">
									<br/>
									<div className="sidebar-box-thumb">
										<img src={"http://localhost:3003/"+job.user?.profile_image} className="img-responsive" alt="" />
									</div>
									
									<div className="sidebar-box-detail">
										<h4>{job.title}</h4>
										<span className="desination">{job.category}</span>
									</div>
								</div>
								<div className="sidebar-box-extra">
									<ul>
										<li>{job.skillsRequired}</li>
										
									</ul>
									<ul className="status-detail">
										<li className="br-1"><strong>{job.location}</strong>Location</li>
										<li className="br-1"><strong>{job.deadline}</strong>Deadline</li>
										
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

export default ApplyJobDetail
