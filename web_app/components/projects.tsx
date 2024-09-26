import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./projectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Aniket Kumar",
      description: "Leader",
      imgUrl: "https://media.licdn.com/dms/image/v2/D5603AQG6Np7TmZkYKQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1709215161287?e=1732752000&v=beta&t=6mT58Fd-hFr0P-H0MKBRsoCWmgzzuqCuMgvEhkAVz00",
    },
    {
      title: "Pranjal Naman",
      description: "Frontend Developer",
      imgUrl: "https://raw.githubusercontent.com/Kraniket901/Dbugger/refs/heads/main/static/images/pranjal.jpg",
    },
    {
      title: "Prince Tripathi",
      description: "Backend Developer",
      imgUrl: "https://media.licdn.com/dms/image/v2/D5603AQGTZNFHP_7DJQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1708696327687?e=1732752000&v=beta&t=DHfNwygemGntu0Mrh50DCb2A9qCd_wsaDc8YrZlWneI",
    },
    {
      title: "Mohit Doraiburu",
      description: "Machine Learning Developer",
      imgUrl: "https://nitrr-class-locator.netlify.app/assets/img/team/mohit.jpeg",
    },
  ];

  return (
    <section className="project" id="dev">
      <Container>
        <Row>
          <Col sm={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "" : ""}>
                <h2>Upper Moons</h2>
                <p>A dynamic team of innovators pushing the boundaries of technology. We tackle challenges head-on with creativity and precision, striving to build impactful solutions that illuminate the future.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  {/* <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav> */}
                  <Tab.Content className={isVisible ? "" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    {/* <Tab.Pane eventKey="second">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                      <div className="proj-imgbx">
                        <img src="https://i.postimg.cc/MKLWyhdb/IMG-20230422-075421.jpg" alt="Project Image" />
                        <div className="proj-txtx">
                          <h4>Oussama Louati</h4>
                          <span>software Engineer</span>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane> */}
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      {/* <img className="background-image-right" src="https://i.postimg.cc/Gp5qSPks/Untitled-design-3.png" alt=""></img> */}
    </section>
  )
}
