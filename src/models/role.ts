export type RoleList = {
    roleID:string;
    roleName: string;
}

export type RoleListResponse = {
    data:RoleList[];
    dataLength: number;
}

export type RoleResponse = {
    roleID:string;
    roleName: string;
    deleted:boolean
}