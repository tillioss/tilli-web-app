describe('reportWebVitals', () => {
  beforeEach(() => {
    jest.resetModules(); // Clear module registry
    jest.clearAllMocks(); // Reset mocks between tests
  });

  it('should do nothing if onPerfEntry is not a function', async () => {
    jest.mock('web-vitals', () => {
      const mockGetCLS = jest.fn();
      const mockGetFID = jest.fn();
      const mockGetFCP = jest.fn();
      const mockGetLCP = jest.fn();
      const mockGetTTFB = jest.fn();

      return {
        getCLS: mockGetCLS,
        getFID: mockGetFID,
        getFCP: mockGetFCP,
        getLCP: mockGetLCP,
        getTTFB: mockGetTTFB,
      };
    });

    const reportWebVitals = (await import('./reportWebVitals')).default;
    const webVitals = await import('web-vitals');

    reportWebVitals(null);
    reportWebVitals('invalid');
    reportWebVitals(undefined);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(webVitals.getCLS).not.toHaveBeenCalled();
    expect(webVitals.getFID).not.toHaveBeenCalled();
    expect(webVitals.getFCP).not.toHaveBeenCalled();
    expect(webVitals.getLCP).not.toHaveBeenCalled();
    expect(webVitals.getTTFB).not.toHaveBeenCalled();
  });
});
