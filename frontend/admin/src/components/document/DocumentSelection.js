import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import './document.scss';

import { DocumentUrl } from "../../utils/documentUrl";


const DocumentSelection = (props) => {
    const [documentTemplateList, setDocumentTemplateList] = useState([]);
    const [text, setText] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [checkedItems, setCheckedItems] = useState([]);

    // 発行する書類のテンプレートのデータを取得する
    const get_documentTemplateUrl = DocumentUrl.DOCUMENT_TEMPLATE;
    const pullDocumentTemplateList = async () => {
        try {
            const response = await axios.get(get_documentTemplateUrl);
            setDocumentTemplateList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // チェックボックスのチェック状態をstateに保存
    const handleCheckBoxChange = (e) => {
        setCheckedItems({
            ...checkedItems,
            [e.target.id]: e.target.checked
        });
    };
    // テキストボックスの値をstateに保存
    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const onSubmit = (data) => {
        // チェック状態がtrueのデータを全て配列に格納
        const arrayChild = Object.entries(checkedItems).reduce((acc, [key, value]) => {
            value && acc.push(key);
            return acc;
        }, []);
        // arrayChildを格納する配列を定義
        const array = [];
        // idというキーでarrayChildを格納
        array.id = arrayChild;
        // numberというキーでテキストボックスの値を格納
        array.number = text;
        props.selectDocument(array);
        props.changeState("preparation");
    }

    useEffect(() => {
        pullDocumentTemplateList();
    }, [checkedItems]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>発行する申請書を選択</h3>
            {documentTemplateList.map((documentTemplate, index) => {
                index = documentTemplate.id;
                return (
                    <div className="checkbox-container" key={index}>
                        <label>
                        <input
                            type="checkbox"
                            id={documentTemplate.id}
                            name="checkbox"
                            checked={checkedItems[documentTemplate.id]}
                            className="form-check-input"
                            {...register("checkbox", { required: true })}
                            value={documentTemplate.id}
                            onChange={handleCheckBoxChange}
                        />
                        {documentTemplate.name}
                        </label>
                    </div>
                );
            })}
            {errors.checkbox && <p className="text-danger">この項目は必須です</p>}
            <div>
                <label>発行番号を入力：
                    <input
                        type="text"
                        name="number"
                        {...register("number",{
                            required: true,
                            pattern: /^[0-9]+$/,
                        })}
                        value={text}
                        onChange={handleTextChange}
                    />
                    {errors.number && <p className="text-danger">半角数字で入力してください</p>}
                </label>
            </div>
            <button type="submit" className="modal-open-btn">発行</button>
            <span> </span>
        </form>
    );
};

export default DocumentSelection;