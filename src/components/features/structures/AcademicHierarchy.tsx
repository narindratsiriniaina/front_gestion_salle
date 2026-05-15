"use client";

import { Plus, Edit2, ChevronDown, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const departments = [
  {
    id: 1,
    name: "Management & Innovation",
    initial: "M",
    color: "bg-blue-900",
    programs: 3,
    levels: 6,
    subPrograms: [
      { name: "Digital Transformation", levels: ["L1", "L2", "L3"] },
      { name: "Business Intelligence", levels: ["M1", "M2"] },
    ],
  },
  {
    id: 2,
    name: "Technology & Engineering",
    initial: "T",
    color: "bg-indigo-900",
    programs: 2,
    levels: 5,
    subPrograms: [],
  },
];

export function AcademicHierarchy() {
  return (
    <Card className="shadow-sm border-none bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Network className="w-5 h-5 text-blue-900" />
          </div>
          <CardTitle className="text-xl font-bold text-[#001f3f]">Hiérarchie Institutionnelle</CardTitle>
        </div>
        <Button className="bg-[#001f3f] hover:bg-[#001429] gap-2">
          <Plus className="w-4 h-4" /> Add Level
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.id} className="border rounded-xl p-6 transition-all hover:border-blue-200 hover:shadow-md group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={dept.color + " w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"}>
                  {dept.initial}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{dept.name}</h3>
                  <p className="text-sm text-gray-500">{dept.programs} Filières • {dept.levels} Niveaux</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-900">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <ChevronDown className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {dept.subPrograms.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-8 border-t pt-6">
                {dept.subPrograms.map((sub) => (
                  <div key={sub.name}>
                    <p className="text-xs font-semibold text-amber-600 uppercase mb-3">{sub.name}</p>
                    <div className="flex gap-2">
                      {sub.levels.map((lvl) => (
                        <Badge key={lvl} variant="secondary" className="bg-blue-50 text-blue-900 hover:bg-blue-100 border-none font-medium px-3">
                          {lvl}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
