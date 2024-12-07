import React, { useEffect, useState } from 'react'
import banner from '../../img/banner-10.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function Proposals() {
	const [proposals, setProposals] = useState([])
	const [job, setJob] = useState([])
	const params = useParams();
	let id = params?.id;

	console.log(id)

	useEffect(() => {
		axios.get("http://localhost:3003/proposals-by-job/" + id).then((res) => {
			setProposals(res.data.proposals)


		}).catch((err) => {
			console.log(err)
		})
	}, [id])
	console.log(proposals)
	useEffect(() => {
		axios.get("http://localhost:3003/job-detail/" + id).then((res) => {
			setJob(res.data.job)


		}).catch((err) => {
			console.log(err)
		})
	}, [id])
	console.log(job)

	if (!proposals) {
		<div className="Loader"></div>
	}
	else {
		return (
			<div>
				<div className="clearfix"></div>

				<section className="inner-header-title" style={{ backgroundImage: `url(${banner})` }}>
					<div className="container">
						<h1>All Proposals</h1>
					</div>
				</section>
				<div className="clearfix"></div>
				<section className="inner-header-page">
					<div className="container">

						<div className="col-md-8">
							<div className="left-side-container">
								<div className="freelance-image "><a href="company-detail.html"><img src={"http://localhost:3003/" + job.user?.profile_image} className="img-responsive fimage" alt="" /></a></div>

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
						<h3>Job Detail</h3>
						<div className="col-md-8 col-sm-8">
							<div className="container-detail-box">
								<h4>Job Detail</h4>

								<div className="apply-job-header">
									<h4>{job.title}</h4>
									<span><i className="fa fa-building"></i>{job.category}</span><br />
									<span><i className="fa fa-map-marker"></i>{job.location}</span>
								</div>

								<div className="apply-job-detail">
									{job.description}
									<br />

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

							</div>



						</div>


						<div className="col-md-4 col-sm-4">

							<div className="sidebar-container">

								<div className="sidebar-box">
									<span className="sidebar-status">{job.jobtype}</span>
									<h4 className="flc-rate">${job.budget}</h4>
									<div className="sidebar-inner-box">
										<br />
										<div className="sidebar-box-thumb">
											<img src={"http://localhost:3003/" + job.user?.profile_image} className="img-responsive" alt="" />
										</div>

										<div className="sidebar-box-detail">
											<h4>{job.user?.first_name + " " + job.user?.last_name}</h4>
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

				<section className="manage-resume gray">
					<div className="container">


						<div className="row">
							<h3>Proposals</h3>
							<div className="col-md-12">
								
								
											{
												proposals?.map((proposal) => {
													 if(proposal.length != 0){
														return (
															<article>
																<div className="mng-resume">
																	<div className="col-md-1 col-sm-1 freepic">
																		<div className="mng-resume-pic">
																			<img src={"http://localhost:3003/" + proposal.user?.profile_image} className="img-responsive" alt="" />
																		</div>
																	</div>
																	<div className="col-md-6 col-sm-6">
																		<div className="mng-resume-name">
																			<Link to={`/proposal-detail/${proposal._id}`}><h4>{proposal.user.first_name + " " + proposal.user.last_name} <span className="cand-designation">({proposal.skills})</span></h4></Link>
																			<i className="fa fa-map-marker marker  "></i><span className="cand-status">{proposal.user.country}</span>
																			<div className='col-lg-12 '>Description: {proposal.description}</div>
	
																		</div>
																	</div>
	
																	<div className="col-md-2 col-sm-2">
																		<div className="mng-employee-skill">
																			<span>{proposal.user.skills}</span>
	
																		</div>
																	</div>
																	<div className="col-md-2 col-sm-2">
																		<div className="mng-resume-action">
																			<div className="per-hour-rate">
																				<p><i className="fa fa-money"></i> $ {proposal.bidAmount}</p>
																			</div>
																		</div>
																	</div>
	
																	<div >
	
																	</div>
																</div>
															</article>
														)
													 }
													 else{
														return(
															<div class="alert alert-warning" role="alert">
															Proposals Not Found
														</div>
														)
												
													 }

												
												})
											}
										
								




							</div>
						</div>


					</div>
				</section>
			</div>
		)
	}


}

export default Proposals
