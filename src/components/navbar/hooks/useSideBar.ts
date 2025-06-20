import { useSelector } from "react-redux";
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
        const {menu} = useSelector((state:any)=> state.dataSlicePersisted);
        
        let menuItems: MenuItem[] = [];
        menu?.map((item:any) => {
                let menuItem: MenuItem = {
                    title: item.displayName,
                    href: item.path,
                    icon: item.icon,  
                };
                if (item.isHasSubMenu && item.subMenu) {
                    menuItem.submenu = item.subMenu.map((subItem:any) => ({
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