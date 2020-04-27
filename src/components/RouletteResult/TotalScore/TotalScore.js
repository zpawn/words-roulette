import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { getValidScore } from "../../../store/roulette";

////

const mapStateToProps = state => ({
  count: state.rouletteSettings.count,
  words: state.words.items,
  steps: state.roulette.steps
});

////

const TotalScore = ({ words, steps, count }) => (
  <Grid container justify="space-around" alignItems="flex-end">
    <Grid item>
      <Typography>Score:</Typography>
    </Grid>

    <Grid item>
      <Typography variant="h3">
        {getValidScore(words, steps)}/{count}
      </Typography>
    </Grid>
  </Grid>
);

TotalScore.propTypes = {
  steps: PropTypes.array,
  count: PropTypes.number,
  words: PropTypes.object
};

export default connect(mapStateToProps)(TotalScore);
