// import mongoose, { Document, Schema } from 'mongoose';
// import { IRole } from '../interfaces';

// //EXPORT INTERFACE WITH MONGOOSE DOCUMENT
// export interface IRoleModel extends IRole, Document {}

// //DEFINE ROLE SCHEMA
// const RoleSchema: Schema = new Schema(
//     {
//         name: {
//             type: String,
//             required: [true, 'role is required'],
//         },
//     },
//     { timestamps: true }
// );

// //EXPORT
// export default mongoose.model<IRoleModel>('Role', RoleSchema);

import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Role document
export interface IRole extends Document {
    // Define the properties of a Role document here
    name: string;
    // Add other properties as needed
}

// Define the schema for the Role collection
const RoleSchema: Schema = new Schema({
    name: { type: String, required: true },
    // Define other properties here
});

// Define and export the Role model
export default mongoose.model<IRole>('Role', RoleSchema, 'Role');
