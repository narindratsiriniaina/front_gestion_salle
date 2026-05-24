"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { courseService } from "@/services/course.service";
import { subjectService } from "@/services/subject.service";
import { Course } from "@/types/course.types";
import { Subject } from "@/types/academic.types";

export default function CoursContent() {
  const [activeTab, setActiveTab] = useState("matieres");
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjectForm, setSubjectForm] = useState<Partial<Subject>>({
    CodeMatiere: "",
    NomMatiere: "",
    Credit: 0,
    IdFiliere: 1, // Default/placeholder
    IdRefSemestre: 1, // Default/placeholder
  });

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    IdMatiere: 0,
    IdProfesseur: 0,
    IdClasse: 0,
    IdSalle: 0,
    IdSemestre: 0,
    TypeCours: "CM",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [coursesData, subjectsData] = await Promise.all([
        courseService.getCourses(),
        subjectService.getSubjects(),
      ]);
      setCourses(coursesData);
      setSubjects(subjectsData);
    } catch (error) {
      toast.error("Erreur lors du chargement des données");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSubject) {
        await subjectService.updateSubject(editingSubject.IdMatiere, {
          ...editingSubject,
          ...subjectForm,
        } as Subject);
        toast.success("Matière mise à jour avec succès");
      } else {
        await subjectService.createSubject(subjectForm as Subject);
        toast.success("Matière créée avec succès");
      }
      setIsSubjectModalOpen(false);
      setEditingSubject(null);
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de la matière");
      console.error(error);
    }
  };

  const handleDeleteSubject = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette matière ?")) return;
    try {
      await subjectService.deleteSubject(id);
      toast.success("Matière supprimée avec succès");
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de la suppression de la matière");
      console.error(error);
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await courseService.scheduleCourse(courseForm as Omit<Course, "IdCours">);
      toast.success("Cours planifié avec succès");
      setIsCourseModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de la planification du cours");
      console.error(error);
    }
  };

  const handleValidateCourse = async (id: number) => {
    try {
      await courseService.validateCourse(id);
      toast.success("Cours validé");
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de la validation du cours");
    }
  };

  const handleCancelCourse = async (id: number) => {
    try {
      await courseService.cancelCourse(id);
      toast.success("Cours annulé");
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de l'annulation du cours");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Cours & Matières</h1>
          <p className="text-gray-500">Gérez les matières et planifiez les cours</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="matieres">Matières</TabsTrigger>
          <TabsTrigger value="cours">Cours Planifiés</TabsTrigger>
        </TabsList>

        <TabsContent value="matieres" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setEditingSubject(null);
                setSubjectForm({ CodeMatiere: "", NomMatiere: "", Credit: 0, IdFiliere: 1, IdRefSemestre: 1 });
                setIsSubjectModalOpen(true);
              }}
              className="bg-[#17203A] hover:bg-[#2a3655]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une matière
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Crédits</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.IdMatiere}>
                    <TableCell className="font-medium">{subject.CodeMatiere}</TableCell>
                    <TableCell>{subject.NomMatiere}</TableCell>
                    <TableCell>{subject.Credit}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingSubject(subject);
                            setSubjectForm(subject);
                            setIsSubjectModalOpen(true);
                          }}
                        >
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSubject(subject.IdMatiere)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!isLoading && subjects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      Aucune matière trouvée
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="cours" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setCourseForm({ IdMatiere: subjects[0]?.IdMatiere || 0, IdProfesseur: 0, IdClasse: 0, IdSalle: 0, IdSemestre: 0, TypeCours: "CM" });
                setIsCourseModalOpen(true);
              }}
              className="bg-[#17203A] hover:bg-[#2a3655]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Planifier un cours
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matière</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.IdCours}>
                    <TableCell className="font-medium">
                      {course.Matiere?.NomMatiere || `Matière #${course.IdMatiere}`}
                    </TableCell>
                    <TableCell>{course.TypeCours}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.Statut === "validé" ? "bg-green-100 text-green-700" :
                        course.Statut === "annulé" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {course.Statut || "en attente"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {(!course.Statut || course.Statut === "en attente") && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Valider"
                              onClick={() => handleValidateCourse(course.IdCours)}
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Annuler"
                              onClick={() => handleCancelCourse(course.IdCours)}
                            >
                              <XCircle className="w-4 h-4 text-red-600" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!isLoading && courses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      Aucun cours trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal Matière */}
      <Dialog open={isSubjectModalOpen} onOpenChange={setIsSubjectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSubject ? "Modifier la matière" : "Ajouter une matière"}
            </DialogTitle>
            <DialogDescription>
              Veuillez remplir les informations de la matière.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubjectSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Code</Label>
              <Input
                required
                value={subjectForm.CodeMatiere}
                onChange={(e) => setSubjectForm({ ...subjectForm, CodeMatiere: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                required
                value={subjectForm.NomMatiere}
                onChange={(e) => setSubjectForm({ ...subjectForm, NomMatiere: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Crédits</Label>
              <Input
                type="number"
                required
                value={subjectForm.Credit}
                onChange={(e) => setSubjectForm({ ...subjectForm, Credit: parseInt(e.target.value) || 0 })}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsSubjectModalOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-[#17203A] hover:bg-[#2a3655]">
                {editingSubject ? "Modifier" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Cours */}
      <Dialog open={isCourseModalOpen} onOpenChange={setIsCourseModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Planifier un cours</DialogTitle>
            <DialogDescription>
              Veuillez remplir les informations pour planifier le cours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCourseSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Matière</Label>
              <select
                className="w-full border rounded-md p-2"
                required
                value={courseForm.IdMatiere}
                onChange={(e) => setCourseForm({ ...courseForm, IdMatiere: parseInt(e.target.value) })}
              >
                <option value={0} disabled>Sélectionner une matière</option>
                {subjects.map(s => (
                  <option key={s.IdMatiere} value={s.IdMatiere}>{s.NomMatiere}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Type de cours</Label>
              <select
                className="w-full border rounded-md p-2"
                required
                value={courseForm.TypeCours}
                onChange={(e) => setCourseForm({ ...courseForm, TypeCours: e.target.value })}
              >
                <option value="CM">Cours Magistral (CM)</option>
                <option value="TD">Travaux Dirigés (TD)</option>
                <option value="TP">Travaux Pratiques (TP)</option>
              </select>
            </div>
            {/* Note: In a real app, we'd add fields for Professeur, Classe, Salle, Semestre here */}
            <div className="space-y-2">
              <Label>ID Professeur (démo)</Label>
              <Input
                type="number"
                required
                value={courseForm.IdProfesseur || ""}
                onChange={(e) => setCourseForm({ ...courseForm, IdProfesseur: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>ID Classe (démo)</Label>
              <Input
                type="number"
                required
                value={courseForm.IdClasse || ""}
                onChange={(e) => setCourseForm({ ...courseForm, IdClasse: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>ID Salle (démo)</Label>
              <Input
                type="number"
                required
                value={courseForm.IdSalle || ""}
                onChange={(e) => setCourseForm({ ...courseForm, IdSalle: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>ID Semestre (démo)</Label>
              <Input
                type="number"
                required
                value={courseForm.IdSemestre || ""}
                onChange={(e) => setCourseForm({ ...courseForm, IdSemestre: parseInt(e.target.value) || 0 })}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCourseModalOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-[#17203A] hover:bg-[#2a3655]">
                Planifier
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
