import React, { useContext, useEffect } from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";
import { myContext } from "../context/provider";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";

const MyProfile = () => {
  const postNode = {
    title: `${config.siteTitle} | My Events`,
    pagePath: "/my-events"
  };

  const context = useContext(myContext);

  useEffect(() => {
    context.setIsAuthPage(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/my-profile" loggedInPage />
      <Layout>
        {context.isAuthPage && context.user && (
          <>
            <Banner img="moshpit" />
            <Container>
              <Main>
                <Heading title="My Profile" />
                <Paragraph>Coming Soon</Paragraph>
              </Main>
            </Container>
          </>
        )}
      </Layout>
    </>
  );
};

export default MyProfile;
