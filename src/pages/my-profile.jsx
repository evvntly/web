import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";

const MyProfile = () => {
  return (
    <>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <Layout>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="My Profile" />
            <Paragraph>Coming Soon</Paragraph>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default MyProfile;
