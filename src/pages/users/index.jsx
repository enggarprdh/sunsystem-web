import Container from "@/components/Container";
import Header from "@/components/header";
import Content from "@/components/content"
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
const UserPage = () => {

  const ListButton = () => {
    let buttons = [];
    buttons.push(
      <Button key="edit" variant="warning_pro">
        <Download />
        <span className="hidden md:block">Export</span>
      </Button>
    );
    buttons.push(
      <Button key="add" variant="success_pro">
        <Plus /> 
        <span className="hidden md:block">Add New</span>
      </Button>
    );
    
    return buttons;
  }

  return (
    <Container>
      <Header
        title="Users"
        description="Manage your users here."
        ButtonComponents={ListButton()}
      />
      <Content>

      </Content>
    </Container>
  );
};



export default UserPage;
