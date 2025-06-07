
import type React from "react";
type HeaderProps = {
    title: string;
    description?: string;
    ButtonComponents?: React.ReactNode[];
};

const Header = ({ title, description, ButtonComponents}: HeaderProps) => {    
    return (
        <div className="flex justify-between bg-blue-500 text-white items-center pr-4">
            <div className="flex flex-col md:p-4 xs:pl-14 xs:py-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <span>{description}</span>
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

export default Header;