import React, { useEffect, useState } from 'react'
import banner from '../../img/banner-10.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'

function BrowsJob() {
	const [jobs, setJobs] = useState([])

	useEffect(() => {
		axios.get("http://localhost:3003/jobs").then((res) => {
			setJobs(res.data.jobs)
		}).catch((err) => {
			console.log(err)
		})
	}, [])
	console.log(jobs)
	if (!jobs) (
		<div className="Loader"></div>
	)
	else {
		return (
			<div>
				<div className="clearfix"></div>


				<section className="inner-header-title" style={{ backgroundImage: `url(${banner})` }}>
					<div className="container">
						<h1>Find Jobs</h1>
					</div>
				</section>
				<div className="clearfix"></div>

				<section className="brows-job-category">
					<div className="container">


						<div className="item-click">


							{
								jobs?.map((job) => {
									if (job.status == "open") {
										return (
											<div key={job._id}>
												<article>
													<div className="brows-job-list">

														<div className="col-md-1 col-sm-2 small-padding">
															<div className="brows-job-company-img">
																<img src={"http://localhost:3003/" + job.user.profile_image} className="img-responsive" alt="" />
															</div>
														</div>
														<div className="col-md-7 col-sm-6">
															<div className="brows-job-position">
																<Link to={`/job-detail/${job._id}`}><h3>{job.title}</h3></Link>
																<p>
																	<span>{job.category}</span><span className="brows-job-sallery"><i className="fa fa-money"></i>${job.budget}</span><span className="job-type cl-success bg-trans-success">{job.jobtype}</span><br />
																	<h5>{job.description}</h5>

																</p>
															</div>

														</div>

														<div className="col-md-4 col-sm-4">
															<div className="brows-job-location">
																<p><i className="fa fa-map-marker"></i>{job.location}</p>
																<p><i>DeadLine</i>{job.deadline}</p>
															</div>
														</div>
														
													</div>
													<span className="tg-themetag tg-featuretag">{job.status}</span>
												</article>
											</div>
										)
									}
									


								})
							}

						</div>

					</div>
				</section>
			</div>
		)
	}

}

export default BrowsJob
