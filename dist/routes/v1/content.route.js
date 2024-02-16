"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
//USER ROUTES//
const _router = (0, express_1.Router)({
    mergeParams: true,
});
//CONTENT CREATION
_router
    .route('/create')
    .post(
// validate([
//     emailAddress(),
//     password('password'),
//     password('confirmPassword'),
// ]),
controllers_1.contentController.createContent);
//UPDATE CONTENT DETAILS
_router.route('/update/:contentId').patch(
// validate([
//     authorization(),
//     requiredTextField('firstName', 'FirstName', { min: 2, max: 255 }),
//     requiredTextField('lastName', 'LastName', { min: 2, max: 255 }),
//     requiredTextField('dateOfBirth', 'Date Of Birth', {
//         min: 2,
//         max: 255,
//     }),
//     requiredTextField('residence', 'Residence', { min: 2, max: 255 }),
//     requiredTextField('avatar', 'Avatar', { min: 2, max: 255 }),
// ]),
// auth,
// permit([RoleType.ADMIN, RoleType.USER]),
controllers_1.contentController.updateContent);
//GET Content DETAILS BY ID
_router
    .route('/fetch/:contentId')
    .get(
// validate([authorization()]),
// auth,
// permit([RoleType.ADMIN, RoleType.USER]),
controllers_1.contentController.getContent);
//GET ALL CONTENTS
_router
    .route('/fetch')
    .get(
// validate([authorization()]),
// auth,
// permit([RoleType.ADMIN, RoleType.USER]),
controllers_1.contentController.getAllContent);
//EXPORT
exports.router = _router;
//# sourceMappingURL=content.route.js.map