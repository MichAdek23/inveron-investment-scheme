
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
            </div>
            
            <div className="bg-card border rounded-lg p-8 space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium">
                    What is Inveron?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Inveron is a referral-based investment platform that allows users to invest in different plans (Bronze, Silver, Gold, and Platinum) and earn referral bonuses by inviting others to join.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium">
                    How do I get started with Inveron?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    To get started, simply register for an account, choose your preferred investment plan, make the required payment, and get verified. Once verified, you can start referring others and earning bonuses.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">
                    What investment plans are available?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We offer four investment plans: Bronze, Silver, Gold, and Platinum. Each plan has different pricing and benefits. You can view the details of each plan on our Plans page.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium">
                    How does the referral system work?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    After you're verified, you'll receive a unique referral link. Share this link with others, and when they register and invest using your link, you'll earn a referral bonus based on their investment amount and your plan tier.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-medium">
                    When can I withdraw my referral bonuses?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Referral bonuses can be withdrawn immediately after they are credited to your account. There's no waiting period, giving you quick access to your earnings.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-lg font-medium">
                    Is there a limit to how many people I can refer?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No, there's no limit to the number of people you can refer. The more people you refer, the more bonuses you can earn.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-lg font-medium">
                    Can I upgrade my investment plan?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, you can upgrade your investment plan at any time. You'll only need to pay the difference between your current plan and the upgraded plan.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-lg font-medium">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We accept various payment methods including credit/debit cards, bank transfers, and select cryptocurrencies. The available payment methods will be displayed during the checkout process.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-lg font-medium">
                    Is my personal information secure?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal and financial information. You can read our Privacy Policy for more details.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-lg font-medium">
                    What if I need help or have more questions?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    If you have any questions or need assistance, you can contact our support team at adelekem600@gmail.com or visit our Contact page to reach out to us.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-8 pt-6 border-t text-center">
                <h3 className="text-xl font-medium mb-4">Didn't find what you're looking for?</h3>
                <Button asChild size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
