import React from "react";
import axios from "axios";
import './document.scss';


import { DocumentUrl } from "../../utils/documentUrl";

const DocumentPreparation = (props) => {
    const [document, setDocument] = React.useState([]);

    const post_DocumentUrl = DocumentUrl.DOCUMENT;
    console.log(props.document);

    const returnSelection = e => {
        e.preventDefault();
        props.changeState("selection");
    };


    return (
        <>
            <p>complete</p>
            <button onClick={returnSelection} className="selection-screen-btn">戻る</button>
            <span> </span>
        </>
    );
}

export default DocumentPreparation;
