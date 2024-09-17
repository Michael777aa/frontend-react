import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

const Footers = styled.div`
  width: 100%;
  padding: 60px 0;
  background-color: #747d88;
  color: #fff;
`;

const FooterInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",
    backgroundColor: "#fff",
    width: "636px",
    height: "59px",
    "& fieldset": {
      border: "none",
    },
  },
}));

const FooterButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#81c408",
  color: "#fff",
  borderRadius: "25px",
  padding: "10px 25px",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#ffb514",
  },
}));
const FooterButton2 = styled(Button)(({ theme }) => ({
  backgroundColor: "#81c408",
  color: "#fff",
  borderRadius: "25px",
  padding: "10px 15px",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#ffb514",
  },
}));

export default function Footer() {
  const authMember = null;
  return (
    <Footers>
      <Container>
        <Stack
          className="main-upper-container"
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          {/* Left Side */}
          <Stack className="left-side-up">
            <Typography variant="h4" className="left-entitle">
              FreshNest
            </Typography>
            <Typography variant="subtitle1" className="left-topic">
              Fresh Products
            </Typography>
          </Stack>

          {/* Middle Side (Search Box) */}
          <Stack className="middle-side-up" width={{ xs: "100%", md: "50%" }}>
            <Box className="search-box-main" display="flex" alignItems="center">
              <FooterInput placeholder="Enter your email" />
              <Button className="search-icon">Subscribe </Button>
            </Box>
          </Stack>

          {/* Right Side (Icons) */}
          <Stack
            className="right-side-up"
            direction="row"
            justifyContent="center"
          >
            <a
              href="https://youtu.be/eDqm9H1-YiE?si=rtRoEuKm_ZqICOu2"
              className="icon"
            >
              <TwitterIcon />
            </a>

            <a
              href="https://youtu.be/ASqHa-hgzVY?si=XYVMacja98nkqMrg"
              className="icon"
            >
              <FacebookIcon />
            </a>

            <a
              href="https://youtu.be/Cmm-itIRPU8?si=by1EFWV2b04sbwyD"
              className="icon"
            >
              <YouTubeIcon />
            </a>

            <a
              href="https://youtu.be/ANsQzuBNqE8?si=9ReSJ_iraNXY7wPg"
              className="icon"
            >
              <LinkedInIcon />
            </a>
          </Stack>
        </Stack>

        {/* Divider Line */}
        <Box className="hover-linesss" borderBottom="1px solid #ffb514" />

        {/* Main Content */}
        <Stack
          className="middle-main-container"
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          mt={4}
          spacing={4}
        >
          {/* Section 1 */}
          <Stack className="left-side1 same">
            <Typography variant="h1">Why People Like Us!</Typography>
            <Typography variant="h2" className="left-words">
              Our seamless online ordering process, fast delivery, and
              eco-friendly packaging make it convenient and environmentally
              responsible to enjoy fresh produce.
            </Typography>
            <Button className="down-button">Read More</Button>
          </Stack>

          {/* Section 2 */}
          <Stack className="left-side2 same color-hover">
            <Link to="/help" className="ssss">
              <Typography variant="h1">Shop Info</Typography>
            </Link>
            <Link to="/help" className="ssss">
              <Typography variant="h2">About Us</Typography>
            </Link>
            <Link to="/help" className="ssss">
              <Typography variant="h2">Contact Us</Typography>
            </Link>
            <Link to="/help" className="ssss">
              <Typography variant="h2">Privacy Policy</Typography>
            </Link>
            <Link to="/help" className="ssss">
              <Typography variant="h2">Terms & Condition</Typography>
            </Link>
            <Link to="/help" className="ssss">
              <Typography variant="h2">Return Policy</Typography>
            </Link>
          </Stack>

          <Stack className="right-side1 color-hover same">
            <Link to="/member-page" className="ssss">
              <Typography variant="h1">Account</Typography>
            </Link>

            <Link to="/member-page" className="ssss">
              <Typography variant="h2">My Account</Typography>
            </Link>

            <Link to="/product-detail" className="ssss">
              <Typography variant="h2">Product details</Typography>
            </Link>

            <Link to="/orders" className="ssss">
              <Typography variant="h2">Shopping Cart</Typography>
            </Link>

            <Link to="/orders" className="ssss">
              <Typography variant="h2">WishList</Typography>
            </Link>

            <Link to="/orders" className="ssss">
              <Typography variant="h2">Order History</Typography>
            </Link>
          </Stack>

          {/* Section 4 */}
          <Stack className="right-side2 same">
            <Link to="/help" className="ssss">
              <Typography variant="h1">Contact</Typography>
            </Link>
            <Typography variant="h2">
              Address: 1429 Netus Rd, NY 48247
            </Typography>
            <Typography variant="h2">
              Email: abdullah.just777@gmail.com
            </Typography>
            <Typography variant="h2">Phone: +82 10 7555 1575</Typography>
            <Typography variant="h2">Payment Accepted</Typography>
            <Box display="flex" gap={2} mt={4}>
              <img src="/icons/visa-card.svg" alt="Visa" />
              <img src="/icons/western-card.svg" alt="Western Union" />
              <img src="/icons/master-card.svg" alt="MasterCard" />
              <img src="/icons/paypal-card.svg" alt="PayPal" />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Footers>
  );
}
