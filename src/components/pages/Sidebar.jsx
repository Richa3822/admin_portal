
import { Link, Outlet } from 'react-router-dom';
import List from '../atoms/List';
import Topbar from '../molecules/Topbar';

const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem("userData"))

    return (
        <>
            <Topbar />
            <div className='d-flex justify-content-between align-items-center'>
                <div className="bg-dark sidebar-left" id="sidebar-left"  >
                    <Link to='/'><List name='Dashboard' /></Link>
                    {
                        user.role === "admin"
                            ?
                            <Link to='/add-user-seller'><List name='Add Sellers/User' /></Link>
                            :
                            null
                    }
                    <Link to='/add-product'><List name='Add Products' /></Link>
                    <Link to='/view-products'><List name='View Products' /></Link>
                    <Link to='/view-orders'><List name='View Orders' /></Link>
                    <Link to='/add-offers'><List name='Add offers'/></Link>

                    {
                        user.role === "admin"
                            ?
                            <>
                                <Link to='/view-users'><List name='View Users' /></Link>
                                <Link to='/view-sellers'><List name='View Sellers' /></Link>
                            </>
                            :
                            null
                    }
                </div>
                <div className='container-fluid pt-3 main-right'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Sidebar