//@flow
import React from "react";
import styled from "styled-components";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";
import TextInput from "../library/inputs/text";
import TextArea from "../library/inputs/textarea";
import Button from "../library/buttons/button";

const Flex = styled.div`
  display: flex;
  margin: 0 0 25px 0;
`;

const FlexSpace = styled.div`
  display: flex;
  margin: 0 0 25px 0;
  justify-content: space-between;
  div {
    margin-right: 15px;
    &:last-child {
      margin: 0;
    }
  }
`;

const Contact = () => {
  const postNode = {
    title: `${config.siteTitle} | Contact`,
    pagePath: "/contact"
  };
  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/contact" pageSEO />
      <Layout>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="Contact" />
            <Paragraph>
              If you have any general questions you want to ask us please feel
              free to use the form below to shoot us through a message
            </Paragraph>
            <form
              name="contact"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="/success/"
            >
              {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />
              <FlexSpace>
                <TextInput
                  placeholder="Your First Name"
                  type="text"
                  name="First Name"
                  required={true}
                />
                <TextInput
                  placeholder="Your Last Name"
                  type="text"
                  name="Last Name"
                  required={true}
                />
              </FlexSpace>
              <Flex>
                <TextInput
                  placeholder="Your Email"
                  type="email"
                  name="Email Address"
                  required={true}
                />
              </Flex>
              <Flex>
                <TextArea
                  placeholder="Your Message"
                  type="textarea"
                  name="Your Message"
                  required={true}
                />
              </Flex>
              <Flex>
                <Button title="Send" type="submit" />
              </Flex>
            </form>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default Contact;
