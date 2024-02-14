import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/httpError';
import { jsonOne, jsonAll } from '../utils/general';
import Logging from '../library/Logging';
import Content, { IContnetModel } from '../models/content';
import { IQualityObj } from '../interfaces/contentQuality';

//CREATE A CONTENT
const createContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { imageTargetSrc, modelPath, modelFile, positionY, scaleSet, size } = req.body;


        Logging.debug(`Request Body = ${req.body}`);

        //function generate analytix matrix
        //analyzeContent()

        const currentTimestamp = new Date().toISOString();
        //CRETA NEW USRE
        let contentData = new Content({
            imageTargetSrc,
            modelPath,
            modelFile,
            positionY,
            scaleSet,
            size,
            // generate analytic Matrix should also included or create a seperate collection and create a related document to it
            // createdDate: currentTimestamp,
            // lastUpdatedDate: currentTimestamp,
            ref_ver: 1,
        });

        let savedContent = await contentData.save();

        //SENDING RESPONSE
        return jsonOne(res, 201, savedContent);
    } catch (error) {
        next(error);
    }
};

//GET CONTENT DETAILS BY ID
const getContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contentId = req.params.contentId;

        let data = await Content.findById(contentId);

        return jsonOne(res, 200, data);
    } catch (error) {
        next(error);
    }
};

//GET ALL CONTENT LIST
const getAllContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let pageOptions: { page: number; limit: number } = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
        };

        const count = await Content.countDocuments({});

        Logging.debug(`Number Of Documents = ${count}`);

        //GETING DATA FROM TABLE
        let contents = await Content.find()
            //.populate('meshColor')
            .limit(pageOptions.limit * 1)
            .skip((pageOptions.page - 1) * pageOptions.limit)
            .sort({ createdAt: -1 });

        Logging.debug(`First Query = ${contents}`);

        //CREATE PAGINATION
        const meta = {
            total: count,
            limit: pageOptions.limit,
            totalPages: Math.ceil(count / pageOptions.limit),
            currentPage: pageOptions.page,
        };

        return jsonAll<any>(res, 200, contents, meta);
    } catch (error) {
        Logging.error(`Error fetching content: ${error}`);
        next(error);
    }
};


//UPDATE CONTENT DETAILS WITH ID
const updateContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const contentId = req.params.contentId;

        let content = await Content.findById(contentId);
        //If Content not found
        if (!content) {
            throw new HttpError({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }

        let savedContent = await Content.findOneAndUpdate(
            { _id: contentId },
            {
                imageTargetSrc: body.imageTargetSrc,
                modelPath: body.modelPath,
                modelFile: body.modelFile,
                positionY: body.positionY,
                scaleSet: body.scaleSet,
                size: body.size,
                ref_ver: 1,
            },
            { new: true }
        );
        return jsonOne(res, 200, savedContent);
    } catch (error) {
        next(error);
    }
};


//DELETE CONTENT DETAILS WITH ID
const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const contentId = req.params.contentId;

        let content = await Content.findById(contentId);
        //If Content not found
        if (!content) {
            throw new HttpError({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }

        await Content.findByIdAndDelete(contentId);

        return jsonOne(res, 200, { message: 'Content deleted successfully' });

    } catch (error) {
        next(error);
    }
};


// ANALYZE CONTENT function
function analyzeContent(levels: number, obj: IQualityObj): string {
    const { high, mid, low } = obj.content;

    let h_size = 0, h_polyCount = 0, h_animCount = 0,
        m_size = 0, m_polyCount = 0, m_animCount = 0,
        l_size = 0, l_polyCount = 0, l_animCount = 0;

    switch (levels) {
        case 1:
            ({ h_size, h_polyCount, h_animCount } = high);
            break;
        case 2:
            ({ h_size, h_polyCount, h_animCount } = high);
            ({ m_size, m_polyCount, m_animCount } = mid);
            break;
        case 3:
            ({ h_size, h_polyCount, h_animCount } = high);
            ({ m_size, m_polyCount, m_animCount } = mid);
            ({ l_size, l_polyCount, l_animCount } = low);
            break;
        default:
            ({ h_size, h_polyCount, h_animCount } = high);
            ({ m_size, m_polyCount, m_animCount } = mid);
            ({ l_size, l_polyCount, l_animCount } = low);
            break;
    }

    Logging.debug(`High: ${h_size} + ${h_polyCount} + ${h_animCount}`);
    Logging.debug(`Mid: ${m_size} + ${m_polyCount} + ${m_animCount}`);
    Logging.debug(`Low: ${l_size} + ${l_polyCount} + ${l_animCount}`);

    // Perform actual analysis here...

    //size based analysis


    //polygonCount based analysis


    //animCount based analysis


    const analyticMatrix = "hi";

    return analyticMatrix;
}

// //ANALYZE CONTENT
// const analyzeContent = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { levels, high, mid, low } = req.body;

//         let h_size, h_polyCount, h_animCount,
//             m_size, m_polyCount, m_animCount,
//             l_size, l_polyCount, l_animCount;

//         switch (levels) {
//             case 1:
//                 ({ h_size, h_polyCount, h_animCount } = high);
//                 break;
//             case 2:
//                 ({ h_size, h_polyCount, h_animCount } = high);
//                 ({ m_size, m_polyCount, m_animCount } = mid);
//                 break;
//             case 3:
//                 ({ h_size, h_polyCount, h_animCount } = high);
//                 ({ m_size, m_polyCount, m_animCount } = mid);
//                 ({ l_size, l_polyCount, l_animCount } = low);
//                 break;
//             default:
//                 ({ h_size, h_polyCount, h_animCount } = high);
//                 ({ m_size, m_polyCount, m_animCount } = mid);
//                 ({ l_size, l_polyCount, l_animCount } = low);
//                 break;
//         }

//         Logging.debug(`High: ${ h_size} + ${h_polyCount} + ${h_animCount}`);
//         Logging.debug(`Mid: ${ m_size} + ${m_polyCount} + ${m_animCount}`);
//         Logging.debug(`Low: ${ l_size} + ${l_polyCount} + ${l_animCount}`);




//         return res.status(200).json({ message: 'Content analyzed successfully' });

//     } catch (error) {
//         next(error);
//     }
// };


//EXPORT
export default {
    createContent,//will include the analytic matrix generating logic
    getContent,
    getAllContent,
    updateContent,
    deleteContent,
    // analyzeContent,
    // findBasedOnTarget,
};