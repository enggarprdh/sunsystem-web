export type Role = {
    roleID:string;
    roleName: string | '';
    deleted: boolean | null;
}

export type RoleListResponse = {
    data:Role[];
    dataLength: number;
}

export type RoleResponse = {
    data:Role;
    
}

export type RoleCreateUpdateRequest = {
    roleName: string;
}