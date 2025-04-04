
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { CheckCircle, ArrowRight, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';
import FadeIn from '@/components/FadeIn';
import { useUser } from '@/contexts/UserContext';
import { getPlanById } from '@/data/plans';
import { verifyTransaction, formatNaira } from '@/integrations/paystack/client';

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, verifyUser, updateUserBalance, register: registerUser } = useUser();

  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'pending' | 'verifying' | 'success' | 'failed'>('pending');
  const [progress, setProgress] = useState(0);

  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');
  const planId = searchParams.get('plan');
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const password = searchParams.get('password');
  const referralCode = searchParams.get('ref');

  useEffect(() => {
    // If this is a redirect from Paystack with a reference, verify the payment
    if (reference && planId && email && name && password) {
      verifyPayment();
    } else if (user && user.isVerified) {
      // If user is already verified, redirect to dashboard
      navigate('/dashboard');
    } else if (!user && !isLoading && !reference) {
      // If not from Paystack and not logged in, redirect to login
      navigate('/login');
    }
  }, [user, isLoading, reference, navigate]);

  // Function to simulate progress
  useEffect(() => {
    if (paymentStep === 'verifying') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [paymentStep]);

  const verifyPayment = async () => {
    if (!reference || !planId || !email || !name || !password) {
      setPaymentStep('failed');
      toast.error('Missing payment information');
      return;
    }
    
    setPaymentStep('verifying');
    
    try {
      // Verify the transaction with Paystack
      const response = await verifyTransaction(reference);
      
      if (response.status && response.data.status === 'success') {
        // Register/create the user if coming from Paystack redirect
        if (!user) {
          const type = planId as PlanType;
          await registerUser(name, email, password, type, referralCode || undefined);
        }
        
        // Update user balance
        const plan = getPlanById(planId as PlanType);
        updateUserBalance(plan.price);
        
        // Verify user
        await verifyUser();
        
        setPaymentStep('success');
        setProgress(100);
        
        toast.success('Payment verified successfully!');
        
        // Redirect to dashboard after success
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setPaymentStep('failed');
      toast.error('Payment verification failed', {
        description: 'Please try again or contact support.',
      });
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

  // Render content based on paymentStep
  const renderContent = () => {
    switch (paymentStep) {
      case 'verifying':
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
            
            <div>
              <h3 className="text-xl font-medium">Verifying Your Payment</h3>
              <p className="text-muted-foreground mt-1">
                Please wait while we verify your payment
              </p>
            </div>
            
            <div className="w-full space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {progress === 100 ? 'Verification complete!' : 'Processing...'}
              </p>
            </div>
          </div>
        );
      
      case 'success':
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            
            <div>
              <h3 className="text-xl font-medium">Payment Successful!</h3>
              <p className="text-muted-foreground mt-1">
                Your account has been verified successfully
              </p>
            </div>
            
            <div className="rounded-lg border p-4">
              <p className="font-medium">You're all set!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Redirecting you to the dashboard...
              </p>
            </div>
          </div>
        );
      
      case 'failed':
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            
            <div>
              <h3 className="text-xl font-medium">Payment Verification Failed</h3>
              <p className="text-muted-foreground mt-1">
                We couldn't verify your payment
              </p>
            </div>
            
            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
              <p className="font-medium text-red-800">What to do next:</p>
              <ul className="text-sm text-red-700 mt-2 list-disc pl-5">
                <li>Check if your payment was processed</li>
                <li>Try again in a few minutes</li>
                <li>Contact support if the problem persists</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{user ? getPlanById(user.plan).name : 'Loading plan...'}</p>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>
                {user && (
                  <p className="font-bold text-lg">{formatNaira(getPlanById(user.plan).priceNaira)}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium">Choose plan</p>
                  <p className="text-sm text-muted-foreground">
                    {user ? `You selected ${getPlanById(user.plan).name}` : 'Plan selected'}
                  </p>
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
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium">Make payment</p>
                  <p className="text-sm text-muted-foreground">
                    {user && user.balance > 0 
                      ? 'Payment completed successfully' 
                      : 'Complete your payment to activate'}
                  </p>
                </div>
                {user && user.balance > 0 ? (
                  <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                ) : null}
              </div>
            </div>
          </div>
        );
    }
  };

  if (!user && !reference) {
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
                    : paymentStep === 'verifying'
                    ? 'Verifying your payment...'
                    : paymentStep === 'success'
                    ? 'Account verification successful!'
                    : 'Payment verification failed'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                {renderContent()}
              </CardContent>
              
              <CardFooter className="flex-col space-y-2">
                {paymentStep === 'pending' && !reference ? (
                  <Button
                    onClick={handleVerify}
                    disabled={isVerifying || !user}
                    className="w-full"
                  >
                    {isVerifying ? (
                      <>Verifying...</>
                    ) : (
                      <>
                        <ArrowRight className="ml-2 h-4 w-4" />
                        Verify Account
                      </>
                    )}
                  </Button>
                ) : paymentStep === 'failed' ? (
                  <Button
                    onClick={() => navigate('/register')}
                    className="w-full"
                  >
                    Try Again
                  </Button>
                ) : paymentStep === 'success' ? (
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="w-full"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : null}
                
                <p className="text-xs text-center text-muted-foreground">
                  {reference 
                    ? 'Transaction Reference: ' + reference 
                    : 'Having issues? Contact our support team.'}
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
