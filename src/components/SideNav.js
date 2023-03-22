import { Container, Stack, Typography } from "@mui/material";
import React from "react";

const SideNav = () => {
  return (
    <div className="side-nav">
      <Container>
        <Stack direction="column" spacing={6}>
          <Typography></Typography>
          <Typography>Inventory</Typography>
          <Typography>Add Item</Typography>
        </Stack>
      </Container>
    </div>
  );
};

export default SideNav;
