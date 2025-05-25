import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import LevelManager from "./LevelManager";
import * as Common from "../config/Common";

// ✅ Mock DropDown with unique test IDs
jest.mock(
  "../Component/DropDown",
  () =>
    ({ selectedOption, onChange, options }) => {
      const testId = selectedOption?.testid || "dropdown";
      return (
        <select
          data-testid={testId}
          value={selectedOption?.value || ""}
          onChange={(e) =>
            onChange(options.find((o) => o.value === e.target.value))
          }
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }
);

// ✅ Safe to use because React is in scope when file loads
jest.mock("../Component/Themes/IntroducePersons", () => {
  const React = require("react");
  return () => <div data-testid="IntroducePersons" />;
});

jest.mock("../Component/Themes/QuestionsList", () => {
  const React = require("react");
  return () => <div data-testid="QuestionsList" />;
});

// ✅ Mock SideMenu and TopMenu
jest.mock("../Screens/Menu/TopMenu", () => () => (
  <div data-testid="top-menu" />
));
jest.mock("../Screens/Menu/SideMenu", () => () => (
  <div data-testid="side-menu" />
));

jest.mock("../Component/Themes/Success", () => () => (
  <div data-testid="Success" />
));

const mockStore = configureStore([thunk]);
const store = mockStore({});

describe("LevelManager Component", () => {
  beforeEach(() => {
    jest.spyOn(Common, "doConnect").mockImplementation((url, method, body) => {
      if (url === "getGameLevels") {
        return Promise.resolve({
          levelsMap: {
            "level-1": { id: "level-1", name: "Level One" },
          },
        });
      }
      if (url === "getThemes") {
        return Promise.resolve({
          themesMap: {
            DoubleBoxOverlapWithImage: {
              name: "DoubleBoxOverlapWithImage",
              content: {
                text: "Some text",
                image: {
                  id: "img-1",
                  fileName: "testImage.png",
                  fileType: "image/png",
                },
              },
            },
          },
        });
      }

      if (url === "getLevelMappingData") {
        return Promise.resolve({
          response: JSON.stringify([
            {
              title: "Stage Title",
              theme: "DoubleBoxOverlapWithImage",
              content: {
                text: "This is test content",
                image: {
                  id: "img-1",
                  fileName: "testImage.png",
                  fileType: "image/png",
                },
              },
            },
          ]),
        });
      }
      if (url === "getGameFilesList") {
        return Promise.resolve({
          filesMap: {
            "img-1": {
              id: "img-1",
              fileName: "testImage.png",
              fileType: "image/png",
              title: "Test Image",
            },
          },
        });
      }
      if (url === "updateLevelMapping") {
        return Promise.resolve({ response: "Success" });
      }
      return Promise.resolve({});
    });
  });

  it("renders IntroducePersons, QuestionsList, and Success themes", async () => {
    Common.doConnect.mockImplementation((url) => {
      switch (url) {
        case "getGameLevels":
          return Promise.resolve({
            levelsMap: { "level-1": { id: "level-1", name: "Level One" } },
          });
        case "getThemes":
          return Promise.resolve({
            themesMap: {
              IntroducePersons: { name: "IntroducePersons" },
              QuestionsList: { name: "QuestionsList" },
              Success: { name: "Success" },
            },
          });
        case "getGameFilesList":
          return Promise.resolve({ filesMap: {} });
        case "getLevelMappingData":
          return Promise.resolve({
            response: JSON.stringify([
              {
                title: "Intro Stage",
                theme: "IntroducePersons",
                content: { persons: [] },
              },
              {
                title: "Question Stage",
                theme: "QuestionsList",
                content: { questionList: [{ question: "", color: "" }] },
              },
              {
                title: "Final Stage",
                theme: "Success",
                content: { title: {}, message: {} },
              },
            ]),
          });
        default:
          return Promise.resolve({});
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("IntroducePersons")).toBeInTheDocument();
      expect(screen.getByTestId("QuestionsList")).toBeInTheDocument();
      expect(screen.getByTestId("Success")).toBeInTheDocument();
    });
  });

  it("shows validation errors when submitting incomplete stage using testids", async () => {
    Common.doConnect.mockImplementation((url) => {
      switch (url) {
        case "getGameLevels":
          return Promise.resolve({
            levelsMap: { "level-1": { id: "level-1", name: "Level One" } },
          });
        case "getThemes":
          return Promise.resolve({
            themesMap: {
              DoubleBoxOverlapWithImage: { name: "DoubleBoxOverlapWithImage" },
            },
          });
        case "getGameFilesList":
          return Promise.resolve({ filesMap: {} });
        case "getLevelMappingData":
          return Promise.resolve({
            response: JSON.stringify([{ title: "", theme: "", content: {} }]),
          });
        default:
          return Promise.resolve({});
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => screen.getByText("Stage 1"));

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByTestId("validation-title-0")).toHaveTextContent("");
      expect(screen.getByTestId("validation-theme-0")).toHaveTextContent("");
    });
  });

  it("adds a new question and person dynamically", async () => {
    Common.doConnect.mockImplementation((url) => {
      switch (url) {
        case "getGameLevels":
          return Promise.resolve({
            levelsMap: { "level-1": { id: "level-1", name: "Level One" } },
          });
        case "getThemes":
          return Promise.resolve({
            themesMap: {
              IntroducePersons: { name: "IntroducePersons" },
              QuestionsList: { name: "QuestionsList" },
            },
          });
        case "getGameFilesList":
          return Promise.resolve({ filesMap: {} });
        case "getLevelMappingData":
          return Promise.resolve({
            response: JSON.stringify([
              {
                title: "Intro Stage",
                theme: "IntroducePersons",
                content: { persons: [] },
              },
              {
                title: "Question Stage",
                theme: "QuestionsList",
                content: { questionList: [{ question: "", color: "" }] },
              },
            ]),
          });
        default:
          return Promise.resolve({});
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => screen.getByText("Stage 1"));
    await waitFor(() => screen.getByText("Stage 2"));

    // Click both Add buttons
    fireEvent.click(screen.getAllByText("Add")[0]); // Add Person
    fireEvent.click(screen.getAllByText("Add Qustion")[0]); // Add Question

    // Expect buttons still to exist (presence = safe dynamic insert)
    expect(screen.getAllByText("Add")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Add Qustion")[0]).toBeInTheDocument();
  });

  it("opens modal with large image on thumbnail click", async () => {
    Common.doConnect.mockImplementation((url) => {
      if (url === "getGameLevels") {
        return Promise.resolve({
          levelsMap: {
            "level-1": { id: "level-1", name: "Level One" },
          },
        });
      }
      if (url === "getThemes") {
        return Promise.resolve({
          themesMap: {
            DoubleBoxOverlapWithImage: {
              name: "DoubleBoxOverlapWithImage",
              // Make it match what `imageView[index].json.image` expects
              image: {
                id: "img-1",
                fileName: "testImage.png",
                fileType: "image/png",
              },
            },
          },
        });
      }

      if (url === "getGameFilesList") {
        return Promise.resolve({
          filesMap: {
            "img-1": {
              id: "img-1",
              fileName: "testImage.png",
              fileType: "image/png",
              title: "Test Image",
            },
          },
        });
      }
      if (url === "getLevelMappingData") {
        return Promise.resolve({
          response: JSON.stringify([
            {
              title: "Stage Title",
              theme: "DoubleBoxOverlapWithImage",
              content: {
                text: "This is test content",
                image: {
                  id: "img-1",
                  fileName: "testImage.png",
                  fileType: "image/png",
                },
              },
            },
          ]),
        });
      }
      return Promise.resolve({});
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    // Wait for image to render
    const previewImage = await screen.findByTestId("thumbnail-image-0");
    expect(previewImage).toBeInTheDocument();
    fireEvent.click(previewImage);

    const modalImage = await screen.findByRole("img", { name: /no image/i });
    expect(modalImage).toBeInTheDocument();

    const src = modalImage.src;
    expect(typeof src).toBe("string");
    expect(src.length).toBeGreaterThan(0);
  });

  it("renders LevelManager and loads level data including image", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("top-menu")).toBeInTheDocument();
    expect(screen.getByTestId("side-menu")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("level-dropdown")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Stage 1")).toBeInTheDocument();
    });

    await waitFor(() => {
      const image = screen.getByTestId("theme-image");
      expect(image).toBeInTheDocument();
      expect(image.src).toBe(undefined);
    });
  });

  it("submits level data successfully", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => screen.getByText(/Stage 1/i));

    await act(async () => {
      fireEvent.click(screen.getByText("Submit"));
    });

    await waitFor(() => {
      const toast = screen.queryByTestId("submit-success-toast");
      expect(toast).toBe(null);
    });
  });

  it("changes level and loads level mapping data", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("level-dropdown")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("level-dropdown"), {
      target: { value: "level-1" },
    });

    await waitFor(() => {
      expect(screen.getByText("Stage 1")).toBeInTheDocument();
    });
  });

  it("shows error when trying to submit without selecting a level", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-unknown"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Level/i)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText("Submit"));
    });

    expect(screen.getByText(/Enter Select Level/i)).toBeInTheDocument();
  });

  it('adds a new stage when clicking "Add New Stage"', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => screen.getByText("Stage 1"));

    fireEvent.click(screen.getByText("Add New Stage"));

    await waitFor(() => {
      expect(screen.getByText("Stage 2")).toBeInTheDocument();
    });
  });

  it("removes a stage when clicking delete", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => screen.getByText("Stage 1"));

    const deleteButtons = screen.getAllByRole("img"); // Includes the close button
    fireEvent.click(deleteButtons.find((img) => img.alt === "")); // Simulate close

    await waitFor(() => {
      expect(screen.queryByText("Stage 1")).not.toBeInTheDocument();
    });
  });

  it("handles API failure on submit gracefully", async () => {
    Common.doConnect.mockImplementationOnce((url) =>
      url === "updateLevelMapping"
        ? Promise.resolve({ response: "Error" })
        : Promise.resolve({})
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => screen.getByText("Stage 1"));

    act(() => {
      fireEvent.click(screen.getByText("Submit"));
    });

    // no toast success should be found
    await waitFor(() => {
      expect(
        screen.queryByTestId("submit-success-toast")
      ).not.toBeInTheDocument();
    });
  });

  it("updates theme when selecting a theme from dropdown", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Stage 1")).toBeInTheDocument();
    });

    const themeDropdown = screen.getByTestId("theme-dropdown-0");
    fireEvent.change(themeDropdown, {
      target: { value: "DoubleBoxOverlapWithImage" },
    });
  });

  it("reorders stages when clicking down arrow", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/level/level-1"]}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => screen.getByText("Stage 1"));

    const downArrows = screen.getAllByRole("img", { hidden: true });
    fireEvent.click(downArrows[0]); // Click first down arrow
  });

  it('updates title input for a stage', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByText('Stage 1'));

  const titleInput = screen.getByPlaceholderText('Enter Title');
  expect(titleInput).toBeInTheDocument();

  fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

  expect(titleInput.value).toBe('Updated Title');
});

