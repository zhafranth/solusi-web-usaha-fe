import { Smartphone, Globe, Database, Mail } from "lucide-react";

export const SERVICE_SLUGS = [
  "application-dev",
  "web-development",
  "data-solutions",
  "digital-invites",
];

export const SERVICE_STYLES = [
  {
    icon: Smartphone,
    gradient: "from-violet-500 to-purple-400",
    gradientVia: "from-violet-500 via-fuchsia-500 to-purple-400",
    accent: "bg-violet-500/10 text-violet-600",
    glow: "bg-violet-500/20",
    ring: "ring-violet-500/20",
    border: "border-violet-200/60",
    soft: "bg-violet-50",
    text: "text-violet-600",
    rgba: "rgba(139, 92, 246, 0.25)",
  },
  {
    icon: Globe,
    gradient: "from-blue-500 to-cyan-400",
    gradientVia: "from-blue-600 via-blue-500 to-cyan-400",
    accent: "bg-blue-500/10 text-blue-600",
    glow: "bg-blue-500/20",
    ring: "ring-blue-500/20",
    border: "border-blue-200/60",
    soft: "bg-blue-50",
    text: "text-blue-600",
    rgba: "rgba(59, 130, 246, 0.25)",
  },
  {
    icon: Database,
    gradient: "from-primary-green to-emerald-400",
    gradientVia: "from-emerald-600 via-primary-green to-emerald-400",
    accent: "bg-emerald-500/10 text-emerald-600",
    glow: "bg-emerald-500/20",
    ring: "ring-emerald-500/20",
    border: "border-emerald-200/60",
    soft: "bg-emerald-50",
    text: "text-emerald-600",
    rgba: "rgba(16, 185, 129, 0.25)",
  },
  {
    icon: Mail,
    gradient: "from-pink-500 to-rose-400",
    gradientVia: "from-pink-600 via-rose-500 to-orange-400",
    accent: "bg-pink-500/10 text-pink-600",
    glow: "bg-pink-500/20",
    ring: "ring-pink-500/20",
    border: "border-pink-200/60",
    soft: "bg-pink-50",
    text: "text-pink-600",
    rgba: "rgba(236, 72, 153, 0.25)",
  },
];
