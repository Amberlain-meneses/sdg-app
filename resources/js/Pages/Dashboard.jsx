import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';





export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user = {auth.user} >
            <Head title="Dashboard" />
            <div>Soy Dashboard</div>
        </AuthenticatedLayout>
       
        

    );
}
