import { Container, Grid, Typography, Box, Button, Divider, Paper, Chip, IconButton, Badge } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Close, ArrowBack, LocalShipping, Discount, Add, Remove, ShoppingBag } from '@mui/icons-material';

const CartItemCard = ({ item, onRemove, onQuantityChange, onClick }) => {
  return (
    <Paper 
      component={motion.div}
      whileHover={{ y: -2, boxShadow: 3 }}
      sx={{
        p: 3,
        mb: 2,
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onClick={onClick}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2}>
          <Box
            sx={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: 2,
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
        <Grid item xs={6} sm={7}>
          <Typography variant="subtitle1" fontWeight={600}>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.category}
          </Typography>
          <Typography variant="body1" fontWeight={600} color="primary" mt={1}>
            ₹{item.price.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(Math.max(1, item.quantity - 1));
              }}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography mx={1.5}>{item.quantity}</Typography>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(item.quantity + 1);
              }}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              sx={{ color: 'error.main' }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default function Cart() {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            badgeContent={300}
            color="primary"
            overlap="circular"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '1rem',
                height: 32,
                minWidth: 32,
                borderRadius: '50%',
              },
            }}
          >
            <ShoppingBag sx={{ fontSize: 80, color: 'text.disabled', }} />
          </Badge>
          <Typography variant="h5" fontWeight={700} mt={3} textAlign="center">
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" textAlign="center" mt={1} mb={4}>
            Looks like you haven't added anything to your cart yet
          </Typography>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => navigate('/pharmacy')}
            sx={{
              borderRadius: '12px',
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              maxWidth: 300,
            }}
          >
            Browse Products
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ textTransform: 'none', color: 'text.primary' }}
        >
          Continue Shopping
        </Button>
      </Box>

      <Typography variant="h4" fontWeight={800} mb={3}>
        Your Cart
        <Chip
          label={`${items.length} item${items.length > 1 ? 's' : ''}`}
          color="primary"
          size="small"
          sx={{ ml: 2, fontSize: '0.75rem', height: 24, verticalAlign: 'middle' }}
        />
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CartItemCard
                  item={item}
                  onRemove={() => dispatch(removeFromCart(item.id))}
                  onQuantityChange={(quantity) =>
                    dispatch(updateQuantity({ id: item.id, quantity }))
                  }
                  onClick={() => handleItemClick(item.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Close />}
              onClick={() => dispatch(clearCart())}
              sx={{
                borderRadius: '12px',
                px: 3,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Order Summary
              </Typography>

              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal ({items.length} items)
                  </Typography>
                  <Typography variant="body2">₹{totalAmount.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Typography variant="body2" color="text.secondary">
                    Delivery
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Free
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Typography variant="body2" color="text.secondary">
                    Discount
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    -₹{(totalAmount * 0.1).toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Total Amount
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  ₹{(totalAmount * 0.9).toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => navigate('/checkout')}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                Proceed to Checkout
              </Button>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: 'success.light',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LocalShipping sx={{ color: 'success.main', mr: 1.5 }} />
                <Typography variant="caption" color="success.dark">
                  Free delivery on orders above ₹500. You've saved ₹50 on this order.
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}