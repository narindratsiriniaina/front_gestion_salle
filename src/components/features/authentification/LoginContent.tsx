"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Network, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { authService } from "@/services/auth.service";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Veuillez saisir une adresse email valide"),
  password: z.string().min(1, "Veuillez saisir votre mot de passe"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data.email, data.password);
      
      localStorage.setItem("user", JSON.stringify({
        id: response.IdUtilisateur,
        email: response.Email,
        role: response.Role
      }));

      toast.success("Connexion réussie !", {
        description: `Bienvenue, rôle : ${response.Role}`,
      });

      router.push("/dashboard");
      
      setTimeout(() => {
        router.refresh();
      }, 100);
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      toast.error("Échec de la connexion", {
        description: "Email ou mot de passe incorrect.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f8fafc] overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#17203A]/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#73A5D4]/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl shadow-[#17203A]/5">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#17203A] rounded-2xl flex items-center justify-center shadow-lg shadow-[#17203A]/35 mb-4">
            <Network className="text-[#73A5D4] w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-[#17203A] tracking-tight">Portail Académique EMIT</h2>
          <p className="text-sm text-gray-500 mt-1">Connectez-vous pour gérer votre emploi du temps</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Adresse Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail size={16} />
              </span>
              <input
                {...register("email")}
                type="email"
                placeholder="Ex: admin@emit.mg"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#17203A] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17203A]/20 focus:border-[#17203A] transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-bold mt-1 px-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Mot de passe</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock size={16} />
              </span>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#17203A] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17203A]/20 focus:border-[#17203A] transition-all"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-bold mt-1 px-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#17203A] hover:bg-[#12192B] text-white py-3.5 px-4 rounded-xl text-sm font-bold shadow-lg shadow-[#17203A]/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <>
                Se connecter
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#73A5D4]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="font-bold text-[#17203A] hover:text-[#73A5D4] underline">
              S'inscrire
            </Link>
          </p>
          <p className="text-xs text-gray-400 font-medium">Comptes de test (mot de passe libre) :</p>
          <div className="mt-2 flex flex-col gap-1 text-[11px] font-bold text-gray-500">
            <div>Admin : <span className="text-[#17203A] underline">admin@emit.mg</span></div>
            <div>Enseignant : <span className="text-[#17203A] underline">demandeur@emit.mg</span></div>
            <div>Validateur : <span className="text-[#17203A] underline">validateur@emit.mg</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
