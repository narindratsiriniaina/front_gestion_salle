export interface Filiere {
  IdFiliere: number;
  IdMention: number;
  CodeFiliere?: string;
  NomFiliere?: string;
}

export interface RefSemestre {
  IdRefSemestre: number;
  NomSemestre?: string;
}

export interface Semestre {
  IdSemestre: number;
  IdRefSemestre: number;
  IdAnnee: number;
  DateDebut: string;
  DateFin: string;
  RefSemestre?: RefSemestre;
}

export interface ClassGroup {
  IdClasse: number;
  IdFiliere: number;
  IdSemestre: number;
  NomClasse: string;
  Filiere?: Filiere;
  Semestre?: Semestre;
}

export interface Subject {
  IdMatiere: number;
  IdFiliere: number;
  CodeMatiere?: string;
  NomMatiere?: string;
  IdRefSemestre: number;
  Credit: number;
  Filiere?: Filiere;
  RefSemestre?: RefSemestre;
}

export interface Teacher {
  IdProfesseur: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone?: string;
}

export interface TimeSlot {
  IdCreneau: number;
  IdCours: number;
  JourSemaine?: string;
  HeureDebut: string;
  HeureFin: string;
  SemaineType?: string;
}
