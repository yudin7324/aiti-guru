import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (username: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
}

const getLoginErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
    case 401:
      return 'Неверный логин или пароль';
    case 500:
      return 'Ошибка сервера. Попробуйте позже';
    default:
      return 'Не удалось выполнить вход';
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  login: async (username, password, remember) => {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error(getLoginErrorMessage(res.status));
    }


    const data = await res.json();

    set({
      token: data.accessToken,
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    if (remember) {
      localStorage.setItem('token', data.accessToken);
    } else {
      sessionStorage.setItem('token', data.accessToken);
    }
  },

  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  },
}));
