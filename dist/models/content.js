"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
//DEFINE USER SCHEMA
const ContentSchema = new mongoose_1.Schema({
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
        required: true,
        unique: true,
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
    createdDate: {
        type: String,
        required: true,
        default: '2000-01-12T08:30:00.000Z',
    },
    lastUpdatedDate: {
        type: String,
        required: true,
        default: '2000-01-12T08:30:00.000Z',
    },
    ref_ver: {
        type: Number,
        required: true,
        default: '1',
    },
}, { timestamps: true });
//EXPORT
exports.default = mongoose_1.default.model("content", ContentSchema);
//# sourceMappingURL=content.js.map