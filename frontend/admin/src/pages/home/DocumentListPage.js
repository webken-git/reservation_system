import React from 'react';

import DocumentList from '../../components/document/list/DocumentList';
import '../../components/document/document.scss';


export const DocumentListPage = () => {
    return (
        <div className="list-wrapper">
            <DocumentList />
        </div>
    );
};
