"use client";
import React, { useState } from "react";
import ConditionForm1 from "./_components/condition-form-1";
import ConditionForm2 from "./_components/condition-form-2";
import ConditionForm3 from "./_components/condition-form-3";
import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ConditionForm4 from "./_components/condition-form-4";
import Result from "./_components/result";

export default function Page() {
  // State to track current step
  const [step, setStep] = useState(1);

  // Function to go to next step
  const goToNextStep = () => setStep(step + 1);

  // Function to go to previous step
  const goToPreviousStep = () => setStep(step - 1);

  return (
    <div className="flex items-center justify-center pt-20 ">
      <div className="">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-green-500">Condition 1</BreadcrumbLink>
            </BreadcrumbItem>
            {step > 1 && (
              <>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink  className="text-green-500">Condition 2</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {step > 2 && (
              <>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-green-500">Condition 3</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
            {step > 3 && (
              <>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-green-500">Condition 4</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
            {step > 4 && (
              <>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-green-500">Result</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Conditionally render forms based on the current step */}
        {step === 1 && <ConditionForm1 onNext={goToNextStep} />}
        {step === 2 && (
          <ConditionForm2 onPrev={goToPreviousStep} onNext={goToNextStep} />
        )}
        {step === 3 && (
          <ConditionForm3 onPrev={goToPreviousStep} onNext={goToNextStep} />
        )}
        {step == 4 && (
          <ConditionForm4 onPrev={goToPreviousStep} onNext={goToNextStep} />
        )}
        {step > 4 && (
          <Result
            projectName="Demo result title"
            analysisType="Sample Analysis"
            costEstimate={1000000}
           budgetUtilization={0.75}
            additionalNotes="demo : lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quas. " 
          />
        )}
      </div>
    </div>
  );
}
