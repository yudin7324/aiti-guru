import React from 'react';
import {
  HStack,
  Text,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProductsPaginationProps {
  page: number;
  total: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

const ProductsPagination: React.FC<ProductsPaginationProps> = ({
  page,
  total,
  rowsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / rowsPerPage);

  const getPages = () => {
    const max = 5;
    let start = Math.max(page - 2, 1);
    const end = Math.min(start + max - 1, totalPages);
    if (end - start + 1 < max) {
      start = Math.max(end - max + 1, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <HStack mt={4} justify="space-between">
      <Text>
        Показано {(page - 1) * rowsPerPage + 1}–
        {Math.min(page * rowsPerPage, total)} из {total}
      </Text>

      <HStack>
        <IconButton
          aria-label="prev"
          icon={<FaChevronLeft />}
          size="sm"
          isDisabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        />

        {getPages().map(p => (
          <Button
            key={p}
            size="sm"
            variant={p === page ? 'solid' : 'outline'}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ))}

        <IconButton
          aria-label="next"
          icon={<FaChevronRight />}
          size="sm"
          isDisabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        />
      </HStack>
    </HStack>
  );
};

export default ProductsPagination;
