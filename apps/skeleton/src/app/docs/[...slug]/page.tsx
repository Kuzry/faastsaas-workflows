import {
  findNextDoc,
  findPrevDoc,
  getReorderedAndSortedDocs,
  readDocs,
} from "@/utils/docs";
import { notFound } from "next/navigation";
import { PrevNextButtonClient } from "@/app/docs/[...slug]/PrevNextButton.client";
import { getTranslations } from "next-intl/server";
import { MDXComponent } from "@/app/docs/[...slug]/MDXComponent";
import { HeadersList } from "@/app/docs/[...slug]/HeadersList";
import { unstable_cache } from "next/cache";

const readDocsCached = unstable_cache(() => readDocs(), ["docs"]);

export async function generateStaticParams() {
  return (await readDocsCached()).map((doc) => {
    return {
      slug: doc.path.split("/"),
    };
  });
}

export default async function Docs({ params }: { params: { slug: string[] } }) {
  const t = await getTranslations("doc_page");

  const docs = await readDocsCached(),
    doc = docs.find((doc) => doc.path === params.slug.join("/"));

  if (!doc) {
    return notFound();
  }

  const reorderedAndSortedDocs = getReorderedAndSortedDocs(docs);

  const docIndex = reorderedAndSortedDocs.findIndex(
      (currentDoc) => currentDoc.path === doc.path
    ),
    prevDoc = findPrevDoc(docIndex, reorderedAndSortedDocs),
    nextDoc = findNextDoc(docIndex, reorderedAndSortedDocs);

  return (
    <div className="flex gap-8">
      <div className="prose flex-1">
        <h1>{doc.frontmatter.title}</h1>
        <div id="doc-content">
          <MDXComponent code={doc.code} />
        </div>
        <div className="mt-12 flex gap-4">
          {prevDoc ? (
            <PrevNextButtonClient
              type="prev"
              href={`/docs/${prevDoc.path}`}
              label={t("prev_page")}
              title={prevDoc.frontmatter.title}
            />
          ) : (
            <div className="w-1/2" />
          )}
          {nextDoc ? (
            <PrevNextButtonClient
              type="next"
              href={`/docs/${nextDoc.path}`}
              label={t("next_page")}
              title={nextDoc.frontmatter.title}
            />
          ) : (
            <div className="w-1/2" />
          )}
        </div>
      </div>
      <div className="hidden w-[250px] lg:block">
        <div className="mb-4 font-bold">{t("on_this_page")}</div>
        <HeadersList />
      </div>
    </div>
  );
}
