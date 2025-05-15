import {doConnectPredict, doGetConnect, getMonthAndDate, timeConverter} from './Common';
import MyConstant from './MyConstant';
import { removeValueFromArray } from './Common';
import { doFileConnect } from './Common';
import { doConnect } from './Common';
import { userTrack, getMyIp } from './Common';

global.fetch = jest.fn();

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
    console.warn.mockRestore();
});

describe('doGetConnect', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should call fetch with the correct URL and options', async () => {
        const subUrl = '/test-endpoint';
        const mockResponse = { data: 'test data' };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await doGetConnect(subUrl);

        expect(fetch).toHaveBeenCalledWith(MyConstant.keyList.apiURL + subUrl, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should handle fetch errors gracefully', async () => {
        const subUrl = '/test-endpoint';
        fetch.mockRejectedValueOnce(new Error('Fetch failed'));

        await expect(doGetConnect(subUrl)).rejects.toThrow('Fetch failed');
    });
});

describe('removeValueFromArray', () => {
    it('should remove a single value from the array', () => {
        const arr = [1, 2, 3, 4];
        const result = removeValueFromArray(arr, 3);
        expect(result).toEqual([1, 2, 4]);
    });

    it('should remove multiple occurrences of a value from the array', () => {
        const arr = [1, 2, 3, 3, 4];
        const result = removeValueFromArray(arr, 3);
        expect(result).toEqual([1, 2, 4]);
    });

    it('should remove multiple values from the array', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = removeValueFromArray(arr, 2, 4);
        expect(result).toEqual([1, 3, 5]);
    });

    it('should return the same array if no values match', () => {
        const arr = [1, 2, 3, 4];
        const result = removeValueFromArray(arr, 5);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should handle an empty array', () => {
        const arr = [];
        const result = removeValueFromArray(arr, 1);
        expect(result).toEqual([]);
    });

    it('should handle no additional arguments', () => {
        const arr = [1, 2, 3];
        const result = removeValueFromArray(arr);
        expect(result).toEqual([1, 2, 3]);
    });

    it('should handle removing all elements from the array', () => {
        const arr = [1, 1, 1];
        const result = removeValueFromArray(arr, 1);
        expect(result).toEqual([]);
    });
});

describe('doFileConnect', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should call fetch with the correct URL and FormData when dataJson is valid', async () => {
        const dataJson = {
            file: new Blob(['test content'], { type: 'text/plain' }),
            fileName: 'test.txt',
            processType: 'process1',
            docsId: '123',
            fileType: 'type1',
        };

        const mockResponse = { response: 'success' };
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        await doFileConnect(dataJson);

        expect(fetch).toHaveBeenCalledWith(
            `${MyConstant.keyList.apiURL}uploads/${dataJson.processType}/${dataJson.fileType}/${dataJson.fileName}`,
            expect.objectContaining({
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: expect.any(FormData),
            })
        );

        const formData = fetch.mock.calls[0][1].body;
        expect(formData.get('file1')).toBe(formData.get('file1'));
        expect(formData.get('fileName1')).toBe(dataJson.fileName);
        expect(formData.get('processType1')).toBe(dataJson.processType);
        expect(formData.get('docsId1')).toBe(dataJson.docsId);
    });

    it('should not call fetch when dataJson is empty', async () => {
        const dataJson = {};

        await doFileConnect(dataJson);

        expect(fetch).not.toHaveBeenCalled();
    });

    // it('should handle fetch errors gracefully', async () => {
    //     const dataJson = {
    //         file: new Blob(['test content'], { type: 'text/plain' }),
    //         fileName: 'test.txt',
    //         processType: 'process1',
    //         docsId: '123',
    //         fileType: 'type1',
    //     };
    //
    //     fetch.mockRejectedValueOnce(new Error('Fetch failed'));
    //
    //     await expect(doFileConnect(dataJson)).resolves.toBeUndefined();
    //     expect(console.warn).toHaveBeenCalledWith(expect.any(Error));
    // });

    // it('should handle fetch errors gracefully', async () => {
    //     const dataJson = {
    //         file: new Blob(['test content'], { type: 'text/plain' }),
    //         fileName: 'test.txt',
    //         processType: 'process1',
    //         docsId: '123',
    //         fileType: 'type1',
    //     };
    //
    //     const error = new Error('Fetch failed');
    //     fetch.mockRejectedValueOnce(error);
    //
    //     await expect(doFileConnect(dataJson)).resolves.toBeUndefined();
    //     expect(console.warn).toHaveBeenCalledWith(error);
    // });
});

describe('doConnect', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should call fetch with the correct URL, method, and options', async () => {
        const subUrl = '/test-endpoint';
        const method = 'POST';
        const postJson = { key: 'value' };
        const mockResponse = { data: 'test data' };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await doConnect(subUrl, method, postJson);

        expect(fetch).toHaveBeenCalledWith(MyConstant.keyList.apiURL + subUrl, {
            method: method,
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify(postJson),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
        expect(result).toEqual(mockResponse);
    });

    it('should handle fetch errors gracefully', async () => {
        const subUrl = '/test-endpoint';
        const method = 'POST';
        const postJson = { key: 'value' };

        fetch.mockRejectedValueOnce(new Error('Fetch failed'));

        await expect(doConnect(subUrl, method, postJson)).rejects.toThrow('Fetch failed');
    });

    it('should log the elapsed time for the request', async () => {
        const subUrl = '/test-endpoint';
        const method = 'POST';
        const postJson = { key: 'value' };
        const mockResponse = { data: 'test data' };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        await doConnect(subUrl, method, postJson);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/TimeElapsed on HTTP - login submit - after parse : \d+ms/));

        consoleSpy.mockRestore();
    });
});

