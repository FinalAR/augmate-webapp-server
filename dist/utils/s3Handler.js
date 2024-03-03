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
exports.generateUploadURL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const region = process.env.S3_AWS_REGION;
const bucketName = process.env.BUCKET;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const s3BaseUrl = `https://${bucketName}.${region}.amazonaws.com\/`;
const s3 = new s3_1.default({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});
function generateUploadURL() {
    return __awaiter(this, void 0, void 0, function* () {
        // Generate a timestamp
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        // Rename the file with the timestamp
        const renamedFileName = `${timestamp}_model`;
        const params = {
            Bucket: bucketName,
            Key: renamedFileName,
            Expires: 90
        };
        const uploadURL = yield s3.getSignedUrlPromise('putObject', params);
        if (uploadURL) {
            const response = {
                uploadUrl: uploadURL,
                location: s3BaseUrl + renamedFileName
            };
            return response;
        }
    });
}
exports.generateUploadURL = generateUploadURL;
//# sourceMappingURL=s3Handler.js.map