import React from 'react';
import { Typography } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <Fade delay={100}>
          <Typography variant="h1" color="inherit" className="font-medium mb-16">
            404
          </Typography>
        </Fade>
        <Fade delay={500}>
          <Typography variant="h4" color="primary" className="mb-16">
            Parece que você foi além dos limites 😅
          </Typography>
        </Fade>
        <Link className="font-medium" to="/">Voltar para a Home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
