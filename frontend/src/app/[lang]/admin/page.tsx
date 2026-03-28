import { redirect } from 'next/navigation';

interface LangParams {
  lang: string;
}

interface AdminPageProps {
  params: Promise<LangParams>;
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { lang } = await params;
  redirect(`/${lang}/admin/users`);
}
