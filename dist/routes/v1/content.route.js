"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
//USER ROUTES//
const _router = (0, express_1.Router)({
    mergeParams: true,
});
//USER SIGNUP
// _router
//     .route('/sign-up')
//     .post(
//         validate([
//             emailAddress(),
//             password('password'),
//             password('confirmPassword'),
//         ]),
//         userController.createUser
//     );
//USER VERFIY THERE EMAIL
// _router
//     .route('/verify-email')
//     .post(
//         validate([
//             emailAddress(),
//             requiredTextField('otp', 'Otp', { min: 2, max: 255 }),
//         ]),
//         userController.verifyEmail
//     );
//UPDATE USER DETAILS
// _router.route('/update/:userId').patch(
//     validate([
//         authorization(),
//         requiredTextField('firstName', 'FirstName', { min: 2, max: 255 }),
//         requiredTextField('lastName', 'LastName', { min: 2, max: 255 }),
//         requiredTextField('dateOfBirth', 'Date Of Birth', {
//             min: 2,
//             max: 255,
//         }),
//         requiredTextField('residence', 'Residence', { min: 2, max: 255 }),
//         requiredTextField('avatar', 'Avatar', { min: 2, max: 255 }),
//     ]),
//     auth,
//     permit([RoleType.ADMIN, RoleType.USER]),
//     userController.updateUser
// );
//GET USER DETAILS BY ID
// _router
//     .route('/fetch/:userId')
//     .get(
//         validate([authorization()]),
//         auth,
//         permit([RoleType.ADMIN, RoleType.USER]),
//         userController.getUser
//     );
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