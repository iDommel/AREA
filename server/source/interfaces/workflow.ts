import { Document, Types } from 'mongoose';

export default interface IWorkflow extends Document {
    name: { type: String; required: true };
    description: { type: String; default: '' };
    actions: [{ type: Types.ObjectId; ref: 'Action' }];
    reactions: [{ type: Types.ObjectId; ref: 'Reaction' }];
    serviceAction: { type: String; default: '' };
    serviceReaction: { type: String; default: '' };
}
