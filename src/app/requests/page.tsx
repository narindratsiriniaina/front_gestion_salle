"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubmitRequestForm, RequestsSummaryCards } from "@/components/features/requests/RequestForm";
import { RecentRequestsTable } from "@/components/features/requests/RecentRequestsTable";

export default function RequestsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#001f3f] tracking-tight">Request Portal</h1>
          <p className="text-gray-500 mt-1">Manage and track your schedule modifications or facility reservations.</p>
        </div>
        <Button className="bg-[#001f3f] hover:bg-[#001429] gap-2">
          <Plus className="w-4 h-4" /> New Request
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 h-full">
          <SubmitRequestForm />
        </div>
        <div className="lg:col-span-7 h-full">
          <RecentRequestsTable />
        </div>
      </div>

      <RequestsSummaryCards />
    </div>
  );
}
