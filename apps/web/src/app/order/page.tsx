import Breadcrumb from "@/components/Breadcrumbs/breadcrumb";
import TableThree from "@/components/Tables/table-three";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/default-layout";

export const metadata: Metadata = {
  title: "Orders",
  description:
    "This is Orders page",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
