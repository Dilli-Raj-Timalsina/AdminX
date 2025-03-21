"use client";
import { toast } from "sonner";
import { FormBuilder } from "@/components/admin/form/form-builder";
import { entityList } from "@/lib/store/entity-list";
import { IEntity } from "@/@types/entity";
import { useEffect, useState } from "react";
import { createEntity } from "@/server/entity/create-entity";
import { useRouter } from "next/navigation";

export default function CreatePage({ params }: { params: { entity: string } }) {
  const [entity, setEntity] = useState<IEntity | null>(null);
  const router = useRouter();

  useEffect(() => {
    const foundEntity = entityList.find(
      (e) => e.key === params.entity
    ) as IEntity;
    setEntity(foundEntity);
  }, [params.entity]);

  const handleSubmit = async (data: Record<string, any>) => {
    console.log(data, "data");
    const res = await createEntity(params.entity, data);
    if (res.error) {
      console.log(res.error, "res.error");
      toast.error(res.error, {
        position: "bottom-right",
        duration: 5000,
        className: "text-red-500",
      });
      return;
    }
    toast.success("Record created successfully", {
      position: "bottom-right",
      duration: 3000,
      className: "text-blue-500",
    });
    router.push(`/admin/${params.entity}/list`);
  };

  if (!entity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Create {entity?.display.pluralName}
        </h1>
      </div>
      <div className="rounded-md border p-4 max-w-lg">
        <FormBuilder entity={entity} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
