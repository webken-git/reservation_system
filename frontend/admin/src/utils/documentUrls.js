// ルーティングとApiのエンドポイントを置く
const ROOT_URL = process.env.REACT_APP_API;

export const DocumentUrl = {
    DOCUMENT_TEMPLATE: `${ROOT_URL}/api/document-templates/`,
    DOCUMENT: `${ROOT_URL}/api/documents/`,
};
