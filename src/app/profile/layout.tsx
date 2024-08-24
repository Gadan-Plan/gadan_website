import UserHeader from "@/app/component/userHearder";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      <UserHeader />
      {children}
    </div>
  );
}
