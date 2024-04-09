// ViewOrderModal.tsx
import React, { useState } from 'react';
import OrderForm from './OrderForm';
import { Order } from '@/types/order';

interface ViewOrderModalProps {
    order: Order;
    onClose: () => void;
}

const ViewOrderModal: React.FC<ViewOrderModalProps> = ({ order, onClose }) => {
    return (
        <div>
            <OrderForm onSubmit={onClose} defaultValues={order} />
            <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
    );
};

export default ViewOrderModal;