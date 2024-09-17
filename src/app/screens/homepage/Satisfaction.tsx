import React from "react";
import { Box, Container, Stack } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecuritySharpIcon from "@mui/icons-material/SecuritySharp";
import MultipleStopSharpIcon from "@mui/icons-material/MultipleStopSharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import GroupIcon from "@mui/icons-material/Group";
export default function Satisfaction() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className={"round2"}>
              <GroupIcon className="icon" />
            </Box>
            <h2 className={"shipping2"}>Satisfied Customers</h2>
            <h3 className={"order1"}>1963</h3>
          </Stack>

          <Stack className="static-box">
            <Box className={"round2"}>
              <GroupIcon className="icon" />
            </Box>
            <h2 className={"shipping2"}>Quality of Service</h2>
            <h3 className={"order1"}>99%</h3>
          </Stack>

          <Stack className="static-box">
            <Box className={"round2"}>
              <GroupIcon className="icon" />
            </Box>
            <h2 className={"shipping2"}>Quality Certificates</h2>
            <h3 className={"order1"}>33</h3>
          </Stack>

          <Stack className="static-box">
            <Box className={"round2"}>
              <GroupIcon className="icon" />
            </Box>
            <h2 className={"shipping2"}>Available Products</h2>
            <h3 className={"order1"}>789</h3>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
