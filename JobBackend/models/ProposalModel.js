
const mongoose = require('mongoose');
const { Schema } = mongoose;


const proposalSchema = new mongoose.Schema({
  job: {
    type: Schema.Types.ObjectId, 
    ref: 'Job',
    required: [true, "JobID is required"],
  },
user: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, "user is required"],
},
  file: {
    type: String,
    required: [true],
    get: linkUrl
},
description: {
    type: String
  },
  bidAmount: {
    type: String,
    required: [true, "title is required"],
  },
  skills: {
    type: String,
    required: [true, "skills is required"],
  },
  freelancerImage: {
    type: String,
    required: [true, "skills is required"],
    get: linkUrl
  },
  status: {
    type: String,
    enum: ['sent', 'approved', 'reject'],
    default: 'sent',
  },
},{ timestamps: true }, {toJSON: {getters: true} } );
function linkUrl(file) {
  return "http://localhost:3003/" + file;
}

const ProposalModel = mongoose.model('Proposal', proposalSchema);

module.exports = ProposalModel;
