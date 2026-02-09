import React from 'react';
import {
  Tr,
  Td,
  Button,
  HStack,
  VStack,
  Text,
  Image,
} from '@chakra-ui/react';
import type { Product } from '../../store/products.store';

interface ProductRowProps {
  product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  return (
    <Tr>
      <Td w="40px">
        <input type="checkbox" />
      </Td>

      <Td w="300px">
        <HStack spacing={3} align="center">
          <Image
            src={product.thumbnail || ''}
            alt={product.title}
            boxSize="48px"
            objectFit="cover"
            borderRadius="md"
            bg="gray.100"
          />
          <VStack align="start" spacing={0} maxW="220px">
            <Text fontWeight="semibold" noOfLines={1}>
              {product.title}
            </Text>
            <Text fontSize="sm" color="gray.500" noOfLines={1}>
              {product.brand}
            </Text>
          </VStack>
        </HStack>
      </Td>

      <Td w="150px">{product.brand}</Td>
      <Td w="120px">{product.sku}</Td>
      <Td
        w="80px"
        color={product.rating < 3 ? 'red.500' : 'gray.800'}
        fontWeight="medium"
      >
        {product.rating}
      </Td>
      <Td w="100px">${product.price}</Td>
      <Td w="60px">
        <Button size="sm" colorScheme="green">
          +
        </Button>
      </Td>
      <Td w="60px">
        <Button size="sm" variant="ghost">
          ⋮
        </Button>
      </Td>
    </Tr>
  );
};

export default ProductRow;
