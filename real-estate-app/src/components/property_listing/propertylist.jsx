import React, { useEffect } from 'react';
import './property.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const PropertyList = () => {

    const [search, setSearch] = useState("");
    const [propertyTemplet, setPropertyTemplet] = useState([]);
    const PPDID = Date.now();


    useEffect(() => {
        fetch("http://localhost:8080/api/alldata", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setPropertyTemplet(data)

        }).catch(e => {
            console.log(e);
        })

    }, [])
    console.log(propertyTemplet)

    return (
        <>
            <div className='Search'>
                <div className='Search_input'>
                    <input type="text" placeholder='Search PPD ID' id="searchInput" onChange={(event) => {
                        setSearch(event.target.value);
                    }} />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </div>

                <div className='Add_property'>
                    <Link to="/basicinfo"><button> +Add Property</button></Link>
                </div>

            </div>
            <div>
                <div className='attributes'>
                    <div className='name'>PPD ID </div>
                    <div className='name'>Image</div>
                    <div className='name'>Property</div>
                    <div className='name'>Contact</div>
                    <div className='name'>Area</div>
                    <div className='name'>Views</div>
                    <div className='name'>Status</div>
                    <div className='name'>Days Left</div>
                    <div className='name'>Action</div>
                </div>

                <div>
                    {propertyTemplet.map((val, index) => {
                        return (
                            < div className='data' key={`${PPDID}${index}`}>
                                <div className='item'>{PPDID} </div>
                                <div className='item'><i className="fa fa-camera fa-2x" aria-hidden="true"></i></div>
                                <div className='item'>{ }</div>
                                <div className='item'>988754322</div>
                                <div className='item'>1200</div>
                                <div className='item'>02</div>
                                <div className='item'>sold</div>
                                <div className='item'>09</div>
                                <div className='item'>Action</div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </>
    )
}

// export default PropertyList;
