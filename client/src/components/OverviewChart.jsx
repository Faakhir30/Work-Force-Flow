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
const OverviewChart = ({ isDashboard = true, tickets }) => {
  const theme = useTheme();
  const dataa = [
    {
      id: "data",
      color: "hsl(42, 70%, 50%)",
      data: [{x:"8-19", y:0},{x:"8-20", y:2}],
    },
  ];
  if(!tickets) return ("");
  const dates=tickets.map(ticket=>ticket.createdAt.substring(5,10))
  for(const date of [...new Set(dates)]){
    let count=0
    for(const ticket_date of dates)
    if (ticket_date ===date)
    count+=1
    dataa[0].data.push({x: date, y: count})
  }  
 return (
    <ResponsiveLine
      data={dataa}
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
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="stepAfter"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",

        tickSize: dataa[0].data.length,
        tickPadding: 5,
        tickRotation: 0,
        legend:"Days",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend:"Contributions",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
