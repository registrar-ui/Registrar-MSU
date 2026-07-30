import RequestWizard from "@/components/request/RequestWizard";

export default async function RequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RequestWizard slug={id} />;
}