import Image from "next/image";
// import { Product } from "@/types/product";

export interface Product {
  id ?: string;
  image: string;
  name: string;
  sold?: number; // Optional property
}


const productData: Product[] = [
  {
    image: "/images/product/Malt-with-Glass.png",
    name: "Skol Malt",
    sold: 10000
  },
  {
    image: "/images/product/Gatanu.png",
    name: "Skol Gatanu",
    sold: 12000
  },
  {
    image: "/images/product/panache.png",
    name: "Skol Panache",
    sold: 9400
  },
  {
    image: "/images/product/Panache.png",
    name: "Skol Panache",
    sold: 12000
  },
];

const TableTwo = () => {
  return (
    <div className="overflow-x-auto dark:text-white dark:bg-black">
      <div className="px-2 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <table className="min-w-full divide-y divide-gray-200 dark:bg-black dark:text-white">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Sold
            </th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-black">
          {productData.map((product, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image src={product.image}
                      className="h-10 w-10 rounded-full" width={40} height={40}
                      alt="Product"
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.sold}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTwo;