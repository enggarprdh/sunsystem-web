import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginImage from "@/assets/login-image.svg";
import { useAuth } from "@/contexts/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
    const [value, setValue] = useState<{ username: string; password: string }>({
        username: "",
        password: "",
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const success = await login(value.username, value.password);
            if (success) {
                navigate("/home");
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("An error occurred during login");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
        {/* Left panel with image */}
        <div className="hidden md:flex flex-1 bg-primary/5 items-center justify-center p-10">
            <img
                src={loginImage}
                alt="Login"
                className="max-w-full max-h-full object-contain"
            />
        </div>

      {/* Right panel with login form */}
        <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
                Enter your credentials to access your account
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                    Username
                </label>
                <Input
                    id="username"
                    placeholder="Enter your username"
                    value={value.username}
                    onChange={(e) => setValue({ ...value, username: e.target.value })}
                    required
                />
                </div>
                <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                    Password
                </label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={value.password}
                    onChange={(e) => setValue({ ...value, password: e.target.value })}  
                    required
                />
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                </label>
                <div className="flex-1 text-right">
                    <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                    </a>
                </div>
                </div>                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                        {error}
                    </div>
                )}
                <Button type="submit" variant="success_pro" className="w-full text-white" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                </Button>
            </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline">
                    Sign up
                </a>
            </div>
            </CardFooter>
        </Card>
        </div>
    </div>
    );
}