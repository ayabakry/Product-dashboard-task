import { useState, useMemo } from 'react';
import {
    Grid,
    Typography,
    CircularProgress,
    Alert,
    Box,
    Stack,
    IconButton,
    Tooltip,
    Pagination,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { useSearch } from '../hooks/useSearch';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SortControl, { type SortOption } from '../components/SortControl';
import Hero from '../components/Hero';

const ITEMS_PER_PAGE = 12;

function Dashboard() {
    const { data, isLoading, error } = useProducts();
    const { search, setSearch } = useSearch();
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState<SortOption>('');
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search, 400);

    const allProducts = data?.products ?? [];

    const filteredProducts = allProducts.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory = category === '' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sort === 'priceLowHigh') return a.price - b.price;
        if (sort === 'priceHighLow') return b.price - a.price;
        if (sort === 'ratingHighLow') return b.rating - a.rating;
        if (sort === 'nameAZ') return a.title.localeCompare(b.title);
        return 0;
    });

    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

    const paginatedProducts = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [sortedProducts, page]);

    const [prevFilters, setPrevFilters] = useState({
        search: debouncedSearch,
        category,
        sort,
    });

    if (
        prevFilters.search !== debouncedSearch ||
        prevFilters.category !== category ||
        prevFilters.sort !== sort
    ) {
        setPrevFilters({ search: debouncedSearch, category, sort });
        setPage(1);
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 4 }}>
                Failed to load products. Please try again later.
            </Alert>
        );
    }

    const hasActiveFilters = search !== '' || category !== '' || sort !== '';

    const clearFilters = () => {
        setSearch('');
        setCategory('');
        setSort('');
        setPage(1);
    };

    return (
        <>
            <Hero />
            <Box id="products">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ mb: 3 }}
                    justifyContent="flex-end"
                >
                    <CategoryFilter value={category} onChange={(value) => setCategory(value)} />
                    <SortControl value={sort} onChange={(value) => setSort(value)} />
                    {hasActiveFilters && (
                        <Tooltip title="Clear filters">
                            <IconButton
                                onClick={clearFilters}
                                aria-label="Clear all filters"
                                sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : 'primary.main') }}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>

                {paginatedProducts.length === 0 ? (
                    <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
                        No products found.
                    </Typography>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {paginatedProducts.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
}

export default Dashboard;
