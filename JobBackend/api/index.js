const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModels = require("../models/UserModels");
const ProposalModel = require("../models/ProposalModel")
const JobsModels = require("../models/JobsModels")
const cors = require("cors");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authCheck = require("../middlewares/authCheck");


app.get("/api", async (request, response) => {
    return response.json({
        status: true,
        movies: "hello",
      });
  });

  
app.use(express.json());
app.use(
  cors({
    origin: "*", // Replace with your React app's domain
    optionsSuccessStatus: 200,
  })
);


app.get("/api/users", async (request, response) => {
    try {
      const users = await UserModels.find();
      return response.json({
        status: true,
        users: users
      })
    } catch (error) {
      return response.json({
        status: false,
        msg: "Users not found"
      })
    }
  })
  //End Get All Users//
  
  // /  SignUp///
//   app.post("/api/signup", upload.single('image'), async (request, response) => {
//     try {
//       const { username, email } = request.body;
  
//       const usernameExist = await UserModels.findOne({ username });
//       const emailExist = await UserModels.findOne({ email });
  
//       if (usernameExist && emailExist) {
//         return response.json({
//           status: false,
//           message: "Username and email are already registered"
//         });
//       } else if (usernameExist) {
//         return response.json({
//           status: false,
//           message: "Username is already registered"
//         });
//       } else if (emailExist) {
//         return response.json({
//           status: false,
//           message: "Email is already registered"
//         });
//       }
  
//       // Generate hashed password
//       request.body.password = await bcrypt.hash(request.body.password, 10);
  
//       // Image System
//       if (request.file) {
//         if (
//           request.file.mimetype == "image/png" ||
//           request.file.mimetype == "image/jpg" ||
//           request.file.mimetype == "image/jpeg"
//         ) {
//           let ext = request.file.mimetype.split("/api/")[1];
//           if (ext == "plain") {
//             ext = "txt";
//           }
//           const newImgName = request.file.path + "." + ext;
//           request.body.image = newImgName;
//           fs.rename(request.file.path, newImgName, () => {
//             console.log("done");
//           });
//         } else {
//           fs.unlink(request.file.path, () => {
//             console.log("deleted");
//           });
//         }
//       }
  
//       // Adding Process
//       await UserModels.create(request.body);
//       return response.json({
//         status: true
//       });
//     } catch (error) {
//       if (error.name === "ValidationError") {
//         let errors = {};
//         Object.keys(error.errors).forEach((key) => {
//           errors[key] = error.errors[key].message;
//         });
//         return response.json({
//           status: false,
//           errors: errors
//         });
//       }
//     }
//   });
  
  ///Login Start //////
  app.post("/api/login", async (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
  
    //STEP 1  user is reqistered or not
    let user = await UserModels.findOne({ email: email });
    if (!user) {
        return response.json({
            status: false,
            message: "Email and Password is incorrect"
        })
    }
  
     //STEP 2 now we got the user, now check password is correct
    try {
        const isPassOk = await bcrypt.compare(password, user.password);
        if(isPassOk == true) {
            const token = jwt.sign({ name: user.name, id:user._id, role: user.role }, privateKey);
            return response.json({
                status: true,
                token: token
                
            })
            
        }else {
            return response.json({
                status: false,
                message: "username or password is incorrect"
            })
        }
  
  
    } catch (error) {
      return response.json({
        status: false,
        message: "Something went wrong"
        
    })
  }
  
  })



