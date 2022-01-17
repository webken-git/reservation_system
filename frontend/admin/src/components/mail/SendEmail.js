import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import './mail.scss';

const SendEmail = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const sendMail = AuthUrls.SEND_MAIL;
    const onSubmit = () => {
        setLoading(true);
        let formData = new FormData();
        formData.append("subject", subject);
        formData.append("body", body);
        axios.post(sendMail, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setMessage(res.data.message);
                setLoading(false);
            })
            .catch((err) => {
            });
    };

    return (
        <>
            <div className="send-mail">
                {/* <div className="send-mail__title">
                    <h2>メール一斉送信</h2>
                </div> */}
                {message && <p className="send-mail__message">{message}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <p>
                            <span htmlFor="subject">件名：</span>
                            {errors.subject && <span className="send-mail__form-error">※この項目は必須です</span>}
                        </p>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            className="form-control__input"
                            autoComplete="off"
                            {...register("subject", {
                                required: true,
                            })}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <p>
                            <span>本文：</span>
                            {errors.body && <span className="send-mail__form-error">※この項目は必須です</span>}
                        </p>
                        <textarea
                            name="body"
                            id="body"
                            className="form-control__textarea"
                            {...register("body", {
                                required: true,
                            })}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <button className="back-btn mail__btn" type="button" onClick={() => window.history.back()}>戻る</button>
                    <span>　</span>
                    <button className="verify-btn mail__btn" type="submit">送信</button>
                </form>
            </div>
            {loading && <Loading />}
        </>
    );
}

export default SendEmail;
