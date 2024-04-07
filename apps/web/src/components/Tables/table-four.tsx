'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal/page';
import { Product } from "@/types/product";
import Image from "next/image";



const TableFour: React.FC = () => {

  const [productData, setproductData] = useState<Product[]>([
    {
      id: "1",
      image: "/images/product/product-01.png",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      price: 10000
    },
    {
      id: "2",
      image: "/images/product/product-02.png",
      name: "Product 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      price: 15000
    },
    {
      id: "3",
      image: "/images/product/product-03.png",
      name: "Product 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      price: 12000
    },
    {
      id: "4",
      image: "/images/product/product-04.png",
      name: "Product 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
          {showAddForm ? "Close Form" : "Add New Entry"}
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
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Product
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
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
              className={`grid grid-cols-3 sm:grid-cols-5 ${key === productData.length - 1
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

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{Product.description}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{Product.price}</p>
              </div>

              <div className="flex flex-col items-center justify-center p-2.5 xl:p-5">
                <div className="flex items-center justify-center">
                  <button
                    className="bg-red text-white px-4 py-2 rounded mr-2 mb-4"
                    onClick={(event) => handleDelete(event, Product.id)}
                  >
                    Delete
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
                <div className="flex items-center justify-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => handleUpdate(Product)}
                  >
                    Update
                  </button>
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
