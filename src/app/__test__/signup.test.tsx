// __tests__/Registration.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen, Alert } from '@testing-library/react-native';
import { jest } from '@jest/globals';
// import Registration from "@/app/signup";
import { supabase } from "@/supabase/supabase";
import { useRouter } from 'expo-router';

// Mock the supabase and router modules
// jest.mock('@/src/supabase/supabase.js', () => ({
//   supabase: {
//     auth: {
//       signUp: jest.fn(),
//     },
//   },
// }));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('Registration', () => {
  const mockRouter = {
    back: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<Registration />);
    expect(screen.getByPlaceholderText('First name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Last name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter password again')).toBeTruthy();
    expect(screen.getByText('Register')).toBeTruthy();
  });

  test('updates input fields correctly', () => {
    render(<Registration />);
    fireEvent.changeText(screen.getByPlaceholderText('First name'), 'John');
    fireEvent.changeText(screen.getByPlaceholderText('Last name'), 'Doe');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(screen.getByPlaceholderText('Enter password again'), 'password123');
    expect(screen.getByPlaceholderText('First name')).toHaveProp('value', 'John');
    expect(screen.getByPlaceholderText('Last name')).toHaveProp('value', 'Doe');
    expect(screen.getByPlaceholderText('Email')).toHaveProp('value', 'john.doe@example.com');
    expect(screen.getByPlaceholderText('Password')).toHaveProp('value', 'password123');
    expect(screen.getByPlaceholderText('Enter password again')).toHaveProp('value', 'password123');
  });

  test('shows error when passwords do not match', () => {
    render(<Registration />);
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(screen.getByPlaceholderText('Enter password again'), 'differentPassword');
    fireEvent.press(screen.getByText('Register'));
    expect(Alert.alert).toHaveBeenCalledWith("Error", "Passwords don't match");
  });

  test('shows error when email or password is missing', () => {
    render(<Registration />);
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
    fireEvent.press(screen.getByText('Register'));
    expect(Alert.alert).toHaveBeenCalledWith("Error", "Please enter both email and password.");
  });

  test('handles registration success', async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({ data: {}, error: null });
    render(<Registration />);
    fireEvent.changeText(screen.getByPlaceholderText('First name'), 'John');
    fireEvent.changeText(screen.getByPlaceholderText('Last name'), 'Doe');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(screen.getByPlaceholderText('Enter password again'), 'password123');
    fireEvent.press(screen.getByText('Register'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Please check your inbox for verification");
      expect(mockRouter.back).toHaveBeenCalled();
    });
  });

  test('handles registration failure', async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({ data: null, error: { message: 'Registration failed' } });
    render(<Registration />);
    fireEvent.changeText(screen.getByPlaceholderText('First name'), 'John');
    fireEvent.changeText(screen.getByPlaceholderText('Last name'), 'Doe');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(screen.getByPlaceholderText('Enter password again'), 'password123');
    fireEvent.press(screen.getByText('Register'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Registration failed');
    });
  });
});
