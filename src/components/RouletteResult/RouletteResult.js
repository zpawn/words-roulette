import React from "react";

import TotalScore from "./TotalScore";
import ResultTable from "./ResultTable";
import AgainButton from "./AgainButton";

////

const rouletteResult = () => {
  return (
    <>
      <TotalScore />
      <ResultTable />
      <AgainButton />
    </>
  );
};

export default rouletteResult;
