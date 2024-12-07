import React, { useEffect, useState } from 'react'
import banner from '../../img/banner-10.jpg'
import client from '../../img/client-1.jpg'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';



function ManageCandidate() {
	const [proposals, setProposals] = useState([])
	const UserContext = useContext(AuthContext);
	const id = UserContext.user?.id



useEffect(() => {
	axios.get("http://localhost:3003/proposals-by-employer-user/" + id).then((res) => {
		setProposals(res.data.proposals)


	}).catch((err) => {
		console.log(err)
	})
}, [id])
console.log(proposals)

  return (
    <div>
      <div className="clearfix"></div>
			
			<section className="inner-header-title" style={{ backgroundImage: `url(${banner})` }}>
				<div className="container">
					<h1>Manage Freelancer</h1>
				</div>
			</section>
            <div className="clearfix"></div>
			
			<section className="member-card gray">
				<div className="container">
				<div className="row">
					{
						proposals.map((proposal)=>{
							if(proposal.status == "approved"){
								return(
									
						<div className="col-md-4 col-sm-4">
							<div className="manage-cndt">
								<div className="cndt-status success">{proposal.status}</div>
								<div className="cndt-caption">
									<div className="cndt-pic">
									<img src={"http://localhost:3003/"+proposal.user.profile_image} className="img-responsive" alt="" />
									</div>
									<h4>{proposal.user.username}</h4>
									<span>{proposal.user.skills}</span>
									<p>{proposal.user.country}</p>
								</div>
								<Link to={`/freelancer-detail/${proposal.user._id}`} title="" className="cndt-profile-btn hire">View Profile</Link>
							</div>
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

export default ManageCandidate
