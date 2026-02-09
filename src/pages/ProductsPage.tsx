import React, { useEffect } from 'react';
import { Box, Spinner, Center, useDisclosure } from '@chakra-ui/react';
import { useProductsStore } from '../store/products.store';

import ProductsHeader from '../components/products/ProductsHeader';
import ProductsToolbar from '../components/products/ProductsToolbar';
import ProductsTable from '../components/products/ProductsTable';
import ProductsPagination from '../components/products/ProductsPagination';
import AddProductModal from '../components/products/AddProductModal';

const ProductsPage: React.FC = () => {
  const {
    products,
    loading,
    fetchProducts,
    search,
    setSearch,
    page,
    setPage,
    sortBy,
    sortOrder,
    setSort,
    rowsPerPage,
    setRowsPerPage,
  } = useProductsStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  let filtered = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy) {
    filtered = [...filtered].sort((a, b) => {
      const A = a[sortBy];
      const B = b[sortBy];
      if (typeof A === 'number' && typeof B === 'number') {
        return sortOrder === 'asc' ? A - B : B - A;
      }
      return String(A).localeCompare(String(B));
    });
  }

  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box p={10}>
      <ProductsHeader
        search={search}
        onSearchChange={setSearch}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(n) => {
          setRowsPerPage(n);
          setPage(1);
        }}
      />

      <ProductsToolbar
        onRefresh={fetchProducts}
        onAdd={onOpen}
      />

      {loading ? (
        <Center py={20}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          <ProductsTable
            products={paginated}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={setSort}
          />

          <ProductsPagination
            page={page}
            total={filtered.length}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
          />
        </>
      )}

      <AddProductModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ProductsPage;
