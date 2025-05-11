import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Import shadcn components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
          <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-primary mb-6">5unSystem.Web</h1>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to shadcn/ui</CardTitle>
          <CardDescription>A beautiful UI component library for React</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
            <Input 
              id="name" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <Button variant={"secondary"} onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </Button>
          
          <p className="text-muted-foreground">
            {name ? `Hello, ${name}!` : 'Enter your name above'}
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Edit <code className="bg-muted px-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </CardFooter>
      </Card>
      
      <p className="mt-8 text-sm text-muted-foreground">
        Powered by Vite + React + TypeScript + Tailwind CSS + shadcn/ui
      </p>
    </div>
  )
}

export default App
