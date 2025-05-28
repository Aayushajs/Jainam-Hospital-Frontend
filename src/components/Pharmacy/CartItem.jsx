import { Box, Typography, IconButton, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
      <img 
        src={item.image} 
        alt={item.name} 
        style={{ width: 80, height: 80, objectFit: 'contain', marginRight: 16 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {item.manufacturer}
        </Typography>
        <Typography variant="body1" color="primary">
          ₹{(item.price * (1 - item.discount/100)).toFixed(2)}
        </Typography>
      </Box>
      <TextField
        type="number"
        value={item.quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        inputProps={{ min: 1 }}
        sx={{ width: 80, mx: 2 }}
      />
      <IconButton onClick={onRemove} color="error">
        <Delete />
      </IconButton>
    </Box>
  );
}