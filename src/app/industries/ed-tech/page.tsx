'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TapToTalkButton from '@/components/shared/TapToTalkButton';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Clock, DollarSign, Brain, Zap, Shield, CheckCircle, MessageSquare, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function EdTechPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Section with Clear Value Proposition */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                AI Agents for EdTech Companies
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your EdTech Platform Runs 24/7
                <br />
                <span className="text-purple-600">But Your Support Team Doesn&apos;t</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Deploy autonomous AI agents that handle thousands of student inquiries simultaneously, 
                automate enrollment, and provide personalized learning support - while your team focuses on growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Contact Us Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/schedule-demo">
                  <Button size="lg" variant="outline">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem - Pain Points */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                The Hidden Cost of Manual Student Support
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Every EdTech company faces these challenges as they scale
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Clock className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Response Time Crisis</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Students wait hours or days for simple answers about courses, schedules, or technical issues
                </p>
                <p className="text-red-600 font-semibold text-sm">
                  → 68% abandon enrollment due to slow response
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Users className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Support Team Burnout</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Staff drowning in repetitive questions while complex issues get delayed
                </p>
                <p className="text-red-600 font-semibold text-sm">
                  → 80% of inquiries are the same 20 questions
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <DollarSign className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Scaling Costs Explode</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Hiring more support staff for every 1000 new students is unsustainable
                </p>
                <p className="text-red-600 font-semibold text-sm">
                  → Support costs grow 3x faster than revenue
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Brain className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Lost Personalization</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Generic responses fail to address individual learning needs and goals
                </p>
                <p className="text-red-600 font-semibold text-sm">
                  → 45% of students feel unsupported
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution - How Agentic AI Solves It */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-purple-50">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                How Autonomous AI Agents Transform EdTech Operations
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Not chatbots. Intelligent agents that understand context, make decisions, and take actions.
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Enrollment Agent */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Enrollment Agent - Your 24/7 Admissions Team
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">What It Does:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Qualifies leads by asking smart questions about goals, budget, and timeline</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Guides through entire application process step-by-step</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Verifies documents and processes payments automatically</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Schedules demos and connects with human advisors when needed</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Real Scenario:</h4>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Student:</strong> &quot;I want to learn data science but I&apos;m not sure which course is right for me&quot;
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>AI Agent:</strong> &quot;I&apos;ll help you find the perfect data science course. Let me ask you a few questions: What&apos;s your current programming experience? What specific area interests you most - machine learning, data analysis, or AI?&quot;
                          </p>
                          <p className="text-sm text-purple-600 font-semibold">
                            Result: 90% enrollment completion rate vs 35% with forms
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Support Agent */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Learning Support Agent - Personal Tutor at Scale
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">What It Does:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Answers course content questions instantly with context awareness</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Tracks individual progress and suggests personalized study paths</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Provides homework help and explains concepts in multiple ways</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Connects struggling students with human tutors proactively</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Real Scenario:</h4>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Student:</strong> &quot;I&apos;m stuck on the Python loops assignment&quot;
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>AI Agent:</strong> &quot;I see you&apos;re working on Exercise 5 about nested loops. Let me guide you through it. First, let&apos;s understand what the problem is asking... Would you like me to show you a simpler example first, or walk through your current code?&quot;
                          </p>
                          <p className="text-sm text-purple-600 font-semibold">
                            Result: 70% reduction in dropout rates
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Support Agent */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                    <MessageSquare className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Platform Support Agent - IT Help Desk That Never Sleeps
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">What It Does:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Troubleshoots login, video, and platform issues instantly</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Guides through platform features and assignment submissions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Detects and resolves common issues before students report them</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-600">Escalates complex technical issues with full context to IT team</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Real Scenario:</h4>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Student:</strong> &quot;My video won&apos;t play in the lesson&quot;
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>AI Agent:</strong> &quot;I&apos;ll help fix that right away. I&apos;m checking your browser and connection... I see you&apos;re using Safari. The video player works best with Chrome or Firefox. Let me guide you through switching browsers, or I can enable our compatibility mode for Safari. Which would you prefer?&quot;
                          </p>
                          <p className="text-sm text-purple-600 font-semibold">
                            Result: 85% of tech issues resolved without human intervention
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration & Security */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Seamless Integration with Your EdTech Stack
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">LMS Integration</h4>
                      <p className="text-gray-600">Works with Canvas, Moodle, Blackboard, Google Classroom via APIs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Multi-Channel Deployment</h4>
                      <p className="text-gray-600">Deploy on web, mobile app, WhatsApp, phone calls - students&apos; choice</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-Time Analytics</h4>
                      <p className="text-gray-600">Track engagement, identify at-risk students, measure learning outcomes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Custom Knowledge Base</h4>
                      <p className="text-gray-600">Train on your courses, policies, and teaching methodology</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Enterprise-Grade Security & Compliance
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">FERPA & COPPA Compliant</h4>
                      <p className="text-gray-600">Full compliance with educational data privacy regulations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">End-to-End Encryption</h4>
                      <p className="text-gray-600">All student data encrypted in transit and at rest</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Role-Based Access Control</h4>
                      <p className="text-gray-600">Granular permissions for staff, teachers, and administrators</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Audit Trails</h4>
                      <p className="text-gray-600">Complete logs of all interactions and data access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-purple-50">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                The ROI is Clear: Scale Without Scaling Costs
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                EdTech companies using our AI agents see results in weeks, not months
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-gray-600">Increase in Student Engagement</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">70%</div>
                <div className="text-gray-600">Reduction in Support Costs</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Instant Response Time</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">90%</div>
                <div className="text-gray-600">First-Contact Resolution</div>
              </div>
            </div>
            
            <div className="mt-12 bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
                Calculate Your Savings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Current State</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 10 support staff @ $40k/year = $400k</li>
                    <li>• Average response time: 4 hours</li>
                    <li>• Can handle: 500 students/day</li>
                    <li>• Operating hours: 9 AM - 6 PM</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">With AI Agents</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 3 support staff + AI = $120k + $60k</li>
                    <li>• Average response time: Instant</li>
                    <li>• Can handle: 5000+ students/day</li>
                    <li>• Operating hours: 24/7/365</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg md:col-span-1">
                  <h4 className="font-semibold text-gray-700 mb-2">Annual Savings</h4>
                  <div className="text-3xl font-bold text-green-600 mb-2">$220,000</div>
                  <div className="text-sm text-gray-600">Plus 10x capacity increase</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-purple-800">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your EdTech Platform?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-8">
              Join leading EdTech companies already using AI agents to scale support, 
              improve student outcomes, and reduce operational costs by 70%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/schedule-demo">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Schedule Demo
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-purple-200 text-sm">
              No credit card required • Setup in 24 hours • Full support included
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <TapToTalkButton
        source="education_page_tap_to_talk"
        agentId="agent_fdb605cbf88227c104786cd227"
      />
    </>
  );
}