"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCustomersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editVerified, setEditVerified] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/admin/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.filter((u: User) => u.role !== "admin"));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditUser(user);
    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditVerified(user.isVerified);
    setShowEdit(true);
  };

  const handleEditSave = async () => {
    if (!editUser) return;
    setEditLoading(true);
    setEditError("");
    try {
      const res = await fetch(`/api/admin/users/${editUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: editUsername, email: editEmail, isVerified: editVerified }),
      });
      if (!res.ok) throw new Error("Failed to update user");
      setUsers(users.map(u => u._id === editUser._id ? { ...u, username: editUsername, email: editEmail, isVerified: editVerified } : u));
      setShowEdit(false);
    } catch (err: any) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (user: User) => {
    if (!window.confirm(`Delete user ${user.username}?`)) return;
    try {
      const res = await fetch(`/api/admin/users/${user._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter(u => u._id !== user._id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted dark:bg-gray-950 py-12 px-4">
      <Card className="w-full max-w-4xl shadow-lg border dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-2xl">Customers (Non-Admin Users)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : users.length === 0 ? (
            <div>No customers found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Username</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Verified</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Created At</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{user.username}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{user.email}</td>
                      <td className="px-4 py-3 text-sm">
                        {user.isVerified ? (
                          <Badge variant="default" className="dark:bg-black dark:text-white">Verified</Badge>
                        ) : (
                          <Badge variant="destructive">Not Verified</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="px-4 py-3 text-sm flex gap-2">
                        <Dialog open={showEdit && editUser?._id === user._id} onOpenChange={setShowEdit}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary" onClick={() => handleEdit(user)}>Edit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <input className="w-full border rounded px-3 py-2" value={editUsername} onChange={e => setEditUsername(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input className="w-full border rounded px-3 py-2" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Verified</label>
                                <select className="w-full border rounded px-3 py-2" value={editVerified ? "yes" : "no"} onChange={e => setEditVerified(e.target.value === "yes")}> <option value="yes">Yes</option> <option value="no">No</option> </select>
                              </div>
                              {editError && <div className="text-red-600 text-sm">{editError}</div>}
                            </div>
                            <DialogFooter>
                              <Button onClick={handleEditSave} disabled={editLoading}>{editLoading ? "Saving..." : "Save"}</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(user)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 