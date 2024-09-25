import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./mailchimpform";

export const Foooter = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          {/* <MailchimpForm /> */}
          <Col xs={12} sm={6}>
          <input style={{background:"transparent", border:"none", color:"#e8b11c", fontSize:"30px", fontWeight:600, cursor:"pointer", width:"125px"}} value="Legal👁️"/>
          <input style={{background:"transparent", border:"none", color:"white", fontSize:"35px", fontWeight:600, cursor:"pointer"}} value="AI"/>
          </Col>
          <Col xs={12} sm={6} className="text-center text-sm-end">
            {/* <div className="social-icon">
              <a href="#"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png" alt="Icon" /></a>
              <a href="#"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-512.png" alt="Icon" /></a>
              <a href="#"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter3_colored_svg-512.png" alt="Icon" /></a>
            </div> */}
            <p>Copyright 2024. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
