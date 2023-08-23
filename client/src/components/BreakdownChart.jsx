import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useAllusersApiQuery } from "../redux/Apis/userApi";

const BreakdownChart = ({ isDashboard = false, contribs }) => {
  const { data: userData } = useAllusersApiQuery();
  const theme = useTheme();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getNamefromUserId = (id) => {
      if (!userData) return "";
      let str = userData.users.filter((user) => user._id == id)[0].name;
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const colors = [
      theme.palette.secondary[500],
      theme.palette.secondary[300],
      theme.palette.secondary[300],
      theme.palette.secondary[500],
    ];
    const contribData = [];

    for (const [idx, [userId, count]] of Object.entries(contribs).entries()) {
      const name = getNamefromUserId(userId);
      contribData.push({
        id: name,
        label: name,
        value: count,
        color: colors[idx % colors.length], // Use modulo to cycle colors
      });
    }
    setData(contribData);
  }, []);
  return (
    <Box
      height={"60vh"}
      width={"90%"}
      minHeight={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        valueFormat={(v) => v + " Tickets"}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">Contributions</Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;