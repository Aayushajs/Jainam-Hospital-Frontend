import { Card, CardMedia, CardContent, Typography, Button, CardActions, Chip, IconButton, Box } from '@mui/material';
import { AddShoppingCart, FavoriteBorder, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.manufacturer}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" color="primary">
            ₹{(product.price * (1 - product.discount/100)).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mx: 1, textDecoration: 'line-through' }}>
            ₹{product.price}
          </Typography>
          <Chip label={`${product.discount}% OFF`} color="error" size="small" />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button size="small" component={Link} to={`/product/${product.id}`}>
          View Details
        </Button>
        <Button 
          size="small" 
          startIcon={<AddShoppingCart />}
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </Button>
      </CardActions>
      <IconButton 
        sx={{ position: 'absolute', top: 5, right: 5 }}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
    </Card>
  );
}