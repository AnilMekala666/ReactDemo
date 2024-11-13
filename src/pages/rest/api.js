/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

export const BASE_URL = 'http://10.0.1.216:8181/CorrespondenceServices';

export const CORRESPONDENCE_BASE_URL = 'http://10.0.1.123:8181/Correspondence';

// export const PDF_BASE_URL = 'http://localhost:8182/CorrespondenceServices'; // New base URL for PDF


export const DEMO_URL = 'https://ican-manage-chit-dem.cognitivehealthit.com/Correspondence';



export const ENDPOINTS = {
  GET_STATE_LIST: `${BASE_URL}/getStateList`,
  GET_CLASSIFICATION_LIST: `${BASE_URL}/getClassificationList`,
  LOCKBOX_FILES_LIST: `${BASE_URL}/lockboxFilesList`,
  GET_PREDICTION_LIST: `${BASE_URL}/getPredictionList`,
  SAVE_QA_FILE: `${BASE_URL}/saveQAFile`,
  VIEW_QA_FILE: `${BASE_URL}/viewQAFile`,
  SHOW_QA_PDF: (fileName) => `${BASE_URL}/showQApdf?fileName=${fileName}`, // New endpoint for showing PDF
  GET_BATCH_DATA: `${DEMO_URL}/getBatchData`,
  GET_QA_BATCH_FILES: `${DEMO_URL}/getQAbatchFiles`,
  // Add more endpoints as needed
};

export const CORRESPONDENCE_ENDPOINTS = {
  fetachConfScoreInfo:`${CORRESPONDENCE_BASE_URL}/fetchConfScoreInfo`,
  FETCH_PREDICTION_FILES:`${CORRESPONDENCE_BASE_URL}/fetchPredictionFilesWithStatus`,
  FETCH_PATIENT_LEVEL_DATA:`${CORRESPONDENCE_BASE_URL}/fetchPatientLevelData`,
  GET_EOB_FILE_LEVEL_DATA:`${CORRESPONDENCE_BASE_URL}/getEobFileLevelData`,
  GET_PATIENT_LIST:`${CORRESPONDENCE_BASE_URL}/getPatientsList`,
  GET_MEDICAL_REQUEST_DATA:`${CORRESPONDENCE_BASE_URL}/getMedicalRequestData`,
  GET_EOB_DETAILS_WITH_AI : `${CORRESPONDENCE_BASE_URL}/getEOBDetailsWithAI`,
  FETCH_MEDICAL_PREDICTION_FILES_WITH_STATUS: `${CORRESPONDENCE_BASE_URL}/fetchMedicalPredictionFilesWithStatus`,
  GET_MEDICAL_DETAILS_WITH_AI:`${CORRESPONDENCE_BASE_URL}/getMedicalDetailsWithAI`
}