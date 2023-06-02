import React from "react";
import {
  getAllByAltText,
  getAllByTestId,
  render,
} from "@testing-library/react";
import App from "./App";


test("every service card's image renders", () => {
  const { getAllByAltText, getAllByTestId } = render(<App />); // combine selectors in the same object
  const images = getAllByAltText("Netflix");
  expect(images).not.toBeNull();

  // Gets all images from the ServiceCard components
  const serviceCardImages = getAllByTestId("service-card-image");
  expect(serviceCardImages).not.toBeNull();

  // Checks that each image has a valid source
  serviceCardImages.forEach((image) => {
    expect(image.getAttribute("src")).toContain(
      "https://files.brannan.cloud/tv/",
    );
  });
});
