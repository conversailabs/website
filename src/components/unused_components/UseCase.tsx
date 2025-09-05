"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Wrench, Calendar, Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PathDef = { d: string; colorClass: string; key: string };
type Point = { x: number; y: number };

const UseCase = () => {
  // refs to measure positions
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [paths, setPaths] = useState<PathDef[]>([]);

  // helper to register refs on map
  const setBubbleRef = (idx: number) => (node: HTMLDivElement | null) => {
    bubbleRefs.current[idx] = node;
  };
  const setCategoryRef = (idx: number) => (node: HTMLDivElement | null) => {
    categoryRefs.current[idx] = node;
  };

  // compute paths after first layout
  useEffect(() => {
    const compute = () => {
      if (!svgRef.current) return;
      const newPaths: PathDef[] = [];
      const svgRect = svgRef.current.getBoundingClientRect();

      // Center point (avatar position)
      const centerX = svgRect.width / 2;
      const centerY = svgRect.height / 2;
      [0, 1, 2, 3].forEach((idx) => {
        const startEl = bubbleRefs.current[idx];
        const endEl = categoryRefs.current[idx];
        if (!startEl || !endEl) return;
        const sRect = startEl.getBoundingClientRect();
        const eRect = endEl.getBoundingClientRect();

        // start point: middle right of bubble
        const start: Point = {
          x: sRect.right - svgRect.left,
          y: sRect.top + sRect.height / 2 - svgRect.top,
        };

        // end point: middle left of category card
        const end: Point = {
          x: eRect.left - svgRect.left,
          y: eRect.top + 24 - svgRect.top, // roughly align with icon row
        };

        // Create path that goes through center avatar
        // First curve from start to center, then from center to end
        const path = `M ${start.x},${start.y} Q ${centerX - 40},${
          start.y
        } ${centerX},${centerY} Q ${centerX + 40},${end.y} ${end.x},${end.y}`;

        const colorClass = [
          "stroke-red-400",
          "stroke-blue-400",
          "stroke-green-400",
          "stroke-yellow-400",
        ][idx];
        newPaths.push({ d: path, colorClass, key: `path-${idx}` });
      });
      setPaths(newPaths);
    };
    compute();
    // recompute on resize
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const bubbleData = [
    {
      delay: 0.8,
      message: "I received a recall notice in the mail, when can I come in?",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      delay: 1.0,
      message: "Something came up, can I reschedule my appointment?",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      delay: 1.2,
      message: "Do you have a fuel pump for a 2012 Toyota Corolla in stock?",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      delay: 1.4,
      message: "When could I take that new Mustang for a test drive?",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const categoryData = [
    {
      delay: 1.6,
      title: "Recall Inquiry",
      items: [
        "Check Recall Inventory",
        "Check Recall Availability",
        "Schedule Recall Service Appointment",
      ],
      icon: AlertTriangle,
      color: "from-red-400 to-pink-500",
    },
    {
      delay: 1.8,
      title: "Service Appointments",
      items: [
        "Look Up Existing Appointment",
        "Reschedule Appointment",
        "Send Notification",
      ],
      icon: Calendar,
      color: "from-blue-400 to-cyan-500",
    },
    {
      delay: 2.0,
      title: "Parts Inquiry",
      items: [
        "Check Parts Inventory",
        "Provide Parts Prices",
        "Send Order Confirmation",
      ],
      icon: Wrench,
      color: "from-green-400 to-emerald-500",
    },
    {
      delay: 2.2,
      title: "Test Drive Inquiry",
      items: [
        "Check Vehicle Availability",
        "Schedule Test Drive",
        "Notify Sales Rep",
      ],
      icon: Car,
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <Card className="p-8 bg-gradient-to-br text-xs from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden h-[500px] w-200 shadow-2xl border-0">
      {/* Enhanced SVG connector layer */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          {/* Enhanced arrow marker */}
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="8"
            refY="4"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path
              d="M0,0 L8,4 L0,8 z"
              className="fill-current text-white drop-shadow-sm"
            />
          </marker>

          {/* Animated arrow that moves along path */}
          <marker
            id="movingArrow"
            markerWidth="10"
            markerHeight="10"
            refX="10"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <motion.path
              d="M0,0 L10,5 L0,10 z"
              className="fill-white"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </marker>

          {/* Glow filter */}
          {/* <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter> */}
        </defs>

        {paths.map((p, index) => (
          <g key={p.key}>
            {/* Base path with glow */}
            <motion.path
              d={p.d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                duration: 4.5,
                ease: "easeInOut",
                delay: 4.5 + index * 3.2,
              }}
              className={`${p.colorClass} fill-none stroke-[3] opacity-30`}
              filter="url(#glow)"
            />

            {/* Main animated path */}
            <motion.path
              d={p.d}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 5.5,
                ease: "easeInOut",
                delay: 3.5 + index * 5.2,
              }}
              className={`${p.colorClass} fill-none stroke-[2]`}
              strokeDasharray="5,5"
              markerEnd="url(#arrow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="10;0;10"
                dur="10s"
                repeatCount="indefinite"
              />
            </motion.path>

            {/* Moving arrow animation */}
            <motion.circle
              r="3"
              className={`${p.colorClass.replace(
                "stroke-",
                "fill-"
              )} opacity-80`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1 + index * 4.5,
              }}
            >
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                begin={`${1 + index * 0.5}s`}
              >
                <mpath href={`#${p.key}`} />
              </animateMotion>
            </motion.circle>

            {/* Hidden path for motion reference */}
            <path id={p.key} d={p.d} className="opacity-0" />
          </g>
        ))}
      </svg>
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full">
        {/* Enhanced Central Avatar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1 shadow-2xl">
              <Avatar className="w-full h-full border-2 border-white/20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="bg-white text-gray-900 text-2xl font-bold">
                  T
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Multiple pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/60"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.8, 0, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400/40"
              animate={{
                scale: [1, 2.2, 1],
                opacity: [0.6, 0, 0.6],
                rotate: [360, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Floating icons around avatar */}
            {/* {[Phone, Settings, Bell, Wrench].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                style={{
                  top: `${-20 + Math.cos((i * Math.PI) / 2) * 60}px`,
                  left: `${-20 + Math.sin((i * Math.PI) / 2) * 60}px`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              >
                <Icon className="w-4 h-4 text-white/80" />
              </motion.div>
            ))}
              */}
          </motion.div>
        </div>

        {/* Enhanced Left bubbles */}
        <div className="absolute left-6 top-12 space-y-10">
          {bubbleData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -120, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              transition={{
                delay: item.delay,
                type: "spring",
                stiffness: 120,
                damping: 12,
              }}
              whileHover={{
                scale: 1.05,
                x: 10,
                transition: { duration: 0.2 },
              }}
              ref={setBubbleRef(index)}
              className="flex items-start gap-4 relative group"
            >
              <motion.div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${
                  [
                    "from-red-400 to-pink-500",
                    "from-blue-400 to-cyan-500",
                    "from-green-400 to-emerald-500",
                    "from-yellow-400 to-orange-500",
                  ][index]
                } p-0.5 shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Avatar className="w-full h-full">
                  <AvatarImage src={item.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-white text-gray-900 text-sm font-semibold">
                    U{index + 1}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.div
                className="bg-white/15 backdrop-blur-md  rounded-2xl max-w-45 border border-white/30 shadow-xl group-hover:bg-white/20 transition-all duration-300"
                // whileHover={{ y: -2 }}
              >
                <p className="text-xs leading-relaxed p-2 text-white/90">
                  {item.message}
                </p>

              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Right categories */}
        <div className="absolute right-6 top-12 space-y-10">
          {categoryData.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 120, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                transition={{
                  delay: category.delay,
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                }}
                whileHover={{
                  scale: 1.05,
                  x: -10,
                  transition: { duration: 0.2 },
                }}
                ref={setCategoryRef(index)}
                className="relative group"
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 min-w-60 shadow-xl group-hover:bg-white/15 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-2 mb-4 text-xs">
                    <motion.div
                      className={`w-5  h-5 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-2 h-2 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-sm text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: category.delay + 0.6 + itemIndex * 0.15,
                        }}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-1 group/item "
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-white/50 group-hover/item:bg-white/80"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="text-xs text-white/85 group-hover/item:text-white transition-colors">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </Card>
  );
};

export default UseCase;
