import { Container, Typography, Box, Paper, Divider, Chip } from '@mui/material'
import { History, LocalShipping, CheckCircle } from '@mui/icons-material'

const orders = [
  {
    id: 'ORD-001',
    date: '2023-07-20',
    status: 'Delivered',
    items: [
      { name: 'Paracetamol 500mg', price: 15, quantity: 2 },
      { name: 'Vitamin C 1000mg', price: 120, quantity: 1 }
    ],
    total: 150
  }
]

export default function OrderHistory() {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <History sx={{ mr: 2 }} /> Order History
      </Typography>

      {orders.map(order => (
        <Paper key={order.id} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Order #{order.id}</Typography>
            <Chip 
              label={order.status}
              color={order.status === 'Delivered' ? 'success' : 'primary'}
              icon={order.status === 'Delivered' ? <CheckCircle /> : <LocalShipping />}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {order.items.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>{item.quantity}x {item.name}</Typography>
              <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">₹{order.total.toFixed(2)}</Typography>
          </Box>
        </Paper>
      ))}

      {orders.length === 0 && (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
          No orders found
        </Typography>
      )}
    </Container>
  )
}