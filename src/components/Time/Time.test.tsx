import { render, screen } from "@testing-library/react";

import Time from "./Time";

describe("<Time />", () => {
  const expectedMinutes = 10;
  const userHour = 15;

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1, userHour, expectedMinutes));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test.each([60 * 60, 3 * 60 * 60, -2 * 60 * 60])(
    "should display correct time",
    (shift) => {
      const shiftAsHour = shift / (60 * 60);
      render(<Time offset={shift} />);

      expect(screen.getByText(userHour + shiftAsHour)).toBeInTheDocument();
      expect(screen.getByText(expectedMinutes)).toBeInTheDocument();
    }
  );
});

describe("Timezones", () => {
  it("should always be UTC", () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});
