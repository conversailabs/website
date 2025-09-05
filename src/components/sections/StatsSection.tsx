"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  DollarSign,
  Smile,
  Activity,
  Zap,
  BarChart,
  ShieldCheck
} from "lucide-react";

type Stat = {
  label: string;
  value: number | string;
  unit?: string;
  trend?: "up" | "down";
  trendPercentage?: number;
  icon?: React.ReactNode;
};

const colorVariants = {
  blue: { bg: "bg-blue-50", text: "text-blue-800", trend: { up: "text-green-600", down: "text-red-600" } },
  purple: { bg: "bg-purple-50", text: "text-purple-800", trend: { up: "text-green-600", down: "text-red-600" } },
  green: { bg: "bg-green-50", text: "text-green-800", trend: { up: "text-green-600", down: "text-red-600" } },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-800", trend: { up: "text-green-600", down: "text-red-600" } },
  orange: { bg: "bg-orange-50", text: "text-orange-800", trend: { up: "text-green-600", down: "text-red-600" } },
  default: { bg: "bg-gray-50", text: "text-gray-800", trend: { up: "text-green-600", down: "text-red-600" } }
};

type StatsSectionProps = {
  industry: string;
  stats: Stat[];
  color?: keyof typeof colorVariants;
};

// Map labels to icons generically
const getIconForLabel = (label: string): React.ReactNode => {
  const lowered = label.toLowerCase();

  if (lowered.includes("time")) return <Clock className="text-blue-600" />;
  if (lowered.includes("support")) return <CheckCircle className="text-green-600" />;
  if (lowered.includes("cost")) return <DollarSign className="text-orange-600" />;
  if (lowered.includes("satisfaction")) return <Smile className="text-yellow-600" />;
  if (lowered.includes("performance")) return <Activity className="text-indigo-600" />;
  if (lowered.includes("efficiency")) return <Zap className="text-purple-600" />;
  if (lowered.includes("growth")) return <TrendingUp className="text-green-500" />;
  if (lowered.includes("rate")) return <BarChart className="text-cyan-600" />;
  if (lowered.includes("secure") || lowered.includes("security")) return <ShieldCheck className="text-teal-600" />;

  return <CheckCircle className="text-gray-500" />; // default fallback
};

const StatsSection: React.FC<StatsSectionProps> = ({
  industry,
  stats,
  color = "blue"
}) => {
  const selectedColors = colorVariants[color] || colorVariants.default;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold mb-10 text-center ${selectedColors.text}`}>
          {industry} Industry Insights
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className={`
                rounded-2xl shadow-sm p-6 text-center
                ${selectedColors.bg} ${selectedColors.text}
                border border-gray-200 hover:shadow-md transition-all duration-300
              `}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-xl">
                  {stat.icon ?? getIconForLabel(stat.label)}
                </div>
              </div>

              {/* Label */}
              <h3 className="text-md font-medium mb-2">{stat.label}</h3>

              {/* Value + Trend */}
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold">
                  {stat.value}
                  {stat.unit && <span className="text-lg ml-1">{stat.unit}</span>}
                </span>

                {stat.trend && stat.trendPercentage && (
                  <div className="flex items-center">
                    {stat.trend === "up" ? (
                      <TrendingUp className={`w-4 h-4 ${selectedColors.trend.up}`} />
                    ) : (
                      <TrendingDown className={`w-4 h-4 ${selectedColors.trend.down}`} />
                    )}
                    <span
                      className={`text-sm ml-1 ${
                        stat.trend === "up" ? selectedColors.trend.up : selectedColors.trend.down
                      }`}
                    >
                      {stat.trendPercentage}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;
