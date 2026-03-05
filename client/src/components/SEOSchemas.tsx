import React from "react";

interface BlogPostSchema {
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

interface FAQSchema {
  question: string;
  answer: string;
}

interface BlogPostSchemasProps {
  posts: BlogPostSchema[];
}

interface FAQSchemasProps {
  faqs: FAQSchema[];
}

interface OrganizationSchemaProps {}

interface SEOSchemasProps {
  title: string;
  description: string;
  image: string;
  type?: "website" | "article";
}

export const BlogPostSchemas: React.FC<BlogPostSchemasProps> = ({ posts }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": posts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": post.image,
        "datePublished": post.date,
        "author": {
          "@type": "Person",
          "name": "Javier Díaz"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Escuela de Vendedores Profesionales",
          "logo": {
            "@type": "ImageObject",
            "url": "/logo.png"
          }
        }
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FAQSchemas: React.FC<FAQSchemasProps> = ({ faqs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Escuela de Vendedores Profesionales",
    "url": "https://escuelavendedores.com",
    "logo": "/logo.png",
    "description": "Formación especializada en técnicas de venta y desarrollo de habilidades comerciales",
    "founder": {
      "@type": "Person",
      "name": "Javier Díaz"
    },
    "sameAs": [
      "https://linkedin.com/company/escuela-vendedores",
      "https://facebook.com/escuelavendedores",
      "https://instagram.com/escuelavendedores"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const PersonSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Javier Díaz",
    "jobTitle": "Experto en Ventas y Formador",
    "description": "Especialista en técnicas de venta con más de 15 años de experiencia",
    "url": "https://escuelavendedores.com",
    "sameAs": [
      "https://linkedin.com/in/javier-diaz-ventas",
      "https://twitter.com/javierdiazventas"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const CourseSchema: React.FC<{ courses: any[] }> = ({ courses }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": courses.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": course.title,
        "description": course.description,
        "provider": {
          "@type": "Organization",
          "name": "Escuela de Vendedores Profesionales"
        }
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const SEOSchemas: React.FC<SEOSchemasProps> = ({ title, description, image, type = "website" }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "BlogPosting" : "WebPage",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": "Javier Díaz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Escuela de Vendedores Profesionales",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};