/////Get User By ID///
app.get("/api/user/:id", async (request, response) => {
    const id = request.params.id;
    try {
      const user = await UserModels.findById(id);
      return response.json({
        status: true,
        user: user
      })
    } catch (error) {
      return response.json({
        status: false,
        message: "Something went wrong"
      })
    }
  
  })
  /////End ///GET USER BY ID/////
  /////Delete USER///
  app.delete("/api/user-delete/:id", async (request, response) => {
  
    const id = request.params.id;
    try {
      await UserModels.findByIdAndDelete(id);
      return response.json({
        status: true
      })
    } catch (error) {
      return response.json({
        status: false
      })
    }
  
  })
  //////User Delete API End/////////
  app.get("/api/approved-freelancers/:employerId", async (request, response) => {
    const employerId = request.params.employerId;
    try {
      // Find all approved proposals of the specific employer
      const approvedProposals = await ProposalModel.find({ "job.user": employerId, "status": "approved" }).exec();
  
      // Extract the freelancer user IDs from the approved proposals
      const freelancerUserIds = approvedProposals.map(proposal => proposal.user);
  
      // Find all approved freelancers based on the extracted user IDs
      const approvedFreelancers = await UserModels.find({ "_id": { $in: freelancerUserIds }, "role": "Freelancer" }).exec();
  
      return response.json({
        status: true,
        approvedFreelancers: approvedFreelancers
      });
    } catch (error) {
      return response.json({
        status: false,
        msg: "Failed to get approved freelancers of the specific employer"
      });
    }
  });
  
  ///////////////////////////////////////////////    User Model End    /////////////////////////////////
  
  ///////////////////////////////////////////////    update PROFILE image by user ID START    /////////////////////////////////
  
//   app.put("/api/update-profile-image/:id", upload.single('profile_image'), async (request, response) => {
//     try {
//       const userId = request.params.id;
//       const user = await UserModels.findById(userId);
//       if (!user) {
//         return response.json({
//           status: false,
//           message: "User not found"
//         });
//       }
  
//       if (request.file) {
//         // Delete the existing profile image if it exists
//         if (user.profile_image) {
//           fs.unlink(user.profile_image, () => { console.log("deleted") });
//         }
  
//         // Process the new profile image
//         if (
//           request.file.mimetype == "image/png" ||
//           request.file.mimetype == "image/jpg" ||
//           request.file.mimetype == "image/jpeg"
//         ) {
//           let ext = request.file.mimetype.split("/api/")[1];
//           if (ext == "plain") { ext = "txt"; }
//           const newImgName = request.file.path + "." + ext;
//           fs.rename(request.file.path, newImgName, () => { console.log("done") });
//           user.profile_image = newImgName;
//         } else {
//           fs.unlink(request.file.path, () => { console.log("deleted") });
//         }
  
//         // Save the updated user's profile image
//         await user.save();
  
//         return response.json({
//           status: true,
//           message: "Profile image updated successfully"
//         });
//       } else {
//         return response.json({
//           status: false,
//           message: "No profile image file provided"
//         });
//       }
//     } catch (error) {
//       return response.json({
//         status: false,
//         message: "Something went wrong"
//       });
//     }
//   });
  ///////////////////////////////////////////////    UPDATE PROFILE IMAGE BY user ID END    /////////////////////////////////
  
  ///////////////////////////////////////////////    UPDATE COVER IMAGE BY user ID START    /////////////////////////////////
//   app.put("/api/update-cover-image/:id", upload.single('cover_image'), async (request, response) => {
//     try {
//       const userId = request.params.id;
//       const user = await UserModels.findById(userId);
//       if (!user) {
//         return response.json({
//           status: false,
//           message: "User not found"
//         });
//       }
  
//       if (request.file) {
//         // Delete the existing cover image if it exists
//         if (user.cover_image) {
//           fs.unlink(user.cover_image, () => { console.log("deleted") });
//         }
  
//         // Process the new cover image
//         if (
//           request.file.mimetype == "image/png" ||
//           request.file.mimetype == "image/jpg" ||
//           request.file.mimetype == "image/jpeg"
//         ) {
//           let ext = request.file.mimetype.split("/api/")[1];
//           if (ext == "plain") { ext = "txt"; }
//           const newImgName = request.file.path + "." + ext;
//           fs.rename(request.file.path, newImgName, () => { console.log("done") });
//           user.cover_image = newImgName;
//         } else {
//           fs.unlink(request.file.path, () => { console.log("deleted") });
//         }
  
//         // Save the updated user's cover image
//         await user.save();
  
