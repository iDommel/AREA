import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';

const ActionSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: '' },
        isEnabled: { type: Boolean, default: false },
        needsAuth: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

ActionSchema.post('save', function () {
    logging.info('Mongo', 'Checkout the action we just saved: ', this);
});

export default mongoose.model('Action', ActionSchema);
