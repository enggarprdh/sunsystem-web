export type RoleList = {
    roleID:string;
    roleName: string;
}

export type RoleListResponse = {
    data:RoleList[];
    dataLength: number;
}