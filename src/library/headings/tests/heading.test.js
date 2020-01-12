import React from "react";
import renderer from "react-test-renderer";
import Heading from "../heading";

describe("Heading", () => {
  test("Heading", () => {
    expect(
      renderer.create(<Heading title="hello" />).toJSON()
    ).toMatchSnapshot();
  });
  test("Heading with trailing text", () => {
    expect(
      renderer
        .create(<Heading title="hello" trail="I am some trailing text" />)
        .toJSON()
    ).toMatchSnapshot();
  });
});
