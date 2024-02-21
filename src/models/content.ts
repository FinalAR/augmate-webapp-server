import mongoose, { Document, Schema } from 'mongoose';
import { IContent } from '../interfaces';

/**
 * @openapi
 * components:
 *   schemas:
 *     Metadata:
 *       type: object
 *       required:
 *        - total
 *        - limit
 *        - totalPages
 *        - currentPage
 *       properties:
 *         total:
 *           type: number
 *           default: 8
 *         limit:
 *           type: number
 *           default: 10
 *         totalPages:
 *           type: number
 *           default: 1
 *         currentPage:
 *           type: number
 *           default: 1
 *     Contentdraft:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *           default: "Canon EOS 1500D DSLR Camera with 18-55mm Lens"
 *         description:
 *           type: string
 *           default: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go."
 *         price:
 *           type: number
 *           default: 879.99
 *         image:
 *           type: string
 *           default: "https://i.imgur.com/QlRphfQ.jpg"
 *     Content:
 *       type: object
 *       required:
 *        - targetImageHash
 *        - targetImage
 *        - contentImage
 *        - modelPath
 *        - modeFile
 *        - size
 *       properties:
 *         targetImageHash:
 *           type: string 
 *         targetImage:
 *           type: string 
 *         contentImage:
 *           type: string  
 *         contentPath:
 *           type: string  
 *         description:
 *           type: string  
 *         analysis:
 *           type: object
 *         meshColor:
 *           type: string
 *           default: '0x0000ff'
 *         modelPath:
 *           type: string
 *         modelFile:
 *           type: string
 *         progressPhase:
 *           type: string
 *           default: 'phase 2'    
 *         positionY:
 *           type: string
 *           default: '0'
 *         scaleSet:
 *           type: string
 *           default: '0.3'
 *         size:
 *           type: string
 *           default: '11173332'
 *         ref_ver:
 *           type: number
 *           default: 1
 *     ExperienceContent:
 *       type: object
 *       properties:
 *         successOrFaliure:
 *           type: string
 *         meshColor:
 *           type: string
 *           default: '0x0000ff'
 *         modelPath:
 *           type: string
 *         modelFile:
 *           type: string
 *         progressPhase:
 *           type: string
 *           default: 'phase 2'    
 *         positionY:
 *           type: string
 *           default: '0'
 *         scaleSet:
 *           type: string
 *           default: '0.3'
 *         size:
 *           type: string
 *           default: '11173332'
 *         ref_ver:
 *           type: number
 *           default: 1
 *     ContentResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         targetImageHash:
 *           type: string 
 *         targetImage:
 *           type: string 
 *         contentImage:
 *           type: string  
 *         contentPath:
 *           type: string  
 *         description:
 *           type: string  
 *         analysis:
 *           type: object
 *         meshColor:
 *           type: string
 *           default: '0x0000ff'
 *         modelPath:
 *           type: string
 *         modelFile:
 *           type: string
 *         progressPhase:
 *           type: string
 *           default: 'phase 2'    
 *         positionY:
 *           type: string
 *           default: '0'
 *         scaleSet:
 *           type: string
 *           default: '0.3'
 *         size:
 *           type: string
 *           default: '11173332'
 *         ref_ver:
 *           type: number
 *           default: 1
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         __v:
 *           type: number
 *     ContentAllResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items: ContentResponse
 *         meta:
 *           type: Metadata
 */

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IContnetModel extends IContent, Document { }

//DEFINE USER SCHEMA
const ContentSchema: Schema = new Schema(
    {
        targetImageHash: {
            type: String,
            required: true,
        },
        targetImage: {
            type: String,
            required: true,
        },
        contentImage: {
            type: String,
            required: true,
        },
        contentPath: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        analysis: {
            type: Object,
        },
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
            required: true
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
        // createdDate: {
        //     type: String,
        //     default: '2000-01-12T08:30:00.000Z',
        // },
        // lastUpdatedDate: {
        //     type: String,
        //     default: '2000-01-12T08:30:00.000Z',
        // },
        ref_ver: {
            type: Number,
            required: true,
            default: 1,
        },
        flag: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

//EXPORT
export default mongoose.model<IContnetModel>("content", ContentSchema);
