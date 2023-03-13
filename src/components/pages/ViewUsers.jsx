import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'reactstrap';
import { WAITING_TIMING } from '../../constants/Constant';
import UserSellerTableDesign from '../atoms/UserSellerTableDesign'
import Pagination from '../molecules/Pagination';

function ViewUsers() {
  const [search, setSearch] = useState("");

  let timer = useRef();
  const [data, setData] = useState([
    {
      _id: "fiuewdfewjfewnewf1",
      firstName: "jay",
      lastName: "patel1234567890jjfkbewkjfewfewnflewnlcnewlknclkewnclkewnclnewlkcnlkenvew",
      contactNumber: "2342312343",
      email: "jay@jay.com",
      role: "admin"
    },
    {
      _id: "fiuewdfewjfewnewf2",
      firstName: "jay",
      lastName: "patel",
      contactNumber: "2342312343",
      email: "jay@jay.com",
      role: "user"
    },
    {
      _id: "fiuewdfewjfewnewf3",
      firstName: "jay",
      lastName: "patel",
      contactNumber: "2342312343",
      email: "jay@jay.com",
      role: "seller",
      address: "sojdijefdewd",
      companyName: "jsaoijfdioefd",
      rating: 4
    },
    {
      _id: "fiuewdfewjfewnewf4",
      firstName: "jay",
      lastName: "patel",
      contactNumber: "2342312343",
      email: "jay@jay.com",
      role: "seller",
      address: "sojdijefdewd",
      companyName: "jsaoijfdioefd",
      rating: 4
    }
  ]);

  useEffect(() => {
    const getFilteredData = () => {
      // console.log(contactNumber)

      // --> api call using concept of debouncing
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        console.log(search)

        console.log("make api call")
      }, WAITING_TIMING)
    }

    getFilteredData()

  }, [search])

  const handleChange = (e) => {
    // console.log(search)
    setSearch(e.target.value)
  }

  const handlePageClick = (e) => {
    console.log(e)
  }

  return (
    <div >
      <div className='mt-5'>
        <h5 className='ml-5'><strong>View Users</strong></h5>
      </div>

      <div className="d-flex flex-row ml-5 flex-wrap" >
        <Input className='input-search' type='text' value={search} name="contact" placeholder="search by contact or email" onChange={handleChange} />
      </div>

      <div className='mt-5 ml-5'>
        <div className="mr-5 mb-2">Total Users = 10</div>
        <UserSellerTableDesign data={data} setData={setData} />
      </div>

      <Pagination totalCount={100} handlePageClick={handlePageClick} />
    </div>
  )
}

export default ViewUsers