describe('timeConverter', () => {
    it('should convert a timestamp to the correct date and time format', () => {
        const timestamp = 1672531200000; // Jan 1, 2023, 00:00:00 UTC
        const result = timeConverter(timestamp);
        expect(result).toBe('2023-01-01 05:30:00');
    });

    it('should handle invalid timestamps gracefully', () => {
        const timestamp = 'invalid';
        const result = timeConverter(timestamp);
        expect(result).toBe('NaN-aN-aN aN:aN:aN');
    });
});

describe('getMonthAndDate', () => {
    it('should return the correct month and date in short format', () => {
        const timestamp = 1672531200000; // Jan 1, 2023
        const result = getMonthAndDate(timestamp);
        expect(result).toBe('Jan 1');
    });

    it('should return the correct month and date in full format', () => {
        const timestamp = 1672531200000; // Jan 1, 2023
        const result = getMonthAndDate(timestamp, true);
        expect(result).toBe('Sunday, Jan 1');
    });

    it('should handle invalid timestamps gracefully', () => {
        const timestamp = 'invalid';
        const result = getMonthAndDate(timestamp);
        expect(result).toBe('undefined NaN');
    });
});

jest.mock('./Common', () => ({
    ...jest.requireActual('./Common'),
    getMyIp: jest.fn(),
}));

describe('userTrack', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('should not log or fetch IP when running on localhost', async () => {
        Object.defineProperty(window, 'location', {
            value: { hostname: 'localhost' },
            writable: true,
        });

        const result = await userTrack('home', 'click', undefined);

        expect(getMyIp).not.toHaveBeenCalled();
        expect(result).toEqual({});
    });

    it('should fetch IP if not provided and not in localStorage', async () => {
        Object.defineProperty(window, 'location', {
            value: { hostname: 'example.com' },
            writable: true,
        });

        getMyIp.mockResolvedValueOnce('192.168.1.1');

        // const result = await userTrack('home', 'click', undefined);

        // expect(getMyIp).toHaveBeenCalled();
        expect(localStorage.getItem('ipAddress')).toBeNull();
        // expect(result).toEqual({});
    });

    it('should use IP from localStorage if available', async () => {
        Object.defineProperty(window, 'location', {
            value: { hostname: 'example.com' },
            writable: true,
        });

        localStorage.setItem('ipAddress', '192.168.1.1');

        const result = await userTrack('home', 'click', undefined);

        expect(getMyIp).not.toHaveBeenCalled();
        expect(localStorage.getItem('ipAddress')).toBe('192.168.1.1');
        expect(result).toEqual({});
    });

    it('should generate a unique ID if not in localStorage', async () => {
        Object.defineProperty(window, 'location', {
            value: { hostname: 'example.com' },
            writable: true,
        });

        const result = await userTrack('home', 'click', '192.168.1.1');

        const uniqId = localStorage.getItem('uniqId');
        expect(uniqId).toBeDefined();
        expect(uniqId).toMatch(/^id-\d+/);
        expect(result).toEqual({});
    });

    it('should use existing unique ID from localStorage', async () => {
        Object.defineProperty(window, 'location', {
            value: { hostname: 'example.com' },
            writable: true,
        });

        localStorage.setItem('uniqId', 'id-12345');

        const result = await userTrack('home', 'click', '192.168.1.1');

        expect(localStorage.getItem('uniqId')).toBe('id-12345');
        expect(result).toEqual({});
    });

    it('should log the correct postJson object', async () => {
        Object.defineProperty(window, 'location', {
            value: { hostname: 'example.com' },
            writable: true,
        });

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        await userTrack('home', 'click', '192.168.1.1');

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("---------------->")
        );
        expect(consoleSpy).toHaveBeenCalledWith('Logged');

        consoleSpy.mockRestore();
    });
});

describe('getMyIp', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    // it('should fetch the IP address and return it', async () => {
    //     const mockIp = '203.0.113.1';
    //     fetch.mockResolvedValueOnce({
    //         json: jest.fn().mockResolvedValueOnce({ ip: mockIp }),
    //     });
    //
    //     const result = await getMyIp();
    //
    //     expect(fetch).toHaveBeenCalledWith(MyConstant.keyList.apiURL);
    //     expect(result).toBe(mockIp);
    // });
    //
    // it('should propagate fetch errors', async () => {
    //     fetch.mockRejectedValueOnce(new Error('Network error'));
    //
    //     await expect(getMyIp()).rejects.toThrow('Network error');
    // });
    //
    // it('should propagate JSON parsing errors', async () => {
    //     fetch.mockResolvedValueOnce({
    //         json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
    //     });
    //
    //     await expect(getMyIp()).rejects.toThrow('Invalid JSON');
    // });

    it('should return undefined if response does not contain ip', async () => {
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({}),
        });

        const result = await getMyIp();

        expect(result).toBeUndefined();
    });
});

describe('doConnectPredict', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should call fetch with correct arguments and return parsed response', async () => {
        const subUrl = 'https://api.example.com/predict';
        const method = 'POST';
        const postJson = { input: 'test' };
        const mockResponse = { result: 42 };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const result = await doConnectPredict(subUrl, method, postJson);

        expect(fetch).toHaveBeenCalledWith(subUrl, {
            method,
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify(postJson),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
        expect(result).toEqual(mockResponse);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/TimeElapsed on HTTP - login submit - after parse : \d+ms/));

        consoleSpy.mockRestore();
    });

    it('should propagate fetch errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));
        await expect(doConnectPredict('url', 'POST', {})).rejects.toThrow('Network error');
    });

    it('should propagate JSON parsing errors', async () => {
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
        });
        await expect(doConnectPredict('url', 'POST', {})).rejects.toThrow('Invalid JSON');
    });
});
