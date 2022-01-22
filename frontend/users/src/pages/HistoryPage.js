import React from 'react';
import HistoryList from '../components/history/HistoryList';

export const HistoryPage = () => {
    document.title = "予約履歴 | 施設予約"; // ページタイトルを変更
    return <HistoryList />;
};
