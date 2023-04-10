import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
// import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';

const UserDetailsContainer = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      let arr = [];
      const response = await axios.get("https://randomuser.me/api");
      let { data } = response;
      let checkLocal = localStorage.getItem("userData");
      if (checkLocal) {
        let temp = JSON.parse(checkLocal);
        arr = [...temp];
        arr = [...data.results, ...arr];
      } else {
        arr = [...data.results];
      }
      localStorage.setItem("userData", JSON.stringify(arr));

      setData(arr);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    // return () => fetchData();
    fetchData();
  }, []);

  const handleRefresh = () => {
    // Refresh the page
    // window.location.reload();
    fetchData();
  };
  console.log(data, "data");
  return (
    <div>
      <NavbarComponent />
      <div class="container d-grid gap-2 my-2">
        <button class="btn btn-danger" type="button" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
      {/* <button type="button" class="btn btn-danger" onClick={handleRefresh} >Refresh</button> */}
      <div className="container">
        <div className="row">
          {data?.map((user, ind) => (
            <div className="col-12 col-md-6 col-lg-4 my-2">
              <div
                class={`card container border-success rounded ${
                  ind === 0 && "border-info"
                }`}
              >
                <div
                  class="card-header d-flex justify-content-between"
                  key={user.id}
                >
                  <div>
                    <p className="mb-0 text-secondary">User details</p>
                  </div>
                  {ind === 0 && (
                    <div>
                      <p className="mb-0 text-danger">New</p>
                    </div>
                  )}
                </div>
                <div class="card-body">
                  <h5 class="card-title d-flex align-items-center">
                    <p className="text-info">Name :</p>
                    <p className="px-2">
                      {" "}
                      {user.name.title +
                        ` ` +
                        user.name.first +
                        `` +
                        user.name.last}
                    </p>
                  </h5>
                  <p class="card-text d-flex align-items-center">
                    {" "}
                    <p className="text-info">Email :</p> 
                    <p className="px-2">{user.email}</p>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refresh Button */}
    </div>
  );
};

export default UserDetailsContainer;
