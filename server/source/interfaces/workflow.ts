import { Document, Types } from 'mongoose';

export default interface IWorkflow extends Document {
    name: { type: String; required: true };
    description: { type: String; default: '' };
    actions: [{ type: Types.ObjectId; ref: 'Action' }];
    reactions: [{ type: Types.ObjectId; ref: 'Reaction' }];
<<<<<<< HEAD
    serviceAction: { type: String; default: '' };
    serviceReaction: { type: String; default: '' };
=======
    relativeUser: { type: String; default: ''};
>>>>>>> 0e204c2089a986dcb6188e7fd0d18530327ad5da
}
