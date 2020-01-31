import React from "react";
import Helmet from "react-helmet";
import config from "../../utils/siteConfig";
import PropTypes from "prop-types";

const Seo = ({ ...props }) => {
  const { postNode, pagePath, pageSEO, loggedInPage = false } = props;
  let title;
  let description;
  let image;
  let imgWidth;
  let imgHeight;
  let pageUrl;

  // Set Default OpenGraph Parameters for Fallback
  title = config.siteTitle;
  description = config.siteDescription;
  image = config.siteUrl + config.shareImage;
  imgWidth = config.shareImageWidth;
  imgHeight = config.shareImageHeight;
  pageUrl = config.siteUrl;

  // Replace with Page Parameters if post or page
  if (pageSEO) {
    title = postNode.title;
    description = postNode.description ? postNode.description : description;
    pageUrl = config.siteUrl + pagePath;
  }

  if (loggedInPage) {
    title = postNode.title;
    pageUrl = config.siteUrl + pagePath;
  }

  // Default Website Schema
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : ""
    }
  ];

  // Page SEO Schema
  if (pageSEO) {
    schemaOrgJSONLD.push({
      "@context": "http://schema.org",
      "@type": "WebPage",
      url: pageUrl,
      name: title
    });
  }

  return (
    <Helmet>
      {/* General tags */}
      {!loggedInPage && <meta name="image" content={image} />}
      {!loggedInPage && <meta name="description" content={description} />}

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}

      {!loggedInPage && <meta property="og:title" content={title} />}

      {!loggedInPage && <meta property="og:url" content={pageUrl} />}
      {!loggedInPage && (
        <meta
          property="og:image"
          content="http://evvntly.com/socialshare.jpg"
        />
      )}
      {!loggedInPage && (
        <meta
          property="og:image:secure_url"
          content="https://evvntly.com/socialshare.jpg"
        />
      )}
      {!loggedInPage && <meta property="og:image:width" content={imgWidth} />}
      {!loggedInPage && <meta property="og:image:height" content={imgHeight} />}
      {!loggedInPage && (
        <meta property="og:description" content={description} />
      )}

      {/* Twitter Card tags */}
      {!loggedInPage && (
        <meta name="twitter:card" content="summary_large_image" />
      )}
      {!loggedInPage && (
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : ""}
        />
      )}
      {!loggedInPage && <meta name="twitter:title" content={title} />}
      {!loggedInPage && <meta name="twitter:image" content={image} />}
      {!loggedInPage && (
        <meta name="twitter:description" content={description} />
      )}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

Seo.propTypes = {
  postNode: PropTypes.object,
  pagePath: PropTypes.string,
  postSEO: PropTypes.object,
  pageSEO: PropTypes.bool,
  customTitle: PropTypes.bool,
  loggedInPage: PropTypes.bool
};

export default Seo;
