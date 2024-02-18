"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpError_1 = __importDefault(require("../utils/httpError"));
const general_1 = require("../utils/general");
const Logging_1 = __importDefault(require("../library/Logging"));
const content_1 = __importDefault(require("../models/content"));
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
 *             "targetImageHash": "pHashedValue"
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
const createContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { targetImageHash, targetImage, contentImage, imageTargetSrc, modelPath, modelFile, positionY, scaleSet, size } = req.body;
        Logging_1.default.debug(`Request Body = ${req.body}`);
        //function generate analytix matrix
        //analyzeContent()
        const targetImageBinary = Buffer.from(targetImage, 'base64');
        const contentImageBinary = Buffer.from(contentImage, 'base64');
        const currentTimestamp = new Date().toISOString();
        //CRETA NEW USRE
        let contentData = new content_1.default({
            targetImageHash,
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
        let savedContent = yield contentData.save();
        //SENDING RESPONSE
        return (0, general_1.jsonOne)(res, 201, savedContent);
    }
    catch (error) {
        next(error);
    }
});
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
const getContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.params.contentId;
        // Fetch the content document from the database
        let content = yield content_1.default.findById(contentId);
        // If content is not found, return a 404 response
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        // Extract targetImage and contentImage from the content document
        const _a = content.toObject(), { targetImage, contentImage } = _a, responseData = __rest(_a, ["targetImage", "contentImage"]);
        const targetImageBuffer = Buffer.from(targetImage, 'binary');
        const contentImageBuffer = Buffer.from(contentImage, 'binary');
        // Convert binary data to base64 encoding
        const targetImageBase64 = targetImageBuffer.toString('base64');
        const contentImageBase64 = contentImageBuffer.toString('base64');
        // Create a response object including targetImage and contentImage
        const data = Object.assign(Object.assign({}, responseData), { targetImage: targetImageBase64 || '', contentImage: contentImageBase64 || '' });
        return (0, general_1.jsonOne)(res, 200, data);
    }
    catch (error) {
        next(error);
    }
});
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
const getAllContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pageOptions = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
        };
        const count = yield content_1.default.countDocuments({});
        Logging_1.default.debug(`Number Of Documents = ${count}`);
        //GETING DATA FROM TABLE
        let contents = yield content_1.default.find()
            //.populate('meshColor')
            .limit(pageOptions.limit * 1)
            .skip((pageOptions.page - 1) * pageOptions.limit)
            .sort({ createdAt: -1 });
        Logging_1.default.debug(`First Query = ${contents}`);
        // Convert binary data to base64 encoding for each content document
        const dataWithImages = yield Promise.all(contents.map((content) => __awaiter(void 0, void 0, void 0, function* () {
            const _b = content.toObject(), { targetImage, contentImage } = _b, responseData = __rest(_b, ["targetImage", "contentImage"]);
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
            return Object.assign(Object.assign({}, responseData), { targetImage: targetImageBase64, contentImage: contentImageBase64 });
        })));
        //CREATE PAGINATION
        const meta = {
            total: count,
            limit: pageOptions.limit,
            totalPages: Math.ceil(count / pageOptions.limit),
            currentPage: pageOptions.page,
        };
        return (0, general_1.jsonAll)(res, 200, dataWithImages, meta);
    }
    catch (error) {
        Logging_1.default.error(`Error fetching content: ${error}`);
        next(error);
    }
});
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
const updateContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const contentId = req.params.contentId;
        let content = yield content_1.default.findById(contentId);
        //If Content not found
        if (!content) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }
        const targetImageBinary = Buffer.from(body.targetImage, 'base64');
        const contentImageBinary = Buffer.from(body.contentImage, 'base64');
        let savedContent = yield content_1.default.findOneAndUpdate({ _id: contentId }, {
            targetImage: targetImageBinary,
            contentImage: contentImageBinary,
            imageTargetSrc: body.imageTargetSrc,
            modelPath: body.modelPath,
            modelFile: body.modelFile,
            positionY: body.positionY,
            scaleSet: body.scaleSet,
            size: body.size,
            ref_ver: 1,
        }, { new: true });
        return (0, general_1.jsonOne)(res, 200, savedContent);
    }
    catch (error) {
        next(error);
    }
});
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
const deleteContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const contentId = req.params.contentId;
        let content = yield content_1.default.findById(contentId);
        //If Content not found
        if (!content) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }
        yield content_1.default.findByIdAndDelete(contentId);
        return (0, general_1.jsonOne)(res, 200, { message: 'Content deleted successfully...!' });
    }
    catch (error) {
        next(error);
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * '/api/v1/content/find/{phashId}':
 *  get:
 *     tags:
 *     - Content
 *     summary: Fetch Contents by phashId
 *     parameters:
 *       - in: path
 *         name: phashId
 *         required: true
 *         description: ID of the target to fetch
 *         schema:
 *           type: string
 *           example: 65cafd1a91f0f81fbfd1d499
 *     responses:
 *       200:
 *         description: Content Details
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/ExperienceContent'
 *           example:
 *             "successOrFaliure": "Y"
 *             "meshColor": "0x0000ff"
 *             "imageTargetSrc": "https://finalar.github.io/imageTargets/targets2.mind"
 *             "modelPath": "https://finalar.github.io/models/SurveySet/"
 *             "modelFile": "FoodPackDDFGH.glb"
 *             "progressPhase": "phase 2"
 *             "positionY": "0"
 *             "scaleSet": "0.3"
 *             "size": "11173332"
 *             "ref_ver": 1
 */
//FIND CONTENT DETAILS BY HASH
const findBasedOnTarget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phashId = req.params.phashId;
        const maxHammingDistance = 5; // Set your desired maximum Hamming distance here
        // Fetch all content documents from the database
        let contents = yield content_1.default.find();
        // Filter documents based on the Hamming distance
        let similarContents = contents.filter(content => {
            const currentHash = content.targetImageHash;
            const hammingDistance = calculateHammingDistance(phashId, currentHash);
            return hammingDistance <= maxHammingDistance;
        });
        // If no similar content found, return a 404 response
        if (similarContents.length === 0) {
            return res.status(404).json({ successOrFaliure: 'N', message: 'No similar content found' });
        }
        // Sort similar contents based on Hamming distance
        similarContents.sort((a, b) => {
            const hammingDistanceA = calculateHammingDistance(phashId, a.targetImageHash);
            const hammingDistanceB = calculateHammingDistance(phashId, b.targetImageHash);
            return hammingDistanceA - hammingDistanceB;
        });
        // Extract required data for AR experience from the most similar content document
        const { meshColor, imageTargetSrc, modelPath, modelFile, progressPhase, positionY, scaleSet, size } = similarContents[0].toObject();
        // Create a response object including targetImage and contentImage
        const data = {
            successOrFaliure: 'Y',
            meshColor,
            imageTargetSrc,
            modelPath,
            modelFile,
            progressPhase,
            positionY,
            scaleSet,
            size,
        };
        return (0, general_1.jsonOne)(res, 200, data);
    }
    catch (error) {
        next(error);
    }
});
// Function to calculate Hamming distance between two hexadecimal strings
function calculateHammingDistance(hash1, hash2) {
    let distance = 0;
    const length = Math.min(hash1.length, hash2.length);
    for (let i = 0; i < length; i++) {
        if (hash1[i] !== hash2[i]) {
            distance++;
        }
    }
    return distance;
}
// const findBasedOnTarget = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const phashId = req.params.phashId;
//         // Fetch the specific content document from the database
//         //let content = await Content.findById(phashId);
//         const hammingDistance = Number(req.query.hammingDistance) || 400;
//         //After finalizing the hamming distance use this
//         // const hammingDistance = 200;
//         // Find documents with targetImageHash within the specified hamming distance
//         const content = await Content.find({
//             targetImageHash: {
//                 $regex: `^${phashId.slice(0, phashId.length - hammingDistance)}`,
//             },
//         });
//         // If content is not found, return a 404 response
//         if (!content) {
//             return res.status(404).json({ successOrFaliure: 'N', message: 'Content not found' });
//         }
//         // Extract required data for AR experience from the content document
//         const { meshColor, imageTargetSrc, modelPath, modelFile, progressPhase, positionY, scaleSet, size }= content.toObject();
//         // Create a response object including targetImage and contentImage
//         const data = {
//             successOrFaliure: 'Y',
//             meshColor: meshColor, 
//             imageTargetSrc: imageTargetSrc, 
//             modelPath: modelPath,
//             modelFile: modelFile,
//             progressPhase: progressPhase,
//             positionY: positionY,
//             scaleSet: scaleSet,
//             size: size,
//         };
//         return jsonOne(res, 200, data);
//     } catch (error) {
//         next(error);
//     }
// };
// ANALYZE CONTENT function
function analyzeContent(levels, obj) {
    const { high, mid, low } = obj.content;
    let h_size = 0, h_polyCount = 0, h_animCount = 0, m_size = 0, m_polyCount = 0, m_animCount = 0, l_size = 0, l_polyCount = 0, l_animCount = 0;
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
    Logging_1.default.debug(`High: ${h_size} + ${h_polyCount} + ${h_animCount}`);
    Logging_1.default.debug(`Mid: ${m_size} + ${m_polyCount} + ${m_animCount}`);
    Logging_1.default.debug(`Low: ${l_size} + ${l_polyCount} + ${l_animCount}`);
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
exports.default = {
    createContent, //will include the analytic matrix generating logic
    getContent,
    getAllContent,
    updateContent,
    deleteContent,
    // analyzeContent,
    findBasedOnTarget,
};
//# sourceMappingURL=content.controller.js.map