import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Icon,
  Button,
} from '@chakra-ui/react';

interface LoginInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  leftIcon: React.ElementType;
  showClear?: boolean;
  onClear?: () => void;
  type?: 'text' | 'password';
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  required: boolean
  autoComplete?: string;
}

const LoginInput: React.FC<LoginInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  leftIcon,
  showClear,
  onClear,
  type = 'text',
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  required,
  autoComplete
}) => (
  <FormControl isRequired isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={leftIcon} color="gray.400" />
      </InputLeftElement>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
      {showClear && value && onClear && (
        <InputRightElement>
          <Button size="xs" variant="ghost" onClick={onClear}>
            ✕
          </Button>
        </InputRightElement>
      )}
      {showPasswordToggle && onTogglePassword && (
        <InputRightElement>
          <Button size="xs" variant="ghost" onClick={onTogglePassword}>
            {showPassword ? '🙈' : '👁️'}
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
    {error && <FormErrorMessage>{error}</FormErrorMessage>}
  </FormControl>
);

export default LoginInput;
