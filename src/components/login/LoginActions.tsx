import React from 'react';
import { VStack, Checkbox, Button, Divider, HStack, Text, type ButtonProps } from '@chakra-ui/react';

interface LoginActionsProps {
  remember: boolean;
  onRememberChange: (checked: boolean) => void;
  onLogin?: () => void;
  submitButtonProps?: ButtonProps;
}

const LoginActions: React.FC<LoginActionsProps> = ({
  remember,
  onRememberChange,
  onLogin,
  submitButtonProps,
}) => (
  <VStack spacing={4} align="stretch">
    <Checkbox isChecked={remember} onChange={(e) => onRememberChange(e.target.checked)}>
      Запомнить данные
    </Checkbox>

    <Button
      colorScheme="blue"
      onClick={onLogin}
      {...submitButtonProps}
    >
      Войти
    </Button>

    <Divider />

    <HStack justify="center">
      <Text>Нет аккаунта?</Text>
      <Button variant="link" colorScheme="blue" size="sm">
        Создать
      </Button>
    </HStack>
  </VStack>
);

export default LoginActions;
