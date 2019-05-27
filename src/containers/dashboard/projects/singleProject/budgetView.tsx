import { Button, Form, Icon, Popover, Progress } from "antd";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { ProjectContext } from ".";
import {
  CustomSelect,
  CustomTextInput
} from "../../../../components/fields/formFields";
import { GET_PROJECT_BUDGET } from "../../../../graphql/project/getProjectBudget";
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
  const { project } = useContext(ProjectContext);

  const getBudget = useQuery(GET_PROJECT_BUDGET, {
    variables: {
      id: project.id
    }
  });

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
      setShowEditBudget(false);
      getBudget.refetch();
    }
  };

  if (getBudget.loading) return null;

  const budget = getBudget.data.getProjectBudget.result;

  let budgetFormData = {
    amount: 0,
    type: "time"
  };
  let budgetType = "h";
  let amount: number = 0;
  let progress: number = 0;
  let percentage: number = 0;

  if (budget) {
    budgetFormData = {
      amount: budget.amount,
      type: budget.type
    };

    budgetType = budget.type === "money" ? "$" : "h";
    amount = parseInt(budget.amount);
    progress = parseInt(budget.progress);
    percentage = Math.floor((progress / amount) * 100);
  }

  return (
    <Popover
      className="budget-section"
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
      {getBudget.data.getProjectBudget.success ? (
        <div>
          <p>{`Budget: ${progress}${budgetType} of ${amount}${budgetType}`}</p>
          <div>
            <Progress percent={percentage} strokeColor="green" />
          </div>
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
    width: 100px !important;
    margin-left: -4px;
    border-radius: 0;
  }
  .amount-field {
    width: 100px !important;
  }
`;

export default BudgetView;
