
import { ArrowRight, BarChart, Globe, LucideIcon, Shield, Target, Users } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ValueCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const ValueCard = ({ title, description, Icon }: ValueCardProps) => {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Inveron</h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              We're transforming the investment landscape through our innovative referral-based
              platform that rewards community growth.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.1}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-6">
                  Founded in 2023, Inveron was born out of a vision to democratize investment
                  opportunities and create a more inclusive financial ecosystem. We recognized that
                  traditional investment platforms often exclude many potential investors due to high
                  entry barriers and complex processes.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our team of financial experts and technology innovators came together to build a
                  platform that not only provides accessible investment options but also rewards
                  community building through our unique referral system.
                </p>
                <Button asChild>
                  <Link to="/plans">
                    Explore Our Plans <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <div className="aspect-video bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white text-lg font-medium">
                Inveron Growth Timeline
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                At Inveron, we're guided by a set of core values that shape everything we do and
                every decision we make.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <ValueCard
                title="Transparency"
                description="We believe in complete transparency in all our operations and investment opportunities."
                Icon={BarChart}
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <ValueCard
                title="Community"
                description="We build strong communities of investors who support and grow together."
                Icon={Users}
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <ValueCard
                title="Security"
                description="We prioritize the security of your investments and personal information."
                Icon={Shield}
              />
            </FadeIn>
            <FadeIn delay={0.4}>
              <ValueCard
                title="Innovation"
                description="We continuously innovate to provide the best investment experience."
                Icon={Target}
              />
            </FadeIn>
            <FadeIn delay={0.5}>
              <ValueCard
                title="Inclusivity"
                description="We create investment opportunities that are accessible to everyone."
                Icon={Globe}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of investors who are growing their wealth with Inveron's innovative
              referral-based investment platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/plans">Explore Plans</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default About;
