import initialState from './initialState';
import CourseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxDuck';

export const LOAD_COURSES_SUCCESS = 'pluralsight-slingshot/course/LOAD_COURSES_SUCCESS';
export const CREATE_COURSE_SUCCESS = 'pluralsight-slingshot/course/CREATE_COURSE_SUCCESS';
export const UPDATE_COURSE_SUCCESS = 'pluralsight-slingshot/course/UPDATE_COURSE_SUCCESS';
export const DELETE_COURSE_SUCCESS = 'pluralsight-slingshot/course/DELETE_COURSE_SUCCESS';
export const COURSE_CHANGED = 'pluralsight-slingshot/course/COURSE_CHANGED';

// reducer

export default function reducer(state = initialState.courses, action) {
    switch (action.type) {
        case LOAD_COURSES_SUCCESS:
            return action.courses;

        case CREATE_COURSE_SUCCESS:
            return [
                ...state, 
                {...action.course}
            ];

        case UPDATE_COURSE_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.course.id),
                {...action.course}
            ];

        case DELETE_COURSE_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.course.id)
            ];

        default:
            return state;
    }
}

// sagas

// action creators

export function loadCoursesSuccess(courses) {
    return { type: LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
    return { type: UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
    return { type: CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(course) {
    return { type: DELETE_COURSE_SUCCESS, course };
}

export function courseChanged() {
    return { type: COURSE_CHANGED };
}

export function loadCourses() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return CourseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function saveCourse(course) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return CourseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteCourse(course) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return CourseApi.deleteCourse(course).then(deletedCourse => {
            dispatch(deleteCourseSuccess(deletedCourse));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}