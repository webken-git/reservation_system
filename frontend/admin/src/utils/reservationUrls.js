// ルーティングとApiのエンドポイントを置く
const ROOT_URL = process.env.REACT_APP_API;

export const ReservationUrls = {
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
  USER_INFO: `${ROOT_URL}/api/userinfo/`,
  DEFFERD_PAYMENT: `${ROOT_URL}/api/defferd-payments/`,
  APP_SETTING: `${ROOT_URL}/api/app-settings/`,
  RESERVATION_DELETE: `${ROOT_URL}/api/reservation-lists/1/`,
  SUSPENSION: `${ROOT_URL}/api/reservation-suspension-schedules/`,
  APPROVALS: `${ROOT_URL}/api/approvals/`,
};
