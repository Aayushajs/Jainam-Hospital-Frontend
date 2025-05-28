import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  Tabs,
  Tab,
  Rating,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import {
  AddShoppingCart,
  FavoriteBorder,
  Favorite,
  ArrowBack,
} from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const { items: products } = useSelector((state) => state.products);
  const product = products.find((p) => p.id === parseInt(id));
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  if (!product) {
    return (
      <Container sx={{ py: 8 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2, display: { md: 'none' } }}>
        <ArrowBack />
      </IconButton>
      <Grid container spacing={isMobile ? 3 : 5}>
        {/* Left: Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 4,
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              p: 3,
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'contain',
              }}
            />
          </Box>
        </Grid>

        {/* Right: Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            By {product.manufacturer}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              ({product.reviews})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
              ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
            </Typography>
            {product.discount > 0 && (
              <>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: 'line-through', color: 'gray', mr: 1 }}
                >
                  ₹{product.price}
                </Typography>
                <Typography variant="body2" color="error">
                  ({product.discount}% OFF)
                </Typography>
              </>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexDirection: isMobile ? 'column' : 'row' }}>
            <Button
              variant="contained"
              fullWidth={isMobile}
              size="large"
              startIcon={<AddShoppingCart />}
              onClick={() => dispatch(addToCart(product))}
              sx={{ py: 1, borderRadius: 2 }}
            >
              Add to Cart
            </Button>
            <IconButton
              color={isFavorite ? 'error' : 'default'}
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                ...(isMobile && { width: '100%' }),
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab label="Description" />
            <Tab label="Details" />
            <Tab label="Reviews" />
          </Tabs>
          <Divider />

          <Box sx={{ mt: 2 }}>
            {tabValue === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {product.description}
              </Typography>
            )}
            {tabValue === 1 && (
              <Box>
                <Typography variant="body2" gutterBottom>
                  <strong>Category:</strong> {product.category}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Manufacturer:</strong> {product.manufacturer}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Salt Composition:</strong> {product.salt}
                </Typography>
                {product.weight && (
                  <Typography variant="body2" gutterBottom>
                    <strong>Weight:</strong> {product.weight}
                  </Typography>
                )}
                {product.dimensions && (
                  <Typography variant="body2" gutterBottom>
                    <strong>Dimensions:</strong> {product.dimensions}
                  </Typography>
                )}
              </Box>
            )}
            {tabValue === 2 && (
              <Typography variant="body2" color="text.secondary">
                No reviews yet.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;