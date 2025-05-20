import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import NewParentScreen from './NewParentsScreen';
import MyConstant from '../config/MyConstant';

jest.mock('../images/Back_Button.png', () => 'back_button.png');
jest.mock('../images/Group2720.png', () => 'group2720.png');
jest.mock('../images/Group2718.png', () => 'group2718.png');

const mockStore = configureStore([]);

describe('NewParentScreen Component', () => {
  let store, history;

  beforeEach(() => {
    store = mockStore({});
    history = createMemoryHistory();
    history.push = jest.fn(); // mock navigation
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router history={history}>
          <NewParentScreen history={history} />
        </Router>
      </Provider>
    );

  it('renders all key elements', () => {
    const { getByText, getAllByAltText } = renderComponent();

    expect(getByText("Parent's Corner")).toBeInTheDocument();
    expect(getByText('Track Progress')).toBeInTheDocument();
    expect(
      getByText("Get a snapshot of your child’s emotions and strategies they use to feel better")
    ).toBeInTheDocument();
    expect(getByText('Tips and Tricks')).toBeInTheDocument();
    expect(
      getByText('Access easy and well curated guide of learning tools in our Blog')
    ).toBeInTheDocument();
    expect(getAllByAltText('')).toHaveLength(3); // 3 images with empty alt
  });

  it('navigates to parent screen on back button click', () => {
    const { getByTestId } = renderComponent();
    const backButton = getByTestId("backBtn");
    fireEvent.click(backButton);
    expect(history.push).toHaveBeenCalledWith(`/${MyConstant.keyList.projectUrl}/Parent`);
  });

  it('navigates to track progress screen on image click', () => {
    const { getAllByAltText } = renderComponent();
    const trackProgressImage = getAllByAltText('')[1]; // second image is trackProgress
    fireEvent.click(trackProgressImage);
    expect(history.push).toHaveBeenCalledWith(`/${MyConstant.keyList.projectUrl}/trackprogressscreen`);
  });

  it('contains blog link for tips and tricks', () => {
    const { container } = renderComponent();
    const blogLink = container.querySelector('a[href="https://www.tillikids.com/blog"]');
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute('target', '_blank');
    expect(blogLink).toHaveAttribute('rel', 'noreferrer');
  });
});
