"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { roomService } from "@/services/room.service";

const roomSchema = z.object({
  CodeBatiment: z.string().min(1, "Code bâtiment requis"),
  Etage: z.number().int().nonnegative().optional(),
  NumeroPorte: z.string().min(1, "Numéro de porte requis"),
  NomSalle: z.string().min(1, "Nom de la salle requis"),
  Capacite: z.number().int().positive().min(1, "Capacité doit être > 0"),
  TypeSalle: z.enum(["cours", "tp", "amphi"]),
});

type RoomForm = z.infer<typeof roomSchema>;

interface AddRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddRoomModal({ open, onOpenChange, onSuccess }: AddRoomModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomForm>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      CodeBatiment: "",
      Etage: 0,
      NumeroPorte: "",
      NomSalle: "",
      Capacite: 50,
      TypeSalle: "cours",
    },
  });

  const onSubmit = async (data: RoomForm) => {
    try {
      await roomService.createRoom({
        IdSalle: 0,
        CodeBatiment: data.CodeBatiment,
        Etage: data.Etage ?? 0,
        NumeroPorte: data.NumeroPorte,
        NomSalle: data.NomSalle,
        Capacite: data.Capacite,
        TypeSalle: data.TypeSalle,
      });
      toast.success("Salle ajoutée avec succès");
      reset();
      onOpenChange(false);
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'ajout de la salle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <span />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#17203A]">Nouvelle salle</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire pour ajouter une salle au calendrier.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code bâtiment</label>
            <Input {...register("CodeBatiment")} placeholder="ex : A" />
            {errors.CodeBatiment && <p className="mt-1 text-xs text-red-600">{errors.CodeBatiment.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Étage</label>
            <Input type="number" {...register("Etage", { valueAsNumber: true })} placeholder="ex : 1" />
            {errors.Etage && <p className="mt-1 text-xs text-red-600">{errors.Etage.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de porte</label>
            <Input {...register("NumeroPorte")} placeholder="ex : 101" />
            {errors.NumeroPorte && <p className="mt-1 text-xs text-red-600">{errors.NumeroPorte.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la salle</label>
            <Input {...register("NomSalle")} placeholder="ex : Salle A101" />
            {errors.NomSalle && <p className="mt-1 text-xs text-red-600">{errors.NomSalle.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacité</label>
            <Input type="number" {...register("Capacite", { valueAsNumber: true })} placeholder="ex : 50" />
            {errors.Capacite && <p className="mt-1 text-xs text-red-600">{errors.Capacite.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de salle</label>
            <Select onValueChange={(val) => setValue("TypeSalle", val as any)} defaultValue="cours">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cours">Cours</SelectItem>
                <SelectItem value="tp">TP</SelectItem>
                <SelectItem value="amphi">Amphi</SelectItem>
              </SelectContent>
            </Select>
            {errors.TypeSalle && <p className="mt-1 text-xs text-red-600">{errors.TypeSalle.message}</p>}
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#5C8ABF] hover:bg-[#a67a0a] text-white">
              {isSubmitting ? "Création..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
