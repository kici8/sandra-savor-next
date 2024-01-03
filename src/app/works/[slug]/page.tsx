export async function generateStaticParams() {
  const works = await fetch(
    "https://strapi-production-027c9.up.railway.app/api/works"
  ).then((res) => res.json());

  return works.data.map((work) => ({
    slug: work.attributes.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const filteredWorks = await fetch(
    `https://strapi-production-027c9.up.railway.app/api/works?filters[slug][$eq]=${params.slug}`
  ).then((res) => res.json());

  // TODO: use default Error Boundary
  // TODO: loading state? (use suspense?) or in ssg we don't need it?
  if (!filteredWorks || !filteredWorks.data.length) {
    return <div>404</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        {filteredWorks.data[0].attributes.title}
      </h1>
      <p className="text-xl">{filteredWorks.data[0].attributes.description}</p>
    </div>
  );
}
