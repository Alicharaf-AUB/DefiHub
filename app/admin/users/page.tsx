"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import {
  ArrowLeft,
  Coins,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  UserCog,
  UserPlus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Sample users data
const users = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    walletAddress: "0x1234...5678",
    joinDate: "2025-01-15",
    tokensCreated: 3,
    status: "active",
    role: "user",
    lastLogin: "2025-03-22",
    avatar: null,
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    walletAddress: "0xabcd...efgh",
    joinDate: "2025-02-20",
    tokensCreated: 1,
    status: "active",
    role: "user",
    lastLogin: "2025-03-21",
    avatar: null,
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@example.com",
    walletAddress: "0x9876...5432",
    joinDate: "2025-01-10",
    tokensCreated: 5,
    status: "active",
    role: "premium",
    lastLogin: "2025-03-23",
    avatar: null,
  },
  {
    id: "4",
    name: "Emma Thompson",
    email: "emma@example.com",
    walletAddress: "0x2468...1357",
    joinDate: "2025-03-05",
    tokensCreated: 0,
    status: "inactive",
    role: "user",
    lastLogin: "2025-03-10",
    avatar: null,
  },
  {
    id: "5",
    name: "David Rodriguez",
    email: "david@example.com",
    walletAddress: "0xfedc...ba98",
    joinDate: "2025-02-25",
    tokensCreated: 2,
    status: "active",
    role: "admin",
    lastLogin: "2025-03-23",
    avatar: null,
  },
  {
    id: "6",
    name: "Lisa Wang",
    email: "lisa@example.com",
    walletAddress: "0x8642...1357",
    joinDate: "2025-01-30",
    tokensCreated: 4,
    status: "suspended",
    role: "user",
    lastLogin: "2025-03-15",
    avatar: null,
  },
  {
    id: "7",
    name: "James Wilson",
    email: "james@example.com",
    walletAddress: "0x7531...2468",
    joinDate: "2025-03-10",
    tokensCreated: 1,
    status: "active",
    role: "premium",
    lastLogin: "2025-03-22",
    avatar: null,
  },
]

