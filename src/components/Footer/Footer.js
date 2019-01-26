import React from "react";
import PropTypes from "prop-types";
import {
  compose,
  withState,
  withHandlers,
  setPropTypes,
  setDisplayName
} from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { styles } from "./index";

////

const EasterEggs = () => (
  <span>
    {" "}
    ->{" "}
    <span role="img" aria-label="middle finger">
      &#x1F595;
    </span>
  </span>
);

const Logo = withStyles(styles)(({ classes, onEnter, onLeave }) => (
  <span
    className={classes.noSelect}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    onTouchStart={onEnter}
    onTouchEnd={onLeave}
  >
    xt3.js
  </span>
));

const footer = compose(
  setDisplayName("Footer"),

  setPropTypes({
    classes: PropTypes.object.isRequired
  }),

  withState("isShow", "onIsShowHandler", false),

  withHandlers({
    onEnter: ({ onIsShowHandler }) => () => onIsShowHandler(true),
    onLeave: ({ onIsShowHandler }) => () => onIsShowHandler(false)
  })
)(({ classes, isShow, onEnter, onLeave }) => (
  <footer className={classes.root}>
    <Typography variant="subtitle1" color="textSecondary" component="p">
      <span role="img" aria-label="hammer and wrench">
        &#x1F6E0;
      </span>{" "}
      ->{" "}
      <span role="img" aria-label="red heart">
        &#x2764;
      </span>{" "}
      -> <Logo onEnter={onEnter} onLeave={onLeave} />{" "}
      {isShow ? <EasterEggs /> : null}
    </Typography>
  </footer>
));

export default withStyles(styles)(footer);
