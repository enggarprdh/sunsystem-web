import type { RoleCreateRequest, RoleListResponse } from "@/models/role";
import { apiCaller } from "./_apiCaller";


interface ApiRoles {
    apiGetRoleList: (page:number, row:number) => Promise<RoleListResponse>;
    apiCreateRole: (data: RoleCreateRequest) => Promise<any>;
}



export function useApiRoles(): ApiRoles {

    const apiGetRoleList = async (page:number = 1, row:number = 10): Promise<RoleListResponse> => {
        const response = await apiCaller('GET', `/role?page=${page}&row=${row}`, null,null);
        return response as RoleListResponse;
    };

    const apiCreateRole = async (data: RoleCreateRequest): Promise<any> => {
        const response = await apiCaller('POST', '/role', data);
        return response;
    };

    


    return {
        apiGetRoleList,
        apiCreateRole
    };
}