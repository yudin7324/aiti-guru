import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from '@chakra-ui/react';
import type { Product } from '../../store/products.store';
import ProductRow from './ProductRow';

interface ProductsTableProps {
  products: Product[];
  sortBy: keyof Product | null;
  sortOrder: 'asc' | 'desc';
  onSort: (column: keyof Product) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const renderSort = (column: keyof Product) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <Table sx={{ tableLayout: 'fixed' }}>
      <Thead>
        <Tr>
          <Th w="40px" />
          <Th w="300px" cursor="pointer" onClick={() => onSort('title')}>
            Наименование{renderSort('title')}
          </Th>
          <Th w="150px" cursor="pointer" onClick={() => onSort('brand')}>
            Вендор{renderSort('brand')}
          </Th>
          <Th w="120px">Артикул</Th>
          <Th w="80px" cursor="pointer" onClick={() => onSort('rating')}>
            Оценка{renderSort('rating')}
          </Th>
          <Th w="100px" cursor="pointer" onClick={() => onSort('price')}>
            Цена{renderSort('price')}
          </Th>
          <Th w="60px" />
          <Th w="60px" />
        </Tr>
      </Thead>

      <Tbody>
        {products.map(product => (
          <ProductRow key={product.id} product={product} />
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductsTable;
