import React from "react";
import { Badge } from "react-bootstrap";
import "../Styles/Filters.css";

function Filters({variant, onFilterChange}) {
  return (
    <div>
      <Badge
        pill
        variant={variant === "all" ? "dark" : ""}
        onClick={() => onFilterChange("all")}
      >
        All
      </Badge>
      <Badge
        pill
        variant={variant === "active" ? "dark" : ""}
        onClick={() => onFilterChange("active")}
      >
        Active
      </Badge>
      <Badge
        pill
        variant={variant === "completed" ? "dark" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </Badge>
    </div>
  );
}

export default Filters;
