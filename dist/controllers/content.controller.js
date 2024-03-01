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
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * '/api/v1/content/fetch/{documentId}':
 *  get:
 *     tags:
 *     - CONTENT - GENREAL RETRIVALS
 *     summary: Fetch Contents by Id
 *     parameters:
 *       - in: path
 *         name: documentId
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
 *             "analysis" : Object
 *             "contentPath" : "https://finalar.github.io/models/SurveySet/FoodPackD.glb"
 *             "description" : "First Target model link"
 *             "flag" : true
 *             "targetpHash" : "fbhfdgfggffg"
 *             "contentImage": "https://finalar.github.io/content/FoodPack.png"
 *             "targetImage" : "https://finalar.github.io/target/FoodPack.jpg"
 */
//GET CONTENT DETAILS BY ID
const getContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentId = req.params.documentId;
        // Fetch the content document from the database
        let content = yield content_1.default.findById(documentId);
        // If content is not found, return a 404 response
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        Logging_1.default.debug(`Query Results = ${content}`);
        return (0, general_1.jsonOne)(res, 200, content);
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
 *     - CONTENT - GENREAL RETRIVALS
 *     summary: Fetch All Contents
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of the page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of Entries per page
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
 *                 "analysis" : Object
 *                 "contentPath" : "https://finalar.github.io/models/SurveySet/FoodPackD.glb"
 *                 "description" : "First Target model link"
 *                 "flag" : true
 *                 "targetpHash" : "fbhfdgfggffg"
 *                 "contentImage": "https://finalar.github.io/content/FoodPack.png"
 *                 "targetImage" : "https://finalar.github.io/target/FoodPack.jpg"
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
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * '/api/v1/content/list/active':
 *  get:
 *     tags:
 *     - CONTENT - GENREAL RETRIVALS
 *     summary: Fetch All ActiveContents
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of the page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of Entries per page
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
 *                 "analysis" : Object
 *                 "contentPath" : "https://finalar.github.io/models/SurveySet/FoodPackD.glb"
 *                 "description" : "First Target model link"
 *                 "targetpHash" : "fbhfdgfggffg"
 *                 "contentImage": "https://finalar.github.io/content/FoodPack.png"
 *                 "targetImage" : "https://finalar.github.io/target/FoodPack.jpg"
 *             meta:
 *               total: 8
 *               limit: 10
 *               totalPages: 1
 *               currentPage: 1
 */
//GET ALL ACTIVE CONTENT LIST
const getAllActiveContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pageOptions = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
        };
        const count = yield content_1.default.countDocuments({ "flag": true });
        Logging_1.default.debug(`Number Of Documents = ${count}`);
        //GETING DATA FROM TABLE
        let contents = yield content_1.default.find({ flag: true })
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
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/content/create:
 *  post:
 *     tags:
 *     - CONTENT - CREATION AND LINKING DATA OPERATION
 *     summary: Create a new Content
 *     requestBody:
 *       description: Creation Content Strucutre
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       201:
 *         description: Content Details
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Content'
 *           example:
 *             "meshColor": "0x0000ff"
 *             "imageTargetSrc": "https://finalar.github.io/imageTargets/target_datestamp_timestamp.mind"
 *             "modelPath": "https://finalar.github.io/models/SurveySet/"
 *             "modelFile": "mode_dateStamp_timeStamp.glb"
 *             "positionY": "0"
 *             "scaleSet": "0.3"
 *             "size": "11173332"
 *             "ref_ver": 1
 *             "analysis" : Object
 *             "contentPath" : "https://finalar.github.io/models/SurveySet/FoodPackD.glb"
 *             "description" : "First Target model link"
 *             "flag" : true
 *             "targetpHash" : "fbhfdgfggffg"
 *             "contentImage": "https://finalar.github.io/content/FoodPack.png"
 *             "targetImage" : "https://finalar.github.io/target/FoodPack.jpg"
 */
