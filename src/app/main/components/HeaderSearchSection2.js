import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  IconButton,
  Divider,
  TextField,
  Typography,
  LinearProgress
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Downshift from "downshift";
import history from "../../../../../history";

const styles = theme => ({
  root: {
    padding: "6px 4px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      marginBottom: 24,
      maxWidth: 300
    },
    input: {
      marginLeft: 8,
      flex: 1,
      padding: 10,
      width: "100%",
      "&:after": {
        backgroundColor: "#EC1550",
        transform: "none"
      }
    },
    iconButton: {
      padding: 10,
      position: "relative"
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4
    },
    result: {
      position: "absolute",
      width: "100%",
      backgroundColor: "white"
    }
  }
});

const HeaderSearchSection2 = ({
  getSuggestions,
  loading,
  suggestions,
  landingPages,
  downloadAppDialog
}) => {
  const [value, setValue] = useState("");
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value]);

    return debouncedValue;
  }

  const debouncedSearchTerm = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSuggestions(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const onChange = text => {
    setValue(text);
  };

  const skillPageUrl = skill => {
    if (landingPages.find(x => x.name === skill)) {
      const hash = landingPages.find(x => x.name === skill).hash;
      history.push("/servicos/" + hash);
    } else {
      downloadAppDialog();
      return;
    }
  };

  return (
    <React.Fragment>
      <Paper
        className=" m-auto mt-24"
        elevation={1}
      >
        <Downshift
          // onChange={selection => alert(`You selected ${selection.skill.name}`)}
          // itemToString={item => (item ? item.value : "")}
          onInputValueChange={e => onChange(e)}
        >
          {({
            getRootProps,
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => {
            // console.log(getInputProps());
            return (
              <React.Fragment>
                <Grid container justify="center">
                  {/* <label {...getLabelProps()}>Solicitar helpi</label> */}
                  <Grid item xs={12} className={"px-12 text-center"}>
                    <TextField
                      {...getInputProps()}
                      {...getRootProps()}
                      fullWidth
                      autoFocus
                      placeholder={"Digite o que procura!"}
                      variant="standard"
                      InputProps={{
                        // inputRef: node => {
                        //   // ref(node);
                        //   // inputRef(node);
                        // },
                        style: {
                          fontFamily: "pantonLight",
                          textAlign: "center",
                          marginBottom: 4,
                          padding: 0
                        }
                      }}
                    // {...other}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ul {...getMenuProps()} style={{ width: "100%" }}>
                      {loading && (
                        <Grid item xs={12}>
                          <Typography color="primary" variant="h6">
                            Procurando pelos serviços
                          </Typography>
                          <LinearProgress />
                        </Grid>
                      )}
                      {suggestions.map((item, index) => (
                        <React.Fragment>
                          <div onClick={() => skillPageUrl(item.skill.name)}>
                            <Typography
                              color="primary"
                              variant="h6"
                              fontWeight={600}
                              style={{ alignSelf: "center" }}
                            >
                              {item.skill.name}
                            </Typography>
                            {item.keyword && (
                              <Typography
                                color="primary"
                                variant="body2"
                                style={{ alignSelf: "center" }}
                                noWrap={true}
                              >
                                {item.keyword}
                              </Typography>
                            )}
                          </div>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </ul>
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          }}
        </Downshift>

        <Divider
          style={{ alignSelf: "flex-start", margin: 4, height: 35, width: 1 }}
        />
        <IconButton
          style={{ alignSelf: "flex-start", top: 0 }}
          aria-label="Search"
        // onClick={(e) => onChange(e)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </React.Fragment>
  );
};

// HeaderSearchSection2.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(HeaderSearchSection);
//  geolocated({
//   positionOptions: {
//     enableHighAccuracy: true
//   },
//   userDecisionTimeout: 5000
// })
export default withStyles(styles)(HeaderSearchSection2);
