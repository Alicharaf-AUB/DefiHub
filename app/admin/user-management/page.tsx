"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { ArrowLeft, Coins, Shield, User, UserCog } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample user roles
const userRoles = [
  { id: "1", name: "User", description: "Standard user with basic privileges", count: 982 },
  { id: "2", name: "Premium", description: "Paid subscriber with enhanced features", count: 251 },
  { id: "3", name: "Admin", description: "Full administrative access", count: 12 },
]

// Sample permissions
const allPermissions = [
  { id: "create_token", name: "Create Tokens", description: "Ability to create new tokens" },
  { id: "delete_token", name: "Delete Tokens", description: "Ability to delete owned tokens" },
  { id: "transfer_token", name: "Transfer Tokens", description: "Ability to transfer tokens" },
  { id: "burn_token", name: "Burn Tokens", description: "Ability to burn tokens" },
  { id: "mint_token", name: "Mint Tokens", description: "Ability to mint additional tokens" },
  { id: "modify_token", name: "Modify Tokens", description: "Ability to modify token parameters" },
  { id: "view_analytics", name: "View Analytics", description: "Access to analytics data" },
  { id: "manage_users", name: "Manage Users", description: "Ability to manage users" },
  { id: "manage_settings", name: "Manage Settings", description: "Ability to modify platform settings" },
]

