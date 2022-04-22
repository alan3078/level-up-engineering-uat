import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

import bgLogo from "assets/images/bg-logo.jpeg";

import "./calculator.scss";

import getCalculatorSettings from "../../services/calculator-settings";
import getCalculatorItems from "../../services/calculator-item";

import { priceList } from "./calculator-atom";
import totalPrice from "./calculator-selector";

export default function Calculator() {
  const [activeStep, setActiveStep] = useState(0);
  const [calSettings, setCalSettings] = useState([]);
  const [priceSummary, setPriceSummary] = useRecoilState(priceList);
  const totalDisplayPrice = useRecoilValue(totalPrice);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const getPromises = async (rawData) =>
    rawData.map(async (component) => {
      const i = component.calculator_content[0].__component.indexOf(".");
      const item = component.calculator_content[0].__component.substring(i + 1);
      return getCalculatorItems(item);
    });

  const fetchCalculatorSettings = async () => {
    getCalculatorSettings().then((raw) => {
      const rawData = raw.data?.data.map((k) => k.attributes);
      getPromises(rawData).then((promiseList) => {
        Promise.all(promiseList).then((result) => {
          const itemList = result.map((k) => k.data.data.map((item) => item.attributes));
          for (let i = 0; i < rawData.length; i += 1) {
            rawData[i].calculator_content = itemList[i];
          }
          setCalSettings(rawData);
        });
      });
    });
  };

  const editPriceList = (checked, calItem) => {
    setPriceSummary((currentState) => {
      if (checked) {
        return [...currentState, calItem];
      }
      return currentState.filter((k) => k.item !== calItem.item);
    });
  };

  const isChecked = (calItem) => priceSummary.includes(calItem);

  useEffect(() => {
    fetchCalculatorSettings();
  }, []);

  return (
    <div className="wrapper">
      <Grid
        sx={{
          background: "white",
          borderRadius: "3px",
          padding: "50px",
          display: "flex",
          flexDirection: { xs: "column", md: "column", lg: "row" },
          width: "50vw",
          boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
        }}
      >
        <Grid item md={12} xl={6}>
          <Box onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ cursor: "pointer" }} />
          </Box>
          <Stepper
            nonLinear
            activeStep={activeStep}
            orientation="vertical"
            sx={{ padding: "0 10px 10px 10px" }}
          >
            {calSettings.map((step, index) => (
              <Step key={step.title}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  <StepLabel
                    optional={
                      index === 2 ? <Typography variant="caption">Last step</Typography> : null
                    }
                  >
                    {step.title}
                  </StepLabel>
                </StepButton>
                <StepContent>
                  <FormGroup>
                    {step.calculator_content.map((calItem) => (
                      <FormControlLabel
                        key={calItem.item}
                        control={<Checkbox id={calItem.item} checked={isChecked(calItem)} />}
                        label={calItem.item || ""}
                        onChange={(e) => editPriceList(e.target.checked, calItem)}
                      />
                    ))}
                  </FormGroup>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1, background: "#e9e0cf", color: "black" }}
                      >
                        {index === calSettings.length - 1 ? "完成" : "下一步"}
                      </Button>
                      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                        上一步
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {calSettings.length !== 0 && activeStep === calSettings.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                已完成
                <br /> Cap返張圖Share
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                重設
              </Button>
            </Paper>
          )}
        </Grid>
        <Grid
          item
          md={12}
          xl={6}
          sx={{
            padding: "10px 30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "1rem",
            }}
          >
            <Box
              component="img"
              src={bgLogo}
              alt=""
              maxWidth="3rem"
              borderRadius="0.5rem"
              opacity={0.9}
              mb={2}
            />
            <Box>報價單</Box>
          </Box>

          <div>
            {priceSummary.map((k) => (
              <Box key={k.item} sx={{ display: "flex" }}>
                <div>{k.item}</div>
                <div>{`$${k.price}`}</div>
              </Box>
            ))}
            總價: {`$${totalDisplayPrice}`}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
