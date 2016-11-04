import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import {ManageAuthorPage} from './ManageAuthorPage';

function setupSaveProps(type) {
    if (type == "firstName") {
        return {
            courses: [],
            authors: [],
            actions: {saveAuthor: () => { return Promise.resolve(); }},
            author: {lastName: 'Wigdahl'},
            params: {id: ''},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "lastName") {
        return {
            courses: [],
            authors: [],
            actions: {saveAuthor: () => { return Promise.resolve(); }},
            author: {firstName: 'Matt'},
            params: {id: ''},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "dupe") {
        return {
            courses: [],
            authors: [{id: 'matt-wigdahl', firstName: 'Matt', lastName: 'Wigdahl'}],
            actions: {saveAuthor: () => { return Promise.resolve(); }},
            author: {id: '', firstName: 'Matt', lastName: 'Wigdahl'},
            params: {id: ''},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "empty") {
        return {
            courses: [],
            authors: [{id: 'matt-wigdahl', firstName: 'Matt', lastName: 'Wigdahl'}],
            actions: {deleteAuthor: () => { return Promise.resolve(); }},
            author: {id: '', firstName: 'Matt', lastName: 'Wigdahl'},
            params: {id: ''},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "courseLink") {
        return {
            courses: [{id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'matt-wigdahl', length: '2:30', category: 'Javascript'}],
            authors: [{id: 'matt-wigdahl', firstName: 'Matt', lastName: 'Wigdahl'}],
            actions: {deleteAuthor: () => { return Promise.resolve(); }},
            author: {id: 'matt-wigdahl', firstName: 'Matt', lastName: 'Wigdahl'},
            params: {id: 'matt-wigdahl'},
            router: {setRouteLeaveHook: () => {}}
        };
    }
}

describe('Manage Author Page', () => {
    it('sets error message when trying to save empty first name', () => {
        const props = setupSaveProps("firstName");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.firstName).to.equal('First name must be at least 1 character.');
    });

    it('sets error message when trying to enter empty last name', () => {
        const props = setupSaveProps("lastName");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.firstName).to.equal(undefined);
        expect(wrapper.state().errors.lastName).to.equal('Last name must be at least 1 character.');
    });

    it('sets error message when trying to enter a duplicate author', () => {
        const props = setupSaveProps("dupe");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.firstName).to.equal("Can't insert a duplicate author.");
    });

    it('sets error message when trying to delete empty id', () => {
        const props = setupSaveProps("empty");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const deleteButton = wrapper.find('[type="submit"]').last();
        deleteButton.simulate('click');
        expect(wrapper.state().errors.firstName).to.equal("Can't delete an unsaved author.");
    });

    it('sets error message when trying to delete an author linked to a course', () => {
        const props = setupSaveProps("courseLink");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const deleteButton = wrapper.find('[type="submit"]').last();
        deleteButton.simulate('click');
        expect(wrapper.state().errors.firstName).to.equal("Can't delete an author that's referenced by a course.");
    });
});