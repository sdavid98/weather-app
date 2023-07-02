import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input from "./Input";

describe("<Input />", () => {
  test("should display given value", () => {
    const targetValue = "some value";

    render(
      <Input id="" placeholder="" setValue={jest.fn()} value={targetValue} />
    );

    expect(screen.getByRole("textbox")).toHaveValue(targetValue);
  });

  test("should call given callback with new value after change", () => {
    const updateValueSpy = jest.fn();

    render(<Input id="" placeholder="" setValue={updateValueSpy} value={""} />);

    userEvent.type(screen.getByRole("textbox"), "x");

    expect(updateValueSpy).toHaveBeenCalledWith("x");
  });
});
