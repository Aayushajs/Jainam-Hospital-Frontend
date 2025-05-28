import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products')
  // Transform the data to match our pharmacy needs
  return response.data.map((product, index) => ({
    id: product.id,
    name: `Medicine ${index + 1}`,
    manufacturer: ['Cipla', 'Sun Pharma', 'Dr. Reddy', 'Glaxo'][index % 4],
    description: `Effective treatment for ${product.category}. ${product.description}`,
    price: Math.round(product.price * 50), // Convert to INR
    discount: [5, 10, 15, 20][index % 4],
    category: ['Pain Relief', 'Vitamins', 'Antibiotics', 'Diabetes'][index % 4],
    salt: `Salt Composition ${index + 1}`,
    packSize: '10 tablets',
    prescriptionRequired: index % 3 === 0,
    deliveryTime: '2-3 days',
    rating: (index % 5) + 1,
    reviews: Math.floor(Math.random() * 100),
    image: product.image,
    directions: 'Take as directed by your physician. Usually 1 tablet per day.',
    sideEffects: 'May cause mild drowsiness. Consult doctor if symptoms persist.',
    faq1: 'Only if prescribed by your doctor for chronic conditions.',
    faq2: 'No, this medicine is not habit forming when taken as directed.'
  }))
})

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default productSlice.reducer