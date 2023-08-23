import { useTheme } from "@emotion/react";
import FlexBetween from "../components/FlexBetween";
import { useAllusersApiQuery } from "../redux/Apis/userApi";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Circle, Launch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Project = ({ project }) => {
  const theme = useTheme();
  const navigate = useNavigate()
  const { data } = useAllusersApiQuery();
  const getNamefromUserId = (id) => {
    if (!data) return "";
    let str = data.users.filter((user) => user._id == id)[0].name;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <FlexBetween>
          <Typography
            sx={{ fontSize: 20, fontWeight: "bold" }}
            color={theme.palette.secondary[400]}
            gutterBottom
          >
            {project.title.toUpperCase()}
          </Typography>
          <Tooltip
            sx={{
              color:
                project.status == "pending"
                  ? "#ddcc02"
                  : project.status == "active"
                  ? "lightgreen"
                  : theme.palette.background.default,
            }}
            title={project.status}
          >
            <IconButton>
              <Circle />
            </IconButton>
          </Tooltip>
        </FlexBetween>
        <Typography variant="h5" component="div">
          {getNamefromUserId(project.team[0])} <sub>Team Lead</sub>
        </Typography>
        <Typography mt={2} variant="body2">
          Team:{" "}
          {project.team
            .slice(0, project.team.length - 1)
            .map((id) => `${getNamefromUserId(id)}, `)}
          {getNamefromUserId(project.team[project.team.length - 1])}
        </Typography>
        <FlexBetween>
          <Typography>{project.createdAt.slice(0, 10)}</Typography>
          <Button onClick={()=>navigate(`project/${project._id}`, {state:project._id})} sx={{ color: theme.palette.primary[100] }}>
            View Analytics
            <Launch />
          </Button>
        </FlexBetween>
      </CardContent>
    </Card>
  );
};
export default Project;