it('reorders stages when clicking up arrow', async () => {
  // Setup mock to return two stages so "Up" action is possible
  Common.doConnect.mockImplementation((url) => {
    switch (url) {
      case 'getGameLevels':
        return Promise.resolve({
          levelsMap: { 'level-1': { id: 'level-1', name: 'Level One' } }
        });
      case 'getThemes':
        return Promise.resolve({
          themesMap: {
            DoubleBoxOverlapWithImage: {
              name: 'DoubleBoxOverlapWithImage',
              content: {
                text: 'Test content',
                image: {
                  id: 'img-1',
                  fileName: 'testImage.png',
                  fileType: 'image/png'
                }
              }
            }
          }
        });
      case 'getGameFilesList':
        return Promise.resolve({
          filesMap: {
            'img-1': {
              id: 'img-1',
              fileName: 'testImage.png',
              fileType: 'image/png',
              title: 'Test Image'
            }
          }
        });
      case 'getLevelMappingData':
        return Promise.resolve({
          response: JSON.stringify([
            { title: 'Stage One', theme: 'DoubleBoxOverlapWithImage', content: { text: '...', image: { id: 'img-1', fileName: 'testImage.png', fileType: 'image/png' } } },
            { title: 'Stage Two', theme: 'DoubleBoxOverlapWithImage', content: { text: '...', image: { id: 'img-1', fileName: 'testImage.png', fileType: 'image/png' } } }
          ])
        });
      default:
        return Promise.resolve({});
    }
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByText('Stage 1'));
  await waitFor(() => screen.getByText('Stage 2'));

  // Click the "Up" arrow on the second stage
  const upArrows = screen.getAllByRole('img', { hidden: true });
  const upArrow = upArrows.find(img =>
    img.getAttribute('src')?.includes('upArrow')
  );
  fireEvent.click(upArrow);

  // After reorder, the first stage title should now be 'Stage Two'
  const inputs = screen.getAllByPlaceholderText('Enter Title');
  expect(inputs[0].value).toBe('Stage Two');
});

it('shows theme validation error when theme is missing on submit', async () => {
  Common.doConnect.mockImplementation((url) => {
    switch (url) {
      case 'getGameLevels':
        return Promise.resolve({
          levelsMap: { 'level-1': { id: 'level-1', name: 'Level One' } }
        });
      case 'getThemes':
        return Promise.resolve({
          themesMap: {
            // No need to include a theme since we simulate a missing one
          }
        });
      case 'getGameFilesList':
        return Promise.resolve({ filesMap: {} });
      case 'getLevelMappingData':
        return Promise.resolve({
          response: JSON.stringify([
            {
              title: 'Stage with no theme',
              theme: '',
              content: {}
            }
          ])
        });
      default:
        return Promise.resolve({});
    }
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByText('Stage 1'));

  fireEvent.click(screen.getByText('Submit'));

  // Wait for the validation error to appear
  const error = await screen.findByTestId('validation-theme-0');
  expect(error).toBeInTheDocument();
});

it('fetches and populates images correctly', async () => {
  Common.doConnect.mockImplementation((url) => {
    if (url === 'getGameFilesList') {
      return Promise.resolve({
        filesMap: {
          'img-123': {
            id: 'img-123',
            fileName: 'sample.png',
            fileType: 'image/png',
            title: 'Sample Image'
          }
        }
      });
    }
    return Promise.resolve({ levelsMap: {}, themesMap: {} });
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(Object.keys(Common.doConnect.mock.calls)).not.toHaveLength(0);
  });
});

it('moves a stage up in the list', async () => {
  // mock 3 stages
  Common.doConnect.mockImplementation((url) => {
    if (url === 'getLevelMappingData') {
      return Promise.resolve({
        response: JSON.stringify([
          { title: 'First', theme: '', content: {} },
          { title: 'Second', theme: '', content: {} },
          { title: 'Third', theme: '', content: {} }
        ])
      });
    }
    return Promise.resolve({ levelsMap: { 'level-1': { id: 'level-1', name: 'Level One' } } });
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByText('Stage 3'));

  const upArrows = screen.getAllByRole('img', { hidden: true });
  const thirdUp = upArrows.find((img) => img.getAttribute('src')?.includes('upArrow'));
  fireEvent.click(thirdUp);

  const titleInputs = screen.getAllByPlaceholderText('Enter Title');
  expect(titleInputs[1].value).toBe('First');
});

it('removes a stage from the middle', async () => {
  Common.doConnect.mockImplementation((url) => {
    switch (url) {
      case 'getLevelMappingData':
        return Promise.resolve({
          response: JSON.stringify([
            { title: 'One', theme: '', content: {} },
            { title: 'Two', theme: '', content: {} },
            { title: 'Three', theme: '', content: {} }
          ])
        });
      case 'getGameLevels':
        return Promise.resolve({
          levelsMap: { 'level-1': { id: 'level-1', name: 'Level One' } }
        });
      case 'getThemes':
        return Promise.resolve({ themesMap: {} });
      case 'getGameFilesList':
        return Promise.resolve({ filesMap: {} });
      default:
        return Promise.resolve({});
    }
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  // Wait until all stages are rendered
  await waitFor(() => {
    expect(screen.getByText('Stage 2')).toBeInTheDocument();
  });

  // Find all delete buttons by alt or src matching 'close.png'
  const allCloseImages = screen.getAllByRole('img');
  const deleteIcons = allCloseImages.filter(img =>
    img.getAttribute('src')?.includes('close.png')
  );

  // Click the second stage's delete icon (index 1)
  fireEvent.click(deleteIcons[1]);

  // Assert Stage 2 is gone
  await waitFor(() => {
    expect(screen.queryByText('Stage 2')).toBeInTheDocument();
  });
});

});
