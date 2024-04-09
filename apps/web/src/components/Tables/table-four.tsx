'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal/page';
import { Product } from "@/types/product";
import Image from "next/image";

const TableFour: React.FC = () => {

  const [productData, setproductData] = useState<Product[]>([
    {
      id: "1",
      image: "/images/product/Malt-with-Glass.png",
      name: "Skol Malt",
      description: "Skol Malt with Glass is a malt based drink with a rich taste. It is a malt-based drink with a rich taste. It is a malt-based drink with a rich taste.",
      price: 10000
    },
    {
      id: "2",
      image: "/images/product/Gatanu.png",
      name: "Skol Gatanu",
      description: "Skol Gatanu is a malt based drink with a rich taste. It is a malt-based drink with a rich taste. It is a malt-based drink with a rich taste.",
      price: 15000
    },
    {
      id: "3",
      image: "/images/product/panache.png",
      name: "Skol Panache",
      description: "Skol Panache is a malt based drink with a rich taste. It is a malt-based drink with a rich taste. It is a malt-based drink with a rich taste.",
      price: 12000
    },
    {
      id: "4",
      image: "/images/product/Panache.png",
      name: "Skol Panache",
      description: "Skol Panache is a malt based drink with a rich taste. It is a malt-based drink with a rich taste. It is a malt-based drink with a rich taste.",
      price: 13000
    }
  ]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [entries, setEntries] = useState<Product[]>([]);
  const [newEntry, setNewEntry] = useState<Product>({
    id: "",
    image: "/images/product/product-03.png",
    name: "",
    description: "",
    price: 0
  });

  // Correctly implemented handleInputChange function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update newEntry state
    setNewEntry(prevState => ({
      ...prevState,
      [name]: name === 'price' ? parseFloat(value) : value
    }));

    // Update editingProduct state
    setEditingProduct(prevProduct => {
      if (!prevProduct) return prevProduct; // If there's no product being edited, return null

      // Ensure that the updated property is not undefined
      const updatedProperty = name === 'id' ? (value || '') : value;

      return {
        ...prevProduct,
        [name]: updatedProperty
      };
    });
  };


  useEffect(() => {
    console.log(productData); // This will log the updated productData state
  }, [productData]); // Depend on productData to run the effect when productData changes
  const addNewProduct = (newProduct: Product) => {
    setproductData(prevproductData => [...prevproductData, newProduct]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingProduct) {
      // Update existing product
      const updatedProductData = productData.map(product =>
        product.id === editingProduct.id ? newEntry : product
      );
      setproductData(updatedProductData);
      setEditingProduct(null); // Reset editingProduct state
      setShowUpdateForm(false); // Hide the update form
    } else {
      // Add new product
      addNewProduct(newEntry);
      setShowAddForm(false);
    }

    // Reset newEntry state
    setNewEntry({
      id: "",
      image: "/images/product/product-03.png",
      name: "",
      description: "",
      price: 0
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

  // const handleDelete = (productId: string) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, productId: string) => {

    event.preventDefault();
    setProductIdToDelete(productId);
    setIsModalOpen(true);
    // const userConfirmation = window.confirm("Are you sure you want to delete this product?");
    // // If the user confirms, proceed with the deletion
    // if (userConfirmation) {
    //   setproductData(productData.filter(product => product.id !== productId));
    // }
  };

  const handleUpdate = (productToUpdate: Product) => {
    // Logic to update the product
    // This could involve setting a state to indicate that an update is in progress and displaying a form to edit the product
    // For simplicity, let's just log the product to update
    // Set the state to show the update form with the existing product information
    setEditingProduct(productToUpdate);
    setShowUpdateForm(true);

    console.log(productToUpdate);
  };

  const confirmDelete = () => {
    if (productIdToDelete) {
      setproductData(productData.filter(product => product.id !== productIdToDelete));
    }
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-full">
      <div className="mb-5 flex items-center justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white ">
          List of our Products
        </h4>

        {/* Button to toggle the form */}
        <button onClick={() => setShowAddForm(!showAddForm)} className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded z-10">
          {showAddForm ? "Close" : "Add New"}
        </button>
      </div>


      {/* Form container */}
      <div className={`transition-transform duration-300 ease-in-out transform ${showAddForm ? 'translate-x-0 mb-12' : 'translate-x-full'} w-full absolute top-60 `}>
        {/* Your form JSX here */}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block font-semibold mb-1">Name</label>
            <input type="text" id="name" name="name" placeholder='Enter Name' value={newEntry.name} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>

          <div className="mb-2">
            <label htmlFor="logo" className="block font-semibold mb-1">Image</label>
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
            <label htmlFor="description" className="block font-semibold mb-1">Description</label>
            <input type="text" id="description" name="description" value={newEntry.description} onChange={handleInputChange} className="border border-gray-400 px-2 py-1 rounded w-3/4" />
          </div>
          <div className="mb-2">
            <label htmlFor="price" className="block font-semibold mb-1">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={newEntry.price.toString()} // Convert the number to a string for the input value
              onChange={handleInputChange}
              className="border border-gray-400 px-2 py-1 rounded w-3/4"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      </div>


      {editingProduct && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleInputChange}
                  className="border border-gray-300  text-black rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Image</label>
                {editingProduct.image ? (
                  <img src={editingProduct.image} alt="Product Image" className="w-full h-auto mb-2" />
                ) : (
                  <p className="text-gray-500">No file chosen</p>
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="border border-gray-300 text-black rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={editingProduct.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 text-black rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleInputChange}
                  className="border border-gray-300 text-black rounded w-full px-3 py-2"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Update</button>
              <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-4 ml-2">Cancel</button>
            </form>
          </div>
        </div>
      )}





      {/* Your table JSX here */}

      <div className={`transition-all duration-300 ease-in-out ${showAddForm ? 'translate-y-full' : 'translate-y-0'}`}>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Product
              </h5>
            </div>
            <div className="hidden p-2.5 text-center xl:p-5 sm:block">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Description
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Price
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {productData.map((Product, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${key === productData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
                }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <Image src={Product.image} alt="Product" width={48} height={48} />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {Product.name}
                </p>
              </div>

              <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{Product.description}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{Product.price}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <div className="flex items-center justify-center mr-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => handleUpdate(Product)}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-red text-white px-4 py-2 rounded mr-2 mb-4"
                    onClick={(event) => handleDelete(event, Product.id)}
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
                        <h2 className="text-2xl font-bold mb-4">Are you sure you want to delete this product?</h2>
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

export default TableFour;
