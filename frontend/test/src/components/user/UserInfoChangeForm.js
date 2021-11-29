import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import useAlert from "../../hooks/useAlert";
import { AuthUrls } from "../../utils/authUrls";

import { Button, Col, Form, Row } from "react-bootstrap";

const UserInfoChangeForm = () => {
  const [email, setEmail] = useState();
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const { createAlert } = useAlert();

  const get_userUrl = AuthUrls.GET_USER_DATA;

  const getUser = async () => {
    try {
      const response = await axios.get(get_userUrl);
      setEmail(response.data.email);
    } catch (error) {
      createAlert({
        message:
          "ユーザーの取得に失敗しました、ログアウトして再ログインしてください",
        type: "danger",
      });
    }
  };

  const patch_User = async (data) => {
    try {
      const response = await axios.patch(get_userUrl, data);
      createAlert({
        message: "ユーザー情報を変更しました",
        type: "success",
      });
    } catch (error) {
      createAlert({
        message:
          "リクエストエラーです、すでに登録されているユーザー名かメールアドレスの可能性があります",
        type: "danger",
      });
    }
  };

  // inputタグのクリックイベント無効
  const handleClick = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Form
      onSubmit={handleSubmit(patch_User)}
      className="justify-content-center"
    >
      <Form.Group
        as={Row}
        className="justify-content-center"
        controlId="formHorizontalEmail"
      >
        <Form.Label>あなたのメールアドレス</Form.Label>
        <Form.Control
          name={"email"}
          placeholder={"メールアドレスはダミーでも可能です"}
          type={"email"}
          defaultValue={email}
          isInvalid={errors.email}
          onClick={handleClick}
          ref={register({
              required: "メールアドレスは必須です",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "メールアドレスの形式が正しくありません",
              },
          })}
        />
      </Form.Group>

      <Form.Group as={Row} className="justify-content-center">
        <Button type="submit">Change User Info</Button>
      </Form.Group>
    </Form>
  );
};

export default UserInfoChangeForm;
