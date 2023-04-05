import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'reactstrap';
import { LIMIT, WAITING_TIMING } from '../../constants/Constant';
import { getData } from '../../services/Api';
import Loader from '../atoms/Loader';
import UserSellerTableDesign from '../atoms/UserSellerTableDesign'
import Pagination from '../molecules/Pagination';

function ViewSellers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  let timer = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getFilteredData = () => {

      // --> api call using concept of debouncing

      setIsLoad(true)

      timer.current = setTimeout(async () => {
        try {
          const response = await getData(`user/?role=seller&page=${page}&limit=${LIMIT}&search=${search}`)
          console.log("users = ", response)
          if (response.status) {
            setData(response.users.filteredUsers);
            setTotalCount(response.users.count);
          }
          setIsLoad(false)
        } catch (error) {
          console.log("err = ", error)
          alert("error occur, please reload again")
          setIsLoad(false)
        }
      }, WAITING_TIMING)
    }

    getFilteredData()

  }, [search, page])




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
        <h5 className='ml-5'><strong>View Sellers</strong></h5>
      </div>

      <div className="d-flex flex-row ml-5 flex-wrap" >
        <Input className='input-search' type='text' value={search} name="contact" placeholder="search by contact or emailId" onChange={handleChange} />
      </div>

      <div className='mt-5 ml-5' style={{ minHeight: '620px' }} >
        <div className="mr-5 mb-2">Total Sellers = {totalCount}</div>

        {
          isLoad
            ?
            <Loader />
            :
            <UserSellerTableDesign parentLink="/view-sellers" data={data} page={page - 1} setData={setData} />
        }

      </div>

      <Pagination totalCount={totalCount} page={page - 1} handlePageClick={handlePageClick} />
    </div>
  )
}

export default ViewSellers 