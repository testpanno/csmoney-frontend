"use client";

import { Loader } from "@/components/ui/loader/Loader";
import { useProfile } from "@/hooks/useProfile";
import { ProfileInfo } from "./admin/ProfileInfo";
import AuthTable from "@/components/AuthTable/AuthTable";
import LogsTable from "@/components/LogsTable/LogsTable";
import BotsTable from "../components/BotsManager/BotsTable";
import DomainsTable from "@/components/DomainsManager/DomainsTable";
import DashboardMainStats from "@/components/dashboard/DashboardMainStats";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Update import path if needed

export default function Home() {
  const { user, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user.isAdmin) {
    return <ProfileInfo />;
  }

  return (
    <main className="min-h-screen p-6">
      <ProfileInfo />
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="container mx-auto flex justify-center">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Статистика</TabsTrigger>
            <TabsTrigger value="auth">Авторизации</TabsTrigger>
            <TabsTrigger value="logs">Логи</TabsTrigger>
            <TabsTrigger value="bots">Боты</TabsTrigger>
            <TabsTrigger value="domains">Домены</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="dashboard">
          <DashboardMainStats />
          <DashboardOverview />
        </TabsContent>
        <TabsContent value="auth">
          <AuthTable />
        </TabsContent>
        <TabsContent value="logs">
          <LogsTable />
        </TabsContent>
        <TabsContent value="bots">
          <BotsTable />
        </TabsContent>
        <TabsContent value="domains">
          <DomainsTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}
