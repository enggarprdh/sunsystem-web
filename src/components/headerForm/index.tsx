
import type React from "react";
type HeaderFormProps = {
    title: string;
    description?: string;
    ButtonComponents?: React.ReactNode[];
};

const HeaderForm = ({ title, ButtonComponents}: HeaderFormProps) => {    
    return (
        <div className="flex justify-between bg-blue-500 text-white items-center pr-4 mb-2">
            <div className="flex flex-col md:p-4 xs:pl-14 xs:py-4">
                <h1 className="text-2xl">{title}</h1>
            </div>
            
            <div className="flex items-center gap-2">
                {ButtonComponents && ButtonComponents?.length > 0 &&
                    ButtonComponents.map((ButtonComponent) => (
                        ButtonComponent
                    ))
                }
            </div>

        </div>   
    )
}

export default HeaderForm;