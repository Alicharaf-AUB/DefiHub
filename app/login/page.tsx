"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("isAdmin", data.is_admin)
      toast({ title: "Logged in", description: "Welcome back!" })
      router.push("/dashboard")
    } else {
      toast({ title: "Error", description: data.error || "Login failed", variant: "destructive" })
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 space-y-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <div>
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button className="w-full" onClick={handleLogin}>
        Login
      </Button>
      <p className="text-sm text-center text-muted-foreground">
  Don’t have an account?{" "}
  <Link href="/register" className="text-purple-600 hover:underline">
    Sign up
  </Link>
</p>

    </div>
  )
}
