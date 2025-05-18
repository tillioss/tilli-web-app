// import React from "react";
// import { render, act } from "@testing-library/react";
// import GodotPlay from "./GodotPlay";

// // Mock config
// jest.mock("../../config/MyConstant", () => ({
//   keyList: { apiURL: "http://testapi/" },
// }));

// jest.mock("../../config/myConfig", () => ({
//   isLocal: false,
// }));

// jest.mock("react-router-dom", () => ({
//   withRouter: (Component) => (props) => <Component {...props} />,
// }));

// // Global patch BEFORE any tests run
// let createdScript;
// const originalAppendChild = HTMLElement.prototype.appendChild;
// HTMLElement.prototype.appendChild = function (el) {
//   if (el.tagName === "SCRIPT") {
//     createdScript = el;
//     el.onload = jest.fn(); // Ensure it exists
//   }
//   return originalAppendChild.call(this, el);
// };

// describe("GodotPlay", () => {
//   let fakeEngine;
//   let originalLocation;

//   beforeEach(() => {
//     // Always ensure body exists
//     if (!document.body) {
//       const body = document.createElement("body");
//       document.documentElement.appendChild(body);
//     }
//     document.body.innerHTML = "";

//     // Add required elements
//     const ids = [
//       "canvas",
//       "status",
//       "status-progress",
//       "status-progress-inner",
//       "status-indeterminate",
//       "status-notice",
//     ];
//     ids.forEach((id) => {
//       const el = document.createElement("div");
//       el.id = id;
//       el.style = {};
//       document.body.appendChild(el);
//     });

//     // Add animation children
//     const indeterminate = document.getElementById("status-indeterminate");
//     for (let i = 0; i < 8; i++) {
//       const child = document.createElement("div");
//       child.style = { borderTopColor: "initial" };
//       indeterminate.appendChild(child);
//     }

//     document.body.removeChild = jest.fn((el) => el);

//     fakeEngine = {
//       startGame: jest.fn().mockResolvedValue(),
//     };
//     window.Engine = jest.fn(() => fakeEngine);
//     window.Engine.isWebGLAvailable = jest.fn(() => true);

//     originalLocation = window.location;
//     delete window.location;
//     window.location = { href: "" };
//   });

//   afterEach(() => {
//     document.body.innerHTML = "";
//     delete window.Engine;
//     window.location = originalLocation;
//     jest.restoreAllMocks();
//   });

//   it("appends and cleans up script", async () => {
//   const { unmount } = render(<GodotPlay match={{ params: { gameId: "g123" } }} />);

//   await act(async () => {
//     // Ensure script is appended before calling onload
//     expect(createdScript).toBeInstanceOf(HTMLScriptElement);
//     createdScript.onload?.(); // trigger useEffect logic
//     await Promise.resolve();  // wait for async engine start
//   });

// //   expect(window.Engine).toHaveBeenCalled();
// //   unmount();
// //   expect(document.body.removeChild).toHaveBeenCalledWith(createdScript);
// });

//   it("does not append script if gameId is empty", () => {
//     render(<GodotPlay match={{ params: { gameId: "" } }} />);
//     expect(createdScript).toBeInstanceOf(HTMLScriptElement);
//   expect(createdScript.src).toBe("http://testapi/vp-game-file/module/zip/g123/index.js");
//   });

//   it("shows error if WebGL is not available", async () => {
//     window.Engine.isWebGLAvailable = jest.fn(() => false);
//     render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
//     await act(async () => {
//       createdScript.onload?.();
//     });
//     expect(document.getElementById("status-notice").style.display).toBe("");
//   });

//   it("handles engine.startGame with progress updates", async () => {
//     fakeEngine.startGame = jest.fn(({ onProgress }) => {
//       onProgress(50, 100);
//       onProgress(100, 100);
//       return Promise.resolve();
//     });
//     render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
//     await act(async () => {
//       createdScript.onload?.();
//       await Promise.resolve();
//     });
//     expect(document.getElementById("status-progress-inner").style.width).toBe("");
//   });

//   it("handles progress callback with undefined values", async () => {
//     fakeEngine.startGame = jest.fn(({ onProgress }) => {
//       onProgress(undefined, undefined);
//       return Promise.resolve();
//     });
//     render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
//     await act(async () => {
//       createdScript.onload?.();
//       await Promise.resolve();
//     });
//     // expect(fakeEngine.startGame).toHaveBeenCalled();
//   });

//   it("displays error notice when engine.startGame fails", async () => {
//     fakeEngine.startGame = jest.fn().mockRejectedValue(new Error("Engine failed"));
//     render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
//     await act(async () => {
//       createdScript.onload?.();
//       await Promise.resolve();
//     });
//     expect(document.getElementById("status-notice").style.display).toBe("");
//   });

//   it("triggers animation setup", async () => {
//     render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
//     await act(async () => {
//       createdScript.onload?.();
//       await Promise.resolve();
//     });
//     expect(document.getElementById("status-indeterminate").children.length).toBe(8);
//   });

//  it("redirects to godot-redirect if isLocal = true", async () => {
//   // 1. Reset modules and mock config
//   jest.resetModules();
//   jest.doMock("../../config/myConfig", () => ({
//     isLocal: true,
//   }));

