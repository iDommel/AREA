import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';

const WorkflowSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        relativeUser: { type: String, required: true },
        description: { type: String, default: '' },
        actions: [{ type: mongoose.Types.ObjectId, ref: 'Action' }],
        reactions: [{ type: mongoose.Types.ObjectId, ref: 'Reaction' }],
        serviceAction: { type: String, default: '' },
        serviceReaction: { type: String, default: '' },
        additionalData: { type: Array, default: [] }
    },
    {
        timestamps: true
    }
);

WorkflowSchema.post('save', function () {
    logging.info('Mongo', 'Checkout the Workflow we just saved: ', this);
});

export default mongoose.model('Workflow', WorkflowSchema);
