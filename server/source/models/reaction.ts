import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';

const ReactionSchema: Schema = new Schema(
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

ReactionSchema.post('save', function () {
    logging.info('Mongo', 'Checkout the reaction we just saved: ', this);
});

export default mongoose.model('Reaction', ReactionSchema);
