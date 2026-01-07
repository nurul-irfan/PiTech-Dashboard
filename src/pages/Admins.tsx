"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserPlus,
  Search,
  MoreHorizontal,
  Edit,
  Power,
  Shield,
  ShieldCheck,
  Loader2,
  Users,
  Building2,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Header } from "@/components/layout/Header";

import {
  adminApi
} from "@/api/useApi";

/* ---------------------------------- TYPES --------------------------------- */

type AppRole = "initiator" | "approver" | "auditor" | "support";

interface UserWithRoles {
  id: string;
  full_name: string;
  email: string;
  department?: string;
  phone?: string;
  is_active: boolean;
  is_2fa_enabled: boolean;
  created_at: string;
  role: AppRole;
}

/* ---------------------------------- CONFIG -------------------------------- */

const roleConfig: Record<AppRole, { label: string; description: string; category: "bank" | "platform" }> = {
  initiator: { label: "Initiator", description: "Creates payment requests", category: "bank" },
  approver: { label: "Approver", description: "Approves or rejects payments", category: "bank" },
  auditor: { label: "Auditor", description: "Audits transactions and logs", category: "bank" },
  support: { label: "Operations", description: "Handles daily operations", category: "platform" },
};

const bankRoles: AppRole[] = ["initiator", "approver", "auditor", "support"];




/* ------------------------------- COMPONENT -------------------------------- */

export default function AdminManagement() {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    department: "",

    phone: "",
    password: "",
    role: "",
  });

  /* ---------------------------- UI ACTIONS -------------------------------- */

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setFormData({
      full_name: "",
      email: "",
      department: "",

      phone: "",
      password: "",
      role: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (user: UserWithRoles) => {
    setSelectedUser(user);
    setFormData({
      full_name: user.full_name,
      email: user.email,
      department: user.department || "",

      phone: user.phone || "",
      password: "", // Leave blank on edit
      role: user.role,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    await adminApi.createAdmin({ formData })


    // if (selectedUser) {
    //   // EDIT MODE
    //   setUsers((prev) =>
    //     prev.map((u) =>
    //       u.id === selectedUser.id
    //         ? { ...u, ...formData, role: formData.role }
    //         : u
    //     )
    //   );
    // } else {
    //   // CREATE MODE
    //   const newUser: UserWithRoles = {
    //     id: crypto.randomUUID(),
    //     ...formData,
    //     is_active: true,
    //     is_2fa_enabled: formData.role.some(r => rolesRequiring2FA.includes(r)),
    //     created_at: new Date().toISOString(),
    //   };
    //   setUsers((prev) => [newUser, ...prev]);
    // }

    setIsDialogOpen(false);
  };

  useEffect(async () => {
    await adminApi.listAdmins()
    return () => {

    };
  }, []);

  const handleToggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, is_active: !u.is_active } : u))
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role.includes(roleFilter as AppRole);
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  return (
    <DashboardLayout title="User Management" subtitle="Manage users, role, and access permissions">
      <Header
        title="Admin Management"
        subtitle="Complete activity admin for compliance"
      />
      <div className="space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Users" value={users.length} />
          <StatCard icon={ShieldCheck} label="Active Users" value={users.filter((u) => u.is_active).length} />
          <StatCard icon={Building2} label="Bank Users" value={users.filter((u) => u.role).length} />
          <StatCard icon={Shield} label="2FA Enabled" value={users.filter((u) => u.is_2fa_enabled).length} />
        </div>

        {/* ACTION BAR */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-3 flex-1 w-full max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Role Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {[...bankRoles, ...bankRoles].map((r) => (
                  <SelectItem key={r} value={r}>{roleConfig[r].label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="gold" onClick={handleOpenCreate}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* USERS TABLE */}
        <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px]">User Details</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow key={u.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell>
                    <div>
                      <p className="font-semibold text-foreground">{u.full_name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <p className="font-semibold text-foreground">{u.role}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.is_active ? "outline" : "destructive"}>
                      {u.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(u.created_at), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => handleOpenEdit(u)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleActive(u.id)}
                          className={u.is_active ? "text-destructive" : "text-emerald-600"}
                        >
                          <Power className="w-4 h-4 mr-2" />
                          {u.is_active ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No users found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* UNIFIED DIALOG (CREATE & EDIT) */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedUser ? "Edit User Profile" : "Create New User"}</DialogTitle>
              <DialogDescription>
                {selectedUser
                  ? "Update the permissions and contact details for this user."
                  : "Fill in the details to onboard a new user to the system."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Corporate Email *</Label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>phone Number</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{selectedUser ? "New Password (Optional)" : "Initial Password *"}</Label>
                  <Input
                    type="password"
                    required={!selectedUser}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>

              </div>

              <div className="space-y-4 border-t pt-4">
                <Label className="text-base font-bold">Assign Permissions</Label>

                {/* Bank Roles Section */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-2 tracking-wider">Bank Specific Roles</p>
                  <div className="grid gap-2">
                    {bankRoles.map((role) => (
                      <RoleItem
                        key={role}
                        role={role}
                        checked={formData.role.includes(role)}
                        onChange={(checked) => {
                          setFormData({
                            ...formData,
                            role: role
                          })
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Platform Roles Section */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-2 tracking-wider">Platform Admin Roles</p>
                  <div className="grid gap-2">
                    {bankRoles.map((role) => (
                      <RoleItem
                        key={role}
                        role={role}
                        checked={formData.role.includes(role)}
                        onChange={(checked) => {
                          setFormData({
                            ...formData,
                            role: role
                          })
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t">
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button variant="gold" type="submit">
                  {selectedUser ? "Update User" : "Create User"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

/* --------------------------- HELPER COMPONENTS ---------------------------- */

const RoleItem = ({ role, checked, onChange }: { role: AppRole, checked: boolean, onChange: (v: boolean) => void }) => (
  <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
    <Checkbox id={role} checked={checked} onCheckedChange={(v) => onChange(!!v)} className="mt-1" />
    <div className="grid gap-0.5">
      <label htmlFor={role} className="text-sm font-semibold leading-none flex items-center gap-2 cursor-pointer">
        {roleConfig[role].label}

      </label>
      <p className="text-xs text-muted-foreground">{roleConfig[role].description}</p>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: number }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-xl p-4 flex items-center gap-4">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">{label}</p>
    </div>
  </motion.div>
);

function useEffect(arg0: () => Promise<() => void>, arg1: undefined[]) {
  throw new Error("Function not implemented.");
}
