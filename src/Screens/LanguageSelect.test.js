import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import LanguageSelect from './LanguageSelect';
import * as Common from '../config/Common';

jest.mock('../config/Common', () => ({
  doConnect: jest.fn(),
}));

const { WrappedComponent } = LanguageSelect;

describe('LanguageSelect Unconnected Component', () => {
  let props;

  beforeEach(() => {
    props = {
      fetchGetLanguageMappingData: jest.fn(),
      fetchGetLevelNameLanguageMapping: jest.fn(),
      outerGroupLanguageMappingData: [],
      outerGroupLanguageBaseData: [],
      innnerGroupLanguageBaseData: [],
      innerGroupLanguageMappingData: [],
      commonGroupLanguageMappingData: [],
      commonGroupLanguageBaseData: []
    };
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('fetches languages, renders options, and auto-selects English', async () => {
    Common.doConnect.mockResolvedValueOnce({ response: JSON.stringify({ en: 'English', si: 'Sinhala' }) });

    render(<WrappedComponent {...props} />);

    await waitFor(() => expect(Common.doConnect).toHaveBeenCalledWith('getLanguages', 'POST', { sessionId: '1223' }));

    await waitFor(() => expect(screen.getByText('English')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Sinhala')).toBeInTheDocument());

    await waitFor(() => expect(props.fetchGetLanguageMappingData).toHaveBeenCalledTimes(3));
    expect(props.fetchGetLevelNameLanguageMapping).toHaveBeenCalledTimes(1);

    expect(localStorage.getItem('currentLanguage')).toBe('en');
    expect(JSON.parse(localStorage.getItem('ChooseLanguage'))).toEqual({ label: 'English', value: 'en' });
  });

  it('changes language on clicking option and re-dispatches mappings', async () => {
    Common.doConnect.mockResolvedValueOnce({ response: JSON.stringify({ en: 'English', si: 'Sinhala' }) });

    render(<WrappedComponent {...props} />);

    await waitFor(() => expect(screen.getByText('Sinhala')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Sinhala'));

    await waitFor(() => expect(props.fetchGetLanguageMappingData).toHaveBeenCalledTimes(6));
    expect(props.fetchGetLevelNameLanguageMapping).toHaveBeenCalledTimes(2);

    expect(localStorage.getItem('currentLanguage')).toBe('si');
    expect(JSON.parse(localStorage.getItem('ChooseLanguage'))).toEqual({ label: 'Sinhala', value: 'si' });
  });

  it('handles invalid getLanguages response gracefully', async () => {
    Common.doConnect.mockResolvedValueOnce({});
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<WrappedComponent {...props} />);

    await waitFor(() => expect(Common.doConnect).toHaveBeenCalled());

    expect(screen.queryByText('English')).toBeNull();

    console.warn.mockRestore();
  });
});
