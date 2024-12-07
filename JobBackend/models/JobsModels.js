const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, "EmployeerID is required"],
  },
  
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  employeerImage: {
    type: String,
    required: [true, "Title is required"],
  },
  jobtype: {
    type: String,
    required: [true, "Title is required"],
  },
  location: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    required: [true, "Description is required"],
  },
  file: {
    type: String,
    required: [true, "File is required"],
    get: linkUrl,
  },
  completefile: {
    type: String,
    default : "",
    get: linkUrl,
  },
  skillsRequired: {
    type: String,
    required: [true, "Skills Required is required"],
  },
  budget: {
    type: String,
    required: [true, "Budget is required"],
  },
  deadline: {
    type: String,
    required: [true, "Deadline is required"],
  },
  keywords: {
    type: String,
    required: [true, "Keywords are required"],
  },
  completeDescription: {
    type: String,
    default : "",
  },
  status: {
    type: String,
    enum: ['open', 'complete', 'in progress', 'pending'],
    default: 'open',
  },
}, { timestamps: true }, { toJSON: { getters: true } });

function linkUrl(file) {
  return "http://localhost:3003/" + file;
}

const JobsModels = mongoose.model('Job', jobSchema);

module.exports = JobsModels;
