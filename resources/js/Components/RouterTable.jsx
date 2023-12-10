import React, {useEffect, useState} from 'react';
import { getRouters, handleDelete } from '@/Helpers/apiHelper';
import MUIDataTable from 'mui-datatables';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const RouterTable = () => {
    const [routers, setRouters] = useState([]);
  useEffect(() => {
    const fetchRouters = async () => {
        const {routers} = await getRouters();
        //console.log(routers)

        setRouters(routers);
    };
    fetchRouters();
  }, []); 

  const deleteAndFetchRouters = async(id) => {
    try{
       await handleDelete(id);
       console.log(handleDelete(id));
        setRouters(routers);
    }catch(error){
      console.log('error al eliminar', error);
    }
  }
  
  const columns = [
    {name: 'identity', label: 'Identidad'},
    {name: 'ip_address', label: 'IP'},
    {name: 'login', label: 'Usuario'},
    {name: 'password', label: 'Contrasenia'},
    {name: 'acciones',
        options: {
            customBodyRenderLite: (dataIndex, rowIndex) => {
              const id = routers[rowIndex].id;
                return (
                    <div>
                        <IconButton onClick={() => deleteAndFetchRouters(id)}>
                           <DeleteForeverIcon className='delete' /> 
                        </IconButton>
                    </div>
                );
            },
        },
    },
  ];
  const options = {
    selectableRows: 'none',

  }


  return (
    <MUIDataTable 
        title={'Routers'}
        data={routers}
        columns={columns}
        options={options}
    />
  );
};

export default RouterTable;