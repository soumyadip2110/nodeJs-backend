import mongoose from 'mongoose';

// Schema
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        jobTitle: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

// Model
const User = mongoose.model('user', userSchema);

export default User;