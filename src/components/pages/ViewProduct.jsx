import React, { useEffect, useRef, useState } from 'react'
import { Input, Spinner } from 'reactstrap'
import { LIMIT, WAITING_TIMING } from '../../constants/Constant';
import TableDesign from '../atoms/TableDesign'
import Pagination from '../molecules/Pagination';
import { getData } from '../../services/axios'

const ViewProduct = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    let timer = useRef();

    const [data, setData] = useState([]);

    useEffect(() => {
        const getFilteredData = () => {
            // console.log(contactNumber)

            // --> api call using concept of debouncing
            clearTimeout(timer.current)
            timer.current = setTimeout(async () => {
                console.log(search)

                try {
                    const url = `/product/?search=${search}&page=${page}&limit=${LIMIT}`;

                    const res = await getData({ url })

                    setData(res.products);
                    setTotalProducts(res.count)
                    
                } catch (e) {
                    alert("error occur, please reload again")
                }
            }, WAITING_TIMING)
        }

        getFilteredData()

    }, [search, page])

    const handleChange = (e) => {
        setSearch(e.target.value)
        setData([])
        setPage(1)
    }

    const handlePageClick = (e) => {
        console.log(e)
        setData([])
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
                <TableDesign data={data} setData={setData} />
            </div>

            <Pagination totalCount={totalProducts} handlePageClick={handlePageClick} />
        </div>
    )
}
export default ViewProduct