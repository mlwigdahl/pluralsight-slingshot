import courseReducer from './courseReducer';
import {expect} from 'chai';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
    it('should add a course when passed CREATE_COURSE_SUCCESS', () => {
        const initialState = [
            {title: 'A'},
            {title: 'B'}
        ];

        const newCourse = {title: 'C'};

        const action = actions.createCourseSuccess(newCourse);

        const newState = courseReducer(initialState, action);

        expect(newState.length).to.equal(3);
        expect(newState[0].title).to.equal('A');
        expect(newState[1].title).to.equal('B');
        expect(newState[2].title).to.equal('C');
    });

   it('should update a course when passed UPDATE_COURSE_SUCCESS', () => {
        const initialState = [
            {id: 'a', title: 'A'},
            {id: 'b', title: 'B'},
            {id: 'c', title: 'C'}
        ];

        const course = {id: 'b', title: 'New Title'};
        const action = actions.updateCourseSuccess(course);

        const newState = courseReducer(initialState, action);
        const updatedCourse = newState.find(crs => crs.id == course.id);
        const untouchedCourse = newState.find(crs => crs.id == 'a');

        expect(newState.length).to.equal(3);
        expect(updatedCourse.title).to.equal('New Title');
        expect(untouchedCourse.title).to.equal('A');
    });    

    it('should delete a course when passed DELETE_COURSE_SUCCESS', () => {
        const initialState = [
            {id: 'a', title: 'A'},
            {id: 'b', title: 'B'},
            {id: 'c', title: 'C'}
        ];

        const course = {id: 'a', title: 'A'};
        const action = actions.deleteCourseSuccess(course);

        const newState = courseReducer(initialState, action);
        const undefinedIfNotDeleted = newState.find(crs => crs.id == course.id);

        expect(newState.length).to.equal(2);
        expect(undefinedIfNotDeleted).to.equal(undefined);
    });
});