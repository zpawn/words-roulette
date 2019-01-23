import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

////

export const styles = theme => ({
  Alert: {
    marginBottom: theme.spacing.unit
  },

  success: {
    border: `2px solid ${green[600]}`
  },
  error: {
    border: `2px solid ${theme.palette.error.dark}`
  },
  info: {
    border: `2px solid ${theme.palette.primary.dark}`
  },
  warning: {
    border: `2px solid ${amber[700]}`
  },
  default: {}
});
