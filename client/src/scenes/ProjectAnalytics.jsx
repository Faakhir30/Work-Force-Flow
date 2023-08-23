import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useSingleProjectMutation } from "../redux/Apis/projectApi";

const ProjectAnalytics = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState("");
  const [singleProject] = useSingleProjectMutation();
  useEffect(() => {
    const func = async () => {
      const { data, error } = await singleProject(location.state);
      if (error) navigate("/dashboard");
      setProject(data.project);
    };
    func();
  }, []);
  const data = [];
  let dates=0
  if (project) {
    const tickets = project?.tickets?.map((ticket) => ({
      category: ticket.category,
      createdAt: ticket.createdAt.substring(5, 10),
    }));
    const categories = [...new Set(tickets.map((ticket) => ticket.category))];
    dates = [...new Set(tickets.map((ticket) => ticket.createdAt))]
      .length;

    for (const [index, category] of categories.entries()) {
      let points = [];
      for (const ticket of tickets.filter(
        (ticket) => ticket.category === category
      ))
        points.push({ x: ticket.createdAt, y: index + 1 });
      data.push({ id: category, color: "hsl(42, 70%, 50%)", data: points });
    }
  }
  return (
    <Container>
      <Header
        title={"Project: " + project.title}
        subtitle={"Project Details"}
      />
      <Typography
        variant="h3"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        Timeline
      </Typography>
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
            tickValues: dates,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Days →",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickValues: data.length + 1, // Use the desired letters here
            format: (v) => data[v - 1]?.id,
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={false}
        />
      </Box>
    </Container>
  );
};

export default ProjectAnalytics;
