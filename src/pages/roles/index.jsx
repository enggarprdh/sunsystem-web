import Header from "@/components/header";
import Container from "@/components/Container";
import Content from "@/components/content";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

  return (
    <Container>
      <Header
        title="Roles"
        description="Manage your roles here."
        ButtonComponents={ListButton()}
      />
      <Content>
        
      </Content>
    </Container>
  );
};

export default RolePage;
