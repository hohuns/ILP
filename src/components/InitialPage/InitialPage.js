import { Divider } from "@mui/material";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const InitialPage = (props) => {
  let navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user);

  return (
    <section>
      <Typography variant="p" color="white">
        Internet Logger v2
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginTop: "10px" }} />
      <Grid container style={{ marginTop: "10px" }}></Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="h6" color="white">
          Select Menu to Start.
        </Typography>
        <Typography variant="h6" color="white">
          원하는 기능을 선택하여 시작해보세요.
        </Typography>
      </Grid>
    </section>
  );
};

export default InitialPage;