export default function AdminUsersPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [userDetailsOpen, setUserDetailsOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  // Form states for new user
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    walletAddress: "",
    role: "user",
  })

  // Sample user statistics
  const userStats = {
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.status === "active").length,
    premiumUsers: users.filter((user) => user.role === "premium").length,
    suspendedUsers: users.filter((user) => user.status === "suspended").length,
    newUsersToday: 2,
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "User data refreshed",
        description: "User information has been updated",
      })
    }, 1500)
  }

  const handleExportData = () => {
    toast({
      title: "Exporting User Data",
      description: "User data is being exported to CSV",
    })

    // Create a simple CSV string with user data
    const headers = "ID,Name,Email,Wallet Address,Join Date,Tokens Created,Status,Role,Last Login\n"
    const rows = users
      .map(
        (user) =>
          `${user.id},${user.name},${user.email},${user.walletAddress},${user.joinDate},${user.tokensCreated},${user.status},${user.role},${user.lastLogin}`,
      )
      .join("\n")

    const csvContent = headers + rows

    // Create a blob and download it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `platform_users_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewUser = (user: any) => {
    if (user) {
      setSelectedUser(user)
      setUserDetailsOpen(true)
    }
  }

  const handleEditUser = (user: any) => {
    if (user) {
      setSelectedUser(user)
      setEditUserOpen(true)
    }
  }

  const handleSubmitEditUser = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "User updated",
      description: `${selectedUser.name}'s information has been updated`,
    })
    setEditUserOpen(false)
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "User added",
      description: `${newUserData.name} has been added to the platform`,
    })
    setNewUserData({
      name: "",
      email: "",
      walletAddress: "",
      role: "user",
    })
    setAddUserOpen(false)
  }

  const handleSuspendUser = (user: any) => {
    toast({
      title: "User suspended",
      description: `${user.name}'s account has been suspended`,
      variant: "destructive",
    })
  }

  const handleActivateUser = (user: any) => {
    toast({
      title: "User activated",
      description: `${user.name}'s account has been activated`,
    })
  }

  // Filter users based on search and filters
  const filteredUsers = users
    .filter((user) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.walletAddress.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter((user) => {
      // Apply status filter
      if (statusFilter !== "all") {
        return user.status === statusFilter
      }
      return true
    })
    .filter((user) => {
      // Apply role filter
      if (roleFilter !== "all") {
        return user.role === roleFilter
      }
      return true
    })

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
            <Link href="/admin/users" className="text-sm font-medium text-primary">
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
              <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
              <p className="text-muted-foreground">Manage and monitor platform users</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                onClick={() => setAddUserOpen(true)}
              >
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-3xl">{userStats.totalUsers}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">+{userStats.newUsersToday} today</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Users</CardDescription>
                <CardTitle className="text-3xl">{userStats.activeUsers}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {Math.round((userStats.activeUsers / userStats.totalUsers) * 100)}% of total
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Premium Users</CardDescription>
                <CardTitle className="text-3xl">{userStats.premiumUsers}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {Math.round((userStats.premiumUsers / userStats.totalUsers) * 100)}% of total
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Suspended</CardDescription>
                <CardTitle className="text-3xl">{userStats.suspendedUsers}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {Math.round((userStats.suspendedUsers / userStats.totalUsers) * 100)}% of total
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Admins</CardDescription>
                <CardTitle className="text-3xl">{users.filter((user) => user.role === "admin").length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">With platform access</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all-users" className="w-full mb-8">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-3">
              <TabsTrigger value="all-users">All Users</TabsTrigger>
              <TabsTrigger value="premium-users">Premium Users</TabsTrigger>
              <TabsTrigger value="flagged-users">Flagged Accounts</TabsTrigger>
            </TabsList>

            <TabsContent value="all-users" className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>
                          {statusFilter === "all"
                            ? "All Statuses"
                            : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <div className="flex items-center gap-2">
                        <UserCog className="h-4 w-4" />
                        <span>
                          {roleFilter === "all"
                            ? "All Roles"
                            : roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={handleExportData}>
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Wallet</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Tokens Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              {user.avatar ? (
                                <AvatarImage src={user.avatar} alt={user.name} />
                              ) : (
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <div>{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{user.walletAddress}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.tokensCreated}</TableCell>
                        <TableCell>
                          {user.status === "active" ? (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            >
                              Active
                            </Badge>
                          ) : user.status === "suspended" ? (
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            >
                              Suspended
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            >
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {user.role === "admin" ? (
                            <Badge
                              variant="outline"
                              className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                            >
                              Admin
                            </Badge>
                          ) : user.role === "premium" ? (
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                              Premium
                            </Badge>
                          ) : (
                            <Badge variant="outline">User</Badge>
                          )}
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                <UserCog className="mr-2 h-4 w-4" /> Edit User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status !== "suspended" ? (
                                <DropdownMenuItem
                                  onClick={() => handleSuspendUser(user)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <ShieldAlert className="mr-2 h-4 w-4" /> Suspend
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleActivateUser(user)}
                                  className="text-green-600 focus:text-green-600"
                                >
                                  <Shield className="mr-2 h-4 w-4" /> Activate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="premium-users" className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Wallet</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Tokens Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users
                      .filter((user) => user.role === "premium")
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{user.walletAddress}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>{user.tokensCreated}</TableCell>
                          <TableCell>
                            {user.status === "active" ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              >
                                Active
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              >
                                Suspended
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                              Pro
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="flagged-users" className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Wallet</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Flag Reason</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users
                      .filter((user) => user.status === "suspended")
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{user.walletAddress}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            >
                              Suspended
                            </Badge>
                          </TableCell>
                          <TableCell>Suspicious activity</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                                Details
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-100"
                                onClick={() => handleActivateUser(user)}
                              >
                                Activate
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {users.filter((user) => user.status === "suspended").length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No flagged users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* User Details Dialog */}
      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Detailed information about {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={`
                      ${
                        selectedUser.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : selectedUser.status === "suspended"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }
                    `}
                    >
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`
                      ${
                        selectedUser.role === "admin"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                          : selectedUser.role === "premium"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : ""
                      }
                    `}
                    >
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Wallet Address</Label>
                    <p className="font-mono text-sm">{selectedUser.walletAddress}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Join Date</Label>
                    <p>{selectedUser.joinDate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Tokens Created</Label>
                    <p>{selectedUser.tokensCreated}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Last Login</Label>
                    <p>{selectedUser.lastLogin}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Activity Summary</Label>
                  <Card className="mt-2">
                    <CardContent className="p-4">
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Last token created:</span>
                          <span>2025-03-20</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Total transactions:</span>
                          <span>42</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Platform fees paid:</span>
                          <span>$124.50</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setUserDetailsOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setUserDetailsOpen(false)
                handleEditUser(selectedUser)
              }}
            >
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update information for {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <form onSubmit={handleSubmitEditUser}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input id="edit-name" defaultValue={selectedUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-wallet">Wallet Address</Label>
                  <Input id="edit-wallet" defaultValue={selectedUser.walletAddress} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select defaultValue={selectedUser.role}>
                    <SelectTrigger id="edit-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account on the platform</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">Name</Label>
                <Input
                  id="add-name"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-email">Email</Label>
                <Input
                  id="add-email"
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-wallet">Wallet Address</Label>
                <Input
                  id="add-wallet"
                  value={newUserData.walletAddress}
                  onChange={(e) => setNewUserData({ ...newUserData, walletAddress: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-role">Role</Label>
                <Select
                  value={newUserData.role}
                  onValueChange={(value) => setNewUserData({ ...newUserData, role: value })}
                >
                  <SelectTrigger id="add-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="send-email" />
                <label
                  htmlFor="send-email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Send welcome email
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

