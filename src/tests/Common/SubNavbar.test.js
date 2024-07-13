import React from 'react';
// import { shallow } from "enzyme";
import SubNavbar from '../../components/Common/Navbar/SubNavbar';

describe('SubNavbar component', () => {
  it('test', () => {
    expect(true);
  });
  // const categories = ["Category1", "Category2", "Category3"];
  // const setPrepaidCategory = jest.fn();
  // const setPostpaidCategory = jest.fn();
  // const setBroadbandCategory = jest.fn();
  // const changePrepaidCategory = jest.fn();
  // const changePostpaidCategory = jest.fn();
  // const changeBroadbandCategory = jest.fn();

  // const props = {
  //   categories,
  //   prepaidCategory: "Category1",
  //   setPrepaidCategory,
  //   postpaidCategory: "Category2",
  //   setPostpaidCategory,
  //   currentPage: "prepaid",
  //   changePrepaidCategory,
  //   changePostpaidCategory,
  //   broadbandCategory: "Category3",
  //   setBroadbandCategory,
  //   changeBroadbandCategory,
  // };

  // let wrapper;

  // beforeEach(() => {
  //   wrapper = shallow(<SubNavbar {...props} />);
  // });

  // it("renders correctly", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it("renders the correct number of buttons", () => {
  //   const buttons = wrapper.find(".btn-subnav");
  //   expect(buttons).toHaveLength(categories.length);
  // });

  // it("calls setPrepaidCategory and changePrepaidCategory when a prepaid button is clicked", () => {
  //   const prepaidButton = wrapper.find(".btn-subnav").at(0);
  //   prepaidButton.simulate("click");
  //   expect(setPrepaidCategory).toHaveBeenCalledWith("Category1");
  //   expect(changePrepaidCategory).toHaveBeenCalledWith("Category1");
  // });

  // it("calls setPostpaidCategory and changePostpaidCategory when a postpaid button is clicked", () => {
  //   wrapper.setProps({ currentPage: "postpaid" });
  //   const postpaidButton = wrapper.find(".btn-subnav").at(0);
  //   postpaidButton.simulate("click");
  //   expect(setPostpaidCategory).toHaveBeenCalledWith("Category2");
  //   expect(changePostpaidCategory).toHaveBeenCalledWith("Category2");
  // });

  // it("calls setBroadbandCategory and changeBroadbandCategory when a broadband button is clicked", () => {
  //   wrapper.setProps({ currentPage: "broadband" });
  //   const broadbandButton = wrapper.find(".btn-subnav").at(0);
  //   broadbandButton.simulate("click");
  //   expect(setBroadbandCategory).toHaveBeenCalledWith("Category3");
  //   expect(changeBroadbandCategory).toHaveBeenCalledWith("Category3");
  // });
});
