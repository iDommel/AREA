import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';

const ServiceSchema: Schema = new Schema(
    {
        name: { type: String, unique: true, required: true },
        route: { type: String, unique: true, required: true },
        description: { type: String, default: '' },
        actions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action' }],
        reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
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
