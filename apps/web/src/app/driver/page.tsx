import Breadcrumb from "@/components/Breadcrumbs/breadcrumb";
import TableSix from "@/components/Tables/table-six";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/default-layout";

export const metadata: Metadata = {
  title: "Drivers",
  description:
    "This is Drivers page",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Drivers" />

      <div className="flex flex-col gap-10">
        <TableSix />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
