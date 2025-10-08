import React, { useState } from "react";
import ProcessOrderStep1 from "./ProcessOrderStep1";
import ProcessOrderStep2 from "./ProcessOrderStep2";
import ProcessOrderStep3 from "./ProcessOrderStep3";

const ProcessOrderContainer = ({
  setView,
  customer,
  order,
  setShowHelpTip,
  handleProcessOrder,
}) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return (
        <ProcessOrderStep1
          setView={setView}
          customer={customer}
          order={order}
          setShowHelpTip={setShowHelpTip}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <ProcessOrderStep2
          setView={setView}
          order={order}
          customer={customer}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <ProcessOrderStep3
          setView={setView}
          customer={customer}
          order={order}
          handleProcessOrder={handleProcessOrder}
          prevStep={prevStep}
        />
      );
    default:
      return (
        <ProcessOrderStep1
          setView={setView}
          customer={customer}
          order={order}
          setShowHelpTip={setShowHelpTip}
          nextStep={nextStep}
        />
      );
  }
};

export default ProcessOrderContainer;
