import React from "react";
import { storiesOf } from "@storybook/react";
import Heading from "./Heading";

storiesOf("Headings", module)
  .add("h1", () => <Heading title="Hi there I'm a heading" />)
  .add("h1 with trailing text", () => (
    <Heading
      title="Hi there I'm a heading"
      trail="I'm some trailing text for you to see"
    />
  ));
