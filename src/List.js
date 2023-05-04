import Button from 'react-bootstrap/Button';
import React from "react"
import Table from "react-bootstrap/Table"

const List = ({ data, handleEdit, handleDelete }) => {
    return (
        <tbody>
            {data.map((contact) => {
                return(
                    <tr>
                        <td>{contact.name}</td>
                        <td>{contact.telp}</td>
                        <td className="d-flex align-items-center gap-2">
                            <Button size="sm" variant="warning" onClick={() => handleEdit(contact.id)}>Edit</Button>
                            <Button size="sm" variant="danger" onClick={() => handleDelete(contact.id)}><i class="ri-delete-bin-line"></i></Button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default List