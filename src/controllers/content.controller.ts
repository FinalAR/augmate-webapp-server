import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/httpError';
import { jsonOne, jsonAll } from '../utils/general';
import Logging from '../library/Logging';
import Content, { IContnetModel } from '../models/content';
import { IQualityObj } from '../interfaces/contentQuality';

////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/content/create:
 *  post:
 *     tags:
 *     - Content
 *     summary: Create a new Content
 *     responses:
 *       200:
 *         description: Content Details
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Content'
 *           example:
 *             "targetImage": "base64encoding"
 *             "contentImage": "base64encoding"
 *             "meshColor": "0x0000ff"
 *             "imageTargetSrc": "https://finalar.github.io/imageTargets/target_datestamp_timestamp.mind"
 *             "modelPath": "https://finalar.github.io/models/SurveySet/"
 *             "modelFile": "mode_dateStamp_timeStamp.glb"
 *             "positionY": "0"
 *             "scaleSet": "0.3"
 *             "size": "11173332"
 *             "ref_ver": 1
 */

//CREATE A CONTENT
const createContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { targetImage, contentImage, imageTargetSrc, modelPath, modelFile, positionY, scaleSet, size } = req.body;


        Logging.debug(`Request Body = ${req.body}`);

        //function generate analytix matrix
        //analyzeContent()

        const targetImageBinary = Buffer.from(targetImage, 'base64');
        const contentImageBinary = Buffer.from(contentImage, 'base64');

        const currentTimestamp = new Date().toISOString();
        //CRETA NEW USRE
        let contentData = new Content({
            targetImage: targetImageBinary,
            contentImage: contentImageBinary,
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

////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @openapi
 * '/api/v1/content/fetch/{contentId}':
 *  get:
 *     tags:
 *     - Content
 *     summary: Fetch Contents by Id
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         description: ID of the content to fetch
 *         schema:
 *           type: string
 *           example: 65cafd1a91f0f81fbfd1d499
 *     responses:
 *       200:
 *         description: Content Details
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/ContentResponse'
 *           example:
 *             "_id": "65cafd1a91f0f81fbfd1d499"
 *             "targetImage": "base64encoding"
 *             "contentImage": "base64encoding"
 *             "meshColor": "0x0000ff"
 *             "imageTargetSrc": "https://finalar.github.io/imageTargets/targets2.mind"
 *             "modelPath": "https://finalar.github.io/models/SurveySet/"
 *             "modelFile": "FoodPackDDFGH.glb"
 *             "progressPhase": "phase 2"
 *             "positionY": "0"
 *             "scaleSet": "0.3"
 *             "size": "11173332"
 *             "createdDate": "2000-01-12T08:30:00.000Z"
 *             "lastUpdatedDate": "2000-01-12T08:30:00.000Z"
 *             "ref_ver": 1
 *             "createdAt": "2024-02-13T05:24:42.484Z"
 *             "updatedAt": "2024-02-13T05:24:42.484Z"
 *             "__v": 0
 */

//GET CONTENT DETAILS BY ID
const getContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contentId = req.params.contentId;

        // Fetch the content document from the database
        let content = await Content.findById(contentId);

        // If content is not found, return a 404 response
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        // Extract targetImage and contentImage from the content document
        const { targetImage, contentImage, ...responseData } = content.toObject();

        const targetImageBuffer = Buffer.from(targetImage, 'binary');
        const contentImageBuffer = Buffer.from(contentImage, 'binary');

        // Convert binary data to base64 encoding
        const targetImageBase64 = targetImageBuffer.toString('base64');
        const contentImageBase64 = contentImageBuffer.toString('base64');

        // Create a response object including targetImage and contentImage
        const data = {
            ...responseData,
            targetImage: targetImageBase64 || '', // If targetImage is null or undefined, set it to an empty string
            contentImage: contentImageBase64 || '', // If contentImage is null or undefined, set it to an empty string
        };

        return jsonOne(res, 200, data);
    } catch (error) {
        next(error);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * '/api/v1/content/fetch':
 *  get:
 *     tags:
 *     - Content
 *     summary: Fetch All Contents
 *     responses:
 *       200:
 *         description: Content List
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/ContentAllResponse'
 *           example:
 *             data:
 *               - "_id": "65cafd1a91f0f81fbfd1d499"
 *                 "targetImage": "base64encoding"
 *                 "contentImage": "base64encoding"
 *                 "meshColor": "0x0000ff"
 *                 "imageTargetSrc": "https://finalar.github.io/imageTargets/targets2.mind"
 *                 "modelPath": "https://finalar.github.io/models/SurveySet/"
 *                 "modelFile": "FoodPackDDFGH.glb"
 *                 "progressPhase": "phase 2"
 *                 "positionY": "0"
 *                 "scaleSet": "0.3"
 *                 "size": "11173332"
 *                 "createdDate": "2000-01-12T08:30:00.000Z"
 *                 "lastUpdatedDate": "2000-01-12T08:30:00.000Z"
 *                 "ref_ver": 1
 *                 "createdAt": "2024-02-13T05:24:42.484Z"
 *                 "updatedAt": "2024-02-13T05:24:42.484Z"
 *                 "__v": 0
 *             meta:
 *               total: 8
 *               limit: 10
 *               totalPages: 1
 *               currentPage: 1
 */

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

          // Convert binary data to base64 encoding for each content document
          const dataWithImages = await Promise.all(contents.map(async (content) => {
            const { targetImage, contentImage, ...responseData } = content.toObject();
            
            let targetImageBase64 = '';
            if (targetImage) {
                const targetImageBuffer = Buffer.from(targetImage, 'binary');
                targetImageBase64 = targetImageBuffer.toString('base64');
            }

            let contentImageBase64 = '';
            if (contentImage) {
                const contentImageBuffer = Buffer.from(contentImage, 'binary');
                contentImageBase64 = contentImageBuffer.toString('base64');
            }

            return {
                ...responseData,
                targetImage: targetImageBase64,
                contentImage: contentImageBase64,
            };
        }));


        //CREATE PAGINATION
        const meta = {
            total: count,
            limit: pageOptions.limit,
            totalPages: Math.ceil(count / pageOptions.limit),
            currentPage: pageOptions.page,
        };

        return jsonAll<any>(res, 200, dataWithImages, meta);
    } catch (error) {
        Logging.error(`Error fetching content: ${error}`);
        next(error);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/content/{contentId}:
 *  put:
  *     tags:
 *     - Content
 *     summary: Update Contents by Id
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         description: ID of the content to update
 *         schema:
 *           type: string
 *           example: 65cafd1a91f0f81fbfd1d499
 *     responses:
 *       200:
 *         description: Content Details
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Content'
 *           example:
 *             "targetImage": "base64encoding"
 *             "contentImage": "base64encoding"
 *             "meshColor": "0x0000ff"
 *             "imageTargetSrc": "https://finalar.github.io/imageTargets/target_datestamp_timestamp.mind"
 *             "modelPath": "https://finalar.github.io/models/SurveySet/"
 *             "modelFile": "mode_dateStamp_timeStamp.glb"
 *             "positionY": "0"
 *             "scaleSet": "0.3"
 *             "size": "11173332"
 *             "ref_ver": 1
 */

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

        const targetImageBinary = Buffer.from(body.targetImage, 'base64');
        const contentImageBinary = Buffer.from(body.contentImage, 'base64');

        let savedContent = await Content.findOneAndUpdate(
            { _id: contentId },
            {
                targetImage: targetImageBinary,
                contentImage: contentImageBinary,
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

////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/content/{contentId}:
 *  delete:
  *     tags:
 *     - Content
 *     summary: Delete Contents by Id
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         description: ID of the content to delete
 *         schema:
 *           type: string
 *           example: 65cafd1a91f0f81fbfd1d555
 *     responses:
 *       200:
 *         description: Content deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Content deleted successfully       
 */

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

        return jsonOne(res, 200, { message: 'Content deleted successfully...!' });

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