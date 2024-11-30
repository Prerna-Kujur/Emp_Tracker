import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { DeleteEmployeeById } from '../api';
import { notify } from '../utils';

///main component of entiree page

function EmployeeTable({
    employees=[], pagination,
    fetchEmployees, handleUpdateEmployee }) {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions'];
  //  const { currentPage, totalPages } = pagination;
    const { currentPage=1, totalPages=1 } = pagination || {};
     
    useEffect(() => {
        const bootstrap = require('bootstrap');
        const tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.map((tooltipTriggerEl) => {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };
    const handlePagination = (currentPage) => {
        fetchEmployees('', currentPage, 5)
    }

    const handleDeleteEmployee = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");
        if (confirmed) {
        try {
            const { success, message } = await DeleteEmployeeById(id);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            fetchEmployees();
        } catch (err) {
            console.error(err);
            notify('Failed to delete Employee', 'error')
        }
    }
}


    const TableRow = ({ employee }) => {
        return <tr>
            <td>
                <Link to={`/employee/${employee._id}`} className="text-decoration-none">
                    {employee.name}
                </Link>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>
                <i
                    className='bi bi-pencil-fill text-warning me-4'
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Edit"
                    onClick={() => handleUpdateEmployee(employee)}
                ></i>
                <i
                    className='bi bi-trash-fill text-danger'
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete"
                    onClick={() => handleDeleteEmployee(employee._id)}
                ></i>
            </td>
        </tr>
    }
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {
                            headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                       /* employees.length === 0 ? <div> Data Not Found</div>
                            : employees.map((emp) => (
                                <TableRow employee={emp} key={emp._id} />
                            ))*/
                                employees.length === 0 ? (
                                    <tr>
                                        <td colSpan={5}>Data Not Found</td> {/* Use colSpan to span across the table columns */}
                                    </tr>
                                ) : employees.map((emp) => (
                                    <TableRow employee={emp} key={emp._id} />
                                ))
                    }
                </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center my-3">
                <span className="badge bg-primary">Page {currentPage} of {totalPages}</span>
                <div>
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.map(page => (
                        <button
                            key={page}
                            className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePagination(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="btn btn-outline-primary ms-2"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

        </>
    )
}

export default EmployeeTable