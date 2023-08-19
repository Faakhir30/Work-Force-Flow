import React from "react";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../components/Header";
import { useAllProjectsQuery } from "../redux/Apis/projectApi";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useProfieApiQuery } from "../redux/Apis/userApi";
// import { useGetProjectsQuery } from "state/api";
import Project from "../components/ProjectCard";
const Projects = () => {
  const { data, isLoading } = useAllProjectsQuery();
  const navigate = useNavigate();
  const { data: profileData } = useProfieApiQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PROJECTS" subtitle="See your list of Projects." />
      {["admin", "dev"].includes(profileData?.role) && (
        <Button
          sx={{
            color: theme.palette.secondary[100],
          }}
          onClick={() => {
            navigate("/projects/create");
          }}
        >
          <Add />
          Create New Project
        </Button>
      )}
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data?.map((project) => (
            <Project key={project._id} project={project} />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Projects;
