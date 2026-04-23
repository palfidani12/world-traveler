import { redirect } from "next/navigation";

export default async function TripRootPage({
  params,
}: Readonly<{
  params: Promise<{ tripId: string }>;
}>) {
  const { tripId } = await params;
  redirect(`/trips/${tripId}/dashboard`);
}
