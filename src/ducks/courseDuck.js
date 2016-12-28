import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import initialState from './initialState';
import CourseApi from '../api/mockCourseApi';
import * as ajax from './ajaxDuck';

export const actions = {
    LOAD_COURSES_SUCCESS: 'pluralsight-slingshot/course/LOAD_COURSES_SUCCESS',
    CREATE_COURSE_SUCCESS: 'pluralsight-slingshot/course/CREATE_COURSE_SUCCESS',
    UPDATE_COURSE_SUCCESS: 'pluralsight-slingshot/course/UPDATE_COURSE_SUCCESS',
    DELETE_COURSE_SUCCESS: 'pluralsight-slingshot/course/DELETE_COURSE_SUCCESS',
    COURSE_CHANGED: 'pluralsight-slingshot/course/COURSE_CHANGED',
    LOAD_COURSES_REQUEST: 'pluralsight-slingshot/course/LOAD_COURSES_REQUEST',
    SAVE_COURSE_REQUEST: 'pluralsight-slingshot/course/SAVE_COURSE_REQUEST',
    DELETE_COURSE_REQUEST: 'pluralsight-slingshot/course/DELETE_COURSE_REQUEST'
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

export const sagas = {
    watchers: {
        LOAD_COURSES_REQUEST: function* () {
            yield takeEvery(actions.LOAD_COURSES_REQUEST, sagas.workers.loadCourses);
        },
        SAVE_COURSE_REQUEST: function* () {
            yield takeEvery(actions.SAVE_COURSE_REQUEST, sagas.workers.saveCourse);
        },
        DELETE_COURSE_REQUEST: function* () {
            yield takeEvery(actions.DELETE_COURSE_REQUEST, sagas.workers.deleteCourse);
        }
    },
    workers: {
        loadCourses: function* () {
            try {
                yield put(ajax.creators.beginAjaxCall());
                const courses = yield call(CourseApi.getAllCourses);
                yield put(creators.loadCoursesSuccess(courses));
            }
            catch (e) {
                yield put(ajax.creators.ajaxCallError(e));
            }
        },
        saveCourse: function* (action) {
            try {
                yield put(ajax.creators.beginAjaxCall());
                const course = yield call(CourseApi.saveCourse, action.data);
                if (action.data.id) {
                    yield put(creators.updateCourseSuccess(course));
                }
                else {
                    yield put(creators.createCourseSuccess(course));
                }
            }
            catch (e) {
                yield put(ajax.creators.ajaxCallError(e));
            }
        },
        deleteCourse: function* (action) {
            try {
                yield put(ajax.creators.beginAjaxCall());
                const course = yield call(CourseApi.deleteCourse, action.data);
                yield put(creators.deleteCourseSuccess(course));
            }
            catch (e) {
                yield put(ajax.creators.ajaxCallError(e));
            }
        }
    }
};

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
        return { type: actions.LOAD_COURSES_REQUEST };
    },

    saveCourse: (course) => {
        return { type: actions.SAVE_COURSE_REQUEST, data: course };
    },

    deleteCourse: (course) => {
        return { type: actions.DELETE_COURSE_REQUEST, data: course };
    }
};