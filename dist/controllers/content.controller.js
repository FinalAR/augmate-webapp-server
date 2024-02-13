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
//CREATE A CONTENT
const createContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageTargetSrc, modelPath, modelFile, positionY, scaleSet, size } = req.body;
        Logging_1.default.debug(`Request Body = ${req.body}`);
        const currentTimestamp = new Date().toISOString();
        //CRETA NEW USRE
        let contentData = new content_1.default({
            imageTargetSrc,
            modelPath,
            modelFile,
            positionY,
            scaleSet,
            size,
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
//EXPORT
exports.default = {
    createContent,
    getContent,
    getAllContent,
    updateContent,
    // deleteContent,
    // analyzeContent,
    // findBasedOnTarget,
};
//# sourceMappingURL=content.controller.js.map