import { model, mongoose, Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String

        },
        lastName: {
            type: String

        },
        email: {
            type: String,
            unique: true

        },
        password: {
            type: String,
            required: true

        }
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);
