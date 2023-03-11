import React from 'react'

const List = ({ name, children }) => {
    return (
        <div>
            <ul className="nav flex-column">
                <li className="nav-item " style={{ listStyle: 'none' }} >
                    <a className="nav-link active text-light" href="#">
                        {children}
                        {name}
                    </a>
                </li>
            </ul>
        </div>
    )
}
export default List