import { Document } from 'mongoose';

export default interface IWorkflow extends Document {
    service1: string;
    action: string;
    description: string;
    service2: string;
    reaction: string;
    description2: string;
}
