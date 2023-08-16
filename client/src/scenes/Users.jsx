import React, { useState } from "react";
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
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [searchInput, setSearchInput] = useState("");
  const profile = useProfieApiQuery();
  const { data, isLoading } = useAllusersApiQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
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
      <Header title="Employee" subtitle={`Entire list of Emmployees`} />
      {profile?.data?.role === "admin" ? (
        <>
          <AddUserModal
            open={openModal}
            setOpen={setOpenModal}
            company={profile.data.company}
          />
          <Button
            sx={{ color: theme.palette.primary[200] }}
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
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};
export default Users;
