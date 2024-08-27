import React from "react";
import { Box, Container, Stack } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecuritySharpIcon from "@mui/icons-material/SecuritySharp";
import MultipleStopSharpIcon from "@mui/icons-material/MultipleStopSharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import Typography from "../../MaterialTheme/typography";
export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className={"round"}>
              <LocalShippingIcon className="icon" />
            </Box>
            <h2 className={"shipping"}>Free Shipping</h2>
            <h3 className={"order"}>Free on order over $300</h3>
          </Stack>

          <Stack className="static-box">
            <Box className={"round"}>
              <SecuritySharpIcon className="icon" />
            </Box>
            <h2 className={"shipping"}>Security Payment</h2>
            <h3 className={"order"}>100% security payment</h3>
          </Stack>

          <Stack className="static-box">
            <Box className={"round"}>
              <MultipleStopSharpIcon className="icon" />
            </Box>
            <h2 className={"shipping"}>30 Day Return</h2>
            <h3 className={"order"}>30 day money guarantee</h3>
          </Stack>

          <Stack className="static-box">
            <Box className={"round"}>
              <LocalPhoneSharpIcon className="icon" />
            </Box>
            <h2 className={"shipping"}>24/7 Support</h2>
            <h3 className={"order"}>Support every time fast</h3>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
