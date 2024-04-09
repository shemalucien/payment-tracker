// OrderForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, Option } from '@material-tailwind/react';
import { Order } from "@/types/order";

interface OrderFormProps {
    onSubmit: (data: Order) => void;
    defaultValues: Order;

}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, defaultValues }) => {
    const { handleSubmit, control, getValues } = useForm<Order>({ defaultValues });


    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mb-8 w-full max-w-lg mx-auto text-black dark:text-white dark:bg-black bg-white p-6 rounded-lg shadow-lg'>
                <div className="mb-6  text-black dark:text-white dark:bg-black ">
                    <label htmlFor="name" className="block text-sm font-medium text-black dark:text-white">Name</label>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={defaultValues?.name || ''}
                        render={({ field }) => <input {...field} placeholder="Name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />}
                    />
                </div>
                <div className="mb-6  text-black dark:text-white dark:bg-black ">
                    <label htmlFor="price" className="block text-sm font-medium text-black dark:text-white">Price</label>
                    <Controller
                        name="price"
                        control={control}
                        defaultValue={defaultValues?.price !== undefined ? Number(defaultValues.price) : undefined}
                        render={({ field }) => <input {...field} placeholder="Price" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />}
                    />
                </div>
                <div className="mb-6  text-black dark:text-white dark:bg-black ">

                    <label htmlFor="invoiceDate" className="block text-sm font-medium text-black dark:text-white">Invoice Date</label>
                    <Controller
                        name="invoiceDate"
                        control={control}
                        defaultValue={defaultValues?.invoiceDate || ''}
                        render={({ field }) => <input {...field} placeholder="Invoice Date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />}
                    />
                </div>
                <div className="mb-6 text-black dark:text-white dark:bg-black ">
                    <label htmlFor="status" className="block text-sm font-medium text-black dark:text-white">Status</label>
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
                                <Option  value="Paid">Paid</Option>
                                <Option  value="Unpaid">Unpaid</Option>
                                <Option  value="Pending">Pending</Option>
                            </Select>
                        )}
                    />
                </div>

                <button className="mt-4 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default OrderForm;

