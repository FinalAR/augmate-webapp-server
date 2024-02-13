import mongoose, { Document, Schema } from 'mongoose';
import { IContent } from '../interfaces';

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IContnetModel extends IContent, Document {}

//DEFINE USER SCHEMA
const ContentSchema: Schema = new Schema(
    {
        meshColor: {
            type: String,
            default: '0x0000ff',
        },
        imageTargetSrc: {
            type: String,
            required: true,
        },
        modelPath: {
            type: String,
            required: true,
        },
        modelFile: {
            type: String,
            required: true,
            unique: true,
        },
        progressPhase: {
            type: String,
            default: 'phase 2',
        },
        positionY: {
            type: String,
            default: '0',
        },
        scaleSet: {
            type: String,
            default: '0.3',
        },
        size: {
            type: String,
            required: true,
            default: '11173332',
        },
        createdDate: {
            type: String,
            required: true,
            default: '2000-01-12T08:30:00.000Z',
        },
        lastUpdatedDate: {
            type: String,
            required: true,
            default: '2000-01-12T08:30:00.000Z',
        },
        ref_ver: {
            type: Number,
            required: true,
            default: '1',
        },
    },
    { timestamps: true }
);

//EXPORT
export default mongoose.model<IContnetModel>("content", ContentSchema);
