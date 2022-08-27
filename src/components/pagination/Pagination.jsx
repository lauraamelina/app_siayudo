import React, {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";

function Pagination  ({ postsPerPage, totalPosts, paginate })  {
    const {user} = useContext(AuthContext);
    const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex">
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)}  className={user.type === 1 ? 'celeste page-link' : 'violeta page-link'}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;