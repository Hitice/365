"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SEGMENT_LABELS } from "@/components/dashboard/nav";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segmentos = pathname.split("/").filter(Boolean);

  const partes = segmentos.map((seg, i) => ({
    // Segmento dinamico (uuid do contato/produto) vira "Detalhe".
    label: SEGMENT_LABELS[seg] ?? "Detalhe",
    href: "/" + segmentos.slice(0, i + 1).join("/"),
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {partes.map((parte, i) => (
          <Fragment key={parte.href}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {i === partes.length - 1 ? (
                <BreadcrumbPage>{parte.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={parte.href}>{parte.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
