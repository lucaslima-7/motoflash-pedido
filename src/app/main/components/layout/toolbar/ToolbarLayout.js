import React from 'react';
import { AppBar, Grid, Button } from '@material-ui/core';
import UserMenu from 'app/main/components/user-menu/UserMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import history from "@history";

const ToolbarLayout = ({ showBackButton }) => {
  return (
    <AppBar className="bg-white flex shadow-none relative z-10">
      <Grid container justity="space-between" className="p-0 px-16">
        {showBackButton && (
          <Grid item xs={7} className="pt-12">
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="float-left shadow-none"
              onClick={() => history.push(showBackButton)}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-12" />
              Voltar
          </Button>
          </Grid>
        )}
        <Grid item xs={showBackButton ? 5 : 12}>
          <UserMenu />
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default ToolbarLayout;