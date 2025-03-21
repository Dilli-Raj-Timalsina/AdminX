import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IEntity } from "@/@types/entity";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type EditDialogProps = {
  entity: IEntity;
  initialData: Record<string, any>;
};

export function EditDialog({ entity, initialData }: EditDialogProps) {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (key: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "PATCH",
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        url: `/api/${entity.key}/${formData.id}`,
        data: formData,
      });
      setIsLoading(false);
      toast.success("Record updated successfully", {
        position: "bottom-right",
        duration: 3000,
        className: "text-blue-500",
      });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred!", {
        position: "bottom-right",
        duration: 5000,
        className: "text-red-500",
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {entity.fields.map((field) => {
            const fieldValue = formData[field.dbConfig.columnName] || "";

            return (
              <div
                key={field.dbConfig.columnName}
                className="grid grid-cols-4 w-full items-center gap-4"
              >
                <Label
                  htmlFor={field.dbConfig.columnName}
                  className="text-right"
                >
                  {field.inputOptions.label}
                </Label>
                {field.inputOptions.type === "checkbox" ? (
                  <Checkbox
                    id={field.dbConfig.columnName}
                    checked={!!fieldValue}
                    onCheckedChange={(checked) => {
                      handleChange(field.dbConfig.columnName, checked);
                    }}
                    disabled={field.inputOptions.readOnly}
                  />
                ) : field.inputOptions.type === "select" ? (
                  <Select
                    value={fieldValue}
                    onValueChange={(value) => {
                      handleChange(field.dbConfig.columnName, value);
                    }}
                    disabled={field.inputOptions.readOnly}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={field.inputOptions.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {field.inputOptions.selectOptions?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.dbConfig.columnName}
                    value={fieldValue}
                    onChange={(e) =>
                      handleChange(field.dbConfig.columnName, e.target.value)
                    }
                    placeholder={field.inputOptions.placeholder}
                    disabled={field.inputOptions.readOnly}
                    className="col-span-3"
                  />
                )}
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            actionButton={true}
            isLoading={isLoading}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
