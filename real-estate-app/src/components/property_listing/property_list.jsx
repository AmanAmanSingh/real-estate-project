import React, { useEffect } from 'react';
import './property.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';


const PropertyList = () => {

    const [search, setSearch] = useState("");
    const [basicCollectionTemplet, setBasicCollectionTemplet] = useState([]);
    const [genralCollectionTemplet, setGeneralCollectionTemplet] = useState([]);
    const [propertyCollectionTemplet, setPropertyCollectionTemplet] = useState([]);
    const [locationCollectionTemplet, setLocationCollectionTemplet] = useState([]);
    const [ppdid, setPpdid] = useState("")


    useEffect(() => {
        fetch("http://localhost:8080/api/alldata", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data, "data");
            setBasicCollectionTemplet(data.basicscollection);
            setGeneralCollectionTemplet(data.generalcollection);
            setPropertyCollectionTemplet(data.propertycollection);
            setLocationCollectionTemplet(data.locationcollection);
            setPpdid(Date.now());
        }).catch(e => {
            console.log(e);
        })

    }, []);

    console.log(basicCollectionTemplet, "basic")
    console.log(genralCollectionTemplet, "general");
    console.log(propertyCollectionTemplet, "property");
    console.log(locationCollectionTemplet, "location")



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
                    <div className='name'>Property</div>
                    <div className='name'>Image</div>
                    <div className='name'>Contact</div>
                    <div className='name'>Area</div>
                    <div className='name'>Views</div>
                    <div className='name'>Status</div>
                    <div className='name'>Days Left</div>
                    <div className='name'>Action</div>
                </div>

                {/* <div className="map-container" >
                    <div>
                        {basicCollectionTemplet.map((val, index) => {
                            return (
                                <>
                                    <span key={`${index}`}>
                                        <div className='item'> {ppdid} </div>
                                        <div className='item'>{val.property}</div>
                                    </span>
                                </>
                            )
                        }
                        )}

                    </div>
                    <div>
                        {genralCollectionTemplet.map((val, index) => {
                            return (
                                <>
                                    <span key={`${index}`}>
                                        <div className='item'><i className="fa fa-camera fa-2x" aria-hidden="true"></i></div>
                                        <div className='item'>{val.mobile}</div>
                                    </span>
                                </>
                            )
                        })
                        }
                    </div>
                    <div>
                        {propertyCollectionTemplet.map((val, index) => {
                            return (
                                <>
                                    <span key={`${index}`}>
                                        <div className='item'>{val.totalArea}</div>
                                        <div className='item'>02</div>
                                        <div className='item'>sold</div>
                                        <div className='item'>09</div>
                                        <div className='item'>Action</div>
                                    </span>
                                </>
                            )
                        })}
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default PropertyList;
