import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import "./calculator.scss";

import getCalculatorSettings from "../../services/calculator-settings";
import getCalculatorItems from "../../services/calculator-item";

export default function Calculator() {
  const [activeStep, setActiveStep] = useState(0);
  const [calSettings, setCalSettings] = useState([]);
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

  const getPromises = async (rawData) => rawData.map(async () => getCalculatorItems("toilet"));

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

    // getCalculatorSettings().then((result) => {
    //   const set = result.data.data.map((k) => k.attributes);
    //   set.forEach(async (c, index) => {
    //     const i = c.calculator_content[0].__component.indexOf(".");
    //     const item = c.calculator_content[0].__component.substring(i + 1);
    //     const itemList = await getCalculatorItems(item);
    //     const items = itemList.data.data.map((t) => t.attributes);
    //     set[index] = {
    //       ...c,
    //       calculator_content: items,
    //     };
    //   });
    //   setCalSettings(set);
    // });
  };

  useEffect(() => {
    fetchCalculatorSettings();
  }, []);

  return (
    <div className="wrapper">
      <Box sx={{ background: "white", borderRadius: "10px" }}>
        <Box sx={{ padding: "20px" }} onClick={() => navigate(-1)}>
          <ArrowBackIcon sx={{ cursor: "pointer" }} />
        </Box>
        <Stepper
          nonLinear
          activeStep={activeStep}
          orientation="vertical"
          sx={{ padding: "0 50px 50px 50px" }}
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
                  {step.calculator_content.map((calItem, i) => (
                    <FormControlLabel
                      key={calItem.item}
                      control={<Checkbox defaultChecked={i === 0} />}
                      label={calItem.item || ""}
                    />
                  ))}
                </FormGroup>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
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
        {activeStep === calSettings.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
}
