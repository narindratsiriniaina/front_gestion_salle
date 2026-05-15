"use client";

import { Calendar, Clock, Send, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SubmitRequestForm() {
  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="border-b border-gray-50 pb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-600" />
          <CardTitle className="text-xl font-bold text-[#001f3f]">Submit New Request</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-8 space-y-8">
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Request Type</p>
          <Tabs defaultValue="modification" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
              <TabsTrigger 
                value="modification" 
                className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-[#001f3f] data-[state=active]:shadow-sm"
              >
                Modification
              </TabsTrigger>
              <TabsTrigger 
                value="reservation"
                className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-[#001f3f] data-[state=active]:shadow-sm"
              >
                Reservation
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Course / Event Name</p>
          <Select>
            <SelectTrigger className="h-14 bg-gray-50 border-gray-100 rounded-xl focus:ring-1 focus:ring-[#001f3f]/10">
              <SelectValue placeholder="Select a course..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="algo">Advanced Algorithms</SelectItem>
              <SelectItem value="net">Networks & Systems</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Preferred Date</p>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input type="date" className="h-14 pl-12 bg-gray-50 border-gray-100 rounded-xl" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Preferred Time</p>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input type="time" className="h-14 pl-12 bg-gray-50 border-gray-100 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Justification</p>
          <Textarea 
            placeholder="Provide details for your request..." 
            className="min-h-[120px] bg-gray-50 border-gray-100 rounded-xl resize-none p-4"
          />
        </div>

        <Button className="w-full h-14 bg-[#001f3f] hover:bg-[#001429] rounded-xl text-md font-bold gap-2">
          Send Request for Validation
          <Send className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

export function RequestsSummaryCards() {
  const summaries = [
    { label: "PENDING APPROVAL", value: "04", icon: Clock, color: "bg-amber-50 text-amber-600", iconBg: "bg-amber-100" },
    { label: "SUCCESSFULLY VALIDATED", value: "18", icon: Send, color: "bg-green-50 text-green-600", iconBg: "bg-green-100" },
    { label: "TOTAL REFUSED", value: "02", icon: Info, color: "bg-red-50 text-red-600", iconBg: "bg-red-100" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaries.map((s, i) => (
        <Card key={i} className={`border-none shadow-sm ${s.color} overflow-hidden group`}>
          <CardContent className="p-6 flex items-center gap-6">
            <div className={`${s.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">{s.label}</p>
              <h4 className="text-3xl font-black">{s.value}</h4>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
