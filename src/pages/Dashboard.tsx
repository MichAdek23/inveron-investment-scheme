
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Copy, 
  CheckCheck,
  AlertCircle,
  ArrowRight,
  Wallet,
  RefreshCcw,
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Layout from '@/components/Layout';
import FadeIn from '@/components/FadeIn';
import { useUser } from '@/contexts/UserContext';
import { getPlanById } from '@/data/plans';

// Generate mock chart data
const generateChartData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const value = 1000 + Math.random() * 100 * i / 3;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
    });
  }
  
  return data;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [chartData, setChartData] = useState(generateChartData());
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user && !isLoading) {
      navigate('/login');
    }
    
    // Redirect if not verified
    if (user && !user.isVerified) {
      navigate('/verification');
    }
  }, [user, isLoading, navigate]);
  
  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      toast.success('Referral code copied to clipboard');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  
  const getReferralLink = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/register?ref=${user?.referralCode}`;
  };
  
  const copyReferralLink = () => {
    const link = getReferralLink();
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied to clipboard');
  };
  
  // Mock stats
  const referrals = 3;
  const pendingReferrals = 2;
  
  if (!user) {
    return null; // Loading state handled by Layout
  }
  
  const userPlan = getPlanById(user.plan);
  
  return (
    <Layout>
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {user.name}
                </p>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: userPlan.color }}
                ></span>
                <span className="mr-2 font-medium">{userPlan.name}</span>
                <Link to="/plans">
                  <Button variant="outline" size="sm">
                    Upgrade
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Current Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">${user.balance.toFixed(2)}</div>
                    <div className="p-2 bg-green-100 text-green-700 rounded-full">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="text-green-600 inline-flex items-center">
                      +5.25% <ArrowUpRight className="h-3 w-3 ml-1" />
                    </span>{' '}
                    from last month
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Referral Bonus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">${user.referralBonus.toFixed(2)}</div>
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-full">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    ${userPlan.referralBonus} per successful referral
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Referrals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{referrals}</div>
                    <div className="p-2 bg-purple-100 text-purple-700 rounded-full">
                      <BarChart className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {pendingReferrals} pending verification
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Chart Card */}
              <FadeIn delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Growth</CardTitle>
                    <CardDescription>
                      Your investment performance over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="date" />
                          <YAxis tickFormatter={(value) => `$${value}`} />
                          <Tooltip formatter={(value) => [`$${value}`, 'Value']} />
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            fill="url(#colorValue)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              
              {/* Plan Progress Card */}
              <FadeIn delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Plan Progress</CardTitle>
                    <CardDescription>
                      {userPlan.name} investment progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Investment Timer */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Investment Period</span>
                          <span className="text-sm text-muted-foreground">15 days left</span>
                        </div>
                        <Progress value={50} className="h-2" />
                        <p className="text-xs text-muted-foreground pt-1">
                          50% of investment duration completed
                        </p>
                      </div>
                      
                      {/* Returns */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Returns Generated</span>
                          <span className="text-sm text-green-600">+$50.00</span>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-muted rounded-l-lg h-8 w-16 flex items-center justify-center text-xs">
                            Initial
                          </div>
                          <div className="bg-blue-100 h-8 flex-grow flex items-center px-3 text-xs font-medium">
                            ${user.balance - 50}
                          </div>
                          <div className="bg-green-100 rounded-r-lg h-8 w-20 flex items-center justify-center text-xs font-medium text-green-700">
                            +$50
                          </div>
                        </div>
                      </div>
                      
                      {/* Referral Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Referral Limit</span>
                          <span className="text-sm text-muted-foreground">
                            {referrals}/{userPlan.maxReferrals === 999 ? '∞' : userPlan.maxReferrals}
                          </span>
                        </div>
                        <Progress 
                          value={userPlan.maxReferrals === 999 ? 10 : (referrals / userPlan.maxReferrals) * 100} 
                          className="h-2" 
                        />
                        <p className="text-xs text-muted-foreground pt-1">
                          {userPlan.maxReferrals === 999 
                            ? 'Unlimited referrals available' 
                            : `${userPlan.maxReferrals - referrals} more referrals available`
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
            
            <div className="space-y-8">
              {/* Referral Card */}
              <FadeIn delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Referral Link</CardTitle>
                    <CardDescription>
                      Share and earn ${userPlan.referralBonus} per successful referral
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                      <code className="text-sm font-mono">{user.referralCode}</code>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={copyReferralCode}
                      >
                        {copied ? (
                          <CheckCheck className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-2">Share your referral link:</p>
                      <div className="p-3 bg-muted rounded-lg flex items-center">
                        <input
                          type="text"
                          value={getReferralLink()}
                          readOnly
                          className="bg-transparent border-none text-xs w-full outline-none font-mono"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={copyReferralLink}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                          Referral bonuses are instantly available for withdrawal once a referred user completes registration and payment.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/referrals" className="w-full">
                      <Button variant="outline" className="w-full">
                        View Referral Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </FadeIn>
              
              {/* Withdrawal Card */}
              <FadeIn delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle>Withdraw Referral Bonus</CardTitle>
                    <CardDescription>
                      Minimum withdrawal: ${userPlan.minWithdrawal}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Available for withdrawal:</span>
                        <span className="font-bold">${user.referralBonus.toFixed(2)}</span>
                      </div>
                      
                      {user.referralBonus >= userPlan.minWithdrawal ? (
                        <Button variant="default" className="w-full mt-2">
                          <Wallet className="mr-2 h-4 w-4" />
                          Withdraw Funds
                        </Button>
                      ) : (
                        <div className="bg-muted p-3 rounded-lg mt-2 text-sm text-muted-foreground">
                          <RefreshCcw className="inline-block mr-2 h-4 w-4" />
                          Minimum withdrawal amount not reached
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
