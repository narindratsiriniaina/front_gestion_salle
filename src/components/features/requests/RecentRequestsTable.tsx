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
import { Badge } from "@/components/ui/badge";

const recentRequests = [
  { ref: "REQ-2024-081", type: "Modification", subject: "Advanced Algorithms", date: "Oct 24, 09:00", status: "Pending" },
  { ref: "REQ-2024-079", type: "Reservation", subject: "Conference Hall A", date: "Oct 22, 14:30", status: "Approved" },
  { ref: "REQ-2024-075", type: "Modification", subject: "Macro Analysis", date: "Oct 20, 11:00", status: "Rejected" },
  { ref: "REQ-2024-072", type: "Reservation", subject: "Lab 402", date: "Oct 18, 08:00", status: "Approved" },
  { ref: "REQ-2024-068", type: "Modification", subject: "Ethics Seminar", date: "Oct 15, 16:00", status: "Approved" },
];

export function RecentRequestsTable() {
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
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date/Time</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pr-8">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRequests.map((req, i) => (
              <TableRow key={i} className="group hover:bg-gray-50 border-b border-gray-50">
                <TableCell className="font-bold text-gray-900 py-6 pl-8">{req.ref}</TableCell>
                <TableCell className="text-sm text-gray-600">{req.type}</TableCell>
                <TableCell className="font-medium text-gray-800">{req.subject}</TableCell>
                <TableCell className="text-sm text-gray-500">{req.date}</TableCell>
                <TableCell className="pr-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        req.status === 'Pending' ? 'bg-amber-500' : 
                        req.status === 'Approved' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">{req.status}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 h-8 w-8"><MoreHorizontal size={14} /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[11px] text-gray-400">Showing 5 of 24 requests</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="px-4 h-9 text-[11px] font-bold">Previous</Button>
            <Button variant="outline" size="sm" className="px-4 h-9 text-[11px] font-bold">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
