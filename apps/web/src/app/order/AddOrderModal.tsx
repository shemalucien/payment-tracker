
import React, { useState } from 'react';
import OrderForm from './OrderForm';
import { Order } from '@/types/order';

interface AddOrderModalProps {
 order: Order;
 onClose: () => void;
 onCreate: (newOrder: Order) => void;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ order, onClose, onCreate }) => {
 const handleSubmit = (newOrder: Order) => {
    onCreate(newOrder);
    onClose();
 };

 return (
    <div>
      <OrderForm onSubmit={handleSubmit} defaultValues={order} />
      <button className="btn btn-primary" onClick={onClose}>Close</button>
    </div>
 );
};

export default AddOrderModal;

