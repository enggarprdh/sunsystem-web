import type { RoleCreateUpdateRequest, Role, RoleListResponse, RoleResponse } from "@/models/role";
import { apiCaller } from "./_apiCaller";


interface ApiRoles {
    apiGetRoleList: (page:number, row:number) => Promise<RoleListResponse>;
    apiCreateRole: (data: RoleCreateUpdateRequest) => Promise<any>;
    apiGetRole: (roleID: string) => Promise<RoleResponse>;
    apiUpdateRole: (data: RoleCreateUpdateRequest, roleID: string) => Promise<any>;
}



export function useApiRoles(): ApiRoles {

    const apiGetRoleList = async (page:number = 1, row:number = 10): Promise<RoleListResponse> => {
        const response = await apiCaller('GET', `/role?page=${page}&row=${row}`, null,null);
        return response as RoleListResponse;
    };

    const apiGetRole = async (roleID: string): Promise<RoleResponse> => {
        const response = await apiCaller('GET', `/role/${roleID}`, null, null);
        return response;
    };

    const apiCreateRole = async (data: RoleCreateUpdateRequest): Promise<any> => {
        const response = await apiCaller('POST', '/role', data);
        return response;
    };

    const apiUpdateRole = async (data: RoleCreateUpdateRequest, roleID: string): Promise<any> => {
        const response = await apiCaller('PUT', `/role/${roleID}`, data);
        return response;
    };

    


    return {
        apiGetRoleList,
        apiCreateRole,
        apiGetRole,
        apiUpdateRole
    };
}