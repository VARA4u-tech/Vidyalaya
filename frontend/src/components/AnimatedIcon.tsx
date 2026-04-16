import { motion, TargetAndTransition, Transition } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  color?: string;
  size?: number | string;
  className?: string;
  animationType?: "float" | "pulse" | "spin" | "bounce" | "tilt";
  delay?: number;
}

const AnimatedIcon = ({
  icon: Icon,
  color,
  size = 24,
  className = "",
  animationType = "float",
  delay = 0,
}: AnimatedIconProps) => {
  const animations: Record<
    string,
    { animate: TargetAndTransition; transition: Transition }
  > = {
    float: {
      animate: {
        y: [0, -8, 0],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay,
      },
    },
    pulse: {
      animate: {
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
      },
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay,
      },
    },
    spin: {
      animate: {
        rotate: [0, 360],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear" as const,
        delay,
      },
    },
    bounce: {
      animate: {
        y: [0, -12, 0],
        scaleX: [1, 0.9, 1.1, 1],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay,
      },
    },
    tilt: {
      animate: {
        rotate: [-10, 10, -10],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay,
      },
    },
  };

  const selectedAnimation = animations[animationType];

  return (
    <motion.div
      className={`inline-block ${className}`}
      {...selectedAnimation}
      whileHover={{ scale: 1.2, rotate: 5 }}
    >
      <Icon size={size} style={{ color }} />
    </motion.div>
  );
};

export default AnimatedIcon;
