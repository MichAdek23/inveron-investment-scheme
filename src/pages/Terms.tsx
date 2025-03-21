
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
            </div>
            <div className="bg-card border rounded-lg p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using the Inveron platform, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you must not access or use our services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">2. Description of Service</h2>
                <p className="text-muted-foreground">
                  Inveron provides a referral-based investment platform that allows users to invest in various plans and earn referral bonuses. Our services include but are not limited to investment plans, referral systems, and withdrawal mechanisms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">3. Registration and Account</h2>
                <p className="text-muted-foreground">
                  To use our services, you must register and create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and complete information during registration and to update such information as needed.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Investment Plans and Payments</h2>
                <p className="text-muted-foreground">
                  Inveron offers various investment plans with different pricing structures. By selecting a plan and making a payment, you agree to the terms specific to that plan. All payments are processed securely, and receipts will be provided for your records.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Referral System</h2>
                <p className="text-muted-foreground">
                  Our referral system allows users to earn bonuses by referring new users to the platform. Referral bonuses are credited to your account according to our current referral policy and can be withdrawn according to our withdrawal terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Withdrawals</h2>
                <p className="text-muted-foreground">
                  Users may withdraw their referral bonuses subject to our withdrawal policy. Withdrawal requests are processed within the timeframe specified in our policy, and users must provide accurate withdrawal information to facilitate the process.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Prohibited Activities</h2>
                <p className="text-muted-foreground">
                  Users are prohibited from engaging in any fraudulent activities, creating multiple accounts, manipulating the referral system, or any other activity that violates these terms or applicable laws.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">8. Termination</h2>
                <p className="text-muted-foreground">
                  Inveron reserves the right to terminate or suspend your account and access to the services at any time for violation of these terms or for any other reason deemed appropriate by Inveron.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  Inveron may modify these terms at any time. We will notify users of significant changes. Your continued use of the platform after changes constitutes your acceptance of the modified terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">10. Contact</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at adelekem600@gmail.com.
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

export default Terms;
