import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export type SortOption = 'priceLowHigh' | 'priceHighLow' | 'ratingHighLow' | 'nameAZ' | '';

interface SortControlProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

function SortControl({ value, onChange }: SortControlProps) {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="sort-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-select-label"
        value={value}
        label="Sort By"
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <MenuItem value="">Default</MenuItem>
        <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
        <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
        <MenuItem value="ratingHighLow">Rating: High to Low</MenuItem>
        <MenuItem value="nameAZ">Name: A-Z</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortControl;
