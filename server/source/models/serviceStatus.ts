import mongoose, { Schema, Types } from 'mongoose';
import logging from '../config/logging';

const ServiceStatusSchema: Schema = new Schema(
    {
        service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isConnected: { type: Boolean, default: false },
        token: { type: String, default: '' },
        isEnabled: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

ServiceStatusSchema.post('save', function () {
    logging.info('Mongo', 'Checkout the servicestatus we just saved: ', this);
});

export default mongoose.model('ServiceStatus', ServiceStatusSchema);
