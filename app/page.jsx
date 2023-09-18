"use client";
import React from 'react';
import { Grid, Button } from "@mui/material";
import Link from 'next/link';
import { AccountCircle, AddCircle } from "@mui/icons-material";

const Home = () => {
  return (
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <h1 style={{ marginBottom: "2rem" }}>Bienvenido a Fidelización</h1>
        </Grid>
        <Grid item sx={{ width: "fit-content" }}>
          <Link href="/login" passHref>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AccountCircle />}
              style={{ width: "300px" }}
            >
              Login
            </Button>
          </Link>
        </Grid>
        <Grid item sx={{ width: "fit-content", marginTop: "10px" }}>
          <Link href="/vincular-maquina" passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddCircle />}
              style={{ width: "300px" }}
            >
              Vincular máquina
            </Button>
          </Link>
        </Grid>
      </Grid>
  );
};

export default Home;
