"use client";

import { useState } from "react";
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Database, 
  Globe, 
  ShieldCheck,
  Save,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function SettingsContent() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Paramètres enregistrés avec succès !");
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-[#17203A] tracking-tight">Paramètres du Système</h1>
        <p className="text-gray-500 mt-1">Configurez les préférences globales et la sécurité de votre plateforme.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <TabsList className="flex flex-col h-auto bg-transparent border-none gap-2 p-0">
              <TabsTrigger 
                value="general" 
                className="w-full justify-start gap-3 px-4 py-3 h-auto data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 data-[state=active]:shadow-none rounded-xl font-bold transition-all border border-transparent data-[state=active]:border-blue-100"
              >
                <Settings className="w-4 h-4" /> Général
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="w-full justify-start gap-3 px-4 py-3 h-auto data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 data-[state=active]:shadow-none rounded-xl font-bold transition-all border border-transparent data-[state=active]:border-blue-100"
              >
                <Lock className="w-4 h-4" /> Sécurité
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="w-full justify-start gap-3 px-4 py-3 h-auto data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 data-[state=active]:shadow-none rounded-xl font-bold transition-all border border-transparent data-[state=active]:border-blue-100"
              >
                <Bell className="w-4 h-4" /> Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="display" 
                className="w-full justify-start gap-3 px-4 py-3 h-auto data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 data-[state=active]:shadow-none rounded-xl font-bold transition-all border border-transparent data-[state=active]:border-blue-100"
              >
                <Palette className="w-4 h-4" /> Affichage
              </TabsTrigger>
            </TabsList>
          </aside>

          <main className="flex-1">
            <TabsContent value="general" className="mt-0 space-y-6">
              <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#17203A]">Informations Institutionnelles</CardTitle>
                  <CardDescription>Détails affichés sur les rapports et en-têtes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="inst-name">Nom de l'Institution</Label>
                      <Input id="inst-name" defaultValue="EMIT - Université de Fianarantsoa" className="h-11 border-gray-100 bg-gray-50/30 font-medium px-4" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inst-short">Abréviation</Label>
                      <Input id="inst-short" defaultValue="EMIT" className="h-11 border-gray-100 bg-gray-50/30 font-medium px-4" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inst-address">Adresse du Campus</Label>
                    <Input id="inst-address" defaultValue="Andrainjato, Fianarantsoa 301, Madagascar" className="h-11 border-gray-100 bg-gray-50/30 font-medium px-4" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#17203A]">Délais et Calendriers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-blue-50/30 rounded-xl border border-blue-50">
                    <div>
                      <p className="font-bold text-[#17203A]">Année Universitaire Actuelle</p>
                      <p className="text-xs text-blue-900/60 font-medium">Session en cours pour les emplois du temps.</p>
                    </div>
                    <Badge className="bg-blue-900 text-white font-bold h-8 px-4">2023 - 2024</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0 space-y-6">
              <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#17203A]">Contrôle d'Accès</CardTitle>
                  <CardDescription>Gérez l'authentification et les tentatives de connexion.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-bold text-gray-900">Double Authentification (2FA)</Label>
                      <p className="text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                    </div>
                    <div className="h-6 w-11 bg-gray-200 rounded-full relative cursor-pointer outline-none">
                       <div className="h-5 w-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm transition-transform" />
                    </div>
                  </div>
                  <div className="pt-6 border-t font-semibold text-red-600 cursor-pointer hover:underline text-sm flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4" /> Réinitialiser tous les mots de passe des utilisateurs
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0 space-y-6">
               <Card className="border-none shadow-sm bg-white p-8 text-center text-gray-500 min-h-[300px] flex flex-col items-center justify-center">
                  <Bell className="w-12 h-12 mb-4 text-gray-200" />
                  <p className="font-bold text-[#17203A]">Notifications par Email</p>
                  <p className="text-sm max-w-xs mt-2">La passerelle SMTP sera bientôt disponible pour envoyer des alertes automatiques.</p>
               </Card>
            </TabsContent>

            <div className="mt-8 flex justify-end">
               <Button 
                onClick={handleSave} 
                disabled={saving}
                className="bg-[#17203A] hover:bg-[#12192B] px-10 h-14 rounded-2xl gap-2 font-bold shadow-xl shadow-blue-900/10"
               >
                 {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                 {saving ? "Enregistrement..." : "Enregistrer les modifications"}
               </Button>
            </div>
          </main>
        </div>
      </Tabs>
    </div>
  );
}
