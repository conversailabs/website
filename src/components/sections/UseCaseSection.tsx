"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import AgentDetailsExplorer from "@/components/demos/AgentDetailsExplorer";

type UseCase = {
  title: string;
  description: string;
  impact?: string;
};

const colorVariants = {
  blue: {
    accent: "from-blue-500 to-blue-700",
    bg: "bg-white",
    text: "text-blue-700",
  },
  slate: {
    accent: "from-slate-500 to-slate-700",
    bg: "bg-white",
    text: "text-slate-700",
  },
  gray: {
    accent: "from-gray-500 to-gray-700",
    bg: "bg-white",
    text: "text-gray-700",
  },
  default: {
    accent: "from-gray-500 to-gray-700",
    bg: "bg-white",
    text: "text-gray-700",
  },
};

type UseCaseSectionProps = {
  industry: string;
  useCases: UseCase[];
  color?: keyof typeof colorVariants;
};

const extractAgentKeyword = (title: string) => {
  const match = title.match(/\(([^)]+)\)/);
  return match ? match[1] : title;
};

const UseCaseSection: React.FC<UseCaseSectionProps> = ({
  industry,
  useCases,
  color = "slate",
}) => {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const selectedColors = colorVariants[color] || colorVariants.default;

  useEffect(() => {
    if (useCases.length > 0) {
      setSelectedUseCase(useCases[0]);
    }
  }, [useCases]);

  const handleUseCaseSelect = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
  };

  const getAgentName = (useCase: UseCase) => extractAgentKeyword(useCase.title);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className={`text-3xl font-semibold mb-10 text-center ${selectedColors.text}`}>
        {industry} Use Cases
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Use Case List */}
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUseCaseSelect(useCase)}
                className={`
                  relative p-5 pt-6 rounded-xl shadow-md border transition-all duration-300 cursor-pointer
                  ${
                    selectedUseCase?.title === useCase.title
                      ? "border-l-2 border-r-2 border-b-2 border-blue-500"
                      : "hover:shadow-xl"
                  }
                  flex flex-col justify-between group bg-white
                `}
              >
                {/* Gradient Accent Bar */}
                <div
                  className={`absolute top-0 left-0 h-1 w-full rounded-t-xl bg-gradient-to-r ${selectedColors.accent} z-10`}
                ></div>

                <div className="flex flex-col gap-2 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-snug">{useCase.description}</p>
                </div>

                <div className="mt-4 flex justify-end">
                  <ChevronRight className="text-gray-400 group-hover:text-blue-500 transition" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Agent Viewer */}
        <div className="hidden md:block">
          {selectedUseCase ? (
            <AgentDetailsExplorer
              agentName={getAgentName(selectedUseCase)}
              onBack={() => setSelectedUseCase(null)}
              isMobile={false}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-center">
              <p>Select a use case to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Agent Viewer */}
      <div className="md:hidden mt-8">
        {selectedUseCase && (
          <AgentDetailsExplorer
            agentName={getAgentName(selectedUseCase)}
            onBack={() => setSelectedUseCase(null)}
            isMobile={true}
          />
        )}
      </div>
    </div>
  );
};

export default UseCaseSection;
