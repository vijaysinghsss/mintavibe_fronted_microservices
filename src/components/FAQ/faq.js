import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { FaqPage } from "../../constant/faqpage";

export default function FAQ() {
  return (
    <>
      <section className="innre-bannre">
        <div
          className="about-us-bg"
          style={{
            background: "url('images/faq-bg.png') no-repeat center center",
            backgroundSize: "cover",
          }}
        >
          <h1>FAQs</h1>
        </div>
      </section>
      <div className="container">
        <div className="row">
          {FaqPage.map(({ question, answer }, index) => (
            <Accordion key={index} className="cstFaq">
              <Accordion.Item eventKey="0" className="faq-bg">
                <Accordion.Header>{question}</Accordion.Header>
                <Accordion.Body className="answercount">
                  {answer}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}
