import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'reactstrap';
import { LIMIT, WAITING_TIMING } from '../../constants/Constant';
import { getData } from '../../services/Api';
import Loader from '../atoms/Loader';
import UserSellerTableDesign from '../atoms/UserSellerTableDesign'
import Pagination from '../molecules/Pagination';

function ViewUsers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  let timer = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getFilteredData = () => {

      clearTimeout(timer.current)
      setIsLoad(true)

      timer.current = setTimeout(async () => {
        try {
          const response = await getData(`user/?role=user&page=${page}&limit=${LIMIT}&search=${search}`)
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
    console.log(e)
    setPage(e.selected + 1)
  }

  return (
    <div >
      <div className='mt-5'>
        <h5 className='ml-5'><strong>View Users</strong></h5>
      </div>

      <div className="d-flex flex-row ml-5 flex-wrap" >
        <Input className='input-search' type='text' value={search} name="contact" placeholder="search by contact or emailId" onChange={handleChange} />
      </div>

      <div className='mt-5 ml-5' style={{ minHeight: '620px' }} >
        <div className="mr-5 mb-2">Total Users = {totalCount}</div>
        {
          isLoad
            ?
            <Loader />
            :
            <UserSellerTableDesign parentLink="/view-users" data={data} page={page - 1} setData={setData} />
        }
      </div>

      <Pagination totalCount={totalCount} currentPage={page - 1} handlePageClick={handlePageClick} />
    </div>
  )
}

export default ViewUsers