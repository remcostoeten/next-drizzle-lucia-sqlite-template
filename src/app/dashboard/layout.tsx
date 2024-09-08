import DashboardWrapper from '@/components/dashboard/layout/DashboardWrapper';
import HeaderServer from '@/components/dashboard/layout/navigation/HeaderServer';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export default async function DashboardLayout({
  children,
}: {
  children: PageProps
}) {

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-body-bg">
      <HeaderServer />
      <DashboardWrapper>
        {children}
      </DashboardWrapper>
    </div>
  )
}
