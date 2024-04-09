// EditOrderModal.tsx
import React, { useState } from 'react';
import OrderForm from './OrderForm';
import { Order } from '@/types/order';

interface EditOrderModalProps {
 order: Order;
 onClose: () => void;
 onUpdate: (updatedOrder: Order) => void;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({ order, onClose, onUpdate }) => {
 const handleSubmit = (updatedOrder: Order) => {
    onUpdate(updatedOrder);
    onClose();
 };

 return (
    <div>
      <OrderForm onSubmit={handleSubmit} defaultValues={order} />
      <button className="btn btn-primary" onClick={onClose}>Close</button>
    </div>
 );
};

export default EditOrderModal;
