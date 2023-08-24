import React from "react";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  ViewDaySharp,
  Inventory,
  LocalActivity,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StatBox from "../components/StatBox";
import Header from "../components/Header";
import FlexBetween from "../components/FlexBetween";
import OverviewChart from "../components/OverviewChart";
import { useProfieApiQuery } from "../redux/Apis/userApi";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data } = useProfieApiQuery();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Box
        mt="20px"
        display="flex"
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        gap="10px"
      >
        <StatBox
          title="Total Active Days"
          value={30}
          increase="+14%"
          description="Since last month"
          icon={
            <ViewDaySharp
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Projects Created"
          value={5}
          increase="+21%"
          description="Since last month"
          icon={
            <Inventory
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Tickets Issued"
          value={data?.tickets?.length || 0}
          increase="+5%"
          description="Since last month"
          icon={
            <LocalActivity
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box mt={"10vh"} height={"30vh"} width={"100%"}>
        <Typography
          variant="h3"
          color={theme.palette.secondary[100]}
          fontWeight="bold"
          sx={{ mb: "5px", mt: 5 }}
        >
          Contributions Graph:
        </Typography>
        <OverviewChart tickets={data?.tickets} />
      </Box>
    </Box>
  );
};

export default Dashboard;
