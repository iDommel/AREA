import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';

const UserSchema: Schema = new Schema(
    {
        services: [],
        username: { type: String, required: true },
        password: { type: String, required: true },
        workflows: []
    },
    {
        timestamps: true
    }
);

UserSchema.post('save', function () {
    logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

export default mongoose.model('User', UserSchema);
