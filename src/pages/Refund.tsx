
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Receipt } from "lucide-react";

const Refund = () => {
  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Receipt className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Refund Policy</h1>
            </div>
            <div className="bg-card border rounded-lg p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Investment Plan Refunds</h2>
                <p className="text-muted-foreground">
                  At Inveron, we understand that circumstances may change. Our refund policy for investment plans is as follows:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Within 24 Hours:</strong> Full refund available for all plans if requested within 24 hours of purchase, provided no referral bonuses have been earned.</li>
                  <li><strong>Within 7 Days:</strong> 50% refund available if requested within 7 days of purchase, provided no referral bonuses exceed 25% of the investment amount.</li>
                  <li><strong>After 7 Days:</strong> No refunds available after 7 days from the date of purchase.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">2. Refund Process</h2>
                <p className="text-muted-foreground">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                  <li>Log in to your Inveron account</li>
                  <li>Navigate to the Support section</li>
                  <li>Select "Request Refund" option</li>
                  <li>Provide the reason for your refund request</li>
                  <li>Submit your request</li>
                </ol>
                <p className="text-muted-foreground">
                  Our team will review your request and respond within 2-3 business days. If approved, refunds will be processed to the original payment method used for the purchase.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">3. Non-Refundable Scenarios</h2>
                <p className="text-muted-foreground">
                  Refunds will not be provided in the following situations:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>If you have earned referral bonuses exceeding 50% of your investment amount</li>
                  <li>If you have violated our Terms of Service</li>
                  <li>If the refund request is made after the eligible refund period</li>
                  <li>If the account has been suspended or terminated due to fraudulent activities</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Processing Time</h2>
                <p className="text-muted-foreground">
                  Once approved, refunds typically take 5-10 business days to process and appear in your account, depending on your payment provider.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Plan Downgrades</h2>
                <p className="text-muted-foreground">
                  If you wish to downgrade your investment plan, the difference in amount may be refunded as credit to your Inveron account, which can be used for future investments or withdrawn according to our withdrawal policy.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Special Circumstances</h2>
                <p className="text-muted-foreground">
                  In cases of technical issues, platform errors, or other special circumstances, please contact our support team at adelekem600@gmail.com for assistance. We evaluate such situations on a case-by-case basis.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Updates to Refund Policy</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting on our platform. Your continued use of Inveron after such changes constitutes your acceptance of the new refund policy.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">8. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about our refund policy, please contact us at adelekem600@gmail.com.
                </p>
              </div>

              <p className="text-sm text-muted-foreground pt-4 border-t">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Refund;
