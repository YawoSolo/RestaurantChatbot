import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { Card, ListGroup } from "react-bootstrap";

export default function OrderHistory() {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const querySnapshot = await getDocs(
        query(ordersRef, orderBy("createdAt", "desc"))
      );
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const saveOrder = async (userId, orderDetails) => {
    try {
      await addDoc(collection(db, "users", userId, "orders"), {
        ...orderDetails,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error saving order: ", error);
    }
  };

  return (
    <Card className="p-3">
      <Card.Title className="mb-0 text-center">Your Order History</Card.Title>
      <ListGroup variant="flush">
        {orders.length === 0 ? (
          <ListGroup.Item>No orders found.</ListGroup.Item>
        ) : (
          orders.map((order) => (
            <ListGroup.Item key={order.id}>
              <div>
                <strong>Order:</strong>{" "}
                {order.items ? order.items.join(", ") : JSON.stringify(order)}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : ""}
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
}
