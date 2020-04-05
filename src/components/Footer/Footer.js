import React, { PureComponent } from "react";
import PropTypes from "prop-types";
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

class Footer extends PureComponent {
  state = {
    isShow: false
  }

  onEnter = () => this.setState({ isShow: true })

  onLeave = () => this.setState({ isShow: false })

  render() {
    const { isShow } = this.state;
    const { classes } = this.props;

    return (
      <footer className={classes.root}>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          <span role="img" aria-label="hammer and wrench">&#x1F6E0;</span>{" "}
          ->{" "}
          <span role="img" aria-label="red heart">&#x2764;</span>{" "}
          -> <Logo onEnter={this.onEnter} onLeave={this.onLeave} />{" "}
          {isShow ? <EasterEggs /> : null}
        </Typography>
      </footer>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
