import React from 'react';
import { withStyles } from '@material-ui/core'
import { localize } from 'app/utils/LocalizationUtil'
import clsx from 'clsx';

const styles = () => ({
  chip: {
    fontSize: 12,
    textTransform: "uppercase",
    padding: "4px 14px 4px 14px",
    borderRadius: 12,
    textAlign: "center",
    width: "120px",
    fontWeight: 900
  }
})

const ChipStatus = ({ classes, status }) => {
  const handleColor = status => {
    switch (status) {
      case 'PENDING':
        return "text-blue-900 bg-blue-A100"
      case 'CANCELLED':
        return "text-red-900 bg-red-A100"
      case 'ASSIGNED':
        return "text-teal-900 bg-teal-A100"
      case 'ACTIVE':
        return "text-red-900 bg-red-A100"
      case 'INACTIVE':
        return "text-green-900 bg-green-A100"
      default:
        return "text-green-900 bg-green-A100"
    }
  }

  return (
    <span className={clsx(classes.chip, handleColor(status))}>
      {localize(status)}
    </span>
  )
}

export default withStyles(styles)(ChipStatus)