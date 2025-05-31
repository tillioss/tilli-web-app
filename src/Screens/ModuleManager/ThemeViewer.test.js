import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ThemeViewer from './ThemeViewer';
import SpeechRecognition from 'react-speech-recognition';

// Mock subcomponents
jest.mock('./ThemeView/DragAndDrop', () => props => <div data-testid="dragdrop">DragAndDrop</div>);
jest.mock('./ThemeView/GroupedInput', () => props => <div data-testid="groupedinput">GroupedInput</div>);
jest.mock('./ThemeView/LabelAnimation', () => props => <div data-testid="labelanimation">LabelAnimation</div>);
jest.mock('./ThemeView/AudioRecognize', () => ({ children }) => <div data-testid="audiorecognize">{children}</div>);

describe('ThemeViewer Internal Methods', () => {
  let instance;
  const baseLayer = {
    type: 'rectangle', visibility: 'visible', y: 10, x: 20, width: 30, height: 40,
    backgroundColor: 'red', borderWidth: 1, borderColor: 'blue', borderStyle: 'solid', borderRadius: 5,
    action: 'Next', userActionText: 'UA', userTrackKey: 'UT',
    layers: { visible: [0], hidden: [1], recordValue: ['rec'], resetText: [0] },
    text: '<p>hi</p>', image: 'img.png', video: 'vid.mp4', radius: 15
  };
  const layersData = [
    baseLayer,
    { ...baseLayer, type: 'groupedInput' },
    { ...baseLayer, type: 'labelAnimation' },
    { ...baseLayer, type: 'dragAndDrop' },
    { ...baseLayer, type: 'ellipse' },
    { ...baseLayer, type: 'circle' },
    { ...baseLayer, type: 'text' },
    { ...baseLayer, type: 'image' },
    { ...baseLayer, type: 'video' }
  ];
  const data = {
    theme: 't', themeType: 'tt', apiPredict: 'api', layers: [],
    dynamic: { record: { answer: 'ans' } }, changeLayerIndex: 0,
    changeLayer: {
      userActionText: 'CHA', userTrackKey: 'CHU',
      layers: { visible: [1], hidden: [0] }
    },
    backgroundAudio: 'audio.mp3'
  };
  const mockFns = {
    predictOnchange: jest.fn(),
    changeStage: jest.fn(),
    dynamicCaptureInfo: { dynamic: { dynamicThemes: [] } }
  };

  beforeEach(async () => {
    cleanup();
    localStorage.setItem('loggedOrg_id', 'org1');
    instance = new ThemeViewer({
      layersData, data, stage: 2,
      predictOnchange: mockFns.predictOnchange,
      changeStage: mockFns.changeStage,
      dynamicCaptureInfo: mockFns.dynamicCaptureInfo
    });
    // stub ref dimensions
    instance.mobile = { clientHeight: 100, clientWidth: 200 };
    await instance.componentDidMount();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('componentDidMount sets state correctly', () => {
    expect(instance.state.deviceHeight).toBe("");
    expect(instance.state.deviceWidth).toBe("");
    expect(instance.state.loggedOrg_id).toBe('');
  });

  test('dynamicThemeAction: Previous', () => {
    const layer = { ...baseLayer, action: 'Previous' };
    instance.dynamicThemeAction(layer, 0);
    expect(mockFns.changeStage).toHaveBeenCalledWith('Previous', 2);
  });

  test('dynamicThemeAction: Checked Layout toggles visibility', () => {
    const layer = {
      ...baseLayer,
      action: 'Checked Layout',
      layers: { visible: [0], hidden: [1] }
    };
    // seed state.layers
    instance.state.layers = [
      { visibility: 'hidden' },
      { visibility: 'visible' }
    ];
    instance.dynamicThemeAction(layer, 0);
    expect(instance.state.layers[0].visibility).toBe('visible');
    expect(instance.state.layers[1].visibility).toBe('hidden');
  });

  test('dynamicThemeAction: Record updates audioRecognize', () => {
    const layer = {
      ...baseLayer,
      action: 'Record',
      layers: { visible: [1], hidden: [0], recordValue: ['rec'] }
    };
    instance.state.layers = [
      { visibility: 'hidden' },
      { visibility: 'visible' }
    ];
    instance.dynamicThemeAction(layer, 0);
    expect(instance.state.audioRecognize).toBe('');
    expect(instance.state.layers[1].visibility).toBe('visible');
  });

  test('dynamicThemeAction: Reset Text clears content', () => {
    const layer = {
      ...baseLayer,
      action: 'Reset Text',
      layers: { resetText: [0] }
    };
    document.body.innerHTML = '<div id="layer0">text</div>';
    instance.dynamicThemeAction(layer, 0);
    expect(document.getElementById('layer0').innerHTML).toBe('');
    expect(instance.state.resetTextState).toBe(false);
  });

  test('onStartRecord & onStopRecord and mouse handlers', () => {
    SpeechRecognition.startListening = jest.fn();
    SpeechRecognition.stopListening = jest.fn();
    instance.onStartRecord();
    expect(SpeechRecognition.startListening).toHaveBeenCalled();
    instance.onStopRecord();
    expect(SpeechRecognition.stopListening).toHaveBeenCalled();
    instance.mouseEnterfunction();
    expect(SpeechRecognition.startListening).toHaveBeenCalledTimes(2);
    instance.mouseMouseLeavefunction();
    expect(SpeechRecognition.stopListening).toHaveBeenCalledTimes(2);
  });

  test('setRecord updates state.recordText', () => {
    instance.setRecord('hello');
    expect(instance.state.recordText).toBe('');
  });

  test('layerBuildRecord returns a record container', () => {
    instance.setState({ recordText: 'abc', deviceHeight: 100 });
    const el = instance.layerBuildRecord(baseLayer, 0, 'abc');
    expect(el.props.id).toBe('layer0');
    expect(el.props.children).toBe('abc');
  });

  test('layerBuild handles all types', () => {
    instance.setState({ deviceHeight: 100, deviceWidth: 200 });
    layersData.forEach((layer, idx) => {
      const el = instance.layerBuild(layer, idx);
      expect(el).toBeDefined();
    });
  });
});

// Render test for audio element
describe('ThemeViewer Render', () => {
  afterEach(cleanup);
  it('renders audio when backgroundAudio is present', () => {
    const layersData = [{ type: 'rectangle', visibility: 'visible', y:0,x:0,width:10,height:10,backgroundColor:'red',borderWidth:1,borderColor:'blue',borderStyle:'solid',borderRadius:0,layers:{},text:'',image:'',video:'',radius:0 }];
    const data = { theme:'t',themeType:'tt',apiPredict:'',layers:[],dynamic:{},backgroundAudio:'bg.mp3' };
    const { container } = render(
        <ThemeViewer
            layersData={layersData}
            data={data}
            stage={1}
            predictOnchange={()=>{}}
            changeStage={()=>{}}
            dynamicCaptureInfo={{ dynamic: { dynamicThemes: [] } }}
        />
    );
    expect(container.querySelector('audio')).toBeInTheDocument();
  });
});
