import * as React from 'react';
import { Fade, IconButton, Modal, Button, Box, MenuItem } from '@mui/material';

import { Close } from '@mui/icons-material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

interface Properties {
    color?: "inherit" | "secondary" | "success" | "primary" | "error" | "info" | "warning";
    variant?: "text" | "contained" | "outlined";

    icon: React.ReactElement;
    title: string;
    label?: string;
    small?: boolean;
    menuItem?: boolean;

    children: React.ReactElement;
}

export default function BasicModal(props: Properties) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {props.menuItem ?
                <MenuItem onClick={handleOpen}>
                    &#8288; {props.icon} {props.label}
                </MenuItem>
                :
                <>
                    {props.small ?
                        <IconButton
                            color={props.color || 'primary'}
                            onClick={handleOpen}
                        >
                            {props.icon}
                        </IconButton>
                        :
                        <Button
                            variant={props.variant || 'contained'}
                            color={props.color || 'primary'}
                            onClick={handleOpen}
                            startIcon={props.icon}
                        >
                            <div className='hideOnSmallScreens'>
                                {props.label || ''}
                            </div>
                        </Button>
                    }
                </>
            }

            <Modal open={open} onClose={handleClose}>
                <Fade in={open}>
                    <Box sx={style}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            {props.icon}

                            <b>{props.title}</b>

                            <Close color='primary' className='closeButton' onClick={handleClose} />
                        </div>
                        {props.children}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
