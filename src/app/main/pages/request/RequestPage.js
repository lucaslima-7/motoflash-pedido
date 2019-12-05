import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from 'app/store/actions';
import {
  Grid,
  Typography,
  withStyles,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import Autocomplete from "react-google-autocomplete";
import Script from "react-load-script";
import Layout from 'app/main/components/layout/Layout';
import { transformAddressGoogle } from 'app/utils/ValidationUtil';
import { transformAddress } from 'app/utils/TransformUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faRoad } from '@fortawesome/free-solid-svg-icons';
import { faClock, faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import ApiWorkOrders from 'app/api/ApiWorkOrder';
import NumberUtil from 'app/utils/NumberUtil';
import history from "@history";
import './autoComplete.css';

const styles = () => ({
  panelOppened: {
    paddingBottom: 8,
    paddingTop: 0
  },
  panel: {
    boxShadow: "none",
    border: "1px solid lightgrey",
  },
  outlinedButton: {
    paddingBottom: "10.5px",
    paddingTop: "10.5px",
    padding: "18.5px 14px",
    font: "1.4rem",
    fontWeight: "400",
    minWidth: "92%",
    borderRadius: 5,
    border: "0.5px solid rgba(0, 0, 0, 0.25)",
    height: "1.1875em",
  },
  separator: {
    width: 1,
    height: 500,
    margin: "0 auto",
    marginTop: 12,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  }
})

const RequestPage = ({ classes }) => {
  const dispatch = useDispatch()
  const inputPlacesGoogle = useRef(null);
  const { REACT_APP_MAP_KEY } = process.env;
  const user = JSON.parse(localStorage.getItem('user'))
  const mapKey = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_MAP_KEY}
  &v=3.exp&libraries=geometry,drawing,places`;
  const [loading, setLoading] = useState(false)
  const [collect, setCollectPoint] = useState({
    address: {
      address2: ""
    },
    id: "xx1",
    sequence: 1,
    status: "PENDING"
  })
  const [collectDone, setCollectDone] = useState(false)
  const [delivery, setDeliveryPoint] = useState({
    address: {
      address2: ""
    },
    id: "xx2",
    sequence: 2,
    status: "PENDING"
  })
  const [deliveryDone, setDeliveryDone] = useState(false)
  const [quotation, setQuotation] = useState(null)
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  const selectNumber = (input, pos) => {
    dispatch(Actions.showMessageDialog('warning', 'Informe o número!'))
    input.focus();
    window.setTimeout(function () {
      input.setSelectionRange(pos + 2, pos + 8);
    }, 100);
  };

  const handleDelivery = place => {
    let address = transformAddressGoogle(place);

    if (address.number === "" && address.address1.length > 0) {
      let pos = address.address1.length;
      let address1 = address.address1 + ", número";
      let inputRef = inputPlacesGoogle.current.refs.input;
      selectNumber(inputRef, pos);
      inputRef.value = address1;
      return
    }

    setDeliveryPoint({
      ...delivery,
      address: {
        ...address
      }
    })
  };

  const handleCollect = place => {
    let address = transformAddressGoogle(place);

    if (address.number === "" && address.address1.length > 0) {
      let pos = address.address1.length;
      let address1 = address.address1 + ", número";
      let inputRef = inputPlacesGoogle.current.refs.input;
      selectNumber(inputRef, pos);
      inputRef.value = address1;
      return
    }

    setCollectPoint({ ...collect, address: { ...address } })
  }

  const resetCollect = () => {
    setCollectPoint({
      address: {
        address2: ""
      },
      id: "xx1",
      sequence: 1,
      status: "PENDING"
    })
    setCollectDone(false)
  }

  const resetDelivery = () => {
    setDeliveryPoint({
      address: {
        address2: ""
      },
      id: "xx2",
      sequence: 2,
      status: "PENDING"
    })
    setDeliveryDone(false)
  }

  const getQuotation = async () => {
    setLoading(true)
    const options = {
      companyId: "gGdovReizYh9fZSVUDUY",
      points: [
        {
          ...collect
        },
        {
          ...delivery
        }
      ]
    }
    try {
      const { data } = await new ApiWorkOrders().getQuotation(options)
      setQuotation(data.quotation)
      dispatch(Actions.showMessageDialog('success', 'Este é o valor da sua corrida! :)'))
    } catch (error) {
      dispatch(Actions.showMessageDialog('error', 'Ocorreu um erro ao calcular o valor da corrida, tente novamente!'))
    } finally {
      setLoading(false)
    }
  }

  const addWorkOrder = async () => {
    setLoading(true)
    const options = {
      workOrder: {
        userId: user.uid,
        quotation: {
          ...quotation
        },
        points: [
          {
            ...collect
          },
          {
            ...delivery
          }
        ]
      }
    }
    try {
      await new ApiWorkOrders().addWorkOrder(options)
      dispatch(Actions.showMessageDialog('success', 'Corrida adicionada com sucesso!'))
      history.push('/pedidos')
    } catch (error) {
      dispatch(Actions.showMessageDialog('error', 'Ocorreu um erro ao adicionar a corrida, tente novamente!'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Grid container justify="space-evenly" className="px-16 py-12">
        <Grid item xs={12}>
          <Typography variant="h5" className="font-600">Solicitar</Typography>
          <Divider className="mb-12" />
        </Grid>
        <Grid container justify="flex-start">
          <Grid item xs={4} className="px-12 py-24">
            <Grid item xs={12} className="mb-16">
              <Typography variant="h6">Coleta</Typography>
            </Grid>
            <Grid item xs={12}>
              <Script url={mapKey} onLoad={() => setScriptLoaded(true)} />
              {scriptLoaded && (
                <Autocomplete
                  className={clsx(classes.outlinedButton, "autoCompleteInput")}
                  name="collect"
                  placeholder="Endereço de Coleta"
                  disabled={collectDone}
                  ref={inputPlacesGoogle}
                  onPlaceSelected={place => {
                    handleCollect(place);
                  }}
                  types={"locality"}
                  componentRestrictions={{ country: "br" }}
                />
              )}
            </Grid>
            <Grid item xs={12} className="mt-8">
              <TextField
                label="Complemento"
                fullWidth
                variant="outlined"
                disabled={collectDone}
                margin="dense"
                value={collect.address.address2}
                onChange={e => setCollectPoint({
                  ...collect, address: { ...collect.address, address2: e.target.value }
                })}
              />
            </Grid>
            <Grid item xs={12} className="mt-12 text-right">
              <Button
                disabled={!collect.address.address1 || collectDone}
                size="small"
                color="primary"
                variant="contained"
                onClick={() => setCollectDone(true)}
              >
                Confirmar Coleta
             </Button>
            </Grid>
            <Divider className="my-16" />
            <Grid item xs={12} className="mb-16">
              <Typography variant="h6">Entrega</Typography>
            </Grid>
            <Grid item xs={12}>
              <Script url={mapKey} onLoad={() => { setScriptLoaded(true) }} />
              {scriptLoaded && (
                <Autocomplete
                  className={clsx(classes.outlinedButton, "autoCompleteInput")}
                  name="delivery"
                  placeholder="Endereço de Entrega"
                  disabled={deliveryDone}
                  ref={inputPlacesGoogle}
                  onPlaceSelected={(place) => {
                    handleDelivery(place);
                  }}
                  types={"locality"}
                  componentRestrictions={{ country: "br" }}
                />
              )}
            </Grid>
            <Grid item xs={12} className="mt-8">
              <TextField
                label="Complemento"
                fullWidth
                variant="outlined"
                disabled={deliveryDone}
                margin="dense"
                value={delivery.address.address2}
                onChange={e => setDeliveryPoint({
                  ...delivery, address: { ...delivery.address, address2: e.target.value }
                })}
              />
            </Grid>
            <Grid item xs={12} className="mt-12 text-right">
              <Button
                disabled={!delivery.address.address1 || deliveryDone}
                size="small"
                color="primary"
                variant="contained"
                onClick={() => setDeliveryDone(true)}
              >
                Confirmar Entrega
             </Button>
            </Grid>
          </Grid>
          <Grid item xs={1} className="px-24">
            <div className={classes.separator} />
          </Grid>
          <Grid item xs={4} className="px-12 py-24">
            <Grid item xs={12} className="mb-16">
              <Typography variant="h6">Resumo do Pedido</Typography>
            </Grid>
            <Grid item xs={12} className={"mt-8 p-4"}>
              <Typography variant="h6" className="font-700">
                Coleta
                {collectDone && (
                  <span className={"float-right"}>
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-A700 text-20" />
                  </span>
                )}
              </Typography>
              <Typography>
                <span className="text-blue-A100 font-600">Local: </span>
                {collectDone ? (
                  transformAddress(collect.address)
                ) : " - "}
              </Typography>
              <Button className="mt-16" size="small" variant="contained" color="primary" onClick={() => resetCollect()}>
                  <FontAwesomeIcon icon={faTimesCircle} className={"mr-12"} />
                  Deletar
              </Button>
              {/* <Typography>
                <span className="text-blue-A100 font-600">Detalhes: </span>
              </Typography> */}
            </Grid>
            <Divider className="my-8" />
            <Grid item xs={12} className={"mt-8 p-4"}>
              <Typography variant="h6" className="font-700">
                Entrega
                {deliveryDone && (
                  <span className={"float-right"}>
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-A700 text-20" />
                  </span>
                )}
              </Typography>
              <Typography>
                <span className="text-blue-A100 font-600">Local: </span>
                {deliveryDone ? (
                  transformAddress(delivery.address)
                ) : " - "}
              </Typography>
              <Button className="mt-16" size="small" variant="contained" color="primary" onClick={() => resetDelivery()}>
                  <FontAwesomeIcon icon={faTimesCircle} className={"mr-12"} />
                  Deletar
              </Button>
              {/* <Typography>
                <span className="text-blue-A100 font-600">Detalhes: </span>
              </Typography> */}
            </Grid>
            {quotation ? (
              <>
                <Grid item xs={12} className="px-12 mt-36 text-center">
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <Grid container alignItems="center">
                        <Grid item xs={12}>
                          <FontAwesomeIcon icon={faCoins} className="text-32 mb-4" />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography color="primary" className="font-semibold">
                            Preço
                          </Typography>
                          <Typography variant="body1" className="font-700">
                            {`${NumberUtil.getDoubleAsCurrency(quotation.price)}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Grid container alignItems="center">
                        <Grid item xs={12}>
                          <FontAwesomeIcon icon={faClock} className="text-32 mb-4" />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography color="primary" className="font-semibold">
                            Tempo
                          </Typography>
                          <Typography variant="body1" className="font-700">
                            {NumberUtil.secondsToMinutes(quotation.duration)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Grid container alignItems="center">
                        <Grid item xs={12}>
                          <FontAwesomeIcon icon={faRoad} className="text-32 mb-4" />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography color="primary" className="font-semibold">
                            Distância
                              </Typography>
                          <Typography variant="body1" className="font-700">
                            {NumberUtil.metersToKm(quotation.distance)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="mt-12 text-right">
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => addWorkOrder()}
                  >
                    Confirmar Pedido
                  </Button>
                </Grid>
              </>
            ) : (
                <Grid item xs={12} className="text-center mt-24">
                  {(collectDone && deliveryDone) && (
                    <Button
                      disabled={loading}
                      fullWidth
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => getQuotation()}
                    >
                      {loading ? "Calculando..." : "Calcular"}
                    </Button>
                  )}
                </Grid>
              )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default withStyles(styles)(RequestPage)