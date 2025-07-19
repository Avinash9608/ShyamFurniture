import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Placeholder data for orders
const orders = [
  {
    id: "ORD001",
    customer: "Rohan Sharma",
    date: "2024-07-20",
    status: "Fulfilled",
    total: 1250.75,
  },
  {
    id: "ORD002",
    customer: "Priya Patel",
    date: "2024-07-19",
    status: "Processing",
    total: 899.00,
  },
  {
    id: "ORD003",
    customer: "Amit Singh",
    date: "2024-07-19",
    status: "Fulfilled",
    total: 450.00,
  },
  {
    id: "ORD004",
    customer: "Sneha Reddy",
    date: "2024-07-18",
    status: "Cancelled",
    total: 275.50,
  },
   {
    id: "ORD005",
    customer: "Vikas Kumar",
    date: "2024-07-17",
    status: "Fulfilled",
    total: 1500.00,
  },
]

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            A list of recent orders from your customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === 'Fulfilled' ? 'default' :
                      order.status === 'Processing' ? 'secondary' :
                      'destructive'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">INR {order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
