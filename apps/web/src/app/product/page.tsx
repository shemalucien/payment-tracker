import Breadcrumb from "@/components/Breadcrumbs/breadcrumb";
import TableFour from "@/components/Tables/table-four";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/default-layout";

export const metadata: Metadata = {
  title: "Products",
  description:
    "This is Products page",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
        <TableFour />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
