import { useState } from 'react'
import { Container, Grid, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, Box,Divider } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../store/cartSlice'

export default function Checkout() {
  const { control, handleSubmit } = useForm()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log('Order submitted:', { ...data, paymentMethod, items })
    dispatch(clearCart())
    // Add navigation to order confirmation page
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>Checkout</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" gutterBottom>Shipping Information</Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="First Name" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Last Name" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Address" fullWidth multiline rows={3} required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="City" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="State" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="zipCode"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="ZIP Code" fullWidth required />
                  )}
                />
              </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Payment Method</Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel 
                value="cod" 
                control={<Radio />} 
                label="Cash on Delivery" 
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label="UPI Payment"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>Order Summary</Typography>
              {items.map(item => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{item.name}</Typography>
                  <Typography>₹{(item.price * (1 - item.discount/100) * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">
                  ₹{(items.reduce((sum, item) => 
                    sum + (item.price * (1 - item.discount/100) * item.quantity), 0) * 0.9).toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ mt: 3 }}
              >
                Place Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}