//         return response.json({
//           status: true,
//           message: "Cover image updated successfully"
//         });
//       } else {
//         return response.json({
//           status: false,
//           message: "No cover image file provided"
//         });
//       }
//     } catch (error) {
//       return response.json({
//         status: false,
//         message: "Something went wrong"
//       });
//     }
//   });
  ///////////////////////////////////////////////    UPDATE COVER IMAGE BY user ID END    /////////////////////////////////
  
  ///////////////////////////////////////////////    UPDATE USER PASSWORD BY user ID START    /////////////////////////////////
  app.put("/api/update-password/:id", async (request, response) => {
    try {
      const userId = request.params.id;
      const { oldPassword, newPassword } = request.body;
  
      const user = await UserModels.findById(userId);
      if (!user) {
        return response.json({
          status: false,
          message: "User not found"
        });
      }
  
      // Verify the old password
      const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordMatched) {
        return response.json({
          status: false,
          message: "Old password is incorrect"
        });
      }
  
      // Generate hashed password for the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      return response.json({
        status: true,
        message: "Password updated successfully"
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Something went wrong"
      });
    }
  });
  
  ///////////////////////////////////////////////    UPDATE USER PASSWORD BY user ID END    /////////////////////////////////
  
  ///////////////////////////////////////////////    UPDATE USER PASSWORD BY user ID END    /////////////////////////////////
  app.put("/api/update-user/:id", async (request, response) => {
    try {
      const userId = request.params.id;
      const { first_name, last_name, phone, username, zip, address, address2, organization, city, state, country, about, email, role, skills } = request.body;
  
      const user = await UserModels.findById(userId);
      if (!user) {
        return response.json({
          status: false,
          message: "User not found"
        });
      }
  
      // Update user details
      user.first_name = first_name || user.first_name;
      user.username = username || user.username;
      user.last_name = last_name || user.last_name;
      user.phone = phone || user.phone;
      user.zip = zip || user.zip;
      user.address = address || user.address;
      user.address2 = address2 || user.address2;
      user.organization = organization || user.organization;
      user.city = city || user.city;
      user.state = state || user.state;
      user.country = country || user.country;
      user.about = about || user.about;
      user.email = email || user.email;
      user.role = role || user.role;
      user.skills = skills || user.skills;
  
      // Save the updated user
      await user.save();
  
      return response.json({
        status: true,
        message: "User details updated successfully",
        user: user
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Something went wrong"
      });
    }
  });
  ///////////////////////////////////////////////    UPDATE USER PASSWORD BY user ID END    /////////////////////////////////
  
  
  ///--------------------------------------------    Proposal Model START    ----------------------------//
  
  app.get("/api/proposals", async (request, response) => {
    try {
      const proposals = await ProposalModel.find()
      .populate("user")
      .populate("job")
      .exec();
      return response.json({
        status: true,
        proposals: proposals
      })
    } catch (error) {
      return response.json({
        status: false,
        msg: "Users not found"
      })
    }
  })
  //End Get All Users//
  
  // /  SignUp///
//   app.post("/api/add-proposal", upload.single('file'), async (request, response) => {
  
//     try {
//           let ext = request.file.mimetype.split("/api/")[1];
//           const NewImgName = request.file.path + "." + ext;
//           request.body.file = NewImgName;
//           fs.rename(request.file.path, NewImgName, () => { console.log("done") });
//         ////Adding Process//
//         await ProposalModel.create(request.body);
//         return response.json({
//           "status": true
//         });
      
  
//     } catch (error) {
//       if (error.name === "ValidationError") {
//         let errors = {};
  
//         Object.keys(error.errors).forEach((key) => {
//           errors[key] = error.errors[key].message;
//         });
  
