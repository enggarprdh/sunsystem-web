import Header from "@/components/header";
import Container from "@/components/Container";
import Content from "@/components/content";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Table } from "@/components/table";

const RolePage = () => {

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

  const rolesData = [
    { name: "Admin", description: "Full access to all features." },
    { name: "User", description: "Limited access to basic features." },
    { name: "Manager", description: "Manage teams and assign tasks." },
    { name: "Editor", description: "Edit content and manage posts." },
    { name: "Viewer", description: "View content only." },
    { name: "Support", description: "Provide user support." },
    { name: "HR", description: "Manage employee records." },
    { name: "Finance", description: "Access financial data." },
    { name: "Developer", description: "Access development tools." },
    { name: "QA", description: "Quality assurance and testing." },
    { name: "Marketing", description: "Manage marketing campaigns." },
    { name: "Sales", description: "Access sales data and leads." },
    { name: "Guest", description: "Temporary access with restrictions." },
    { name: "Partner", description: "External partner access." },
    { name: "Trainer", description: "Manage training sessions." },
    { name: "Intern", description: "Limited access for interns." },
    { name: "Consultant", description: "Consultant level access." },
    { name: "Project Lead", description: "Lead project teams." },
    { name: "Content Creator", description: "Create and manage content." },
    { name: "Analyst", description: "Analyze and report data." }
  ];

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
              { header: "Role Name", accessorKey: "name", type: "text" },
              { header: "Description", accessorKey: "description", type: "text" },
              { 
                header: "Actions", 
                accessorKey: "actions", 
                type:"button", 
                cell: ({ row }) => (
                  <div className="flex space-x-2 justify-center">
                    <Button variant="info_pro" size="sm"><Eye /></Button>
                    <Button variant="warning_pro" size="sm"><Pencil/></Button>
                    <Button variant="danger_pro" size="sm"><Trash2/></Button>
                  </div>
                ) 
              }
            ]}
            data={rolesData}
            pagination={true}
            paginationType="client"
            pageSize={10}
          />
      </Content>
    </Container>
  );
};

export default RolePage;
