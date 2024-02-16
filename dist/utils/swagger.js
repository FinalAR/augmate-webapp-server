"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const Logging_1 = __importDefault(require("../library/Logging"));
// CDN CSS
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Augmate Backend REST API Docs",
            version: "1.0.0",
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
    apis: ["./dist/routes/v1/*.js", "./dist/controllers/*.js", "./dist/models/*.js"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    // Swagger page
    app.use("/sawgger-docs-ext", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, { customCssUrl: CSS_URL }));
    // Docs in JSON format
    app.get("/swag-docs-ext.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    Logging_1.default.info(`Docs available at http://localhost:${port}/sawgger-docs-ext`);
}
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.js.map