"use client";

import { ListFilter, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TimetableRequest } from "@/types/request.types";

interface RecentRequestsTableProps {
  demandes: TimetableRequest[];
}

export function RecentRequestsTable({ demandes }: RecentRequestsTableProps) {
  // Helpers to map backend French status to styles
  const getStatusConfig = (statut: string) => {
    const s = statut?.toLowerCase();
    if (s === "validée" || s === "validee" || s === "approved") {
      return { label: "Approved", color: "bg-green-500" };
    }
    if (s === "refusée" || s === "refusee" || s === "rejected") {
      return { label: "Rejected", color: "bg-red-500" };
    }
    return { label: "Pending", color: "bg-amber-500" };
  };

  return (
    <Card className="border-none shadow-sm bg-white h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-6">
        <CardTitle className="text-xl font-bold text-[#001f3f]">Recent Requests</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#001f3f]"><ListFilter size={18} /></Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#001f3f]"><Download size={18} /></Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-8">Reference</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Type</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Justification</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pr-8">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demandes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500 pl-8">
                  Aucune requête récente.
                </TableCell>
              </TableRow>
            ) : (
              demandes.map((req, i) => {
                const statusConfig = getStatusConfig(req.Statut);
                const subject = req.Cours?.Matiere?.NomMatiere || `Salle ${req.IdSalle || ""}`;
                return (
                  <TableRow key={req.IdDemande || i} className="group hover:bg-gray-50 border-b border-gray-50">
                    <TableCell className="font-bold text-gray-900 py-6 pl-8">REQ-{req.IdDemande}</TableCell>
                    <TableCell className="text-sm text-gray-600">{req.TypeDemande}</TableCell>
                    <TableCell className="font-medium text-gray-800">{subject}</TableCell>
                    <TableCell className="text-sm text-gray-500 truncate max-w-[200px]">{req.Justification || "-"}</TableCell>
                    <TableCell className="pr-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${statusConfig.color}`} />
                          <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">{statusConfig.label}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 h-8 w-8"><MoreHorizontal size={14} /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[11px] text-gray-400">Showing {demandes.length} requests</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="px-4 h-9 text-[11px] font-bold">Previous</Button>
            <Button variant="outline" size="sm" className="px-4 h-9 text-[11px] font-bold">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
