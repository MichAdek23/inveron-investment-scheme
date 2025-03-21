
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { CheckCircle, ArrowRight, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Layout from '@/components/Layout';
import FadeIn from '@/components/FadeIn';
import { useUser } from '@/contexts/UserContext';
import { getPlanById } from '@/data/plans';

const Verification = () => {
  const navigate = useNavigate();
  const { user, isLoading, verifyUser, updateUserBalance } = useUser();
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'pending' | 'success'>('pending');

  useEffect(() => {
    // Redirect if not logged in
    if (!user && !isLoading) {
      navigate('/login');
    }
    
    // Redirect if already verified
    if (user?.isVerified) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  const handlePayment = async () => {
    if (!user) return;
    
    setIsVerifying(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const plan = getPlanById(user.plan);
      
      // Update user balance with plan amount
      updateUserBalance(plan.price);
      
      setPaymentStep('success');
      
      toast.success('Payment successful!');
    } catch (error) {
      toast.error('Payment failed', {
        description: 'Please try again or contact support.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerify = async () => {
    if (!user) return;
    
    setIsVerifying(true);
    try {
      await verifyUser();
      navigate('/dashboard');
    } catch (error) {
      // Error handling is done inside verifyUser
    } finally {
      setIsVerifying(false);
    }
  };

  if (!user) {
    return null; // Loading state handled by Layout
  }

  return (
    <Layout hideFooter>
      <div className="min-h-screen flex items-center justify-center py-12 px-6">
        <div className="max-w-md w-full">
          <FadeIn>
            <Card className="border shadow-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Complete Your Registration</CardTitle>
                <CardDescription>
                  {paymentStep === 'pending'
                    ? 'Make payment to activate your account'
                    : 'Verify your account to start investing'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                {paymentStep === 'pending' ? (
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{getPlanById(user.plan).name}</p>
                          <p className="text-sm text-muted-foreground">One-time payment</p>
                        </div>
                        <p className="font-bold text-lg">${getPlanById(user.plan).price.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-primary font-medium">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Choose plan</p>
                          <p className="text-sm text-muted-foreground">You selected {getPlanById(user.plan).name}</p>
                        </div>
                        <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-primary font-medium">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Create account</p>
                          <p className="text-sm text-muted-foreground">Account created successfully</p>
                        </div>
                        <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-3">
                          <span className="text-white font-medium">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Make payment</p>
                          <p className="text-sm text-muted-foreground">Complete your payment to activate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium">Payment Complete!</h3>
                      <p className="text-muted-foreground mt-1">
                        Your payment of ${getPlanById(user.plan).price.toFixed(2)} has been received
                      </p>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <p className="font-medium">Next: Account Verification</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Verify your account to activate your plan and start earning
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex-col space-y-2">
                {paymentStep === 'pending' ? (
                  <Button
                    onClick={handlePayment}
                    disabled={isVerifying}
                    className="w-full"
                  >
                    {isVerifying ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Make Payment
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="w-full"
                  >
                    {isVerifying ? (
                      <>Verifying...</>
                    ) : (
                      <>
                        Verify Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
                
                <p className="text-xs text-center text-muted-foreground">
                  For demonstration purposes, no actual payment is processed.
                </p>
              </CardFooter>
            </Card>
          </FadeIn>
        </div>
      </div>
    </Layout>
  );
};

export default Verification;
