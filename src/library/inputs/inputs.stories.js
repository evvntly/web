import React from "react";
import { storiesOf } from "@storybook/react";
import TextInput from "./text";
import TextArea from "./textarea";

storiesOf("Inputs/Text", module)
  .add("Text empty", () => <TextInput />)
  .add("Text with placeholder", () => <TextInput placeholder="Your Name" />)
  .add("Text with error", () => (
    <TextInput error="this is a required field" placeholder="Your Name" />
  ))
  .add("Text with title", () => (
    <TextInput title="Please enter your details" placeholder="Your Name" />
  ))
  .add("Text with title and error", () => (
    <TextInput
      title="Please enter your details"
      placeholder="Your Name"
      error="this is a required field"
    />
  ));

storiesOf("Inputs/TextArea", module)
  .add("TextArea empty", () => <TextArea />)
  .add("TextArea with placeholder", () => <TextArea placeholder="Your Name" />)
  .add("TextArea with error", () => (
    <TextArea error="this is a required field" placeholder="Your Name" />
  ))
  .add("TextArea with title", () => (
    <TextArea title="Please enter your details" placeholder="Your Name" />
  ))
  .add("TextArea with title and error", () => (
    <TextArea
      title="Please enter your details"
      placeholder="Your Name"
      error="this is a required field"
    />
  ));
