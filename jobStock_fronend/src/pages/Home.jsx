import React from 'react'
import { Link } from 'react-router-dom'
import bannerImage from '../img/banner-9.jpg'
import bannerImage2 from '../img/banner-7.jpg'
import step1 from '../img/step-1.png'
import step2 from '../img/step-2.png'
import step3 from '../img/step-3.png'
import client1 from '../img/client-1.jpg'
import client2 from '../img/client-2.jpg'
import iphone from '../img/iphone.png'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
    const [jobs, setJobs] = useState([])
    const [user, setUser] = useState([])
    const [keyword, setKeyword] = useState([])

   
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        axios
            .get(`http://localhost:3003/jobs`)
            .then((response) => {
                // Handle successful response
                setJobs(response.data.jobs)
           
            })
            .catch((error) => {

                console.error(error);

            })

    }, [])



   

const handelClick=()=>{

    axios
            .get("http://localhost:3003/jobs-by-keyword/"+keyword)
            .then((response) => {
               
                setJobs(response.data.jobs)
           
            })
            .catch((error) => {

                console.error(error);

            })

}
console.log(jobs)


    return (
        <div>
            <div className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
                <div className="container">
                    <div className="banner-caption">
                        <div className="col-md-12 col-sm-12 banner-text">
                            <h1>7,000+ Browse Jobs</h1>

                            <form onSubmit={(e) => e.preventDefault()} className="form-horizontal">
                                <div className="col-md-10 no-padd">
                                    <div className="input-group"><input type="text" className="form-control right-bor" id="joblist"
                                        placeholder="Skills," onChange={(e)=>{setKeyword(e.target.value)}}   /></div>
                                </div>
                                
                               
                                <div className="col-md-2 no-padd">
                                    <div className="input-group">
                                        <button onClick={handelClick} type="submit" className="btn btn-primary">Search Job</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
            <section>
                <div className="container">
                    <div className="row">
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
                                                    <div className="col-md-6 col-sm-5">
                                                        <div className="brows-job-position">
                                                            <Link to={`/job-detail/${job._id}`}><h3>{job.title}</h3></Link>
                                                            <p>
                                                                <span>{job.category}</span><span className="brows-job-sallery"><i className="fa fa-money"></i>${job.budget}</span><span className="job-type cl-success bg-trans-success">{job.jobtype}</span><br />
                                                                <h5>{job.description}</h5>

                                                            </p>
                                                        </div>

                                                    </div>

                                                    <div className="col-md-3 col-sm-3">
                                                        <div className="brows-job-location">
                                                            <p><i className="fa fa-map-marker"></i>{job.location}</p>
                                                            <p><i>DeadLine</i>{job.deadline}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2">
                                                        <div className="brows-job-link">
                                                            <Link to={`/job-detail/${job._id}`} className="btn btn-success item-click">Job Detail</Link>
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
            <div className="clearfix"></div>
            <section className="how-it-works">
                <div className="container">
                    <div className="row" data-aos="fade-up">
                        <div className="col-md-12">
                            <div className="main-heading">
                                <p>Working Process</p>

                                <h2>How It <span>Works</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <div className="working-process">
                                <span className="process-img"><img src={step1} className="img-responsive"
                                    alt="" /><span className="process-num">01</span></span>
                                <h4>Create An Account</h4>

                                <p>Post a job to tell us about your project. We'll quickly match you with the right
                                    freelancers
                                    find place best.</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="working-process">
                                <span className="process-img"><img src={step2} className="img-responsive"
                                    alt="" /><span className="process-num">02</span></span>
                                <h4>Search Jobs</h4>

                                <p>Post a job to tell us about your project. We'll quickly match you with the right
                                    freelancers
                                    find place best.</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="working-process">
                                <span className="process-img"><img src={step3} className="img-responsive"
                                    alt="" /><span className="process-num">03</span></span>
                                <h4>Save & Apply</h4>
                                <p>Post a job to tell us about your project. We'll quickly match you with the right
                                    freelancers
                                    find place best.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="clearfix"></div>
            <section className="testimonial" id="testimonial">
                <div className="container">
                    <div className="row">
                        <div className="main-heading">
                            <p>What Say Our Client</p>

                            <h2>Our Success <span>Stories</span></h2>
                        </div>
                    </div>
                    <div className="row ct-center test">

                        <div className="client-testimonial col-lg-5">
                            <div className="pic"><img src={client1} alt="" /></div>
                            <p className="client-description">This one is Good Freelancer and Good Codder hire this for Project. </p>

                            <h3 className="client-testimonial-title">Alex</h3>
                            <ul className="client-testimonial-rating">
                                <li className="fa fa-star-o"></li>
                                <li className="fa fa-star-o"></li>
                                <li className="fa fa-star"></li>
                            </ul>
                        </div>
                        <div className="client-testimonial col-lg-5">
                            <div className="pic"><img src={client2} alt="" /></div>
                            <p className="client-description">This one is Good Freelancer and Good Codder hire this for Project.</p>

                            <h3 className="client-testimonial-title">Alexa</h3>
                            <ul className="client-testimonial-rating">
                                <li className="fa fa-star-o"></li>
                                <li className="fa fa-star"></li>
                                <li className="fa fa-star"></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
           
            <section className="download-app" style={{ backgroundImage: `url(${bannerImage2})` }}>
                <div className="container">
                    <div className="col-md-5 col-sm-5 hidden-xs"><img src={iphone} alt="iphone"
                        className="img-responsive" /></div>
                    <div className="col-md-7 col-sm-7">
                        <div className="app-content">
                            <h2>Download Our Best Apps</h2>
                            <h4>Best oppertunity in your hand</h4>

                            <p>World need your Skills. Download signup and get job</p>
                            <Link to="#" className="btn call-btn"><i className="fa fa-apple"></i>Download</Link><Link to="#"
                                className="btn call-btn"><i className="fa fa-android"></i>Download</Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className="clearfix"></div>

        </div>
    )

}

export default Home
