import { useState } from 'react'
import { Container, Grid, Typography, TextField, Pagination, Slider, FormControlLabel, Checkbox, Chip } from '@mui/material'
import ProductCard from '../../components/Pharmacy/ProductCard'
import { useSelector } from 'react-redux'

const categories = ['Pain Relief', 'Vitamins', 'Antibiotics', 'Diabetes']
const priceMarks = [
  { value: 0, label: '₹0' },
  { value: 1000, label: '₹1000' }
]

export default function Products() {
  const { items: products } = useSelector((state) => state.products)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [page, setPage] = useState(1)
  const productsPerPage = 8

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category)
    const matchesPrice = product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <TextField
        fullWidth
        label="Search medicines"
        variant="outlined"
        sx={{ mb: 4 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={4}>
        {/* Filters */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Filters</Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              marks={priceMarks}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Categories</Typography>
            {categories.map(category => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => setSelectedCategories(prev =>
                      prev.includes(category)
                        ? prev.filter(c => c !== category)
                        : [...prev, category]
                    )}
                  />
                }
                label={category}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedCategories.map(category => (
              <Chip
                key={category}
                label={category}
                onDelete={() => setSelectedCategories(
                  selectedCategories.filter(c => c !== category)
                )}
              />
            ))}
          </Box>
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            {searchTerm ? `Search Results for "${searchTerm}"` : 'All Medicines'}
          </Typography>

          <Grid container spacing={4}>
            {filteredProducts
              .slice((page - 1) * productsPerPage, page * productsPerPage)
              .map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>

          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}