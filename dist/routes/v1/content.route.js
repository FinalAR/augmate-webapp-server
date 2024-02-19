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
//ADD CONTENT TO A TARGET DETAILS
_router.route('/update/:contentId//addContents').patch(
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
controllers_1.contentController.addLinkingContent);
//GET Content DETAILS BY ID
_router
    .route('/fetch/:contentId')
    .get(
// validate([authorization()]),
// auth,
// permit([RoleType.ADMIN, RoleType.USER]),
controllers_1.contentController.getContent);
//GET ALL ACTIVE CONTENTS
_router
    .route('/list/active')
    .get(
// validate([authorization()]),
// auth,
// permit([RoleType.ADMIN, RoleType.USER]),
controllers_1.contentController.getAllActiveContent);
//GET ALL CONTENTS
_router
    .route('/fetch')
    .get(
// validate([authorization()]),
// auth,
// permit([RoleType.ADMIN, RoleType.USER]),
controllers_1.contentController.getAllContent);
//DELETE Content DETAILS BY ID
_router
    .route('/delete/:contentId')
    .delete(
// validate([authorization()]),
// auth,
// permit([RoleType.ADMIN, RoleType.USER]),
controllers_1.contentController.deleteContent);
//FIND Content DETAILS BY TARGET phashID
_router
    .route('/find/:phashId')
    .get(
// validate([authorization()]),
// auth,
// permit([RoleType.ADMIN, RoleType.USER]),
controllers_1.contentController.findBasedOnTarget);
//FIND Content DETAILS BY TARGET phashID V2
_router
    .route('/findv2/:phashId')
    .get(
// validate([authorization()]),
// auth,
// permit([RoleType.ADMIN, RoleType.USER]),
controllers_1.contentController.findBasedOnTargetV2);
//EXPORT
exports.router = _router;
//# sourceMappingURL=content.route.js.map