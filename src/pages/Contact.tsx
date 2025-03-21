
import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactOption = ({ icon, title, details }: { 
  icon: React.ReactNode, 
  title: string, 
  details: string | React.ReactNode 
}) => {
  return (
    <Card>
      <CardContent className="flex items-start p-6">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <div className="text-muted-foreground">{details}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll respond as soon as possible.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Have questions about Inveron or need assistance? Our team is here to help you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <ContactOption
                icon={<Phone className="h-5 w-5 text-primary" />}
                title="Phone"
                details="+1 (555) 123-4567"
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <ContactOption
                icon={<Mail className="h-5 w-5 text-primary" />}
                title="Email"
                details="support@inveron.com"
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <ContactOption
                icon={<MapPin className="h-5 w-5 text-primary" />}
                title="Office"
                details={
                  <>
                    123 Investment Avenue<br />
                    Financial District<br />
                    New York, NY 10001
                  </>
                }
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn delay={0.1}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and our team will get back to you as soon as possible.
                  We value your inquiries and feedback.
                </p>
                <div className="bg-primary/10 p-6 rounded-lg">
                  <h3 className="flex items-center text-lg font-medium mb-3">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Our Support Hours
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our customer support team is available to assist you during the following hours:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 8:00 PM EST</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 6:00 PM EST</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="right">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8 text-center">Visit Our Office</h2>
            <div className="h-[400px] bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Interactive map would be displayed here</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
