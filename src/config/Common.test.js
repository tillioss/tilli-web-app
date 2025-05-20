import * as Common from '../config/Common';
import MyConstant from '../config/MyConstant';

global.fetch = jest.fn();

jest.mock('../pages/tilli-game-web/json/input.json', () => [
  { screenName: 'testScreen', content: 'hello' }
]);


describe('Common Utilities', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('doGetConnect calls fetch with correct URL and method', async () => {
    const mockData = { result: 'success' };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const result = await Common.doGetConnect('/endpoint');
    expect(fetch).toHaveBeenCalledWith(MyConstant.keyList.apiURL + '/endpoint', expect.objectContaining({
      method: 'GET'
    }));
    expect(result).toEqual(mockData);
  });

  test('isObject returns true only for objects', () => {
    expect(Common.isObject({})).toBe(true);
    expect(Common.isObject([])).toBe(true);
    expect(Common.isObject('str')).toBe(false);
    expect(Common.isObject(null)).toBe(false);
  });

  test('removeValueFromArray removes specified values', () => {
    expect(Common.removeValueFromArray([1, 2, 3, 2], 2)).toEqual([1, 3]);
  });

  test('checkNullAndReturnString behaves correctly', () => {
    expect(Common.checkNullAndReturnString(null)).toBe(false);
    expect(Common.checkNullAndReturnString(undefined)).toBe(false);
    expect(Common.checkNullAndReturnString("")).toBe(false);
    expect(Common.checkNullAndReturnString("text")).toBe(true);
  });

  test('doFileConnect makes a POST request with form data', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ response: 'ok' }),
    });

    const input = {
      file: new Blob(['file']),
      fileName: 'test.txt',
      processType: 'upload',
      docsId: '123',
      fileType: 'text'
    };

    await Common.doFileConnect(input);
    expect(fetch).toHaveBeenCalled();
  });

  test('doConnect sends correct fetch request', async () => {
    const response = { success: true };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    const data = await Common.doConnect('submit', 'POST', { x: 1 });
    expect(data).toEqual(response);
  });

  test('timeConverter returns formatted date string', () => {
    const result = Common.timeConverter(1609459200000);
    expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/); 
  });

  test('getMonthAndDate returns correct date', () => {
    const date = new Date('2023-08-12');
    expect(Common.getMonthAndDate(date.getTime())).toContain('Aug');
    expect(Common.getMonthAndDate(date.getTime(), true)).toMatch(/Saturday, Aug 12/);
  });

  test('userTrack logs actions when not on localhost', async () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { hostname: 'example.com' };

    localStorage.setItem("ipAddress", "127.0.0.1");
    const result = await Common.userTrack("page", "click");
    expect(result).toEqual({});

    window.location = originalLocation;
  });

  test('getMyIp fetches IP address', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ ip: "192.168.1.1" }),
    });

    const ip = await Common.getMyIp();
    expect(ip).toBe("192.168.1.1");
  });

  test('keyReadData returns correct object from event list', () => {
    const list = [{ key: 'abc', value: 123 }];
    expect(Common.keyReadData(list, 'abc')).toEqual(list[0]);
    expect(Common.keyReadData(list, 'def')).toEqual({});
  });

  test('readJsonFile returns screen object from inputJson', () => {
    const mockJson = [{ screenName: 'testScreen', content: 'hello' }];
    jest.mock('../pages/tilli-game-web/json/input.json', () => mockJson, { virtual: true });
    expect(Common.readJsonFile('testScreen').content).toBe("hello");
  });

  test('date_YY_MM_DD formats timestamp', () => {
    expect(Common.date_YY_MM_DD(1609459200000)).toBe('2021-01-01');
  });

  test('doConnectPredict makes fetch request and returns data', async () => {
    const response = { prediction: true };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    const result = await Common.doConnectPredict('https://example.com', 'POST', { input: 'x' });
    expect(result).toEqual(response);
  });

  test('doFileConnect skips fetch when dataJson is empty', async () => {
  await Common.doFileConnect({});
  expect(fetch).not.toHaveBeenCalled();
});

test('doConnect handles fetch failure', async () => {
  fetch.mockRejectedValueOnce(new Error('Network Error'));

  await expect(Common.doConnect('fail', 'POST', {})).rejects.toThrow('Network Error');
});

test('doConnectPredict handles fetch failure', async () => {
  fetch.mockRejectedValueOnce(new Error('Timeout'));

  await expect(Common.doConnectPredict('https://fail.com', 'POST', {})).rejects.toThrow('Timeout');
});

test('userTrack skips logging on localhost', async () => {
  const originalLocation = window.location;
  delete window.location;
  window.location = { hostname: 'localhost' };

  const result = await Common.userTrack("page", "action");
  expect(result).toEqual({});

  window.location = originalLocation;
});

test('userTrack fetches IP if not in localStorage', async () => {
  const originalLocation = window.location;
  delete window.location;
  window.location = { hostname: 'domain.com' };

  localStorage.removeItem("ipAddress");
  fetch.mockResolvedValueOnce({ json: () => Promise.resolve({ ip: '123.123.123.123' }) });

  await Common.userTrack("page", "action");
  expect(fetch).toHaveBeenCalled();

  window.location = originalLocation;
});

test('keyReadData returns empty object when key not found', () => {
  expect(Common.keyReadData([], 'missing')).toEqual({});
});

test('readJsonFile returns screen object', () => {
  const data = Common.readJsonFile('testScreen');
  expect(data).toEqual({ screenName: 'testScreen', content: 'hello' });
});

test('readJsonFile returns empty object for unknown screen', () => {
  const data = Common.readJsonFile('unknown');
  expect(data).toEqual({});
});


test('checkNullAndReturnString with whitespace returns true', () => {
  expect(Common.checkNullAndReturnString('   ')).toBe(true);
});

test('getMonthAndDate handles timestamp of 0', () => {
  expect(Common.getMonthAndDate(0)).toMatch(/Jan 1/);
});


});
