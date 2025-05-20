jest.mock('./Screens/Login', () => () => {
  return <div data-testid="login">Login Screen</div>;
});
jest.mock('./Component/AudioRecognize', () => () => {
  return <div data-testid="audio-recognize">AudioRecognize</div>;
});
jest.mock('./Screens/SignUp', () => () => {
  return <div data-testid="signup">SignUp</div>;
});
jest.mock('./Screens/Dashbord', () => () => {
  return <div data-testid="dashboard">Dashboard</div>;
});
jest.mock('./pages/ModuleScreen', () => () => {
  return <div data-testid="module">ModuleScreen</div>;
});
jest.mock('./Screens/ModuleManager/ModuleScreen_2', () => () => {
  return <div data-testid="module-two">ModuleScreen_2</div>;
});
jest.mock('./pages/ParentScreen', () => () => {
  return <div data-testid="parent">ParentScreen</div>;
});
jest.mock('./pages/Footer', () => () => {
  return <div data-testid="footer">Footer</div>;
});
jest.mock('./pages/HomeScreen', () => () => {
  return <div data-testid="home">HomeScreen</div>;
});
jest.mock('./pages/LevelScreen', () => () => {
  return <div data-testid="level">LevelScreen</div>;
});
jest.mock('./pages/ProfileScreen', () => () => {
  return <div data-testid="profile">ProfileScreen</div>;
});
jest.mock('./pages/ParentsHomeScreen', () => () => {
  return <div data-testid="parent-home">ParentsHomeScreen</div>;
});
jest.mock('./pages/ParentOnboardingScreen', () => () => {
  return <div data-testid="parent-onboarding">ParentOnboardingScreen</div>;
});
jest.mock('./pages/EmpathyScreen', () => () => {
  return <div data-testid="empathy">EmpathyScreen</div>;
});
jest.mock('./Screens/ForgotPassword', () => () => {
  return <div data-testid="forgot-password">ForgotPassword</div>;
});
jest.mock('./Screens/ForgotResetPassword', () => () => {
  return <div data-testid="forgot-reset-password">ForgotResetPassword</div>;
});
jest.mock('./Screens/QrCode', () => () => {
  return <div data-testid="qr-code">QrCode</div>;
});
jest.mock('./Screens/DemoUserLogin_2', () => () => {
  return <div data-testid="demo-user-login-two">DemoUserLogin_2</div>;
});
jest.mock('./Screens/UserManage', () => () => {
  return <div data-testid="user-manage">UserManage</div>;
});
jest.mock('./TilliYourWinning/WinningPage2', () => () => {
  return <div data-testid="winning-page-two">WinningPage2</div>;
});
jest.mock('./Screens/Manage', () => () => {
  return <div data-testid="manage">Manage</div>;
});
jest.mock('./Screens/ModuleManager/ModuleScreenMange', () => () => {
  return <div data-testid="module-screen-manage">ModuleScreenMange</div>;
});
jest.mock('./Screens/ModuleManager/GodotPlay', () => () => {
  return <div data-testid="godot-play">GodotPlay</div>;
});
jest.mock('./Screens/ModuleManager/GodotRedirect', () => () => {
  return <div data-testid="godot-redirect">GodotRedirect</div>;
});
jest.mock('./pages/NewParentsScreen', () => () => {
  return <div data-testid="new-parents">NewParentsScreen</div>;
});
jest.mock('./pages/TrackProgressScreen', () => () => {
  return <div data-testid="track-progression">TrackProgressScreen</div>;
});

jest.mock('./Screens/NotFoundPage', () => () => <div>404 Not Found</div>);

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const PROJECT_URL = '/tilli-web';

