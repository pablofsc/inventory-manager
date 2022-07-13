import { useState, ReactElement, MouseEvent } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';

import { KeyboardArrowDown, AddShoppingCart, PersonAdd, Add, Edit } from '@mui/icons-material';

import BasicModal from '../modals/BasicModal';
import NewCustomer from '../forms/NewCustomer';
import NewProduct from '../forms/NewProduct';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': { padding: '4px 0' },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

interface Properties {
    text: String;
    prepend: String;
    isEdit: boolean;
}

export default function Dropdown(props: Properties): ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div>
            <Button
                variant='contained'
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
                startIcon={props.isEdit ? <Edit /> : <Add />}
            >
                <div className='hideOnSmallScreens'>{props.text}</div>
            </Button>

            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <BasicModal
                    icon={<PersonAdd />}
                    label='Cliente'
                    title='CADASTRAR CLIENTE'
                    menuItem
                >
                    <NewCustomer />
                </BasicModal>

                <BasicModal
                    icon={<AddShoppingCart />}
                    label='Produto'
                    title='CADASTRAR NOVO PRODUTO'
                    menuItem
                >
                    <NewProduct />
                </BasicModal>
            </StyledMenu>
        </div>
    );
}
