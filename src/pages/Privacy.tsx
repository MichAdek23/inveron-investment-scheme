
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            </div>
            <div className="bg-card border rounded-lg p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Introduction</h2>
                <p className="text-muted-foreground">
                  At Inveron, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully to understand our practices regarding your personal data.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect personal information that you voluntarily provide to us when registering for the platform, such as your name, email address, phone number, and payment information. We may also collect information about your transactions, referrals, and interactions with our platform.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                <p className="text-muted-foreground">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Process and manage your account, investments, and referrals</li>
                  <li>Communicate with you about your account, our services, and updates</li>
                  <li>Improve our platform and user experience</li>
                  <li>Comply with legal obligations</li>
                  <li>Detect and prevent fraudulent activities</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Information Sharing</h2>
                <p className="text-muted-foreground">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Service providers who help us operate our platform</li>
                  <li>Financial institutions to process payments</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your consent</li>
                </ul>
                <p className="text-muted-foreground">
                  We will never sell your personal information to third parties.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Your Rights</h2>
                <p className="text-muted-foreground">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                </ul>
                <p className="text-muted-foreground">
                  To exercise these rights, please contact us at adelekem600@gmail.com.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">9. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at adelekem600@gmail.com.
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

export default Privacy;
