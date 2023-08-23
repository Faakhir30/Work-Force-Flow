import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";

const data = [
  {
    id: "data",
    color: "hsl(42, 70%, 50%)",
    data: [
      {
        x: "12-01",
        y: 1,
      },
      {
        x: "12-02",
        y: 2,
      },
      {
        x: "12-03",
        y: 1,
      },
    ],
  },
];

const OverviewChart = ({}) => {
  const theme = useTheme();

  return (
    <Box height={"70vh"} width={"50vw"}>
      <ResponsiveLine
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
        // tooltip={"sdf"}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: "time", format: "%m-%d", precision: "day" }} // Change xScale to time scale
        yScale={{
          type: "linear", // Use point scale for the y-axis
          min: 0,
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null} // Other props...
        axisBottom={{
          format: "%d/%m", // Format the date for display
          orient: "bottom",
          tickValues: 3,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Days →",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 2, // Use the desired letters here
          format: (v) => ["a", "b", "c"][v],
          legend: "Progress →",
          legendOffset: -30,
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        onClick={() => console.log("object")}
        useMesh={false}
      />{" "}
    </Box>
  );
};
export default OverviewChart;
