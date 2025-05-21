import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionsList from './QuestionsList';

jest.mock('../../images/outlineBackIcon.png',  () => 'back.png');
jest.mock('../../images/outlineRightIcon.png', () => 'next.png');
jest.mock('../../images/qus_image_1.png',      () => 'qs1.png');
jest.mock('../../images/qus_image_2.png',      () => 'qs2.png');

jest.mock('react-router-dom', () => ({
  Link: ({ children, onClick }) => <div onClick={onClick}>{children}</div>,
}));

describe('QuestionsList', () => {
  const stage = 7;
  const data = {
    title: 'Quiz Title',
    content: {
      questionTitle: 'Select an answer:',
      questionList: [
        { question: 'Question 1', color: 'red' },
        { question: 'Question 2', color: 'blue' },
      ],
    },
  };
  let changeStage;

  beforeEach(() => {
    changeStage = jest.fn();
    jest.useFakeTimers();

    document.head.querySelectorAll('style').forEach((el) => el.remove());
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders the main title and subtitle', () => {
    render(<QuestionsList stage={stage} changeStage={changeStage} data={data} />);
    expect(screen.getByText('Quiz Title')).toBeInTheDocument();
    expect(screen.getByText('Select an answer:')).toBeInTheDocument();
  });

  it('renders the back-arrow <img> and triggers Previous on click', () => {
    const { container } = render(
        <QuestionsList stage={stage} changeStage={changeStage} data={data} />
    );
    const backBtn = container.querySelector('.col-2 > div');
    const backImg = backBtn.querySelector('img');
    expect(backImg).toBeInTheDocument();

    fireEvent.click(backBtn);
    expect(changeStage).toHaveBeenCalledWith('Previous', stage);
  });

  it('renders the question-icon box with correct styles', () => {
    const { container } = render(
        <QuestionsList stage={stage} changeStage={changeStage} data={data} />
    );
    const iconBox = container.querySelector('.col-3 > div');

    expect(iconBox.style.backgroundImage).toMatch(/^url\(.+\)$/);

    const innerImg = iconBox.querySelector('img');
    expect(innerImg).toBeInTheDocument();
    expect(innerImg).toHaveStyle('width: 16px');
    expect(innerImg).toHaveStyle('height: 23px');
  });

  it('hides all questions initially and does not show the Next arrow', () => {
    const { container } = render(
        <QuestionsList stage={stage} changeStage={changeStage} data={data} />
    );
    data.content.questionList.forEach(({ question }) => {
      const div = screen.getByText(question).parentElement;
      expect(div).toHaveClass('hide');
    });

    expect(container.querySelector('.forward-step > div')).toBeNull();
  });
});
