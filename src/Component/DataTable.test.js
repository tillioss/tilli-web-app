import React from "react";
import { render } from "@testing-library/react";
import DataTableWrapper from "./DataTable";

describe("DataTableWrapper", () => {
  it("renders without errors", () => {
    const columns = [
      { name: "ID", selector: "id" },
      { name: "Name", selector: "name" },
    ];

    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];

    render(<DataTableWrapper columns={columns} data={data} />);
  });
});
