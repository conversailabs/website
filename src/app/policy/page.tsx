"use client";
import Header from "@/components/layout/Header";
const Policy: React.FC = () => (
    <>
    <Header/>
  <div className="max-w-3xl mx-auto p-6 text-gray-800 mt-16 ">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

    <p className="mb-4">
      At <strong>ConversAI Labs</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our AI-first lead management platform, which automates the process of qualifying, engaging, and converting leads across various channels.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong>Email Addresses:</strong> Collected during account creation, contact forms, and marketing interactions.</li>
      <li><strong>Phone Numbers:</strong> Used to enable communication and support engagement workflows.</li>
      <li><strong>Payment Information:</strong> Collected and processed securely via our third-party payment gateway. We do not store sensitive payment data on our servers.</li>
      <li><strong>Usage Data:</strong> Includes interactions with the platform, communication behavior, and system logs to improve our services.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li>To deliver and improve lead automation and engagement services.</li>
      <li>To communicate with you regarding updates, support, or billing.</li>
      <li>To analyze user behavior and optimize our platform’s performance.</li>
      <li>To process transactions through our integrated payment gateway.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing and Security</h2>
    <p className="mb-4">
      We do not sell your personal information. Your data may be shared only with trusted service providers (e.g., payment processors) under strict confidentiality agreements. We implement industry-standard security practices including encryption, access controls, and regular audits to safeguard your information.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">4. International Users</h2>
    <p className="mb-4">
      Our platform serves customers globally. By using our services, you acknowledge that your information may be transferred and processed outside your country of residence, including in jurisdictions with different data protection laws.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
    <p className="mb-4">
      You may access, update, or request deletion of your personal data at any time by contacting us. You also have the right to withdraw consent or opt out of marketing communications.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
    <p className="mb-4">
      For any questions or concerns about this Privacy Policy or our data handling practices, please contact us at:{" "}
      <a href="mailto:connect@conversailabs.com" className="text-blue-600 underline">
        connect@conversailabs.com
      </a>
      {" "}or WhatsApp us at:{" "}
      <a href="https://wa.me/918076018082" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        +91 8076 018 082
      </a>
    </p>

    <p className="mt-6 italic text-sm text-gray-600">Last updated: June 18, 2025</p>
  </div>
  </>
);

export default Policy;
