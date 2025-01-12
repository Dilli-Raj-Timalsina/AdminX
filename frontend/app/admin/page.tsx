"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserEntity } from "@/lib/store/entities";
import { useEntityStore } from "@/lib/hooks/use-entity-store";
import { Users } from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState<{ [key: string]: number }>({});
  const { listRecords: listUsers } = useEntityStore(UserEntity.key);

  useEffect(() => {
    const loadStats = async () => {
      const users = await listUsers();
      setStats({
        users: users.length,
      });
    };
    loadStats();
  }, [listUsers]);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
