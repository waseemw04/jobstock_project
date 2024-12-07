import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import banner from '../../img/banner-10.jpg'
import axios from 'axios'

function EmployeerProfile() {
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
	const [cover_image, setCover_image] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [userJob, setUserJob] = useState([])
	const [proposals, setProposals] = useState([])
	const [approvedProposalsCount, setApprovedProposalsCount] = useState(null);
	const [sentProposalsCount, setSentProposalsCount] = useState(null);
	const [openJobsCount, setOpenJobsCount] = useState(0);

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

	useEffect(() => {
		const openJobs = userJob.filter(job => job.status === "open");
		setOpenJobsCount(openJobs.length);
	}, [userJob]);



	useEffect(() => {
		axios.get("http://localhost:3003/proposals-by-employer-user/" + id).then((res) => {
			setProposals(res.data.proposals)


		}).catch((err) => {
			console.log(err)
		})
	}, [id])
	useEffect(() => {
		const sentProposals = proposals.filter(proposal => proposal.status === "sent");
		setSentProposalsCount(sentProposals.length);
	}, [proposals]);
	useEffect(() => {
		const approvedProposals = proposals.filter(proposal => proposal.status === "approved");
		setApprovedProposalsCount(approvedProposals.length);
	}, [proposals]);

	const del = () => {
		axios.get('http://localhost:3003/jobs-by-employer/' + id)
			.then((response) => {
				// Handle successful response
				setUserJob(response.data.jobs)
			})
			.catch((error) => {

				console.error(error);

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

		if (newPassword == confirmPassword) {
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
										<li><strong className="j-view">{userJob.length}</strong>Job Post</li>
										<li><strong className="j-applied">{approvedProposalsCount}</strong>Hired Freelancer</li>
										<li><strong className="j-shared">{openJobsCount}</strong>Active Jobs</li>
										<li><strong className="j-shared">{sentProposalsCount}</strong>New Proposals</li>


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

export default EmployeerProfile
