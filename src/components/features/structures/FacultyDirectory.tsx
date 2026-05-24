"use client";

import { useEffect, useState } from "react";
import { Filter, UserPlus, MoreVertical, Mail, Phone, Plus, Trash2, Edit2, Loader2, MoreHorizontal } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { teacherService } from "@/services/teacher.service";
import { Teacher } from "@/types/academic.types";
import { toast } from "sonner";

export function FacultyDirectory() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Form states
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const data = await teacherService.getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Erreur chargement enseignants:", error);
      toast.error("Impossible de charger les enseignants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !prenom || !email) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setSaving(true);
      await teacherService.createTeacher({
        Nom: nom,
        Prenom: prenom,
        Email: email,
        Telephone: telephone || undefined
      });
      toast.success("Enseignant ajouté avec succès !");
      setIsAddOpen(false);
      // Reset fields
      setNom("");
      setPrenom("");
      setEmail("");
      setTelephone("");
      fetchTeachers();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout de l'enseignant.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher || !nom || !prenom || !email) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setSaving(true);
      await teacherService.updateTeacher(selectedTeacher.IdProfesseur, {
        IdProfesseur: selectedTeacher.IdProfesseur,
        Nom: nom,
        Prenom: prenom,
        Email: email,
        Telephone: telephone || undefined
      });
      toast.success("Enseignant mis à jour avec succès !");
      setIsEditOpen(false);
      setSelectedTeacher(null);
      fetchTeachers();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour de l'enseignant.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet enseignant ?")) return;

    try {
      await teacherService.deleteTeacher(id);
      toast.success("Enseignant supprimé avec succès.");
      fetchTeachers();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression de l'enseignant.");
    }
  };

  const openEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setNom(teacher.Nom);
    setPrenom(teacher.Prenom);
    setEmail(teacher.Email);
    setTelephone(teacher.Telephone || "");
    setIsEditOpen(true);
  };

  const openAdd = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setTelephone("");
    setIsAddOpen(true);
  };

  return (
    <Card className="shadow-sm border-none bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <div>
          <CardTitle className="text-xl font-bold text-[#17203A]">Annuaire des Enseignants</CardTitle>
          <p className="text-sm text-gray-500">Registre des professeurs, spécialités et coordonnées.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={openAdd} className="bg-[#17203A] hover:bg-[#12192B] gap-2">
            <UserPlus className="w-4 h-4" /> Ajouter un Enseignant
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-[#17203A] animate-spin" />
            <span className="ml-2 text-gray-500">Chargement des enseignants...</span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-gray-50/50">
                <TableHead className="w-[300px] uppercase text-[10px] font-bold tracking-wider text-gray-500">Enseignant</TableHead>
                <TableHead className="uppercase text-[10px] font-bold tracking-wider text-gray-500">Email</TableHead>
                <TableHead className="uppercase text-[10px] font-bold tracking-wider text-gray-500">Contact</TableHead>
                <TableHead className="pr-8 text-right uppercase text-[10px] font-bold tracking-wider text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    Aucun enseignant trouvé.
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((member) => (
                  <TableRow key={member.IdProfesseur} className="group hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                          <AvatarFallback className="bg-blue-100 text-blue-900 font-bold">
                            {member.Nom ? member.Nom[0] : ""}{member.Prenom ? member.Prenom[0] : ""}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-[#17203A]">{member.Nom} {member.Prenom}</p>
                          <p className="text-xs text-gray-500">Professeur</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-blue-900/80">{member.Email}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{member.Telephone || "Non spécifié"}</span>
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
                            onClick={() => openEdit(member)}
                            className="flex items-center gap-2 p-2 focus:bg-blue-50 focus:text-blue-700 rounded-lg cursor-pointer font-medium"
                          >
                            <Edit2 className="w-4 h-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(member.IdProfesseur)}
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
        
        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <p className="text-xs text-gray-500">Total : {teachers.length} Enseignant(s)</p>
        </div>
      </CardContent>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-5xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-[#17203A] font-bold text-xl">Ajouter un Enseignant</DialogTitle>
            <DialogDescription>
              Entrez les informations de l'enseignant pour l'ajouter à l'annuaire.
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
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nom@emit.mg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="+261 34 ..." />
            </div>
            <Button type="submit" disabled={saving} className="w-full bg-[#17203A] hover:bg-[#12192B] text-white">
              {saving ? "Enregistrement..." : "Ajouter l'Enseignant"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-5xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-[#17203A] font-bold text-xl">Modifier l'Enseignant</DialogTitle>
            <DialogDescription>
              Mettez à jour les informations de l'enseignant sélectionné.
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
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nom@emit.mg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="+261 34 ..." />
            </div>
            <Button type="submit" disabled={saving} className="w-full bg-[#17203A] hover:bg-[#12192B] text-white">
              {saving ? "Modification..." : "Modifier l'Enseignant"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
