import React from 'react'

const ClientCard = (props) => {
    const {timestamps, address, email, selections} = props.dataSet
    const created = new Date(timestamps.created)
    const productTypes = []
    selections.forEach(selection => {
        const { sources } = selection;
        sources.forEach((source, idx) => {
            productTypes.push(<p key={idx}>{source.type}</p>)
        })
    })
    return(
        <div className="card" >
            <p>Command created: {created.toLocaleString()}</p>
            <p>Client full name: {`${address.firstname} ${address.lastname}`}</p>
            <p>E-mail: {email}</p>
            <div>Products Type: {[...productTypes]}</div>
            <br/>
        </div>
    )
}

export default ClientCard