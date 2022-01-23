// date型をyyyy-mm-ddに変換
export function formatDate(date) {
    // 0埋め
    const zeroPadding = (num) => {
        return ('0' + num).slice(-2);
    };
    const year = date.getFullYear();
    const month = zeroPadding(date.getMonth() + 1);
    const day = zeroPadding(date.getDate());
    const data = `${year}-${month}-${day}`;
    return data.toString();
}

// date型をhh:mmに変換
export function formatTime(date){
    // minutesは2桁表示する
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const time = `${date.getHours()}:${minutes}`;
    return time.toString();
}
