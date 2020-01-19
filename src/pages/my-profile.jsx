import React, { useContext, useEffect, useState } from "react";
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
import { RED, WHITE } from "../styles/colors";
import Button from "../library/buttons/button";
import styled from "styled-components";
import NotesModal from "../components/my-events/notes-modal";
import DeleteAccountModal from "../components/my-profile/delete-account-modal";

const Danger = styled.div`
  margin-top: 25px;
  padding-top: 20px;
  border-top: 2px solid ${RED};
`;
const MyProfile = () => {
  const postNode = {
    title: `${config.siteTitle} | My Events`,
    pagePath: "/my-events"
  };

  const context = useContext(myContext);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  useEffect(() => {
    context.setIsAuthPage(true);
  }, []);

  const DangerZoneStyle = {
    color: RED,
    fontWeight: "bold",
    fontSize: "1.5rem",
    margin: "0 0 15px 0"
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
                <Paragraph>{`Howdy, ${context.user.displayName}.`}</Paragraph>
                <img
                  height={100}
                  width={100}
                  src={context.user.photoURL}
                  alt={context.user.displayName}
                />
                <Paragraph
                  customStyle={{ padding: 0, margin: "10px 0 0 0" }}
                >{`Email: ${context.user.email}.`}</Paragraph>
                <Paragraph
                  customStyle={{ padding: 0, margin: 0 }}
                >{`Linked to: ${context.user.providerData[0].providerId}.`}</Paragraph>
                <Danger>
                  <Paragraph customStyle={DangerZoneStyle}>
                    Danger Zone
                  </Paragraph>
                  <Button
                    height="40px"
                    fontSize="15px"
                    borderRadius={2}
                    textColor={WHITE}
                    color={RED}
                    title="Delete my account"
                    onClick={() => setShowDeleteAccountModal(true)}
                  />
                  <Paragraph customStyle={{ color: RED, fontSize: ".9rem" }}>
                    * This will completely delete your account, and anything you
                    have saved.
                  </Paragraph>
                </Danger>
              </Main>
            </Container>
          </>
        )}
      </Layout>
      {showDeleteAccountModal && (
        <DeleteAccountModal
          onDismiss={() => setShowDeleteAccountModal(false)}
          onComplete={() => setShowDeleteAccountModal(false)}
        />
      )}
    </>
  );
};

export default MyProfile;
