import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import "./document.scss";

import { DocumentUrl } from "../../utils/documentUrls";
import Loading from "../loading/Loading";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";
import reseravationData from "../../recoil/reservation/atom";

const DocumentSelection = (props) => {
  const unmountRef = useUnmountRef();
  const [documentTemplateList, setDocumentTemplateList] = useSafeState(
    unmountRef,
    []
  );
  const [text, setText] = useSafeState(unmountRef, "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [checkedItems, setCheckedItems] = useSafeState(unmountRef, []);
  const [loading, setLoading] = useSafeState(unmountRef, true);
  const [error, setError] = useSafeState(unmountRef, null);
  const reservation = useRecoilValue(reseravationData);

  // 発行する書類のテンプレートのデータを取得する
  const get_documentTemplateUrl = DocumentUrl.DOCUMENT_TEMPLATE;
  const pullDocumentTemplateList = async () => {
    // resevationIdが指定されていない場合は終了
    if (reservation.length === 0) {
      setError("申請書を発行するデータが指定されてません。");
      setLoading(false);
    } else {
      try {
        const response = await axios.get(get_documentTemplateUrl);
        setDocumentTemplateList(response.data);
      } catch (error) {
        console.log(error);
      }
      // API通信が終わったらloadingをfalseにする
      setLoading(false);
    }
  };

  // チェックボックスのチェック状態をstateに保存
  const handleCheckBoxChange = (e) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.id]: e.target.checked,
    });
  };
  // テキストボックスの値をstateに保存
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    // チェック状態がtrueのデータを全て配列に格納
    const arrayChild = Object.entries(checkedItems).reduce(
      (acc, [key, value]) => {
        value && acc.push(key);
        return acc;
      },
      []
    );
    // arrayChildを格納する配列を定義
    const array = [];
    // idというキーでarrayChildを格納
    array.id = arrayChild;
    // numberというキーでテキストボックスの値を格納
    array.number = text;
    props.selectDocument(array);
    props.changeState("preparation");
  };

  useEffect(() => {
    pullDocumentTemplateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems]);

  return (
    // loadingがtrueならLoadingを表示、falseならフォームを表示
    // loading ? <Loading /> :
    error ? (
      <div className="error">
        <p>{error}</p>
        <button
          type="button"
          onClick={props.modalToggle}
          className="modal-close-btn"
        >
          閉じる
        </button>
      </div>
    ) : (
      <>
        <form className="modal-wrapper" onSubmit={handleSubmit(onSubmit)}>
          <h3>発行する申請書を選択</h3>
          {error && <p className="error">{error}</p>}
          {errors.checkbox && (
            <p className="text-danger">※この項目は必須です</p>
          )}
          {documentTemplateList.map((documentTemplate, index) => {
            index = documentTemplate.id;
            return (
              <div className="checkbox-container" key={index}>
                <label>
                  <input
                    type="checkbox"
                    id={documentTemplate.id}
                    name="checkbox"
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
          <div>
            {errors.number && (
              <p className="text-danger">※半角数字で入力してください</p>
            )}
            <label>
              発行番号を入力：
              <input
                type="text"
                name="number"
                autoComplete="off"
                {...register("number", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
                value={text}
                onChange={handleTextChange}
              />
            </label>
          </div>
          <button type="submit" className="modal-open-btn">
            発行
          </button>
          <button
            type="button"
            onClick={props.modalToggle}
            className="modal-close-btn"
          >
            閉じる
          </button>
        </form>
        {loading && <Loading />}
      </>
    )
  );
};

export default DocumentSelection;
