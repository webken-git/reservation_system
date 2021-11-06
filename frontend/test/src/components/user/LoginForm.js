import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar } from "react-bootstrap";




const LoginForm = ({ onSubmit }) => {
  // React Hook Form
  const { register, handleSubmit, errors, formState } = useForm();
  // inputタグのクリックイベント無効
  const handleClick = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
        {/* email input */}
        <Form.Group controlId={"email"}>
          <Form.Label>{"Email"}</Form.Label>
          <Form.Control
            type={"email"}
            name={"email"}
            placeholder={"Enter email"}
            // isInvalid={errors.email}
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address"
              },
            })}
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* password input */}
        <Form.Group controlId={"password"}>
          <Form.Label>
            {"パスワード"}
          </Form.Label>
          <Form.Control
            name={"password"}
            placeholder={"Password"}
            type={"password"}
            isInvalid={errors.password}
            onClick={handleClick}
            ref={register({
              required: "パスワードは必須です",
              maxLength: {
                value: 30,
                message: "30文字以内です",
              },
            })}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <ButtonToolbar className="justify-content-center">
            <Button
              variant={"outline-primary"}
              type="submit"
              disabled={formState.isSubmitting}
            >
              ログイン
              </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>

  );
};

export default LoginForm;
