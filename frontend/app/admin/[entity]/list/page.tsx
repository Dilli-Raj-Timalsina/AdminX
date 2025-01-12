"use client";

import { useEffect, useState } from "react";
import { useEntityStore } from "@/lib/hooks/use-entity-store";
import { DataTable } from "@/components/admin/list/data-table";
import { generateColumns } from "@/components/admin/list/columns";
import { UserEntity } from "@/lib/store/entities";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function ListPage({
  params: { entity },
}: {
  params: { entity: string };
}) {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const { loading, error, listRecords } = useEntityStore(entity);
  const columns = generateColumns(UserEntity);

  useEffect(() => {
    const loadData = async () => {
      const records = await listRecords();
      setData(records);
    };
    loadData();
  }, [listRecords]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{UserEntity.display.pluralName}</h1>
        <Button onClick={() => router.push(`/admin/${entity}/create`)}>
          <Plus className="mr-2 h-4 w-4" />
          Create {UserEntity.display.singularName}
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
