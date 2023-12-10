import React, {useState} from "react";
import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


export default function addCustomerButto(){

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose =() => {
        setOpen(false);
    }

    return (
       <div>
            <Button variant="outlined" startIcon={<PersonAddAlt1Icon />} onClick={handleClickOpen}>
                Nuevo Cliente
            </Button>

            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>{"Nuevo Cliente"}</DialogTitle>
                <DialogContent>
                    //Here we can add the form register
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleClickClose}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
       </div>
    )
}