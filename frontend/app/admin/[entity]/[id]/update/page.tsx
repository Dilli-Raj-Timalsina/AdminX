"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormBuilder } from "@/components/admin/form/form-builder";
import { useEntityStore } from "@/lib/hooks/use-entity-store";
import { UserEntity } from "@/lib/store/entities";
import { toast } from "sonner";

export default function UpdatePage({
  params: { entity, id },
}: {
  params: { entity: string; id: string };
}) {
  const router = useRouter();
  const { getRecord, updateRecord } = useEntityStore(entity);
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const record = await getRecord(id);
        if (!record) {
          setError("Record not found");
          return;
        }
        setData(record);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load record");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [getRecord, id]);

  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      await updateRecord(id, formData);
      toast.success("Record updated successfully");
      router.push(`/admin/${entity}/list`);
    } catch (error) {
      toast.error("Failed to update record");
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Record not found</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit {UserEntity.display.singularName}
        </h1>
      </div>
      <div className="rounded-md border p-4">
        <FormBuilder
          entity={UserEntity}
          initialData={data}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
