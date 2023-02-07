import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IWorkflow from '../interfaces/workflow';

const WorkflowSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: '' },
        actions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action' }],
        reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }]
    },
    {
        timestamps: true
    }
);

WorkflowSchema.post<IWorkflow>('save', function () {
    logging.info('Mongo', 'Checkout the Workflow we just saved: ', this);
});

export default mongoose.model<IWorkflow>('Workflow', WorkflowSchema);
