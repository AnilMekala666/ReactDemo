/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

export const BASE_URL = 'https://ican-manage-mindpath-tst.cognitivehealthit.com/CashManagement';

export const CORRESPONDENCE_BASE_URL = 'https://ican-manage-chit-dem.cognitivehealthit.com/Correspondence';

// export const PDF_BASE_URL = 'https://localhost:8182/CorrespondenceServices'; // New base URL for PDF


export const DEMO_URL = 'https://ican-manage-chit-dem.cognitivehealthit.com/Correspondence';

export const IP_URL = 'https://ican-manage-mindpath-tst.cognitivehealthit.com/CorrespondenceServices';

export const KPI_URL = 'http://10.0.1.216:8181/KPIServices'

export const ENDPOINTS = {
  GET_STATE_LIST: `${IP_URL}/getStateList`,
  GET_CLASSIFICATION_LIST: `${IP_URL}/getClassificationList`,
  LOCKBOX_FILES_LIST: `${IP_URL}/lockboxFilesList`,
  GET_PREDICTION_LIST: `${IP_URL}/getPredictionList`,
  SAVE_QA_FILE: `${IP_URL}/saveQAFile`,
  VIEW_QA_FILE: `${IP_URL}/viewQAFile`,
  SHOW_QA_PDF: (fileName) => `${IP_URL}/showQApdf?fileName=${fileName}`, // New endpoint for showing PDF
  GET_BATCH_DATA: `${DEMO_URL}/getBatchData`,
  GET_QA_BATCH_FILES: `${DEMO_URL}/getQAbatchFiles`,
  // Add more endpoints as needed
};

export const CORRESPONDENCE_ENDPOINTS = {
  fetchConfScoreInfo:`${CORRESPONDENCE_BASE_URL}/fetchConfScoreInfo`,
  FETCH_PREDICTION_FILES:`${CORRESPONDENCE_BASE_URL}/fetchPredictionFilesWithStatus`,
  FETCH_PATIENT_LEVEL_DATA:`${CORRESPONDENCE_BASE_URL}/fetchPatientLevelData`,
  GET_EOB_FILE_LEVEL_DATA:`${CORRESPONDENCE_BASE_URL}/getEobFileLevelData`,
  GET_PATIENT_LIST:`${CORRESPONDENCE_BASE_URL}/getPatientsList`,
  GET_MEDICAL_REQUEST_DATA:`${CORRESPONDENCE_BASE_URL}/getMedicalRequestData`,
  GET_EOB_DETAILS_WITH_AI : `${CORRESPONDENCE_BASE_URL}/getEOBDetailsWithAI`,
  FETCH_MEDICAL_PREDICTION_FILES_WITH_STATUS: `${CORRESPONDENCE_BASE_URL}/fetchMedicalPredictionFilesWithStatus`,
  GET_MEDICAL_DETAILS_WITH_AI:`${CORRESPONDENCE_BASE_URL}/getMedicalDetailsWithAI`,
  UPDATE_PATIENT_LEVEL_DATA : `${CORRESPONDENCE_BASE_URL}/updatePatientLevelData`,
  UPDATE_STATUS:`${CORRESPONDENCE_BASE_URL}/updateStatus`,
  UPLOAD_MEDICAL_REQ_PDF:`${CORRESPONDENCE_BASE_URL}/uploadMedicalReqFiles`,
  SHOW_MEDICAL_FILE_PDF:`${CORRESPONDENCE_BASE_URL}/showMedicalFilepdf?fileName=`,
  UPDATE_MEDICAL_REQUEST_RESPONSE_DATA: `${CORRESPONDENCE_BASE_URL}/updateMedicalRequestResponseData`,
  UPDATE_EOB_PATIENT_LEVEL_DATA:`${CORRESPONDENCE_BASE_URL}/updatePatientWithLineLevelData`,
  UPDATE_EOB_FILE_LEVEL_DATA:`${CORRESPONDENCE_BASE_URL}/updateEOBFileLevelData`,
  REFRESH_PREDICTION_DATA:`${CORRESPONDENCE_BASE_URL}/refreshPredictionData`,
  UPDATE_LAST_RECORD_BY_DATE:`https://ican-manage-chit-dem.cognitivehealthit.com/BAIDataExtracter/bai/updateLastRecordByDate/1`,
  UPDATE_MEDICAL_REQUEST_PATIENT_LEVEL_DATA:`${CORRESPONDENCE_BASE_URL}/updateMedicalReqPatientLevelData`,
  UPDATE_MEDICAL_REQUEST_FILE_LEVEL_DATA:`${CORRESPONDENCE_BASE_URL}/updateMedicalReqFileLevelData`,
  DELETE_MEDICAL_REQ_AI_INTERPRETATION:`${CORRESPONDENCE_BASE_URL}/deleteMedicalReqAiInterpretationAtt`,
}

export const KPI_ENDPOINTS = {
  GET_WIDGET_DATA:`${KPI_URL}/getWidgetData`,
  GET_REMMITTANCE_SUMMARY:`${KPI_URL}/getRemittanceSummaryYear`,
  GET_REMMITTANCE_KPI:`${KPI_URL}/getRemittanceKpi`,
  GET_DENIAL_KPI:`${KPI_URL}/getDenialKpi`,
  GET_RECONCILIATION_STATUS_KPI:`${KPI_URL}/getReconciliationStatusKPI`,
  GET_AGING_ANALYSIS:`${KPI_URL}/getAgingKPI`,
  GET_REVENUE_CYCLE_KPI:`${KPI_URL}/getRevenueCycleKpi`,
}
