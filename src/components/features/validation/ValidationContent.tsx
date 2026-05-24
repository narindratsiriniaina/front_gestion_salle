"use client";

import { PendingRequests } from "@/components/features/validation/PendingRequests";
import { ValidationStats, RecentHistory } from "@/components/features/validation/ValidationSidebar";

export function ValidationContent() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-[#17203A] tracking-tight">Portail de Validation</h1>
        <p className="text-gray-500 mt-1">Gérer et examiner les demandes de modification institutionnelle en attente.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PendingRequests />
        </div>
        <div className="space-y-8">
          <ValidationStats />
          <RecentHistory />
        </div>
      </div>
    </div>
  );
}
