import React from 'react';
import { CDBModalFooter , CDBBtn, CDBIcon , CDBBox } from 'cdbreact';

export default function Footer() {
  return (
    <CDBModalFooter>
      <CDBBox
        display="flex"
        alignItems="center"
        className="mx-auto py-2 flex-wrap"
        style={{justifyContent:'space-between' , width: '100%' , flexWrap:'wrap',gap:'3em' , padding:'0 1rem 0 1rem'}}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 text-dark">
            <span className="ms h5 mb-0 font-weight-bold">ShareWithMe</span>
          </a>
          <small className="ms-2">&copy; ShareWithMe, 2023. All rights reserved.</small>
        </CDBBox>
        <CDBBox style={{display:"flex" , flexWrap:'wrap'}}>
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </CDBModalFooter>
  );
};