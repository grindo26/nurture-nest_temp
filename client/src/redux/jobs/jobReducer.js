import { v4 as uuid } from "uuid";
import { CREATE_JOB_SUCCESS, CREATE_JOB_FALIURE, DELETE_JOB_SUCCESS, DELETE_JOB_FALIURE, SHOW_ALL_APPLICANTS_SUCCESS , SEARCH_INITIATE, SHOW_ALL_APPLICANTS_FAILURE, SEARCH_APPLICANTS_SUCCESS, SEARCH_APPLICANTS_FAILURE, SELECT_NANNY_SUCCESS, SELECT_NANNY_FAILURE  } from "./jobActionTypes";

const initialState = {
  loading: false,
  data: {},
  applicantsData: [],
  error: "",
  status: "",
};

export const jobReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        data: payload,
        error: "",
        status: "OK",
      };
    case CREATE_JOB_FALIURE:
      console.log(payload);
      return {
        ...state,
        error: payload.response.data,
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        error: "",
        status: payload,
      };
    case DELETE_JOB_FALIURE:
      console.log(payload);
      return {
        ...state,
        error: payload.response.data,
      };
    case SHOW_ALL_APPLICANTS_SUCCESS:
      console.log("payload", payload);
      return {
        ...state,
        applicantsData: payload,
        error: "",
        status: "OK",
      };
    case SHOW_ALL_APPLICANTS_FAILURE:
      console.log(payload);
      return {
        ...state,
        error: payload.response.data,
      };
    case SEARCH_APPLICANTS_SUCCESS:
      console.log("payload", payload);
      return {
        ...state,
        applicantsData: payload,
        error: "",
        status: "OK",
      };
    case SEARCH_APPLICANTS_FAILURE:
      console.log(payload);
      return {
        ...state,
        error: payload.response.data,
      };
    case SHOW_ALL_APPLICANTS_FAILURE:
      console.log(payload);
      return {
        ...state,
        error: payload.response.data,
      };
    case SELECT_NANNY_SUCCESS:
      console.log("payload", payload);
      return {
        ...state,
        data: payload,
        error: "",
        status: "OK",
      };
    case SELECT_NANNY_FAILURE:
      console.log(payload);
      return {
        ...state,
        error: payload.response.data,
      };
      case SEARCH_INITIATE:
        return {
          ...state,
          applicantsData: []
        }
  default:
    return state;
}
};

export default jobReducer;