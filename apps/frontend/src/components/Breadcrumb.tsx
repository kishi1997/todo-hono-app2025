import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";

type BreadcrumbChildItem = {
  path: string;
  title: string;
};
type BreadcrumbItem = {
  title: string;
};
type BreadcrumbProps = {
  child: BreadcrumbChildItem[];
  noChild: BreadcrumbItem;
};
export const BreadcrumbComponent = ({ child, noChild }: BreadcrumbProps) => {
  if (child == null || noChild == null) return null;
  return (
    <Breadcrumb className="absolute left-6 top-12">
      <BreadcrumbList>
        {child.map((item: BreadcrumbChildItem) => {
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={item.path}
                    className="text-zinc-400 hover:text-white"
                  >
                    {item.title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            </>
          );
        })}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white">
            {noChild.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
