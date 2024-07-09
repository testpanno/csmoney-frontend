'use client'

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button/Button";
import { Field } from "@/components/ui/field/Field";
import { Heading } from "@/components/ui/Heading";
import { Loader } from "@/components/ui/loader/Loader";

export default function Home() {
  return (
    <main className="p-6 flex-col gap-8">
      <Button variant="primary">Click me</Button>
      <Field label='name' placeholder="Enter name" />
      <Badge color='blue' value={10} maxValue={60} />
      <Heading>Hello!</Heading>
      <Loader />
    </main>
  );
}
