import React, { useState } from 'react';
import { Box, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuthStore } from '../store/auth.store';

import LoginIcon from '../components/login/LoginIcon';
import LoginHeader from '../components/login/LoginHeader';
import LoginInput from '../components/login/LoginInput';
import LoginActions from '../components/login/LoginActions';

type Errors = {
  username?: string;
  password?: string;
  common?: string;
};

const LoginPage: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const nextErrors: Errors = {};
    if (!username.trim()) nextErrors.username = 'Введите логин';
    if (!password.trim()) nextErrors.password = 'Введите пароль';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      await login(username, password, remember);
      navigate('/products');
    } catch (err: unknown) {
      setErrors({
        common: err instanceof Error ? err.message : 'Ошибка авторизации',
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <Box
        w="full"
        maxW="md"
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <LoginIcon />
            <LoginHeader />

            {errors.common && (
              <Alert status="error">
                <AlertIcon />
                {errors.common}
              </Alert>
            )}

            <LoginInput
              label="Логин"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  username: undefined,
                  common: undefined,
                }));
              }}
              error={errors.username}
              leftIcon={FaUser}
              showClear
              onClear={() => setUsername('')}
              required
              autoComplete="username"
            />

            <LoginInput
              label="Пароль"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  password: undefined,
                  common: undefined,
                }));
              }}
              error={errors.password}
              leftIcon={FaLock}
              type={showPassword ? 'text' : 'password'}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              required
              autoComplete="current-password"
            />

            <LoginActions
              remember={remember}
              onRememberChange={setRemember}
              submitButtonProps={{ type: 'submit' }}
            />
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
