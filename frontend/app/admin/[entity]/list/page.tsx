"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/admin/datas/data-table";
import { generateColumns } from "@/components/admin/datas/columns";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getAllEntities } from "@/server/entity/get-all-entity";
import { entityList } from "@/lib/store/entity-list";
export default function ListPage({
  params: { entity },
}: {
  params: { entity: string };
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const columns = generateColumns(
    entityList.find((e) => e.dbConfig.tableName === entity)!
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAllEntities(entity);
      console.log(res, "res");

      if (res.error) {
        toast.error(res.error, {
          position: "bottom-right",
          duration: 5000,
        });
      }
      if (res.data && Array.isArray(res.data.responseObject)) {
        setData(res.data.responseObject);
      } else {
        setData([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [entity]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
