"use client";
import { Loader } from "@/components/ui/loader/Loader";
import { useProfile } from "@/hooks/useProfile";
import { ProfileInfo } from "./admin/ProfileInfo";
import AuthTable from "@/components/AuthTable/AuthTable";
import LogsTable from "@/components/LogsTable/LogsTable";
import BotsTable from "../components/BotsManager/BotsTable";
import DomainsTable from "@/components/DomainsManager/DomainsTable";

export default function Home() {
  const { user, isLoading } = useProfile();

  return isLoading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader />
    </div>
  ) : !user.isAdmin ? (
    <ProfileInfo />
  ) : (
    <main className="min-h-screen p-6">
      <ProfileInfo />
      <AuthTable></AuthTable>
      <LogsTable></LogsTable>
      <BotsTable></BotsTable>
      <DomainsTable></DomainsTable>
    </main>
  );
}
