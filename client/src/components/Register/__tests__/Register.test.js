import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Register} from '../Register'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {

    let props = {
        registerInfo: {
            loading: false,
            err: null,
            username: null
        },
        register: jest.fn() 
    }

    let enzymeWrapper = mount(<Register {...props} />)
   
    return {
      props,
      enzymeWrapper
    }
}

describe('>>>Components', () => {
  describe('>>>Register', () => {

    it('+++should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.length).toEqual(1)

      expect(enzymeWrapper.find('header').hasClass('page-title')).toBe(true)
      expect(enzymeWrapper.find('.register-title').text()).toBe('Registration')

      const registerInput = enzymeWrapper.find('input')
      expect(registerInput.length).toEqual(1)
      const registerInputProps = registerInput.props()
      expect(registerInputProps.value).toBe("")
      expect(registerInputProps.placeholder).toEqual('Username')

      const registerButton = enzymeWrapper.find('button')
      expect(registerButton.length).toEqual(1)
      expect(registerButton.text()).toBe('Register')
      expect(registerButton.hasClass('btn-success')).toBe(false)
      const registerButtonProps = registerButton.props()
      expect(registerButtonProps.disabled).toBe(true)

      enzymeWrapper.unmount()
    })

    it('+++should call onChange and modify state', () => {
      const { enzymeWrapper, props } = setup()
      const input = enzymeWrapper.find('input')

      input.simulate('change', {target: {value: "user1"}});
      expect(enzymeWrapper.find('input').prop('value')).toBe('user1');
      expect(enzymeWrapper.state().username).toEqual("user1");
    })

    it('+++should call onChange and activate button', () => {
      const { enzymeWrapper, props } = setup()
      const input = enzymeWrapper.find('input')

      input.simulate('change', {target: {value: "user1"}});
      expect(enzymeWrapper.find('input').prop('value')).toBe('user1');
      expect(enzymeWrapper.state().username).toEqual("user1");

      const registerButton = enzymeWrapper.find('button')
      expect(registerButton.hasClass('btn-success')).toBe(true)
    })

    it('+++should click register and get register action', () => {
      const { enzymeWrapper, props } = setup()
      const input = enzymeWrapper.find('input')
      input.simulate('change', {target: {value: "user1"}});

      const registerButton = enzymeWrapper.find('button')
      expect(registerButton.hasClass('btn-success')).toBe(true)

      registerButton.simulate('click')
      expect(enzymeWrapper.props().register).toBeCalled();
    })
  })
})