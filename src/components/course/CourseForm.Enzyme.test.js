import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import CourseForm from './CourseForm';

function setup(saving, deleting) {
    const props = {
        course: {},
        saving: saving,
        deleting: deleting,
        errors: {},
        onSave: () => {},
        onDelete: () => {},
        onChange: () => {}
    };

    return shallow(<CourseForm {...props} />);
}

it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).to.equal(1);
    expect(wrapper.find('h1').text()).to.equal('ManageCourse');
});

it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false, false);
    expect(wrapper.find('[type="submit"]').first().props().value).to.equal('Save');
});

it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true, false);
    expect(wrapper.find('[type="submit"]').first().props().value).to.equal('Saving...');
});

it('delete button is labeled "Delete" when not deleting', () => {
    const wrapper = setup(false, false);
    expect(wrapper.find('[type="submit"]').last().props().value).to.equal('Delete');
});

it('delete button is labeled "Delete..." when deleting', () => {
    const wrapper = setup(false, true);
    expect(wrapper.find('[type="submit"]').last().props().value).to.equal('Deleting...');
});