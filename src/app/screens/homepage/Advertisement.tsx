import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function Advertisement() {
  return (
    <div className="ads-restaurant-frame">
      <Container>
        <Stack className={"main-advirtesement-container"}>
          <Stack className={"left-container"}>
            <Typography className={"header1"}>Fresh Exotic Fruits</Typography>
            <Typography className={"header2"}>in Our Store</Typography>
            <Typography className={"paragraph"}>
              Fruits like mangoes, berries, and kiwis offer vibrant colors,
              refreshing flavors, and essential vitamins, making them nature's
              perfect healthy snack.
            </Typography>
            <Box>
              <Button className="button-advert"> BUY</Button>
            </Box>
          </Stack>
          <Stack className={"right-container"}>
            <img src={"/img/baner-1.png"} />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
