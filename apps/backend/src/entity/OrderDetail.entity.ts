// OrderDetail.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order.entity';
import { Product } from './Product.entity';

@Entity({ name: 'order_details' })
export class OrderDetail {
 @PrimaryColumn({ type: 'integer' })
 public orderId: number;

 @PrimaryColumn({ type: 'integer' })
 public productId: number;

 @Column({ type: 'integer' })
 public quantity: number;

 @ManyToOne(() => Order, (order) => order.orderDetails)
 @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
 public order: Order;

 @ManyToOne(() => Product, (product) => product.orderDetails)
 @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
 public product: Product;
}