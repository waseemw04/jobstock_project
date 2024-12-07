const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "Name is required"],   
    },
    username: {
        type: String,
        required: [true, "Username is required"], 
        
    },
    last_name: {
        type: String,
        required: [true, "Name is required"], 
    },
    phone: {
        type: String,
        default: ""
    },
    zip: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    address2: {
        type: String,
        default: ""
    },
    organization: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    profile_image: {
        type: String,
        required: [false, "image is required"],
        default: ""

    },
    cover_image: {
        type: String,
        required: [false, "image is required"],
        default: ""

    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    
    role: {
        type: String,
        enum: ['Freelancer', 'Employeer', 'admin'],
        default: "Freelancer"
    },
    skills: {
        type: String,
        default: ""
    },
   
    
},{ timestamps: true }, {toJSON: {getters: true} } )

function linkUrl(image) {
    return "http://localhost:3003/" + image;
}

const UserModels = mongoose.model('User', userSchema);
module.exports = UserModels;