"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Network, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { authService } from "@/services/auth.service";
import Link from "next/link";

const registerSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prénom requis"),
  email: z.string().email("Email invalide"),
  role: z.enum(["admin", "demandeur", "validateur"]),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      role: "demandeur",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await authService.register({
        Nom: data.nom,
        Prenom: data.prenom,
        Email: data.email,
        Role: data.role
      });
      
      toast.success("Inscription réussie !", {
        description: `Vous pouvez maintenant vous connecter.`,
      });

      router.push("/connexion");
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      toast.error("Échec de l'inscription", {
        description: "Veuillez vérifier vos informations.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f8fafc] overflow-hidden py-12">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#17203A]/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#73A5D4]/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl shadow-[#17203A]/5">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#17203A] rounded-2xl flex items-center justify-center shadow-lg shadow-[#17203A]/35 mb-4">
            <Network className="text-[#73A5D4] w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-[#17203A] tracking-tight">Inscription EMIT</h2>
          <p className="text-sm text-gray-500 mt-1">Créez votre compte académique</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Nom</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <User size={16} />
                </span>
                <input
                  {...register("nom")}
                  type="text"
                  placeholder="Nom"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#17203A] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17203A]/20 focus:border-[#17203A] transition-all"
                />
              </div>
              {errors.nom && <p className="text-xs text-red-500 font-bold mt-1 px-1">{errors.nom.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Prénom</label>
              <input
                {...register("prenom")}
                type="text"
                placeholder="Prénom"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#17203A] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17203A]/20 focus:border-[#17203A] transition-all"
              />
              {errors.prenom && <p className="text-xs text-red-500 font-bold mt-1 px-1">{errors.prenom.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Adresse Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail size={16} />
              </span>
              <input
                {...register("email")}
                type="email"
                placeholder="Ex: jean@emit.mg"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#17203A] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17203A]/20 focus:border-[#17203A] transition-all"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 font-bold mt-1 px-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Rôle</label>
            <select
              {...register("role")}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#17203A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#17203A]/20 focus:border-[#17203A] transition-all"
            >
              <option value="demandeur">Enseignant (Demandeur)</option>
              <option value="validateur">Chef de mention (Validateur)</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#17203A] hover:bg-[#12192B] text-white py-3.5 px-4 rounded-xl text-sm font-bold shadow-lg shadow-[#17203A]/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <>
                S'inscrire
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#73A5D4]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Vous avez déjà un compte ?{" "}
            <Link href="/connexion" className="font-bold text-[#17203A] hover:text-[#73A5D4] underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
