import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../components/Header";
import { useAllProjectsQuery } from "../redux/Apis/projectApi";
import { useNavigate } from "react-router-dom";
import { Add, AddBusinessOutlined } from "@mui/icons-material";
// import { useGetProjectsQuery } from "state/api";

const Project = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const { data, isLoading } = useAllProjectsQuery();
  const navigate = useNavigate();
  if (data) console.log(data);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
const theme=useTheme()
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PROJECTS" subtitle="See your list of Projects." />
      <Button
      sx={{
        color:theme.palette.secondary[100]
      }}
onClick={() => {
  navigate("/projects/create");
        }}
      >
        <Add/>
        Create New Project
      </Button>
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data?.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Project
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Projects;
