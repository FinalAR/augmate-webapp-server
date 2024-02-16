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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpError_1 = __importDefault(require("../utils/httpError"));
const general_1 = require("../utils/general");
const Logging_1 = __importDefault(require("../library/Logging"));
const content_1 = __importDefault(require("../models/content"));
/**
 * @openapi
 * /api/v1/content/create:
 *  post:
 *     tags:
 *     - Content
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
//CREATE A CONTENT
const createContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageTargetSrc, modelPath, modelFile, positionY, scaleSet, size } = req.body;
        Logging_1.default.debug(`Request Body = ${req.body}`);
        //function generate analytix matrix
        //analyzeContent()
        const currentTimestamp = new Date().toISOString();
        //CRETA NEW USRE
        let contentData = new content_1.default({
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
//GET CONTENT DETAILS BY ID
const getContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.params.contentId;
        let data = yield content_1.default.findById(contentId);
        return (0, general_1.jsonOne)(res, 200, data);
    }
    catch (error) {
        next(error);
    }
});
/**
 * @openapi
 * '/api/v1/content/fetch':
 *  get:
 *     tags:
 *     - Content
 *     summary: Fetch All Contents
 *     responses:
 *       200:
 *         description: Product List
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/ContentResponse'
 *           example:
 *             "_id": "65cafd1a91f0f81fbfd1d499"
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
        //CREATE PAGINATION
        const meta = {
            total: count,
            limit: pageOptions.limit,
            totalPages: Math.ceil(count / pageOptions.limit),
            currentPage: pageOptions.page,
        };
        return (0, general_1.jsonAll)(res, 200, contents, meta);
    }
    catch (error) {
        Logging_1.default.error(`Error fetching content: ${error}`);
        next(error);
    }
});
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
        let savedContent = yield content_1.default.findOneAndUpdate({ _id: contentId }, {
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
        return (0, general_1.jsonOne)(res, 200, { message: 'Content deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
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
    // findBasedOnTarget,
};
//# sourceMappingURL=content.controller.js.map