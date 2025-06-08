import { useEffect, useState } from "react";
import Header from "@/components/header";
import Container from "@/components/container";
import Content from "@/components/content";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Table } from "@/components/table";
import { useApiRoles } from "@/api/apiRole";
import type { RoleList } from "@/models/role";


const RolePage = () => {
  const apiRoles = useApiRoles();
  const [rolesData, setRolesData] = useState<RoleList[]>([]);
  const [pagination, setPagination] = useState({page: 1, pageSize: 10, totalItems: 0});

  const ListButton = () => {
    let buttons = [];
    buttons.push(
      <Button key="add" variant="success_pro">
        <Plus /> 
        <span className="hidden md:block">Add New Role</span>
      </Button>
    );
    return buttons;
  }
  const handleRowClick = (row: any) => {
    console.log("Row clicked:", row);
    // Implement your row click logic here, e.g., navigate to a detail page
  }

  const fetchData = async (isMounted:boolean, page?:number, pageSize?:number) => {
    try {
      const currentPage = page || pagination.page;
      const currentPageSize = pageSize || pagination.pageSize;
      const roles = await apiRoles.apiGetRoleList(currentPage, currentPageSize);
      if (isMounted) {
        setRolesData(roles.data);
        setPagination({
          ...pagination,
          page: currentPage, // Update the current page
          totalItems: roles.dataLength || 0, // Ensure totalItems is set correctly
        }); 
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  const handlePageChange = (page: number) => {
    fetchData(true, page, pagination.pageSize); // Fetch data with the new page
  };
  
  useEffect(() => {
    let isMounted = true;
    fetchData(isMounted);
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array means this only runs once on mount

  return (
    <Container>
      <Header
        title="Roles"
        description="Manage your roles here."
        ButtonComponents={ListButton()}
      />
      <Content>
          <Table
            columns={[
              { 
                header: "Role Name", 
                accessorKey: "roleName", 
                type: "text",
                cell: ({ row }: { row: { roleName: string } }) => <strong>{row.roleName}</strong>
              },
              { 
                header: "Actions", 
                accessorKey: "actions", 
                type:"button", 
                headerAlign: "center",
                cell: ({ row }: { row: { [key: string]: any } }) => (
                  <div className="flex space-x-2 justify-center">
                    <Button variant="info_pro" size="sm" onClick={() => handleRowClick(row)}><Eye /></Button>
                    <Button variant="warning_pro" size="sm"><Pencil/></Button>
                    <Button variant="danger_pro" size="sm"><Trash2/></Button>
                  </div>
                ) 
              }
            ]}
            data={rolesData}
            pagination={true}
            paginationType="server"
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            currentPage={pagination.page}
            totalItems={pagination.totalItems}
          />
      </Content>
    </Container>
  );
};

export default RolePage;
