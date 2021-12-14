// ルーティングとApiのエンドポイントを置く
const ROOT_URL = process.env.REACT_APP_END_POINT;

export const ReservationUrls = {
    POST_RESERVATION: `${ROOT_URL}/api/reservations/`,
    GET_UNAPPROVAL_LIST: `${ROOT_URL}/api/reservations/9999-01-01T00:00/approval-applications?approval=1`,
    GET_APPROVAL_LIST: `${ROOT_URL}/api/reservations/9999-01-01T00:00/approval-applications?approval=2`,
    GET_CANCEL_LIST: `${ROOT_URL}/api/reservations/9999-01-01T00:00/approval-applications?approval=4`,
}
