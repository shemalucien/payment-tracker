// 'use client';
// import { useState } from 'react';
// import { BRAND } from "@/types/brand";
// import Image from "next/image";
// import Link from 'next/link';

// const brandData: BRAND[] = [
//   {
//     logo: "/images/brand/brand-01.svg",
//     name: "Google",
//     visitors: 3.5,
//     revenues: "5,768",
//     sales: 590,
//     conversion: 4.8,
//   },
//   {
//     logo: "/images/brand/brand-02.svg",
//     name: "Twitter",
//     visitors: 2.2,
//     revenues: "4,635",
//     sales: 467,
//     conversion: 4.3,
//   },
//   {
//     logo: "/images/brand/brand-03.svg",
//     name: "Github",
//     visitors: 2.1,
//     revenues: "4,290",
//     sales: 420,
//     conversion: 3.7,
//   },
//   {
//     logo: "/images/brand/brand-04.svg",
//     name: "Vimeo",
//     visitors: 1.5,
//     revenues: "3,580",
//     sales: 389,
//     conversion: 2.5,
//   },
//   {
//     logo: "/images/brand/brand-05.svg",
//     name: "Facebook",
//     visitors: 3.5,
//     revenues: "6,768",
//     sales: 390,
//     conversion: 4.2,
//   },
// ];

// const TableOne = () => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     logo: "",
//     name: "",
//     visitors: 0,
//     revenues: "",
//     sales: 0,
//     conversion: 0,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewEntry(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Add your logic here to handle the submission of the new entry
//     // For example, you can update your brandData state with the new entry
//     console.log("New entry submitted:", newEntry);
//     setShowAddForm(false); // Close the form after submission
//     // Reset the form fields
//     setNewEntry({
//       logo: "",
//       name: "",
//       visitors: 0,
//       revenues: "",
//       sales: 0,
//       conversion: 0,
//     });
//   };



//   return (
//     <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <div className="mb-5 flex items-center justify-between">
//         <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
//           Top Channels
//         </h4>

//         <button onClick={() => setShowAddForm(true)} className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//           Add New Entry
//         </button>

//       </div>

//       {/* Add New Entry form */}
//       {showAddForm && (
//         <div style={{ position: 'absolute', top: 40, left: 0, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
//           <div className="bg-gray-100 p-4 rounded">
//             <h2 className="text-lg font-bold mb-2">Add New Entry</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-2">
//                 <label htmlFor="name" className="block font-semibold mb-1">Name:</label>
//                 <input type="text" id="name" name="name" value={newEntry.name} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-full" />
//               </div>
//               {/* Add more input fields for other properties of new entry */}
//               <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col">
//         <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Source
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Visitors
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Revenues
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Sales
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Conversion
//             </h5>
//           </div>
//         </div>

//         {brandData.map((brand, key) => (
//           <div
//             className={`grid grid-cols-3 sm:grid-cols-5 ${key === brandData.length - 1
//               ? ""
//               : "border-b border-stroke dark:border-strokedark"
//               }`}
//             key={key}
//           >
//             <div className="flex items-center gap-3 p-2.5 xl:p-5">
//               <div className="flex-shrink-0">
//                 <Image src={brand.logo} alt="Brand" width={48} height={48} />
//               </div>
//               <p className="hidden text-black dark:text-white sm:block">
//                 {brand.name}
//               </p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">{brand.visitors}K</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-meta-3">${brand.revenues}</p>
//             </div>

//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{brand.sales}</p>
//             </div>

//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-meta-5">{brand.conversion}%</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TableOne;

'use client';
import { useState } from 'react';
import { BRAND } from "@/types/brand";
import Image from "next/image";
// import Link from 'next/link';

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Twitter",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Github",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 3.5,
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
  },
];

const TableOne = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    logo: "",
    name: "",
    visitors: 0,
    revenues: "",
    sales: 0,
    conversion: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic here to handle the submission of the new entry
    // For example, you can update your brandData state with the new entry
    console.log("New entry submitted:", newEntry);
    setShowAddForm(false); // Close the form after submission
    // Reset the form fields
    setNewEntry({
      logo: "",
      name: "",
      visitors: 0,
      revenues: "",
      sales: 0,
      conversion: 0,
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex items-center justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Top Channels
        </h4>

        <button onClick={() => setShowAddForm(!showAddForm)} className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded z-10">
          {showAddForm ? "Close Form" : "Add New Entry"}
        </button>

      </div>

      {/* Add New Entry form */}
      <div className={`transition-transform duration-300 ease-in-out transform ${showAddForm ? 'translate-x-0' : 'translate-x-full'} w-full absolute top-60 `}>
        <div className="overlay fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowAddForm(false)}></div>
        <div className="form-wrapper">
          <div className="bg-gray-100 p-4 rounded">
            <div className="form-wrapper">
              <h2 className="text-lg font-bold mb-2">Add New Entry</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="name" className="block font-semibold mb-1">Name:</label>
                  <input type="text" id="name" name="name" value={newEntry.name} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-full" />
                </div>
                <div className="mb-2">
                  <label htmlFor="logo" className="block font-semibold mb-1">Logo:</label>
                  <input type="text" id="logo" name="logo" value={newEntry.logo} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-full" />
                </div>
                <div className="mb-2">
                  <label htmlFor="visitors" className="block font-semibold mb-1">Visitors:</label>
                  <input type="number" id="visitors" name="visitors" value={newEntry.visitors} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-full" />
                </div>
                <div className="mb-2">
                  <label htmlFor="revenues" className="block font-semibold mb-1">Revenues:</label>
                  <input type="text" id="revenues" name="revenues" value={newEntry.revenues} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-full" />
                </div>
                <div className="mb-2">
                  <label htmlFor="sales" className="block font-semibold mb-1">Sales:</label>
                  <input type="number" id="sales" name="sales" value={newEntry.sales} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-full" />
                </div>
                <div className="mb-2">
                  <label htmlFor="conversion" className="block font-semibold mb-1">Conversion:</label>
                  <input type="number" id="conversion" name="conversion" value={newEntry.conversion} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-full" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={`transition-all duration-300 ease-in-out ${showAddForm ? 'translate-y-full' : 'translate-y-0'}`}>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Source
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Visitors
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Revenues
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Sales
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Conversion
              </h5>
            </div>
          </div>

          {brandData.map((brand, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
                }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <Image src={brand.logo} alt="Brand" width={48} height={48} />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {brand.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.visitors}K</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">${brand.revenues}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{brand.sales}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{brand.conversion}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOne;
