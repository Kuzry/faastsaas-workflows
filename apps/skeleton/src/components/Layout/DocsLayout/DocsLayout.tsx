import { PropsWithChildren } from "react";
import { FrontLayout, FrontLayoutContainer } from "@/components/Layout";
import { Menu, MenuDummyLink, MenuItem, MenuLink } from "@/components";
import { getReorderedAndSortedDocs, readDocs } from "@/utils/docs";
// import { getReorderedAndSortedDocs } from "@/utils/docs";

type DocsLayoutProps = PropsWithChildren;

export async function DocsLayout({ children }: DocsLayoutProps) {
  const docs = await readDocs();

  return (
    <FrontLayout>
      <FrontLayoutContainer>
        <div className="mb-8 flex">
          <div className="flex hidden w-[250px] flex-col gap-4 border-r pr-4 pt-4 md:block">
            <Menu
              classNames={{
                root: "flex-col w-full gap-1",
                link: "py-2 px-3 hover:bg-gray-3/50 rounded",
              }}
            >
              {getReorderedAndSortedDocs(docs).map((doc, key) => (
                <MenuItem
                  key={key}
                  className={`${doc.isParent ? "mt-6 font-bold" : ""}`}
                >
                  {doc.frontmatter.asPage === false ? (
                    <MenuDummyLink>{doc.frontmatter.title}</MenuDummyLink>
                  ) : (
                    <MenuLink
                      href={`/docs/${doc.path}`}
                      className="-ml-3"
                      hrefComparison="exact"
                    >
                      {doc.frontmatter.title}
                    </MenuLink>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className="flex-1">
            {/*<div className="border-b py-4 pl-8">*/}
            {/*  <TextInput placeholder="Input placeholder" />*/}
            {/*</div>*/}
            <div className="mt-8 md:pl-8">
              <div className="mb-4">Docs</div>
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </div>
      </FrontLayoutContainer>
    </FrontLayout>
  );
}
