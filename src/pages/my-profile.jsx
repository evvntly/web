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
import { FirebaseContext } from "gatsby-plugin-firebase";
import { BLACK, RED, RONCHI, WHITE } from "../styles/colors";
import Button from "../library/buttons/button";

const MyProfile = () => {
  const postNode = {
    title: `${config.siteTitle} | My Events`,
    pagePath: "/my-events"
  };

  const context = useContext(myContext);
  let firebase = React.useContext(FirebaseContext);

  useEffect(() => {
    context.setIsAuthPage(true);
  }, []);

  const onDeleteClick = () => {
    if (window.confirm("Are you sure? All your events will be deleted.")) {
      const me = firebase.auth().currentUser;
      me.delete()
        .then(function() {
          context.setUser(false);
          context.setSignin(false);
          window.location.href = "/";
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const DangerZoneStyle = {
    color: RED,
    fontWeight: "bold",
    fontSize: "1.8rem",
    margin: 0
  };

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
                <Paragraph customStyle={DangerZoneStyle}>Danger Zone</Paragraph>
                <Button
                  height="40px"
                  fontSize="15px"
                  borderRadius={2}
                  textColor={WHITE}
                  color={RED}
                  title="Delete my account"
                  onClick={() => onDeleteClick()}
                />
              </Main>
            </Container>
          </>
        )}
      </Layout>
    </>
  );
};

export default MyProfile;
