import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import IntroducePersons from './IntroducePersons';

jest.mock('../../config/MyConstant', () => ({
  keyList: { apiURL: 'http://api/' },
}));
jest.mock('react-router-dom', () => ({
  Link: ({ children, onClick }) => <div onClick={onClick}>{children}</div>,
}));

function renderWithState(ui, { state }) {
  const store = createStore(() => state, state);
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('IntroducePersons', () => {
  const stage = 2;
  const changeStage = jest.fn();
  const persons = [
    {
      name: 'Alice',
      says: 'Hello there',
      imageBg: 'red',
      bg: 'blue',
      image: { fileName: 'alice', fileType: 'png' },
    },
    {
      name: 'Bob',
      says: 'Good day',
      imageBg: 'green',
      bg: 'yellow',
      image: { fileName: 'bob', fileType: 'jpg' },
    },
  ];
  const data = { title: 'Team Intro', content: { persons } };

  const baseMapping = [
    null,
    { fieldData: [{ value: 'unused' }, { value: 'BASE' }] },
  ];
  const mappingData = [
    null,
    { fieldData: [{ value: 'unused' }, { value: 'MAPPED' }] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    window.innerHeight = 600;
  });

  it('renders title and both persons', () => {
    const state = {
      languageReducer: {
        commonGroupLanguageMappingData: mappingData,
        commonGroupLanguageBaseData: baseMapping,
      },
    };
    const { getByText } = renderWithState(
        <IntroducePersons
            stage={stage}
            changeStage={changeStage}
            data={data}
        />,
        { state }
    );
    expect(getByText('Team Intro')).toBeInTheDocument();
    expect(getByText('MAPPED Alice')).toBeInTheDocument();
    expect(getByText('Hello there')).toBeInTheDocument();
    expect(getByText('MAPPED Bob')).toBeInTheDocument();
    expect(getByText('Good day')).toBeInTheDocument();
  });

  it('falls back to base data when mapping is missing', () => {
    const state = {
      languageReducer: {
        commonGroupLanguageMappingData: [null, null],
        commonGroupLanguageBaseData: baseMapping,
      },
    };
    const { getByText } = renderWithState(
        <IntroducePersons
            stage={stage}
            changeStage={changeStage}
            data={data}
        />,
        { state }
    );
    expect(getByText('BASE Alice')).toBeInTheDocument();
    expect(getByText('BASE Bob')).toBeInTheDocument();
  });

  it('returns empty string when neither mapping nor base exists', () => {
    const state = {
      languageReducer: {
        commonGroupLanguageMappingData: [],
        commonGroupLanguageBaseData: [],
      },
    };
    const { getAllByText } = renderWithState(
        <IntroducePersons
            stage={stage}
            changeStage={changeStage}
            data={data}
        />,
        { state }
    );

    expect(getAllByText('Alice').length).toBeGreaterThan(0);
    expect(getAllByText('Bob').length).toBeGreaterThan(0);
  });

  it('constructs correct image src and styles for each person', () => {
    const state = {
      languageReducer: {
        commonGroupLanguageMappingData: mappingData,
        commonGroupLanguageBaseData: baseMapping,
      },
    };
    const { container } = renderWithState(
        <IntroducePersons
            stage={stage}
            changeStage={changeStage}
            data={data}
        />,
        { state }
    );
    const imgs = container.querySelectorAll('img');
    const [_, imgA, imgB] = imgs;
    expect(imgA.src).toBe('http://api/vp?action=module&key=alice&id=png');
    expect(imgA.style.width).toBe('100px');
    expect(imgA.style.marginTop).toBe('-10px');
    expect(imgB.src).toBe('http://api/vp?action=module&key=bob&id=jpg');
    expect(imgB.style.height).toBe('90px');
    expect(imgB.style.marginTop).toBe('');
  });

  it('calls changeStage with Previous and Next', () => {
    const state = {
      languageReducer: {
        commonGroupLanguageMappingData: mappingData,
        commonGroupLanguageBaseData: baseMapping,
      },
    };
    const { container } = renderWithState(
        <IntroducePersons stage={stage} changeStage={changeStage} data={data} />,
        { state }
    );

    const backBtn = container.querySelector('.col-2 > div');
    fireEvent.click(backBtn);

    const nextBtn = container.querySelector('.forward-step > div');
    fireEvent.click(nextBtn);

    expect(changeStage).toHaveBeenCalledWith('Previous', stage);
    expect(changeStage).toHaveBeenCalledWith('Next', stage);
  });
});
