import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collectionGroup,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { Card, Button, Table, Badge, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = ["new", "in progress", "declined", "completed"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    navigate("/admin");
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin") !== "true") {
      navigate("/admin");
    } else {
      fetchOrders();
    }
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async () => {
    const q = query(
      collectionGroup(db, "orders"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const allOrders = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ref: docSnap.ref,
      ...docSnap.data(),
    }));
    setOrders(allOrders);
  };

  const updateStatus = async (orderRef, status) => {
    await updateDoc(orderRef, { status });
    fetchOrders();
  };

  // Group orders by status
  const grouped = STATUS_OPTIONS.reduce((acc, status) => {
    acc[status] = orders.filter((order) => order.status === status);
    return acc;
  }, {});

  return (
    <Card className="p-3 mt-3 mb-3">
      <Row className="align-items-center mb-3">
        <Col>
          <Card.Title className="mb-0 text-center">
            Admin Order Management
          </Card.Title>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      {STATUS_OPTIONS.map((status) => (
        <div key={status} className="mb-4">
          <h5>
            {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
            <Badge bg="secondary">{grouped[status]?.length || 0}</Badge>
          </h5>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>User</th>
                <th>Items</th>
                <th>Created</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {grouped[status]?.length ? (
                grouped[status].map((order) => (
                  <tr key={order.id}>
                    <td>{order.userId || "N/A"}</td>
                    <td>
                      <ul>
                        {order.items?.map((item, idx) => (
                          <li key={idx}>
                            {item.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      {order.createdAt?.toDate
                        ? order.createdAt.toDate().toLocaleString()
                        : ""}
                    </td>
                    <td>
                      <Badge
                        bg={
                          status === "new"
                            ? "info"
                            : status === "in progress"
                            ? "warning"
                            : status === "completed"
                            ? "success"
                            : "danger"
                        }
                      >
                        {status}
                      </Badge>
                    </td>
                    <td>
                      {STATUS_OPTIONS.filter((s) => s !== status).map((opt) => (
                        <Button
                          key={opt}
                          size="sm"
                          variant="outline-primary"
                          className="me-1 mb-1"
                          onClick={() => updateStatus(order.ref, opt)}
                        >
                          {opt}
                        </Button>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No orders in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      ))}
    </Card>
  );
}
