
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EmployeerProfile from './pages/employeer/EmployeerProfile';
import Footer from './components/Footer';
import CreateJob from './pages/employeer/CreateJob';
import ManageCandidate from './pages/employeer/ManageCandidate';
import Proposals from './pages/employeer/Proposals';
import ProposalsDetail from './pages/employeer/ProposalsDetail';
import UserProfile from './pages/freelancer/UserProfile';
import BrowsJob from './pages/freelancer/BrowsJob';
import CreateProposals from './pages/freelancer/CreateProposals';
import ApplyJobDetail from './pages/freelancer/ApplyJobDetail';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react'
import Logout from './pages/Logout';
import CurrentJobs from './pages/freelancer/CurrentJobs';
import PageNotFound from './pages/PageNotFound';
import FreelancerDetail from './pages/employeer/FreelancerDetail';
import MyJobs from './pages/employeer/MyJobs';
import EditJob from './pages/employeer/EditJob';


function App() {
  const UserContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // State to track loading status
  const role = UserContext.user?.role;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulate an asynchronous fetch to get the role from the context.
    // Replace this with the actual asynchronous call to get the role from your AuthContext.
    const fetchRole = async () => {
      // Simulate an API call delay (remove this in your real implementation)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoading(false); // Set loading to false after the role is fetched
    };

    fetchRole();
  }, []);

  
  const freelancerRoutes = (
    <>
      <Route path='/user-profile' element={<UserProfile />} />
      <Route path='/find-job' element={<BrowsJob />} />
      <Route path='/create-proposal/:id' element={<CreateProposals />} />
      <Route path='/my-proposals' element={<CurrentJobs />} />
      <Route path='/proposals/:id' element={<Proposals />} />
      <Route path='/proposal-detail/:id' element={<ProposalsDetail />} />
      <Route path='/logout' element={<Logout />} />
    </>
  );

  // Define routes for Employeer role
  const employeerRoutes = (
    <>
      <Route path='/employeer-profile' element={<EmployeerProfile />} />
      <Route path='/create-job' element={<CreateJob />} />
      <Route path='/edit-job/:id' element={<EditJob />} />
      <Route path='/manage-freelancer' element={<ManageCandidate />} />
      <Route path='/myjobs' element={<MyJobs />} />
      <Route path='/proposals/:id' element={<Proposals />} />
      <Route path='/proposal-detail/:id' element={<ProposalsDetail />} />
      <Route path='/freelancer-detail/:id' element={<FreelancerDetail />} /> 
      <Route path='/logout' element={<Logout />} />
    </>
  );



  return (
    <div className="">
      <Navbar showModal={showModal} setShowModal={setShowModal} />
      {loading ? (
        (
          <div className='loder'>
             <div className="loader"></div>
          </div>
         
         
        )
       
      ) : (
        // Once the role is fetched, render the Routes
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/job-detail/:id' element={<ApplyJobDetail />} />

          {role === 'Freelancer' && freelancerRoutes}
          {role === 'Employeer' && employeerRoutes}
          <Route path='*' element={<PageNotFound showModal={showModal} setShowModal={setShowModal}  />} />
        </Routes>
      )}
      <Footer />
    </div>
  );

}

export default App;
