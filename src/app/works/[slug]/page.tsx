import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const works = await fetch(
    "https://strapi-production-027c9.up.railway.app/api/works"
  ).then((res) => res.json());

  return works.data.map((work: any) => ({
    slug: work.attributes.slug,
  }));
}

async function fetchWork(slug: string) {
  const filteredWorks = await fetch(
    `https://strapi-production-027c9.up.railway.app/api/works?filters[slug][$eq]=${slug}`
  ).then((res) => res.json());
  return filteredWorks.data[0];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const work = await fetchWork(params.slug);

  if (!work) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col p-24">
      <h1 className="text-3xl font-bold">{work.attributes.title}</h1>
      <p className="text-xl">{work.attributes.description}</p>
    </div>
  );
}
