import React, { memo } from 'react';
import { Button, Typography, styled } from '@mui/material';

import { PhoneIcon } from '@components/icons/PhoneIcon';
import useHelp from '@hooks/useHelp';

const styles = {
  content: {
    display: 'grid',
    justifyContent: 'center',
    justifyItems: 'center',
    '& .MuiButton-label': {
      justifyItems: 'center',
    },
  },
  contentInactive: {
    display: 'grid',
    justifyContent: 'center',
    justifyItems: 'center',
    opacity: 0.5,
    '& .MuiButton-label': {
      justifyItems: 'center',
    },
  },
};

const StyledButton = styled(Button)(styles.content);
const StyledInactiveButton = styled(Button)(styles.contentInactive);

function ButtonHelper() {
  const { hasPending, solicitar, hasSolicitudes } = useHelp();
  return (
    <>
      {hasSolicitudes() ? (
        <StyledButton disabled>
          <PhoneIcon color="#efb810" />
          <Typography variant="h6" style={{ color: 'white' }}>
            En camino
          </Typography>
        </StyledButton>
      ) : (
        <StyledButton
          disabled={hasPending}
          sx={{ display: 'grid' }}
          className={`${hasPending === true ? 'contentInactive' : ''}`}
          onClick={solicitar}
        >
          <PhoneIcon color="" />
          <Typography variant="h5" style={{ color: 'white' }}>
            Ayuda
          </Typography>
        </StyledButton>
      )}
    </>
  );
}

export default memo(ButtonHelper);
