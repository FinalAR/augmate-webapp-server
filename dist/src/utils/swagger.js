"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const package_json_1 = require("../../package.json");
const Logging_1 = __importDefault(require("../library/Logging"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Augmate Backend REST API Docs",
            version: package_json_1.version,
        },
        components: {
        //   securitySchemes: {
        //     bearerAuth: {
        //       type: "http",
        //       scheme: "bearer",
        //       bearerFormat: "JWT",
        //     },
        //   },
        },
        // security: [
        //   {
        //     bearerAuth: [],
        //   },
        // ],
    },
    apis: ["./src/routes/v1/*.ts", "./src/controllers/*.ts", "./src/models/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    // Swagger page
    app.use("/sawgger-docs-ext", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Docs in JSON format
    app.get("/swag-docs-ext.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    Logging_1.default.info(`Docs available at http://localhost:${port}/docs`);
}
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.js.map