import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import { AspectRatio, Typography, CssVarsProvider } from "@mui/joy";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

const topUsersRetriever = createSelector(retrieveTopUsers, (activeUsers) => ({
  activeUsers,
}));

export default function ActiveUsers() {
  const { activeUsers } = useSelector(topUsersRetriever);

  return (
    <CssVarsProvider>
      <div className="active-users-frame">
        <Container>
          <Stack data-aos="fade-up" className="main">
            <Box className="category-title">Active Users</Box>

            {activeUsers && activeUsers.length > 0 ? (
              activeUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`;
                return (
                  <Stack className="cards-frame" key={member._id}>
                    <Card className="card">
                      <CardOverflow>
                        <AspectRatio ratio={1}>
                          <img src={imagePath} alt={`${member.memberNick}`} />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow className="member-nickname">
                        <Box>
                          <Typography>{member.memberNick}</Typography>
                        </Box>
                      </CardOverflow>
                    </Card>
                  </Stack>
                );
              })
            ) : (
              <Box className="notdata">No Active Users!</Box>
            )}
          </Stack>
        </Container>
      </div>
    </CssVarsProvider>
  );
}
