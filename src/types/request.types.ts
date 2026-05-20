import { User } from "./user.types";
import { Room } from "./room.types";
import { Course } from "./course.types";

export interface TimetableRequest {
  IdDemande: number;
  IdDemandeur: number;
  IdValidateur?: number;
  IdCours?: number;
  IdSalle?: number;
  TypeDemande: string;
  Statut: string;
  Justification?: string;
  Demandeur?: User;
  Validateur?: User;
  Salle?: Room;
  Cours?: Course;
}
