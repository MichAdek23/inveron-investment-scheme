
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gem, Users, RefreshCw, CheckCircle, PiggyBank, BarChart3, Award, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import PlanCard from '@/components/PlanCard';
import FadeIn from '@/components/FadeIn';
import { plans } from '@/data/plans';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "Inveron has transformed the way I think about investing. The referral program has allowed me to earn while helping others grow their wealth.",
    image: "/placeholder.svg",
  },
  {
    name: "Michael Chen",
    role: "Financial Analyst",
    content: "The transparency and ease of use are what stand out to me with Inveron. I've been able to track my investments and referral bonuses without any hassle.",
    image: "/placeholder.svg",
  },
  {
    name: "Emily Rodriguez",
    role: "Entrepreneur",
    content: "I started with the Bronze plan and quickly upgraded to Gold after seeing the returns. The referral system is brilliant - I've already withdrawn over $1000 in bonuses!",
    image: "/placeholder.svg",
  },
];

const stats = [
  {
    title: "Active Investors",
    value: "10,000+",
    icon: Users,
  },
  {
    title: "Average ROI",
    value: "8.5%",
    icon: BarChart3,
  },
  {
    title: "Total Investments",
    value: "$15M+",
    icon: PiggyBank,
  },
  {
    title: "Referral Bonuses Paid",
    value: "$2.5M+",
    icon: Award,
  },
];

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 px-6">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute w-full h-full opacity-10 bg-grid-pattern" />
          <div 
            className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" 
            style={{ zIndex: 1 }}
          />
        </div>
        
        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Invest
                  </span>
                  , Refer, and{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Earn
                  </span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <p className="mt-6 text-lg text-muted-foreground">
                  Join Inveron's investment platform where you can grow your wealth and earn additional income by referring others. Choose your plan, refer friends, and withdraw bonuses instantly.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/plans">
                    <Button size="lg" variant="outline">
                      View Plans
                    </Button>
                  </Link>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <div className="mt-10 flex items-center space-x-4 text-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background" style={{ backgroundColor: `hsl(${210 + i * 30}, 70%, 60%)` }} />
                    ))}
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Joined by 10,000+ investors
                  </p>
                </div>
              </FadeIn>
            </div>
            
            <div className="relative">
              <FadeIn
                direction="left"
                className="relative z-10 glass-effect rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <div className="bg-gradient-to-tr from-blue-500 to-blue-50 p-10 h-full flex flex-col justify-center items-center">
                    <Gem className="w-20 h-20 mb-4 text-white drop-shadow-lg" />
                    <h3 className="text-2xl font-bold text-white text-center">
                      Unlock Premium Investment Opportunities
                    </h3>
                    <p className="mt-2 text-white/90 text-center">
                      Choose from our Bronze, Silver, Gold, and Platinum plans
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Floating elements */}
              <motion.div 
                className="absolute top-5 -left-10 z-0 w-24 h-24 rounded-full bg-blue-200/50 blur-xl"
                animate={{ 
                  y: [0, 15, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute bottom-10 -right-10 z-0 w-32 h-32 rounded-full bg-blue-400/30 blur-xl"
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 7,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-blue-50/50">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">How Inveron Works</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                A simple three-step process to start investing and earning both from your investments and referrals
              </p>
            </div>
          </FadeIn>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Choose Your Plan",
                description: "Select from Bronze, Silver, Gold, or Platinum plans based on your investment capacity and goals.",
                icon: Gem,
                delay: 0.1,
              },
              {
                title: "Refer & Earn",
                description: "Share your unique referral code with friends and earn bonuses for each successful referral.",
                icon: Users,
                delay: 0.2,
              },
              {
                title: "Withdraw Instantly",
                description: "Withdraw your referral bonuses instantly to your preferred payment method.",
                icon: RefreshCw,
                delay: 0.3,
              },
            ].map((feature, index) => (
              <FadeIn key={index} delay={feature.delay}>
                <Card className="h-full border bg-background hover:shadow-md transition-shadow overflow-hidden group">
                  <CardContent className="p-6 pt-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Preview Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Investment Plans</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose the plan that best suits your investment goals and start earning today
              </p>
            </div>
          </FadeIn>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
              />
            ))}
          </div>
          
          <FadeIn delay={0.4}>
            <div className="mt-12 text-center">
              <Link to="/plans">
                <Button size="lg" variant="outline" className="group">
                  View Full Plan Details
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="border-0 bg-transparent">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.title}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">What Our Investors Say</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover how Inveron has helped thousands of investors grow their wealth
              </p>
            </div>
          </FadeIn>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-6 pt-8 flex flex-col h-full">
                    <div className="mb-4 text-primary">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground flex-grow mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Investment Journey?</h2>
            <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
              Join thousands of successful investors and start growing your wealth with Inveron today
            </p>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <div className="mt-10">
              <Link to="/register">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 border-white hover:bg-white/90 hover:text-blue-600 group">
                  Get Started Now
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

export default Home;
