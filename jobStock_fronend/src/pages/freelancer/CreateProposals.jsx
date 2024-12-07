import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react'
import axios from 'axios';


function CreateProposals() {
	const UserContext = useContext(AuthContext);
	const user = UserContext.user?.id
	const EuserContext = useContext(AuthContext);
	const freelancerImage = EuserContext.euser?.profile_image || "upload/4e04d0ffa6f9bdd944a993b51a97d9ab.jpeg";
	console.log(freelancerImage)
	const params =useParams();
    let job = params.id;
	const [description, setDescription] = useState("");
	const [file, setFile] = useState("");
	const [bidAmount, setBidAmount] = useState("");
	const [skills, setSkills] = useState("");
	

const handelProposal = () =>{
	const data = {description, file, bidAmount, skills, job,user,freelancerImage }
	console.log(data)
	
	axios.post("http://localhost:3003/add-proposal", data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.status === false) {
					toast.error('First Complete Profile');
					
					

				}
				if (response.data.status === true) {
					toast.success('Proposal Sent!');
					
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
}

	return (
		<div>
			<ToastContainer />
			<div className="clearfix"></div>


			<section className="inner-header-title blank">
				<div className="container">
					<h1>Create Proposal</h1>
				</div>
			</section>
			<div className="clearfix"></div>

			<div className="section detail-desc">
				<div className="container white-shadow">

					<div className="row">
						<div className="detail-pic js">
							<div className="box">
							<img src={"http://localhost:3003/"+freelancerImage} className="img-responsive" alt="" />

							</div>
						</div>
					</div>

					<div className="row bottom-mrg">
						<form className="add-feild">
						<div className="col-md-12 col-sm-12">
							<label>Proposal Desription</label>
								<textarea className="form-control" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter Proposal Desription"></textarea>
							</div>
							<div className="col-md-6 col-sm-6">
								<div className="input-group">
								<label>Bidding Amount</label>
									<input type="number" className="form-control" onChange={(e)=>{setBidAmount(e.target.value)}} placeholder="Enter Biding Amount" />
								</div>
							</div>

							<div className="col-md-6 col-sm-6">
								<div className="input-group">
								<label>Your Skills</label>
									<input type="text" className="form-control" onChange={(e)=>{setSkills(e.target.value)}} placeholder="Enter Your Skills" />
								</div>
							</div>

							<div className="col-md-4 col-sm-4">
														<label>Upload Previous Project</label>
														<form onSubmit={(e) => e.preventDefault()} className="dropzone dz-clickable profile-cover">
															<div className="dz-default dz-message">
																<i className="fa fa-cloud-upload"></i>
																<input type="file" onChange={(e)=>{setFile(e.target.files[0])}}  />
															</div>
														</form>
													</div>
						</form>
					</div>

					<div className="row no-padd">
						<div className="detail pannel-footer">
							<div className="col-md-12 col-sm-12">
								<div className="detail-pannel-footer-btn pull-right">
									<button  onClick={handelProposal} className="btn btn-success">Send Proposal</button>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

			
		</div>
	)
}

export default CreateProposals
