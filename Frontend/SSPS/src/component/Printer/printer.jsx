import React from 'react';
import styled from 'styled-components';
import PrinterTable from './PrinterTable';
import { Link } from "react-router-dom";

export default function PrinterManagement() {
    return (
        <StyledPrinterList>
            <StyledHeader>
                <Title>Danh sách rạp phim</Title>
                <>
                  <Link to={`/printers/add`} className="addbtn">+ Thêm rạp phim  </Link>
                </>
            </StyledHeader>
            <hr />
            <PrinterTable/>
        </StyledPrinterList>
    );
};
  
const StyledPrinterList = styled.section`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px 0px 24px;
`;

const Title = styled.h2`
  color: #242222;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0px;
`;