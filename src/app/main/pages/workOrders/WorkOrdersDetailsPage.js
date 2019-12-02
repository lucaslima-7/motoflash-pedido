import React, { useEffect, useState } from 'react';
import Layout from 'app/main/components/layout/Layout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { firestore } from 'firebase';
import { Paper, CircularProgress, Card } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { unixtimestampToDate } from 'app/utils/DateUtil';
import NumberUtil from 'app/utils/NumberUtil';
import ChipStatus from 'app/main/components/chipStatus/ChipStatus';
import { transformAddress } from 'app/utils/TransformUtil';

const WorkOrdersDetailsPage = ({ classes, match: { params } }) => {
  const db = firestore()
  const [workOrder, setWorkOrder] = useState({
    userId: "",
    createdDate: "",
    price: "",
    status: ""
  })
  const [courier, setCourier] = useState({})
  const [points, setPoints] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getWorkOrderInfo = async () => {
      setLoading(true)
      try {
        const workOrdersRef = db.collection('workOrders').doc(params.workOrderId)
        const snapshot = await workOrdersRef.get()
        setWorkOrder({
          userId: snapshot.data().userId,
          price: snapshot.data().quotation.price,
          createdDate: snapshot.data().createdDate,
          status: snapshot.data().status
        })
        setPoints(snapshot.data().points)
        setCourier(snapshot.data().courier ? snapshot.data().courier : {})
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getWorkOrderInfo()
  }, [params.workOrderId, db])

  const editWorkOrder = () => {
    console.log("funcionando")
  }

  return (
    <Layout showBackButton={'/workOrders'}>
      <Grid container justify="flex-start">
        <Grid item xs={12} className={"px-24 py-4"}>
          <Typography className={"text-left mt-12 font-900"} variant={"h4"}>
            Detalhes da Corrida
          </Typography>
        </Grid>
        <Grid item xs={12} className={"mb-24 mx-12"}>
          <Divider />
        </Grid>
        <Grid item xs={5} className="px-12">
          <Paper elevation={3} className="p-12">
            <Grid container justify={"center"}>
              <Grid item xs={12} className={"mt-8"}>
                <Grid item className="my-12">
                  <ChipStatus status={workOrder.status} />
                </Grid>
                <list>
                  <ListItem className="px-4">
                    <Typography>
                      <span className="font-700">Solicitada Por: </span>
                      {workOrder.userId}
                    </Typography>
                  </ListItem>
                  <ListItem className="px-4">
                    <Typography>
                      <span className="font-700">Valor: </span>
                      {NumberUtil.getDoubleAsCurrency(workOrder.price)}
                    </Typography>
                  </ListItem>
                  <ListItem className="px-4">
                    <Typography>
                      <span className="font-700">Data: </span>
                      {unixtimestampToDate(workOrder.createdDate.seconds * 1000)}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem className="px-4">
                    <Typography>
                      <span className="font-700">Atribuída Para: </span>
                      {courier.name ? courier.name : " - "}
                    </Typography>
                  </ListItem>
                </list>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={5} className="px-12">
          <Paper elevation={3} className="p-12">
            <Grid container justify={"center"}>
              <Grid item xs={12}>
                <Typography variant="h6">Pontos</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {points.length > 0 ? (
                <>
                  <Grid item xs={12} className={"mt-8 p-4"}>
                    <Typography className="font-700">
                      Coleta:
                  </Typography>
                    <Typography>
                      <span className="font-700">Local: </span>
                      {transformAddress(points[0].address)}
                    </Typography>
                    <Grid item className="float-right my-12">
                      <ChipStatus status={points[0].status} />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} className={"mt-8 p-4"}>
                    <Typography className="font-700">
                      Entrega:
                    </Typography>
                    <Typography>
                      <span className="font-700">Local: </span>
                      {transformAddress(points[1].address)}
                    </Typography>
                    <Grid item className="float-right my-12">
                      <ChipStatus status={points[1].status} />
                    </Grid>
                  </Grid>
                </>
              ) : (
                  <CircularProgress size={23} className="py-20" />
                )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default WorkOrdersDetailsPage