export default function UserManagementPage() {
  const [selectedRole, setSelectedRole] = useState(userRoles[0])
  const [roleName, setRoleName] = useState("")
  const [roleDescription, setRoleDescription] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const handleSelectRole = (role: (typeof userRoles)[0]) => {
    setSelectedRole(role)
    // In a real app, we would fetch the permissions for this role
    // For now, we'll simulate with some sample data
    setSelectedPermissions(
      role.name === "Admin"
        ? allPermissions.map((p) => p.id)
        : role.name === "Premium"
          ? ["create_token", "delete_token", "transfer_token", "burn_token", "view_analytics"]
          : ["create_token", "delete_token", "transfer_token"],
    )
  }

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // Simulate saving
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Role created",
        description: `New role "${roleName}" has been created`,
      })
      setRoleName("")
      setRoleDescription("")
      setSelectedPermissions([])
    }, 1000)
  }

  const handleUpdatePermissions = () => {
    setSaving(true)
    // Simulate saving
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Permissions updated",
        description: `Permissions for ${selectedRole.name} role have been updated`,
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <Coins className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DeFi Builder</span>
            </Link>
            <Badge
              variant="outline"
              className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            >
              Admin
            </Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/admin" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/admin/users" className="text-sm font-medium hover:text-primary">
              Users
            </Link>
            <Link href="/admin/settings" className="text-sm font-medium hover:text-primary">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletConnectButton />
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Permissions</h1>
              <p className="text-muted-foreground">Manage user roles and permissions</p>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Dashboard
            </Button>
          </div>

          <Tabs defaultValue="roles" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="roles">User Roles</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Roles</CardTitle>
                      <CardDescription>Select a role to view or edit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {userRoles.map((role) => (
                          <div
                            key={role.id}
                            className={`p-3 rounded-md border cursor-pointer transition-colors ${
                              selectedRole?.id === role.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                            }`}
                            onClick={() => handleSelectRole(role)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {role.name === "Admin" ? (
                                  <Shield className="h-4 w-4 text-purple-500" />
                                ) : role.name === "Premium" ? (
                                  <UserCog className="h-4 w-4 text-blue-500" />
                                ) : (
                                  <User className="h-4 w-4 text-gray-500" />
                                )}
                                <span className="font-medium">{role.name}</span>
                              </div>
                              <Badge variant="outline">{role.count}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Create New Role</CardTitle>
                      <CardDescription>Define a custom user role</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form id="create-role-form" onSubmit={handleCreateRole}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="role-name">Role Name</Label>
                            <Input
                              id="role-name"
                              placeholder="e.g. Developer"
                              value={roleName}
                              onChange={(e) => setRoleName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="role-description">Description</Label>
                            <Input
                              id="role-description"
                              placeholder="Role description"
                              value={roleDescription}
                              onChange={(e) => setRoleDescription(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" form="create-role-form" disabled={saving} className="w-full">
                        {saving ? "Creating..." : "Create Role"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {selectedRole?.name === "Admin" ? (
                              <Shield className="h-5 w-5 text-purple-500" />
                            ) : selectedRole?.name === "Premium" ? (
                              <UserCog className="h-5 w-5 text-blue-500" />
                            ) : (
                              <User className="h-5 w-5 text-gray-500" />
                            )}
                            {selectedRole?.name} Role
                          </CardTitle>
                          <CardDescription>{selectedRole?.description}</CardDescription>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Users with this role: </span>
                          <span className="font-medium">{selectedRole?.count}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-medium mb-3">Role Permissions</h3>
                      <div className="space-y-4">
                        {allPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-start space-x-2">
                            <Checkbox
                              id={permission.id}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedPermissions([...selectedPermissions, permission.id])
                                } else {
                                  setSelectedPermissions(selectedPermissions.filter((p) => p !== permission.id))
                                }
                              }}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor={permission.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {permission.name}
                              </label>
                              <p className="text-sm text-muted-foreground">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleUpdatePermissions} disabled={saving} className="ml-auto">
                        {saving ? "Updating..." : "Update Permissions"}
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Role Assignment</CardTitle>
                      <CardDescription>Manage users with this role</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <Input placeholder="Search users..." className="max-w-xs" />
                        <Button
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Assigned users",
                              description: "Users have been assigned to this role",
                            })
                          }}
                        >
                          Assign Users
                        </Button>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Assigned</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Alex Johnson</TableCell>
                            <TableCell>alex@example.com</TableCell>
                            <TableCell>2025-03-15</TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Role removed",
                                    description: "User has been removed from this role",
                                    variant: "destructive",
                                  })
                                }}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Sarah Williams</TableCell>
                            <TableCell>sarah@example.com</TableCell>
                            <TableCell>2025-03-10</TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Role removed",
                                    description: "User has been removed from this role",
                                    variant: "destructive",
                                  })
                                }}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Permission Management</CardTitle>
                  <CardDescription>Configure and manage system permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Permission</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Roles</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allPermissions.map((permission) => (
                          <TableRow key={permission.id}>
                            <TableCell className="font-medium">{permission.name}</TableCell>
                            <TableCell>{permission.description}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {permission.id === "manage_settings" || permission.id === "manage_users" ? (
                                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                    Admin
                                  </Badge>
                                ) : permission.id === "mint_token" ||
                                  permission.id === "modify_token" ||
                                  permission.id === "view_analytics" ? (
                                  <>
                                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                      Admin
                                    </Badge>
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                      Premium
                                    </Badge>
                                  </>
                                ) : (
                                  <>
                                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                      Admin
                                    </Badge>
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                      Premium
                                    </Badge>
                                    <Badge>User</Badge>
                                  </>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Permission edited",
                                    description: `${permission.name} permission has been updated`,
                                  })
                                }}
                              >
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Create Permission</CardTitle>
                  <CardDescription>Add a new system permission</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="permission-name">Permission Name</Label>
                      <Input id="permission-name" placeholder="e.g. export_data" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="permission-description">Description</Label>
                      <Input id="permission-description" placeholder="e.g. Ability to export data from the platform" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Assign to Roles</Label>
                      <div className="space-y-2">
                        {userRoles.map((role) => (
                          <div key={role.id} className="flex items-center space-x-2">
                            <Checkbox id={`role-${role.id}`} />
                            <label htmlFor={`role-${role.id}`} className="text-sm font-medium leading-none">
                              {role.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Permission created",
                        description: "New permission has been created",
                      })
                    }}
                  >
                    Create Permission
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

