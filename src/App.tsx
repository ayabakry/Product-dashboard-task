import { useProducts } from './hooks/useProducts';

function App() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Products: {data?.products.length}</h1>
    </div>
  );
}

export default App;