//         return response.json({
//           "status": false,
//           errors: errors
//         })
//       }
//     }
//   })
  app.put("/api/proposal/:id", async (request, response) => {
    const id = request.params.id;
    const updateData = request.body; // Assuming the updated data is sent in the request body
  
    try {
      const updatedProposal = await ProposalModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true } // This option returns the updated document
      )
      .populate("user")
      .populate("job")
      .exec();
  
      if (!updatedProposal) {
        return response.json({
          status: false,
          message: "Proposal not found"
        });
      }
  
      return response.json({
        status: true,
        proposal: updatedProposal
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Something went wrong"
      });
    }
  });
  
  app.get("/api/job-proposal/:jobId", async (request, response) => {
    try {
      const jobId = request.params.jobId;
  
      const proposals = await ProposalModel.find({ job: jobId })
        .populate("user")
        .populate("job")
        .exec();
  
      if (proposals.length === 0) {
        return response.json({
          status: false,
          msg: "Proposals not found for the given job ID"
        });
      }
  
      return response.json({
        status: true,
        proposals: proposals
      });
    } catch (error) {
      return response.json({
        status: false,
        msg: "Error fetching proposals"
      });
    }
  });
  
  
  /////Get proposal By ID///
  app.get("/api/proposal/:id", async (request, response) => {
    const id = request.params.id;
    try {
      const proposal = await ProposalModel.findById(id)
      .populate("user")
      .populate("job")
      .exec();
      return response.json({
        status: true,
        proposal: proposal
      })
    } catch (error) {
      return response.json({
        status: false,
        message: "Something went wrong"
      })
    }
  
  })
  /////End ///GET proposal BY ID/////
  /////Delete Proposal by id///
  app.delete("/api/proposal-delete/:id", async (request, response) => {
  
    const id = request.params.id;
    try {
      await ProposalModel.findByIdAndDelete(id);
      return response.json({
        status: true
      })
    } catch (error) {
      return response.json({
        status: false
      })
    }
  
  })
  //////User Delete API End/////////
  
  //////////////// GET ALL USER PPROPOSALS BY ID START/////////////////////////
  app.get("/api/proposals-by-user/:userId", async (request, response) => {
    const userId = request.params.userId;
    try {
      const proposals = await ProposalModel.find({ user: userId })
        .sort({createdAt: -1})
        .populate("job")
        .populate("user")
        .exec();
  
      return response.json({
        status: true,
        proposals: proposals
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to get proposals by user ID"
      });
    }
  });
  //////////////////////////// GET ALL USER PPROPOSALS BY ID END /////////////////////////
  
  /////////////////////////// GET ALL  PPROPOSALS BY JOB ID START /////////////////////////
  
  app.get("/api/proposals-by-job/:jobId", async (request, response) => {
    const jobId = request.params.jobId;
    try {
      const proposals = await ProposalModel.find({ job: jobId })
        .populate("job")
        .populate("user")
        .exec();
  
      return response.json({
        status: true,
        proposals: proposals
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to get proposals by job ID"
      });
    }
  });
  
  //////////////////////////// GET ALL  PPROPOSALS BY JOB ID END /////////////////////////
  
  //////////////////////////// GET ALL USER PPROPOSALS BY STATUS ID START /////////////////////////
  app.get("/api/proposals-by-status/:status", async (request, response) => {
    const status = request.params.status;
    try {
      const proposals = await ProposalModel.find({ status })
        .populate("job")
        .populate("user")
        .exec();
  
      return response.json({
        status: true,
        proposals: proposals
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to get proposals by status"
      });
    }
  });
  
  //////////////////////////// GET ALL USER PPROPOSALS BY STATUS ID END /////////////////////////
  
  //////////////////////////// UPDATE   PPROPOSALS BY STATUS ID START /////////////////////////
  app.put("/api/proposal-update-status/:id", async (request, response) => {
    const id = request.params.id;
    const { status } = request.body;
    try {
      const updatedProposal = await ProposalModel.findByIdAndUpdate(id, { status }, {
        new: true
      });
      return response.json({
        status: true,
        proposal: updatedProposal,
        message: "Proposal status updated successfully"
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to update proposal status"
      });
    }
  });
  //////////////////////////// UPDATE PPROPOSALS BY STATUS ID END /////////////////////////
  
  //////////////////////////// COUNT PPROPOSALS BY USER ID START /////////////////////////
  app.get("/api/proposal-count/:userId", async (request, response) => {
    const userId = request.params.userId;
    try {
      const count = await ProposalModel.countDocuments({ user: userId });
  
      return response.json({
        status: true,
        count: count
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to count proposals"
      });
    }
  });
  
  //////////////////////////// COUNT PPROPOSALS BY USER ID END /////////////////////////
  
  //////////////////////////// GET ALL PPROPOSALS BY JOB CATAGORIES START /////////////////////////
  app.get("/api/proposals-by-category/:category", async (request, response) => {
    const category = request.params.category;
    try {
      const proposals = await ProposalModel.find({ "jobId.category": category })
        .populate("job")
        .populate("user")
        .exec();
  
      return response.json({
        status: true,
        proposals: proposals
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to get proposals by category"
      });
    }
  });
  
  //////////////////////////// GET ALL PPROPOSALS BY JOB CATAGORIES END /////////////////////////
  
  
  //////////////////////////// GET ALL PPROPOSALS OF SPACIFIC EMPLOYEER END /////////////////////////
  
  app.get("/api/proposals-by-employer-user/:employerUserId", async (request, response) => {
    const employerUserId = request.params.employerUserId;
    try {
      // Find all jobs belonging to the specific employer's user
      const jobs = await JobsModels.find({ "user": employerUserId }).exec();
  
      // Extract the job IDs from the jobs array
      const jobIds = jobs.map(job => job._id);
  
      // Find all proposals related to the extracted job IDs
      const receivedProposals = await ProposalModel.find({ "job": { $in: jobIds } })
      .populate("job")
      .populate("user")
      .exec();
  
      return response.json({
        status: true,
        proposals: receivedProposals
      });
    } catch (error) {
      return response.json({
        status: false,
        msg: "Failed to get received proposals of the employer's user"
      });
    }
  });
  
  
  ////------------------------------------------    Proposal Model END  ------------------------------------
  ///--------------------------------------------    jOB Model START   ---------------------------------
  
  //////////////GET ALL JOB START/////////////////////
  app.get("/api/jobs", async (request, response) => {
    try {
      const jobs = await JobsModels.find()
      .populate("user")
      .exec();
      return response.json({
        status: true,
        jobs: jobs
      })
    } catch (error) {
      return response.json({
        status: false,
        msg: "jobs not found"
      })
    }
  })
  //////////////// GET ALL JOBS END ////////////////
