import React from "react";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import WordsCount from "./WordsCount";

////

const settings = () => (
  <>
    <WordsCount />

    <Typography align="center">
      <Fab
        variant="extended"
        aria-label="Start"
        color="primary"
        type="button"
        component={NavLink}
        to="/roulette"
      >
        Start
      </Fab>
    </Typography>
  </>
);

export default settings;
