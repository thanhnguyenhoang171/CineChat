export interface UserResponse {
    _id: string;
    firstName: string;
    lastName: string;
    // email?: string; //optional
    picture?: string; 
    // role: {
    //     _id: string;
    //     name: string;
    // };
    // permissions: {
    //     _id: string;
    //     name: string;
    //     apiPath: string;
    //     module: string;
    // }
}