//   app.put("/api/update-job/:id", upload.single('completefile'), async (request, response) => {
//     try {
//       const jobId = request.params.id;
//       const { completeDescription } = request.body;
  
//       const updatedFields = {};
  
//       if (completeDescription) {
//         updatedFields.completeDescription = completeDescription;
//       }
  
//       let ext = request.file.mimetype.split("/api/")[1];
//       const NewImgName = request.file.path + "." + ext;
//       request.body.file = NewImgName;
//       fs.rename(request.file.path, NewImgName, () => { console.log("done") });
  
//       const updatedJob = await JobsModels.findByIdAndUpdate(
//         jobId,
//         updatedFields,
//         { new: true }
//       )
//       .populate('user')
//       .exec();
  
//       if (!updatedJob) {
//         return response.json({
//           status: false,
//           message: 'Job not found'
//         });
//       }
  
//       return response.json({
//         status: true,
//         job: updatedJob
//       });
//     } catch (error) {
//       return response.json({
//         status: false,
//         message: 'Something went wrong'
//       });
//     }
//   });
  
  //////////////// Edit JOB BY ID Start ////////////////
  
  app.put("/api/job/:id", async (request, response) => {
    const jobId = request.params.id;
    const updateData = request.body;
  
    try {
      // Find the job by its ID and update it with the new data
      const updatedJob = await JobsModels.findByIdAndUpdate(jobId, updateData, { new: true });
  
      if (!updatedJob) {
        return response.json({
          status: false,
          msg: "Job not found"
        });
      }
  
      return response.json({
        status: true,
        job: updatedJob
      });
    } catch (error) {
      return response.json({
        status: false,
        msg: "Failed to update job"
      });
    }
  });
  
  //////////////// edit JOBS END ////////////////
  ////////////////// ADD JOB START /////////////////
//   app.post("/api/create-job", upload.single('file'), async (request, response) => {
  
