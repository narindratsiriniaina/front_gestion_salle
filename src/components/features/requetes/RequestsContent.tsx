"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubmitRequestForm, RequestsSummaryCards } from "@/components/features/requetes/RequestForm";
import { RecentRequestsTable } from "@/components/features/requetes/RecentRequestsTable";
import { TimetableRequest } from "@/types/request.types";
import { requestService } from "@/services/request.service";

export function RequestsContent() {
  const [demandes, setDemandes] = useState<TimetableRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDemandes = async () => {
    try {
      setLoading(true);
      const data = await requestService.getRequests();
      setDemandes(data);
    } catch (err) {
      console.error("Failed to load demandes", err);
      setError("Erreur lors de la récupération des requêtes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#001f3f] tracking-tight">Request Portal</h1>
          <p className="text-gray-500 mt-1">Manage and track your schedule modifications or facility reservations.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-[#001f3f] animate-spin" />
          <span className="ml-2 text-gray-500 font-bold">Chargement des requêtes...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 font-semibold">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 h-full">
              <SubmitRequestForm onSubmitted={fetchDemandes} />
            </div>
            <div className="lg:col-span-7 h-full">
              <RecentRequestsTable demandes={demandes} />
            </div>
          </div>

          <RequestsSummaryCards demandes={demandes} />
        </>
      )}
    </div>
  );
}
