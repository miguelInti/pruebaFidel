import { BarIcon } from "@components/icons/Bar";
import { Cart } from "@components/icons/Cart";
import { PuntosIcon } from "@components/icons/PuntosIcon";
import { styled } from "@mui/system";
import { Grid, Typography, Button } from "@mui/material";
import Link from 'next/link';
import ButtonHelper from "@components/ButtonHelper/ButtonHelper";
import ButtonPedidos from "@components/ButtonPedidos/ButtonPedidos";

const StyledButton = styled(Button)({
  display: "grid",
  justifyContent: "center",
  justifyItems: "center",
  "& span.MuiButton-label": {
    justifyItems: "center",
  },
});

export const ButtonsGroup = () => {

  return (
    <Grid
      container
      paddingLeft={3}
      paddingTop={2}
      item
      xs={12}
      md={12}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/puntos" style={{ textDecoration: "none" }}>
            <StyledButton>
              <PuntosIcon />
              <Typography variant="h6" style={{ color: "white" }}>
                Puntos
              </Typography>
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
          <ButtonHelper />
        </Grid>
        <Grid item>
          <Link href="/bar" style={{ textDecoration: "none" }}>
            <StyledButton>
              <BarIcon />
              <Typography variant="h6" style={{ color: "white" }}>
                Redención
              </Typography>
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
            <ButtonPedidos />
        </Grid>
      </Grid>
    </Grid>
  );
};
