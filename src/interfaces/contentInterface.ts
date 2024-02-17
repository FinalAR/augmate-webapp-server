export interface IContent {
    targetImage: string; // Base64 encoded string
    contentImage: string; // Base64 encoded string
    meshColor: string;
    imageTargetSrc: string;
    modelPath: string;
    modelFile: string;
    progressPhase: string;
    positionY: string;
    scaleSet: string;
    size: string;
    // createdDate?: string; // Assuming the date is represented as a string
    // lastUpdatedDate?: string; // Assuming the date is represented as a string
    ref_ver: number;
}