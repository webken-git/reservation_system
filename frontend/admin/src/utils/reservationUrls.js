// ルーティングとApiのエンドポイントを置く
const ROOT_URL = process.env.REACT_APP_API;

export const ReservationUrl = {
    RESERVATION: `${ROOT_URL}/api/reservations/`,
    USAGE_CATEGORY: `${ROOT_URL}/api/usage-categories/`,
    AGE_CATEGORY: `${ROOT_URL}/api/age-categories/`,
    APPROVAL_APPLICATION: `${ROOT_URL}/api/approval-applications/`,
    CSV_EXPORTS: `${ROOT_URL}/api/csv-export/`,
    PLACE: `${ROOT_URL}/api/places/`,
    EQUIPMENT: `${ROOT_URL}/api/equipments/`,
    TIME: `${ROOT_URL}/api/times/`,
    AGE: `${ROOT_URL}/api/ages/`,
    USAGE: `${ROOT_URL}/api/usages/`,
    FACILITY_FEE: `${ROOT_URL}/api/facility-fees/`,
    EQUIPMENT_FEE: `${ROOT_URL}/api/equipment-fees/`,
};
