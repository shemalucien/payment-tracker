// OrderForm.tsx
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Option } from '@material-tailwind/react';
import { Order } from "@/types/order";
import { Client } from "@/types/client";
import { Product } from '@/types/product';

import { TextField, Autocomplete, CircularProgress, Select, MenuItem, Button } from '@mui/material';


interface OrderFormProps {
    onSubmit: (data: Order) => void;
    defaultValues: Order;

}

// Assuming you have an interface for InvoiceItem that looks something like this:
interface InvoiceItem {
    product: Product | null; // Allow product to be Product or null
    quantity: number;
    totalPrice: number;
}


function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}


// Simulate fetching clients and products asynchronously
const fetchClients = async (): Promise<Client[]> => {
    await sleep(1000); // Simulate network delay
    return [
        {
            id: 'client-1',
            logo: "/images/user/charles.png",
            name: "Kalisa",
            Tinnumber: "1234578",
            contact: "0788888888",
            address1: "Nyarugenge",
            address2: "Kimisagara",
        },
        {
            id: 'client-2',
            logo: "/images/user/charles.png",
            name: "Kagabo",
            Tinnumber: "1234578",
            contact: "0788888888",
            address1: "Nyarugenge",
            address2: "Kimisagara",
        },
        {
            id: 'client-3',
            logo: "/images/user/charles.png",
            name: "Mukamana",
            Tinnumber: "1234578",
            contact: "0788888888",
            address1: "Nyarugenge",
            address2: "Kimisagara",
        },
        {
            id: 'client-4',
            logo: "/images/user/charles.png",
            name: "Janvier",
            Tinnumber: "1234578",
            contact: "0788888888",
            address1: "Nyarugenge",
            address2: "Kimisagara",
        },
        {
            id: 'client-5',
            logo: "/images/user/charles.png",
            name: "Vincent",
            Tinnumber: "1234578",
            contact: "0788888888",
            address1: "Nyarugenge",
            address2: "Kimisagara",
        },
    ];
};

const fetchProducts = async (): Promise<Product[]> => {
    await sleep(1000); // Simulate network delay
    return [
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
            image: "/images/product/Panache.png",
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
    ];
};


