'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal/page';
import { Driver } from "@/types/driver";
import Image from "next/image";



const TableSix: React.FC = () => {

  const [DriverData, setDriverData] = useState<Driver[]>([
    {
      id: 'Driver-1',
      image: "/images/user/charles.png",
      name: "Kalisa",
      IdNumber: "1234578",
      contact: "0788888888",
    },
    {
      id: 'Driver-2',
      image: "/images/user/charles.png",
      name: "Kagabo",
      IdNumber: "1234578",
      contact: "0788888888"
    },
    {
      id: 'Driver-3',
      image: "/images/user/charles.png",
      name: "Mukamana",
      IdNumber: "1234578",
      contact: "0788888888",
    },
    {
      id: 'Driver-4',
      image: "/images/user/charles.png",
      name: "Janvier",
      IdNumber: "1234578",
      contact: "0788888888",
    },
    {
      id: 'Driver-5',
      image: "/images/user/charles.png",
      name: "Vincent",
      IdNumber: "1234578",
      contact: "0788888888",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [DriverIdToDelete, setDriverIdToDelete] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [entries, setEntries] = useState<Driver[]>([]);
  const [newEntry, setNewEntry] = useState<Driver>({
    id: '',
    name: '',
    image: '/images/user/charles.png',
    IdNumber: '',
    contact: ''
  });

  // Correctly implemented handleInputChange function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Update editingDriver state
    setEditingDriver(prevDriver => {
      if (!prevDriver) return prevDriver; // If there's no Driver being edited, return null

      const updatedProperty = name === 'id' ? (value || '') : value;

      return {
        ...prevDriver,
        [name]: updatedProperty
      };
    });

    }


  useEffect(() => {
    console.log(DriverData); // This will log the updated DriverData state
  }, [DriverData]); // Depend on DriverData to run the effect when DriverData changes
  const addNewDriver = (newDriver: Driver) => {
    setDriverData(prevDriverData => [...prevDriverData, newDriver]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingDriver) {
      // Update existing Driver
      const updatedDriverData = DriverData.map(Driver =>
        Driver.id === editingDriver.id ? newEntry : Driver
      );
      setDriverData(updatedDriverData);
      setEditingDriver(null);
    } else {
      // Add new Driver
      addNewDriver(newEntry);
    }
    setShowUpdateForm(false);
    setNewEntry({
      id: '',
      name: '',
      image: '/images/user/charles.png',
      IdNumber: '',
      contact: ''
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

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, DriverId: string) => {

    event.preventDefault();

    setDriverIdToDelete(DriverId);

    // Perform the delete operation here
    setIsModalOpen(true);
  };

  const handleUpdate = (DriverToUpdate: Driver) => {
    // Logic to update the product
    // This could involve setting a state to indicate that an update is in progress and displaying a form to edit the product
    // For simplicity, let's just log the product to update
    // Set the state to show the update form with the existing product information
    setEditingDriver(DriverToUpdate);
    setShowUpdateForm(true);

    console.log(DriverToUpdate);
  };

  const confirmDelete = () => {
    if (DriverIdToDelete) {
      setDriverData(DriverData.filter(Driver => Driver.id !== DriverIdToDelete));
    }
    setIsModalOpen(false);
    setDriverIdToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setDriverIdToDelete(null);
  };



  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-full">
      <div className="mb-5 flex items-center justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white ">
          Drivers Identification
        </h4>

        {/* Button to toggle the form */}
        <button onClick={() => setShowAddForm(!showAddForm)} className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded z-10 sm:py-2 text-base">
          {showAddForm ? "Close" : "Add New"}
        </button>
      </div>

      {/* Form container */}
      <div className={`transition-transform duration-300 ease-in-out transform ${showAddForm ? 'translate-x-0 mb-12' : 'translate-x-full'} w-full absolute top-60 `}>
        {/* Your form JSX here */}
        <form onSubmit={handleSubmit} className="w-full sm:mb-12">
          <div className="mb-2">
            <label htmlFor="name" className="block font-semibold mb-1">Name</label>
            <input type="text" id="name" name="name" placeholder='Enter Name' value={newEntry.name} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>

          <div className="mb-2">
            <label htmlFor="image" className="block font-semibold mb-1">Picture</label>
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
              id="image"
              className=" w-3/4"
              onChange={(e) => handleFileUpload(e)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleFileDrop(e)}
            />
            {/* </div> */}
          </div>

          <div className="mb-2">
            <label htmlFor="IdNumber" className="block font-semibold mb-1">IdNumber</label>
            <input type="text" id="IdNumber" name="IdNumber" placeholder='Enter IdNumber' value={newEntry.IdNumber} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>
          <div className="mb-2">
            <label htmlFor="contact" className="block font-semibold mb-1">Contact</label>
            <input type="text" id="contact" name="contact" placeholder='Enter contact' value={newEntry.contact} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      </div>
      {editingDriver && (
         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
         <div className="bg-white p-6 rounded-lg w-96">
           <h2 className="text-xl font-bold mb-4">Update Driver</h2>
           <form onSubmit={handleSubmit}>
             <div className="mb-4">
               <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                 Name
               </label>
               <input
                 className="border border-gray-400 p-2 w-full"
                 type="text"
                 id="name"
                 name="name"
                 value={editingDriver.name}
                 onChange={handleInputChange}
               />
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 font-bold mb-2" htmlFor="IdNumber">
                 ID Number
               </label>
               <input
                 className="border border-gray-400 p-2 w-full"
                 type="text"
                 id="IdNumber"
                 name="IdNumber"
                 value={editingDriver.IdNumber}
                 onChange={handleInputChange}
               />
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 font-bold mb-2" htmlFor="contact">
                 Contact
               </label>
               <input
                 className="border border-gray-400 p-2 w-full"
                 type="text"
                 id="contact"
                 name="contact"
                 value={editingDriver.contact}
                 onChange={handleInputChange}
               />
             </div>
             <button
               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
               type="submit"
             >
               Update
             </button>  
           </form>
         </div>
       </div>
      )}





      {/* Your table JSX here */}

      <div className={`transition-all duration-300 ease-in-out ${showAddForm ? 'translate-y-full' : 'translate-y-0'}`}>
        <div className="flex flex-col mt-12">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Driver
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                IdNumber
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                contact
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {DriverData.map((Driver, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${key === DriverData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
                }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <Image src={Driver.image} alt="Driver" width={48} height={48} style={{
                    borderRadius: '50%',
                    width: "auto",
                    height: "auto",
                  }} />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {Driver.name}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{Driver.IdNumber}</p>
              </div>

              
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{Driver.contact}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div className="flex items-center justify-center mr-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => handleUpdate(Driver)}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-red text-white px-4 py-2 rounded mr-2 mb-4"
                    onClick={(event) => handleDelete(event, Driver.id)}
                  >
                     <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button>
                  {/* Rendering the modal conditionally based on isModalOpen */}
                  {isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                      <div className="modal-content">
                        <h2 className="text-2xl font-bold mb-4">Are you sure you want to delete this Diver ?</h2>
                        <div className="p-4 flex items-center justify-center z-50">
                          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 mb-4" onClick={cancelDelete}>Cancel</button>
                          <button className="bg-red text-white px-4 py-2 rounded mr-2 mb-4" onClick={confirmDelete}>Yes, Delete</button>
                        </div>
                      </div>
                    </Modal>
                  )}
                </div>
               
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSix;
