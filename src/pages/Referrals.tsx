import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Copy, 
  ChevronLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserCheck,
  Share2,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import FadeIn from '@/components/FadeIn';
import { formatNaira } from '@/integrations/paystack/client';
import { getPlanById } from '@/data/plans';
import { useUser } from '@/contexts/UserContext';

// Mock data for referred users
const mockReferrals = [
  {
    id: "r1",
    name: "Emma Thompson",
    email: "emma@example.com",
    date: "2023-05-15T10:30:00",
    status: "verified",
    bonus: 20,
  },
  {
    id: "r2",
    name: "Michael Johnson",
    email: "michael@example.com",
    date: "2023-05-20T14:45:00",
    status: "verified",
    bonus: 20,
  },
  {
    id: "r3",
    name: "Sophia Williams",
    email: "sophia@example.com",
    date: "2023-06-02T09:15:00",
    status: "pending",
    bonus: 20,
  },
  {
    id: "r4",
    name: "Daniel Brown",
    email: "daniel@example.com",
    date: "2023-06-05T16:20:00",
    status: "pending",
    bonus: 20,
  },
  {
    id: "r5",
    name: "Olivia Garcia",
    email: "olivia@example.com",
    date: "2023-06-10T11:10:00",
    status: "expired",
    bonus: 0,
  },
];

interface WithdrawalDialogProps {
  availableAmount: number;
  minWithdrawal: number;
  onWithdraw: (amount: number) => Promise<void>;
}

