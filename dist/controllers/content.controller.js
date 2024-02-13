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
const general_1 = require("../utils/general");
const Logging_1 = __importDefault(require("../library/Logging"));
const content_1 = __importDefault(require("../models/content"));
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
        let contentnew = yield content_1.default.find()
            .populate('meshColor')
            .limit(pageOptions.limit * 1)
            .skip((pageOptions.page - 1) * pageOptions.limit)
            .sort({ createdAt: -1 });
        Logging_1.default.debug(`First Query = ${contentnew}`);
        //CREATE PAGINATION
        const meta = {
            total: count,
            limit: pageOptions.limit,
            totalPages: Math.ceil(count / pageOptions.limit),
            currentPage: pageOptions.page,
        };
        return (0, general_1.jsonAll)(res, 200, contentnew, meta);
    }
    catch (error) {
        Logging_1.default.error(`Error fetching content: ${error}`);
        next(error);
    }
});
//EXPORT
exports.default = {
    // createContents,
    // getContent,
    getAllContent,
    // updateContent,
};
//# sourceMappingURL=content.controller.js.map