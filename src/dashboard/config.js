
import { SvgIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DescriptionIcon from '@mui/icons-material/Description';
import PostAddIcon from '@mui/icons-material/PostAdd';

//

export const items = [
  {
    title: 'Personas',
    path: '/equipos',
    icon: (
      <SvgIcon fontSize="small">
        <PersonIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Productos y Servicios',
    path: '/home',
    icon: (
      <SvgIcon fontSize="small">
        <StorefrontIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Proformas',
    path: '/unit',
    icon: (
      <SvgIcon fontSize="small">
        <DescriptionIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Ordenes de Pedido',
    path: '/config',
    icon: (
      <SvgIcon fontSize="small">
        <PostAddIcon />
      </SvgIcon>
    )
  },
  

];