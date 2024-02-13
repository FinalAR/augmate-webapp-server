import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/httpError';
import { jsonOne, jsonAll } from '../utils/general';
import Logging from '../library/Logging';
import Content, { IContnetModel } from '../models/content';

//CREATE A CONTENT
const createContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { imageTargetSrc, modelPath, modelFile, positionY, scaleSet, size } = req.body;


        Logging.debug(`Request Body = ${req.body}`);

        const currentTimestamp = new Date().toISOString();
        //CRETA NEW USRE
        let contentData = new Content({
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
//EXPORT
export default {
    createContent,
    getContent,
    getAllContent,
    updateContent,
    // deleteContent,
    // analyzeContent,
    // findBasedOnTarget,
};