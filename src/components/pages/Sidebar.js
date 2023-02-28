
import { Link, Outlet } from 'react-router-dom';
import List from '../../ui/atoms/List';
import './Sidebar.css'
import Topbar from '../../ui/molecules/Topbar';

const Sidebar = () => {
    return (
        <>
            <Topbar />
            <div className='d-flex justify-content-between align-items-center'>
                <div className="bg-light sidebar-left" id="sidebar-left"  >
                    <Link to='/'><List name='Dashboard' /></Link>
                    <Link to='/add-product'><List name='Add Products' /></Link>
                    <Link to='/view-products'><List name='View Products' /></Link>
                    <Link to='/view-orders'><List name='View Orders' /></Link>
                </div>
                <div className='container-fluid pt-3 main-right'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Sidebar