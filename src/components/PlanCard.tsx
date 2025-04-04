
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plan } from '@/data/plans';
import { cn } from '@/lib/utils';
import { formatNaira } from '@/integrations/paystack/client';

interface PlanCardProps {
  plan: Plan;
  className?: string;
  onSelect?: (plan: Plan) => void;
  selected?: boolean;
}

const PlanCard = ({ plan, className, onSelect, selected = false }: PlanCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn("h-full", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`h-full flex flex-col ${
          selected 
            ? 'border-2 border-primary shadow-lg' 
            : 'border border-border hover:border-primary/50'
        } transition-all duration-300`}
        style={{
          background: isHovered 
            ? `linear-gradient(to bottom right, white, ${plan.color}10)` 
            : undefined
        }}
      >
        <CardHeader>
          {selected && (
            <Badge className="self-start mb-2 bg-primary">Selected</Badge>
          )}
          <CardTitle className="text-xl flex items-center">
            <span
              className="mr-2 inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: plan.color }}
            />
            {plan.name}
          </CardTitle>
          <CardDescription className="mt-2">
            {plan.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold">{formatNaira(plan.priceNaira)}</span>
            <span className="ml-1 text-muted-foreground">/investment</span>
          </div>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-2 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium">Referral Bonus: {formatNaira(plan.referralBonusNaira)} per referral</p>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button 
            className="w-full" 
            size="lg"
            variant={selected ? "default" : "outline"}
            style={selected ? {} : { borderColor: plan.color, color: plan.color }}
            onClick={() => onSelect && onSelect(plan)}
          >
            {selected ? 'Selected' : 'Choose Plan'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PlanCard;
