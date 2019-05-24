import { Button, Form, Icon, Popover, Progress } from "antd";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import {
  CustomSelect,
  CustomTextInput
} from "../../../../components/fields/formFields";
import { SET_PROJECT_BUDGET } from "../../../../graphql/project/setProjectBudget";

const typeOptions = [
  {
    key: 1,
    value: "money",
    text: "$"
  },
  {
    key: 2,
    value: "time",
    text: "Hours"
  }
];

const BudgetView = (props: any) => {
  const { project, refetchProject } = props;
  // Budget Edit Area
  const [showEditBudget, setShowEditBudget] = useState(false);

  const setBudget = useMutation(SET_PROJECT_BUDGET);
  const handleUpdateBudget = async (values: any) => {
    const { amount, type } = values;

    const updated = await setBudget({
      variables: {
        id: project.id,
        amount,
        type
      }
    });

    if (updated.data.setProjectBudget.success) {
      refetchProject();
      setShowEditBudget(false);
    }
  };
  let budgetFormData = {
    amount: 0,
    type: "time"
  };
  let budgetType = "h";
  if (project.budget) {
    budgetFormData = {
      amount: project.budget.amount,
      type: project.budget.type
    };

    budgetType = project.budget.type === "money" ? "$" : "h";
  }

  return (
    <Popover
      content={
        <Formik
          initialValues={budgetFormData}
          onSubmit={handleUpdateBudget}
          render={(props: any) => (
            <Form onSubmit={props.handleSubmit}>
              <CombinedInputs>
                <CustomTextInput
                  className="amount-field"
                  name="amount"
                  type="number"
                />
                <CustomSelect
                  className="time-field"
                  name="type"
                  options={typeOptions}
                />
              </CombinedInputs>
              <Button type="primary" htmlType="submit">
                Save Budget
              </Button>
            </Form>
          )}
        />
      }
      title={null}
      trigger="click"
      visible={showEditBudget}
      placement="leftTop"
      onVisibleChange={(visible: boolean) => setShowEditBudget(visible)}
    >
      {project.budget ? (
        <div>
          <a>
            {`Budget: 0${budgetType} of ${project.budget.amount}${budgetType}`}
            <a />
          </a>
          <Progress percent={40} strokeColor="green" />
        </div>
      ) : (
        <a className="ant-dropdown-link" href="#">
          Budget <Icon type="caret" />
        </a>
      )}
    </Popover>
  );
};

const CombinedInputs = styled.div`
  display: flex;
  .time-field {
    width: 90px !important;
    margin-left: -4px;
    border-radius: 0;
  }
  .amount-field {
    width: 100px !important;
  }
`;

export default BudgetView;
