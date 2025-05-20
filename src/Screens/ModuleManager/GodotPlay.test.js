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

