import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE, CATEGORY } from "../../constants/index";
const Categories = () => {
  const[categories,setCategories] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE}${CATEGORY}`,
    })
      .then((res) => {
          setCategories(() => res.data)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="category">
        {categories.map((value, index) => {
          return (
            <Link to={`/product/${value.key}`}>
              <div className="box " key={index}>
                <a
                  className="f_flex"
                  style={{ width: "100%" }}
                  href="/category"
                >
                  <span>{value.title}</span>
                </a>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default memo(Categories);
