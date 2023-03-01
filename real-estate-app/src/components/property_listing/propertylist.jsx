import React, { useEffect } from 'react';
import './property.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';


const PropertyList = () => {

    const [search, setSearch] = useState("");
    const [propertyTemplet, setPropertyTemplet] = useState([]);
    const [showimage, setShowImage] = useState(false)

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
            setPropertyTemplet(data.locationcollection);
        }).catch(e => {
            console.log(e);
        })

    }, [])

    const openImage = () => {
        setShowImage(true)
    }


    console.log(propertyTemplet)

    return (
        <>
            <Header />
            <Sidebar />
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
                            <>
                                < div className='data' key={val.generalInfo.propertyInfo.ppdid}>
                                    <div className='item'>{val.generalInfo.propertyInfo.ppdid} </div>
                                    <div className='item' ><i className="fa fa-camera fa-2x" aria-hidden="true"></i></div>
                                    <div className='item'>{val.generalInfo.propertyInfo.basicInfo.property}</div>
                                    <div className='item'>{val.generalInfo.mobile}</div>
                                    <div className='item'>{val.generalInfo.propertyInfo.totalArea}</div>
                                    <div className='item'>02</div>
                                    <div className='item'>sold</div>
                                    <div className='item'>09</div>
                                    <div className='item'>Action</div>
                                </div>
                            </>
                        )
                    })}


                </div>
            </div>
        </>
    )
}

export default PropertyList;


{/* <img src={`http://localhost:8080/api/images/${val.generalInfo.image}`} alt="" /> */ }