import mongoose from 'mongoose';
import colors from 'colors/safe';

const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(process.env.MONGO_URI || '', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  conn && console.log(
    `MongoDB Connected: ${colors.blue(String(conn.connection.host))}`
  );
};

export default connectDB;
