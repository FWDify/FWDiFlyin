import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('MongoDB has found FWDiFly'))
    .catch((err) => {
      console.error('MongoDB is still looking for a place to land');
      console.error(err);
    });
};

export default connectDB;