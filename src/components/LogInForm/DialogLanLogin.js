/* eslint-disable react/react-in-jsx-scope */
import { useCallback, useEffect, useState } from "react";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Typography, Box } from "@mui/material";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import "@inovua/reactdatagrid-enterprise/index.css";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/userSlice";

const gridStyle = { minHeight: 120 };

const columns = [
  {
    name: "lan",
    header: "Language",
    defaultFlex: 1,
    type: "string",
  },
  { name: "id", header: "Id", type: "number", defaultVisible: false },
];

const dataSource = [
  { id: 1, lan: "English" },
  { id: 2, lan: "한국어" },
];

// eslint-disable-next-line arrow-body-style
const DialogLanLogin = ({ open, close }) => {
  const [selected, setSelected] = useState({});
  const [selectedObject, setSelectedObject] = useState();
  const dispatch = useDispatch();

  const handleClose = () => {
    close();
  };

  const filtertObject = async () => {
    dataSource
      .filter((d) => d.id === selected)
      .map((d) => setSelectedObject(d));
  };

  const selectHandler = async () => {
    if (!selectedObject) {
      alert("Please Select the language \n언어를 선택해 주세요.");
    } else {
      const lan = selectedObject.lan;
      dispatch(usersActions.updateLanguage(lan));
      localStorage.setItem("lan", lan);
      handleClose();
      alert(
        lan === "한국어"
          ? "언어는 한국어로 설정이 되었습니다."
          : "Default Language is English."
      );
    }
  };

  useEffect(() => {
    filtertObject();
  }, [selected]);

  // eslint-disable-next-line no-shadow
  const onSelectionChange = useCallback(({ selected }) => {
    setSelected(selected);
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        fullWidth={true}
        disableEscapeKeyDown={true}
        onBackdropClick="false"
      >
        <DialogTitle>Language Selection / 언어 선택</DialogTitle>
        <DialogContent>
          <DialogContentText align="left">
            Please Select the Site. / 언어를 선택해 주세요.
            <Box variant="div" sx={{ padding: "20px" }}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <ReactDataGrid
                      idProperty="id"
                      checkboxColumn
                      selected={selected}
                      multiSelect={false}
                      onSelectionChange={onSelectionChange}
                      style={gridStyle}
                      columns={columns}
                      dataSource={dataSource}
                    />
                  </Grid>
                </Grid>
              </form>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={selectHandler}>Select</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogLanLogin;
