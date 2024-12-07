import React, { useState } from 'react'
import banner from '../../img/banner-10.jpg'
import can from '../../img/can-1.png'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ProposalsDetail() {
	const params =useParams();
	const [proposal, setProposal] = useState("")
	const navigator = useNavigate();
    let id = params.id;
	const navigate = useNavigate()

	

	useEffect(() => {
		axios.get("http://localhost:3003/proposal/"+id).then((res) => {
			setProposal(res.data.proposal)
			

		}).catch((err) => {
			console.log(err)
		})
	}, [id])

	console.log(proposal)
	
	const handelrejact = () =>{
		const status = "reject"
		axios.put("http://localhost:3003/proposal-update-status/"+id , {status}).then((res) => {
			toast.success('Reject Successfully!');
			setTimeout(()=>{
				navigator("/proposals")
			},[4000])
			
		}).catch((err) => {
			toast.error(err);
		})
	}
	const handelhire = () =>{
		const status = "approved"
		axios.put("http://localhost:3003/proposal-update-status/"+id , {status}).then((res) => {
			toast.success('Freelancer Hired!');
			handelpending();
			
			setTimeout(()=>{
				navigator("/manage-freelancer")
			},[4000])
			
			
		}).catch((err) => {
			toast.error(err);
		})
	}
	const handelpending = () => {
		const status = "close"
		const eid = proposal.job._id
		console.log(eid)
		axios.put("http://localhost:3003/update-job-status/" + eid, { status }).then((res) => {
		
		}).catch((err) => {
			
			toast.error(err);
		})

	}





	if(!proposal){
		<div className="Loader"></div>

	}
	else{
		return (
			<div>
				<ToastContainer />
				  <div className="clearfix"></div>
					
					
					<section className="inner-header-title" style={{ backgroundImage: `url(${banner})` }}>
						<div className="container">
							<h1>Proposal Detail</h1>
						</div>
					</section>
					<div className="clearfix"></div>
				
					<section className="detail-desc">
						<div className="container white-shadow">
							
							<div className="row mrg-0">
								
						
								<div className="detail-pic">
									<img src={"http://localhost:3003/"+proposal.user.profile_image} className="img" alt="" />
									<Link to="#" className="detail-edit" title="edit" ><i className="fa fa-pencil"></i></Link>
								</div>
								<div className="detail-status">
								<button onClick={()=>{navigate(-1)}} className='btn btn-success' >Go Back</button>
								</div>
							</div>
							<div className="row bottom-mrg mrg-0">
								<div className="col-md-8 col-sm-8">
									<div className="detail-desc-caption">
										<h5>Job Title :{proposal.job.title}</h5>
										<h4>{proposal.user.first_name+" "+ proposal.user.last_name}</h4>
										<span className="designation">{proposal.user.skills}</span>
										<h5>Description:</h5>
										<p>{proposal.description}</p>
										<Link className='btn btn-info ajdimage hire' target='_blank' to={"http://localhost:3003/" + proposal.file} >View File</Link>

									</div>
								
								</div>
								<div className="col-md-4 col-sm-4">
									<div className="get-touch">
										<h4>Get in Touch</h4>
										<ul>
											<li><i className="fa fa-map-marker"></i><span>{proposal.user.address}</span></li>
											<li><i className="fa fa-map-marker"></i><span>{proposal.user.address2}</span></li>
											<li><i className="fa fa-envelope"></i><span>{proposal.user.email}</span></li>
											<li><i className="fa fa-phone"></i><span>{proposal.user.phone}</span></li>
											<li><i className="fa fa-money"></i><span>${proposal.bidAmount}</span></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="row no-padd mrg-0">
								<div className="detail pannel-footer">
									<div className="col-md-5 col-sm-5">
									
									</div>
									<div className="col-md-7 col-sm-7">
										<div className="detail-pannel-footer-btn pull-right">
										{proposal.job.status === "open" ? (
  <>
    <button onClick={handelhire} className="btn btn-success hire" title="">
      Hire Now
    </button>
    <button onClick={handelrejact} className="btn btn-warning hire" title="">
      Reject
    </button>
  </>
) : null}

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

export default ProposalsDetail
