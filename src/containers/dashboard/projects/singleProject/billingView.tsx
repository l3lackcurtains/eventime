import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Popover } from "antd";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { ProjectContext } from ".";
import {
  CustomSelect,
  CustomTextInput,
} from "../../../../components/fields/formFields";
import { GET_PROJECT_BILLING } from "../../../../graphql/project/getProjectBilling";
import { GET_PROJECT_BUDGET } from "../../../../graphql/project/getProjectBudget";
import { SET_PROJECT_BILLING } from "../../../../graphql/project/setProjectBilling";

const typeOptions = [
  {
    key: 1,
    value: "flat_rate",
    text: "Project Rate",
  },
  {
    key: 2,
    value: "user_rate",
    text: "User Rate",
  },
];

const BillingView = (props: any) => {
  const { project } = useContext(ProjectContext);

  const getBilling = useQuery(GET_PROJECT_BILLING, {
    variables: {
      id: project.id,
    },
  });

  const getBudget = useQuery(GET_PROJECT_BUDGET, {
    variables: {
      id: project.id,
    },
  });

  // Billing Edit Area
  const [showEditBilling, setShowEditBilling] = useState(false);

  const setBilling = useMutation(SET_PROJECT_BILLING);
  const handleUpdateBilling = async (values: any) => {
    const { rate, type } = values;

    const updated: any = await setBilling({
      variables: {
        id: project.id,
        rate,
        type,
      },
    });

    if (updated.data.setProjectBilling.success) {
      getBilling.refetch();
      getBudget.refetch();
      setShowEditBilling(false);
    }
  };
  let billingFormData = {
    rate: 0,
    type: "flat_rate",
  };
  let billingType = "h";
  let rate = 0;

  if (getBilling.loading) return null;
  if (getBilling.data.getProjectBilling.success) {
    const billing = getBilling.data.getProjectBilling.result;
    billingFormData = {
      rate: billing.rate,
      type: billing.type,
    };

    billingType =
      billing.type === "flat_rate" ? "per project hour" : "per user hour";
    rate = billing.rate;
  }

  return (
    <Popover
      className="billing-section"
      content={
        <Formik
          initialValues={billingFormData}
          onSubmit={handleUpdateBilling}
          render={(props: any) => (
            <Form onSubmit={props.handleSubmit}>
              <CombinedInputs>
                <CustomTextInput
                  className="rate-field"
                  name="rate"
                  type="number"
                />
                <CustomSelect
                  className="type-field"
                  name="type"
                  options={typeOptions}
                  disabled
                />
              </CombinedInputs>
              <Button type="primary" htmlType="submit">
                Save Billing
              </Button>
            </Form>
          )}
        />
      }
      title={null}
      trigger="click"
      visible={showEditBilling}
      placement="leftTop"
      onVisibleChange={(visible: boolean) => setShowEditBilling(visible)}
    >
      {getBilling.data.getProjectBilling.success ? (
        <div>
          <p>Billing</p>
          <p>{`${rate}$ ${billingType}`}</p>
        </div>
      ) : (
        <a className="ant-dropdown-link" href="#">
          Billing <CaretDownOutlined />
        </a>
      )}
    </Popover>
  );
};

const CombinedInputs = styled.div`
  display: flex;
  .type-field {
    width: 130px !important;
    margin-left: -4px;
    border-radius: 0;
  }
  .rate-field {
    width: 130px !important;
  }import { CaretDownOutlined } from '@ant-design/icons';

`;

export default BillingView;
