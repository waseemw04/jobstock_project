import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import banner from '../../img/banner-10.jpg'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'

function UserProfile() {
	const UserContext = useContext(AuthContext);
	const id = UserContext.user?.id
	const [user, setUser] = useState("")
	const [first_name, setFirst_name] = useState("")
	const [last_name, setLast_name] = useState("")
	const [username, setUsername] = useState("")
	const [phone, setPhone] = useState("")
	const [zip, setZip] = useState("")
	const [address, setAddress] = useState("")
	const [address2, setAddress2] = useState("")
	const [organization, setOrganization] = useState("")
	const [city, setCity] = useState("")
	const [state, setState] = useState("")
	const [country, setCountry] = useState("")
	const [about, setAbout] = useState("")
	const [email, setEmail] = useState("")
	const [profile_image, setProfile_image] = useState("")
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [sentProposalCount, setSentProposalCount] = useState(0);
	const [approvedProposalCount, setApprovedProposalCount] = useState(0);

	const [jobs, setJobs] = useState([])

	useEffect(() => {
		axios
			.get('http://localhost:3003/user/' + id)
			.then((response) => {
				// Handle successful response
				setUser(response.data.user)
			})
			.catch((error) => {

				console.error(error);

			})
	}, [id])
	useEffect(() => {
		axios.get("http://localhost:3003/proposals-by-user/"+id).then((res) => {
			setJobs(res.data.proposals)
			

		}).catch((err) => {
			console.log(err)
		})
	}, [id])

	useEffect(() => {
		const sentProposals = jobs.filter(proposal => proposal.status === "sent");
		setSentProposalCount(sentProposals.length);
	  }, [jobs]);
	useEffect(() => {
		const approvedProposals = jobs.filter(proposal => proposal.status === "approved");
		setApprovedProposalCount(approvedProposals.length);
	  }, [jobs]);


	const del = () => {
		axios.get("http://localhost:3003/proposals-by-user/"+id).then((res) => {
			setJobs(res.data.proposals)
			

		}).catch((err) => {
			console.log(err)
		})
	}
	



	const handelDetail = () => {
		console.log(first_name + last_name + username + phone + zip + address + address2 + organization + city + state + country + about + email)
		const data = { first_name, last_name, username, phone, zip, address, address2, organization, city, state, country, about, email }
		axios.put("http://localhost:3003/update-user/" + id, data)
			.then((response) => {
				console.log(response.data);
				if (response.data.status === false) {

					toast.error("SomeThing wrong");
				}
				if (response.data.status === true) {
					toast.success("Detail Update Successfully!");

				}

			})
			.catch((err) => {

				console.log(err.message);
			});
	}

	const handleProfile = () => {
		const fileInput = document.getElementById('file-input'); // Assuming you have an input element with id "file-input"
		const selectedFile = fileInput.files[0];

		if (!selectedFile) {
			// Handle the case when no file is selected
			toast.error('Please select a profile image');
			return;
		}

		const formData = new FormData();
		formData.append('profile_image', selectedFile);

		axios
			.put(`http://localhost:3003/update-profile-image/${id}`, formData)
			.then((response) => {
				console.log(response.data);
				if (response.data.status === false) {
					toast.error('Something Went Wrong');
				}
				if (response.data.status === true) {
					toast.success('Profile Updated Successfully!');
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	
	const handelPassword = () => {

		if (newPassword === confirmPassword) {
			const data = { newPassword, oldPassword }
			axios.put("http://localhost:3003/update-password/" + id, data)
				.then((response) => {
					console.log(response.data);
					if (response.data.status === false) {

						toast.error("SomeThing wrong");
					}
					if (response.data.status === true) {
						toast.success("Password Update Successfully!");

					}
					console.log(data)

				})
				.catch((err) => {

					console.log(err.message);
				});

		}




	}

	const handelclose = (id) => {
		const status = "close"
		axios.put("http://localhost:3003/update-job-status/" + id, { status }).then((res) => {
			del();
			toast.success("Status Update successfully!");
		}).catch((err) => {
			console.log(err)
			toast.error("Error");
		})

	}
	const handelinprogress = (id) => {
		const status = "in progress"
		axios.put("http://localhost:3003/update-job-status/" + id, { status }).then((res) => {
			del();
			toast.success("Status Update successfully!");
		}).catch((err) => {
			console.log(err)
			toast.error("Error");
		})

	}


	if (!user) {
		<div className="Loader"></div>
	}
	else {
		return (

			<div>
				<ToastContainer />
				<section className="inner-header-title" style={{ backgroundImage: `url(${banner})` }}>
					<div className="container">
						<h1>My Profile</h1>
					</div>
				</section>
				<div className="clearfix"></div>
				<section className="detail-desc advance-detail-pr gray-bg">
					<div className="container white-shadow">
						<div className="row">
							<div className="detail-pic"><img src={"http://localhost:3003/" + user.profile_image} className="img" alt="" /><Link to="#" className="detail-edit" title="edit"><i className="fa fa-pencil"></i></Link></div>
							<div className="detail-status"><span>Active Now</span></div>
						</div>

						<div className="row bottom-mrg">
							<div className="col-md-12 col-sm-12">
								<div className="advance-detail detail-desc-caption">
									<h4>{user.first_name + " " + user.last_name}</h4><span className="designation">@{user.username}</span>
									<ul>
										<li><strong className="j-view">{jobs.length}</strong>Total Proposal</li>
										<li><strong className="j-applied">{sentProposalCount}</strong>Active Proposals</li>
										<li><strong className="j-shared">{approvedProposalCount}</strong>Approved Proposals</li>

									</ul>
								</div>
							</div>
						</div>

						<div className="row no-padd">
							<div className="detail pannel-footer">
								<div className="col-md-5 col-sm-5">
									<ul className="detail-footer-social">
										<li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
										<li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
										<li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
										<li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
										<li><Link to="#"><i className="fa fa-instagram"></i></Link></li>
									</ul>
								</div>

							</div>
						</div>

					</div>
				</section>
				<section className="full-detail-description full-detail gray-bg">
					<div className="container">
						<div className="col-md-12 col-sm-12">
							<div className="full-card">
								<div className="deatil-tab-employ tool-tab">
									<ul className="nav simple nav-tabs" id="simple-design-tab">
										<li className="active"><Link >About</Link></li>


									</ul>

									<div className="tab-content">

										<div id="about">
											<h3>About Me</h3>
											<p>{user.about}</p>
										</div>

										<div id="address" >
											<h3>Address Info</h3>
											<ul className="job-detail-des">
												<li><span>Address:</span>{user.address + " / " + user.address2}</li>
												<li><span>City:</span>{user.city}</li>
												<li><span>State:</span>{user.state}</li>
												<li><span>Country:</span>{user.country}</li>
												<li><span>Zip:</span>{user.zip}</li>
												<li><span>Telephone:</span>{user.phone}</li>

												<li><span>Email:</span>{user.email}</li>
											</ul>
										</div>

									</div>

								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="full-detail-description full-detail gray-bg">
					<div className="container">
						<div className="col-md-12 col-sm-12">
							<div className="full-card">
								<div className="deatil-tab-employ tool-tab">
									<ul className="nav simple nav-tabs" id="simple-design-tab">
										<li className="active"><Link >Applied Jobs</Link></li>
									</ul>
									<div className='tab-content'>
										<div id="post-job" >

											<div className="row">
												{
													jobs?.map((job) => {
														
														if(job.status === "approved") {
															return (
																<div key={job._id}>
																	
																	<article>
																		<div className="brows-job-list">
	
																			<div className="col-md-1 col-sm-2 small-padding">
																				<div className="brows-job-company-img">
																					<img src={"http://localhost:3003/" + job.user.profile_image} className="img-responsive" alt="" />
																				</div>
																			</div>
																			<div className="col-md-6 col-sm-5">
																				<div className="brows-job-position">
																					<Link to=""><h3>{job.job.title}  </h3></Link>
																					<p>
																						<span>{job.job.category}</span><span className="brows-job-sallery"><i className="fa fa-money"></i>${job.job.budget}</span><span className="job-type cl-success bg-trans-success">{job.job.status}</span>
	
	
																					</p>
																				</div>
	
																			</div>
	
																			<div className="col-md-3 col-sm-3">
																				<div className="brows-job-location">
	
																					<p><i className="fa fa-map-marker"></i>{job.job.location}</p>
																					<p><i>DeadLine</i>{job.job.deadline}</p>
																				</div>
																			</div>
																			<div className="col-md-2 col-sm-2">
																				<div className="brows-job-link">
																					<button onClick={() => { handelclose(job.job._id) }} className=' btn btn-success mb-2'>Complete</button>
																					<button onClick={() => { handelinprogress(job.job._id) }} className="btn btn-info mt-1">Inprogress</button>
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
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="full-detail-description full-detail gray-bg">
					<div className="container">
						<div className="col-md-12 col-sm-12">
							<div className="full-card">
								<div className="deatil-tab-employ tool-tab">
									<ul className="nav simple nav-tabs" id="simple-design-tab">
										<li className="active"><Link >Profile Setting</Link></li>
									</ul>
									<div className='tab-content'>
										<div>
											<div className="row no-mrg">
												<h3>Edit Profile</h3>
												<div className="edit-pro">
													<div className="col-md-4 col-sm-6">
														<label>First Name</label>
														<input type="text" className="form-control" onChange={(e) => setFirst_name(e.target.value)} placeholder="Matthew" />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>Last Name</label>
														<input type="text" className="form-control" onChange={(e) => setLast_name(e.target.value)} placeholder="Else" />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>username</label>
														<input type="text" className="form-control" placeholder="Dana" onChange={(e) => setUsername(e.target.value)} />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>Email</label>
														<input type="email" className="form-control" placeholder="dana.mathew@gmail.com" onChange={(e) => setEmail(e.target.value)} />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>Phone</label>
														<input type="text" className="form-control" placeholder="+91 258 475 6859" onChange={(e) => setPhone(e.target.value)} />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>Zip / Postal</label>
														<input type="text" className="form-control" placeholder="258 457 528" onChange={(e) => setZip(e.target.value)} />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>Address</label>
														<input type="text" className="form-control" placeholder="204 Lowes Alley" onChange={(e) => setAddress(e.target.value)} />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>Address 2</label>
														<input type="text" className="form-control" placeholder="Street No 3 Pakitan" onChange={(e) => setAddress2(e.target.value)} />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>Organization</label>
														<input type="text" className="form-control" placeholder="Software Developer" onChange={(e) => setOrganization(e.target.value)} />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>City</label>
														<input type="text" className="form-control" placeholder="Lodhran" onChange={(e) => setCity(e.target.value)} />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>State</label>
														<input type="text" className="form-control" placeholder="Punjab" onChange={(e) => setState(e.target.value)} />
													</div>
													<div className="col-md-4 col-sm-6">
														<label>Country</label>
														<input type="text" className="form-control" placeholder="Pakistan" onChange={(e) => setCountry(e.target.value)} />
													</div>

													<div className="col-md-4 col-sm-6">
														<label>About you</label>
														<textarea className="form-control" placeholder="Write Something" onChange={(e) => setAbout(e.target.value)}></textarea>
													</div>
													<div className="col-sm-12">
														<button type="button" className="update-btn" onClick={handelDetail}>Update Now</button>
													</div>
													<div className="col-md-4 col-sm-6">
														<label>Upload Profile Pic</label>
														<form onSubmit={(e) => e.preventDefault()} className="dropzone dz-clickable profile-pic">
															<div className="dz-default dz-message">
																<i className="fa fa-cloud-upload"></i>
																<input type='file' id='file-input' onChange={(e) => setProfile_image(e.target.value)} />
															</div>

														</form>
													</div>
													<div className="col-sm-12">
														<button type="button" className="update-btn" onClick={handleProfile}>Update Now</button>
													</div>
													
												</div>
												<div className="col-md-4 col-sm-6">
													<label>Old Password</label>
													<input type="password" className="form-control" onChange={(e) => setOldPassword(e.target.value)} placeholder="*********" />
												</div>
												<div className="col-md-4 col-sm-6">
													<label>New Password</label>
													<input type="password" className="form-control" onChange={(e) => setNewPassword(e.target.value)} placeholder="*********" />
												</div>
												<div className="col-md-4 col-sm-6">
													<label>Confirm Password</label>
													<input type="password" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="*********" />
												</div>
											</div>
											<div className="col-sm-12">
												<button type="button" onClick={handelPassword} className="update-btn">Update Now</button>
											</div>
										</div>
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

export default UserProfile
