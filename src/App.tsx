import React from "react";

import { Typography, Flex, Button, Carousel, Card, Col, Row }
  from
  "antd"
  ;


const { Title } = Typography;


const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

const textStyle: React.CSSProperties = {
  color: '#fff',
}
function App() {
  return (

    <>
      {/* navbar */}

      <nav className="container mx-auto flex flex-row  bg-blue-200 ">
        <div className="flex-grow p-3 bg-red-900">
          <Title level={4} style={textStyle}>Calc</Title>
        </div>
        <div className="flex p-3 bg-blue-900">
          <ul className="flex flex-row gap-10">
            <li>Home</li>
            <li>Calculator</li>
            <li>BMI Calculator</li>
            <li>Income Calculator</li>
            <li>About</li>
          </ul>
        </div>
      </nav >


      <main className="container mx-auto bg-blue-200">
        <section id="hero">
          <Flex gap="middle">
            <Flex gap="middle" className="py-20 pl-5 bg-red-500" vertical >
              <div>
                <Title style={textStyle}>Simplify Your Calculations</Title>
                <Title level={5} style={textStyle}>Experience the ultimate convenience with our all-in-one calculator app. From basic arithmetic to BMI and income calculations, Calc has you covered. Start optimizing your time and decisions today!</Title>
                <Button type="primary" >Primary Button</Button>
              </div>
            </Flex>
            <Flex className="bg-yellow-200">
              <Title level={5} style={textStyle}>Experience the ultimate convenience with our all-in-one calculator app. From basic arithmetic to BMI and income calculations, Calc has you covered. Start optimizing your time and decisions today!</Title>

              <img src="" alt="" />
            </Flex>
          </Flex>
        </section>


        <section id="corousel">
          <div>
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </div>

        </section>


        <section id="about">
          <Flex className="flex flex-col gap-5 p-10">
            <Title style={textStyle}>Guidelines For Calc APP</Title>
            <Title level={5} style={textStyle}>Calc is your go-to tool for all your calculation needs. Whether you're crunching numbers, calculating your Body Mass Index (BMI), or figuring out your income, Calc offers an intuitive and efficient experience. Designed with simplicity in mind, our app ensures accurate results, helping you make informed decisions with ease. Discover how Calc can simplify your day-to-day tasks</Title>
          </Flex>
        </section>


        <section id="features" className="mt-10 px-10">
          <Flex vertical>
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false} style={textStyle} className="bg-[#0694F4]">
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={textStyle} className="bg-[#06D99C]">
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={textStyle} className="bg-[#F5B901]">
                  Card content
                </Card>
              </Col>
            </Row>


          </Flex>

        </section>



      </main>

    </>
  );
}

export default App;
