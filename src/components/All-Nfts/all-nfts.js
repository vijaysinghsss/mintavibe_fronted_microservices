import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import { AllNFTSLIST } from "../../constant/all-nfts";

export default function Nfts() {
  const { Category } = useSelector((state) => state.Slider);

  const [selecedItem, setselecedItem] = useState([]);

  const handleChange = (item) => (e) => {
    e.preventDefault();
    console.log(item);
  };

  return (
    <Accordion defaultActiveKey={0} flush>
      <div className="clear-div-button">
        <a href="#">
          {" "}
          <div className="appy-button">Clear All</div>
        </a>
      </div>
      {Array.isArray(Category) && Category.length > 0 && (
        <Accordion.Item eventKey="0">
          <Accordion.Header className="pagenav">
            <h4>
              <a href="!#" onClick={(e) => e.preventDefault()}>
                <span>
                  <img src="/images/Category-iocn.svg" alt="" />
                </span>
                Category
              </a>
            </h4>
          </Accordion.Header>
          <Accordion.Body className="answercount">
            <ul>
              {Category.map((item, index) => (
                <li
                  className={`page_item current_page_item ${selecedItem.includes(item._id) ? "active-item" : ""
                    }`}
                  key={index}
                  onClick={handleChange(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item.Categoryname}
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      )}
    </Accordion>
  );
}
