import mongoose, { Schema, Types } from 'mongoose';
import logging from '../config/logging';

const ServiceStatusSchema: Schema = new Schema(
    {
        service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
        serviceName: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isConnected: { type: Boolean, default: false },
        auth: {
            accessToken: { type: String, default: '' },
            refreshToken: { type: String, default: '' },
            expires_in: { type: Number, default: 0 }
        },
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
