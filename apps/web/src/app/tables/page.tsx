import Breadcrumb from "@/components/Breadcrumbs/breadcrumb";
import TableOne from "@/components/Tables/table-one";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/default-layout";

export const metadata: Metadata = {
  title: "Next.js Tables",
  description:
    "This is Next.js Tables page",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
