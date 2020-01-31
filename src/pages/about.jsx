import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";
import styled from "styled-components";
import { PHONE } from "../styles/breakpoints";

const About = () => {
  const postNode = {
    title: `${config.siteTitle} | About`,
    pagePath: "/about"
  };

  const Column = styled.div`
    display: flex;
    ${PHONE} {
      flex-direction: column;
    }
  `;

  const Content = styled.div`
    margin-left: 40px;
    width: 50%;
    ${PHONE} {
      width: 100%;
      margin: 0;
    }
  `;

  const ImageContainer = styled.div`
    width: 50%;
    margin-top: 20px;
    ${PHONE} {
      width: 100%;
      margin: 0;
    }
  `;

  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/" pageSEO />
      <Layout>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="About" />
            <Column>
              <ImageContainer>
                <Banner img="about" height={500} />
              </ImageContainer>
              <Content>
                <Paragraph>Hi there!</Paragraph>
                <Paragraph>
                  Welcome to Evvntly! We help you find events happening near you
                  or all around the USA. You can search for Sports Events,
                  Concerts, Musicals, you name it we can hopefully help you find
                  it.
                </Paragraph>
                <Paragraph>
                  If you create an account you can save the events and keep
                  track of the upcoming events that you have coming up.
                </Paragraph>
                <Paragraph>
                  We are using the SeatGeek API, so they have a lot of events in
                  their system.
                </Paragraph>
                <Paragraph>
                  We want your feedback, so if you want to request a feature or
                  you spot a bug, please click the icon to the bottom right side
                  of the site and submit some feedback
                </Paragraph>
                <Paragraph>
                  This website just launched and we are adding new features all
                  the time.
                </Paragraph>
                <Paragraph>
                  The website is also 100% opensource so if you see a bug and
                  want to fix it yourself please feel free to make a pull
                  request on the repo -{" "}
                  <a
                    href="https://github.com/johnnyxbell/eventfinda"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Evvntly Repo"
                  >
                    Evvntly Repo
                  </a>
                </Paragraph>
                <Paragraph>
                  I hope that you find the app useful and enjoy using it!
                </Paragraph>
              </Content>
            </Column>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default About;
