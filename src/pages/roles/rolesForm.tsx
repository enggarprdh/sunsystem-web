
import Container from "@/components/container";
import HeaderForm from "@/components/headerForm";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FixedBottom from "@/components/fixedBottom";

const RolesForm = () => {


    const handleBack = () => {
        window.location.href = "/roles";
    }
    

    return (
        <Container>
            <HeaderForm
                title="Roles Form"
            />

            <div className="flex w-full md:flex-row xs:flex-col gap-2 mb-4">
                <Card className="rounded-none w-full md:w-5/5">
                    <CardContent className="p-4">
                        <div className="space-y-2">
                            <label> Role Name </label>     
                            <Input type="text" placeholder="Enter role name"/>
                        </div> 
                    </CardContent>
                </Card>
                
            </div>
            
            <FixedBottom>
            <Card className="rounded-none w-full md:w-5/5">
                <CardContent className="p-4">
                    <div className="flex justify-end gap-2">
                        <Button variant="outline_warning_pro" onClick={handleBack}>
                            Back
                        </Button>
                        <Button variant="success_pro" className="text-white">
                            Save
                        </Button>
                    </div>
                </CardContent>
            </Card>
            </FixedBottom>
        </Container>
    );
}


export default RolesForm;