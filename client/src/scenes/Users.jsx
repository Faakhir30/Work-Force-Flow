import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "../components/DataGridCustomToolbar";
import Header from "../components/Header";
import { useAllusersApiQuery, useProfieApiQuery } from "../redux/Apis/userApi";
import { PersonAdd } from "@mui/icons-material";
import AddUserModal from "./AddUserModal";

const Users = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [openModal, setOpenModal] = React.useState(false);
  const profile = useProfieApiQuery();
  const { data, isLoading } = useAllusersApiQuery();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date Started",
      flex: 1,
    },
    {
      field: "projects",
      headerName: "# of Projects",
      flex: 1,
      renderCell: (params) => params.value.length || 0,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Employee" subtitle={`Entire list of Employees`} />
      {profile?.data?.role === "admin" ? (
        <>
          <AddUserModal
            open={openModal}
            setOpen={setOpenModal}
            company={profile.data.company}
          />
          <Button
            sx={{ color: theme.palette.primary[100] }}
            onClick={() => setOpenModal(true)}
          >
            <PersonAdd />
            Add user
          </Button>
        </>
      ) : (
        <></>
      )}
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.users) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  );
};
export default Users;
