import style from "../style";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import useMobile from "../layout/Responsive";

function HouseholdPolicyOptions(props) {
  const { countryId } = props;
  const navigate = useNavigate();
  const mobile = useMobile();

  const boxWidth = mobile ? 250 : 300;

  return (
    <div style={{ 
      paddingTop: 20, 
      display: "flex",
      overflowX: "scroll",
      paddingLeft: mobile && 50,
      paddingRight: mobile && 50,
    }}>
      <motion.div
        style={{
          minWidth: boxWidth,
          maxWidth: boxWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          padding: 20,
          marginRight: 20,
          cursor: "pointer",
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate(`/${countryId}/household`)}
      >
        <h2>Compute my household income</h2>
        <p>
          Use PolicyEngine to calculate your taxes and benefits, and explore how
          they'd change under different scenarios and policies.
        </p>
      </motion.div>
      <motion.div
        style={{
          minWidth: boxWidth,
          maxWidth: boxWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          padding: 20,
          cursor: "pointer",
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate(`/${countryId}/policy`)}
      >
        <h2>Compute the impact of policy reforms</h2>
        <p>
          Use PolicyEngine to calculate your taxes and benefits, and explore how
          they'd change under different scenarios and policies.
        </p>
      </motion.div>
    </div>
  );
}

function WidePanelHalf(props) {
  const { direction, children } = props;
  return (
    <motion.div
      style={{
        padding: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
        width: "100%",
        height: "100%",
      }}
      initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}

function WidePanel(props) {
  const { left, right, direction, backgroundColor } = props;
  const mobile = useMobile();

  if (mobile) {
    return (
      <div
        style={{
          backgroundColor: backgroundColor,
          height: !mobile && 600,
          marginTop: 50,
        }}
      >
        <Container style={{ paddingTop: 100, paddingBottom: 100 }}>
          <WidePanelHalf direction={direction}>{left}</WidePanelHalf>
          <WidePanelHalf direction={direction}>{right}</WidePanelHalf>
        </Container>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        height: !mobile && 600,
        marginTop: 50,
      }}
    >
      <Container style={{ paddingTop: 100, paddingBottom: 100 }}>
        <Row>
          <Col>
            <WidePanelHalf direction={direction}>{left}</WidePanelHalf>
          </Col>
          <Col>
            <WidePanelHalf direction={direction}>{right}</WidePanelHalf>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function HomePage(props) {
  const { countryId } = props;
  const mobile = useMobile();
  // Items are centered horizontally, and placed in order vertically.
  return (
    <>
      <div
        style={{
          ...(!mobile ? {
              paddingLeft: 50,
            paddingRight: 100,
            paddingTop: 70,
          } : {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 50,
          }),
          display: "flex",
          flexDirection: "column",
          alignItems: !mobile && "center",
        }}
      >
        <div style={{
          paddingRight: mobile && 50,
          paddingLeft: mobile && 50,
        }}>
          <h1>We compute the impact of public policy.</h1>
          <h4>PolicyEngine's free, open-source software turns law into code.</h4>
        </div>
        <HouseholdPolicyOptions countryId={countryId} />
      </div>
      <WidePanel
        direction="left"
        backgroundColor={style.colors.LIGHT_GRAY}
        left={
          <>
            <h1 style={{ paddingBottom: 30 }}>
              Simulate the full tax-benefit system on any household
            </h1>
            <h5>
              Our free and open-source models describe a country's tax and
              benefit laws. Describe a household's characteristics and instantly
              compute their taxes, benefits, marginal tax rates and more.
            </h5>
          </>
        }
      />
      <WidePanel
        direction="right"
        backgroundColor={style.colors.WHITE}
        right={
          <>
            <h1 style={{ paddingBottom: 30 }}>Design custom policy reforms</h1>
            <h5>
              Our free and open-source models describe a country's tax and
              benefit laws. Describe a household's characteristics and instantly
              compute their taxes, benefits, marginal tax rates and more.
            </h5>
          </>
        }
      />
      <WidePanel
        direction="left"
        backgroundColor={style.colors.LIGHT_GRAY}
        left={
          <>
            <h1 style={{ paddingBottom: 30 }}>
              See how reforms affect households
            </h1>
            <h5>
              Our free and open-source models describe a country's tax and
              benefit laws. Describe a household's characteristics and instantly
              compute their taxes, benefits, marginal tax rates and more.
            </h5>
          </>
        }
      />
    </>
  );
}