const WithdrawalDialog = ({ availableAmount, minWithdrawal, onWithdraw }: WithdrawalDialogProps) => {
  const [amount, setAmount] = useState<number>(availableAmount);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [open, setOpen] = useState(false);

  const handleWithdraw = async () => {
    if (amount > availableAmount) {
      toast.error("Amount exceeds available balance");
      return;
    }
    
    if (amount < minWithdrawal) {
      toast.error(`Minimum withdrawal amount is ${formatNaira(minWithdrawal)}`);
      return;
    }
    
    setIsWithdrawing(true);
    try {
      await onWithdraw(amount);
      setOpen(false);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Wallet className="mr-2 h-4 w-4" />
          Withdraw Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Referral Bonus</DialogTitle>
          <DialogDescription>
            Enter the amount you would like to withdraw from your referral bonus.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Available Balance</label>
              <div className="p-3 bg-muted rounded-lg">
                <span className="font-medium">{formatNaira(availableAmount)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Withdrawal Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="pl-7"
                  min={minWithdrawal}
                  max={availableAmount}
                  step={100}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum withdrawal: {formatNaira(minWithdrawal)}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Withdrawal Method</label>
              <Input 
                value="Bank Transfer (Demo)" 
                disabled 
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                Only demo withdrawal method available in this preview.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleWithdraw} disabled={isWithdrawing}>
            {isWithdrawing ? "Processing..." : "Confirm Withdrawal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Referrals = () => {
  const navigate = useNavigate();
  const { user, isLoading, withdrawReferralBonus } = useUser();
  
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
  
  // Update referrals to include Naira amounts
  const [referrals, setReferrals] = useState(mockReferrals.map(ref => ({
    ...ref,
    bonusNaira: ref.bonus * 1550, // Convert to Naira
  })));
  
  const copyReferralLink = () => {
    if (!user) return;
    
    const baseUrl = window.location.origin;
    const referralLink = `${baseUrl}/register?ref=${user.referralCode}`;
    
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard');
  };
  
  const handleWithdraw = async (amount: number) => {
    if (!user) return;
    
    try {
      // Here amount is now in Naira
      const success = await withdrawReferralBonus(amount);
      
      if (success) {
        toast.success('Withdrawal successful', {
          description: `${formatNaira(amount)} has been sent to your bank account.`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  if (!user) {
    return null; // Loading state handled by Layout
  }
  
  const userPlan = getPlanById(user.plan);
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;
  const verifiedReferrals = referrals.filter(r => r.status === 'verified').length;
  const totalEarned = referrals.reduce((total, r) => total + r.bonus, 0);
  
  return (
    <Layout>
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center mb-2">
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Referrals</h1>
                <p className="text-muted-foreground">
                  Manage your referrals and track bonuses
                </p>
              </div>
            </div>
          </FadeIn>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <FadeIn delay={0.1}>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="p-2 rounded-full bg-blue-100 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold">{referrals.length}</p>
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={0.15}>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="p-2 rounded-full bg-green-100 mb-2">
                    <UserCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold">{verifiedReferrals}</p>
                  <p className="text-sm text-muted-foreground">Verified Referrals</p>
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="p-2 rounded-full bg-yellow-100 mb-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold">{pendingReferrals}</p>
                  <p className="text-sm text-muted-foreground">Pending Verification</p>
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={0.25}>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="p-2 rounded-full bg-purple-100 mb-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold">{formatNaira(totalEarned * 1550)}</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>Referral History</CardTitle>
                    <CardDescription>
                      Track all your referrals and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Bonus</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {referrals.length > 0 ? (
                          referrals.map((referral) => (
                            <TableRow key={referral.id}>
                              <TableCell className="font-medium">
                                <div>
                                  {referral.name}
                                  <div className="text-xs text-muted-foreground">
                                    {referral.email}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {new Date(referral.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {referral.status === 'verified' ? (
                                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                ) : referral.status === 'pending' ? (
                                  <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Pending
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-700 hover:bg-red-200">
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Expired
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                {referral.status === 'verified' ? (
                                  <span className="font-medium text-green-600">
                                    +{formatNaira(referral.bonusNaira)}
                                  </span>
                                ) : referral.status === 'pending' ? (
                                  <span className="text-yellow-600">
                                    Pending
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">
                                    $0
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                              No referrals yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
            
            <div className="space-y-6">
              {/* Referral Link Card */}
              <FadeIn delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Share Your Referral Link</CardTitle>
                    <CardDescription>
                      Earn ${userPlan.referralBonus} for each successful referral
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border rounded-lg flex items-center">
                      <input
                        type="text"
                        value={`${window.location.origin}/register?ref=${user.referralCode}`}
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
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" className="w-full">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share via Email
                      </Button>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm">
                          Facebook
                        </Button>
                        <Button variant="outline" size="sm">
                          Twitter
                        </Button>
                        <Button variant="outline" size="sm">
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              
              {/* Withdrawal Card */}
              <FadeIn delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Bonus</CardTitle>
                    <CardDescription>
                      Withdraw your earned referral bonuses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Available for withdrawal:</span>
                        <span className="font-bold text-xl">{formatNaira(user.referralBonusNaira)}</span>
                      </div>
                    </div>
                    
                    {user.referralBonus >= userPlan.minWithdrawal ? (
                      <WithdrawalDialog 
                        availableAmount={user.referralBonusNaira}
                        minWithdrawal={userPlan.minWithdrawalNaira}
                        onWithdraw={handleWithdraw}
                      />
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg flex">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <div className="text-sm text-yellow-700">
                          <p className="font-medium">Minimum withdrawal not reached</p>
                          <p className="mt-1">
                            You need at least {formatNaira(userPlan.minWithdrawalNaira)} to withdraw. You're {formatNaira(userPlan.minWithdrawalNaira - user.referralBonusNaira)} away.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-slate-50 border-t rounded-b-lg pt-4">
                    <div className="w-full text-sm text-muted-foreground">
                      <div className="flex justify-between py-1">
                        <span>Minimum withdrawal:</span>
                        <span>{formatNaira(userPlan.minWithdrawalNaira)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Processing time:</span>
                        <span>Instant</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Withdrawal fee:</span>
                        <span>None</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </FadeIn>
              
              {/* Plan Info Card */}
              <FadeIn delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Plan Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: userPlan.color }}
                      ></span>
                      <span className="font-medium">{userPlan.name}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Referral bonus:</span>
                        <span className="font-medium">{formatNaira(userPlan.referralBonusNaira)} per referral</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maximum referrals:</span>
                        <span className="font-medium">
                          {userPlan.maxReferrals === 999 ? "Unlimited" : userPlan.maxReferrals}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Remaining referrals:</span>
                        <span className="font-medium">
                          {userPlan.maxReferrals === 999 
                            ? "Unlimited" 
                            : userPlan.maxReferrals - referrals.length}
                        </span>
                      </div>
                    </div>
                    
                    {userPlan.id !== 'platinum' && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-700">
                          Upgrade your plan to earn more per referral and increase your referral limit.
                        </p>
                        <Link to="/plans" className="block mt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            View Upgrade Options
                          </Button>
                        </Link>
                      </div>
                    )}
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

export default Referrals;
