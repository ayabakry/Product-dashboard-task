import { FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { useCategories } from '../hooks/useCategories';

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const { data: categories } = useCategories();

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        value={value}
        label="Category"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories?.map((cat) => (
          <MenuItem key={cat.slug} value={cat.slug}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategoryFilter;