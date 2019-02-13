import React from 'react'

const ClientCard = (props) => {
    const {timestamps, address, email, selections} = props.dataSet
    const created = new Date(timestamps.created)
    const paid = new Date(timestamps.paid)
    const productTypes = []
    selections.forEach(selection => {
        const { sources } = selection;
        sources.forEach((source, idx) => {
            productTypes.push(<p key={idx}>- {source.type}</p>)
        })
    })
    return(
        <div className="card" >
        <div className="card_header">
            <div>
                <p>Command created: {created.toLocaleString()}</p>
                <p>Paid: {paid.toLocaleString()}</p>
            </div>
            <div className="client_details">
                <p>Client: {`${address.firstname} ${address.lastname}`}</p>
                <p>E-mail: {email}</p>
            </div>
        </div>
            <div>Products Type: {[...productTypes]}</div>
            <br/>
        </div>
    )
}

export default ClientCard