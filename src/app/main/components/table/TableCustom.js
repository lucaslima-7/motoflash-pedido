import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/store/actions";
import MaterialTable, { MTablePagination } from "material-table";
import {
  Grid,
  withStyles,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  IconButton,
  TablePagination
} from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import defaultTheme from "app/config/themes/defaultTheme";
import DateFnsUtils from '@date-io/date-fns';
import { MTableToolbar } from "material-table";
import { getLongFromDate, unixtimestampToDate } from "app/utils/DateUtil";
import { Event } from "@material-ui/icons";

const styles = () => ({
  root: {
    padding: 0
  }
})

const TableCustom = ({
  config,
  data,
  style,
  actions,
  classes,
  filterChips,
  forwardedRef,
  showDateFilter = true,
  onChangeRowsPerPage,
  onRowClick
}) => {
  const dispatch = useDispatch()
  const { endDate } = useSelector(({ motoflash }) => motoflash)
  const { startDate } = useSelector(({ motoflash }) => motoflash)
  const today = new Date().getTime()
  const [editMode, setEditMode] = useState(false)
  let options = {
    ...config.options,
    pageSize: 15,
    pageSizeOptions: [15, 50, 100],
    sorting: false,
    debounceInterval: 1000,
    loadingType: 'linear',
    paginationType: 'normal',
    showFirstLastPageButtons: false,
    searchFieldAlignment: "left",
    draggable: false
  };

  const handleQuery = type => {
    if (type === "cancel") {
      dispatch(Actions.setStartDate(today))
      dispatch(Actions.setEndDate(today))
      setEditMode(false)
      return
    }
    setEditMode(false)
    if (forwardedRef) {
      forwardedRef.current.onQueryChange({ page: 0 })
    }
  }

  return (
    <>
      <MaterialTable
        columns={config.columns}
        tableRef={forwardedRef}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onRowClick={onRowClick}
        data={data}
        style={{ boxShadow: "none", border: "1px solid lightgrey" }}
        title={""}
        options={options}
        searchFieldStyle={config.searchFieldStyle}
        actions={actions}
        localization={{
          pagination: {
            labelRowsSelect: 'Linhas',
            labelDisplayedRows: 'Mostrando {from}-{to} de {count} Registros'
          },
          toolbar: {
            nRowsSelected: '{0} linha(s) selecionadas'
          },
          header: {
            actions: 'Ações'
          },
          body: {
            emptyDataSourceMessage: 'Nenhum dado encontrado',
            filterRow: {
              filterTooltip: 'Filter'
            }
          }
        }}
        components={{
          Toolbar: props => (
            <Grid container>
              <Grid item xs={12}>
                <Grid container justify={"space-between"} alignItems={"center"}>
                  {showDateFilter && (
                    <Grid item xs={7} className={"px-8"}>
                      <div className={"flex flex-row items-center"}>
                        <IconButton fontSize="small" className={"pl-12"} onClick={() => setEditMode(true)}>
                          <Event />
                        </IconButton>
                        <Typography variant="body1" className={"font-700"}>
                          De: {startDate <= 0 ? " Todo Período " : unixtimestampToDate(startDate).substring(0, 10)} ~
                          Até: {unixtimestampToDate(endDate).substring(0, 10)}
                        </Typography>
                      </div>
                    </Grid>
                  )}
                  <Grid item xs={showDateFilter ? 5 : 12} className={"px-8"}>
                    <MTableToolbar {...props} searchFieldStyle={{ minWidth: 200 }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ),
          Pagination: props => (
            <Grid container justify="flex-end">
              {/* To se te selection again, remove the selectProps */}
              <TablePagination {...props} SelectProps={{ style: { display: "none" } }} />
            </Grid>
          )
        }}
      />
      <Dialog disableBackdropClick PaperProps={{ style: { margin: 0, minWidth: 1000 } }} open={editMode} onClose={() => setEditMode(false)}>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6" color="primary" className={"uppercase font-700 text-left mb-8 mt-12"}>Select Range</Typography>
          </DialogContentText>
          <Divider className={"my-12"} />
          <Grid item xs={12} className={"mb-24"}>
            <Button
              size="small"
              variant="contained"
              onClick={() => dispatch(Actions.setStartDate(endDate - (7 * 24 * 3600 * 1000)))}
              color="primary"
              className={"mr-4"}>
              1 Week Ago
              </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => dispatch(Actions.setStartDate(endDate - (15 * 24 * 3600 * 1000)))}
              color="primary"
              className={"mr-4"}>
              2 Weeks Ago
              </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => dispatch(Actions.setStartDate(endDate - (30 * 24 * 3600 * 1000)))}
              color="primary"
              className={"mr-4"}>
              30 Days Ago
              </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => dispatch(Actions.setStartDate(0))}
              color="primary"
              className={"mr-4"}>
              All Data
              </Button>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify={"space-evenly"}>
              {startDate > 0 ? (
                <Grid item xs={4}>
                  <Typography variant="body1" color={"primary"} className={"font-700"}>De: </Typography>
                  <KeyboardDatePicker
                    margin="dense"
                    orientation={"portrait"}
                    inputVariant="outlined"
                    id="initial-date-picker-dialog"
                    format="dd/MM/yyyy"
                    value={startDate}
                    maxDate={today}
                    variant="static"
                    className={"items-center"}
                    onChange={date => dispatch(Actions.setStartDate(getLongFromDate(date)))}
                  />
                </Grid>
              ) : (
                  ""
                )}
              <Grid item xs={4}>
                <Typography variant="body1" color={"primary"} className={"font-700"}>Até: </Typography>
                <KeyboardDatePicker
                  margin="dense"
                  orientation={"portrait"}
                  inputVariant="outlined"
                  id="final-date-picker-dialog"
                  label="Até: "
                  format="dd/MM/yyyy"
                  value={endDate}
                  maxDate={today}
                  variant="static"
                  onChange={date => dispatch(Actions.setEndDate(getLongFromDate(date)))}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent >
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => handleQuery("cancel")} color="primary">
            Cancel
        </Button>
          <Button
            variant="contained"
            disabled={endDate < startDate}
            onClick={() => handleQuery("apply")} color="primary">
            Apply
        </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(TableCustom)