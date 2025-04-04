import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PlanCard from '@/components/PlanCard';
import FadeIn from '@/components/FadeIn';
import { plans, Plan, PlanType } from '@/data/plans';
import { formatNaira } from '@/integrations/paystack/client';

const PlanComparison = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan.id);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Investment Plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the plan that aligns with your investment goals. Each plan offers unique benefits and referral bonuses.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                selected={selectedPlan === plan.id}
                onSelect={handleSelectPlan}
              />
            ))}
          </div>

          <FadeIn>
            <div className="mt-12 text-center">
              <Link to={selectedPlan ? `/register?plan=${selectedPlan}` : "/register"}>
                <Button size="lg" className="group">
                  {selectedPlan ? `Continue with ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan` : 'Continue to Registration'}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Plan Comparison</h2>
              <p className="mt-4 text-muted-foreground">
                Compare our investment plans to find the one that's right for you
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Features</TableHead>
                    {plans.map((plan) => (
                      <TableHead
                        key={plan.id}
                        className="min-w-[150px] text-center"
                        style={{ 
                          borderBottom: `2px solid ${plan.color}`,
                          backgroundColor: `${plan.color}10` 
                        }}
                      >
                        {plan.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Investment Amount</TableCell>
                    {plans.map((plan) => (
                      <TableCell key={`${plan.id}-price`} className="text-center font-bold">
                        {formatNaira(plan.priceNaira)}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Referral Bonus</TableCell>
                    {plans.map((plan) => (
                      <TableCell key={`${plan.id}-referral`} className="text-center">
                        {formatNaira(plan.referralBonusNaira)} per referral
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        Max Referrals
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="ml-1 h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">
                                Maximum number of referrals you can make with this plan
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    {plans.map((plan) => (
                      <TableCell key={`${plan.id}-max-referrals`} className="text-center">
                        {plan.maxReferrals === 999 ? "Unlimited" : plan.maxReferrals}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        Minimum Withdrawal
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="ml-1 h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">
                                Minimum amount required to withdraw referral bonuses
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    {plans.map((plan) => (
                      <TableCell key={`${plan.id}-min-withdrawal`} className="text-center">
                        {formatNaira(plan.minWithdrawalNaira)}
                      </TableCell>
                    ))}
                  </TableRow>
                  {[
                    "Investment Duration",
                    "Monthly Return",
                    "Analytics Dashboard",
                    "Investment Reports",
                    "Priority Support",
                    "Exclusive Opportunities"
                  ].map((feature, index) => (
                    <TableRow key={feature}>
                      <TableCell className="font-medium">{feature}</TableCell>
                      {plans.map((plan) => {
                        let value = "";
                        let included = false;
                        
                        switch (feature) {
                          case "Investment Duration":
                            if (plan.id === "bronze") value = "30 days";
                            else if (plan.id === "silver") value = "60 days";
                            else if (plan.id === "gold") value = "90 days";
                            else value = "180 days";
                            included = true;
                            break;
                          case "Monthly Return":
                            if (plan.id === "bronze") value = "5%";
                            else if (plan.id === "silver") value = "7%";
                            else if (plan.id === "gold") value = "10%";
                            else value = "15%";
                            included = true;
                            break;
                          case "Analytics Dashboard":
                            included = true;
                            if (plan.id === "bronze") value = "Basic";
                            else if (plan.id === "silver") value = "Advanced";
                            else if (plan.id === "gold") value = "Premium";
                            else value = "VIP";
                            break;
                          case "Investment Reports":
                            included = plan.id !== "bronze";
                            if (plan.id === "silver") value = "Weekly";
                            else if (plan.id === "gold") value = "Daily";
                            else if (plan.id === "platinum") value = "Real-time";
                            break;
                          case "Priority Support":
                            included = plan.id === "gold" || plan.id === "platinum";
                            if (plan.id === "platinum") value = "24/7 Dedicated";
                            break;
                          case "Exclusive Opportunities":
                            included = plan.id === "platinum";
                            break;
                        }
                        
                        return (
                          <TableCell key={`${plan.id}-${feature}`} className="text-center">
                            {included ? (
                              value ? (
                                <div className="flex items-center justify-center">
                                  <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                                  <span>{value}</span>
                                </div>
                              ) : (
                                <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                              )
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-center text-muted-foreground">
                All plans include access to our referral system. The higher your plan, the more you earn per successful referral.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-4 text-muted-foreground">
                Find answers to common questions about our investment plans
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid gap-6">
              {[
                {
                  question: "Can I upgrade my plan later?",
                  answer: "Yes, you can upgrade to a higher tier plan at any time. The upgrade cost will be prorated based on the remaining duration of your current plan."
                },
                {
                  question: "How are referral bonuses calculated?",
                  answer: "Referral bonuses are fixed amounts based on your plan tier. They are earned when someone you refer completes registration and makes their initial investment."
                },
                {
                  question: "When can I withdraw my referral bonuses?",
                  answer: "Referral bonuses can be withdrawn as soon as they are earned, provided you meet the minimum withdrawal amount for your plan tier."
                },
                {
                  question: "Is there a limit to how many people I can refer?",
                  answer: "Yes, each plan has a maximum number of referrals allowed. Bronze allows 5, Silver allows 10, Gold allows 20, and Platinum has unlimited referrals."
                },
                {
                  question: "What payment methods are accepted for investments?",
                  answer: "We accept credit/debit cards, bank transfers, and select cryptocurrencies for investment payments."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="p-6 border rounded-lg hover:shadow-sm transition-shadow bg-white"
                >
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold">Ready to Start Your Investment Journey?</h2>
            <p className="mt-4 text-white/80">
              Join thousands of investors who are growing their wealth with Inveron
            </p>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <div className="mt-8">
              <Link to={selectedPlan ? `/register?plan=${selectedPlan}` : "/register"}>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="group bg-white text-primary hover:bg-white/90"
                >
                  {selectedPlan ? `Get Started with ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan` : 'Get Started Now'}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default PlanComparison;
