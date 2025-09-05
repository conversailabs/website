import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

const SEOHead = ({
  title = 'ConversAI Labs | Accelerating AI-Powered Conversations',
  description = 'ConversAI Labs helps businesses automate conversations with AI across voice, WhatsApp, email and more, increasing customer satisfaction and reducing response times.',
  canonical = 'https://conversai-labs.com',
  ogImage = '/placeholder.svg',
}: SEOHeadProps) => {
  return (
    <Head>
      {/* Standard metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
};

export default SEOHead;
