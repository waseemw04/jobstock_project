import React, { useEffect, useState } from 'react'
import banner from '../../img/banner-10.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
function CurrentJobs() {
	const UserContext = useContext(AuthContext);
	const id = UserContext.user?.id
	const [jobs, setJobs] = useState([])



	useEffect(() => {
		axios.get("http://localhost:3003/proposals-by-user/" + id).then((res) => {
			setJobs(res.data.proposals)


		}).catch((err) => {
			console.log(err)
		})
	}, [id])

	const jobstick=()=>{
		axios.get("http://localhost:3003/proposals-by-user/" + id).then((res) => {
			setJobs(res.data.proposals)


		}).catch((err) => {
			console.log(err)
		})

	}
console.log(jobs)

	const handeldelete = (id) => {
		axios.delete("http://localhost:3003/proposal-delete/" + id).then((res) => {
			if (res.data.status === false) {

				toast.error("SomeThing wrong");
			}
			if (res.data.status == true) {
				toast.success("Delete Successfully!");
				jobstick();
				
			}


		}).catch((err) => {
			console.log(err)
			toast.error("Error");
		})

	}



	if (!jobs) (
		<div className="Loader"></div>
	)
	else {
		return (
			<div>
				<ToastContainer />
				<div className="clearfix"></div>


				<section className="inner-header-title" style={{ backgroundImage: `url(${banner})` }}>
					<div className="container">
						<h1>My Proposals</h1>
					</div>
				</section>
				<div className="clearfix"></div>

				<section className="brows-job-category">
					<div className="container">


						<div className="item-click">
							{
								jobs?.map((job) => {

									return (
										<div key={job._id}>
											<article>
												<div className="brows-job-list">

													<div className="col-md-1 col-sm-2 small-padding">
														<div className="brows-job-company-img">
															<img src={"http://localhost:3003/" + job.user?.profile_image} className="img-responsive" alt="" />
														</div>
													</div>
													<div className="col-md-6 col-sm-5">
														<div className="brows-job-position">
															<Link to={`/proposals/${job.job?._id}`}><h3>{job.job?.title}  </h3></Link>
															<p>
																<span>{job.job?.category}</span><span className="brows-job-sallery"><i className="fa fa-money"></i>${job.job?.budget}</span><span className="job-type cl-success bg-trans-success">{job.job?.status}</span><br />
																<h6></h6>
																<p>Description : {job.job.description}</p>

															</p>
														</div>

													</div>

													<div className="col-md-3 col-sm-3">
														<div className="brows-job-location">

															<p><i className="fa fa-map-marker"></i>{job.job?.location}</p>
															<p><i>DeadLine</i>{job.job?.deadline}</p>
														</div>
													</div>
													<div className="col-md-2 col-sm-2">
														<div className="brows-job-link">
															{job.status !== "approved" && ( // Render the Delete Proposal button if status is not "approved"
																<button
																	onClick={() => handeldelete(job._id)}
																	className="btn btn-success item-click"
																>
																	Delete Proposal
																</button>
															)}
														</div>
													</div>
												</div>
												<span className="tg-themetag tg-featuretag">{job.status}</span>
											</article>
										</div>
									)




								})
							}

						</div>

					</div>
				</section>
			</div>
		)
	}

}

export default CurrentJobs
