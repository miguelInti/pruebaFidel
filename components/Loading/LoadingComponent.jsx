'use client'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;
