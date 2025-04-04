
import { convertUsdToNgn } from "@/integrations/paystack/client";

export type PlanType = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  priceNaira: number;
  color: string;
  features: string[];
  referralBonus: number;
  referralBonusNaira: number;
  description: string;
  maxReferrals: number;
  minWithdrawal: number;
  minWithdrawalNaira: number;
}

// Base USD prices
const bronzePriceUsd = 100;
const silverPriceUsd = 500;
const goldPriceUsd = 1000;
const platinumPriceUsd = 5000;

// Base referral bonuses in USD
const bronzeBonusUsd = 5;
const silverBonusUsd = 10;
const goldBonusUsd = 20;
const platinumBonusUsd = 50;

// Base minimum withdrawal in USD
const bronzeMinWithdrawalUsd = 10;
const silverMinWithdrawalUsd = 20;
const goldMinWithdrawalUsd = 50;
const platinumMinWithdrawalUsd = 100;

export const plans: Plan[] = [
  {
    id: 'bronze',
    name: 'Bronze Plan',
    price: bronzePriceUsd,
    priceNaira: convertUsdToNgn(bronzePriceUsd),
    color: '#CD7F32',
    features: [
      'Investment Duration: 30 days',
      '5% Monthly Return',
      'Refer up to 5 users',
      'Basic analytics dashboard',
    ],
    referralBonus: bronzeBonusUsd,
    referralBonusNaira: convertUsdToNgn(bronzeBonusUsd),
    description: 'Perfect for beginners in the investment world',
    maxReferrals: 5,
    minWithdrawal: bronzeMinWithdrawalUsd,
    minWithdrawalNaira: convertUsdToNgn(bronzeMinWithdrawalUsd),
  },
  {
    id: 'silver',
    name: 'Silver Plan',
    price: silverPriceUsd,
    priceNaira: convertUsdToNgn(silverPriceUsd),
    color: '#C0C0C0',
    features: [
      'Investment Duration: 60 days',
      '7% Monthly Return',
      'Refer up to 10 users',
      'Advanced analytics dashboard',
      'Weekly investment reports',
    ],
    referralBonus: silverBonusUsd,
    referralBonusNaira: convertUsdToNgn(silverBonusUsd),
    description: 'For steady investors seeking consistent returns',
    maxReferrals: 10,
    minWithdrawal: silverMinWithdrawalUsd,
    minWithdrawalNaira: convertUsdToNgn(silverMinWithdrawalUsd),
  },
  {
    id: 'gold',
    name: 'Gold Plan',
    price: goldPriceUsd,
    priceNaira: convertUsdToNgn(goldPriceUsd),
    color: '#FFD700',
    features: [
      'Investment Duration: 90 days',
      '10% Monthly Return',
      'Refer up to 20 users',
      'Premium analytics dashboard',
      'Daily investment reports',
      'Priority customer support',
    ],
    referralBonus: goldBonusUsd,
    referralBonusNaira: convertUsdToNgn(goldBonusUsd),
    description: 'For serious investors looking for substantial returns',
    maxReferrals: 20,
    minWithdrawal: goldMinWithdrawalUsd,
    minWithdrawalNaira: convertUsdToNgn(goldMinWithdrawalUsd),
  },
  {
    id: 'platinum',
    name: 'Platinum Plan',
    price: platinumPriceUsd,
    priceNaira: convertUsdToNgn(platinumPriceUsd),
    color: '#E5E4E2',
    features: [
      'Investment Duration: 180 days',
      '15% Monthly Return',
      'Unlimited referrals',
      'VIP analytics dashboard',
      'Real-time investment tracking',
      '24/7 dedicated customer support',
      'Exclusive investment opportunities',
    ],
    referralBonus: platinumBonusUsd,
    referralBonusNaira: convertUsdToNgn(platinumBonusUsd),
    description: 'The ultimate investment experience for elite investors',
    maxReferrals: 999, // Unlimited
    minWithdrawal: platinumMinWithdrawalUsd,
    minWithdrawalNaira: convertUsdToNgn(platinumMinWithdrawalUsd),
  },
];

export const getPlanById = (id: PlanType): Plan => {
  return plans.find(plan => plan.id === id) || plans[0];
};
