import React from 'react';
import { HStack, Text, Button, IconButton } from '@chakra-ui/react';
import { FaSync } from 'react-icons/fa';

interface ProductsToolbarProps {
  onRefresh: () => void;
  onAdd: () => void;
}

const ProductsToolbar: React.FC<ProductsToolbarProps> = ({
  onRefresh,
  onAdd,
}) => {
  return (
    <HStack mb={4} justify="space-between">
      <Text fontSize="lg" fontWeight="semibold">
        Все позиции
      </Text>

      <HStack>
        <IconButton
          aria-label="refresh"
          icon={<FaSync />}
          size="sm"
          onClick={onRefresh}
        />
        <Button colorScheme="blue" size="sm" onClick={onAdd}>
          Добавить
        </Button>
      </HStack>
    </HStack>
  );
};

export default ProductsToolbar;
