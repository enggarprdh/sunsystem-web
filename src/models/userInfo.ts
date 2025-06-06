export type UserInfo = {
    token: string;
    refreshToken: string;
    userName:string;
    role:string;
    message: string;
    menu?: Menu[];
}

export type Menu = {
    menuID: string;
    displayName: string;
    icon: string;
    path: string;
    isHasSubMenu: boolean;
    isView: boolean;
    isAdd: boolean;
    isEdit: boolean;
    isDelete: boolean;
    sequence: number;
    subMenu?: SubMenu[];
}

export type SubMenu = {
    menuID: string;
    displayName: string;
    path: string;
    isView: boolean;
    isAdd: boolean;
    isEdit: boolean;
    isDelete: boolean;
    sequence: number;
}

export type LoginPayload = {
    userName: string;
    password: string;
}


