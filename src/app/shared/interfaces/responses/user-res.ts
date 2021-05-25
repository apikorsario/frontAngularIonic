export interface IUserRes {
    userId: string
    firstName: string
    lastName: string
    email: string
    createdDate: string,
    avatar?:string;
    updating?: boolean;
    addingEmployee?: boolean;
    addingOwner?: boolean;
    deletingEmployee?: boolean;
    deletingOwner?: boolean;
}