describe('App Routing Tests (no router wrapper)', () => {
  const setPath = (url) => {
    window.history.pushState({}, 'Test page', url);
  };

  it('renders Login at /tilli-web', () => {
    setPath(`${PROJECT_URL}`);
    render(<App />);
    const item = screen.queryByTestId('login');
    expect(item).not.toBeNull();
  });
  
  it('renders Audio Recognize at /tilli-web', () => {
    setPath(`${PROJECT_URL}/audiotest`);
    render(<App />);
    const item = screen.queryByTestId('audio-recognize');
    expect(item).not.toBeNull();
  });
  
  it('renders Signup at /tilli-web', () => {
    setPath(`${PROJECT_URL}/signup`);
    render(<App />);
    const item = screen.queryByTestId('signup');
    expect(item).not.toBeNull();
  });
  
  it('renders Dashboard at /tilli-web', () => {
    setPath(`${PROJECT_URL}/Dashbord`);
    render(<App />);
    const item = screen.queryByTestId('dashboard');
    expect(item).not.toBeNull();
  });
  
  it('renders ModuleScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/oldmodule/10/12/14`);
    render(<App />);
    const item = screen.queryByTestId('module');
    expect(item).not.toBeNull();
  });
  
  it('renders ModuleScreenTwo at /tilli-web', () => {
    setPath(`${PROJECT_URL}/module/10/12/14`);
    render(<App />);
    const item = screen.queryByTestId('module-two');
    expect(item).not.toBeNull();
  });
 
  it('renders ParentsScreen and Footer at /tilli-web', () => {
    setPath(`${PROJECT_URL}/Parent`);
    render(<App />);
    const itemOne = screen.queryByTestId('parent');
    const itemTwo = screen.queryByTestId('footer');
    expect(itemOne).not.toBeNull();
    expect(itemTwo).not.toBeNull();
  });
  
  it('renders HomeScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/home/10`);
    render(<App />);
    const item = screen.queryByTestId('home');
    expect(item).not.toBeNull();
  });

  it('renders LevelScreen and Footer at /tilli-web', () => {
    setPath(`${PROJECT_URL}/levels`);
    render(<App />);
    const itemOne = screen.queryByTestId('level');
    const itemTwo = screen.queryByTestId('footer');
    expect(itemOne).not.toBeNull();
    expect(itemTwo).not.toBeNull();
  });
  
  it('renders ProfileScreen and Footer at /tilli-web', () => {
    setPath(`${PROJECT_URL}/profile`);
    render(<App />);
    const itemOne = screen.queryByTestId('profile');
    const itemTwo = screen.queryByTestId('footer');
    expect(itemOne).not.toBeNull();
    expect(itemTwo).not.toBeNull();
  });

  it('renders ParentsHomeScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/Parenthome`);
    render(<App />);
    const item = screen.queryByTestId('parent-home');
    expect(item).not.toBeNull();
  });
  
  it('renders ParentsHomeScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/Parenthome`);
    render(<App />);
    const item = screen.queryByTestId('parent-home');
    expect(item).not.toBeNull();
  });
  
  it('renders ParentOnboardingScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/ParentOnboarding`);
    render(<App />);
    const item = screen.queryByTestId('parent-onboarding');
    expect(item).not.toBeNull();
  });
  
  it('renders EmpathyScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/Empathy`);
    render(<App />);
    const item = screen.queryByTestId('empathy');
    expect(item).not.toBeNull();
  });
  
  it('renders ForgotPassword at /tilli-web', () => {
    setPath(`${PROJECT_URL}/ForgotPassword`);
    render(<App />);
    const item = screen.queryByTestId('forgot-password');
    expect(item).not.toBeNull();
  });
  
  it('renders ForgotResetPassword at /tilli-web', () => {
    setPath(`${PROJECT_URL}/updatepassword/10/12`);
    render(<App />);
    const item = screen.queryByTestId('forgot-reset-password');
    expect(item).not.toBeNull();
  });
  
  it('renders Login at /tilli-web', () => {
    setPath(`${PROJECT_URL}/lego`);
    render(<App />);
    const item = screen.queryByTestId('login');
    expect(item).not.toBeNull();
  });
  
  it('renders HomeScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/lego/home/10`);
    render(<App />);
    const item = screen.queryByTestId('home');
    expect(item).not.toBeNull();
  });
  
  it('renders ModuleScreenTwo at /tilli-web', () => {
    setPath(`${PROJECT_URL}/lego/module/1/2/3`);
    render(<App />);
    const item = screen.queryByTestId('module-two');
    expect(item).not.toBeNull();
  });
  
  it('renders LevelScreen and Footer at /tilli-web', () => {
    setPath(`${PROJECT_URL}/lego/levels`);
    render(<App />);
    const itemOne = screen.queryByTestId('level');
    const itemTwo = screen.queryByTestId('footer');
    expect(itemOne).not.toBeNull();
    expect(itemTwo).not.toBeNull();
  });
  
  it('renders ParentScreen and Footer at /tilli-web', () => {
    setPath(`${PROJECT_URL}/lego/Parent`);
    render(<App />);
    const itemOne = screen.queryByTestId('parent');
    const itemTwo = screen.queryByTestId('footer');
    expect(itemOne).not.toBeNull();
    expect(itemTwo).not.toBeNull();
  });
  
  it('renders ProfileScreen and Footer at /tilli-web', () => {
    setPath(`${PROJECT_URL}/lego/profile`);
    render(<App />);
    const itemOne = screen.queryByTestId('profile');
    const itemTwo = screen.queryByTestId('footer');
    expect(itemOne).not.toBeNull();
    expect(itemTwo).not.toBeNull();
  });

  it('renders ParentsHomeScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/lego/Parenthome`);
    render(<App />);
    const item = screen.queryByTestId('parent-home');
    expect(item).not.toBeNull();
  });
  
  it('renders ParentOnboardingScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/lego/ParentOnboarding`);
    render(<App />);
    const item = screen.queryByTestId('parent-onboarding');
    expect(item).not.toBeNull();
  });
  
  it('renders EmpathyScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/lego/Empathy`);
    render(<App />);
    const item = screen.queryByTestId('empathy');
    expect(item).not.toBeNull();
  });
  
  it('renders QrCode at /tilli-web', () => {
    setPath(`${PROJECT_URL}/qrcode`);
    render(<App />);
    const item = screen.queryByTestId('qr-code');
    expect(item).not.toBeNull();
  });
  
  it('renders DemoUserLoginTwo at /tilli-web', () => {
    setPath(`${PROJECT_URL}/demoflow/male/15/10/en`);
    render(<App />);
    const item = screen.queryByTestId('demo-user-login-two');
    expect(item).not.toBeNull();
  });
  
  it('renders DemoUserLoginTwo at /tilli-web', () => {
    setPath(`${PROJECT_URL}/demo`);
    render(<App />);
    const item = screen.queryByTestId('demo-user-login-two');
    expect(item).not.toBeNull();
  });
  
  it('renders DemoUserLoginTwo at /tilli-web', () => {
    setPath(`${PROJECT_URL}/redirect-demo`);
    render(<App />);
    const item = screen.queryByTestId('demo-user-login-two');
    expect(item).not.toBeNull();
  });
  
  it('renders UserManage at /tilli-web', () => {
    setPath(`${PROJECT_URL}/internal-demo`);
    render(<App />);
    const item = screen.queryByTestId('user-manage');
    expect(item).not.toBeNull();
  });
  
  it('renders WinningPage2 at /tilli-web', () => {
    setPath(`${PROJECT_URL}/winningPage2`);
    render(<App />);
    const item = screen.queryByTestId('winning-page-two');
    expect(item).not.toBeNull();
  });
  
  it('renders Manage at /tilli-web', () => {
    setPath(`${PROJECT_URL}/manage`);
    render(<App />);
    const item = screen.queryByTestId('manage');
    expect(item).not.toBeNull();
  });
  
  it('renders Manage at /tilli-web', () => {
    setPath(`${PROJECT_URL}/general-demo`);
    render(<App />);
    const item = screen.queryByTestId('manage');
    expect(item).not.toBeNull();
  });
  
  it('renders ModuleScreenMange at /tilli-web', () => {
    setPath(`${PROJECT_URL}/module-manage/1/2/3/4`);
    render(<App />);
    const item = screen.queryByTestId('module-screen-manage');
    expect(item).not.toBeNull();
  });
  
  it('renders GodotPlay at /tilli-web', () => {
    setPath(`${PROJECT_URL}/godotplay/1/2/3`);
    render(<App />);
    const item = screen.queryByTestId('godot-play');
    expect(item).not.toBeNull();
  });
  
  it('renders GodotRedirect at /tilli-web', () => {
    setPath(`${PROJECT_URL}/godot-redirect/1`);
    render(<App />);
    const item = screen.queryByTestId('godot-redirect');
    expect(item).not.toBeNull();
  });
  
  it('renders NewParentsScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/newparentsscreen`);
    render(<App />);
    const item = screen.queryByTestId('new-parents');
    expect(item).not.toBeNull();
  });
  
  it('renders TrackProgressScreen at /tilli-web', () => {
    setPath(`${PROJECT_URL}/trackprogressscreen`);
    render(<App />);
    const item = screen.queryByTestId('track-progression');
    expect(item).not.toBeNull();
  });

  it('renders 404 screen at unknown path', () => {
    setPath(`${PROJECT_URL}/unknown`);
    render(<App />);
    expect(screen.queryByText(/404/i)).not.toBeNull();
  });

  it('applies mobile-responsive-ios class on iPhone user agent', () => {
  const originalAppVersion = window.navigator.appVersion;
  Object.defineProperty(window.navigator, 'appVersion', {
    value: 'iPhone OS 14_2 like Mac OS X',
    configurable: true
  });

  setPath(`${PROJECT_URL}/Parent`);
  render(<App />);

  const wrapper = screen.getByTestId('parent').parentElement;
  expect(wrapper.className).toMatch(/mobile-responsive-ios/);

  // Restore original value
  Object.defineProperty(window.navigator, 'appVersion', {
    value: originalAppVersion,
    configurable: true
  });
});

});
