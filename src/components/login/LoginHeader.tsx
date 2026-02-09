import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

const LoginHeader: React.FC = () => (
  <>
    <Heading mb={2}>Добро пожаловать</Heading>
    <Text mb={6} color="gray.500">Пожалуйста, авторизируйтесь</Text>
  </>
);

export default LoginHeader;
