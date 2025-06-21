
import Container from "@/components/container";
import HeaderForm from "@/components/headerForm";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FixedBottom from "@/components/fixedBottom";
import type { RoleCreateUpdateRequest } from "@/models/role";
import { useEffect, useState } from "react";
import { useApiRoles } from "@/api/apiRole";
import { useParams, useLocation } from "react-router-dom";

const RolesForm = () => {

    const apiRoles = useApiRoles();
    const [data, setData] = useState<RoleCreateUpdateRequest>({roleName: ""});
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const {id } = useParams();
    const location = useLocation();


    useEffect(() => {
            const checkIfEdit = async () => {
                if (location.pathname.includes("/edit/") && id) {
                    setIsEdit(true);
                    await fetchData();
                } else {
                    setIsEdit(false);
                }
            }
            checkIfEdit();
    }, [id, location.pathname]);

    const fetchData = async () => {
        if (id) {
            const response = await apiRoles.apiGetRole(id);
            if (response) {
                setData({
                    roleName: response.data.roleName
                });
            }
        } else {
            // handle the case when id is undefined, e.g., show an error or return early
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleBack = () => {
        window.location.href = "/roles";
    }

    const onSubmit = async () => {
        if (isEdit && id) {
            // Update existing role
            const updateData: RoleCreateUpdateRequest = {
                roleName: data.roleName
            };
            const response: any = await apiRoles.apiUpdateRole(updateData,id);
            if (response) {
                window.location.href = "/roles";
            }
        } else {
            const response: any = await apiRoles.apiCreateRole(data);   
            if (response) {
                window.location.href = "/roles";
            }
        }
        

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
                            <Input type="text" name="roleName" value={data.roleName} onChange={handleInputChange} placeholder="Enter role name"/>
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
                        <Button variant="success_pro" onClick={onSubmit} className="text-white">
                            {isEdit ? "Update" : "Save"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            </FixedBottom>
        </Container>
    );
}


export default RolesForm;