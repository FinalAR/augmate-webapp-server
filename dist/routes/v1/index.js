"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// import { router as Role } from './role.route';
// import { router as UserRouter } from './user.route';
// import { router as AuthRouter } from './auth.route';
const content_route_1 = require("./content.route");
const _router = (0, express_1.Router)({
    mergeParams: true,
});
//DEFINE API VERSION
_router.use(function (req, res, next) {
    res.setHeader('Api-Version', 'v1');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});
// HEALTHCHECK
_router.route('/v1/health-check').get(function (req, res) {
    return res.status(200).json({ healthy: true, version: 'v1' });
});
//EXPORT ROUTES WITH BASEPATH
//USER AUTHENTICATION ROUTES
// _router.use('/v1/role', Role);
// _router.use('/v1/user', UserRouter);
// _router.use('/v1/auth', AuthRouter);
//CONTENT MANAGEMENT ROUTES
_router.use('/v1/content', content_route_1.router);
exports.router = _router;
//# sourceMappingURL=index.js.map