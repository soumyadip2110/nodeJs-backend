import mongoose from "mongoose";

async function connectMongoDb(url) {
    await mongoose.connect(url)
    .then(() => {
        console.log('MongoDB Connected!');
    })
    .catch(err => {
        console.log('Error on connection: ', err);
    })
}

export default connectMongoDb;