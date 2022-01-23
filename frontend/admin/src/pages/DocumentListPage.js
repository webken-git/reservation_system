import React from 'react';

import DocumentList from '../components/document/list/DocumentList';
import '../components/document/document.scss';


export const DocumentListPage = () => {
    document.title = '予約管理アプリ | ドキュメントリスト';
    return (
        <div className="list-wrapper">
            <DocumentList />
        </div>
    );
};
