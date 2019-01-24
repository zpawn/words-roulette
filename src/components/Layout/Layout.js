import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Router from "../Router";
import Navigation, { NewWordButton } from "../Navigation";
import Alerts from "../UI/Alerts";
import Footer from "../Footer";
import { styles } from "./index";

////

const layout = ({ classes }) => (
  <div className={classes.layout}>
    <Alerts />
    <Navigation />
    <main className={classes.content}>
      <Router />
      <NewWordButton />
    </main>
    <Footer />
  </div>
);

layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(layout);
