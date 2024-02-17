import { Router } from 'express';
// import { authorization, emailAddress } from '../../validators/authValidator';
// import validate from '../../middlewares/validationMiddleware';
// import auth from '../../middlewares/authMiddleware';
// import permit from '../../middlewares/permissionMiddleware';
// import { password } from '../../validators/userValidator';
// import { requiredTextField } from '../../validators/commonValidator';
import { contentType } from '../../utils/enums';
import { contentController } from '../../controllers';

//USER ROUTES//
const _router: Router = Router({
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
        contentController.createContent
    );


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
    contentController.updateContent
);

//GET Content DETAILS BY ID
_router
    .route('/fetch/:contentId')
    .get(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.getContent
    );

//GET ALL CONTENTS
_router
    .route('/fetch')
    .get(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.getAllContent
    );


//DELETE Content DETAILS BY ID
_router
    .route('/delete/:contentId')
    .delete(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.deleteContent
    );
//EXPORT
export const router = _router;
