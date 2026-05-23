"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AcademicHierarchy } from "@/components/features/structures/AcademicHierarchy";
import { AcademicCycles, CapacitéCard } from "@/components/features/structures/CycleCards";
import { FacultyDirectory } from "@/components/features/structures/FacultyDirectory";

export function StructuresContent() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#17203A] tracking-tight">Configuration Académique</h1>
          <p className="text-gray-500 mt-1">Gérez les hiérarchies institutionnelles et les cycles académiques.</p>
        </div>
        <Button variant="outline" className="gap-2 border-gray-300 shadow-sm bg-white">
          <Download className="w-4 h-4" /> Exporter les données
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AcademicHierarchy />
        </div>
        <div className="space-y-8">
          <AcademicCycles />
          <CapacitéCard />
        </div>
      </div>

      <FacultyDirectory />
    </div>
  );
}
