import { AppNavbar } from "@/components/layout/app-navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
}
