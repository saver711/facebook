const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema;
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'first name is required'],
        trim: true,
        text: true
    },
    last_name: {
        type: String,
        required: [true, 'last name is required'],
        trim: true,
        text: true
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
        text: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    picture: {
        type: String,
        default: 'https://res.cloudinary.com/dchgmm8wb/image/upload/v1651411631/Default-welcomer.png',
        trim: true
    },
    cover: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        required: [true, 'gender is required'],
        trim: true,
        enum: ['male', 'female']
    },
    bYear: {
        type: Number,
        required: true,
        trim: true
    },
    bMonth: {
        type: Number,
        required: true,
        trim: true
    },
    bDay: {
        type: Number,
        required: true,
        trim: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    friends: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    requests: {
        type: Array,
        default: []
    },
    search: [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        }
    ],
    details:{
        bio: {
            type: String,
        },
        otherName: {
            type: String,
        },
        job: {
            type: String,
        },
        workplace: {
            type: String,
        },
        highSchool: {
            type: String,
        },
        collage: {
            type: String,
        },
        currentCity: {
            type: String,
        },
        homeTown: {
            type: String,
        },
        relationship: {
            type: String,
            enum: ['Single', 'In a relationship', 'Engaged', 'Married', 'It\'s complicated', 'In an open relationship', 'Widowed', 'Separated', 'Divorced', 'In a civil union', 'In a domestic partnership']
        },
        instagram: {
            type: String,
        }
    },
    savedPosts: [
        {
            post: {
                type: ObjectId,
                ref: 'Post'
            },
            savedAt: {
                type: Date,
                default: new Date()
            }
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);