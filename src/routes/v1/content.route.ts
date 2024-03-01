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

//GET ALL ACTIVE CONTENTS
_router
    .route('/list/active')
    .get(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.getAllActiveContent
    );




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

//Target Update
_router
    .route('/target/:documentId')
    .patch(
        // validate([
        //     emailAddress(),
        //     password('password'),
        //     password('confirmPassword'),
        // ]),
        contentController.updateTarget
    );

//Content data Update
_router
    .route('/data/:documentId')
    .patch(
        // validate([
        //     emailAddress(),
        //     password('password'),
        //     password('confirmPassword'),
        // ]),
        contentController.updateContent
    );

//Content metadata Update
_router
    .route('/metadata/:documentId')
    .patch(
        // validate([
        //     emailAddress(),
        //     password('password'),
        //     password('confirmPassword'),
        // ]),
        contentController.updateMetaData
    );


//UPDATE CONTENT DETAILS
_router.route('/update/:documentId').patch(
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
    contentController.updateAllData
);

//DELETE Content DETAILS BY ID
_router
    .route('/delete/:documentId')
    .delete(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.deleteContent
    );

//GET ALL ACTIVE CONTENT LIST
_router
    .route('/linking/:phashId')
    .get(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.findAllContentsByTarget
    );


//ACTIVATE A CONTENT LINKING TO A PARTICULAR TARGET
_router
    .route('/linking/:phashId')
    .patch(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.updateContentLinking
    );


//ADD CONTENT TO A TARGET DETAILS
_router.route('/addContents/:documentId').patch(
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
    contentController.addLinkingContent
);




//FIND Content DETAILS BY TARGET phashID
_router
    .route('/find/:phashId')
    .get(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.findBasedOnTarget
    );


//FIND Content DETAILS BY TARGET phashID V2
_router
    .route('/findv2/:phashId')
    .get(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.findBasedOnTargetV2
    );

//TARGET LINKING CONTEN LISTNER ENPOINT
_router
    .route('/listner/:phashId')
    .get(
        // validate([authorization()]),
        // auth,
        // permit([RoleType.ADMIN, RoleType.USER]),
        contentController.targetLinkedContentListner
    );

//EXPORT
export const router = _router;
