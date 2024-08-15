import "server-only";

import { glob } from "glob";
import { bundleMDX } from "mdx-bundler";
import { TDoc } from "@/types";

const docsDirectory = "src/docs/";

export const readDocs = async () => {
  return await Promise.all(
    (await glob(`./${docsDirectory}**/*.mdx`)).map(async (docFile) => {
      const mdx = await bundleMDX<TDoc["frontmatter"]>({
        file: `${process.cwd()}/${docFile}`,
        mdxOptions: (options) => {
          options.remarkPlugins = [...options.remarkPlugins];

          return options;
        },
      });

      const cleanDocFile = docFile.replace(docsDirectory, "");

      const splitDocFile = cleanDocFile.split("/");

      return {
        code: mdx.code,
        frontmatter: mdx.frontmatter,
        path: cleanDocFile.replace("/index", "").replace(".mdx", ""),
        isParent: splitDocFile.length > 1 && splitDocFile[1] === "index.mdx",
        isChildren: splitDocFile.length > 1 && splitDocFile[1] !== "index.mdx",
      } as TDoc;
    })
  );
};

export const getReorderedAndSortedDocs = (
  docs: Awaited<ReturnType<typeof readDocs>>
) =>
  docs
    .map((currentDoc) => {
      const splitCurrentDocFilePath = currentDoc.path.split("/");

      return {
        ...currentDoc,
        order: currentDoc.isChildren
          ? parseFloat(
              `${docs
                .find(
                  (parentDoc) =>
                    parentDoc.path === `${splitCurrentDocFilePath[0]}`
                )
                ?.frontmatter.order.toString()}.${currentDoc.frontmatter.order + 1}`
            )
          : currentDoc.frontmatter.order,
      };
    })
    .sort((docA, docB) => docA.order - docB.order);

export const findPrevDoc = (
  index: number,
  docs: Awaited<ReturnType<typeof readDocs>>
): TDoc | null => {
  const prevDoc = docs[index - 1];

  if (!prevDoc) {
    return null;
  }

  if (prevDoc.frontmatter.asPage === false) {
    return findPrevDoc(index - 1, docs);
  }

  return prevDoc;
};

export const findNextDoc = (index: number, docs: TDoc[]): TDoc | null => {
  const nextDoc = docs[index + 1];

  if (!nextDoc) {
    return null;
  }

  if (nextDoc.frontmatter.asPage === false) {
    return findNextDoc(index + 1, docs);
  }

  return nextDoc;
};
