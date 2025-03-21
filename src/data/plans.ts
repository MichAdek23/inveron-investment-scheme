
export type PlanType = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  color: string;
  features: string[];
  referralBonus: number;
  description: string;
  maxReferrals: number;
  minWithdrawal: number;
}

export const plans: Plan[] = [
  {
    id: 'bronze',
    name: 'Bronze Plan',
    price: 100,
    color: '#CD7F32',
    features: [
      'Investment Duration: 30 days',
      '5% Monthly Return',
      'Refer up to 5 users',
      'Basic analytics dashboard',
    ],
    referralBonus: 5,
    description: 'Perfect for beginners in the investment world',
    maxReferrals: 5,
    minWithdrawal: 10,
  },
  {
    id: 'silver',
    name: 'Silver Plan',
    price: 500,
    color: '#C0C0C0',
    features: [
      'Investment Duration: 60 days',
      '7% Monthly Return',
      'Refer up to 10 users',
      'Advanced analytics dashboard',
      'Weekly investment reports',
    ],
    referralBonus: 10,
    description: 'For steady investors seeking consistent returns',
    maxReferrals: 10,
    minWithdrawal: 20,
  },
  {
    id: 'gold',
    name: 'Gold Plan',
    price: 1000,
    color: '#FFD700',
    features: [
      'Investment Duration: 90 days',
      '10% Monthly Return',
      'Refer up to 20 users',
      'Premium analytics dashboard',
      'Daily investment reports',
      'Priority customer support',
    ],
    referralBonus: 20,
    description: 'For serious investors looking for substantial returns',
    maxReferrals: 20,
    minWithdrawal: 50,
  },
  {
    id: 'platinum',
    name: 'Platinum Plan',
    price: 5000,
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
    referralBonus: 50,
    description: 'The ultimate investment experience for elite investors',
    maxReferrals: 999, // Unlimited
    minWithdrawal: 100,
  },
];

export const getPlanById = (id: PlanType): Plan => {
  return plans.find(plan => plan.id === id) || plans[0];
};