const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, defaultValues }) => {


    const { handleSubmit, control, getValues, setValue } = useForm<Order>({ defaultValues });



    const [openClient, setOpenClient] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [clients, setClients] = useState<readonly Client[]>([]);
    const [products, setProducts] = useState<readonly Product[]>([]);
    const loadingClient = openClient && clients.length === 0;
    const loadingProduct = openProduct && products.length === 0;

    // State to keep track of invoice items
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([{ product: null, quantity: 1, totalPrice: 0 }]);

    // Function to add a new item to the invoice
    const addNewItem = () => {
        setInvoiceItems([...invoiceItems, { product: null, quantity: 1, totalPrice: 0 }]);
    };

    // Function to handle product selection for an item
    const handleProductSelection = (index: number, newValue: Product) => {
        const updatedItems = [...invoiceItems];
        updatedItems[index].product = newValue; // This should now be allowed
        updatedItems[index].totalPrice = newValue.price * updatedItems[index].quantity;
        setInvoiceItems(updatedItems);
    };

    // Function to handle quantity change for an item
    const handleQuantityChange = (index: number, newQuantity: number) => {
        const updatedItems = [...invoiceItems];
        updatedItems[index].quantity = newQuantity;
        // Use optional chaining with nullish coalescing to handle undefined values correctly
        updatedItems[index].totalPrice = newQuantity * (updatedItems[index].product?.price || 0);
        setInvoiceItems(updatedItems);
    };



    const calculateTotalAmount = () => {
        const values = getValues();
        const total = values && values.products ? values.products.reduce((acc, product) => acc + (product.price || 0) * (product.quantity || 0), 0) : 0;
        return total;
    };

    const removeItem = (index: number) => {
        const updatedItems = [...invoiceItems];
        updatedItems.splice(index, 1);
        setInvoiceItems(updatedItems);
       };
       

    useEffect(() => {
        let active = true;

        if (!loadingClient) {
            return undefined;
        }

        (async () => {
            const fetchedClients = await fetchClients();
            if (active) {
                setClients(fetchedClients);
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingClient]);

    useEffect(() => {
        let active = true;

        if (!loadingProduct) {
            return undefined;
        }

        (async () => {
            const fetchedProducts = await fetchProducts();
            if (active) {
                setProducts(fetchedProducts);
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingProduct]);

    useEffect(() => {
        if (!openClient) {
            setClients([]);
        }
    }, [openClient]);

    useEffect(() => {
        if (!openProduct) {
            setProducts([]);
        }
    }, [openProduct]);


    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mb-8 w-full max-w-lg mx-auto text-black dark:text-white dark:bg-black bg-white p-6 rounded-lg shadow-lg'>
                <div className="mb-6">
                    <Autocomplete
                        id="client-autocomplete"
                        open={openClient}
                        onOpen={() => {
                            setOpenClient(true);
                        }}
                        onClose={() => {
                            setOpenClient(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        options={clients}
                        loading={loadingClient}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Client"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loadingClient ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                        onChange={(event, newValue) => {
                            // Check if newValue is not null and extract the name property
                            if (newValue) {
                                setValue('client', newValue.name);
                            } else {
                                // If newValue is null, you might want to clear the value or handle it differently
                                setValue('client', '');
                            }
                        }}

                    />
                </div>
                <div className="mb-6">
                    <Autocomplete
                        id="product-autocomplete"
                        open={openProduct}
                        onOpen={() => {
                            setOpenProduct(true);
                        }}
                        onClose={() => {
                            setOpenProduct(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        options={products}
                        loading={loadingProduct}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Product"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loadingProduct ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                // Assuming you want to add a new product or update an existing one
                                // First, get the current products array
                                const currentProducts = getValues('products') || [];
                                // Find the index of the product if it already exists in the array
                                const productIndex = currentProducts.findIndex(product => product.id === newValue.id);
                                let updatedProducts;
                                updatedProducts = [...currentProducts, { ...newValue, quantity: 1, image: "/images/product/Malt-with-Glass.png" }];
                                if (productIndex !== -1) {
                                    // If the product exists, update its details
                                    updatedProducts = currentProducts.map((product, index) =>
                                        index === productIndex ? { ...product, name: newValue.name, price: newValue.price } : product
                                    );
                                } else {
                                    // If the product does not exist, add it to the array
                                    updatedProducts = [...currentProducts, { ...newValue, quantity: 1 }];
                                }
                                // Set the updated products array back into the form state
                                setValue('products', updatedProducts);
                            } else {
                                // If no product is selected, clear the products array
                                setValue('products', []);
                            }
                        }}

                    />

                </div>



                <div className="mb-6 text-black dark:text-white dark:bg-black ">
                    <Controller
                        name="quantity"
                        control={control}
                        defaultValue={defaultValues?.quantity !== undefined ? defaultValues?.quantity : undefined}
                        render={({ field }) => (
                            <TextField
                                type="number"
                                label="Quantity"
                                {...field}
                            />
                        )}
                    />
                </div>
                {/* <div className="mb-6 text-black dark:text-white dark:bg-black ">
                    <Controller
                        name="paymentMode"
                        control={control}
                        defaultValue={defaultValues?.paymentMode || ''}
                        render={({ field }) => (
                            <Select
                                label="Payment Mode"
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                                placeholder="Select Payment Mode"
                            >
                                <Option value="Cash">Cash</Option>
                                <Option value="Cheque">Cheque</Option>
                                <Option value="Credit">Credit</Option>
                            </Select>
                        )}
                    />
                </div> */}

                {/* <div className="mb-6  text-black dark:text-white dark:bg-black ">

                    <label htmlFor="invoiceDate" className="block text-sm font-medium text-black dark:text-white">Invoice Date</label>
                    <Controller
                        name="invoiceDate"
                        control={control}
                        defaultValue={defaultValues?.invoiceDate || ''}
                        render={({ field }) =>

                            <TextField
                                type="date"
                                label="Invoice Date"
                                {...field}
                            />

                        }
                    />
                </div> */}
                {/* <div className="mb-6 text-black dark:text-white dark:bg-black ">
                    <Controller
                        name="status"
                        control={control}
                        defaultValue={defaultValues?.status || ''}
                        render={({ field }) => (
                            <Select
                                label="Status"
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                                placeholder={"Select Status"}
                            >
                                <Option value="Paid">Paid</Option>
                                <Option value="Unpaid">Unpaid</Option>
                                <Option value="Pending">Pending</Option>
                            </Select>
                        )}
                    />
                </div> */}
                {/* Render invoice items */}
                {invoiceItems.map((item, index) => (
                    <div key={index} className="mb-6 flex items-center justify-between">
                    {/* Product Name */}
                    <div className="mb-2 flex-grow">{item.product ? item.product.name : 'No product selected'}</div>
                    {/* Quantity */}
                    <div className="mb-2">Quantity: {item.quantity}</div>
                    {/* Total Price */}
                    <div className="mb-2">Total Price: {item.totalPrice}</div>
                    {/* Delete Button */}
                    <button className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove Item</button>
                </div>
                
                ))}

                <Button onClick={addNewItem}>Add New Item</Button>
                {/* Total Amount */}
                <div className="mb-6">
                    <label>Total Amount:</label>
                    <span>{invoiceItems.reduce((total, item) => total + item.totalPrice, 0)}</span>
                </div>

                <button className="mt-4 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default OrderForm;
