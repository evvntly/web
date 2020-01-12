import React from "react";
import Helmet from "react-helmet";
import config from "../../utils/siteConfig";
import PropTypes from "prop-types";

const Seo = ({ ...props }) => {
  const { postNode, pagePath, postSEO, pageSEO, customTitle } = props;
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

  if (customTitle) {
    title = postNode.title;
    pageUrl = config.siteUrl + "/" + pagePath + "/";
  }

  // Replace with Page Parameters if post or page
  if (postSEO || pageSEO) {
    title = postNode.title;
    description =
      postNode.metaDescription === null
        ? postNode.body.childMarkdownRemark.excerpt
        : postNode.metaDescription.internal.content;

    pageUrl = config.siteUrl + "/" + pagePath + "/";
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
      <meta name="image" content={image} />
      <meta name="description" content={description} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      {postSEO ? <meta property="og:type" content="article" /> : null}

      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={imgWidth} />
      <meta property="og:image:height" content={imgHeight} />
      <meta property="og:description" content={description} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : ""}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

Seo.propTypes = {
  postNode: PropTypes.object,
  pagePath: PropTypes.string,
  postSEO: PropTypes.object,
  pageSEO: PropTypes.bool,
  customTitle: PropTypes.bool
};

export default Seo;
