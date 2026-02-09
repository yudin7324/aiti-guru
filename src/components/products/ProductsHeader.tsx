import React from 'react';
import {
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

interface ProductsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (n: number) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  search,
  onSearchChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <HStack mb={6} justify="space-between">
      <Text fontSize="2xl" fontWeight="bold">
        Товары
      </Text>

      <InputGroup maxW="420px">
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray" />
        </InputLeftElement>
        <Input
          placeholder="Найти..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </InputGroup>

      <Select
        w="120px"
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
      >
        {[5, 10, 15, 20].map(n => (
          <option key={n} value={n}>
            {n} / стр
          </option>
        ))}
      </Select>
    </HStack>
  );
};

export default ProductsHeader;
