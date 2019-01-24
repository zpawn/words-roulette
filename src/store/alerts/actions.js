import nanoid from "nanoid";

////

const actionTypes = {
  ALERT_ADD: "ALERT_ADD",
  ALERT_REMOVE: "ALERT_REMOVE",
  ALERTS_CLEAR: "ALERTS_CLEAR"
};

const alertAdd = alert => ({
  type: actionTypes.ALERT_ADD,
  alert
});

const alertRemove = id => ({
  type: actionTypes.ALERT_REMOVE,
  id
});

const alertsClear = () => ({
  type: actionTypes.ALERTS_CLEAR
});

////

const alertShow = (variant, message = null) => dispatch => {
  const id = nanoid();
  dispatch(
    alertAdd({
      id,
      variant,
      message: message || variant.toUpperCase()
    })
  );

  if (variant !== "error") {
    setTimeout(() => {
      dispatch(alertRemove(id));
    }, 3000);
  }
};

export { alertShow, alertRemove, alertsClear, actionTypes };
