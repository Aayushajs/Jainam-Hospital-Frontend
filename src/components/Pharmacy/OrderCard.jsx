import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { LocalShipping, CheckCircle, Cancel } from '@mui/icons-material';

export default function OrderCard({ order }) {
  const getStatusIcon = () => {
    switch(order.status) {
      case 'Delivered': return <CheckCircle color="success" />;
      case 'Shipped': return <LocalShipping color="info" />;
      case 'Cancelled': return <Cancel color="error" />;
      default: return null;
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Order #{order.id}</Typography>
          <Chip 
            label={order.status} 
            icon={getStatusIcon()}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
        
        {order.items.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>{item.quantity}x {item.name}</Typography>
            <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
          </Box>
        ))}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="subtitle1">Total</Typography>
          <Typography variant="subtitle1">₹{order.total.toFixed(2)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}