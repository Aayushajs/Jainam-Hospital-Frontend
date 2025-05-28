import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push(action.payload)
      }
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const itemToUpdate = state.items.find(item => item.id === id)
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity
      }
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    clearCart: (state) => {
      state.items = []
      state.totalAmount = 0
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer