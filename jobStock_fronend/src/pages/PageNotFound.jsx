import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function PageNotFound({showModal, setShowModal}) {
const btnRef  = useRef();

useEffect( () => {
	// function openModal() {
	// 	setShowModal(true);

	// }
	// openModal();
	setTimeout( () => {
		btnRef.current.click();
	}, 500)
	
	
}, [])


  return (
    <div>
        
      <section className="page_404">
	<div className="container">
		<div className="row">	
		<div className="col-sm-12 ">
		<div className="col-sm-10 col-sm-offset-1  text-center">
		<div className="four_zero_four_bg">
		

		<button
                    data-toggle="modal"
                    data-target="#signup"
                    className="btn btn-success"
					ref={btnRef}
					style={{display: "none"}}
                    onClick={() => setShowModal(true)}
                  >
                    Sign In / Sign up
                  </button>


			<h1 className="text-center ">Login to Continue</h1>
		
		
		</div>
		
		<div className="contant_box_404">
		<h3 className="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		
		<Link to="/" className="link_404">Go to Home</Link>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
    </div>
  )
}

export default PageNotFound
