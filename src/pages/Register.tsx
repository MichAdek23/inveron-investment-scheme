import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ChevronLeft, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/Layout';
import PlanCard from '@/components/PlanCard';
import FadeIn from '@/components/FadeIn';
import { plans, PlanType, getPlanById } from '@/data/plans';
import { useUser } from '@/contexts/UserContext';
import { initializePayment, formatNaira } from '@/integrations/paystack/client';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string(),
  plan: z.enum(['bronze', 'silver', 'gold', 'platinum'] as const),
  referralCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const planParam = params.get('plan') as PlanType | null;
  const referralParam = params.get('ref');

  const { register: registerUser, isLoading, user } = useUser();

  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(planParam);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const defaultValues: Partial<FormValues> = {
    plan: planParam || 'bronze',
    referralCode: referralParam || '',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmitDetails = async (values: FormValues) => {
    // Move to payment step
    setStep('payment');
  };

  const processPayment = async () => {
    setIsProcessing(true);
    try {
      const formValues = form.getValues();
      const plan = getPlanById(formValues.plan);
      const baseUrl = window.location.origin;
      const callbackUrl = `${baseUrl}/verification?plan=${formValues.plan}&email=${encodeURIComponent(formValues.email)}&name=${encodeURIComponent(formValues.name)}&password=${encodeURIComponent(formValues.password)}${formValues.referralCode ? `&ref=${encodeURIComponent(formValues.referralCode)}` : ''}`;
      
      const response = await initializePayment(
        formValues.email,
        plan.priceNaira,
        formValues.plan,
        formValues.name,
        callbackUrl
      );
      
      if (response.status && response.data && response.data.authorization_url) {
        toast.success('Redirecting to payment gateway...');
        // Register the user first
        await registerUser(
          formValues.name,
          formValues.email,
          formValues.password,
          formValues.plan,
          formValues.referralCode
        );
        
        // Redirect to Paystack checkout
        window.location.href = response.data.authorization_url;
      } else {
        throw new Error('Failed to initialize payment');
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error('Payment failed', {
        description: 'Please try again or contact support.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan);
    form.setValue('plan', plan);
  };

  return (
    <Layout hideFooter>
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <Link
              to={step === 'payment' ? '#' : '/'}
              onClick={(e) => {
                if (step === 'payment') {
                  e.preventDefault();
                  setStep('details');
                }
              }}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {step === 'payment' ? 'Back to details' : 'Back to home'}
            </Link>
          </FadeIn>

          {step === 'details' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FadeIn>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
                  <p className="text-muted-foreground mb-8">
                    Join Inveron and start your investment journey today
                  </p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitDetails)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input placeholder="********" type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input placeholder="********" type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="plan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Investment Plan</FormLabel>
                            <Select
                              onValueChange={(value: PlanType) => {
                                field.onChange(value);
                                handlePlanSelect(value);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {plans.map((plan) => (
                                  <SelectItem key={plan.id} value={plan.id}>
                                    {plan.name} - {formatNaira(plan.priceNaira)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="referralCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Referral Code (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter referral code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Continue to Payment
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <Link to="/login" className="text-primary hover:underline">
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="lg:pl-6 lg:border-l">
                  <h2 className="text-xl font-semibold mb-6">Selected Plan</h2>
                  {selectedPlan && (
                    <PlanCard
                      plan={getPlanById(selectedPlan)}
                      selected
                    />
                  )}
                </div>
              </FadeIn>
            </div>
          ) : (
            // Payment step
            <div className="max-w-lg mx-auto">
              <FadeIn>
                <Card className="border shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Complete Your Payment</CardTitle>
                    <CardDescription>
                      You're signing up for the {form.getValues().plan.charAt(0).toUpperCase() + form.getValues().plan.slice(1)} Plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg bg-slate-50">
                      <div>
                        <p className="font-medium">
                          {getPlanById(form.getValues().plan).name}
                        </p>
                        <p className="text-sm text-muted-foreground">One-time payment</p>
                      </div>
                      <p className="font-bold text-lg">
                        {formatNaira(getPlanById(form.getValues().plan).priceNaira)}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <p className="text-sm text-green-800">
                        <CheckCircle className="h-4 w-4 text-green-600 inline mr-2" />
                        Secure payment via Paystack
                      </p>
                    </div>

                    <div className="flex items-start space-x-2 pt-4">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        Your payment is secure and encrypted. By proceeding, you agree to our
                        <Link to="/terms" className="text-primary hover:underline mx-1">
                          Terms of Service
                        </Link>
                        and
                        <Link to="/privacy" className="text-primary hover:underline ml-1">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button
                      onClick={processPayment}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner mr-2"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay {formatNaira(getPlanById(form.getValues().plan).priceNaira)} with Paystack
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      You will be redirected to Paystack's secure payment gateway.
                    </p>
                  </CardFooter>
                </Card>
              </FadeIn>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Register;
