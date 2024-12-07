import React from 'react'
import footer from '../img/footer-logo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
       <footer className="footer">
            <div className="row lg-menu">
                <div className="container">
                    <div className="col-md-4 col-sm-4"><img src={footer} className="img-responsive"
                            alt="" />
                    </div>
                   
                </div>
            </div>
            <div className="row no-padding">
                <div className="container">
                    <div className="col-md-3 col-sm-12">
                        <div className="footer-widget">
                            <h3 className="widgettitle widget-title">About Job Stock</h3>

                            <div className="textwidget">
                                <p>Job Stock will Provide you high paying jobs Signup now and earn</p>

                                <p>Virtual Address<br/>Online World need your Skills</p>

                                <p><strong>Email:</strong> Support@jobstock.com</p>

                                <p><strong>Call:</strong> <Link to="tel:+923092161570">+92309-2161570</Link></p>
                             
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4">
                        
                    </div>
                    <div className="col-md-3 col-sm-4">
                        <div className="footer-widget">
                            <h3 className="widgettitle widget-title">All Categories</h3>

                            <div className="textwidget">
                                <ul className="footer-navigation">
                                    <li>Front-end Design</li>
                                    <li>Android Developer</li>
                                    <li>CMS Development</li>
                                    <li>PHP Development</li>
                                    <li>IOS Developer</li>
                                    <li>Iphone Developer</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4">
                        <div className="footer-widget">
                            <h3 className="widgettitle widget-title">Connect Us</h3>

                            <div className="textwidget">
                                <form className="footer-form"><input type="text" className="form-control"
                                        placeholder="Your Name" />
                                    <input type="text" className="form-control" placeholder="Email"/>
                                    <textarea className="form-control" placeholder="Message"></textarea>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row copyright">
                <div className="container">
                    <p><Link target="_blank" to="https://www.hiexpert.tech">Created By Syed Muzammil Bukhari | Powered by TICER </Link></p>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer
