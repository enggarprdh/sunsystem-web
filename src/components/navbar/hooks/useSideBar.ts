import type { UserInfo } from "@/models/userInfo";
import { secureStorage } from "@/utils/crypto";

interface MenuItem {
    title: string;
    href: string;
    icon: string;
    submenu?: { 
        title: string; 
        href: string;
    }[];
}

      const fetchMenuItems = () : MenuItem[] => {
          const userInfo: UserInfo = JSON.parse(secureStorage.getItem('userInfo') || '{}');
          let menuItems: MenuItem[] = [];
          userInfo.menu?.map((item) => {
                let menuItem: MenuItem = {
                    title: item.displayName,
                    href: item.path,
                    icon: item.icon,  
                };
                if (item.isHasSubMenu && item.subMenu) {
                    menuItem.submenu = item.subMenu.map((subItem) => ({
                        title: subItem.displayName,
                        href: subItem.path
                    }));
                }
              menuItems.push(menuItem);
          })
          return menuItems;
      }

export const useSidebar = () => {
      
        const menuItems: MenuItem[] =  fetchMenuItems();
        
        return { menuItems };
}