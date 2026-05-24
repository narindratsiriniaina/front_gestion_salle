export interface StoredUser {
  id: number;
  email: string;
  role: "admin" | "demandeur" | "validateur";
  nom?: string;
  prenom?: string;
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}
