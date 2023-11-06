
import { SvgIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DescriptionIcon from '@mui/icons-material/Description';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from '@mui/icons-material/Settings';
//

export const items = [
  {
    title: 'Personas',
    path: 'personas',
    icon: (
      <SvgIcon fontSize="small">
        <PersonIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Productos y Servicios',
    path: 'productos',
    icon: (
      <SvgIcon fontSize="small">
        <StorefrontIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Proformas',
    path: 'proformas',
    icon: (
      <SvgIcon fontSize="small">
        <DescriptionIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Ordenes de Pedido',
    path: 'ordenes',
    icon: (
      <SvgIcon fontSize="small">
        <PostAddIcon />
      </SvgIcon>
    )
  },{
    title: 'Configuraciones',
    path: 'configuraciones',
    icon: (
      <SvgIcon fontSize="small">
        <SettingsIcon />
      </SvgIcon>
    )
  }
  

];