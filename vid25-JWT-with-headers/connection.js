import mongoose from "mongoose";

const connectMongoDb = async (url) => {
    await mongoose.connect(url)
    .then(() => {
        console.log('MongoDB Connected!');
    })
    .catch(err => {
        console.log('Connection Error: ', err);
    })
}

export default connectMongoDb;