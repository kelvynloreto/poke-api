import {React } from 'react'

const Pagination = ({postPerPage,totalPost,setCurrentPage}) => {
    
   const pages=[]
for (let i = 1; i <= Math.ceil(totalPost/postPerPage); i++) {
     pages.push(i)   }

if (Math.ceil(totalPost/postPerPage)>1) {

    return (
        <div className='pagination'> 
                    {
                pages.map((page) => {
                    return <button key= {page} onClick={() =>setCurrentPage(page)}> {page} </button>
                })
            }
        </div>
  )
          }
}

export default Pagination