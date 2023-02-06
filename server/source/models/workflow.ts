import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IWorkflow from '../interfaces/workflow';

const WorkflowSchema: Schema = new Schema(
    {
        service1: { type: String, required: true },
        action: { type: String, required: true },
        description: { type: String, required: true },
        service2: { type: String, required: true },
        reaction: { type: String, required: true },
        description2: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

WorkflowSchema.post<IWorkflow>('save', function () {
    logging.info('Mongo', 'Checkout the Workflow we just saved: ', this);
});

export default mongoose.model<IWorkflow>('Workflow', WorkflowSchema);
