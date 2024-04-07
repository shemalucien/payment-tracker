'use client';
import React, { useEffect, useState } from 'react';
import { BRAND } from "@/types/brand";
import Image from "next/image";



const TableOne: React.FC = () => {
  
const [brandData, setBrandData] = useState<BRAND[]>([
  {
    logo: "/images/brand/brand-01.svg",
    name: "Kalisa",
    Tinnumber: "1234578",
    contact: "0788888888",
    address1: "Nyarugenge",
    address2: "Kimisagara",
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Kagabo",
    Tinnumber: "1234578",
    contact: "0788888888",
    address1: "Nyarugenge",
    address2: "Kimisagara",
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Mukamana",
    Tinnumber: "1234578",
    contact: "0788888888",
    address1: "Nyarugenge",
    address2: "Kimisagara",
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Janvier",
    Tinnumber: "1234578",
    contact: "0788888888",
    address1: "Nyarugenge",
    address2: "Kimisagara",
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Vincent",
    Tinnumber: "1234578",
    contact: "0788888888",
    address1: "Nyarugenge",
    address2: "Kimisagara",
  },
]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [entries, setEntries] = useState<BRAND[]>([]);
  const [newEntry, setNewEntry] = useState<BRAND>({
    name: '',
    logo: '/images/brand/brand-01.svg',
    Tinnumber: '',
    contact: '',
    address1: '',
    address2: ''
  });

  // Correctly implemented handleInputChange function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  useEffect(() => {
    console.log(brandData); // This will log the updated brandData state
 }, [brandData]); // Depend on brandData to run the effect when brandData changes
 const addNewBrand = (newBrand: BRAND) => {
  setBrandData(prevBrandData => [...prevBrandData, newBrand]);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  addNewBrand(newEntry);
  setShowAddForm(false);
  setNewEntry({
    name: '',
    logo: '/images/brand/brand-01.svg',
    Tinnumber: '',
    contact: '',
    address1: '',
    address2: ''
  });
};
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Process the file here
      console.log(file);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      // Process the dropped file here
      console.log(file);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-full">
      <div className="mb-5 flex items-center justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white ">
          Clients Identification
        </h4>

        {/* Button to toggle the form */}
        <button onClick={() => setShowAddForm(!showAddForm)} className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded z-10">
          {showAddForm ? "Close Form" : "Add New Entry"}
        </button>
      </div>

      {/* Form container */}
      <div className={`transition-transform duration-300 ease-in-out transform ${showAddForm ? 'translate-x-0 mb-12' : 'translate-x-full'} w-full absolute top-60 `}>
        {/* Your form JSX here */}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block font-semibold mb-1">Name:</label>
            <input type="text" id="name" name="name" placeholder='Enter Name' value={newEntry.name} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>

          <div className="mb-2">
            <label htmlFor="logo" className="block font-semibold mb-1">Picture:</label>
            {/* <div className="flex flex-col items-center justify-center border border-gray-400 px-2 py-1 rounded w-3/4 cursor-pointer">
              <div className="text-gray-700 text-lg font-bold text-center transition-colors duration-200 ease-in-out hover:text-gray-800 w-3/4">
                Drop files here
              </div>
              <div className="text-gray-700 text-lg font-bold text-center transition-colors duration-200 ease-in-out hover:text-gray-800 w-3/4">
                or
              </div> */}
              <input
                type="file"
                accept="image/*"
                id="logo"
                className=" w-3/4"
                onChange={(e) => handleFileUpload(e)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleFileDrop(e)}
              />
            {/* </div> */}
          </div>

          <div className="mb-2">
            <label htmlFor="Tinnumber" className="block font-semibold mb-1">Tinnumber:</label>
            <input type="text" id="Tinnumber" name="Tinnumber" value={newEntry.Tinnumber} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>
          <div className="mb-2">
            <label htmlFor="contact" className="block font-semibold mb-1">contact:</label>
            <input type="text" id="contact" name="contact" value={newEntry.contact} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>
          <div className="mb-2">
            <label htmlFor="address1" className="block font-semibold mb-1">address1:</label>
            <input type="text" id="address1" name="address1" value={newEntry.address1} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>
          <div className="mb-2">
            <label htmlFor="address2" className="block font-semibold mb-1">address2:</label>
            <input type="text" id="address2" name="address2" value={newEntry.address2} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>


          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      </div>
      {/* Your table JSX here */}

      <div className={`transition-all duration-300 ease-in-out ${showAddForm ? 'translate-y-full' : 'translate-y-0'}`}>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Client
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tinnumber
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                contact
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                address1
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                address2
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
                <p className="text-black dark:text-white">{brand.Tinnumber}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{brand.contact}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{brand.address1}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{brand.address2}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOne;
