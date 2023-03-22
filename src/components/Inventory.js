import { Container, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { DEFAULT_COLUMNS } from "../constants";
import {
  fetchData, fetchProperty
} from "../services/InventoryService";
import {
  setInventoryData,
  setInventoryTableData
} from "../store/slices/InventorySlice";
import SearchComponent from "./search";

import { useDispatch, useSelector } from "react-redux";

const createColumns = () => {
  return DEFAULT_COLUMNS.map((col) => ({ id: col, label: col, minWidth: 150 }));
};

const Inventory = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [partNumbers, setPartNumbers] = React.useState([]);
  const [altPartNumbers, setAltPartNumbers] = React.useState([]);

  const [description, setDescription] = React.useState([]);

  const inventoryData = useSelector(({ inventory }) => inventory.tableData);
  

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const getInventoryData = async () => {
      const data = await fetchData();
      console.log(data);
      dispatch(setInventoryData(data));
      dispatch(setInventoryTableData(data));
    };

    getInventoryData();
  }, [dispatch]);

  React.useEffect(() => {
    setPartNumbers(fetchProperty("PN"));
    setAltPartNumbers(fetchProperty("ALT PN"));
    setDescription(fetchProperty("DESCRIPTION"));
  }, [inventoryData]);

  const generateTableRows = () => {
    if (inventoryData && inventoryData.length > 0) {
      return inventoryData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, id) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={id}>
              {cols.map((column) => {
                const value =
                  column.label === "SL.No" ? id + 1 : row[column.id];
                return (
                  <TableCell key={column.id} align="center">
                    {value || "----"}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        });
    } else {
      return (
        <TableRow hover role="checkbox" tabIndex={-1}>
          <TableCell align="center">No Records</TableCell>
        </TableRow>
      );
    }
  };

  const cols = createColumns(inventoryData);
  const rows = generateTableRows();

  return (
    <Container>
      <br></br>
      <Stack direction="column" spacing={4}>
        <Typography component="h1" variant="h4">
          Inventory
        </Typography>
        <SearchComponent
          partNumbers={partNumbers}
          altPartNumbers={altPartNumbers}
          description={description}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <React.Fragment>
            <TableContainer sx={{ maxHeight: 300 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {cols.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>{rows}</TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={inventoryData ? inventoryData.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </React.Fragment>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Inventory;
