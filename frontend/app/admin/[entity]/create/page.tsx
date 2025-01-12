"use client";

import { useRouter } from "next/navigation";
import { FormBuilder } from "@/components/admin/form/form-builder";
import { useEntityStore } from "@/lib/hooks/use-entity-store";
import { UserEntity } from "@/lib/store/entities";
import { toast } from "sonner";

export default function CreatePage({
  params: { entity },
}: {
  params: { entity: string };
}) {
  const router = useRouter();
  const { createRecord } = useEntityStore(entity);

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      await createRecord(data);
      toast.success("Record created successfully");
      router.push(`/admin/${entity}/list`);
    } catch (error) {
      toast.error("Failed to create record");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Create {UserEntity.display.singularName}
        </h1>
      </div>
      <div className="rounded-md border p-4">
        <FormBuilder entity={UserEntity} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
