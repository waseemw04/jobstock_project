import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

function CreateJob() {
	const UserContext = useContext(AuthContext);
	const user = UserContext.user?.id
	const EuserContext = useContext(AuthContext);
	const employeerImage = EuserContext.euser?.profile_image || "upload/4e04d0ffa6f9bdd944a993b51a97d9ab.jpeg";
	console.log(employeerImage)
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [jobtype, setJobtype] = useState("");
	const [skillsRequired, setSkillsRequired] = useState("");
	const [deadline, setDeadline] = useState("");
	const [keywords, setKeywords] = useState("");
	const [budget, setBudget] = useState("");
	const [location, setLocation] = useState("");
	const [file, setFile] = useState("");
	const [description, setDescription] = useState("");

	const handelCreateJob = () =>{
		// console.log(deadline,title,category, jobtype, skillsRequired, keywords, budget, location,description, file)
		const data ={user,deadline,title,category, jobtype, skillsRequired, keywords, budget, location,description, file,employeerImage };
		console.log(data)
		axios.post('http://localhost:3003/create-job', data,{
			headers: {
				'Content-Type': 'multipart/form-data'
			}})
		.then(response => {
		  console.log(response.data);
		  if (response.data.status === false) {
			toast.error("First Complete Profile");
		  }
		  if (response.data.status === true) {
			
			toast.success("Job Created Successfully");
  
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
					<h1>Create Job</h1>
				</div>
			</section>
      <div className="detail-desc section">
				<div className="container white-shadow">
				
					<div className="row">
						<div className="detail-pic js">
							<div className="box">
							<img src={"http://localhost:3003/"+employeerImage} className="img-responsive" alt="" />

							</div>
						</div>
					</div>
					
					<div className="row bottom-mrg">
						<form className="add-feild">
							<div className="col-md-6 col-sm-6">
								<div className="input-group">
									<input type="text" className="form-control" placeholder="Job Title" onChange={(e)=>{setTitle(e.target.value)}}/>
								</div>
							</div>
							
							<div className="col-md-6 col-sm-6">
								<div className="input-group">
								<select className="form-control input-lg" onChange={(e)=>{setCategory(e.target.value)}}>
										<option>Catagory</option>
										<option>Website Developemnt</option>
										<option>Graphic Designing</option>
										<option>Data Entry</option>
										<option>Digital Marketing</option>
									</select>
								</div>
							</div>
							
							<div className="col-md-6 col-sm-6">
								<div className="input-group">
									<select className="form-control input-lg" onChange={(e)=>{setJobtype(e.target.value)}}>
										<option>Job Type</option>
										<option>Full Time</option>
										<option>Part Time</option>
										<option>Freelancer</option>
										<option>Internship</option>
									</select>
								</div>
							</div>
							
							<div className="col-md-6 col-sm-6">
								<div className="input-group">
									<input type="text" onChange={(e)=>{setLocation(e.target.value)}} className="form-control" placeholder="Location,e.g. London Quel Mark"/>
								</div>
							</div>
							<div className="col-md-6 col-sm-6">
								<div className="input-group">
									<input type="text" onChange={(e)=>{setBudget(e.target.value)}} className="form-control" placeholder="Budget"/>
								</div>
							</div>
							<div className="col-md-6 col-sm-6">
								<div className="input-group">
									<input type="text" onChange={(e)=>{setSkillsRequired(e.target.value)}} className="form-control" placeholder="Skills Required"/>
								</div>
							</div>
							<div className="col-md-6 col-sm-6">
								<div className="input-group">
									
									<input type="date" onChange={(e)=>{setDeadline(e.target.value)}} className="form-control" title='Deadline' placeholder="DeadLine"/>
								</div>
							</div>
							<div className="col-md-6 col-sm-6">
								<div className="input-group">
									<input type="text" onChange={(e)=>{setKeywords(e.target.value)}} className="form-control" title='Deadline' placeholder="Keywords"/>
								</div>
							</div>
							<div className="col-md-4 col-sm-6 file">
								<form onSubmit={(e) => e.preventDefault()} className="dropzone dz-clickable profile-cover">
															<div className="dz-default dz-message">
																<i className="fa fa-cloud-upload"></i>
																<input type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
															</div>
														</form>
													
							</div>
							
							<div className="col-md-12 col-sm-12 mt-3">
								<textarea className="form-control" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Job Description"></textarea>
							</div>
							
						</form>
					</div>
					
					<div className="row no-padd">
						<div className="detail pannel-footer">
							<div className="col-md-12 col-sm-12">
								<div className="detail-pannel-footer-btn pull-right">
									<button  onClick={handelCreateJob} className="btn btn-success">Create Job</button>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
          
          
            
    </div>
  )
}

export default CreateJob
