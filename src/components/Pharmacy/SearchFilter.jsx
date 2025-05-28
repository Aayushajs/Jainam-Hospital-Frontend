import { Box, TextField, Slider, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';

export default function SearchFilter({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Search Medicines"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        sx={{ mb: 3 }}
      />
      
      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={(_, newValue) => {
          setPriceRange(newValue);
          onFilter({ price: newValue });
        }}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        sx={{ mb: 3 }}
      />
      
      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>
      {['Pain Relief', 'Vitamins', 'Antibiotics', 'Diabetes'].map(category => (
        <FormControlLabel
          key={category}
          control={<Checkbox />}
          label={category}
          onChange={(e) => onFilter({ 
            category,
            checked: e.target.checked 
          })}
        />
      ))}
    </Box>
  );
}