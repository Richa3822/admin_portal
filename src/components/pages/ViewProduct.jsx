import React, { useEffect, useRef, useState } from 'react'
import { Input, Spinner } from 'reactstrap'
import { LIMIT, WAITING_TIMING } from '../../constants/Constant';
import TableDesign from '../atoms/TableDesign'
import Pagination from '../molecules/Pagination';
import { getData } from '../../services/Api'
import Loader from '../atoms/Loader';

const ViewProduct = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [deletedId, setDeletedId] = useState("");
    let timer = useRef();

    const [data, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(true);

    const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {};

    useEffect(() => {
        const getFilteredData = () => {
            clearTimeout(timer.current)
            setIsLoad(true)
            timer.current = setTimeout(async () => {
                try {
                    const url = `product/?isAdminSide=true&search=${search}&page=${page}&limit=${LIMIT}&sellerId=${user?.role === 'seller' ? user?._id : ""}`;

                    const res = await getData(url)

                    console.log("p = ", res)
                    setData(res.products);
                    setTotalProducts(res.count)
                    setIsLoad(false)
                    
                } catch (e) {
                    alert("error occur, please reload again")
                    setIsLoad(false)
                }
            }, WAITING_TIMING)
        }

        getFilteredData()

    }, [search, page, deletedId])

    const handleChange = (e) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const handlePageClick = (e) => {
        setPage(e.selected + 1)
    }

    return (
        <div >
            <div className='mt-5'>
                <h5 className='ml-5'><strong>View products</strong></h5>
            </div>

            <div className="d-flex flex-row ml-5 flex-wrap" >
                <Input className='input-search' type='text' value={search} placeholder="search by name and brand name" onChange={handleChange} />
                {/* <Input className='input-search' type='text' value={search.brand} name="brand" placeholder="search by brand name" onChange={handleChange} />
                <Input className='input-search' type='text' value={search.size} name="size" placeholder="search by size" onChange={handleChange} />
                <Input className='input-search' type='text' value={search.color} name="color" placeholder="search by color" onChange={handleChange} /> */}
            </div>

            <div className='mt-5 ml-5' style={{ minHeight: '620px' }} >
                <div className="mr-5 mb-2">Total Products = {totalProducts}</div>
                {
                    isLoad
                        ?
                        <Loader />
                        :
                        <TableDesign data={data} page={page - 1} setDeletedId={setDeletedId} />
                }
            </div>

            <Pagination totalCount={totalProducts} currentPage={page - 1} handlePageClick={handlePageClick} />
        </div>
    )
}
export default ViewProduct