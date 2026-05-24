"use client";

import { useEffect, useState } from "react";
import { Users, UserPlus, Trash2, Edit2, Loader2, Mail, Shield, MoreVertical, MoreHorizontal, Settings, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { authService } from "@/services/auth.service";
import { User } from "@/types/user.types";
import { toast } from "sonner";

export function UsersContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form states
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'admin' | 'demandeur' | 'validateur'>("demandeur");
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await authService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erreur chargement utilisateurs:", error);
      toast.error("Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !prenom || !email) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setSaving(true);
      await authService.register({
        Nom: nom,
        Prenom: prenom,
        Email: email,
        Role: role,
      });
      toast.success("Utilisateur créé avec succès !");
      setIsAddOpen(false);
      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      setRole("demandeur");
      fetchUsers();
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.Message || error.message;
      toast.error("Erreur de création", { description: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !nom || !prenom || !email) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setSaving(true);
      await authService.updateUser(selectedUser.IdUtilisateur, {
        IdUtilisateur: selectedUser.IdUtilisateur,
        Nom: nom,
        Prenom: prenom,
        Email: email,
        Role: role,
      });
      toast.success("Utilisateur mis à jour avec succès !");
      setIsEditOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.Message || error.message;
      toast.error("Erreur de modification", { description: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
      await authService.deleteUser(id);
      toast.success("Utilisateur supprimé avec succès.");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setNom(user.Nom || "");
    setPrenom(user.Prenom || "");
    setEmail(user.Email || "");
    setRole(user.Role);
    setIsEditOpen(true);
  };

  const openAdd = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setPassword("");
    setRole("demandeur");
    setIsAddOpen(true);
  };

  const getRoleBadge = (userRole: string) => {
    switch (userRole?.toLowerCase()) {
      case "admin":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-bold">Administrateur</Badge>;
      case "validateur":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-bold">Validateur (Chef de mention)</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none font-bold">Demandeur (Enseignant)</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#17203A] tracking-tight">Gestion des Utilisateurs</h1>
          <p className="text-gray-500 mt-1">Gérer les comptes, rôles et accès des utilisateurs de la plateforme.</p>
        </div>
        <Button onClick={openAdd} className="bg-[#17203A] hover:bg-[#12192B] gap-2 font-bold h-11 px-6">
          <UserPlus className="w-4 h-4" /> Créer un Utilisateur
        </Button>
      </div>

      <Card className="shadow-sm border-none bg-white">
        <CardHeader className="border-b border-gray-50 pb-6">
          <CardTitle className="text-xl font-bold text-[#17203A]">Liste des Utilisateurs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-8 h-8 text-[#17203A] animate-spin" />
              <span className="ml-2 text-gray-500 font-bold">Chargement des utilisateurs...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="pl-8 uppercase text-[10px] font-bold tracking-widest text-gray-400">Nom Complet</TableHead>
                  <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Email</TableHead>
                  <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Rôle</TableHead>
                  <TableHead className="pr-8 text-right uppercase text-[10px] font-bold tracking-widest text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500 font-medium">
                      Aucun utilisateur enregistré.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.IdUtilisateur} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="pl-8 font-bold text-[#17203A] py-5">
                        {user.Nom} {user.Prenom}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <span className="flex items-center gap-1.5"><Mail size={14} className="text-gray-400" /> {user.Email}</span>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1.5"><Shield size={14} className="text-gray-400" /> {getRoleBadge(user.Role)}</span>
                      </TableCell>
                      <TableCell className="pr-8 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-9 w-9 p-0 border border-gray-200 hover:bg-gray-100 rounded-full shadow-sm">
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border shadow-xl rounded-xl p-2 min-w-[160px]">
                            <DropdownMenuLabel className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1.5">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-100" />
                            <DropdownMenuItem 
                              onClick={() => openEdit(user)}
                              className="flex items-center gap-2 p-2 focus:bg-blue-50 focus:text-blue-700 rounded-lg cursor-pointer font-medium"
                            >
                              <Edit2 className="w-4 h-4" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(user.IdUtilisateur)}
                              className="flex items-center gap-2 p-2 focus:bg-red-50 focus:text-red-700 rounded-lg cursor-pointer font-medium"
                            >
                              <Trash2 className="w-4 h-4" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-5xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-[#17203A] font-bold text-xl">Créer un Utilisateur</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire pour ajouter un nouvel utilisateur au système.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <Input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <Input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple@emit.mg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rôle *</label>
              <Select value={role} onValueChange={(val: any) => setRole(val)}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Sélectionnez le rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demandeur">Demandeur (Enseignant)</SelectItem>
                  <SelectItem value="validateur">Validateur (Chef de mention)</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={saving} className="w-full h-12 bg-[#17203A] hover:bg-[#12192B] text-white font-bold">
              {saving ? "Enregistrement..." : "Créer l'Utilisateur"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-5xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-[#17203A] font-bold text-xl">Modifier l'Utilisateur</DialogTitle>
            <DialogDescription>
              Mettez à jour les informations du compte utilisateur sélectionné.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <Input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <Input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple@emit.mg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rôle *</label>
              <Select value={role} onValueChange={(val: any) => setRole(val)}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Sélectionnez le rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demandeur">Demandeur (Enseignant)</SelectItem>
                  <SelectItem value="validateur">Validateur (Chef de mention)</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={saving} className="w-full h-12 bg-[#17203A] hover:bg-[#12192B] text-white font-bold">
              {saving ? "Modification..." : "Enregistrer les modifications"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