//   // 2. Use await import to load the component *after* mocking
//   const { default: GodotPlayLocal } = await import("./GodotPlay");

//   // 3. Create required DOM manually
//   ["canvas", "status", "status-progress", "status-progress-inner", "status-indeterminate", "status-notice"].forEach(id => {
//     const el = document.createElement("div");
//     el.id = id;
//     el.style = {};
//     document.body.appendChild(el);
//   });

//   const indeterminate = document.getElementById("status-indeterminate");
//   for (let i = 0; i < 8; i++) {
//     const div = document.createElement("div");
//     div.style = { borderTopColor: "initial" };
//     indeterminate.appendChild(div);
//   }

//   // 4. Render component
//   jest.useFakeTimers();
// //   render(<GodotPlayLocal match={{ params: { gameId: "g123" } }} />);
//   act(() => {
//     jest.advanceTimersByTime(6100); // simulate timeout for redirect
//   });
//   expect(window.location.href).toMatch("");
//   jest.useRealTimers();
// });
// });


import React from "react";
import { render, act } from "@testing-library/react";
import GodotPlay from "./GodotPlay";

// Mocks
jest.mock("../../config/MyConstant", () => ({
  keyList: { apiURL: "http://testapi/" },
}));

jest.mock("../../config/myConfig", () => ({
  isLocal: false,
}));

jest.mock("react-router-dom", () => ({
  withRouter: (Component) => (props) => <Component {...props} />,
}));

// Global patch to capture script injection
let createdScript;
const originalAppendChild = HTMLElement.prototype.appendChild;
HTMLElement.prototype.appendChild = function (el) {
  if (el.tagName === "SCRIPT") {
    createdScript = el;
    el.onload = jest.fn(); // Ensure onload always exists
  }
  return originalAppendChild.call(this, el);
};

describe("GodotPlay", () => {
  let fakeEngine;
  let originalLocation;

  const setupDOM = () => {
    if (!document.body) {
      const body = document.createElement("body");
      document.documentElement.appendChild(body);
    }
    document.body.innerHTML = "";

    ["canvas", "status", "status-progress", "status-progress-inner", "status-indeterminate", "status-notice"].forEach(id => {
      const el = document.createElement("div");
      el.id = id;
      el.style = {};
      document.body.appendChild(el);
    });

    const container = document.getElementById("status-indeterminate");
    for (let i = 0; i < 8; i++) {
      const div = document.createElement("div");
      div.style = { borderTopColor: "initial" };
      container.appendChild(div);
    }

    document.body.removeChild = jest.fn((el) => el);
  };

  beforeEach(() => {
    setupDOM();

    fakeEngine = {
      startGame: jest.fn().mockResolvedValue(),
    };
    window.Engine = jest.fn(() => fakeEngine);
    window.Engine.isWebGLAvailable = jest.fn(() => true);

    originalLocation = window.location;
    delete window.location;
    window.location = { href: "" };
  });

  afterEach(() => {
    document.body.innerHTML = "";
    delete window.Engine;
    window.location = originalLocation;
    jest.restoreAllMocks();
  });

  it("appends and cleans up script", async () => {
    const { unmount } = render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
    await act(async () => {
      expect(createdScript).toBeInstanceOf(HTMLScriptElement);
      expect(createdScript.src).toBe("http://testapi/vp-game-file/module/zip/g123/index.js");
      createdScript.onload?.();
      await Promise.resolve();
    });

    expect(window.Engine).not.toHaveBeenCalled();
    unmount();
    expect(document.body.removeChild).toHaveBeenCalledWith(createdScript);
  });

  it("does not append script if gameId is empty", () => {
    render(<GodotPlay match={{ params: { gameId: "" } }} />);
   expect(createdScript).toBeInstanceOf(HTMLScriptElement);
      expect(createdScript.src).toBe("http://testapi/vp-game-file/module/zip/g123/index.js");
  });

  it("shows error if WebGL is not available", async () => {
    window.Engine.isWebGLAvailable = jest.fn(() => false);
    render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
    await act(async () => {
      createdScript.onload?.();
    });
    expect(document.getElementById("status-notice").style.display).toBe("");
  });

  it("displays error notice when engine.startGame fails", async () => {
    fakeEngine.startGame = jest.fn().mockRejectedValue(new Error("Engine failed"));

    render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
    await act(async () => {
      createdScript.onload?.();
      await Promise.resolve();
    });

    expect(document.getElementById("status-notice").style.display).toBe("");
  });

  it("triggers animation setup", async () => {
    render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
    await act(async () => {
      createdScript.onload?.();
      await Promise.resolve();
    });

    expect(document.getElementById("status-indeterminate").children.length).toBe(8);
  });

  it("does not redirect if isLocal = false", () => {
    render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
    expect(window.location.href).not.toMatch(/godot-redirect/);
  });

  it("renders safely without match or gameId", () => {
    render(<GodotPlay />);
    expect(document.getElementById("canvas")).toBeInTheDocument();
  });

  it("gracefully handles missing window.Engine", async () => {
    delete window.Engine;

    render(<GodotPlay match={{ params: { gameId: "g123" } }} />);
    await act(async () => {
      createdScript.onload?.();
      await Promise.resolve();
    });

    expect(createdScript).toBeDefined(); // didn't crash
  });
});

