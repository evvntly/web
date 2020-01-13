import React, { useContext, useEffect } from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";
import { myContext } from "../context/provider";

const MyProfile = () => {
  const context = useContext(myContext);

  useEffect(() => {
    context.setIsAuthPage(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
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
