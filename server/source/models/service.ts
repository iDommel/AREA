import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';

const ServiceSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: '' },
        actions: [],
        globallyEnabled: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

ServiceSchema.post('save', function () {
    logging.info('Mongo', 'Checkout the service we just saved: ', this);
});

export default mongoose.model('Service', ServiceSchema);
