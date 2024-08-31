import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

// Custom toolbar with only the export button
const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarExport />
  </GridToolbarContainer>
);

// Updated mock data with Order ID and Status fields
const updatedMockDataContacts = mockDataContacts.map((contact, index) => ({
  ...contact,
  orderId: `ORD-${index + 1001}`, // Assigning order IDs starting from 1001
  status: index % 2 === 0 ? "Delivered" : "Pending", // Alternating statuses
}));

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Sr No.", flex: 0.5 },
    { field: "orderId", headerName: "Order ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 }, // Increased flex value for Address
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="ORDERS"
        subtitle="List of pending and delivered orders"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={updatedMockDataContacts}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
          disableColumnFilter
          disableColumnMenu
          disableDensitySelector
        />
      </Box>
    </Box>
  );
};

export default Contacts;
