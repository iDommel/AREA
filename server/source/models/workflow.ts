import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IWorkflow from '../interfaces/workflow';

const WorkflowSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        relativeUser: { type: String, default: '' },
        description: { type: String, default: '' },
        actions: [{ type: mongoose.Types.ObjectId, ref: 'Action' }],
        reactions: [{ type: mongoose.Types.ObjectId, ref: 'Reaction' }]
    },
    {
        timestamps: true
    }
);

WorkflowSchema.post<IWorkflow>('save', function () {
    logging.info('Mongo', 'Checkout the Workflow we just saved: ', this);
});

export default mongoose.model<IWorkflow>('Workflow', WorkflowSchema);