//CREATE A CONTENT
const createContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { targetpHash, targetImage, contentImage, imageTargetSrc, contentPath, modelPath, modelFile, positionY, scaleSet, size } = req.body;
        Logging_1.default.debug(`Request Body = ${req.body}`);
        //function generate analytix matrix
        //analyzeContent()
        // const targetImageBinary = Buffer.from(targetImage, 'base64');
        // const contentImageBinary = Buffer.from(contentImage, 'base64');
        const currentTimestamp = new Date().toISOString();
        //CRETA NEW CONTENT MAPPING
        let contentData = new content_1.default({
            targetpHash,
            targetImage,
            contentImage,
            contentPath,
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
            flag: true
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
 * /api/v1/content/target/{documentId}:
 *  put:
  *     tags:
 *     - CONTENT - CREATION AND LINKING DATA OPERATION
 *     summary: Update Contents by Id
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         description: ID of the content stored document to update
 *         schema:
 *           type: string
 *           example: 65cafd1a91f0f81fbfd1d499
 *     requestBody:
 *       description: Updating Target Data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       200:
 *         description: Content Details
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Content'
 *           example:
 *             "meshColor": "0x0000ff"
 *             "imageTargetSrc": "https://finalar.github.io/imageTargets/target_datestamp_timestamp.mind"
 *             "modelPath": "https://finalar.github.io/models/SurveySet/"
 *             "modelFile": "mode_dateStamp_timeStamp.glb"
 *             "positionY": "0"
 *             "scaleSet": "0.3"
 *             "size": "11173332"
 *             "ref_ver": 1
 *             "analysis" : Object
 *             "contentPath" : "https://finalar.github.io/models/SurveySet/FoodPackD.glb"
 *             "description" : "First Target model link"
 *             "flag" : true
 *             "targetpHash" : "fbhfdgfggffg"
 *             "contentImage": "https://finalar.github.io/content/FoodPack.png"
 *             "targetImage" : "https://finalar.github.io/target/FoodPack.jpg"
 */
//UPDATE CONTENT DETAILS WITH ID
const updateTarget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const documentId = req.params.documentId;
        let content = yield content_1.default.findById(documentId);
        //If Content not found
        if (!content) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }
        let savedContent = yield content_1.default.findOneAndUpdate({ _id: documentId }, {
            imageTargetSrc: body.imageTargetSrc,
            targetpHash: body.targetpHash,
            targetImage: body.targetImage,
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
 * /api/v1/content/data/{documentId}:
 *  put:
  *     tags:
 *     - CONTENT - CREATION AND LINKING DATA OPERATION
 *     summary: Update Contents by Id
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         description: ID of the content stored document to update
 *         schema:
 *           type: string
 *           example: 65cafd1a91f0f81fbfd1d499
 *     requestBody:
 *       description: Updating Content Data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       200:
 *         description: Content Details
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Content'
 *           example:
 *             "meshColor": "0x0000ff"
 *             "imageTargetSrc": "https://finalar.github.io/imageTargets/target_datestamp_timestamp.mind"
 *             "modelPath": "https://finalar.github.io/models/SurveySet/"
 *             "modelFile": "mode_dateStamp_timeStamp.glb"
 *             "positionY": "0"
 *             "scaleSet": "0.3"
 *             "size": "11173332"
 *             "ref_ver": 1
 *             "analysis" : Object
 *             "contentPath" : "https://finalar.github.io/models/SurveySet/FoodPackD.glb"
 *             "description" : "First Target model link"
 *             "flag" : true
 *             "targetpHash" : "fbhfdgfggffg"
 *             "contentImage": "https://finalar.github.io/content/FoodPack.png"
 *             "targetImage" : "https://finalar.github.io/target/FoodPack.jpg"
 */
//UPDATE CONTENT DETAILS WITH ID
const updateContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const documentId = req.params.documentId;
        let content = yield content_1.default.findById(documentId);
        //If Content not found
        if (!content) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }
        let newRefVer = content.ref_ver + 1;
        let savedContent = yield content_1.default.findOneAndUpdate({ _id: documentId }, {
            contentImage: body.contentImage,
            contentPath: body.contentPath,
            analysis: body.analysis,
            size: body.size,
            ref_ver: newRefVer,
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
 * /api/v1/content/metadata/{documentId}:
 *  put:
  *     tags:
 *     - CONTENT - CREATION AND LINKING DATA OPERATION
 *     summary: Update Contents by Id
 *     parameters:
 *       - in: path
 *         name: documentId
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
 *             "targetImage": "url"
 *             "contentImage": "url"
 *             "meshColor": "0x0000ff"
 *             "imageTargetSrc": "https://finalar.github.io/imageTargets/target_datestamp_timestamp.mind"
 *             "modelPath": "https://finalar.github.io/models/SurveySet/"
 *             "modelFile": "mode_dateStamp_timeStamp.glb"
 *             "positionY": "0"
 *             "scaleSet": "0.3"
 *             "size": "11173332"
 *             "ref_ver": 1
 */
//UPDATE CONTENT META DETAILS WITH ID
const updateMetaData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const documentId = req.params.documentId;
        let content = yield content_1.default.findById(documentId);
        //If Content not found
        if (!content) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }
        let savedContent = yield content_1.default.findOneAndUpdate({ _id: documentId }, {
            positionY: body.positionY,
            scaleSet: body.scaleSet,
            description: body.description,
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
 * /api/v1/content/update/{documentId}:
 *  put:
  *     tags:
 *     - CONTENT - CREATION AND LINKING DATA OPERATION
 *     summary: Update Contents by Id
 *     parameters:
 *       - in: path
 *         name: documentId
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
const updateAllData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const documentId = req.params.documentId;
        let content = yield content_1.default.findById(documentId);
        //If Content not found
        if (!content) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }
        let newRefVer = content.ref_ver + 1;
        let savedContent = yield content_1.default.findOneAndUpdate({ _id: documentId }, {
            targetImage: body.targetImage,
            contentImage: body.contentImage,
            imageTargetSrc: body.imageTargetSrc,
            modelPath: body.modelPath,
            modelFile: body.modelFile,
            positionY: body.positionY,
            scaleSet: body.scaleSet,
            size: body.size,
            ref_ver: newRefVer,
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
 * /api/v1/content/delete/{documentId}:
 *  delete:
  *     tags:
 *     - CONTENT - CREATION AND LINKING DATA OPERATION
 *     summary: Delete Contents by Id
 *     parameters:
 *       - in: path
 *         name: documentId
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
        const documentId = req.params.documentId;
        let content = yield content_1.default.findById(documentId);
        //If Content not found
        if (!content) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }
        yield content_1.default.findByIdAndDelete(documentId);
        return (0, general_1.jsonOne)(res, 200, { message: 'Content deleted successfully...!' });
    }
    catch (error) {
        next(error);
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * '/api/v1/content/linking/{phashId}':
 *  get:
 *     tags:
 *     - CONTENT LINKIN
 *     summary: Fetch All Contents by Target
 *     parameters:
 *       - in: path
 *         name: phashId
 *         required: true
 *         description: Phash ID of the Target to find all Contents
 *         schema:
 *           type: string
 *           example: fbhfdgfggffg
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
 *                 "analysis" : Object
 *                 "flag" : true
 *                 "contentPath" : "https://finalar.github.io/models/SurveySet/FoodPackD.glb"
 *                 "description" : "First Target model link"
 *                 "targetpHash" : "fbhfdgfggffg"
 *                 "contentImage": "https://finalar.github.io/content/FoodPack.png"
 *                 "targetImage" : "https://finalar.github.io/target/FoodPack.jpg"
 *             meta:
 *               total: 8
 *               limit: 10
 *               totalPages: 1
 *               currentPage: 1
 */
//GET ALL ACTIVE CONTENT LIST
const findAllContentsByTarget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pageOptions = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
        };
        const phashId = req.params.phashId;
        const count = yield content_1.default.countDocuments({ "targetpHash": phashId });
        Logging_1.default.debug(`Number Of Documents = ${count}`);
        //GETING DATA FROM TABLE
        let contents = yield content_1.default.find({ "targetpHash": phashId })
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
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/content/linking/{phashId}:
 *  put:
  *     tags:
 *     - CONTENT LINKIN
 *     summary: Update Content Linking by Target
 *     parameters:
 *       - in: path
 *         name: phashId
 *         required: true
 *         description: ID of the content to update
 *         schema:
 *           type: string
 *           example: fbhfdgfggffg
 *       - in: query
 *         name: documentId
 *         required: true
 *         schema:
 *          type: string
 *         description: Activation Content
 *       - in: query
 *         name: flag
 *         schema:
 *          type: string
 *         description: Activiation Flag
 *     responses:
 *       200:
 *         description: Content Details
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
 *             "analysis" : Object
 *             "contentPath" : "https://finalar.github.io/models/SurveySet/FoodPackD.glb"
 *             "description" : "First Target model link"
 *             "flag" : true
 *             "targetpHash" : "fbhfdgfggffg"
 *             "contentImage": "https://finalar.github.io/content/FoodPack.png"
 *             "targetImage" : "https://finalar.github.io/target/FoodPack.jpg"
 */
//ACTIVATE A CONTENT LINKING TO A PARTICULAR TARGET
const updateContentLinking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Logging_1.default.debug(`Request Body = ${req.body}`);
        const phashId = req.params.phashId;
        const actvieDocId = req.query.documentId;
        const flag = req.query.flag == 'true' ? true : false;
        let contents = yield content_1.default.find({ "targetpHash": phashId });
        //If Content not found
        if (!contents) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }
        // Find and update all documents with matching targetpHash
        let updatedContents = yield content_1.default.updateMany({ targetpHash: phashId }, { flag: false });
        //If Content not found
        if (!updatedContents) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Update Operation Failed.',
                code: 400,
            });
        }
        let savedContent = yield content_1.default.findOneAndUpdate({ _id: actvieDocId }, {
            flag: true,
        }, { new: true });
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
 * /api/v1/content/addContents/{documentId}:
 *  put:
  *     tags:
 *     - CONTENT - CREATION AND LINKING DATA OPERATION
 *     summary: Adding more Contents by Id to the same target
 *     parameters:
 *       - in: path
 *         name: documentId
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
 *             "targetpHash": "phashvalue"
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
//ADD ANOTHER CONTENT DETAILS WITH ID TO SAME TARGET
const addLinkingContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Logging_1.default.debug(`Request Body = ${req.body}`);
        const { contentImage, modelPath, modelFile, contentPath, positionY, scaleSet, size } = req.body;
        const documentId = req.params.documentId;
        let content = yield content_1.default.findById(documentId);
        //If Content not found
        if (!content) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Content Not Found.',
                code: 400,
            });
        }
        //function generate analytix matrix
        //analyzeContent()
        // Extract targetImage and contentImage from the content document
        const { targetpHash, targetImage, imageTargetSrc } = content.toObject();
        //CREATE NEW CONTENT MAPPING
        let contentData = new content_1.default({
            targetpHash,
            targetImage,
            imageTargetSrc,
            contentImage,
            contentPath,
            modelPath,
            modelFile,
            positionY,
            scaleSet,
            size,
            // generate analytic Matrix should also included or create a seperate collection and create a related document to it
            // createdDate: currentTimestamp,
            // lastUpdatedDate: currentTimestamp,
            ref_ver: 1,
            flag: false
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
 * '/api/v1/content/find/{phashId}':
 *  get:
 *     tags:
 *     - AR EXPERIENCE
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
        const maxHammingDistance = 30; // Set your desired maximum Hamming distance here
        const count = yield content_1.default.countDocuments({ "flag": true });
        Logging_1.default.debug(`Number Of Documents = ${count}`);
        // Fetch all active content documents from the database
        let contents = yield content_1.default.find({ flag: true });
        // Logging.debug(`Active content details: ${JSON.stringify(contents)}`);
        // Filter documents based on the Hamming distance
        let similarContents = contents.filter(content => {
            Logging_1.default.debug(`Taken Contents ${JSON.stringify(content)}`);
            const currentHash = content.targetpHash;
            Logging_1.default.debug(`content TargetpHash ${content.targetpHash}`);
            Logging_1.default.debug(`Hamming distance for ${phashId} and ${currentHash}`);
            const hammingDistance = calculateHammingDistance(phashId, currentHash);
            Logging_1.default.debug(`Hamming distance for ${phashId} and ${currentHash}: ${hammingDistance}`);
            return hammingDistance <= maxHammingDistance;
        });
        Logging_1.default.debug(`Similar content details: ${JSON.stringify(similarContents)}`);
        // If no similar content found, return a 404 response
        if (similarContents.length === 0) {
            return res.status(404).json({ successOrFaliure: 'N', message: 'No similar content found' });
        }
        // Sort similar contents based on Hamming distance
        similarContents.sort((a, b) => {
            const hammingDistanceA = calculateHammingDistance(phashId, a.targetpHash);
            const hammingDistanceB = calculateHammingDistance(phashId, b.targetpHash);
            Logging_1.default.debug(`Hamming distance for ${phashId} and ${a.targetpHash}: ${hammingDistanceA}`);
            Logging_1.default.debug(`Hamming distance for ${phashId} and ${b.targetpHash}: ${hammingDistanceB}`);
            return hammingDistanceA - hammingDistanceB;
        });
        // Extract required data for AR experience from the most similar content document
        const { _id, targetpHash, imageTargetSrc, contentPath, positionY, scaleSet, size, ref_ver } = similarContents[0].toObject();
        // Create a response object including targetImage and contentImage
        const data = {
            successOrFaliure: 'Y',
            documentId: _id,
            targetpHash,
            imageTargetSrc,
            contentPath,
            positionY,
            scaleSet,
            size,
            ref_ver
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
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * '/api/v1/content/findv2/{phashId}':
 *  get:
 *     tags:
 *     - AR EXPERIENCE
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
const findBasedOnTargetV2 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phashId = req.params.phashId;
        // Fetch the specific content document from the database
        //let content = await Content.findById(phashId);
        const hammingDistance = Number(req.query.hammingDistance) || 0;
        //After finalizing the hamming distance use this
        // const hammingDistance = 200;
        // Find documents with targetImageHash within the specified hamming distance
        const content = yield content_1.default.find({
            targetpHash: {
                $regex: `^${phashId.slice(0, phashId.length - hammingDistance)}`,
            },
            flag: true
        });
        // If content is not found, return a 404 response
        if (content.length === 0) {
            return res.status(404).json({ successOrFaliure: 'N', message: 'Content not found' });
        }
        // Extract required data for AR experience from the content document
        const { _id, imageTargetSrc, contentPath, positionY, scaleSet, size, ref_ver, targetpHash } = content[0].toObject();
        // Create a response object including targetImage and contentImage
        const data = {
            successOrFaliure: 'Y',
            documentId: _id,
            imageTargetSrc,
            contentPath,
            positionY,
            scaleSet,
            size,
            targetpHash,
            ref_ver
        };
        return (0, general_1.jsonOne)(res, 200, data);
    }
    catch (error) {
        next(error);
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/content/listner/{phashId}:
 *  get:
  *     tags:
 *     - AR EXPERIENCE
 *     summary: Listing to the AR linked content to the target
 *     parameters:
 *       - in: path
 *         name: phashId
 *         required: true
 *         description: ID of the content to update
 *         schema:
 *           type: string
 *           example: fbhfdgfggffg
 *       - in: query
 *         name: documentId
 *         required: true
 *         schema:
 *          type: string
 *         description: Current Document
 *       - in: query
 *         name: ref_ver
 *         required: true
 *         schema:
 *          type: string
 *         description: Current Ref_ver
 *     responses:
 *       200:
 *         description: Content Details
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
 *             "analysis" : Object
 *             "contentPath" : "https://finalar.github.io/models/SurveySet/FoodPackD.glb"
 *             "description" : "First Target model link"
 *             "flag" : true
 *             "targetpHash" : "fbhfdgfggffg"
 *             "contentImage": "https://finalar.github.io/content/FoodPack.png"
 *             "targetImage" : "https://finalar.github.io/target/FoodPack.jpg"
 */
//TARGET LINKING CONTEN LISTNER ENPOINT
const targetLinkedContentListner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Logging_1.default.debug(`Request Body = ${req.body}`);
        const phashId = req.params.phashId;
        const activeDocId = req.query.documentId;
        const currentRefVer = Number(req.query.ref_ver) || 1;
        // Find active content based on phashId and flag
        let activeContent = yield content_1.default.findOne({ "targetpHash": phashId, "flag": true });
        // If active content not found
        if (!activeContent) {
            throw new httpError_1.default({
                title: 'bad_request',
                detail: 'Active Content Not Found.',
                code: 400,
            });
        }
        let isActiveContent = false;
        if (activeContent._id.toString() === activeDocId) { // Check if the activeDocId matches
            const { targetpHash, ref_ver, flag } = activeContent.toObject();
            if (targetpHash === phashId && ref_ver === currentRefVer && flag === true) {
                isActiveContent = true;
            }
        }
        if (!isActiveContent) {
            // Extract required data for AR experience from the content document
            const { _id, imageTargetSrc, contentPath, positionY, scaleSet, size, ref_ver, targetpHash } = activeContent.toObject();
            // Create a response object including targetImage and contentImage
            const data = {
                documentId: _id,
                imageTargetSrc,
                contentPath,
                positionY,
                scaleSet,
                size,
                targetpHash,
                ref_ver
            };
            // If there's a change, return changed document ID and document
            return (0, general_1.jsonOne)(res, 201, {
                changedDocumentId: activeContent._id,
                document: data,
                updateFlag: 'Y'
            });
        }
        // If there's no change, return the active document
        return (0, general_1.jsonOne)(res, 200, { message: "You are upto-date", updateFlag: "N" });
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
//EXPORT
exports.default = {
    // Tag - CONTENT - GENREAL RETRIVALS
    getContent,
    getAllContent,
    getAllActiveContent,
    // Tag - CONTENT - CREATION AND LINKING DATA OPERATION
    createContent, //will include the analytic matrix generating logic
    updateTarget,
    updateContent,
    updateMetaData,
    updateAllData,
    deleteContent,
    // Tag - CONTENT LINKIN
    findAllContentsByTarget,
    updateContentLinking,
    addLinkingContent,
    // Tag - AR EXPERIENCE
    findBasedOnTarget,
    findBasedOnTargetV2,
    targetLinkedContentListner,
};
//# sourceMappingURL=content.controller.js.map