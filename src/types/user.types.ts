export interface User {
  IdUtilisateur: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Role: 'admin' | 'demandeur' | 'validateur';
}
