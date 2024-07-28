import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Registration from '../signup';
import { supabase } from '../../supabase/supabase';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../supabase/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

describe('Registration', () => {
  const mockRouter = { back: jest.fn() };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Registration />);
    expect(getByPlaceholderText('First name')).toBeTruthy();
    expect(getByPlaceholderText('Last name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Enter password again')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  it('shows an error if passwords do not match', async () => {
    const { getByPlaceholderText, getByText } = render(<Registration />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password1');
    fireEvent.changeText(getByPlaceholderText('Enter password again'), 'password2');
    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      expect(getByText("Passwords don't match")).toBeTruthy();
    });
  });

  it('shows an error if email or password is missing', async () => {
    const { getByText } = render(<Registration />);
    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      expect(getByText('Please enter both email and password.')).toBeTruthy();
    });
  });

  it('calls supabase signUp and shows verification alert on success', async () => {
    supabase.auth.signUp.mockResolvedValueOnce({ data: {}, error: null });

    const { getByPlaceholderText, getByText } = render(<Registration />);
    fireEvent.changeText(getByPlaceholderText('First name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.changeText(getByPlaceholderText('Enter password again'), 'password');
    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
        options: {
          data: {
            first_name: 'John',
            last_name: 'Doe',
            new_user: true,
          },
        },
      });
      expect(mockRouter.back).toHaveBeenCalled();
      expect(getByText('Please check your inbox for verification')).toBeTruthy();
    });
  });

  it('shows error message on signUp failure', async () => {
    supabase.auth.signUp.mockResolvedValueOnce({ data: null, error: { message: 'Sign up failed' } });

    const { getByPlaceholderText, getByText } = render(<Registration />);
    fireEvent.changeText(getByPlaceholderText('First name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.changeText(getByPlaceholderText('Enter password again'), 'password');
    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalled();
      expect(getByText('Sign up failed')).toBeTruthy();
    });
  });
});
