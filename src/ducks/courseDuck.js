import initialState from './initialState';
import CourseApi from '../api/mockCourseApi';
import * as ajax from './ajaxDuck';

export const actions = {
    LOAD_COURSES_SUCCESS: 'pluralsight-slingshot/course/LOAD_COURSES_SUCCESS',
    CREATE_COURSE_SUCCESS: 'pluralsight-slingshot/course/CREATE_COURSE_SUCCESS',
    UPDATE_COURSE_SUCCESS: 'pluralsight-slingshot/course/UPDATE_COURSE_SUCCESS',
    DELETE_COURSE_SUCCESS: 'pluralsight-slingshot/course/DELETE_COURSE_SUCCESS',
    COURSE_CHANGED: 'pluralsight-slingshot/course/COURSE_CHANGED'
};

// reducer

export function reducer(state = initialState.courses, action) {
    switch (action.type) {
        case actions.LOAD_COURSES_SUCCESS:
            return action.courses;

        case actions.CREATE_COURSE_SUCCESS:
            return [
                ...state, 
                {...action.course}
            ];

        case actions.UPDATE_COURSE_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.course.id),
                {...action.course}
            ];

        case actions.DELETE_COURSE_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.course.id)
            ];

        default:
            return state;
    }
}

// sagas

// action creators

export const creators = {
    loadCoursesSuccess: (courses) => {
        return { type: actions.LOAD_COURSES_SUCCESS, courses };
    },

    updateCourseSuccess: (course) => {
        return { type: actions.UPDATE_COURSE_SUCCESS, course };
    },

    createCourseSuccess: (course) => {
        return { type: actions.CREATE_COURSE_SUCCESS, course };
    },

    deleteCourseSuccess: (course) => {
        return { type: actions.DELETE_COURSE_SUCCESS, course };
    },

    courseChanged: () => {
        return { type: actions.COURSE_CHANGED };
    },

    loadCourses: () => {
        return (dispatch) => {
            dispatch(ajax.creators.beginAjaxCall());
            return CourseApi.getAllCourses().then(courses => {
                dispatch(creators.loadCoursesSuccess(courses));
            }).catch(error => {
                dispatch(ajax.creators.ajaxCallError(error));
                throw(error);
            });
        };
    },

    saveCourse: (course) => {
        return (dispatch, getState) => {
            dispatch(ajax.creators.beginAjaxCall());
            return CourseApi.saveCourse(course).then(savedCourse => {
                course.id ? dispatch(creators.updateCourseSuccess(savedCourse)) :
                    dispatch(creators.createCourseSuccess(savedCourse));
            }).catch(error => {
                dispatch(ajax.creators.ajaxCallError(error));
                throw(error);
            });
        };
    },

    deleteCourse: (course) => {
        return (dispatch, getState) => {
            dispatch(ajax.creators.beginAjaxCall());
            return CourseApi.deleteCourse(course).then(deletedCourse => {
                dispatch(creators.deleteCourseSuccess(deletedCourse));
            }).catch(error => {
                dispatch(ajax.creators.ajaxCallError(error));
                throw(error);
            });
        };
    }
};