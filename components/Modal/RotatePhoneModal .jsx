import React from "react";
import { Box, Dialog, DialogContent, useMediaQuery } from "@mui/material";
import { RotateLeft } from "@mui/icons-material";

const RotatePhoneModal = ({ open, onClose }) => {
  const isVertical = useMediaQuery('(orientation: portrait)');

  return (
    <Dialog open={open && isVertical} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
        <RotateLeft sx={{ fontSize: 64, color: "red" }} />
        <Box mt={2}>
          <p style={{ textAlign: "center" }}>
            Gira tu teléfono para una mejor experiencia.
          </p>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RotatePhoneModal;
