import React, { useState, useRef } from 'react';
import {
  Grid,
  withStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import TableCustom from 'app/main/components/table/TableCustom';
import { workOrdersTableConfig } from './workOrdersTableConfig';
import Layout from 'app/main/components/layout/Layout';
import clsx from 'clsx';
import { firestore } from 'firebase';

const styles = theme => ({
  panelOppened: {
    paddingBottom: 8,
    paddingTop: 0
  },
  panel: {
    boxShadow: "none",
    border: "1px solid lightgrey",
  }
})

let first = [null]
let last = [null]
let count = 0

const WorkOrdersPage = ({ classes, history }) => {
  const db = firestore()
  const user = JSON.parse(localStorage.getItem('user'))
  const refCustomTable = useRef()
  const [selectedStatus, setSelectedStatus] = useState("")
  const newStatusList = ["AVAILABLE", "CANCELED"]
  const [offset, setOffset] = useState(0)

  const workOrdersQuery = async query => {
    const { type, page } = await handleType(query)
    return getWorkOrdersData(query, type, page)
  }

  const getAllWorkOrders = ({ limit, type, page }) => {
    if (type === "prev") {
      return new Promise(async (resolve, reject) => {
        const countRef = db.collection("workorders").where("userId", "==", user ? user.uid : '').orderBy("createdDate").startAt(first[page]).limit(limit)
        const snapshot = await countRef.get()
        last[page] = snapshot.docs[snapshot.docs.length - 1]
        first[page] = snapshot.docs[0]
        const workOrders = snapshot.docs
        const count = snapshot.count
        resolve({ workOrders, count })
      })
    }


    return new Promise(async (resolve, reject) => {
      let temp = null
      if (last[page - 1]) {
        temp = last[page - 1]
      }
      const countRef = db.collection("workorders").where("userId", "==", user ? user.uid : '').orderBy("createdDate").startAfter(temp).limit(limit)
      const snapshot = await countRef.get()
      last[page] = snapshot.docs[snapshot.docs.length - 1]
      first[page] = snapshot.docs[0]
      const workOrders = snapshot.docs
      const count = snapshot.count
      resolve({ workOrders, count })
    })
  }

  const getWorkOrdersData = async (query, type, page) => {
    if (!count) {
      await getAllWorkOrdersCount()
    }
    return new Promise(async resolve => {
      const data = await getAllWorkOrders({
        page,
        limit: query.pageSize,
        type
      })
      const workOrders = data.workOrders.map(doc => doc.data())
      resolve({
        data: workOrders,
        page: query.page,
        totalCount: count
      })
    })
  }

  const getAllWorkOrdersCount = async () => {
    const workOrdersCollection = db.collection("workorders").where("userId", "==", user ? user.uid : "")
    const snap = await workOrdersCollection.get()
    count = snap.docs.map(doc => doc.data()).length
  }

  const handleType = query => {
    return new Promise(resolve => {
      const newOffset = query.page * query.pageSize
      let type = "next"
      if (newOffset < offset) {
        type = "prev"
      }
      setOffset(newOffset)
      resolve({
        type,
        page: query.page
      })
    })
  }

  const filterChips = (
    <>
      <FormGroup row className={"items-center"}>
        <Typography color="primary" variant="body1" className={"mr-12 uppercase font-900"}>Status: </Typography>
        {newStatusList.map(item => {
          return (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={item.name === selectedStatus}
                    color="primary"
                    onClick={() => item.name === selectedStatus ? null : setSelectedStatus(item.name)}
                  />
                }
                label={<Typography variant={"caption"} className={"font-700"}>{`${item.name}(${item.count})`}</Typography>}
              />
            </>
          )
        })}
      </FormGroup>
      <Button
        variant="contained"
        size="small"
        color="primary"
        className="float-right"
        onClick={() => console.log("Function to reset Filters")}>
        Clear Filters
      </Button>
    </>
  )

  return (
    <Layout>
      <Grid container justify="center" className="px-16 py-12">
        <Grid item xs={12} className="px-24">
          <Typography variant="h5" color="primary" className="font-900">Meus Pedidos</Typography>
          <Divider className="mb-12" />
        </Grid>
        <Grid item xs={12} className="px-12">
          {/* <Grid item xs={12} className="mb-12">
          {filterChips && (
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={"italic"}><FontAwesomeIcon icon={faFilter} /> Demais Filtros</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelOppened}>
                <Grid item xs={12} className={"float-left"}>
                  {filterChips}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
        </Grid> */}
          <TableCustom
            forwardedRef={refCustomTable}
            data={query => workOrdersQuery(query)}
            config={workOrdersTableConfig}
            filterChips={filterChips}
            showDateFilter={false}
            onRowClick={(e, rowData) => history.push(`pedidos/${rowData.id}`)}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default withStyles(styles)(WorkOrdersPage)