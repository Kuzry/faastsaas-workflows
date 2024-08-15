"use client";

import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuLink } from "@/components";

export function HeadersList() {
  const [headers, setHeaders] = useState<HTMLHeadingElement[]>();

  useEffect(() => {
    const headers = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("#doc-content h2")
    );

    headers.forEach((header) => {
      header.setAttribute(
        "id",
        header.innerText.toLowerCase().replace(" ", "-")
      );
    });

    setHeaders(headers);
  }, []);

  return (
    <Menu
      classNames={{
        root: "flex-col",
      }}
    >
      {headers?.map((header, key) => (
        <MenuItem key={key}>
          <MenuLink href={`#${header.getAttribute("id")}`}>
            {header.innerText}
          </MenuLink>
        </MenuItem>
      ))}
    </Menu>
  );
}
