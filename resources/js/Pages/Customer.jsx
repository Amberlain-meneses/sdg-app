import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import RouterTable from '@/Components/RouterTable';
import AddCustomerButton from '@/Components/AddCustomerButton';


export default function Customer({auth}){

    return (
      <AuthenticatedLayout user={auth.user}>
        <Head title='Custumer' / >
          <AddCustomerButton/>
          <RouterTable />
      </AuthenticatedLayout>
    );
}