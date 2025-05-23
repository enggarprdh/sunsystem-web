

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header with logout */}
            <header className="bg-primary text-white p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">5unSystem Dashboard</h2>
                <Button variant="skyblue" onClick={handleLogout} className="text-white hover:bg-primary-dark">
                    Logout
                </Button>
            </header>

            <div className="flex flex-1">
                {/* Left panel with image */}
                <div className="hidden md:flex flex-1 bg-primary/5 items-center justify-center p-10">
                    <img
                        src="/path/to/your/image.jpg"
                        alt="Home"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>

                {/* Right panel with content */}
                <div className="flex flex-1 items-center justify-center p-6">
                    <div className="w-full max-w-md">
                        <h1 className="text-2xl font-bold text-center">Welcome to the Home Page</h1>
                        <p className="text-center mt-4">You are now logged in. This is your secure dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}