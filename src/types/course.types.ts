import { Room } from "./room.types";
import { ClassGroup, Semestre, Subject, Teacher, TimeSlot } from "./academic.types";

export interface Course {
  IdCours: number;
  IdMatiere: number;
  IdProfesseur: number;
  IdClasse: number;
  IdSalle: number;
  IdSemestre: number;
  TypeCours: string;
  Statut?: string;
  Matiere?: Subject;
  Professeur?: Teacher;
  Classe?: ClassGroup;
  Salle?: Room;
  Semestre?: Semestre;
  Creneaux?: TimeSlot[];
}

export interface TimetableFilters {
  classeId?: number;
  profId?: number;
  salleId?: number;
}
