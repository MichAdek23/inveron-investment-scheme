
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { PlanType } from '@/data/plans';
import { formatNaira, convertUsdToNgn } from '@/integrations/paystack/client';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
  referralCode: string;
  referredBy?: string;
  isVerified: boolean;
  balance: number;
  balanceNaira: number;
  referralBonus: number;
  referralBonusNaira: number;
  joinedAt: Date;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, plan: PlanType, referralCode?: string) => Promise<void>;
  logout: () => void;
  verifyUser: () => Promise<void>;
  updateUserBalance: (amount: number) => void;
  updateReferralBonus: (amount: number) => void;
  withdrawReferralBonus: (amount: number) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'gold',
    referralCode: 'JOHNDOE123',
    isVerified: true,
    balance: 1000,
    balanceNaira: convertUsdToNgn(1000),
    referralBonus: 150,
    referralBonusNaira: convertUsdToNgn(150),
    joinedAt: new Date('2023-01-15'),
    avatar: '/placeholder.svg',
  }
];

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate checking for logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem('inveron_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Convert string date back to Date object
        parsedUser.joinedAt = new Date(parsedUser.joinedAt);
        
        // Ensure Naira values are present
        if (!parsedUser.balanceNaira) {
          parsedUser.balanceNaira = convertUsdToNgn(parsedUser.balance);
        }
        if (!parsedUser.referralBonusNaira) {
          parsedUser.referralBonusNaira = convertUsdToNgn(parsedUser.referralBonus);
        }
        
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('inveron_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('inveron_user', JSON.stringify(user));
    }
  }, [user]);

  const generateReferralCode = (name: string): string => {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const namePart = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 5).toUpperCase();
    return `${namePart}${randomPart}`;
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in our mock data
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        setUser(foundUser);
        toast.success("Login successful!");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed, please try again");
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    plan: PlanType,
    referralCode?: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists in mock data
      if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        toast.error("Email already registered");
        setIsLoading(false);
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        plan,
        referralCode: generateReferralCode(name),
        referredBy: referralCode,
        isVerified: false,
        balance: 0, // Start with zero balance until payment
        balanceNaira: 0,
        referralBonus: 0,
        referralBonusNaira: 0,
        joinedAt: new Date(),
      };
      
      // Add to mock data
      mockUsers.push(newUser);
      
      // Set as current user
      setUser(newUser);
      
      toast.success("Registration successful! Please complete payment to verify your account.");
    } catch (error) {
      toast.error("Registration failed, please try again");
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('inveron_user');
    toast.success("Logged out successfully");
  };

  const verifyUser = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        setUser({ ...user, isVerified: true });
        toast.success("Account verified successfully!");
      }
    } catch (error) {
      toast.error("Verification failed");
      console.error('Verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserBalance = (amount: number): void => {
    if (user) {
      const amountNaira = convertUsdToNgn(amount);
      setUser({ 
        ...user, 
        balance: user.balance + amount,
        balanceNaira: user.balanceNaira + amountNaira
      });
    }
  };

  const updateReferralBonus = (amount: number): void => {
    if (user) {
      const amountNaira = convertUsdToNgn(amount);
      setUser({ 
        ...user, 
        referralBonus: user.referralBonus + amount,
        referralBonusNaira: user.referralBonusNaira + amountNaira
      });
      toast.success(`Referral bonus of ${formatNaira(amountNaira)} added to your account!`);
    }
  };

  const withdrawReferralBonus = async (amount: number): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) throw new Error("User not logged in");
      
      // Convert amount to USD for internal comparison if needed
      // This assumes amount is already in Naira
      const usdAmount = amount / convertUsdToNgn(1);
      
      if (amount > user.referralBonusNaira) {
        toast.error("Insufficient referral bonus");
        return false;
      }
      
      setUser({
        ...user,
        referralBonus: user.referralBonus - usdAmount,
        referralBonusNaira: user.referralBonusNaira - amount
      });
      
      toast.success(`Successfully withdrawn ${formatNaira(amount)}`);
      return true;
    } catch (error) {
      toast.error("Withdrawal failed");
      console.error('Withdrawal failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      verifyUser, 
      updateUserBalance, 
      updateReferralBonus,
      withdrawReferralBonus
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
