import Breadcrumb from "@/components/Breadcrumbs/breadcrumb";
import TableOne from "@/components/Tables/table-one";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/default-layout";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "This is Clients page",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clients" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
