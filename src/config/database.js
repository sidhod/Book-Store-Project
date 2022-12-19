import mongoose from 'mongoose';
mongoose.set("strictQuery", false);
export const connectToDataBase = async () => {
    try {
        console.log('=> using new Database Connnection');
        console.log(process.env.DB);
        await mongoose.connect(process.env.DB)
    } catch (error) {
        throw new Error(error);

    }
};

