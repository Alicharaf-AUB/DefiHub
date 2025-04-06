"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      toast({ title: "Account created", description: "You can now log in" })
      router.push("/login")
    } else {
      toast({ title: "Error", description: data.error || "Registration failed", variant: "destructive" })
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 space-y-6">
      <h1 className="text-2xl font-bold">Register</h1>
      <div>
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button className="w-full" onClick={handleRegister}>
        Register
      </Button>

      <p className="text-sm text-center text-muted-foreground">
  Already have an account?{" "}
  <Link href="/login" className="text-purple-600 hover:underline">
    Log in
  </Link>
</p>

    </div>
  )
}
