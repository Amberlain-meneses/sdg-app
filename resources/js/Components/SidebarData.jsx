import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const SidebarData = [
  
        {
            title: "Dashboard",
            icon: <DashboardIcon/>,
            link: "dashboard",
            active:'dashboard'
        },

        {
            title: "Clientes",
            icon: <PeopleIcon/>,
            link: "customer",
            active: 'customer'
        },
        {
            title: "Cobrar",
            icon: <AttachMoneyIcon/>,
            link: "pay",
            active: "pay"
        },
        {
            title: "Reportes",
            icon: <PictureAsPdfIcon/>,
            link: "report",
            active: "report"
        }
]