import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SliderSection = ({ children, title,id ,text ="",}) => {
  
 
    return (
        // <span id={id}>
            <section className={` nft-box-section ${text===id?"pt-5":""} `} id={id}  >
                <Container>
                    <Row>
                        <Col md={12}>
                            <h1>{title}</h1>
                        </Col>
                    </Row>
                    {children}
                </Container>
            </section>
        // </span>
    )
}

export default SliderSection