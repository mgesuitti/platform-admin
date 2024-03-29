import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Checkbox,
  ListItemButton,
} from "@mui/material";
import { SERVER_URL } from "../../utils/api";
import AuthContext from "../../context/auth-context";
import { TenantResponseDTO } from "../../models/tenantResponse.DTO";
import classes from "./CompanySelector.module.css";

const CompanySelector: React.FC<{
  onClose: (checked: string[]) => void,
  checked: string[]
}> = (props) => {
  const handleClose = () => {
    props.onClose(checked);
  };

  const authCtx = useContext(AuthContext);

  const [checked, setChecked] = useState<string[]>(props.checked);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.findIndex((v) => v === value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const tenantsList = authCtx.tenants?.map((tenant: TenantResponseDTO) => {
    const imgUrl = `${SERVER_URL}/image${tenant.image}.jpg?pixelsSize=96`;
    const labelId = `checkbox-list-secondary-label-${tenant.token}`;
    return (
      <ListItem
        alignItems="flex-start"
        key={tenant.token}
        className={classes.item}
        secondaryAction={
          <Checkbox
            edge="end"
            onChange={handleToggle(tenant.token)}
            checked={checked.indexOf(tenant.token) !== -1}
            inputProps={{ "aria-labelledby": labelId }}
          />
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt="Logo" src={imgUrl} />
          </ListItemAvatar>
          <ListItemText id={labelId} primary={tenant.name} secondary={null} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Select company</DialogTitle>
        <DialogContent>
          {/* TODO: Name Filter */}
          {/* TODO: Show selected companies only */}
          <List
            dense
            sx={{ width: "100%", minWidth: 400, maxWidth: 600, bgcolor: "background.paper" }}
          >
            {tenantsList}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompanySelector;