//     try {
//           let ext = request.file.mimetype.split("/api/")[1];
//           const NewImgName = request.file.path + "." + ext;
//           request.body.file = NewImgName;
//           fs.rename(request.file.path, NewImgName, () => { console.log("done") });
//         ////Adding Process//
//         await JobsModels.create(request.body);
//         return response.json({
//           "status": true
//         });
      
  
//     } catch (error) {
//       if (error.name === "ValidationError") {
//         let errors = {};
//         Object.keys(error.errors).forEach((key) => {
//           errors[key] = error.errors[key].message;
//         });
//         return response.json({
//           "status": false,
//           errors: errors
//         })
//       }
//     }
//   })
  /////////////////// ADD JOB END //////////////////
  
  /////////////////// GET JOB BY ID START ////////////////
  app.get("/api/job-detail/:id", async (request, response) => {
    const id = request.params.id;
    try {
      const job = await JobsModels.findById(id)
      .populate("user")
      .exec();
      return response.json({
        status: true,
        job: job
      })
    } catch (error) {
      return response.json({
        status: false,
        message: "Something went wrong"
      })
    }
  })
  /////////////////// GET JOB BY ID END ///////////
  
  ////////////////// DELETE JOB  BY ID START ////////////
  app.delete("/api/job-delete/:id", async (request, response) => {
  
    const id = request.params.id;
    try {
      await JobsModels.findByIdAndDelete(id);
      return response.json({
        status: true
      })
    } catch (error) {
      return response.json({
        status: false
      })
    }
  
  })
  //////////////////////// DELETE BY ID END ///////////////////////////
  
  //////////////////////// GET ALL JOB BY CATAGORIES START ///////////////////////////
  app.get("/api/jobs-by-category/:category", async (request, response) => {
    const category = request.params.category;
    try {
      const jobs = await JobsModels.find({ category });
      return response.json({
        status: true,
        jobs: jobs
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to get jobs by category"
      });
    }
  });
  //////////////////////// GET ALL JOB BY CATAGORIES END ///////////////////////////
  
  //////////////////////// GET ALL JOB BY FREELANCER ID START ///////////////////////////
  app.get("/api/jobs-by-freelancer/:userId", async (request, response) => {
    const userId = request.params.userId;
    try {
      // Assuming "user" is the field in the database that stores the freelancer's user ID when they apply for a job
      const appliedJobs = await JobsModels.find({ "user._id": userId }).exec();
  
      return response.json({
        status: true,
        jobs: appliedJobs
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to get jobs by freelancer ID"
      });
    }
  });
  //////////////////////// GET ALL JOB BY FREELANCER ID END ///////////////////////////
  
  //////////////////////// GET ALL JOB BY Employeer ID START ///////////////////////////
  app.get("/api/jobs-by-employer/:user", async (request, response) => {
    const user = request.params.user;
    try {
      const jobs = await JobsModels.find({ user : user })
      .sort({createdAt: -1})
      .populate("user")
      .exec();
      return response.json({
        status: true,
        jobs: jobs
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to get jobs by employer ID"
      });
    }
  });
  
  
  //////////////////////// GET ALL JOB BY FREELANCER ID END ///////////////////////////
  
  //////////////////////// UPDATE  JOB STATUS BY  ID START ///////////////////////////
  app.put("/api/update-job-status/:id", async (request, response) => {
    const id = request.params.id;
    const { status } = request.body;
    try {
      const updatedJob = await JobsModels.findByIdAndUpdate(id, { status }, { new: true });
      return response.json({
        status: true,
        job: updatedJob,
        message: "Job status updated successfully"
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to update job status"
      });
    }
  });
  
  //////////////////////// UPDATE  JOB BY  ID END ///////////////////////////
  
  //////////////////////// GET  JOB BY  STATUS START ///////////////////////////
  app.get("/api/jobs-by-status/:status", async (request, response) => {
    const status = request.params.status;
    try {
      const jobs = await JobsModels.find({ status });
      return response.json({
        status: true,
        jobs: jobs
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to get jobs by status"
      });
    }
  });
  
  //////////////////////// GET  JOB BY  STATUS END ///////////////////////////
  
  //////////////////////// GET  JOB BY  KEYWORD START ///////////////////////////
  app.get("/api/jobs-by-keyword/:keyword", async (request, response) => {
    const keyword = request.params.keyword;
    try {
      // Use a regular expression to perform a case-insensitive search for the keyword in the title or description fields
      const jobs = await JobsModels.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } }, // Case-insensitive search in the title field
          { description: { $regex: keyword, $options: "i" } }, // Case-insensitive search in the description field
        ]
      })
      .populate("user");
  
      return response.json({
        status: true,
        jobs: jobs
      });
    } catch (error) {
      return response.json({
        status: false,
        message: "Failed to get jobs by keyword"
      });
    }
  });
  
  //////////////////////// GET  JOB BY  KEYWORD END ///////////////////////////
  
  




mongoose.connect("mongodb+srv://syntexcodex:syntexcodex@cluster0.bigppfg.mongodb.net/experts").then(() => {
   console.log("DB connect")
  });

  module.exports = app;