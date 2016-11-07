import * as courseActions from './courseActions';
import * as types from './actionTypes';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

chai.use(sinonChai);

describe('Course Actions', () => {
    describe('createCourseSuccess', () => {
        it('should create a CREATE_COURSE_SUCCESS action', () => {
            //arrange
            const course = {id: 'clean-code', title: 'Clean Code'};
            const expectedAction = {
                type: types.CREATE_COURSE_SUCCESS,
                course: course
            };

            const action = courseActions.createCourseSuccess(course);

            expect(action).to.deep.equal(expectedAction);
        });
    });

    describe('deleteCourseSuccess', () => {
        it('should create DELETE_COURSE_SUCCESS action', () => {
            //arrange
            const course = {id: 'clean-code', title: 'Clean Code'};
            const expectedAction = {
                type: types.DELETE_COURSE_SUCCESS,
                course: course
            };

            const action = courseActions.deleteCourseSuccess(course);

            expect(action).to.deep.equal(expectedAction);
        });
    });
});

describe('Async Actions', () => {
    it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
        // Here's an example call to nock.
        // nock('http://example.com/')
        //   .get('/courses')
        //   .reply(200, {body: {course [{id: 1, firstName: 'Cory', lastName: 'House'}] }});

        const dispatch = sinon.spy();

        const expectedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {
                type: types.LOAD_COURSES_SUCCESS, 
                body: {
                    courses: [
                        {
                            id: "react-flux-building-applications",
                            title: "Building Applications in React and Flux",
                            watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
                            authorId: "cory-house",
                            length: "5:08",
                            category: "JavaScript"
                        },
                        {
                            id: "clean-code",
                            title: "Clean Code: Writing Code for Humans",
                            watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
                            authorId: "cory-house",
                            length: "3:10",
                            category: "Software Practices"
                        },
                        {
                            id: "architecture",
                            title: "Architecting Applications for the Real World",
                            watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
                            authorId: "cory-house",
                            length: "2:52",
                            category: "Software Architecture"
                        },
                        {
                            id: "career-reboot-for-developer-mind",
                            title: "Becoming an Outlier: Reprogramming the Developer Mind",
                            watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
                            authorId: "cory-house",
                            length: "2:30",
                            category: "Career"
                        },
                        {
                            id: "web-components-shadow-dom",
                            title: "Web Component Fundamentals",
                            watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
                            authorId: "cory-house",
                            length: "5:10",
                            category: "HTML5"
                        }
                    ]
                }
            }
        ];

        expect(typeof (courseActions.loadCourses())).to.equal('function');

        (courseActions.loadCourses())(dispatch).then(() => {
            expect(dispatch.callCount).to.equal(2);
            expect(dispatch.firstCall).to.have.been.calledWith(expectedActions[0]);
            expect(dispatch.secondCall).to.have.been.calledWith(expectedActions[1]);
            done();
        })
        .catch(()=> { 
            done(); 
        });
    });
});

/// need test for COURSE_CHANGED