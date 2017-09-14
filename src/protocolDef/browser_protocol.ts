// Auto-generated from https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/inspector/browser_protocol.json
import {IProtocol} from '../protocol'
export const protocol: IProtocol =
{
    "version": { "major": "1", "minor": "2" },
    "domains": [{
        "domain": "Inspector",
        "experimental": true,
        "types": [],
        "commands": [
            {
                "name": "enable",
                "description": "Enables inspector domain notifications."
            },
            {
                "name": "disable",
                "description": "Disables inspector domain notifications."
            }
        ],
        "events": [
            {
                "name": "detached",
                "description": "Fired when remote debugging connection is about to be terminated. Contains detach reason.",
                "parameters": [
                    { "name": "reason", "type": "string", "description": "The reason why connection has been terminated." }
                ]
            },
            {
                "name": "targetCrashed",
                "description": "Fired when debugging target has crashed"
            }
        ]
    },
    {
        "domain": "Memory",
        "experimental": true,
        "types": [
            {
                "id": "PressureLevel",
                "type": "string",
                "enum": ["moderate", "critical"],
                "description": "Memory pressure level."
            }
        ],
        "commands": [
            {
                "name": "getDOMCounters",
                "returns": [
                    { "name": "documents", "type": "integer" },
                    { "name": "nodes", "type": "integer" },
                    { "name": "jsEventListeners", "type": "integer" }
                ]
            },
            {
                "name": "prepareForLeakDetection"
            },
            {
                "name": "setPressureNotificationsSuppressed",
                "description": "Enable/disable suppressing memory pressure notifications in all processes.",
                "parameters": [
                    { "name": "suppressed", "type": "boolean", "description": "If true, memory pressure notifications will be suppressed."}
                ]
            },
            {
                "name": "simulatePressureNotification",
                "description": "Simulate a memory pressure notification in all processes.",
                "parameters": [
                    { "name": "level", "$ref": "PressureLevel", "description": "Memory pressure level of the notification." }
                ]
            }
        ]
    },
    {
        "domain": "Performance",
        "experimental": true,
        "types": [
            {
                "id": "Metric",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "description": "Metric name." },
                    { "name": "value", "type": "number", "description": "Metric value." }
                ],
                "description": "Run-time execution metric."
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enable collecting and reporting metrics."
            },
            {
                "name": "disable",
                "description": "Disable collecting and reporting metrics."
            },
            {
                "name": "getMetrics",
                "returns": [
                    { "name": "metrics", "type": "array", "items": { "$ref": "Metric" }, "description": "Current values for run-time metrics." }
                ],
                "description": "Retrieve current values of run-time metrics."
            }
        ],
        "events": [
            {
                "name": "metrics",
                "description": "Current values of the metrics.",
                "parameters": [
                    { "name": "metrics", "type": "array", "items": { "$ref": "Metric" }, "description": "Current values of the metrics." },
                    { "name": "title", "type": "string", "description": "Timestamp title." }
                ]
            }
        ]
    },
    {
        "domain": "Page",
        "description": "Actions and events related to the inspected page belong to the page domain.",
        "dependencies": ["Debugger", "DOM", "Network"],
        "types": [
            {
                "id": "ResourceType",
                "type": "string",
                "enum": ["Document", "Stylesheet", "Image", "Media", "Font", "Script", "TextTrack", "XHR", "Fetch", "EventSource", "WebSocket", "Manifest", "Other"],
                "description": "Resource type as it was perceived by the rendering engine."
            },
            {
              "id": "FrameId",
              "type": "string",
              "description": "Unique frame identifier."
            },
            {
                "id": "Frame",
                "type": "object",
                "description": "Information about the Frame on the page.",
                "properties": [
                    { "name": "id", "type": "string", "description": "Frame unique identifier." },
                    { "name": "parentId", "type": "string", "optional": true, "description": "Parent frame identifier." },
                    { "name": "loaderId", "$ref": "Network.LoaderId", "description": "Identifier of the loader associated with this frame." },
                    { "name": "name", "type": "string", "optional": true, "description": "Frame's name as specified in the tag." },
                    { "name": "url", "type": "string", "description": "Frame document's URL." },
                    { "name": "securityOrigin", "type": "string", "description": "Frame document's security origin." },
                    { "name": "mimeType", "type": "string", "description": "Frame document's mimeType as determined by the browser." },
                    { "name": "unreachableUrl", "type": "string", "optional": true, "experimental": true, "description": "If the frame failed to load, this contains the URL that could not be loaded." }
               ]
            },
            {
                "id": "FrameResource",
                "type": "object",
                "description": "Information about the Resource on the page.",
                "properties": [
                    { "name": "url", "type": "string", "description": "Resource URL." },
                    { "name": "type", "$ref": "ResourceType", "description": "Type of this resource." },
                    { "name": "mimeType", "type": "string", "description": "Resource mimeType as determined by the browser." },
                    { "name": "lastModified", "$ref": "Network.TimeSinceEpoch", "description": "last-modified timestamp as reported by server.", "optional": true },
                    { "name": "contentSize", "type": "number", "description": "Resource content size.", "optional": true },
                    { "name": "failed", "type": "boolean", "optional": true, "description": "True if the resource failed to load." },
                    { "name": "canceled", "type": "boolean", "optional": true, "description": "True if the resource was canceled during loading." }
                ],
                "experimental": true
            },
            {
                "id": "FrameResourceTree",
                "type": "object",
                "description": "Information about the Frame hierarchy along with their cached resources.",
                "properties": [
                    { "name": "frame", "$ref": "Frame", "description": "Frame information for this tree item." },
                    { "name": "childFrames", "type": "array", "optional": true, "items": { "$ref": "FrameResourceTree" }, "description": "Child frames." },
                    { "name": "resources", "type": "array", "items": { "$ref": "FrameResource" }, "description": "Information about frame resources." }
                ],
                "experimental": true
            },
            {
                "id": "ScriptIdentifier",
                "type": "string",
                "description": "Unique script identifier.",
                "experimental": true
            },
            {
                "id": "TransitionType",
                "type": "string",
                "description": "Transition type.",
                "experimental": true,
                "enum": ["link", "typed", "auto_bookmark", "auto_subframe", "manual_subframe", "generated", "auto_toplevel", "form_submit", "reload", "keyword", "keyword_generated", "other"]
            },
            {
                "id": "NavigationEntry",
                "type": "object",
                "description": "Navigation history entry.",
                "properties": [
                  { "name": "id", "type": "integer", "description": "Unique id of the navigation history entry." },
                  { "name": "url", "type": "string", "description": "URL of the navigation history entry." },
                  { "name": "userTypedURL", "type": "string", "description": "URL that the user typed in the url bar." },
                  { "name": "title", "type": "string", "description": "Title of the navigation history entry." },
                  { "name": "transitionType", "$ref": "TransitionType", "description": "Transition type." }
                ],
                "experimental": true
            },
            {
                "id": "ScreencastFrameMetadata",
                "type": "object",
                "description": "Screencast frame metadata.",
                "properties": [
                    { "name": "offsetTop", "type": "number", "experimental": true, "description": "Top offset in DIP." },
                    { "name": "pageScaleFactor", "type": "number", "experimental": true, "description": "Page scale factor." },
                    { "name": "deviceWidth", "type": "number", "experimental": true, "description": "Device screen width in DIP." },
                    { "name": "deviceHeight", "type": "number", "experimental": true, "description": "Device screen height in DIP." },
                    { "name": "scrollOffsetX", "type": "number", "experimental": true, "description": "Position of horizontal scroll in CSS pixels." },
                    { "name": "scrollOffsetY", "type": "number", "experimental": true, "description": "Position of vertical scroll in CSS pixels." },
                    { "name": "timestamp", "$ref": "Network.TimeSinceEpoch", "optional": true, "experimental": true, "description": "Frame swap timestamp." }
                ],
                "experimental": true
            },
            {
                "id": "DialogType",
                "description": "Javascript dialog type.",
                "type": "string",
                "enum": ["alert", "confirm", "prompt", "beforeunload"],
                "experimental": true
            },
            {
                "id": "AppManifestError",
                "description": "Error while paring app manifest.",
                "type": "object",
                "properties": [
                  { "name": "message", "type": "string", "description": "Error message." },
                  { "name": "critical", "type": "integer", "description": "If criticial, this is a non-recoverable parse error." },
                  { "name": "line", "type": "integer", "description": "Error line." },
                  { "name": "column", "type": "integer", "description": "Error column." }
                ],
                "experimental": true
            },
            {
                "id": "NavigationResponse",
                "description": "Proceed: allow the navigation; Cancel: cancel the navigation; CancelAndIgnore: cancels the navigation and makes the requester of the navigation acts like the request was never made.",
                "type": "string",
                "enum": ["Proceed", "Cancel", "CancelAndIgnore"],
                "experimental": true
            },
            {
                "id": "LayoutViewport",
                "type": "object",
                "description": "Layout viewport position and dimensions.",
                "experimental": true,
                "properties": [
                    { "name": "pageX", "type": "integer", "description": "Horizontal offset relative to the document (CSS pixels)." },
                    { "name": "pageY", "type": "integer", "description": "Vertical offset relative to the document (CSS pixels)." },
                    { "name": "clientWidth", "type": "integer", "description": "Width (CSS pixels), excludes scrollbar if present." },
                    { "name": "clientHeight", "type": "integer", "description": "Height (CSS pixels), excludes scrollbar if present." }
                ]
            },
            {
                "id": "VisualViewport",
                "type": "object",
                "description": "Visual viewport position, dimensions, and scale.",
                "experimental": true,
                "properties": [
                    { "name": "offsetX", "type": "number", "description": "Horizontal offset relative to the layout viewport (CSS pixels)." },
                    { "name": "offsetY", "type": "number", "description": "Vertical offset relative to the layout viewport (CSS pixels)." },
                    { "name": "pageX", "type": "number", "description": "Horizontal offset relative to the document (CSS pixels)." },
                    { "name": "pageY", "type": "number", "description": "Vertical offset relative to the document (CSS pixels)." },
                    { "name": "clientWidth", "type": "number", "description": "Width (CSS pixels), excludes scrollbar if present." },
                    { "name": "clientHeight", "type": "number", "description": "Height (CSS pixels), excludes scrollbar if present." },
                    { "name": "scale", "type": "number", "description": "Scale relative to the ideal viewport (size at width=device-width)." }
                ]
            },
            {
                "id": "Viewport",
                "type": "object",
                "description": "Viewport for capturing screenshot.",
                "experimental": true,
                "properties": [
                    { "name": "x", "type": "number", "description": "X offset in CSS pixels." },
                    { "name": "y", "type": "number", "description": "Y offset in CSS pixels" },
                    { "name": "width", "type": "number", "description": "Rectangle width in CSS pixels" },
                    { "name": "height", "type": "number", "description": "Rectangle height in CSS pixels" },
                    { "name": "scale", "type": "number", "description": "Page scale factor." }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables page domain notifications."
            },
            {
                "name": "disable",
                "description": "Disables page domain notifications."
            },
            {
                "name": "addScriptToEvaluateOnLoad",
                "parameters": [
                    { "name": "scriptSource", "type": "string" }
                ],
                "returns": [
                    { "name": "identifier", "$ref": "ScriptIdentifier", "description": "Identifier of the added script." }
                ],
                "deprecated": true,
                "description": "Deprecated, please use addScriptToEvaluateOnNewDocument instead.",
                "experimental": true
            },
            {
                "name": "removeScriptToEvaluateOnLoad",
                "parameters": [
                    { "name": "identifier", "$ref": "ScriptIdentifier" }
                ],
                "deprecated": true,
                "description": "Deprecated, please use removeScriptToEvaluateOnNewDocument instead.",
                "experimental": true
            },
            {
                "name": "addScriptToEvaluateOnNewDocument",
                "parameters": [
                    { "name": "source", "type": "string" }
                ],
                "returns": [
                    { "name": "identifier", "$ref": "ScriptIdentifier", "description": "Identifier of the added script." }
                ],
                "description": "Evaluates given script in every frame upon creation (before loading frame's scripts).",
                "experimental": true
            },
            {
                "name": "removeScriptToEvaluateOnNewDocument",
                "parameters": [
                    { "name": "identifier", "$ref": "ScriptIdentifier" }
                ],
                "description": "Removes given script from the list.",
                "experimental": true
            },
            {
                "name": "setAutoAttachToCreatedPages",
                "parameters": [
                    { "name": "autoAttach", "type": "boolean", "description": "If true, browser will open a new inspector window for every page created from this one." }
                ],
                "description": "Controls whether browser will open a new inspector window for connected pages.",
                "experimental": true
            },
            {
                "name": "reload",
                "parameters": [
                    { "name": "ignoreCache", "type": "boolean", "optional": true, "description": "If true, browser cache is ignored (as if the user pressed Shift+refresh)." },
                    { "name": "scriptToEvaluateOnLoad", "type": "string", "optional": true, "description": "If set, the script will be injected into all frames of the inspected page after reload." }
                ],
                "description": "Reloads given page optionally ignoring the cache."
            },
	    {
                "name": "setAdBlockingEnabled",
                "description": "Enable Chrome's experimental ad filter on all sites.",
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "Whether to block ads." }
                ],
		"experimental": true
	    },
            {
                "name": "navigate",
                "parameters": [
                    { "name": "url", "type": "string", "description": "URL to navigate the page to." },
                    { "name": "referrer", "type": "string", "optional": true, "experimental": true, "description": "Referrer URL." },
                    { "name": "transitionType", "$ref": "TransitionType", "optional": true, "experimental": true, "description": "Intended transition type." }
                ],
                "returns": [
                    { "name": "frameId", "$ref": "FrameId", "experimental": true, "description": "Frame id that will be navigated." }
                ],
                "description": "Navigates current page to the given URL."
            },
            {
                "name": "stopLoading",
                "description": "Force the page stop all navigations and pending resource fetches.",
                "experimental": true
            },
            {
              "name": "getNavigationHistory",
              "returns": [
                { "name": "currentIndex", "type": "integer", "description": "Index of the current navigation history entry." },
                { "name": "entries", "type": "array", "items": { "$ref": "NavigationEntry" }, "description": "Array of navigation history entries." }
              ],
              "description": "Returns navigation history for the current page.",
              "experimental": true
            },
            {
              "name": "navigateToHistoryEntry",
              "parameters": [
                  { "name": "entryId", "type": "integer", "description": "Unique id of the entry to navigate to." }
              ],
              "description": "Navigates current page to the given history entry.",
              "experimental": true
            },
            {
                "name": "getCookies",
                "returns": [
                    { "name": "cookies", "type": "array", "items": { "$ref": "Network.Cookie" }, "description": "Array of cookie objects." }
                ],
                "description": "Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.",
                "experimental": true,
                "redirect": "Network"
            },
            {
                "name": "deleteCookie",
                "parameters": [
                    { "name": "cookieName", "type": "string", "description": "Name of the cookie to remove." },
                    { "name": "url", "type": "string", "description": "URL to match cooke domain and path." }
                ],
                "description": "Deletes browser cookie with given name, domain and path.",
                "experimental": true,
                "redirect": "Network"
            },
            {
                "name": "getResourceTree",
                "description": "Returns present frame / resource tree structure.",
                "returns": [
                    { "name": "frameTree", "$ref": "FrameResourceTree", "description": "Present frame / resource tree structure." }
                ],
                "experimental": true
            },
            {
                "name": "getResourceContent",
                "description": "Returns content of the given resource.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Frame id to get resource for." },
                    { "name": "url", "type": "string", "description": "URL of the resource to get content for." }
                ],
                "returns": [
                    { "name": "content", "type": "string", "description": "Resource content." },
                    { "name": "base64Encoded", "type": "boolean", "description": "True, if content was served as base64." }
                ],
                "experimental": true
            },
            {
                "name": "searchInResource",
                "description": "Searches for given string in resource content.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Frame id for resource to search in." },
                    { "name": "url", "type": "string", "description": "URL of the resource to search in." },
                    { "name": "query", "type": "string", "description": "String to search for."  },
                    { "name": "caseSensitive", "type": "boolean", "optional": true, "description": "If true, search is case sensitive." },
                    { "name": "isRegex", "type": "boolean", "optional": true, "description": "If true, treats string parameter as regex." }
                ],
                "returns": [
                    { "name": "result", "type": "array", "items": { "$ref": "Debugger.SearchMatch" }, "description": "List of search matches." }
                ],
                "experimental": true
            },
            {
                "name": "setDocumentContent",
                "description": "Sets given markup as the document's HTML.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Frame id to set HTML for." },
                    { "name": "html", "type": "string", "description": "HTML content to set."  }
                ],
                "experimental": true
            },
            {
                "name": "setDeviceMetricsOverride",
                "description": "Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and \"device-width\"/\"device-height\"-related CSS media query results).",
                "parameters": [
                    { "name": "width", "type": "integer", "description": "Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override." },
                    { "name": "height", "type": "integer", "description": "Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override." },
                    { "name": "deviceScaleFactor", "type": "number", "description": "Overriding device scale factor value. 0 disables the override." },
                    { "name": "mobile", "type": "boolean", "description": "Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more." },
                    { "name": "scale", "type": "number", "optional": true, "description": "Scale to apply to resulting view image." },
                    { "name": "screenWidth", "type": "integer", "optional": true, "description": "Overriding screen width value in pixels (minimum 0, maximum 10000000)." },
                    { "name": "screenHeight", "type": "integer", "optional": true, "description": "Overriding screen height value in pixels (minimum 0, maximum 10000000)." },
                    { "name": "positionX", "type": "integer", "optional": true, "description": "Overriding view X position on screen in pixels (minimum 0, maximum 10000000)." },
                    { "name": "positionY", "type": "integer", "optional": true, "description": "Overriding view Y position on screen in pixels (minimum 0, maximum 10000000)." },
                    { "name": "dontSetVisibleSize", "type": "boolean", "optional": true, "description": "Do not set visible view size, rely upon explicit setVisibleSize call." },
                    { "name": "screenOrientation", "$ref": "Emulation.ScreenOrientation", "optional": true, "description": "Screen orientation override." }
                ],
                "redirect": "Emulation",
                "experimental": true
            },
            {
                "name": "clearDeviceMetricsOverride",
                "description": "Clears the overriden device metrics.",
                "redirect": "Emulation",
                "experimental": true
            },
            {
                "name": "setGeolocationOverride",
                "description": "Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.",
                "parameters": [
                    { "name": "latitude", "type": "number", "optional": true, "description": "Mock latitude"},
                    { "name": "longitude", "type": "number", "optional": true, "description": "Mock longitude"},
                    { "name": "accuracy", "type": "number", "optional": true, "description": "Mock accuracy"}
                ],
                "redirect": "Emulation"
            },
            {
                "name": "clearGeolocationOverride",
                "description": "Clears the overriden Geolocation Position and Error.",
                "redirect": "Emulation"
            },
            {
                "name": "setDeviceOrientationOverride",
                "description": "Overrides the Device Orientation.",
                "parameters": [
                    { "name": "alpha", "type": "number", "description": "Mock alpha"},
                    { "name": "beta", "type": "number", "description": "Mock beta"},
                    { "name": "gamma", "type": "number", "description": "Mock gamma"}
                ],
                "redirect": "DeviceOrientation",
                "experimental": true
            },
            {
                "name": "clearDeviceOrientationOverride",
                "description": "Clears the overridden Device Orientation.",
                "redirect": "DeviceOrientation",
                "experimental": true
            },
            {
                "name": "setTouchEmulationEnabled",
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "Whether the touch event emulation should be enabled." },
                    { "name": "configuration", "type": "string", "enum": ["mobile", "desktop"], "optional": true, "description": "Touch/gesture events configuration. Default: current platform." }
                ],
                "description": "Toggles mouse event-based touch event emulation.",
                "experimental": true,
                "redirect": "Emulation"
            },
            {
                "name": "captureScreenshot",
                "description": "Capture page screenshot.",
                "parameters": [
                    { "name": "format", "type": "string", "optional": true, "enum": ["jpeg", "png"], "description": "Image compression format (defaults to png)." },
                    { "name": "quality", "type": "integer", "optional": true, "description": "Compression quality from range [0..100] (jpeg only)." },
                    { "name": "clip", "$ref": "Viewport", "optional": true, "description": "Capture the screenshot of a given region only.", "experimental": true },
                    { "name": "fromSurface", "type": "boolean", "optional": true, "description": "Capture the screenshot from the surface, rather than the view. Defaults to true.", "experimental": true }
                ],
                "returns": [
                    { "name": "data", "type": "string", "description": "Base64-encoded image data." }
                ],
                "experimental": true
            },
            {
                "name": "printToPDF",
                "description": "Print page as PDF.",
                "parameters": [
                    {"name": "landscape", "type": "boolean", "optional": true, "description": "Paper orientation. Defaults to false."},
                    {"name": "displayHeaderFooter", "type": "boolean", "optional": true, "description": "Display header and footer. Defaults to false."},
                    {"name": "printBackground", "type": "boolean", "optional": true, "description": "Print background graphics. Defaults to false."},
                    {"name": "scale", "type": "number", "optional": true, "description": "Scale of the webpage rendering. Defaults to 1."},
                    {"name": "paperWidth", "type": "number", "optional": true, "description": "Paper width in inches. Defaults to 8.5 inches."},
                    {"name": "paperHeight", "type": "number", "optional": true, "description": "Paper height in inches. Defaults to 11 inches."},
                    {"name": "marginTop", "type": "number", "optional": true, "description": "Top margin in inches. Defaults to 1cm (~0.4 inches)."},
                    {"name": "marginBottom", "type": "number", "optional": true, "description": "Bottom margin in inches. Defaults to 1cm (~0.4 inches)."},
                    {"name": "marginLeft", "type": "number", "optional": true, "description": "Left margin in inches. Defaults to 1cm (~0.4 inches)."},
                    {"name": "marginRight", "type": "number", "optional": true, "description": "Right margin in inches. Defaults to 1cm (~0.4 inches)."},
                    {"name": "pageRanges", "type": "string", "optional": true, "description": "Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages."},
                    {"name": "ignoreInvalidPageRanges", "type": "boolean", "optional": true, "description": "Whether to silently ignore invalid but successfully parsed page ranges, such as '3-2'. Defaults to false."}
                ],
                "returns": [
                    { "name": "data", "type": "string", "description": "Base64-encoded pdf data." }
                ],
                "experimental": true
            },
            {
                "name": "startScreencast",
                "description": "Starts sending each frame using the <code>screencastFrame</code> event.",
                "parameters": [
                    { "name": "format", "type": "string", "optional": true, "enum": ["jpeg", "png"], "description": "Image compression format." },
                    { "name": "quality", "type": "integer", "optional": true, "description": "Compression quality from range [0..100]." },
                    { "name": "maxWidth", "type": "integer", "optional": true, "description": "Maximum screenshot width." },
                    { "name": "maxHeight", "type": "integer", "optional": true, "description": "Maximum screenshot height." },
                    { "name": "everyNthFrame", "type": "integer", "optional": true, "description": "Send every n-th frame." }
                ],
                "experimental": true
            },
            {
                "name": "stopScreencast",
                "description": "Stops sending each frame in the <code>screencastFrame</code>.",
                "experimental": true
            },
            {
                "name": "screencastFrameAck",
                "description": "Acknowledges that a screencast frame has been received by the frontend.",
                "parameters": [
                    { "name": "sessionId", "type": "integer", "description": "Frame number." }
                ],
                "experimental": true
            },
            {
                "name": "handleJavaScriptDialog",
                "description": "Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).",
                "parameters": [
                    { "name": "accept", "type": "boolean", "description": "Whether to accept or dismiss the dialog." },
                    { "name": "promptText", "type": "string", "optional": true, "description": "The text to enter into the dialog prompt before accepting. Used only if this is a prompt dialog." }
                ]
            },
            {
                "name": "getAppManifest",
                "experimental": true,
                "returns": [
                    { "name": "url", "type": "string", "description": "Manifest location." },
                    { "name": "errors", "type": "array", "items": { "$ref": "AppManifestError" } },
                    { "name": "data", "type": "string", "optional": true, "description": "Manifest content." }
                ]
            },
            {
                "name": "requestAppBanner",
                "experimental": true
            },
            {
                "name": "getLayoutMetrics",
                "description": "Returns metrics relating to the layouting of the page, such as viewport bounds/scale.",
                "experimental": true,
                "returns": [
                    { "name": "layoutViewport", "$ref": "LayoutViewport", "description": "Metrics relating to the layout viewport." },
                    { "name": "visualViewport", "$ref": "VisualViewport", "description": "Metrics relating to the visual viewport." },
                    { "name": "contentSize", "$ref": "DOM.Rect", "description": "Size of scrollable area."}
                ]
            },
            {
                "name": "createIsolatedWorld",
                "description": "Creates an isolated world for the given frame.",
                "experimental": true,
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame in which the isolated world should be created." },
                    { "name": "worldName", "type": "string", "optional": true, "description": "An optional name which is reported in the Execution Context." },
                    { "name": "grantUniveralAccess", "type": "boolean", "optional": true, "description": "Whether or not universal access should be granted to the isolated world. This is a powerful option, use with caution." }
                ],
                "returns": [
                    {  "name": "executionContextId", "$ref": "Runtime.ExecutionContextId", "description": "Execution context of the isolated world." }
                ]
            },
            {
                "name": "bringToFront",
                "description": "Brings page to front (activates tab)."
            },
            {
                "name": "setDownloadBehavior",
                "description": "Set the behavior when downloading a file.",
                "experimental": true,
                "parameters": [
                    { "name": "behavior", "type": "string", "enum": ["deny", "allow", "default"], "description": "Whether to allow all or deny all download requests, or use default Chrome behavior if available (otherwise deny)." },
                    { "name": "downloadPath", "type": "string", "optional": true, "description": "The default path to save downloaded files to. This is requred if behavior is set to 'allow'" }
                ]
            }
        ],
        "events": [
            {
                "name": "domContentEventFired",
                "parameters": [
                    { "name": "timestamp", "$ref": "Network.MonotonicTime" }
                ]
            },
            {
                "name": "loadEventFired",
                "parameters": [
                    { "name": "timestamp", "$ref": "Network.MonotonicTime" }
                ]
            },
            {
                "name": "lifecycleEvent",
                "parameters": [
                    { "name": "name", "type": "string" },
                    { "name": "timestamp", "$ref": "Network.MonotonicTime" }
                ],
                "description": "Fired for top level page lifecycle events such as navigation, load, paint, etc."
            },
            {
                "name": "frameAttached",
                "description": "Fired when frame has been attached to its parent.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has been attached." },
                    { "name": "parentFrameId", "$ref": "FrameId", "description": "Parent frame identifier." },
                    { "name": "stack", "$ref": "Runtime.StackTrace", "optional": true, "description": "JavaScript stack trace of when frame was attached, only set if frame initiated from script.", "experimental": true }
                ]
            },
            {
                "name": "frameNavigated",
                "description": "Fired once navigation of the frame has completed. Frame is now associated with the new loader.",
                "parameters": [
                    { "name": "frame", "$ref": "Frame", "description": "Frame object." }
                ]
            },
            {
                "name": "frameDetached",
                "description": "Fired when frame has been detached from its parent.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has been detached." }
                ]
            },
            {
                "name": "frameStartedLoading",
                "description": "Fired when frame has started loading.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has started loading." }
                ],
                "experimental": true
            },
            {
                "name": "frameStoppedLoading",
                "description": "Fired when frame has stopped loading.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has stopped loading." }
                ],
                "experimental": true
            },
            {
                "name": "frameScheduledNavigation",
                "description": "Fired when frame schedules a potential navigation.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has scheduled a navigation." },
                    { "name": "delay", "type": "number", "description": "Delay (in seconds) until the navigation is scheduled to begin. The navigation is not guaranteed to start." },
                    { "name": "reason", "type": "string", "experimental": true, "enum": ["formSubmission", "httpHeaderRefresh", "scriptInitiated", "metaTagRefresh", "pageBlockInterstitial", "reload"], "description": "The reason for the navigation." },
                    { "name": "url", "type": "string", "experimental": true, "description": "The destination URL for the scheduled navigation." }
                ],
                "experimental": true
            },
            {
                "name": "frameClearedScheduledNavigation",
                "description": "Fired when frame no longer has a scheduled navigation.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has cleared its scheduled navigation." }
                ],
                "experimental": true
            },
            {
                "name": "frameResized",
                "experimental": true
            },
            {
                "name": "javascriptDialogOpening",
                "description": "Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to open.",
                "parameters": [
                    { "name": "url", "type": "string", "description": "Frame url." },
                    { "name": "message", "type": "string", "description": "Message that will be displayed by the dialog." },
                    { "name": "type", "$ref": "DialogType", "description": "Dialog type." },
                    { "name": "defaultPrompt", "optional": true, "type": "string", "description": "Default dialog prompt." }
                ]
            },
            {
                "name": "javascriptDialogClosed",
                "description": "Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been closed.",
                "parameters": [
                    { "name": "result", "type": "boolean", "description": "Whether dialog was confirmed." },
                    { "name": "userInput", "type": "string", "description": "User input in case of prompt." }
                ]
            },
            {
                "name": "screencastFrame",
                "description": "Compressed image data requested by the <code>startScreencast</code>.",
                "parameters": [
                    { "name": "data", "type": "string", "description": "Base64-encoded compressed image." },
                    { "name": "metadata", "$ref": "ScreencastFrameMetadata", "description": "Screencast frame metadata."},
                    { "name": "sessionId", "type": "integer", "description": "Frame number."}
                ],
                "experimental": true
            },
            {
                "name": "screencastVisibilityChanged",
                "description": "Fired when the page with currently enabled screencast was shown or hidden </code>.",
                "parameters": [
                    { "name": "visible", "type": "boolean", "description": "True if the page is visible." }
                ],
                "experimental": true
            },
            {
                "name": "interstitialShown",
                "description": "Fired when interstitial page was shown"
            },
            {
                "name": "interstitialHidden",
                "description": "Fired when interstitial page was hidden"
            }
        ]
    },
    {
        "domain": "Overlay",
        "description": "This domain provides various functionality related to drawing atop the inspected page.",
        "dependencies": ["DOM", "Page", "Runtime"],
        "experimental": true,
        "types": [
            {
                "id": "HighlightConfig",
                "type": "object",
                "properties": [
                    { "name": "showInfo", "type": "boolean", "optional": true, "description": "Whether the node info tooltip should be shown (default: false)." },
                    { "name": "showRulers", "type": "boolean", "optional": true, "description": "Whether the rulers should be shown (default: false)." },
                    { "name": "showExtensionLines", "type": "boolean", "optional": true, "description": "Whether the extension lines from node to the rulers should be shown (default: false)." },
                    { "name": "displayAsMaterial", "type": "boolean", "optional": true},
                    { "name": "contentColor", "$ref": "DOM.RGBA", "optional": true, "description": "The content box highlight fill color (default: transparent)." },
                    { "name": "paddingColor", "$ref": "DOM.RGBA", "optional": true, "description": "The padding highlight fill color (default: transparent)." },
                    { "name": "borderColor", "$ref": "DOM.RGBA", "optional": true, "description": "The border highlight fill color (default: transparent)." },
                    { "name": "marginColor", "$ref": "DOM.RGBA", "optional": true, "description": "The margin highlight fill color (default: transparent)." },
                    { "name": "eventTargetColor", "$ref": "DOM.RGBA", "optional": true, "description": "The event target element highlight fill color (default: transparent)." },
                    { "name": "shapeColor", "$ref": "DOM.RGBA", "optional": true, "description": "The shape outside fill color (default: transparent)." },
                    { "name": "shapeMarginColor", "$ref": "DOM.RGBA", "optional": true, "description": "The shape margin fill color (default: transparent)." },
                    { "name": "selectorList", "type": "string", "optional": true, "description": "Selectors to highlight relevant nodes."},
                    { "name": "cssGridColor", "$ref": "DOM.RGBA", "optional": true, "description": "The grid layout color (default: transparent)." }
                ],
                "description": "Configuration data for the highlighting of page elements."
            },
            {
                "id": "InspectMode",
                "type": "string",
                "enum": [
                    "searchForNode",
                    "searchForUAShadowDOM",
                    "none"
                ]
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables domain notifications."
            },
            {
                "name": "disable",
                "description": "Disables domain notifications."
            },
            {
                "name": "setShowPaintRects",
                "description": "Requests that backend shows paint rectangles",
                "parameters": [
                    { "name": "result", "type": "boolean", "description": "True for showing paint rectangles" }
                ]
            },
            {
                "name": "setShowDebugBorders",
                "description": "Requests that backend shows debug borders on layers",
                "parameters": [
                    { "name": "show", "type": "boolean", "description": "True for showing debug borders" }
                ]
            },
            {
                "name": "setShowFPSCounter",
                "description": "Requests that backend shows the FPS counter",
                "parameters": [
                    { "name": "show", "type": "boolean", "description": "True for showing the FPS counter" }
                ]
            },
            {
                "name": "setShowScrollBottleneckRects",
                "description": "Requests that backend shows scroll bottleneck rects",
                "parameters": [
                    { "name": "show", "type": "boolean", "description": "True for showing scroll bottleneck rects" }
                ]
            },
            {
                "name": "setShowViewportSizeOnResize",
                "description": "Paints viewport size upon main frame resize.",
                "parameters": [
                    { "name": "show", "type": "boolean", "description": "Whether to paint size or not." }
                ]
            },
            {
                "name": "setPausedInDebuggerMessage",
                "parameters": [
                    { "name": "message", "type": "string", "optional": true, "description": "The message to display, also triggers resume and step over controls." }
                ]
            },
            {
                "name": "setSuspended",
                "parameters": [
                    { "name": "suspended", "type": "boolean", "description": "Whether overlay should be suspended and not consume any resources until resumed." }
                ]
            },
            {
                "name": "setInspectMode",
                "description": "Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspectNodeRequested' event upon element selection.",
                "parameters": [
                    { "name": "mode", "$ref": "InspectMode", "description": "Set an inspection mode." },
                    { "name": "highlightConfig", "$ref": "HighlightConfig", "optional": true, "description": "A descriptor for the highlight appearance of hovered-over nodes. May be omitted if <code>enabled == false</code>." }
                ]
            },
            {
                "name": "highlightRect",
                "description": "Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.",
                "parameters": [
                    { "name": "x", "type": "integer", "description": "X coordinate" },
                    { "name": "y", "type": "integer", "description": "Y coordinate" },
                    { "name": "width", "type": "integer", "description": "Rectangle width" },
                    { "name": "height", "type": "integer", "description": "Rectangle height" },
                    { "name": "color", "$ref": "DOM.RGBA", "optional": true, "description": "The highlight fill color (default: transparent)." },
                    { "name": "outlineColor", "$ref": "DOM.RGBA", "optional": true, "description": "The highlight outline color (default: transparent)." }
                ]
            },
            {
                "name": "highlightQuad",
                "description": "Highlights given quad. Coordinates are absolute with respect to the main frame viewport.",
                "parameters": [
                    { "name": "quad", "$ref": "DOM.Quad", "description": "Quad to highlight" },
                    { "name": "color", "$ref": "DOM.RGBA", "optional": true, "description": "The highlight fill color (default: transparent)." },
                    { "name": "outlineColor", "$ref": "DOM.RGBA", "optional": true, "description": "The highlight outline color (default: transparent)." }
                ]
            },
            {
                "name": "highlightNode",
                "description": "Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified.",
                "parameters": [
                    { "name": "highlightConfig", "$ref": "HighlightConfig",  "description": "A descriptor for the highlight appearance." },
                    { "name": "nodeId", "$ref": "DOM.NodeId", "optional": true, "description": "Identifier of the node to highlight." },
                    { "name": "backendNodeId", "$ref": "DOM.BackendNodeId", "optional": true, "description": "Identifier of the backend node to highlight." },
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "optional": true, "description": "JavaScript object id of the node to be highlighted." }
                ]
            },
            {
                "name": "highlightFrame",
                "description": "Highlights owner element of the frame with given id.",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame to highlight." },
                    { "name": "contentColor", "$ref": "DOM.RGBA", "optional": true, "description": "The content box highlight fill color (default: transparent)." },
                    { "name": "contentOutlineColor", "$ref": "DOM.RGBA", "optional": true, "description": "The content box highlight outline color (default: transparent)." }
                ]
            },
            {
                "name": "hideHighlight",
                "description": "Hides any highlight."
            },
            {
                "name": "getHighlightObjectForTest",
                "description": "For testing.",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "Id of the node to get highlight object for." }
                ],
                "returns": [
                    { "name": "highlight", "type": "object", "description": "Highlight data for the node." }
                ]
            }
        ],
        "events": [
            {
                "name": "nodeHighlightRequested",
                "description": "Fired when the node should be highlighted. This happens after call to <code>setInspectMode</code>.",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId" }
                ]
            },
            {
                "name": "inspectNodeRequested",
                "description": "Fired when the node should be inspected. This happens after call to <code>setInspectMode</code> or when user manually inspects an element.",
                "parameters": [
                    { "name": "backendNodeId", "$ref": "DOM.BackendNodeId", "description": "Id of the node to inspect." }
                ]
            },
            {
                "name": "screenshotRequested",
                "description": "Fired when user asks to capture screenshot of some area on the page.",
                "parameters": [
                    { "name": "viewport", "$ref": "Page.Viewport", "description": "Viewport to capture, in CSS." }
                ]
            }
        ]
    },
    {
        "domain": "Emulation",
        "description": "This domain emulates different environments for the page.",
        "dependencies": ["DOM"],
        "types": [
            {
                "id": "ScreenOrientation",
                "type": "object",
                "description": "Screen orientation.",
                "properties": [
                    { "name": "type",  "type": "string", "enum": ["portraitPrimary", "portraitSecondary", "landscapePrimary", "landscapeSecondary"], "description": "Orientation type." },
                    { "name": "angle",  "type": "integer", "description": "Orientation angle." }
                ]
            },
            {
                "id": "VirtualTimePolicy",
                "type": "string",
                "enum": [
                    "advance",
                    "pause",
                    "pauseIfNetworkFetchesPending"
                ],
                "experimental": true,
                "description": "advance: If the scheduler runs out of immediate work, the virtual time base may fast forward to allow the next delayed task (if any) to run; pause: The virtual time base may not advance; pauseIfNetworkFetchesPending: The virtual time base may not advance if there are any pending resource fetches."
            }
        ],
        "commands": [
            {
                "name": "setDeviceMetricsOverride",
                "description": "Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and \"device-width\"/\"device-height\"-related CSS media query results).",
                "parameters": [
                    { "name": "width", "type": "integer", "description": "Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override." },
                    { "name": "height", "type": "integer", "description": "Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override." },
                    { "name": "deviceScaleFactor", "type": "number", "description": "Overriding device scale factor value. 0 disables the override." },
                    { "name": "mobile", "type": "boolean", "description": "Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more." },
                    { "name": "scale", "type": "number", "optional": true, "description": "Scale to apply to resulting view image." },
                    { "name": "screenWidth", "type": "integer", "optional": true, "experimental": true, "description": "Overriding screen width value in pixels (minimum 0, maximum 10000000)." },
                    { "name": "screenHeight", "type": "integer", "optional": true, "experimental": true, "description": "Overriding screen height value in pixels (minimum 0, maximum 10000000)." },
                    { "name": "positionX", "type": "integer", "optional": true, "experimental": true, "description": "Overriding view X position on screen in pixels (minimum 0, maximum 10000000)." },
                    { "name": "positionY", "type": "integer", "optional": true, "experimental": true, "description": "Overriding view Y position on screen in pixels (minimum 0, maximum 10000000)." },
                    { "name": "dontSetVisibleSize", "type": "boolean", "optional": true, "experimental": true, "description": "Do not set visible view size, rely upon explicit setVisibleSize call." },
                    { "name": "screenOrientation", "$ref": "ScreenOrientation", "optional": true, "description": "Screen orientation override." }
                ]
            },
            {
                "name": "clearDeviceMetricsOverride",
                "description": "Clears the overriden device metrics."
            },
            {
                "name": "resetPageScaleFactor",
                "experimental": true,
                "description": "Requests that page scale factor is reset to initial values."
            },
            {
                "name": "setPageScaleFactor",
                "description": "Sets a specified page scale factor.",
                "experimental": true,
                "parameters": [
                    { "name": "pageScaleFactor", "type": "number", "description": "Page scale factor." }
                ]
            },
            {
                "name": "setVisibleSize",
                "description": "Resizes the frame/viewport of the page. Note that this does not affect the frame's container (e.g. browser window). Can be used to produce screenshots of the specified size. Not supported on Android.",
                "experimental": true,
                "deprecated": true,
                "parameters": [
                    { "name": "width", "type": "integer", "description": "Frame width (DIP)." },
                    { "name": "height", "type": "integer", "description": "Frame height (DIP)." }
                ]
            },
            {
                "name": "setScriptExecutionDisabled",
                "description": "Switches script execution in the page.",
                "experimental": true,
                "parameters": [
                    { "name": "value", "type": "boolean", "description": "Whether script execution should be disabled in the page." }
                ]
            },
            {
                "name": "setGeolocationOverride",
                "description": "Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.",
                "experimental": true,
                "parameters": [
                    { "name": "latitude", "type": "number", "optional": true, "description": "Mock latitude"},
                    { "name": "longitude", "type": "number", "optional": true, "description": "Mock longitude"},
                    { "name": "accuracy", "type": "number", "optional": true, "description": "Mock accuracy"}
                ]
            },
            {
                "name": "clearGeolocationOverride",
                "description": "Clears the overriden Geolocation Position and Error.",
                "experimental": true
            },
            {
                "name": "setTouchEmulationEnabled",
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "Whether the touch event emulation should be enabled." },
                    { "name": "maxTouchPoints", "type": "integer", "optional": true, "description": "Maximum touch points supported. Defaults to one." }
                ],
                "description": "Enables touch on platforms which do not support them."
            },
            {
                "name": "setEmitTouchEventsForMouse",
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "Whether touch emulation based on mouse input should be enabled." },
                    { "name": "configuration", "type": "string", "enum": ["mobile", "desktop"], "optional": true, "description": "Touch/gesture events configuration. Default: current platform." }
                ],
                "experimental": true
            },
            {
                "name": "setEmulatedMedia",
                "parameters": [
                    { "name": "media", "type": "string", "description": "Media type to emulate. Empty string disables the override." }
                ],
                "description": "Emulates the given media for CSS media queries."
            },
            {
                "name": "setCPUThrottlingRate",
                "parameters": [
                    { "name": "rate", "type": "number", "description": "Throttling rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc)." }
                ],
                "experimental": true,
                "description": "Enables CPU throttling to emulate slow CPUs."
            },
            {
                "name": "canEmulate",
                "description": "Tells whether emulation is supported.",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if emulation is supported." }
                ],
                "experimental": true
            },
            {
                "name": "setVirtualTimePolicy",
                "description": "Turns on virtual time for all frames (replacing real-time with a synthetic time source) and sets the current virtual time policy.  Note this supersedes any previous time budget.",
                "parameters": [
                    { "name": "policy", "$ref": "VirtualTimePolicy" },
                    { "name": "budget", "type": "integer", "optional": true, "description": "If set, after this many virtual milliseconds have elapsed virtual time will be paused and a virtualTimeBudgetExpired event is sent." }
                ],
                "experimental": true
            },
            {
                "name": "setNavigatorOverrides",
                "description": "Overrides value returned by the javascript navigator object.",
                "parameters": [
                    { "name": "platform", "type": "string", "description": "The platform navigator.platform should return." }
                ],
                "experimental": true
            },
            {
                "name": "setDefaultBackgroundColorOverride",
                "description": "Sets or clears an override of the default background color of the frame. This override is used if the content does not specify one.",
                "parameters": [
                    { "name": "color", "$ref": "DOM.RGBA", "optional": true, "description": "RGBA of the default background color. If not specified, any existing override will be cleared." }
                ],
                "experimental": true
            }
        ],
        "events": [
            {
                "name": "virtualTimeBudgetExpired",
                "experimental": true,
                "description": "Notification sent after the virtual time budget for the current VirtualTimePolicy has run out."
            },
            {
                "name": "virtualTimePaused",
                "experimental": true,
                "parameters": [
                    { "name": "virtualTimeElapsed", "type": "integer", "description": "The amount of virtual time that has elapsed in milliseconds since virtual time was first enabled." }
                ],
                "description": "Notification sent after the virtual time has paused."
            }
        ]
    },
    {
        "domain": "Security",
        "description": "Security",
        "experimental": true,
        "types": [
            {
                "id": "CertificateId",
                "type": "integer",
                "description": "An internal certificate ID value."
            },
            {
                "id": "MixedContentType",
                "type": "string",
                "enum": ["blockable", "optionally-blockable", "none"],
                "description": "A description of mixed content (HTTP resources on HTTPS pages), as defined by https://www.w3.org/TR/mixed-content/#categories"
            },
            {
                "id": "SecurityState",
                "type": "string",
                "enum": ["unknown", "neutral", "insecure", "secure", "info"],
                "description": "The security level of a page or resource."
            },
            {
                "id": "SecurityStateExplanation",
                "type": "object",
                "properties": [
                    { "name": "securityState", "$ref": "SecurityState", "description": "Security state representing the severity of the factor being explained." },
                    { "name": "summary", "type": "string", "description": "Short phrase describing the type of factor." },
                    { "name": "description", "type": "string", "description": "Full text explanation of the factor." },
                    { "name": "mixedContentType", "$ref": "MixedContentType", "description": "The type of mixed content described by the explanation." },
                    { "name": "certificate", "type": "array", "items": { "type": "string" }, "description": "Page certificate." }
                ],
                "description": "An explanation of an factor contributing to the security state."
            },
            {
                "id": "InsecureContentStatus",
                "type": "object",
                "properties": [
                    { "name": "ranMixedContent", "type": "boolean", "description": "True if the page was loaded over HTTPS and ran mixed (HTTP) content such as scripts." },
                    { "name": "displayedMixedContent", "type": "boolean", "description": "True if the page was loaded over HTTPS and displayed mixed (HTTP) content such as images." },
                    { "name": "containedMixedForm", "type": "boolean", "description": "True if the page was loaded over HTTPS and contained a form targeting an insecure url." },
                    { "name": "ranContentWithCertErrors", "type": "boolean", "description": "True if the page was loaded over HTTPS without certificate errors, and ran content such as scripts that were loaded with certificate errors." },
                    { "name": "displayedContentWithCertErrors", "type": "boolean", "description": "True if the page was loaded over HTTPS without certificate errors, and displayed content such as images that were loaded with certificate errors." },
                    { "name": "ranInsecureContentStyle", "$ref": "SecurityState", "description": "Security state representing a page that ran insecure content." },
                    { "name": "displayedInsecureContentStyle", "$ref": "SecurityState", "description": "Security state representing a page that displayed insecure content." }
                ],
                "description": "Information about insecure content on the page."
            },
            {
                "id": "CertificateErrorAction",
                "type": "string",
                "enum": ["continue", "cancel"],
                "description": "The action to take when a certificate error occurs. continue will continue processing the request and cancel will cancel the request."
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables tracking security state changes."
            },
            {
                "name": "disable",
                "description": "Disables tracking security state changes."
            },
            {
                "name": "handleCertificateError",
                "description": "Handles a certificate error that fired a certificateError event.",
                "parameters": [
                    { "name": "eventId", "type": "integer", "description": "The ID of the event."},
                    { "name": "action", "$ref": "CertificateErrorAction", "description": "The action to take on the certificate error." }
                ]
            },
            {
                "name": "setOverrideCertificateErrors",
                "description": "Enable/disable overriding certificate errors. If enabled, all certificate error events need to be handled by the DevTools client and should be answered with handleCertificateError commands.",
                "parameters": [
                    { "name": "override", "type": "boolean", "description": "If true, certificate errors will be overridden."}
                ]
            }
        ],
        "events": [
            {
                "name": "securityStateChanged",
                "description": "The security state of the page changed.",
                "parameters": [
                    { "name": "securityState", "$ref": "SecurityState", "description": "Security state." },
                    { "name": "schemeIsCryptographic", "type": "boolean", "description": "True if the page was loaded over cryptographic transport such as HTTPS." },
                    { "name": "explanations", "type": "array", "items": { "$ref": "SecurityStateExplanation" }, "description": "List of explanations for the security state. If the overall security state is `insecure` or `warning`, at least one corresponding explanation should be included." },
                    { "name": "insecureContentStatus", "$ref": "InsecureContentStatus", "description": "Information about insecure content on the page." },
                    { "name": "summary", "type": "string", "description": "Overrides user-visible description of the state.", "optional": true }
                ]
            },
            {
                "name": "certificateError",
                "description": "There is a certificate error. If overriding certificate errors is enabled, then it should be handled with the handleCertificateError command. Note: this event does not fire if the certificate error has been allowed internally.",
                "parameters": [
                    { "name": "eventId", "type": "integer", "description": "The ID of the event."},
                    { "name": "errorType", "type": "string", "description": "The type of the error."},
                    { "name": "requestURL", "type": "string", "description": "The url that was requested."}
                ]
            }
        ]
    },
    {
        "domain": "Audits",
        "description": "Audits domain allows investigation of page violations and possible improvements.",
        "dependencies": ["Network"],
        "experimental": true,
        "commands": [
            {
                "name": "getEncodedResponse",
                "description": "Returns the response body and size if it were re-encoded with the specified settings. Only applies to images.",
                "parameters": [
                    { "name": "requestId", "$ref": "Network.RequestId", "description": "Identifier of the network request to get content for." },
                    { "name": "encoding", "type": "string", "enum": ["webp", "jpeg", "png"], "description": "The encoding to use." },
                    { "name": "quality", "type": "number", "optional": true, "description": "The quality of the encoding (0-1). (defaults to 1)" },
                    { "name": "sizeOnly", "type": "boolean", "optional": true, "description": "Whether to only return the size information (defaults to false)." }
                ],
                "returns": [
                    { "name": "body", "type": "string", "optional": true, "description": "The encoded body as a base64 string. Omitted if sizeOnly is true." },
                    { "name": "originalSize", "type": "integer", "description": "Size before re-encoding." },
                    { "name": "encodedSize", "type": "integer", "description": "Size after re-encoding." }
                ]
            }
        ]
    },
    {
        "domain": "Network",
        "description": "Network domain allows tracking network activities of the page. It exposes information about http, file, data and other requests and responses, their headers, bodies, timing, etc.",
        "dependencies": ["Runtime", "Security"],
        "types": [
            {
                "id": "LoaderId",
                "type": "string",
                "description": "Unique loader identifier."
            },
            {
                "id": "RequestId",
                "type": "string",
                "description": "Unique request identifier."
            },
            {
                "id": "InterceptionId",
                "type": "string",
                "description": "Unique intercepted request identifier."
            },
            {
                "id": "ErrorReason",
                "type": "string",
                "enum": ["Failed", "Aborted", "TimedOut", "AccessDenied", "ConnectionClosed", "ConnectionReset", "ConnectionRefused", "ConnectionAborted", "ConnectionFailed", "NameNotResolved", "InternetDisconnected", "AddressUnreachable"],
                "description": "Network level fetch failure reason."
            },
            {
                "id": "TimeSinceEpoch",
                "type": "number",
                "description": "UTC time in seconds, counted from January 1, 1970."
            },
            {
                "id": "MonotonicTime",
                "type": "number",
                "description": "Monotonically increasing time in seconds since an arbitrary point in the past."
            },
            {
                "id": "Headers",
                "type": "object",
                "description": "Request / response headers as keys / values of JSON object."
            },
            {
                "id": "ConnectionType",
                "type": "string",
                "enum": ["none", "cellular2g", "cellular3g", "cellular4g", "bluetooth", "ethernet", "wifi", "wimax", "other"],
                "description": "The underlying connection technology that the browser is supposedly using."
            },
            {
                "id": "CookieSameSite",
                "type": "string",
                "enum": ["Strict", "Lax"],
                "description": "Represents the cookie's 'SameSite' status: https://tools.ietf.org/html/draft-west-first-party-cookies"
            },
            {
                "id": "ResourceTiming",
                "type": "object",
                "description": "Timing information for the request.",
                "properties": [
                    { "name": "requestTime", "type": "number", "description": "Timing's requestTime is a baseline in seconds, while the other numbers are ticks in milliseconds relatively to this requestTime." },
                    { "name": "proxyStart", "type": "number", "description": "Started resolving proxy." },
                    { "name": "proxyEnd", "type": "number", "description": "Finished resolving proxy." },
                    { "name": "dnsStart", "type": "number", "description": "Started DNS address resolve." },
                    { "name": "dnsEnd", "type": "number", "description": "Finished DNS address resolve." },
                    { "name": "connectStart", "type": "number", "description": "Started connecting to the remote host." },
                    { "name": "connectEnd", "type": "number", "description": "Connected to the remote host." },
                    { "name": "sslStart", "type": "number", "description": "Started SSL handshake." },
                    { "name": "sslEnd", "type": "number", "description": "Finished SSL handshake." },
                    { "name": "workerStart", "type": "number", "description": "Started running ServiceWorker.", "experimental": true },
                    { "name": "workerReady", "type": "number", "description": "Finished Starting ServiceWorker.", "experimental": true },
                    { "name": "sendStart", "type": "number", "description": "Started sending request." },
                    { "name": "sendEnd", "type": "number", "description": "Finished sending request." },
                    { "name": "pushStart", "type": "number", "description": "Time the server started pushing request.", "experimental": true },
                    { "name": "pushEnd", "type": "number", "description": "Time the server finished pushing request.", "experimental": true },
                    { "name": "receiveHeadersEnd", "type": "number", "description": "Finished receiving response headers." }
                ]
            },
            {
                "id": "ResourcePriority",
                "type": "string",
                "enum": ["VeryLow", "Low", "Medium", "High", "VeryHigh"],
                "description": "Loading priority of a resource request."
            },
            {
                "id": "Request",
                "type": "object",
                "description": "HTTP request data.",
                "properties": [
                    { "name": "url", "type": "string", "description": "Request URL." },
                    { "name": "method", "type": "string", "description": "HTTP request method." },
                    { "name": "headers", "$ref": "Headers", "description": "HTTP request headers." },
                    { "name": "postData", "type": "string", "optional": true, "description": "HTTP POST request data." },
                    { "name": "mixedContentType", "$ref": "Security.MixedContentType", "optional": true, "description": "The mixed content type of the request." },
                    { "name": "initialPriority", "$ref": "ResourcePriority", "description": "Priority of the resource request at the time request is sent."},
                    { "name": "referrerPolicy", "type": "string", "enum": [ "unsafe-url", "no-referrer-when-downgrade", "no-referrer", "origin", "origin-when-cross-origin", "same-origin", "strict-origin", "strict-origin-when-cross-origin" ], "description": "The referrer policy of the request, as defined in https://www.w3.org/TR/referrer-policy/" },
                    { "name": "isLinkPreload", "type": "boolean", "optional": true, "description": "Whether is loaded via link preload." }
                ]
            },
            {
                "id": "SignedCertificateTimestamp",
                "type" : "object",
                "description": "Details of a signed certificate timestamp (SCT).",
                "properties": [
                    { "name": "status", "type": "string", "description": "Validation status." },
                    { "name": "origin", "type": "string", "description": "Origin." },
                    { "name": "logDescription", "type": "string", "description": "Log name / description." },
                    { "name": "logId", "type": "string", "description": "Log ID." },
                    { "name": "timestamp", "$ref": "TimeSinceEpoch", "description": "Issuance date." },
                    { "name": "hashAlgorithm", "type": "string", "description": "Hash algorithm." },
                    { "name": "signatureAlgorithm", "type": "string", "description": "Signature algorithm." },
                    { "name": "signatureData", "type": "string", "description": "Signature data." }
                ]
            },
            {
                "id": "SecurityDetails",
                "type": "object",
                "description": "Security details about a request.",
                "properties": [
                    { "name": "protocol", "type": "string", "description": "Protocol name (e.g. \"TLS 1.2\" or \"QUIC\")." },
                    { "name": "keyExchange", "type": "string", "description": "Key Exchange used by the connection, or the empty string if not applicable." },
                    { "name": "keyExchangeGroup", "type": "string", "optional": true, "description": "(EC)DH group used by the connection, if applicable." },
                    { "name": "cipher", "type": "string", "description": "Cipher name." },
                    { "name": "mac", "type": "string", "optional": true, "description": "TLS MAC. Note that AEAD ciphers do not have separate MACs." },
                    { "name": "certificateId", "$ref": "Security.CertificateId", "description": "Certificate ID value." },
                    { "name": "subjectName", "type": "string", "description": "Certificate subject name." },
                    { "name": "sanList", "type": "array", "items": { "type": "string" }, "description": "Subject Alternative Name (SAN) DNS names and IP addresses." },
                    { "name": "issuer", "type": "string", "description": "Name of the issuing CA." },
                    { "name": "validFrom", "$ref": "TimeSinceEpoch", "description": "Certificate valid from date." },
                    { "name": "validTo", "$ref": "TimeSinceEpoch", "description": "Certificate valid to (expiration) date" },
                    { "name": "signedCertificateTimestampList", "type": "array", "items": { "$ref": "SignedCertificateTimestamp" }, "description": "List of signed certificate timestamps (SCTs)." }
                ]
            },
            {
                "id": "BlockedReason",
                "type": "string",
                "description": "The reason why request was blocked.",
                "enum": ["csp", "mixed-content", "origin", "inspector", "subresource-filter", "other"],
                "experimental": true
            },
            {
                "id": "Response",
                "type": "object",
                "description": "HTTP response data.",
                "properties": [
                    { "name": "url", "type": "string", "description": "Response URL. This URL can be different from CachedResource.url in case of redirect." },
                    { "name": "status", "type": "number", "description": "HTTP response status code." },
                    { "name": "statusText", "type": "string", "description": "HTTP response status text." },
                    { "name": "headers", "$ref": "Headers", "description": "HTTP response headers." },
                    { "name": "headersText", "type": "string", "optional": true, "description": "HTTP response headers text." },
                    { "name": "mimeType", "type": "string", "description": "Resource mimeType as determined by the browser." },
                    { "name": "requestHeaders", "$ref": "Headers", "optional": true, "description": "Refined HTTP request headers that were actually transmitted over the network." },
                    { "name": "requestHeadersText", "type": "string", "optional": true, "description": "HTTP request headers text." },
                    { "name": "connectionReused", "type": "boolean", "description": "Specifies whether physical connection was actually reused for this request." },
                    { "name": "connectionId", "type": "number", "description": "Physical connection id that was actually used for this request." },
                    { "name": "remoteIPAddress", "type": "string", "optional": true, "experimental": true, "description": "Remote IP address." },
                    { "name": "remotePort", "type": "integer", "optional": true, "experimental": true, "description": "Remote port."},
                    { "name": "fromDiskCache", "type": "boolean", "optional": true, "description": "Specifies that the request was served from the disk cache." },
                    { "name": "fromServiceWorker", "type": "boolean", "optional": true, "description": "Specifies that the request was served from the ServiceWorker." },
                    { "name": "encodedDataLength", "type": "number", "optional": false, "description": "Total number of bytes received for this request so far." },
                    { "name": "timing", "$ref": "ResourceTiming", "optional": true, "description": "Timing information for the given request." },
                    { "name": "protocol", "type": "string", "optional": true, "description": "Protocol used to fetch this request." },
                    { "name": "securityState", "$ref": "Security.SecurityState", "description": "Security state of the request resource." },
                    { "name": "securityDetails", "$ref": "SecurityDetails", "optional": true, "description": "Security details for the request." }
                ]
            },
            {
                "id": "WebSocketRequest",
                "type": "object",
                "description": "WebSocket request data.",
                "experimental": true,
                "properties": [
                    { "name": "headers", "$ref": "Headers", "description": "HTTP request headers." }
                ]
            },
            {
                "id": "WebSocketResponse",
                "type": "object",
                "description": "WebSocket response data.",
                "experimental": true,
                "properties": [
                    { "name": "status", "type": "number", "description": "HTTP response status code." },
                    { "name": "statusText", "type": "string", "description": "HTTP response status text." },
                    { "name": "headers", "$ref": "Headers", "description": "HTTP response headers." },
                    { "name": "headersText", "type": "string", "optional": true, "description": "HTTP response headers text." },
                    { "name": "requestHeaders", "$ref": "Headers", "optional": true, "description": "HTTP request headers." },
                    { "name": "requestHeadersText", "type": "string", "optional": true, "description": "HTTP request headers text." }
                ]
            },
            {
                "id": "WebSocketFrame",
                "type": "object",
                "description": "WebSocket frame data.",
                "experimental": true,
                "properties": [
                    { "name": "opcode", "type": "number", "description": "WebSocket frame opcode." },
                    { "name": "mask", "type": "boolean", "description": "WebSocke frame mask." },
                    { "name": "payloadData", "type": "string", "description": "WebSocke frame payload data." }
                ]
            },
            {
                "id": "CachedResource",
                "type": "object",
                "description": "Information about the cached resource.",
                "properties": [
                    { "name": "url", "type": "string", "description": "Resource URL. This is the url of the original network request." },
                    { "name": "type", "$ref": "Page.ResourceType", "description": "Type of this resource." },
                    { "name": "response", "$ref": "Response", "optional": true, "description": "Cached response data." },
                    { "name": "bodySize", "type": "number", "description": "Cached response body size." }
                ]
            },
            {
                "id": "Initiator",
                "type": "object",
                "description": "Information about the request initiator.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["parser", "script", "preload", "other"], "description": "Type of this initiator." },
                    { "name": "stack", "$ref": "Runtime.StackTrace", "optional": true, "description": "Initiator JavaScript stack trace, set for Script only." },
                    { "name": "url", "type": "string", "optional": true, "description": "Initiator URL, set for Parser type or for Script type (when script is importing module)." },
                    { "name": "lineNumber", "type": "number", "optional": true, "description": "Initiator line number, set for Parser type or for Script type (when script is importing module) (0-based)." }
                ]
            },
            {
                "id": "Cookie",
                "type": "object",
                "description": "Cookie object",
                "properties": [
                    { "name": "name", "type": "string", "description": "Cookie name." },
                    { "name": "value", "type": "string", "description": "Cookie value." },
                    { "name": "domain", "type": "string", "description": "Cookie domain." },
                    { "name": "path", "type": "string", "description": "Cookie path." },
                    { "name": "expires", "type": "number", "description": "Cookie expiration date as the number of seconds since the UNIX epoch." },
                    { "name": "size", "type": "integer", "description": "Cookie size." },
                    { "name": "httpOnly", "type": "boolean", "description": "True if cookie is http-only." },
                    { "name": "secure", "type": "boolean", "description": "True if cookie is secure." },
                    { "name": "session", "type": "boolean", "description": "True in case of session cookie." },
                    { "name": "sameSite", "$ref": "CookieSameSite", "optional": true, "description": "Cookie SameSite type." }
                ],
                "experimental": true
            },
            {
                "id": "CookieParam",
                "type": "object",
                "description": "Cookie parameter object",
                "properties": [
                    { "name": "name", "type": "string", "description": "Cookie name." },
                    { "name": "value", "type": "string", "description": "Cookie value." },
                    { "name": "url", "type": "string", "optional": true, "description": "The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie." },
                    { "name": "domain", "type": "string", "optional": true, "description": "Cookie domain." },
                    { "name": "path", "type": "string", "optional": true, "description": "Cookie path." },
                    { "name": "secure", "type": "boolean", "optional": true, "description": "True if cookie is secure." },
                    { "name": "httpOnly", "type": "boolean", "optional": true, "description": "True if cookie is http-only." },
                    { "name": "sameSite", "$ref": "CookieSameSite", "optional": true, "description": "Cookie SameSite type." },
                    { "name": "expires", "$ref": "TimeSinceEpoch", "optional": true, "description": "Cookie expiration date, session cookie if not set" }
                ],
                "experimental": true
            },
            {
                "id": "AuthChallenge",
                "type": "object",
                "description": "Authorization challenge for HTTP status code 401 or 407.",
                "properties": [
                    { "name": "source", "type": "string", "optional": true, "enum": ["Server", "Proxy"], "description": "Source of the authentication challenge." },
                    { "name": "origin", "type": "string", "description": "Origin of the challenger." },
                    { "name": "scheme", "type": "string", "description": "The authentication scheme used, such as basic or digest" },
                    { "name": "realm", "type": "string", "description": "The realm of the challenge. May be empty." }
                ],
                "experimental": true
            },
            {
                "id": "AuthChallengeResponse",
                "type": "object",
                "description": "Response to an AuthChallenge.",
                "properties": [
                    { "name": "response", "type": "string", "enum": ["Default", "CancelAuth", "ProvideCredentials"], "description": "The decision on what to do in response to the authorization challenge.  Default means deferring to the default behavior of the net stack, which will likely either the Cancel authentication or display a popup dialog box." },
                    { "name": "username", "type": "string", "optional": true, "description": "The username to provide, possibly empty. Should only be set if response is ProvideCredentials." },
                    { "name": "password", "type": "string", "optional": true, "description": "The password to provide, possibly empty. Should only be set if response is ProvideCredentials." }
                ],
                "experimental": true
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables network tracking, network events will now be delivered to the client.",
                "parameters": [
                    { "name": "maxTotalBufferSize", "type": "integer", "optional": true, "experimental": true, "description": "Buffer size in bytes to use when preserving network payloads (XHRs, etc)." },
                    { "name": "maxResourceBufferSize", "type": "integer", "optional": true, "experimental": true, "description": "Per-resource buffer size in bytes to use when preserving network payloads (XHRs, etc)." }
                ]
            },
            {
                "name": "disable",
                "description": "Disables network tracking, prevents network events from being sent to the client."
            },
            {
                "name": "setUserAgentOverride",
                "description": "Allows overriding user agent with the given string.",
                "parameters": [
                    { "name": "userAgent", "type": "string", "description": "User agent to use." }
                ]
            },
            {
                "name": "setExtraHTTPHeaders",
                "description": "Specifies whether to always send extra HTTP headers with the requests from this page.",
                "parameters": [
                    { "name": "headers", "$ref": "Headers", "description": "Map with extra HTTP headers." }
                ]
            },
            {
                "name": "getResponseBody",
                "description": "Returns content served for the given request.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Identifier of the network request to get content for." }
                ],
                "returns": [
                    { "name": "body", "type": "string", "description": "Response body." },
                    { "name": "base64Encoded", "type": "boolean", "description": "True, if content was sent as base64." }
                ]
            },
            {
                "name": "setBlockedURLs",
                "description": "Blocks URLs from loading.",
                "parameters": [
                    { "name": "urls", "type": "array", "items": { "type": "string" }, "description": "URL patterns to block. Wildcards ('*') are allowed." }
                ],
                "experimental": true
            },
            {
                "name": "replayXHR",
                "description": "This method sends a new XMLHttpRequest which is identical to the original one. The following parameters should be identical: method, url, async, request body, extra headers, withCredentials attribute, user, password.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Identifier of XHR to replay." }
                ],
                "experimental": true
            },
            {
                "name": "canClearBrowserCache",
                "description": "Tells whether clearing browser cache is supported.",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if browser cache can be cleared." }
                ]
            },
            {
                "name": "clearBrowserCache",
                "description": "Clears browser cache."
            },
            {
                "name": "canClearBrowserCookies",
                "description": "Tells whether clearing browser cookies is supported.",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if browser cookies can be cleared." }
                ]
            },
            {
                "name": "clearBrowserCookies",
                "description": "Clears browser cookies."
            },
            {
                "name": "getCookies",
                "parameters": [
                    { "name": "urls", "type": "array", "items": { "type": "string" }, "optional": true, "description": "The list of URLs for which applicable cookies will be fetched" }
                ],
                "returns": [
                    { "name": "cookies", "type": "array", "items": { "$ref": "Cookie" }, "description": "Array of cookie objects." }
                ],
                "description": "Returns all browser cookies for the current URL. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.",
                "experimental": true
            },
            {
                "name": "getAllCookies",
                "returns": [
                    { "name": "cookies", "type": "array", "items": { "$ref": "Cookie" }, "description": "Array of cookie objects." }
                ],
                "description": "Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.",
                "experimental": true
            },
            {
                "name": "deleteCookies",
                "parameters": [
                    { "name": "name", "type": "string", "description": "Name of the cookies to remove." },
                    { "name": "url", "type": "string", "optional": true, "description": "If specified, deletes all the cookies with the given name where domain and path match provided URL." },
                    { "name": "domain", "type": "string", "optional": true, "description": "If specified, deletes only cookies with the exact domain." },
                    { "name": "path", "type": "string", "optional": true, "description": "If specified, deletes only cookies with the exact path." }
                ],
                "description": "Deletes browser cookies with matching name and url or domain/path pair.",
                "experimental": true
            },
            {
                "name": "setCookie",
                "parameters": [
                    { "name": "name", "type": "string", "description": "Cookie name." },
                    { "name": "value", "type": "string", "description": "Cookie value." },
                    { "name": "url", "type": "string", "optional": true, "description": "The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie." },
                    { "name": "domain", "type": "string", "optional": true, "description": "Cookie domain." },
                    { "name": "path", "type": "string", "optional": true, "description": "Cookie path." },
                    { "name": "secure", "type": "boolean", "optional": true, "description": "True if cookie is secure." },
                    { "name": "httpOnly", "type": "boolean", "optional": true, "description": "True if cookie is http-only." },
                    { "name": "sameSite", "$ref": "CookieSameSite", "optional": true, "description": "Cookie SameSite type." },
                    { "name": "expires", "$ref": "TimeSinceEpoch", "optional": true, "description": "Cookie expiration date, session cookie if not set" }
                ],
                "returns": [
                    { "name": "success", "type": "boolean", "description": "True if successfully set cookie." }
                ],
                "description": "Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.",
                "experimental": true
            },
            {
                "name": "setCookies",
                "parameters": [
                    { "name": "cookies", "type": "array", "items": { "$ref": "CookieParam" }, "description": "Cookies to be set." }
                ],
                "description": "Sets given cookies.",
                "experimental": true
            },
            {
                "name": "canEmulateNetworkConditions",
                "description": "Tells whether emulation of network conditions is supported.",
                "returns": [
                  { "name": "result", "type": "boolean", "description": "True if emulation of network conditions is supported." }
                ],
                "experimental": true
            },
            {
                "name": "emulateNetworkConditions",
                "description": "Activates emulation of network conditions.",
                "parameters": [
                    { "name": "offline", "type": "boolean", "description": "True to emulate internet disconnection." },
                    { "name": "latency", "type": "number", "description": "Minimum latency from request sent to response headers received (ms)." },
                    { "name": "downloadThroughput", "type": "number", "description": "Maximal aggregated download throughput (bytes/sec). -1 disables download throttling." },
                    { "name": "uploadThroughput", "type": "number", "description": "Maximal aggregated upload throughput (bytes/sec).  -1 disables upload throttling." },
                    { "name": "connectionType", "$ref": "ConnectionType", "optional": true, "description": "Connection type if known."}
                ]
            },
            {
                "name": "setCacheDisabled",
                "parameters": [
                    { "name": "cacheDisabled", "type": "boolean", "description": "Cache disabled state." }
                ],
                "description": "Toggles ignoring cache for each request. If <code>true</code>, cache will not be used."
            },
            {
                "name": "setBypassServiceWorker",
                "parameters": [
                    { "name": "bypass", "type": "boolean", "description": "Bypass service worker and load from network." }
                ],
                "experimental": true,
                "description": "Toggles ignoring of service worker for each request."
            },
            {
                "name": "setDataSizeLimitsForTest",
                "parameters": [
                    { "name": "maxTotalSize", "type": "integer", "description": "Maximum total buffer size." },
                    { "name": "maxResourceSize", "type": "integer", "description": "Maximum per-resource size." }
                ],
                "description": "For testing.",
                "experimental": true
            },
            {
                "name": "getCertificate",
                "description": "Returns the DER-encoded certificate.",
                "parameters": [
                    { "name": "origin", "type": "string", "description": "Origin to get certificate for." }
                ],
                "returns": [
                    { "name": "tableNames", "type": "array", "items": { "type": "string" } }
                ],
                "experimental": true
            },
            {
                "name": "setRequestInterceptionEnabled",
                "description": "Sets the requests to intercept that match a the provided patterns.",
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "Whether requests should be intercepted. If patterns is not set, matches all and resets any previously set patterns. Other parameters are ignored if false." },
                    { "name": "patterns", "type": "array", "optional": true, "items": { "type": "string" }, "description": "URLs matching any of these patterns will be forwarded and wait for the corresponding continueInterceptedRequest call. Wildcards ('*' -> zero or more, '?' -> exactly one) are allowed. Escape character is backslash. If omitted equivalent to ['*'] (intercept all)." }
                ],
                "experimental": true
            },
            {
                "name": "continueInterceptedRequest",
                "description": "Response to Network.requestIntercepted which either modifies the request to continue with any modifications, or blocks it, or completes it with the provided response bytes. If a network fetch occurs as a result which encounters a redirect an additional Network.requestIntercepted event will be sent with the same InterceptionId.",
                "parameters": [
                    { "name": "interceptionId", "$ref": "InterceptionId" },
                    { "name": "errorReason", "$ref": "ErrorReason", "optional": true, "description": "If set this causes the request to fail with the given reason. Passing <code>Aborted</code> for requests marked with <code>isNavigationRequest</code> also cancels the navigation. Must not be set in response to an authChallenge." },
                    { "name": "rawResponse", "type": "string", "optional": true, "description": "If set the requests completes using with the provided base64 encoded raw response, including HTTP status line and headers etc... Must not be set in response to an authChallenge." },
                    { "name": "url", "type": "string", "optional": true, "description": "If set the request url will be modified in a way that's not observable by page. Must not be set in response to an authChallenge." },
                    { "name": "method", "type": "string", "optional": true, "description": "If set this allows the request method to be overridden. Must not be set in response to an authChallenge."},
                    { "name": "postData", "type": "string", "optional": true, "description": "If set this allows postData to be set. Must not be set in response to an authChallenge."},
                    { "name": "headers", "$ref": "Headers", "optional": true, "description": "If set this allows the request headers to be changed. Must not be set in response to an authChallenge."},
                    { "name": "authChallengeResponse", "$ref": "AuthChallengeResponse", "optional": true, "description": "Response to a requestIntercepted with an authChallenge. Must not be set otherwise." }
                ],
                "experimental": true
            }
        ],
        "events": [
            {
                "name": "resourceChangedPriority",
                "description": "Fired when resource loading priority is changed",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "newPriority", "$ref": "ResourcePriority", "description": "New priority" },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." }
                ],
                "experimental": true
            },
            {
                "name": "requestWillBeSent",
                "description": "Fired when page is about to send HTTP request.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "loaderId", "$ref": "LoaderId", "description": "Loader identifier. Empty string if the request is fetched form worker." },
                    { "name": "documentURL", "type": "string", "description": "URL of the document this request is loaded for." },
                    { "name": "request", "$ref": "Request", "description": "Request data." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "wallTime", "$ref": "TimeSinceEpoch", "experimental": true, "description": "Timestamp." },
                    { "name": "initiator", "$ref": "Initiator", "description": "Request initiator." },
                    { "name": "redirectResponse", "optional": true, "$ref": "Response", "description": "Redirect response data." },
                    { "name": "type", "$ref": "Page.ResourceType", "optional": true, "experimental": true, "description": "Type of this resource." },
                    { "name": "frameId", "optional": true, "$ref": "Page.FrameId", "description": "Frame identifier.", "experimental": true }
                ]
            },
            {
                "name": "requestServedFromCache",
                "description": "Fired if request ended up loading from cache.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." }
                ]
            },
            {
                "name": "responseReceived",
                "description": "Fired when HTTP response is available.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "loaderId", "$ref": "LoaderId", "description": "Loader identifier. Empty string if the request is fetched form worker." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "type", "$ref": "Page.ResourceType", "description": "Resource type." },
                    { "name": "response", "$ref": "Response", "description": "Response data." },
                    { "name": "frameId", "optional": true, "$ref": "Page.FrameId", "description": "Frame identifier.", "experimental": true }
                ]
            },
            {
                "name": "dataReceived",
                "description": "Fired when data chunk was received over the network.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "dataLength", "type": "integer", "description": "Data chunk length." },
                    { "name": "encodedDataLength", "type": "integer", "description": "Actual bytes received (might be less than dataLength for compressed encodings)." }
                ]
            },
            {
                "name": "loadingFinished",
                "description": "Fired when HTTP request has finished loading.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "encodedDataLength", "type": "number", "description": "Total number of bytes received for this request." }
                ]
            },
            {
                "name": "loadingFailed",
                "description": "Fired when HTTP request has failed to load.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "type", "$ref": "Page.ResourceType", "description": "Resource type." },
                    { "name": "errorText", "type": "string", "description": "User friendly error message." },
                    { "name": "canceled", "type": "boolean", "optional": true, "description": "True if loading was canceled." },
                    { "name": "blockedReason", "$ref": "BlockedReason", "optional": true, "description": "The reason why loading was blocked, if any.", "experimental": true }
                ]
            },
            {
                "name": "webSocketWillSendHandshakeRequest",
                "description": "Fired when WebSocket is about to initiate handshake.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "wallTime", "$ref": "TimeSinceEpoch", "experimental": true, "description": "UTC Timestamp." },
                    { "name": "request", "$ref": "WebSocketRequest", "description": "WebSocket request data." }
                ],
                "experimental": true
            },
            {
                "name": "webSocketHandshakeResponseReceived",
                "description": "Fired when WebSocket handshake response becomes available.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "response", "$ref": "WebSocketResponse", "description": "WebSocket response data." }
                ],
                "experimental": true
            },
            {
                "name": "webSocketCreated",
                "description": "Fired upon WebSocket creation.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "url", "type": "string", "description": "WebSocket request URL." },
                    { "name": "initiator", "$ref": "Initiator", "optional": true, "description": "Request initiator." }
                ],
                "experimental": true
            },
            {
                "name": "webSocketClosed",
                "description": "Fired when WebSocket is closed.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." }
                ],
                "experimental": true
            },
            {
                "name": "webSocketFrameReceived",
                "description": "Fired when WebSocket frame is received.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "response", "$ref": "WebSocketFrame", "description": "WebSocket response data." }
                ],
                "experimental": true
            },
            {
                "name": "webSocketFrameError",
                "description": "Fired when WebSocket frame error occurs.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "errorMessage", "type": "string", "description": "WebSocket frame error message." }
                ],
                "experimental": true
            },
            {
                "name": "webSocketFrameSent",
                "description": "Fired when WebSocket frame is sent.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "response", "$ref": "WebSocketFrame", "description": "WebSocket response data." }
                ],
                "experimental": true
            },
            {
                "name": "eventSourceMessageReceived",
                "description": "Fired when EventSource message is received.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "MonotonicTime", "description": "Timestamp." },
                    { "name": "eventName", "type": "string", "description": "Message type." },
                    { "name": "eventId", "type": "string", "description": "Message identifier." },
                    { "name": "data", "type": "string", "description": "Message content." }
                ],
                "experimental": true
            },
            {
                "name": "requestIntercepted",
                "description": "Details of an intercepted HTTP request, which must be either allowed, blocked, modified or mocked.",
                "parameters": [
                    { "name": "interceptionId", "$ref": "InterceptionId", "description": "Each request the page makes will have a unique id, however if any redirects are encountered while processing that fetch, they will be reported with the same id as the original fetch. Likewise if HTTP authentication is needed then the same fetch id will be used." },
                    { "name": "request", "$ref": "Request" },
                    { "name": "resourceType", "$ref": "Page.ResourceType", "description": "How the requested resource will be used." },
                    { "name": "isNavigationRequest", "type": "boolean", "description": "Whether this is a navigation request, which can abort the navigation completely." },
                    { "name": "redirectHeaders", "$ref": "Headers", "optional": true, "description": "HTTP response headers, only sent if a redirect was intercepted." },
                    { "name": "redirectStatusCode", "type": "integer", "optional": true, "description": "HTTP response code, only sent if a redirect was intercepted." },
                    { "name": "redirectUrl", "optional": true, "type": "string", "description": "Redirect location, only sent if a redirect was intercepted."},
                    { "name": "authChallenge", "$ref": "AuthChallenge", "optional": true, "description": "Details of the Authorization Challenge encountered. If this is set then continueInterceptedRequest must contain an authChallengeResponse." }
                ],
                "experimental": true
            }
        ]
    },
    {
        "domain": "Database",
        "experimental": true,
        "types": [
            {
                "id": "DatabaseId",
                "type": "string",
                "description": "Unique identifier of Database object.",
                "experimental": true
            },
            {
                "id": "Database",
                "type": "object",
                "description": "Database object.",
                "experimental": true,
                "properties": [
                    { "name": "id", "$ref": "DatabaseId", "description": "Database ID." },
                    { "name": "domain", "type": "string", "description": "Database domain." },
                    { "name": "name", "type": "string", "description": "Database name." },
                    { "name": "version", "type": "string", "description": "Database version." }
                ]
            },
            {
                "id": "Error",
                "type": "object",
                "description": "Database error.",
                "properties": [
                    { "name": "message", "type": "string", "description": "Error message." },
                    { "name": "code", "type": "integer", "description": "Error code." }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables database tracking, database events will now be delivered to the client."
            },
            {
                "name": "disable",
                "description": "Disables database tracking, prevents database events from being sent to the client."
            },
            {
                "name": "getDatabaseTableNames",
                "parameters": [
                    { "name": "databaseId", "$ref": "DatabaseId" }
                ],
                "returns": [
                    { "name": "tableNames", "type": "array", "items": { "type": "string" } }
                ]
            },
            {
                "name": "executeSQL",
                "parameters": [
                    { "name": "databaseId", "$ref": "DatabaseId" },
                    { "name": "query", "type": "string" }
                ],
                "returns": [
                    { "name": "columnNames", "type": "array", "optional": true, "items": { "type": "string" } },
                    { "name": "values", "type": "array", "optional": true, "items": { "type": "any" }},
                    { "name": "sqlError", "$ref": "Error", "optional": true }
                ]
            }
        ],
        "events": [
            {
                "name": "addDatabase",
                "parameters": [
                    { "name": "database", "$ref": "Database" }
                ]
            }
        ]
    },
    {
        "domain": "IndexedDB",
        "dependencies": ["Runtime"],
        "experimental": true,
        "types": [
            {
                "id": "DatabaseWithObjectStores",
                "type": "object",
                "description": "Database with an array of object stores.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Database name." },
                    { "name": "version", "type": "integer", "description": "Database version." },
                    { "name": "objectStores", "type": "array", "items": { "$ref": "ObjectStore" }, "description": "Object stores in this database." }
                ]
            },
            {
                "id": "ObjectStore",
                "type": "object",
                "description": "Object store.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Object store name." },
                    { "name": "keyPath", "$ref": "KeyPath", "description": "Object store key path." },
                    { "name": "autoIncrement", "type": "boolean", "description": "If true, object store has auto increment flag set." },
                    { "name": "indexes", "type": "array", "items": { "$ref": "ObjectStoreIndex" }, "description": "Indexes in this object store." }
                ]
            },
            {
                "id": "ObjectStoreIndex",
                "type": "object",
                "description": "Object store index.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Index name." },
                    { "name": "keyPath", "$ref": "KeyPath", "description": "Index key path." },
                    { "name": "unique", "type": "boolean", "description": "If true, index is unique." },
                    { "name": "multiEntry", "type": "boolean", "description": "If true, index allows multiple entries for a key." }
                ]
            },
            {
                "id": "Key",
                "type": "object",
                "description": "Key.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["number", "string", "date", "array"], "description": "Key type." },
                    { "name": "number", "type": "number", "optional": true, "description": "Number value." },
                    { "name": "string", "type": "string", "optional": true, "description": "String value." },
                    { "name": "date", "type": "number", "optional": true, "description": "Date value." },
                    { "name": "array", "type": "array", "optional": true, "items": { "$ref": "Key" }, "description": "Array value." }
                ]
            },
            {
                "id": "KeyRange",
                "type": "object",
                "description": "Key range.",
                "properties": [
                    { "name": "lower", "$ref": "Key", "optional": true, "description": "Lower bound." },
                    { "name": "upper", "$ref": "Key", "optional": true, "description": "Upper bound." },
                    { "name": "lowerOpen", "type": "boolean", "description": "If true lower bound is open." },
                    { "name": "upperOpen", "type": "boolean", "description": "If true upper bound is open." }
                ]
            },
            {
                "id": "DataEntry",
                "type": "object",
                "description": "Data entry.",
                "properties": [
                    { "name": "key", "$ref": "Runtime.RemoteObject", "description": "Key object." },
                    { "name": "primaryKey", "$ref": "Runtime.RemoteObject", "description": "Primary key object." },
                    { "name": "value", "$ref": "Runtime.RemoteObject", "description": "Value object." }
                ]
            },
            {
                "id": "KeyPath",
                "type": "object",
                "description": "Key path.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["null", "string", "array"], "description": "Key path type." },
                    { "name": "string", "type": "string", "optional": true, "description": "String value." },
                    { "name": "array", "type": "array", "optional": true, "items": { "type": "string" }, "description": "Array value." }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables events from backend."
            },
            {
                "name": "disable",
                "description": "Disables events from backend."
            },
            {
                "name": "requestDatabaseNames",
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." }
                ],
                "returns": [
                    { "name": "databaseNames", "type": "array", "items": { "type": "string" }, "description": "Database names for origin." }
                ],
                "description": "Requests database names for given security origin."
            },
            {
                "name": "requestDatabase",
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." },
                    { "name": "databaseName", "type": "string", "description": "Database name." }
                ],
                "returns": [
                    { "name": "databaseWithObjectStores", "$ref": "DatabaseWithObjectStores", "description": "Database with an array of object stores." }
                ],
                "description": "Requests database with given name in given frame."
            },
            {
                "name": "requestData",
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." },
                    { "name": "databaseName", "type": "string", "description": "Database name." },
                    { "name": "objectStoreName", "type": "string", "description": "Object store name." },
                    { "name": "indexName", "type": "string", "description": "Index name, empty string for object store data requests." },
                    { "name": "skipCount", "type": "integer", "description": "Number of records to skip." },
                    { "name": "pageSize", "type": "integer", "description": "Number of records to fetch." },
                    { "name": "keyRange", "$ref": "KeyRange", "optional": true, "description": "Key range." }
                ],
                "returns": [
                    { "name": "objectStoreDataEntries", "type": "array", "items": { "$ref": "DataEntry" }, "description": "Array of object store data entries." },
                    { "name": "hasMore", "type": "boolean", "description": "If true, there are more entries to fetch in the given range." }
                ],
                "description": "Requests data from object store or index."
            },
            {
                "name": "clearObjectStore",
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." },
                    { "name": "databaseName", "type": "string", "description": "Database name." },
                    { "name": "objectStoreName", "type": "string", "description": "Object store name." }
                ],
                "returns": [
                ],
                "description": "Clears all entries from an object store."
            },
            {
                "name": "deleteDatabase",
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." },
                    { "name": "databaseName", "type": "string", "description": "Database name." }
                ],
                "returns": [
                ],
                "description": "Deletes a database."
            }
        ]
    },
    {
        "domain": "CacheStorage",
        "experimental": true,
        "types": [
            {
                "id": "CacheId",
                "type": "string",
                "description": "Unique identifier of the Cache object."
            },
            {
                "id": "DataEntry",
                "type": "object",
                "description": "Data entry.",
                "properties": [
                    { "name": "requestURL", "type": "string", "description": "Request URL." },
                    { "name": "requestMethod", "type": "string", "description": "Request method." },
                    { "name": "requestHeaders", "type": "array", "items": { "$ref": "Header" }, "description": "Request headers" },
                    { "name": "responseTime", "type": "number", "description": "Number of seconds since epoch." },
                    { "name": "responseStatus", "type": "integer", "description": "HTTP response status code." },
                    { "name": "responseStatusText", "type": "string", "description": "HTTP response status text." },
                    { "name": "responseHeaders", "type": "array", "items": { "$ref": "Header" }, "description": "Response headers" }
                ]
            },
            {
                "id": "Cache",
                "type": "object",
                "description": "Cache identifier.",
                "properties": [
                    { "name": "cacheId", "$ref": "CacheId", "description": "An opaque unique id of the cache." },
                    { "name": "securityOrigin", "type": "string", "description": "Security origin of the cache." },
                    { "name": "cacheName", "type": "string", "description": "The name of the cache." }
                ]
            },
            {
                "id": "Header",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string" },
                    { "name": "value", "type": "string" }
                ]
            },
            {
                "id": "CachedResponse",
                "type": "object",
                "description": "Cached response",
                "properties": [
                    { "name": "body", "type": "string", "description": "Entry content, base64-encoded." }
                ]
            }
        ],
        "commands": [
            {
                "name": "requestCacheNames",
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." }
                ],
                "returns": [
                    { "name": "caches", "type": "array", "items": { "$ref": "Cache" }, "description": "Caches for the security origin." }
                ],
                "description": "Requests cache names."
            },
            {
                "name": "requestEntries",
                "parameters": [
                    { "name": "cacheId", "$ref": "CacheId", "description": "ID of cache to get entries from." },
                    { "name": "skipCount", "type": "integer", "description": "Number of records to skip." },
                    { "name": "pageSize", "type": "integer", "description": "Number of records to fetch." }
                ],
                "returns": [
                    { "name": "cacheDataEntries", "type": "array", "items": { "$ref": "DataEntry" }, "description": "Array of object store data entries." },
                    { "name": "hasMore", "type": "boolean", "description": "If true, there are more entries to fetch in the given range." }
                ],
                "description": "Requests data from cache."
            },
            {
                "name": "deleteCache",
                "parameters": [
                    { "name": "cacheId", "$ref": "CacheId", "description": "Id of cache for deletion." }
                ],
                "description": "Deletes a cache."
            },
            {
                "name": "deleteEntry",
                "parameters": [
                    { "name": "cacheId", "$ref": "CacheId", "description": "Id of cache where the entry will be deleted." },
                    { "name": "request", "type": "string", "description": "URL spec of the request." }
                ],
                "description": "Deletes a cache entry."
            },
            {
                "name": "requestCachedResponse",
                "parameters": [
                    { "name": "cacheId", "$ref": "CacheId", "description": "Id of cache that contains the enty." },
                    { "name": "requestURL", "type": "string", "description": "URL spec of the request." }
                ],
                "returns": [
                    { "name": "response", "$ref": "CachedResponse", "description": "Response read from the cache."}
                ],
                "description": "Fetches cache entry."
            }
        ]
    },
    {
        "domain": "DOMStorage",
        "experimental": true,
        "description": "Query and modify DOM storage.",
        "types": [
            {
                "id": "StorageId",
                "type": "object",
                "description": "DOM Storage identifier.",
                "experimental": true,
                "properties": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin for the storage." },
                    { "name": "isLocalStorage", "type": "boolean", "description": "Whether the storage is local storage (not session storage)." }
                ]
            },
            {
                "id": "Item",
                "type": "array",
                "description": "DOM Storage item.",
                "experimental": true,
                "items": { "type": "string" }
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables storage tracking, storage events will now be delivered to the client."
            },
            {
                "name": "disable",
                "description": "Disables storage tracking, prevents storage events from being sent to the client."
            },
            {
                "name": "clear",
                "parameters": [
                    { "name": "storageId", "$ref": "StorageId" }
                ]
            },
            {
                "name": "getDOMStorageItems",
                "parameters": [
                    { "name": "storageId", "$ref": "StorageId" }
                ],
                "returns": [
                    { "name": "entries", "type": "array", "items": { "$ref": "Item" } }
                ]
            },
            {
                "name": "setDOMStorageItem",
                "parameters": [
                    { "name": "storageId", "$ref": "StorageId" },
                    { "name": "key", "type": "string" },
                    { "name": "value", "type": "string" }
                ]
            },
            {
                "name": "removeDOMStorageItem",
                "parameters": [
                    { "name": "storageId", "$ref": "StorageId" },
                    { "name": "key", "type": "string" }
                ]
            }
        ],
        "events": [
            {
                "name": "domStorageItemsCleared",
                "parameters": [
                    { "name": "storageId",  "$ref": "StorageId" }
                ]
            },
            {
                "name": "domStorageItemRemoved",
                "parameters": [
                    { "name": "storageId",  "$ref": "StorageId" },
                    { "name": "key", "type": "string" }
                ]
            },
            {
                "name": "domStorageItemAdded",
                "parameters": [
                    { "name": "storageId",  "$ref": "StorageId" },
                    { "name": "key", "type": "string" },
                    { "name": "newValue", "type": "string" }
                ]
            },
            {
                "name": "domStorageItemUpdated",
                "parameters": [
                    { "name": "storageId",  "$ref": "StorageId" },
                    { "name": "key", "type": "string" },
                    { "name": "oldValue", "type": "string" },
                    { "name": "newValue", "type": "string" }
                ]
            }
        ]
    },
    {
        "domain": "ApplicationCache",
        "experimental": true,
        "types": [
            {
                "id": "ApplicationCacheResource",
                "type": "object",
                "description": "Detailed application cache resource information.",
                "properties": [
                    { "name": "url", "type": "string", "description": "Resource url." },
                    { "name": "size", "type": "integer", "description": "Resource size." },
                    { "name": "type", "type": "string", "description": "Resource type." }
                ]
            },
            {
                "id": "ApplicationCache",
                "type": "object",
                "description": "Detailed application cache information.",
                "properties": [
                    { "name": "manifestURL", "type": "string", "description": "Manifest URL." },
                    { "name": "size", "type": "number", "description": "Application cache size." },
                    { "name": "creationTime", "type": "number", "description": "Application cache creation time." },
                    { "name": "updateTime", "type": "number", "description": "Application cache update time." },
                    { "name": "resources", "type": "array", "items": { "$ref": "ApplicationCacheResource" }, "description": "Application cache resources." }
                ]
            },
            {
                "id": "FrameWithManifest",
                "type": "object",
                "description": "Frame identifier - manifest URL pair.",
                "properties": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Frame identifier." },
                    { "name": "manifestURL", "type": "string", "description": "Manifest URL." },
                    { "name": "status", "type": "integer", "description": "Application cache status." }
                ]
            }
        ],
        "commands": [
            {
                "name": "getFramesWithManifests",
                "returns": [
                    { "name": "frameIds", "type": "array", "items": { "$ref": "FrameWithManifest" }, "description": "Array of frame identifiers with manifest urls for each frame containing a document associated with some application cache." }
                ],
                "description": "Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache."
            },
            {
                "name": "enable",
                "description": "Enables application cache domain notifications."
            },
            {
                "name": "getManifestForFrame",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame containing document whose manifest is retrieved." }
                ],
                "returns": [
                    { "name": "manifestURL", "type": "string", "description": "Manifest URL for document in the given frame." }
                ],
                "description": "Returns manifest URL for document in the given frame."
            },
            {
                "name": "getApplicationCacheForFrame",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame containing document whose application cache is retrieved." }
                ],
                "returns": [
                    { "name": "applicationCache", "$ref": "ApplicationCache", "description": "Relevant application cache data for the document in given frame." }
                ],
                "description": "Returns relevant application cache data for the document in given frame."
            }
        ],
        "events": [
            {
                "name": "applicationCacheStatusUpdated",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame containing document whose application cache updated status." },
                    { "name": "manifestURL", "type": "string", "description": "Manifest URL." },
                    { "name": "status", "type": "integer", "description": "Updated application cache status." }
                ]
            },
            {
                "name": "networkStateUpdated",
                "parameters": [
                    { "name": "isNowOnline", "type": "boolean" }
                ]
            }
        ]
    },
    {
        "domain": "DOM",
        "description": "This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object that has an <code>id</code>. This <code>id</code> can be used to get additional information on the Node, resolve it into the JavaScript object wrapper, etc. It is important that client receives DOM events only for the nodes that are known to the client. Backend keeps track of the nodes that were sent to the client and never sends the same node twice. It is client's responsibility to collect information about the nodes that were sent to the client.<p>Note that <code>iframe</code> owner elements will return corresponding document elements as their child nodes.</p>",
        "dependencies": ["Runtime"],
        "types": [
            {
                "id": "NodeId",
                "type": "integer",
                "description": "Unique DOM node identifier."
            },
            {
                "id": "BackendNodeId",
                "type": "integer",
                "description": "Unique DOM node identifier used to reference a node that may not have been pushed to the front-end.",
                "experimental": true
            },
            {
                "id": "BackendNode",
                "type": "object",
                "properties": [
                    { "name": "nodeType", "type": "integer", "description": "<code>Node</code>'s nodeType." },
                    { "name": "nodeName", "type": "string", "description": "<code>Node</code>'s nodeName." },
                    { "name": "backendNodeId", "$ref": "BackendNodeId" }
                ],
                "experimental": true,
                "description": "Backend node with a friendly name."
            },
            {
                "id": "PseudoType",
                "type": "string",
                "enum": [
                    "first-line",
                    "first-letter",
                    "before",
                    "after",
                    "backdrop",
                    "selection",
                    "first-line-inherited",
                    "scrollbar",
                    "scrollbar-thumb",
                    "scrollbar-button",
                    "scrollbar-track",
                    "scrollbar-track-piece",
                    "scrollbar-corner",
                    "resizer",
                    "input-list-button"
                ],
                "description": "Pseudo element type."
            },
            {
                "id": "ShadowRootType",
                "type": "string",
                "enum": ["user-agent", "open", "closed"],
                "description": "Shadow root type."
            },
            {
                "id": "Node",
                "type": "object",
                "properties": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Node identifier that is passed into the rest of the DOM messages as the <code>nodeId</code>. Backend will only push node with given <code>id</code> once. It is aware of all requested nodes and will only fire DOM events for nodes known to the client." },
                    { "name": "parentId", "$ref": "NodeId", "optional": true, "description": "The id of the parent node if any.", "experimental": true },
                    { "name": "backendNodeId", "$ref": "BackendNodeId", "description": "The BackendNodeId for this node.", "experimental": true },
                    { "name": "nodeType", "type": "integer", "description": "<code>Node</code>'s nodeType." },
                    { "name": "nodeName", "type": "string", "description": "<code>Node</code>'s nodeName." },
                    { "name": "localName", "type": "string", "description": "<code>Node</code>'s localName." },
                    { "name": "nodeValue", "type": "string", "description": "<code>Node</code>'s nodeValue." },
                    { "name": "childNodeCount", "type": "integer", "optional": true, "description": "Child count for <code>Container</code> nodes." },
                    { "name": "children", "type": "array", "optional": true, "items": { "$ref": "Node" }, "description": "Child nodes of this node when requested with children." },
                    { "name": "attributes", "type": "array", "optional": true, "items": { "type": "string" }, "description": "Attributes of the <code>Element</code> node in the form of flat array <code>[name1, value1, name2, value2]</code>." },
                    { "name": "documentURL", "type": "string", "optional": true, "description": "Document URL that <code>Document</code> or <code>FrameOwner</code> node points to." },
                    { "name": "baseURL", "type": "string", "optional": true, "description": "Base URL that <code>Document</code> or <code>FrameOwner</code> node uses for URL completion.", "experimental": true },
                    { "name": "publicId", "type": "string", "optional": true, "description": "<code>DocumentType</code>'s publicId." },
                    { "name": "systemId", "type": "string", "optional": true, "description": "<code>DocumentType</code>'s systemId." },
                    { "name": "internalSubset", "type": "string", "optional": true, "description": "<code>DocumentType</code>'s internalSubset." },
                    { "name": "xmlVersion", "type": "string", "optional": true, "description": "<code>Document</code>'s XML version in case of XML documents." },
                    { "name": "name", "type": "string", "optional": true, "description": "<code>Attr</code>'s name." },
                    { "name": "value", "type": "string", "optional": true, "description": "<code>Attr</code>'s value." },
                    { "name": "pseudoType", "$ref": "PseudoType", "optional": true, "description": "Pseudo element type for this node." },
                    { "name": "shadowRootType", "$ref": "ShadowRootType", "optional": true, "description": "Shadow root type." },
                    { "name": "frameId", "$ref": "Page.FrameId", "optional": true, "description": "Frame ID for frame owner elements.", "experimental": true },
                    { "name": "contentDocument", "$ref": "Node", "optional": true, "description": "Content document for frame owner elements." },
                    { "name": "shadowRoots", "type": "array", "optional": true, "items": { "$ref": "Node" }, "description": "Shadow root list for given element host.", "experimental": true },
                    { "name": "templateContent", "$ref": "Node", "optional": true, "description": "Content document fragment for template elements.", "experimental": true },
                    { "name": "pseudoElements", "type": "array", "items": { "$ref": "Node" }, "optional": true, "description": "Pseudo elements associated with this node.", "experimental": true },
                    { "name": "importedDocument", "$ref": "Node", "optional": true, "description": "Import document for the HTMLImport links." },
                    { "name": "distributedNodes", "type": "array", "items": { "$ref": "BackendNode" }, "optional": true, "description": "Distributed nodes for given insertion point.", "experimental": true },
                    { "name": "isSVG", "type": "boolean", "optional": true, "description": "Whether the node is SVG.", "experimental": true }
                ],
                "description": "DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes. DOMNode is a base node mirror type."
            },
            {
                "id": "RGBA",
                "type": "object",
                "properties": [
                    { "name": "r", "type": "integer", "description": "The red component, in the [0-255] range." },
                    { "name": "g", "type": "integer", "description": "The green component, in the [0-255] range." },
                    { "name": "b", "type": "integer", "description": "The blue component, in the [0-255] range." },
                    { "name": "a", "type": "number", "optional": true, "description": "The alpha component, in the [0-1] range (default: 1)." }
                ],
                "description": "A structure holding an RGBA color."
            },
            {
                "id": "Quad",
                "type": "array",
                "items": { "type": "number" },
                "minItems": 8,
                "maxItems": 8,
                "description": "An array of quad vertices, x immediately followed by y for each point, points clock-wise.",
                "experimental": true
            },
            {
                "id": "BoxModel",
                "type": "object",
                "experimental": true,
                "properties": [
                    { "name": "content", "$ref": "Quad", "description": "Content box" },
                    { "name": "padding", "$ref": "Quad", "description": "Padding box" },
                    { "name": "border", "$ref": "Quad", "description": "Border box" },
                    { "name": "margin", "$ref": "Quad", "description": "Margin box" },
                    { "name": "width", "type": "integer", "description": "Node width" },
                    { "name": "height", "type": "integer", "description": "Node height" },
                    { "name": "shapeOutside", "$ref": "ShapeOutsideInfo", "optional": true, "description": "Shape outside coordinates" }
                ],
                "description": "Box model."
            },
            {
                "id": "ShapeOutsideInfo",
                "type": "object",
                "experimental": true,
                "properties": [
                    { "name": "bounds", "$ref": "Quad", "description": "Shape bounds" },
                    { "name": "shape", "type": "array", "items": { "type": "any"}, "description": "Shape coordinate details" },
                    { "name": "marginShape", "type": "array", "items": { "type": "any"}, "description": "Margin shape bounds" }
                ],
                "description": "CSS Shape Outside details."
            },
            {
                "id": "Rect",
                "type": "object",
                "experimental": true,
                "properties": [
                    { "name": "x", "type": "number", "description": "X coordinate" },
                    { "name": "y", "type": "number", "description": "Y coordinate" },
                    { "name": "width", "type": "number", "description": "Rectangle width" },
                    { "name": "height", "type": "number", "description": "Rectangle height" }
                ],
                "description": "Rectangle."
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables DOM agent for the given page."
            },
            {
                "name": "disable",
                "description": "Disables DOM agent for the given page."
            },
            {
                "name": "getDocument",
                "parameters": [
                    { "name": "depth", "type": "integer", "optional": true, "description": "The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.", "experimental": true },
                    { "name": "pierce", "type": "boolean", "optional": true, "description": "Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false).", "experimental": true }
                ],
                "returns": [
                    { "name": "root", "$ref": "Node", "description": "Resulting node." }
                ],
                "description": "Returns the root DOM node (and optionally the subtree) to the caller."
            },
            {
                "name": "getFlattenedDocument",
                "parameters": [
                    { "name": "depth", "type": "integer", "optional": true, "description": "The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.", "experimental": true },
                    { "name": "pierce", "type": "boolean", "optional": true, "description": "Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false).", "experimental": true }
                ],
                "returns": [
                    { "name": "nodes", "type": "array", "items": { "$ref": "Node" }, "description": "Resulting node." }
                ],
                "description": "Returns the root DOM node (and optionally the subtree) to the caller."
            },
            {
                "name": "collectClassNamesFromSubtree",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to collect class names." }
                ],
                "returns": [
                    {"name": "classNames", "type": "array", "items": { "type": "string" }, "description": "Class name list." }
                ],
                "description": "Collects class names for the node with given id and all of it's child nodes.",
                "experimental": true
            },
            {
                "name": "requestChildNodes",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to get children for." },
                    { "name": "depth", "type": "integer", "optional": true, "description": "The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.", "experimental": true },
                    { "name": "pierce", "type": "boolean", "optional": true, "description": "Whether or not iframes and shadow roots should be traversed when returning the sub-tree (default is false).", "experimental": true }
                ],
                "description": "Requests that children of the node with given id are returned to the caller in form of <code>setChildNodes</code> events where not only immediate children are retrieved, but all children down to the specified depth."
            },
            {
                "name": "querySelector",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to query upon." },
                    { "name": "selector", "type": "string", "description": "Selector string." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Query selector result." }
                ],
                "description": "Executes <code>querySelector</code> on a given node."
            },
            {
                "name": "querySelectorAll",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to query upon." },
                    { "name": "selector", "type": "string", "description": "Selector string." }
                ],
                "returns": [
                    { "name": "nodeIds", "type": "array", "items": { "$ref": "NodeId" }, "description": "Query selector result." }
                ],
                "description": "Executes <code>querySelectorAll</code> on a given node."
            },
            {
                "name": "setNodeName",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to set name for." },
                    { "name": "name", "type": "string", "description": "New node's name." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "New node's id." }
                ],
                "description": "Sets node name for a node with given id."
            },
            {
                "name": "setNodeValue",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to set value for." },
                    { "name": "value", "type": "string", "description": "New node's value." }
                ],
                "description": "Sets node value for a node with given id."
            },
            {
                "name": "removeNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to remove." }
                ],
                "description": "Removes node with given id."
            },
            {
                "name": "setAttributeValue",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the element to set attribute for." },
                    { "name": "name", "type": "string", "description": "Attribute name." },
                    { "name": "value", "type": "string", "description": "Attribute value." }
                ],
                "description": "Sets attribute for an element with given id."
            },
            {
                "name": "setAttributesAsText",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the element to set attributes for." },
                    { "name": "text", "type": "string", "description": "Text with a number of attributes. Will parse this text using HTML parser." },
                    { "name": "name", "type": "string", "optional": true, "description": "Attribute name to replace with new attributes derived from text in case text parsed successfully." }
                ],
                "description": "Sets attributes on element with given id. This method is useful when user edits some existing attribute value and types in several attribute name/value pairs."
            },
            {
                "name": "removeAttribute",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the element to remove attribute from." },
                    { "name": "name", "type": "string", "description": "Name of the attribute to remove." }
                ],
                "description": "Removes attribute with given name from an element with given id."
            },
            {
                "name": "getOuterHTML",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "optional": true, "description": "Identifier of the node." },
                    { "name": "backendNodeId", "$ref": "BackendNodeId", "optional": true, "description": "Identifier of the backend node." },
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "optional": true, "description": "JavaScript object id of the node wrapper." }
                ],
                "returns": [
                    { "name": "outerHTML", "type": "string", "description": "Outer HTML markup." }
                ],
                "description": "Returns node's HTML markup."
            },
            {
                "name": "setOuterHTML",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to set markup for." },
                    { "name": "outerHTML", "type": "string", "description": "Outer HTML markup to set." }
                ],
                "description": "Sets node HTML markup, returns new node id."
            },
            {
                "name": "performSearch",
                "parameters": [
                    { "name": "query", "type": "string", "description": "Plain text or query selector or XPath search query." },
                    { "name": "includeUserAgentShadowDOM", "type": "boolean", "optional": true, "description": "True to search in user agent shadow DOM.", "experimental": true }
                ],
                "returns": [
                    { "name": "searchId", "type": "string", "description": "Unique search session identifier." },
                    { "name": "resultCount", "type": "integer", "description": "Number of search results." }
                ],
                "description": "Searches for a given string in the DOM tree. Use <code>getSearchResults</code> to access search results or <code>cancelSearch</code> to end this search session.",
                "experimental": true
            },
            {
                "name": "getSearchResults",
                "parameters": [
                    { "name": "searchId", "type": "string", "description": "Unique search session identifier." },
                    { "name": "fromIndex", "type": "integer", "description": "Start index of the search result to be returned." },
                    { "name": "toIndex", "type": "integer", "description": "End index of the search result to be returned." }
                ],
                "returns": [
                    { "name": "nodeIds", "type": "array", "items": { "$ref": "NodeId" }, "description": "Ids of the search result nodes." }
                ],
                "description": "Returns search results from given <code>fromIndex</code> to given <code>toIndex</code> from the sarch with the given identifier.",
                "experimental": true
            },
            {
                "name": "discardSearchResults",
                "parameters": [
                    { "name": "searchId", "type": "string", "description": "Unique search session identifier." }
                ],
                "description": "Discards search results from the session with the given id. <code>getSearchResults</code> should no longer be called for that search.",
                "experimental": true
            },
            {
                "name": "requestNode",
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "JavaScript object id to convert into node." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Node id for given object." }
                ],
                "description": "Requests that the node is sent to the caller given the JavaScript node object reference. All nodes that form the path from the node to the root are also sent to the client as a series of <code>setChildNodes</code> notifications."
            },
            {
                "name": "highlightRect",
                "description": "Highlights given rectangle.",
                "redirect": "Overlay"
            },
            {
                "name": "highlightNode",
                "description": "Highlights DOM node.",
                "redirect": "Overlay"
            },
            {
                "name": "hideHighlight",
                "description": "Hides any highlight.",
                "redirect": "Overlay"
            },
            {
                "name": "pushNodeByPathToFrontend",
                "parameters": [
                    { "name": "path", "type": "string", "description": "Path to node in the proprietary format." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node for given path." }
                ],
                "description": "Requests that the node is sent to the caller given its path. // FIXME, use XPath",
                "experimental": true
            },
            {
                "name": "pushNodesByBackendIdsToFrontend",
                "parameters": [
                    { "name": "backendNodeIds", "type": "array", "items": {"$ref": "BackendNodeId"}, "description": "The array of backend node ids." }
                ],
                "returns": [
                    { "name": "nodeIds", "type": "array", "items": {"$ref": "NodeId"}, "description": "The array of ids of pushed nodes that correspond to the backend ids specified in backendNodeIds." }
                ],
                "description": "Requests that a batch of nodes is sent to the caller given their backend node ids.",
                "experimental": true
            },
            {
                "name": "setInspectedNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "DOM node id to be accessible by means of $x command line API." }
                ],
                "description": "Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).",
                "experimental": true
            },
            {
                "name": "resolveNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "optional": true, "description": "Id of the node to resolve." },
                    { "name": "backendNodeId", "$ref": "DOM.BackendNodeId", "optional": true, "description": "Backend identifier of the node to resolve." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name that can be used to release multiple objects." }
                ],
                "returns": [
                    { "name": "object", "$ref": "Runtime.RemoteObject", "description": "JavaScript object wrapper for given node." }
                ],
                "description": "Resolves the JavaScript node object for a given NodeId or BackendNodeId."
            },
            {
                "name": "getAttributes",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to retrieve attibutes for." }
                ],
                "returns": [
                    { "name": "attributes", "type": "array", "items": { "type": "string" }, "description": "An interleaved array of node attribute names and values." }
                ],
                "description": "Returns attributes for the specified node."
            },
            {
                "name": "copyTo",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to copy." },
                    { "name": "targetNodeId", "$ref": "NodeId", "description": "Id of the element to drop the copy into." },
                    { "name": "insertBeforeNodeId", "$ref": "NodeId", "optional": true, "description": "Drop the copy before this node (if absent, the copy becomes the last child of <code>targetNodeId</code>)." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node clone." }
                ],
                "description": "Creates a deep copy of the specified node and places it into the target container before the given anchor.",
                "experimental": true
            },
            {
                "name": "moveTo",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to move." },
                    { "name": "targetNodeId", "$ref": "NodeId", "description": "Id of the element to drop the moved node into." },
                    { "name": "insertBeforeNodeId", "$ref": "NodeId", "optional": true, "description": "Drop node before this one (if absent, the moved node becomes the last child of <code>targetNodeId</code>)." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "New id of the moved node." }
                ],
                "description": "Moves node into the new container, places it before the given anchor."
            },
            {
                "name": "undo",
                "description": "Undoes the last performed action.",
                "experimental": true
            },
            {
                "name": "redo",
                "description": "Re-does the last undone action.",
                "experimental": true
            },
            {
                "name": "markUndoableState",
                "description": "Marks last undoable state.",
                "experimental": true
            },
            {
                "name": "focus",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "optional": true, "description": "Identifier of the node." },
                    { "name": "backendNodeId", "$ref": "BackendNodeId", "optional": true, "description": "Identifier of the backend node." },
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "optional": true, "description": "JavaScript object id of the node wrapper." }
                ],
                "description": "Focuses the given element.",
                "experimental": true
            },
            {
                "name": "setFileInputFiles",
                "parameters": [
                    { "name": "files", "type": "array", "items": { "type": "string" }, "description": "Array of file paths to set." },
                    { "name": "nodeId", "$ref": "NodeId", "optional": true, "description": "Identifier of the node." },
                    { "name": "backendNodeId", "$ref": "BackendNodeId", "optional": true, "description": "Identifier of the backend node." },
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "optional": true, "description": "JavaScript object id of the node wrapper." }
                ],
                "description": "Sets files for the given file input element.",
                "experimental": true
            },
            {
                "name": "getBoxModel",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "optional": true, "description": "Identifier of the node." },
                    { "name": "backendNodeId", "$ref": "BackendNodeId", "optional": true, "description": "Identifier of the backend node." },
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "optional": true, "description": "JavaScript object id of the node wrapper." }
                ],
                "returns": [
                    { "name": "model", "$ref": "BoxModel", "description": "Box model for the node." }
                ],
                "description": "Returns boxes for the currently selected nodes.",
                "experimental": true
            },
            {
                "name": "getNodeForLocation",
                "parameters": [
                    { "name": "x", "type": "integer", "description": "X coordinate." },
                    { "name": "y", "type": "integer", "description": "Y coordinate." },
                    { "name": "includeUserAgentShadowDOM", "type": "boolean", "optional": true, "description": "False to skip to the nearest non-UA shadow root ancestor (default: false)." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node at given coordinates." }
                ],
                "description": "Returns node id at given location.",
                "experimental": true
            },
            {
                "name": "getRelayoutBoundary",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Relayout boundary node id for the given node." }
                ],
                "description": "Returns the id of the nearest ancestor that is a relayout boundary.",
                "experimental": true
            },
            {
                "name": "describeNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "optional": true, "description": "Identifier of the node." },
                    { "name": "backendNodeId", "$ref": "BackendNodeId", "optional": true, "description": "Identifier of the backend node." },
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "optional": true, "description": "JavaScript object id of the node wrapper." },
                    { "name": "depth", "type": "integer", "optional": true, "description": "The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.", "experimental": true },
                    { "name": "pierce", "type": "boolean", "optional": true, "description": "Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false).", "experimental": true }
                ],
                "returns": [
                    { "name": "node", "$ref": "Node", "description": "Node description." }
                ],
                "description": "Describes node given its id, does not require domain to be enabled. Does not start tracking any objects, can be used for automation."
            }
        ],
        "events": [
            {
                "name": "documentUpdated",
                "description": "Fired when <code>Document</code> has been totally updated. Node ids are no longer valid."
            },
            {
                "name": "setChildNodes",
                "parameters": [
                    { "name": "parentId", "$ref": "NodeId", "description": "Parent node id to populate with children." },
                    { "name": "nodes", "type": "array", "items": { "$ref": "Node" }, "description": "Child nodes array." }
                ],
                "description": "Fired when backend wants to provide client with the missing DOM structure. This happens upon most of the calls requesting node ids."
            },
            {
                "name": "attributeModified",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "name", "type": "string", "description": "Attribute name." },
                    { "name": "value", "type": "string", "description": "Attribute value." }
                ],
                "description": "Fired when <code>Element</code>'s attribute is modified."
            },
            {
                "name": "attributeRemoved",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "name", "type": "string", "description": "A ttribute name." }
                ],
                "description": "Fired when <code>Element</code>'s attribute is removed."
            },
            {
                "name": "inlineStyleInvalidated",
                "parameters": [
                    { "name": "nodeIds", "type": "array", "items": { "$ref": "NodeId" }, "description": "Ids of the nodes for which the inline styles have been invalidated." }
                ],
                "description": "Fired when <code>Element</code>'s inline style is modified via a CSS property modification.",
                "experimental": true
            },
            {
                "name": "characterDataModified",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "characterData", "type": "string", "description": "New text value." }
                ],
                "description": "Mirrors <code>DOMCharacterDataModified</code> event."
            },
            {
                "name": "childNodeCountUpdated",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "childNodeCount", "type": "integer", "description": "New node count." }
                ],
                "description": "Fired when <code>Container</code>'s child node count has changed."
            },
            {
                "name": "childNodeInserted",
                "parameters": [
                    { "name": "parentNodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "previousNodeId", "$ref": "NodeId", "description": "If of the previous siblint." },
                    { "name": "node", "$ref": "Node", "description": "Inserted node data." }
                ],
                "description": "Mirrors <code>DOMNodeInserted</code> event."
            },
            {
                "name": "childNodeRemoved",
                "parameters": [
                    { "name": "parentNodeId", "$ref": "NodeId", "description": "Parent id." },
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has been removed." }
                ],
                "description": "Mirrors <code>DOMNodeRemoved</code> event."
            },
            {
                "name": "shadowRootPushed",
                "parameters": [
                    { "name": "hostId", "$ref": "NodeId", "description": "Host element id." },
                    { "name": "root", "$ref": "Node", "description": "Shadow root." }
                ],
                "description": "Called when shadow root is pushed into the element.",
                "experimental": true
            },
            {
                "name": "shadowRootPopped",
                "parameters": [
                    { "name": "hostId", "$ref": "NodeId", "description": "Host element id." },
                    { "name": "rootId", "$ref": "NodeId", "description": "Shadow root id." }
                ],
                "description": "Called when shadow root is popped from the element.",
                "experimental": true
            },
            {
                "name": "pseudoElementAdded",
                "parameters": [
                    { "name": "parentId", "$ref": "NodeId", "description": "Pseudo element's parent element id." },
                    { "name": "pseudoElement", "$ref": "Node", "description": "The added pseudo element." }
                ],
                "description": "Called when a pseudo element is added to an element.",
                "experimental": true
            },
            {
                "name": "pseudoElementRemoved",
                "parameters": [
                    { "name": "parentId", "$ref": "NodeId", "description": "Pseudo element's parent element id." },
                    { "name": "pseudoElementId", "$ref": "NodeId", "description": "The removed pseudo element id." }
                ],
                "description": "Called when a pseudo element is removed from an element.",
                "experimental": true
            },
            {
                "name": "distributedNodesUpdated",
                "parameters": [
                    { "name": "insertionPointId", "$ref": "NodeId", "description": "Insertion point where distrubuted nodes were updated." },
                    { "name": "distributedNodes", "type": "array", "items": { "$ref": "BackendNode" }, "description": "Distributed nodes for given insertion point." }
                ],
                "description": "Called when distrubution is changed.",
                "experimental": true
            }
        ]
    },
    {
        "domain": "CSS",
        "experimental": true,
        "description": "This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles) have an associated <code>id</code> used in subsequent operations on the related object. Each object type has a specific <code>id</code> structure, and those are not interchangeable between objects of different kinds. CSS objects can be loaded using the <code>get*ForNode()</code> calls (which accept a DOM node id). A client can also keep track of stylesheets via the <code>styleSheetAdded</code>/<code>styleSheetRemoved</code> events and subsequently load the required stylesheet contents using the <code>getStyleSheet[Text]()</code> methods.",
        "dependencies": ["DOM"],
        "types": [
            {
                "id": "StyleSheetId",
                "type": "string"
            },
            {
                "id": "StyleSheetOrigin",
                "type": "string",
                "enum": ["injected", "user-agent", "inspector", "regular"],
                "description": "Stylesheet type: \"injected\" for stylesheets injected via extension, \"user-agent\" for user-agent stylesheets, \"inspector\" for stylesheets created by the inspector (i.e. those holding the \"via inspector\" rules), \"regular\" for regular stylesheets."
            },
            {
                "id": "PseudoElementMatches",
                "type": "object",
                "properties": [
                    { "name": "pseudoType", "$ref": "DOM.PseudoType", "description": "Pseudo element type."},
                    { "name": "matches", "type": "array", "items": { "$ref": "RuleMatch" }, "description": "Matches of CSS rules applicable to the pseudo style."}
                ],
                "description": "CSS rule collection for a single pseudo style."
            },
            {
                "id": "InheritedStyleEntry",
                "type": "object",
                "properties": [
                    { "name": "inlineStyle", "$ref": "CSSStyle", "optional": true, "description": "The ancestor node's inline style, if any, in the style inheritance chain." },
                    { "name": "matchedCSSRules", "type": "array", "items": { "$ref": "RuleMatch" }, "description": "Matches of CSS rules matching the ancestor node in the style inheritance chain." }
                ],
                "description": "Inherited CSS rule collection from ancestor node."
            },
            {
                "id": "RuleMatch",
                "type": "object",
                "properties": [
                    { "name": "rule", "$ref": "CSSRule", "description": "CSS rule in the match." },
                    { "name": "matchingSelectors", "type": "array", "items": { "type": "integer" }, "description": "Matching selector indices in the rule's selectorList selectors (0-based)." }
                ],
                "description": "Match data for a CSS rule."
            },
            {
                "id": "Value",
                "type": "object",
                "properties": [
                    { "name": "text", "type": "string", "description": "Value text." },
                    { "name": "range", "$ref": "SourceRange", "optional": true, "description": "Value range in the underlying resource (if available)." }
                ],
                "description": "Data for a simple selector (these are delimited by commas in a selector list)."
            },
            {
                "id": "SelectorList",
                "type": "object",
                "properties": [
                    { "name": "selectors", "type": "array", "items": { "$ref": "Value" }, "description": "Selectors in the list." },
                    { "name": "text", "type": "string", "description": "Rule selector text." }
                ],
                "description": "Selector list data."
            },
            {
                "id": "CSSStyleSheetHeader",
                "type": "object",
                "properties": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "The stylesheet identifier."},
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Owner frame identifier."},
                    { "name": "sourceURL", "type": "string", "description": "Stylesheet resource URL."},
                    { "name": "sourceMapURL", "type": "string", "optional": true, "description": "URL of source map associated with the stylesheet (if any)." },
                    { "name": "origin", "$ref": "StyleSheetOrigin", "description": "Stylesheet origin."},
                    { "name": "title", "type": "string", "description": "Stylesheet title."},
                    { "name": "ownerNode", "$ref": "DOM.BackendNodeId", "optional": true, "description": "The backend id for the owner node of the stylesheet." },
                    { "name": "disabled", "type": "boolean", "description": "Denotes whether the stylesheet is disabled."},
                    { "name": "hasSourceURL", "type": "boolean", "optional": true, "description": "Whether the sourceURL field value comes from the sourceURL comment." },
                    { "name": "isInline", "type": "boolean", "description": "Whether this stylesheet is created for STYLE tag by parser. This flag is not set for document.written STYLE tags." },
                    { "name": "startLine", "type": "number", "description": "Line offset of the stylesheet within the resource (zero based)." },
                    { "name": "startColumn", "type": "number", "description": "Column offset of the stylesheet within the resource (zero based)." },
                    { "name": "length", "type": "number", "description": "Size of the content (in characters).", "experimental": true }
                ],
                "description": "CSS stylesheet metainformation."
            },
            {
                "id": "CSSRule",
                "type": "object",
                "properties": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "optional": true, "description": "The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from." },
                    { "name": "selectorList", "$ref": "SelectorList", "description": "Rule selector data." },
                    { "name": "origin", "$ref": "StyleSheetOrigin", "description": "Parent stylesheet's origin."},
                    { "name": "style", "$ref": "CSSStyle", "description": "Associated style declaration." },
                    { "name": "media", "type": "array", "items": { "$ref": "CSSMedia" }, "optional": true, "description": "Media list array (for rules involving media queries). The array enumerates media queries starting with the innermost one, going outwards." }
                ],
                "description": "CSS rule representation."
            },
            {
                "id": "RuleUsage",
                "type": "object",
                "properties": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from." },
                    { "name": "startOffset", "type": "number", "description": "Offset of the start of the rule (including selector) from the beginning of the stylesheet." },
                    { "name": "endOffset", "type": "number", "description": "Offset of the end of the rule body from the beginning of the stylesheet." },
                    { "name": "used", "type": "boolean", "description": "Indicates whether the rule was actually used by some element in the page." }
                ],
                "description": "CSS coverage information.",
                "experimental": true
            },
            {
                "id": "SourceRange",
                "type": "object",
                "properties": [
                    { "name": "startLine", "type": "integer", "description": "Start line of range." },
                    { "name": "startColumn", "type": "integer", "description": "Start column of range (inclusive)." },
                    { "name": "endLine", "type": "integer", "description": "End line of range" },
                    { "name": "endColumn", "type": "integer", "description": "End column of range (exclusive)." }
                ],
                "description": "Text range within a resource. All numbers are zero-based."
            },
            {
                "id": "ShorthandEntry",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "description": "Shorthand name." },
                    { "name": "value", "type": "string", "description": "Shorthand value." },
                    { "name": "important", "type": "boolean", "optional": true, "description": "Whether the property has \"!important\" annotation (implies <code>false</code> if absent)." }
                ]
            },
            {
                "id": "CSSComputedStyleProperty",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "description": "Computed style property name." },
                    { "name": "value", "type": "string", "description": "Computed style property value." }
                ]
            },
            {
                "id": "CSSStyle",
                "type": "object",
                "properties": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "optional": true, "description": "The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from." },
                    { "name": "cssProperties", "type": "array", "items": { "$ref": "CSSProperty" }, "description": "CSS properties in the style." },
                    { "name": "shorthandEntries", "type": "array", "items": { "$ref": "ShorthandEntry" }, "description": "Computed values for all shorthands found in the style." },
                    { "name": "cssText", "type": "string", "optional": true, "description": "Style declaration text (if available)." },
                    { "name": "range", "$ref": "SourceRange", "optional": true, "description": "Style declaration range in the enclosing stylesheet (if available)." }
                ],
                "description": "CSS style representation."
            },
            {
                "id": "CSSProperty",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "description": "The property name." },
                    { "name": "value", "type": "string", "description": "The property value." },
                    { "name": "important", "type": "boolean", "optional": true, "description": "Whether the property has \"!important\" annotation (implies <code>false</code> if absent)." },
                    { "name": "implicit", "type": "boolean", "optional": true, "description": "Whether the property is implicit (implies <code>false</code> if absent)." },
                    { "name": "text", "type": "string", "optional": true, "description": "The full property text as specified in the style." },
                    { "name": "parsedOk", "type": "boolean", "optional": true, "description": "Whether the property is understood by the browser (implies <code>true</code> if absent)." },
                    { "name": "disabled", "type": "boolean", "optional": true, "description": "Whether the property is disabled by the user (present for source-based properties only)." },
                    { "name": "range", "$ref": "SourceRange", "optional": true, "description": "The entire property range in the enclosing style declaration (if available)." }
                ],
                "description": "CSS property declaration data."
            },
            {
                "id": "CSSMedia",
                "type": "object",
                "properties": [
                    { "name": "text", "type": "string", "description": "Media query text." },
                    { "name": "source", "type": "string", "enum": ["mediaRule", "importRule", "linkedSheet", "inlineSheet"], "description": "Source of the media query: \"mediaRule\" if specified by a @media rule, \"importRule\" if specified by an @import rule, \"linkedSheet\" if specified by a \"media\" attribute in a linked stylesheet's LINK tag, \"inlineSheet\" if specified by a \"media\" attribute in an inline stylesheet's STYLE tag." },
                    { "name": "sourceURL", "type": "string", "optional": true, "description": "URL of the document containing the media query description." },
                    { "name": "range", "$ref": "SourceRange", "optional": true, "description": "The associated rule (@media or @import) header range in the enclosing stylesheet (if available)." },
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "optional": true, "description": "Identifier of the stylesheet containing this object (if exists)." },
                    { "name": "mediaList", "type": "array", "items": { "$ref": "MediaQuery" }, "optional": true, "experimental": true, "description": "Array of media queries." }
                ],
                "description": "CSS media rule descriptor."
            },
            {
                "id": "MediaQuery",
                "type": "object",
                "properties": [
                    { "name": "expressions", "type": "array", "items": { "$ref": "MediaQueryExpression" }, "description": "Array of media query expressions." },
                    { "name": "active", "type": "boolean", "description": "Whether the media query condition is satisfied." }
                ],
                "description": "Media query descriptor.",
                "experimental": true
            },
            {
                "id": "MediaQueryExpression",
                "type": "object",
                "properties": [
                    { "name": "value", "type": "number", "description": "Media query expression value."},
                    { "name": "unit", "type": "string", "description": "Media query expression units."},
                    { "name": "feature", "type": "string", "description": "Media query expression feature."},
                    { "name": "valueRange", "$ref": "SourceRange", "optional": true, "description": "The associated range of the value text in the enclosing stylesheet (if available)." },
                    { "name": "computedLength", "type": "number", "optional": true, "description": "Computed length of media query expression (if applicable)."}
                ],
                "description": "Media query expression descriptor.",
                "experimental": true
            },
            {
                "id": "PlatformFontUsage",
                "type": "object",
                "properties": [
                    { "name": "familyName", "type": "string", "description": "Font's family name reported by platform."},
                    { "name": "isCustomFont", "type": "boolean", "description": "Indicates if the font was downloaded or resolved locally."},
                    { "name": "glyphCount", "type": "number", "description": "Amount of glyphs that were rendered with this font."}
                ],
                "description": "Information about amount of glyphs that were rendered with given font.",
                "experimental": true
            },
            {
                "id": "CSSKeyframesRule",
                "type": "object",
                "properties": [
                    { "name": "animationName", "$ref": "Value", "description": "Animation name." },
                    { "name": "keyframes", "type": "array", "items": { "$ref": "CSSKeyframeRule" }, "description": "List of keyframes." }
                ],
                "description": "CSS keyframes rule representation."
            },
            {
                "id": "CSSKeyframeRule",
                "type": "object",
                "properties": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "optional": true, "description": "The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from." },
                    { "name": "origin", "$ref": "StyleSheetOrigin", "description": "Parent stylesheet's origin."},
                    { "name": "keyText", "$ref": "Value", "description": "Associated key text." },
                    { "name": "style", "$ref": "CSSStyle", "description": "Associated style declaration." }
                ],
                "description": "CSS keyframe rule representation."
            },
            {
                "id": "StyleDeclarationEdit",
                "type": "object",
                "properties": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "The css style sheet identifier." },
                    { "name": "range", "$ref": "SourceRange", "description": "The range of the style text in the enclosing stylesheet." },
                    { "name": "text", "type": "string", "description": "New style text."}
                ],
                "description": "A descriptor of operation to mutate style declaration text."
            },
            {
                "id": "InlineTextBox",
                "type": "object",
                "properties": [
                    { "name": "boundingBox", "$ref": "DOM.Rect", "description": "The absolute position bounding box." },
                    { "name": "startCharacterIndex", "type": "integer", "description": "The starting index in characters, for this post layout textbox substring." },
                    { "name": "numCharacters", "type": "integer", "description": "The number of characters in this post layout textbox substring." }
                ],
                "description": "Details of post layout rendered text positions. The exact layout should not be regarded as stable and may change between versions.",
                "experimental": true
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been enabled until the result of this command is received."
            },
            {
                "name": "disable",
                "description": "Disables the CSS agent for the given page."
            },
            {
                "name": "getMatchedStylesForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId" }
                ],
                "returns": [
                    { "name": "inlineStyle", "$ref": "CSSStyle", "optional": true, "description": "Inline style for the specified DOM node." },
                    { "name": "attributesStyle", "$ref": "CSSStyle", "optional": true, "description": "Attribute-defined element style (e.g. resulting from \"width=20 height=100%\")."},
                    { "name": "matchedCSSRules", "type": "array", "items": { "$ref": "RuleMatch" }, "optional": true, "description": "CSS rules matching this node, from all applicable stylesheets." },
                    { "name": "pseudoElements", "type": "array", "items": { "$ref": "PseudoElementMatches" }, "optional": true, "description": "Pseudo style matches for this node." },
                    { "name": "inherited", "type": "array", "items": { "$ref": "InheritedStyleEntry" }, "optional": true, "description": "A chain of inherited styles (from the immediate node parent up to the DOM tree root)." },
                    { "name": "cssKeyframesRules", "type": "array", "items": { "$ref": "CSSKeyframesRule" }, "optional": true, "description": "A list of CSS keyframed animations matching this node." }
                ],
                "description": "Returns requested styles for a DOM node identified by <code>nodeId</code>."
            },
            {
                "name": "getInlineStylesForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId" }
                ],
                "returns": [
                    { "name": "inlineStyle", "$ref": "CSSStyle", "optional": true, "description": "Inline style for the specified DOM node." },
                    { "name": "attributesStyle", "$ref": "CSSStyle", "optional": true, "description": "Attribute-defined element style (e.g. resulting from \"width=20 height=100%\")."}
                ],
                "description": "Returns the styles defined inline (explicitly in the \"style\" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>."
            },
            {
                "name": "getComputedStyleForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId" }
                ],
                "returns": [
                    { "name": "computedStyle", "type": "array", "items": { "$ref": "CSSComputedStyleProperty" }, "description": "Computed style for the specified DOM node." }
                ],
                "description": "Returns the computed style for a DOM node identified by <code>nodeId</code>."
            },
            {
                "name": "getPlatformFontsForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId" }
                ],
                "returns": [
                    { "name": "fonts", "type": "array", "items": { "$ref": "PlatformFontUsage" }, "description": "Usage statistics for every employed platform font." }
                ],
                "description": "Requests information about platform fonts which we used to render child TextNodes in the given node.",
                "experimental": true
            },
            {
                "name": "getStyleSheetText",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" }
                ],
                "returns": [
                    { "name": "text", "type": "string", "description": "The stylesheet text." }
                ],
                "description": "Returns the current textual content and the URL for a stylesheet."
            },
            {
                "name": "collectClassNames",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" }
                ],
                "returns": [
                    {"name": "classNames", "type": "array", "items": { "type": "string" }, "description": "Class name list." }
                ],
                "description": "Returns all class names from specified stylesheet.",
                "experimental": true
            },
            {
                "name": "setStyleSheetText",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" },
                    { "name": "text", "type": "string" }
                ],
                "returns": [
                    { "name": "sourceMapURL", "type": "string", "optional": true, "description": "URL of source map associated with script (if any)." }
                ],
                "description": "Sets the new stylesheet text."
            },
            {
                "name": "setRuleSelector",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" },
                    { "name": "range", "$ref": "SourceRange" },
                    { "name": "selector", "type": "string" }
                ],
                "returns": [
                    { "name": "selectorList", "$ref": "SelectorList", "description": "The resulting selector list after modification." }
                ],
                "description": "Modifies the rule selector."
            },
            {
                "name": "setKeyframeKey",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" },
                    { "name": "range", "$ref": "SourceRange" },
                    { "name": "keyText", "type": "string" }
                ],
                "returns": [
                    { "name": "keyText", "$ref": "Value", "description": "The resulting key text after modification." }
                ],
                "description": "Modifies the keyframe rule key text."
            },
            {
                "name": "setStyleTexts",
                "parameters": [
                    { "name": "edits", "type": "array", "items": { "$ref": "StyleDeclarationEdit" }}
                ],
                "returns": [
                    { "name": "styles", "type": "array", "items": { "$ref": "CSSStyle" }, "description": "The resulting styles after modification." }
                ],
                "description": "Applies specified style edits one after another in the given order."
            },
            {
                "name": "setMediaText",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" },
                    { "name": "range", "$ref": "SourceRange" },
                    { "name": "text", "type": "string" }
                ],
                "returns": [
                    { "name": "media", "$ref": "CSSMedia", "description": "The resulting CSS media rule after modification." }
                ],
                "description": "Modifies the rule selector."
            },
            {
                "name": "createStyleSheet",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame where \"via-inspector\" stylesheet should be created."}
                ],
                "returns": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "Identifier of the created \"via-inspector\" stylesheet." }
                ],
                "description": "Creates a new special \"via-inspector\" stylesheet in the frame with given <code>frameId</code>."
            },
            {
                "name": "addRule",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "The css style sheet identifier where a new rule should be inserted." },
                    { "name": "ruleText", "type": "string", "description": "The text of a new rule." },
                    { "name": "location", "$ref": "SourceRange", "description": "Text position of a new rule in the target style sheet." }
                ],
                "returns": [
                    { "name": "rule", "$ref": "CSSRule", "description": "The newly created rule." }
                ],
                "description": "Inserts a new rule with the given <code>ruleText</code> in a stylesheet with given <code>styleSheetId</code>, at the position specified by <code>location</code>."
            },
            {
                "name": "forcePseudoState",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "The element id for which to force the pseudo state." },
                    { "name": "forcedPseudoClasses", "type": "array", "items": { "type": "string", "enum": ["active", "focus", "hover", "visited"] }, "description": "Element pseudo classes to force when computing the element's style." }
                ],
                "description": "Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser."
            },
            {
                "name": "getMediaQueries",
                "returns": [
                    { "name": "medias", "type": "array", "items": { "$ref": "CSSMedia" } }
                ],
                "description": "Returns all media queries parsed by the rendering engine.",
                "experimental": true
            },
            {
                "name": "setEffectivePropertyValueForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "The element id for which to set property." },
                    { "name": "propertyName", "type": "string"},
                    { "name": "value", "type": "string"}
                ],
                "description": "Find a rule with the given active property for the given node and set the new value for this property",
                "experimental": true
            },
            {
                "name": "getBackgroundColors",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "Id of the node to get background colors for." }
                ],
                "returns": [
                    { "name": "backgroundColors", "type": "array", "items": { "type": "string" }, "description": "The range of background colors behind this element, if it contains any visible text. If no visible text is present, this will be undefined. In the case of a flat background color, this will consist of simply that color. In the case of a gradient, this will consist of each of the color stops. For anything more complicated, this will be an empty array. Images will be ignored (as if the image had failed to load).", "optional": true },
                    { "name": "computedFontSize", "type": "string", "description": "The computed font size for this node, as a CSS computed value string (e.g. '12px').", "optional": true },
                    { "name": "computedFontWeight", "type": "string", "description": "The computed font weight for this node, as a CSS computed value string (e.g. 'normal' or '100').", "optional": true },

                    { "name": "computedBodyFontSize", "type": "string", "description": "The computed font size for the document body, as a computed CSS value string (e.g. '16px').", "optional": true }
                ],
                "experimental": true
            },
            {
                "name": "startRuleUsageTracking",
                "description": "Enables the selector recording.",
                "experimental": true
            },
            {
                "name": "takeCoverageDelta",
                "description": "Obtain list of rules that became used since last call to this method (or since start of coverage instrumentation)",
                "returns": [
                    { "name": "coverage", "type": "array", "items": { "$ref": "RuleUsage" } }
                ],
                "experimental": true
            },
            {
                "name": "stopRuleUsageTracking",
                "returns": [
                    { "name": "ruleUsage", "type": "array", "items": { "$ref": "RuleUsage" } }
                ],
                "description": "The list of rules with an indication of whether these were used",
                "experimental": true
            }
        ],
        "events": [
            {
                "name": "mediaQueryResultChanged",
                "description": "Fires whenever a MediaQuery result changes (for example, after a browser window has been resized.) The current implementation considers only viewport-dependent media features."
            },
            {
                "name": "fontsUpdated",
                "description": "Fires whenever a web font gets loaded."
            },
            {
                "name": "styleSheetChanged",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" }
                ],
                "description": "Fired whenever a stylesheet is changed as a result of the client operation."
            },
            {
                "name": "styleSheetAdded",
                "parameters": [
                    { "name": "header", "$ref": "CSSStyleSheetHeader", "description": "Added stylesheet metainfo." }
                ],
                "description": "Fired whenever an active document stylesheet is added."
            },
            {
                "name": "styleSheetRemoved",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "Identifier of the removed stylesheet." }
                ],
                "description": "Fired whenever an active document stylesheet is removed."
            }
        ]
    },
    {
        "domain": "DOMSnapshot",
        "experimental": true,
        "description": "This domain facilitates obtaining document snapshots with DOM, layout, and style information.",
        "dependencies": ["CSS", "DOM", "Page"],
        "types": [
            {
                "id": "DOMNode",
                "type": "object",
                "properties": [
                    { "name": "nodeType", "type": "integer", "description": "<code>Node</code>'s nodeType." },
                    { "name": "nodeName", "type": "string", "description": "<code>Node</code>'s nodeName." },
                    { "name": "nodeValue", "type": "string", "description": "<code>Node</code>'s nodeValue." },
                    { "name": "textValue", "type": "string", "optional": true, "description": "Only set for textarea elements, contains the text value." },
                    { "name": "inputValue", "type": "string", "optional": true, "description": "Only set for input elements, contains the input's associated text value." },
                    { "name": "inputChecked", "type": "boolean", "optional": true, "description": "Only set for radio and checkbox input elements, indicates if the element has been checked" },
                    { "name": "optionSelected", "type": "boolean", "optional": true, "description": "Only set for option elements, indicates if the element has been selected" },
                    { "name": "backendNodeId", "$ref": "DOM.BackendNodeId", "description": "<code>Node</code>'s id, corresponds to DOM.Node.backendNodeId." },
                    { "name": "childNodeIndexes", "type": "array", "items": { "type": "integer" }, "optional": true, "description": "The indexes of the node's child nodes in the <code>domNodes</code> array returned by <code>getSnapshot</code>, if any." },
                    { "name": "attributes", "type": "array", "items": { "$ref": "NameValue" }, "optional": true, "description": "Attributes of an <code>Element</code> node." },
                    { "name": "pseudoElementIndexes", "type": "array", "items": { "type": "integer" }, "optional": true, "description": "Indexes of pseudo elements associated with this node in the <code>domNodes</code> array returned by <code>getSnapshot</code>, if any." },
                    { "name": "layoutNodeIndex", "type": "integer", "optional": true, "description": "The index of the node's related layout tree node in the <code>layoutTreeNodes</code> array returned by <code>getSnapshot</code>, if any." },
                    { "name": "documentURL", "type": "string", "optional": true, "description": "Document URL that <code>Document</code> or <code>FrameOwner</code> node points to." },
                    { "name": "baseURL", "type": "string", "optional": true, "description": "Base URL that <code>Document</code> or <code>FrameOwner</code> node uses for URL completion." },
                    { "name": "contentLanguage", "type": "string", "optional": true, "description": "Only set for documents, contains the document's content language." },
                    { "name": "documentEncoding", "type": "string", "optional": true, "description": "Only set for documents, contains the document's character set encoding." },
                    { "name": "publicId", "type": "string", "optional": true, "description": "<code>DocumentType</code> node's publicId." },
                    { "name": "systemId", "type": "string", "optional": true, "description": "<code>DocumentType</code> node's systemId." },
                    { "name": "frameId", "$ref": "Page.FrameId", "optional": true, "description": "Frame ID for frame owner elements and also for the document node." },
                    { "name": "contentDocumentIndex", "type": "integer", "optional": true, "description": "The index of a frame owner element's content document in the <code>domNodes</code> array returned by <code>getSnapshot</code>, if any." },
                    { "name": "importedDocumentIndex", "type": "integer", "optional": true, "description": "Index of the imported document's node of a link element in the <code>domNodes</code> array returned by <code>getSnapshot</code>, if any." },
                    { "name": "templateContentIndex", "type": "integer", "optional": true, "description": "Index of the content node of a template element in the <code>domNodes</code> array returned by <code>getSnapshot</code>." },
                    { "name": "pseudoType", "$ref": "DOM.PseudoType", "optional": true, "description": "Type of a pseudo element node." },
                    { "name": "isClickable", "type": "boolean", "optional": true, "description": "Whether this DOM node responds to mouse clicks. This includes nodes that have had click event listeners attached via JavaScript as well as anchor tags that naturally navigate when clicked." }
                ],
                "description": "A Node in the DOM tree."
            },
            {
                "id": "LayoutTreeNode",
                "type": "object",
                "properties": [
                    { "name": "domNodeIndex", "type": "integer", "description": "The index of the related DOM node in the <code>domNodes</code> array returned by <code>getSnapshot</code>." },
                    { "name": "boundingBox", "$ref": "DOM.Rect", "description": "The absolute position bounding box." },
                    { "name": "layoutText", "type": "string", "optional": true, "description": "Contents of the LayoutText, if any." },
                    { "name": "inlineTextNodes", "type": "array", "optional": true, "items": { "$ref": "CSS.InlineTextBox" }, "description": "The post-layout inline text nodes, if any." },
                    { "name": "styleIndex", "type": "integer", "optional": true, "description": "Index into the <code>computedStyles</code> array returned by <code>getSnapshot</code>." }
                ],
                "description": "Details of an element in the DOM tree with a LayoutObject."
            },
            {
                "id": "ComputedStyle",
                "type": "object",
                "properties": [
                    { "name": "properties", "type": "array", "items": { "$ref": "NameValue" }, "description": "Name/value pairs of computed style properties." }
                ],
                "description": "A subset of the full ComputedStyle as defined by the request whitelist."
            },
            {
                "id": "NameValue",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "description": "Attribute/property name." },
                    { "name": "value", "type": "string", "description": "Attribute/property value." }
                ],
                "description": "A name/value pair."
            }
        ],
        "commands": [
            {
                "name": "getSnapshot",
                "parameters": [
                    { "name": "computedStyleWhitelist", "type": "array", "items": { "type": "string" }, "description": "Whitelist of computed styles to return." }
                ],
                "returns": [
                    { "name": "domNodes", "type": "array", "items": { "$ref": "DOMNode" }, "description": "The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document." },
                    { "name": "layoutTreeNodes", "type": "array", "items": { "$ref": "LayoutTreeNode" }, "description": "The nodes in the layout tree." },
                    { "name": "computedStyles", "type": "array", "items": { "$ref": "ComputedStyle" }, "description": "Whitelisted ComputedStyle properties for each node in the layout tree." }
                ],
                "description": "Returns a document snapshot, including the full DOM tree of the root node (including iframes, template contents, and imported documents) in a flattened array, as well as layout and white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is flattened. "
            }
        ]
    },
    {
        "domain": "IO",
        "description": "Input/Output operations for streams produced by DevTools.",
        "experimental": true,
        "types": [
            {
                "id": "StreamHandle",
                "type": "string",
                "description": "This is either obtained from another method or specifed as <code>blob:&lt;uuid&gt;</code> where <code>&lt;uuid&gt</code> is an UUID of a Blob."
            }
        ],
        "commands": [
            {
                "name": "read",
                "description": "Read a chunk of the stream",
                "parameters": [
                    { "name": "handle", "$ref": "StreamHandle", "description": "Handle of the stream to read." },
                    { "name": "offset", "type": "integer", "optional": true, "description": "Seek to the specified offset before reading (if not specificed, proceed with offset following the last read)." },
                    { "name": "size", "type": "integer", "optional": true,  "description": "Maximum number of bytes to read (left upon the agent discretion if not specified)." }
                ],
                "returns": [
                    { "name": "base64Encoded", "type": "boolean", "optional": true, "description": "Set if the data is base64-encoded"},
                    { "name": "data", "type": "string", "description": "Data that were read." },
                    { "name": "eof", "type": "boolean", "description": "Set if the end-of-file condition occured while reading." }
                ]
            },
            {
                "name": "close",
                "description": "Close the stream, discard any temporary backing storage.",
                "parameters": [
                    { "name": "handle", "$ref": "StreamHandle", "description": "Handle of the stream to close." }
                ]
            },
            {
                "name": "resolveBlob",
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "Object id of a Blob object wrapper." }
                ],
                "returns": [
                    { "name": "uuid", "type": "string", "description": "UUID of the specified Blob." }
                ],
                "description": "Return UUID of Blob object specified by a remote object id."
            }
        ]
    },
    {
        "domain": "DOMDebugger",
        "description": "DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript execution will stop on these operations as if there was a regular breakpoint set.",
        "dependencies": ["DOM", "Debugger"],
        "types": [
            {
                "id": "DOMBreakpointType",
                "type": "string",
                "enum": ["subtree-modified", "attribute-modified", "node-removed"],
                "description": "DOM breakpoint type."
            },
            {
                "id": "EventListener",
                "type": "object",
                "description": "Object event listener.",
                "properties": [
                    { "name": "type", "type": "string", "description": "<code>EventListener</code>'s type." },
                    { "name": "useCapture", "type": "boolean", "description": "<code>EventListener</code>'s useCapture." },
                    { "name": "passive", "type": "boolean", "description": "<code>EventListener</code>'s passive flag." },
                    { "name": "once", "type": "boolean", "description": "<code>EventListener</code>'s once flag." },
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Script id of the handler code." },
                    { "name": "lineNumber", "type": "integer", "description": "Line number in the script (0-based)." },
                    { "name": "columnNumber", "type": "integer", "description": "Column number in the script (0-based)." },
                    { "name": "handler", "$ref": "Runtime.RemoteObject", "optional": true, "description": "Event handler function value." },
                    { "name": "originalHandler", "$ref": "Runtime.RemoteObject", "optional": true, "description": "Event original handler function value." },
                    { "name": "backendNodeId", "$ref": "DOM.BackendNodeId", "optional": true, "description": "Node the listener is added to (if any)." }
                ],
                "experimental": true
            }
        ],
        "commands": [
            {
                "name": "setDOMBreakpoint",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "Identifier of the node to set breakpoint on." },
                    { "name": "type", "$ref": "DOMBreakpointType", "description": "Type of the operation to stop upon." }
                ],
                "description": "Sets breakpoint on particular operation with DOM."
            },
            {
                "name": "removeDOMBreakpoint",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "Identifier of the node to remove breakpoint from." },
                    { "name": "type", "$ref": "DOMBreakpointType", "description": "Type of the breakpoint to remove." }
                ],
                "description": "Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>."
            },
            {
                "name": "setEventListenerBreakpoint",
                "parameters": [
                    { "name": "eventName", "type": "string", "description": "DOM Event name to stop on (any DOM event will do)." },
                    { "name": "targetName", "type": "string", "optional": true, "description": "EventTarget interface name to stop on. If equal to <code>\"*\"</code> or not provided, will stop on any EventTarget.", "experimental": true }
                ],
                "description": "Sets breakpoint on particular DOM event."
            },
            {
                "name": "removeEventListenerBreakpoint",
                "parameters": [
                    { "name": "eventName", "type": "string", "description": "Event name." },
                    { "name": "targetName", "type": "string", "optional": true, "description": "EventTarget interface name.", "experimental": true }
                ],
                "description": "Removes breakpoint on particular DOM event."
            },
            {
                "name": "setInstrumentationBreakpoint",
                "parameters": [
                    { "name": "eventName", "type": "string", "description": "Instrumentation name to stop on." }
                ],
                "description": "Sets breakpoint on particular native event.",
                "experimental": true
            },
            {
                "name": "removeInstrumentationBreakpoint",
                "parameters": [
                    { "name": "eventName", "type": "string", "description": "Instrumentation name to stop on." }
                ],
                "description": "Removes breakpoint on particular native event.",
                "experimental": true
            },
            {
                "name": "setXHRBreakpoint",
                "parameters": [
                    { "name": "url", "type": "string", "description": "Resource URL substring. All XHRs having this substring in the URL will get stopped upon." }
                ],
                "description": "Sets breakpoint on XMLHttpRequest."
            },
            {
                "name": "removeXHRBreakpoint",
                "parameters": [
                    { "name": "url", "type": "string", "description": "Resource URL substring." }
                ],
                "description": "Removes breakpoint from XMLHttpRequest."
            },
            {
                "name": "getEventListeners",
                "experimental": true,
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "Identifier of the object to return listeners for." },
                    { "name": "depth", "type": "integer", "optional": true, "description": "The maximum depth at which Node children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.", "experimental": true },
                    { "name": "pierce", "type": "boolean", "optional": true, "description": "Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false). Reports listeners for all contexts if pierce is enabled.", "experimental": true }
                ],
                "returns": [
                    { "name": "listeners", "type": "array", "items": { "$ref": "EventListener" }, "description": "Array of relevant listeners." }
                ],
                "description": "Returns event listeners of the given object."
            }
        ]
    },
    {
        "domain": "Target",
        "description": "Supports additional targets discovery and allows to attach to them.",
        "experimental": true,
        "types": [
            {
                "id": "TargetID",
                "type": "string"
            },
            {
                "id": "SessionID",
                "type": "string",
                "description": "Unique identifier of attached debugging session."
            },
            {
                "id": "BrowserContextID",
                "type": "string"
            },
            {
                "id": "TargetInfo",
                "type": "object",
                "properties": [
                    { "name": "targetId", "$ref": "TargetID" },
                    { "name": "type", "type": "string" },
                    { "name": "title", "type": "string" },
                    { "name": "url", "type": "string" },
                    { "name": "attached", "type": "boolean", "description": "Whether the target has an attached client." }
                ]
            },
            {
                "id": "RemoteLocation",
                "type": "object",
                "properties": [
                    { "name": "host", "type": "string" },
                    { "name": "port", "type": "integer" }
                ]
            }
        ],
        "commands": [
            {
                "name": "setDiscoverTargets",
                "description": "Controls whether to discover available targets and notify via <code>targetCreated/targetInfoChanged/targetDestroyed</code> events.",
                "parameters": [
                    { "name": "discover", "type": "boolean", "description": "Whether to discover available targets." }
                ]
            },
            {
                "name": "setAutoAttach",
                "description": "Controls whether to automatically attach to new targets which are considered to be related to this one. When turned on, attaches to all existing related targets as well. When turned off, automatically detaches from all currently attached targets.",
                "parameters": [
                    { "name": "autoAttach", "type": "boolean", "description": "Whether to auto-attach to related targets." },
                    { "name": "waitForDebuggerOnStart", "type": "boolean", "description": "Whether to pause new targets when attaching to them. Use <code>Runtime.runIfWaitingForDebugger</code> to run paused targets." }
                ]
            },
            {
                "name": "setAttachToFrames",
                "parameters": [
                    { "name": "value", "type": "boolean", "description": "Whether to attach to frames." }
                ]
            },
            {
                "name": "setRemoteLocations",
                "description": "Enables target discovery for the specified locations, when <code>setDiscoverTargets</code> was set to <code>true</code>.",
                "parameters": [
                    { "name": "locations", "type": "array", "items": { "$ref": "RemoteLocation" }, "description": "List of remote locations." }
                ]
            },
            {
                "name": "sendMessageToTarget",
                "description": "Sends protocol message over session with given id.",
                "parameters": [
                    { "name": "message", "type": "string" },
                    { "name": "sessionId", "$ref": "SessionID", "optional": true, "description": "Identifier of the session." },
                    { "name": "targetId", "$ref": "TargetID", "optional": true, "deprecated": true, "description": "Deprecated." }
                ]
            },
            {
                "name": "getTargetInfo",
                "description": "Returns information about a target.",
                "parameters": [
                    { "name": "targetId", "$ref": "TargetID" }
                ],
                "returns": [
                    { "name": "targetInfo","$ref": "TargetInfo" }
                ]
            },
            {
                "name": "activateTarget",
                "description": "Activates (focuses) the target.",
                "parameters": [
                    { "name": "targetId", "$ref": "TargetID" }
                ]
            },
            {
                "name": "closeTarget",
                "description": "Closes the target. If the target is a page that gets closed too.",
                "parameters": [
                    { "name": "targetId", "$ref": "TargetID" }
                ],
                "returns": [
                    { "name": "success", "type": "boolean" }
                ]
            },
            {
                "name": "attachToTarget",
                "description": "Attaches to the target with given id.",
                "parameters": [
                    { "name": "targetId", "$ref": "TargetID" }
                ],
                "returns": [
                    { "name": "sessionId", "$ref": "SessionID", "description": "Id assigned to the session." }
                ]
            },
            {
                "name": "detachFromTarget",
                "description": "Detaches session with given id.",
                "parameters": [
                    { "name": "sessionId", "$ref": "SessionID", "optional": true, "description": "Session to detach." },
                    { "name": "targetId", "$ref": "TargetID", "optional": true, "deprecated": true, "description": "Deprecated." }
                ]
            },
            {
                "name": "createBrowserContext",
                "description": "Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than one.",
                "returns": [
                    { "name": "browserContextId", "$ref": "BrowserContextID", "description": "The id of the context created." }
                ]
            },
            {
                "name": "disposeBrowserContext",
                "description": "Deletes a BrowserContext, will fail of any open page uses it.",
                "parameters": [
                    { "name": "browserContextId", "$ref": "BrowserContextID" }
                ],
                "returns": [
                    { "name": "success", "type": "boolean" }
                ]
            },
            {
                "name": "createTarget",
                "description": "Creates a new page.",
                "parameters": [
                    { "name": "url", "type": "string", "description": "The initial URL the page will be navigated to." },
                    { "name": "width", "type": "integer", "description": "Frame width in DIP (headless chrome only).", "optional": true },
                    { "name": "height", "type": "integer", "description": "Frame height in DIP (headless chrome only).", "optional": true },
                    { "name": "browserContextId", "$ref": "BrowserContextID", "description": "The browser context to create the page in (headless chrome only).", "optional": true }
                ],
                "returns": [
                    { "name": "targetId", "$ref": "TargetID", "description": "The id of the page opened." }
                ]
            },
            {
                "name": "getTargets",
                "description": "Retrieves a list of available targets.",
                "returns": [
                    { "name": "targetInfos", "type": "array", "items": { "$ref": "TargetInfo" }, "description": "The list of targets." }
                ]
            }
        ],
        "events": [
            {
                "name": "targetCreated",
                "description": "Issued when a possible inspection target is created.",
                "parameters": [
                    { "name": "targetInfo", "$ref": "TargetInfo" }
                ]
            },
            {
                "name": "targetInfoChanged",
                "description": "Issued when some information about a target has changed. This only happens between <code>targetCreated</code> and <code>targetDestroyed</code>.",
                "parameters": [
                    { "name": "targetInfo", "$ref": "TargetInfo" }
                ]
            },
            {
                "name": "targetDestroyed",
                "description": "Issued when a target is destroyed.",
                "parameters": [
                    { "name": "targetId", "$ref": "TargetID" }
                ]
            },
            {
                "name": "attachedToTarget",
                "description": "Issued when attached to target because of auto-attach or <code>attachToTarget</code> command.",
                "parameters": [
                    { "name": "sessionId", "$ref": "SessionID", "description": "Identifier assigned to the session used to send/receive messages." },
                    { "name": "targetInfo", "$ref": "TargetInfo" },
                    { "name": "waitingForDebugger", "type": "boolean" }
                ]
            },
            {
                "name": "detachedFromTarget",
                "description": "Issued when detached from target for any reason (including <code>detachFromTarget</code> command). Can be issued multiple times per target if multiple sessions have been attached to it.",
                "parameters": [
                    { "name": "sessionId", "$ref": "SessionID", "description": "Detached session identifier." },
                    { "name": "targetId", "$ref": "TargetID", "optional": true, "deprecated": true, "description": "Deprecated." }
                ]
            },
            {
                "name": "receivedMessageFromTarget",
                "description": "Notifies about a new protocol message received from the session (as reported in <code>attachedToTarget</code> event).",
                "parameters": [
                    { "name": "sessionId", "$ref": "SessionID", "description": "Identifier of a session which sends a message." },
                    { "name": "message", "type": "string" },
                    { "name": "targetId", "$ref": "TargetID", "optional": true, "deprecated": true, "description": "Deprecated." }
                ]
            }
        ]
    },
    {
        "domain": "ServiceWorker",
        "experimental": true,
        "types": [
            {
                "id": "ServiceWorkerRegistration",
                "type": "object",
                "description": "ServiceWorker registration.",
                "properties": [
                    { "name": "registrationId", "type": "string" },
                    { "name": "scopeURL", "type": "string" },
                    { "name": "isDeleted", "type": "boolean" }
                ]
            },
            {
                "id": "ServiceWorkerVersionRunningStatus",
                "type": "string",
                "enum": ["stopped", "starting", "running", "stopping"]
            },
            {
                "id": "ServiceWorkerVersionStatus",
                "type": "string",
                "enum": ["new", "installing", "installed", "activating", "activated", "redundant"]
            },
            {
                "id": "ServiceWorkerVersion",
                "type": "object",
                "description": "ServiceWorker version.",
                "properties": [
                    { "name": "versionId", "type": "string" },
                    { "name": "registrationId", "type": "string" },
                    { "name": "scriptURL", "type": "string" },
                    { "name": "runningStatus", "$ref": "ServiceWorkerVersionRunningStatus" },
                    { "name": "status", "$ref": "ServiceWorkerVersionStatus" },
                    { "name": "scriptLastModified", "type": "number", "optional": true, "description": "The Last-Modified header value of the main script." },
                    { "name": "scriptResponseTime", "type": "number", "optional": true, "description": "The time at which the response headers of the main script were received from the server.  For cached script it is the last time the cache entry was validated." },
                    { "name": "controlledClients", "type": "array", "optional": true, "items": { "$ref": "Target.TargetID" } },
                    { "name": "targetId", "$ref": "Target.TargetID", "optional": true }
                ]
            },
            {
                "id": "ServiceWorkerErrorMessage",
                "type": "object",
                "description": "ServiceWorker error message.",
                "properties": [
                    { "name": "errorMessage", "type": "string" },
                    { "name": "registrationId", "type": "string" },
                    { "name": "versionId", "type": "string" },
                    { "name": "sourceURL", "type": "string" },
                    { "name": "lineNumber", "type": "integer" },
                    { "name": "columnNumber", "type": "integer" }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable"
            },
            {
                "name": "disable"
            },
            {
                "name": "unregister",
                "parameters": [
                    { "name": "scopeURL", "type": "string" }
                ]
            },
            {
                "name": "updateRegistration",
                "parameters": [
                    { "name": "scopeURL", "type": "string" }
                ]
            },
            {
                "name": "startWorker",
                "parameters": [
                    { "name": "scopeURL", "type": "string" }
                ]
            },
            {
                "name": "skipWaiting",
                "parameters": [
                    { "name": "scopeURL", "type": "string" }
                ]
            },
            {
                "name": "stopWorker",
                "parameters": [
                    { "name": "versionId", "type": "string" }
                ]
            },
            {
                "name": "inspectWorker",
                "parameters": [
                    { "name": "versionId", "type": "string" }
                ]
            },
            {
                "name": "setForceUpdateOnPageLoad",
                "parameters": [
                    { "name": "forceUpdateOnPageLoad", "type": "boolean" }
                ]
            },
            {
                "name": "deliverPushMessage",
                "parameters": [
                    { "name": "origin", "type": "string" },
                    { "name": "registrationId", "type": "string" },
                    { "name": "data", "type": "string" }
                ]
            },
            {
                "name": "dispatchSyncEvent",
                "parameters": [
                    { "name": "origin", "type": "string" },
                    { "name": "registrationId", "type": "string" },
                    { "name": "tag", "type": "string" },
                    { "name": "lastChance", "type": "boolean" }
                ]
            }
        ],
        "events": [
            {
                "name": "workerRegistrationUpdated",
                "parameters": [
                    { "name": "registrations", "type": "array", "items": { "$ref": "ServiceWorkerRegistration" } }
                ]
            },
            {
                "name": "workerVersionUpdated",
                "parameters": [
                    { "name": "versions", "type": "array", "items": { "$ref": "ServiceWorkerVersion" } }
                ]
            },
            {
                "name": "workerErrorReported",
                "parameters": [
                    { "name": "errorMessage", "$ref": "ServiceWorkerErrorMessage" }
                ]
            }
        ]
    },
    {
        "domain": "Input",
        "types": [
            {
                "id": "TouchPoint",
                "type": "object",
                "experimental": true,
                "properties": [
                    { "name": "x", "type": "number", "description": "X coordinate of the event relative to the main frame's viewport in CSS pixels."},
                    { "name": "y", "type": "number", "description": "Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to the top of the viewport and Y increases as it proceeds towards the bottom of the viewport."},
                    { "name": "radiusX", "type": "number", "optional": true, "description": "X radius of the touch area (default: 1.0)."},
                    { "name": "radiusY", "type": "number", "optional": true, "description": "Y radius of the touch area (default: 1.0)."},
                    { "name": "rotationAngle", "type": "number", "optional": true, "description": "Rotation angle (default: 0.0)."},
                    { "name": "force", "type": "number", "optional": true, "description": "Force (default: 1.0)."},
                    { "name": "id", "type": "number", "optional": true, "description": "Identifier used to track touch sources between events, must be unique within an event."}
                ]
            },
            {
                "id": "GestureSourceType",
                "type": "string",
                "experimental": true,
                "enum": ["default", "touch", "mouse"]
            },
            {
                "id": "TimeSinceEpoch",
                "type": "number",
                "description": "UTC time in seconds, counted from January 1, 1970."
            }
        ],
        "commands": [
            {
                "name": "setIgnoreInputEvents",
                "parameters": [
                    { "name": "ignore", "type": "boolean", "description": "Ignores input events processing when set to true." }
                ],
                "description": "Ignores input events (useful while auditing page)."
            },
            {
                "name": "dispatchKeyEvent",
                "parameters": [
                    { "name": "type", "type": "string", "enum": ["keyDown", "keyUp", "rawKeyDown", "char"], "description": "Type of the key event." },
                    { "name": "modifiers", "type": "integer", "optional": true, "description": "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)." },
                    { "name": "timestamp", "$ref": "TimeSinceEpoch", "optional": true, "description": "Time at which the event occurred." },
                    { "name": "text", "type": "string", "optional": true, "description": "Text as generated by processing a virtual key code with a keyboard layout. Not needed for for <code>keyUp</code> and <code>rawKeyDown</code> events (default: \"\")" },
                    { "name": "unmodifiedText", "type": "string", "optional": true, "description": "Text that would have been generated by the keyboard if no modifiers were pressed (except for shift). Useful for shortcut (accelerator) key handling (default: \"\")." },
                    { "name": "keyIdentifier", "type": "string", "optional": true, "description": "Unique key identifier (e.g., 'U+0041') (default: \"\")." },
                    { "name": "code", "type": "string", "optional": true, "description": "Unique DOM defined string value for each physical key (e.g., 'KeyA') (default: \"\")." },
                    { "name": "key", "type": "string", "optional": true, "description": "Unique DOM defined string value describing the meaning of the key in the context of active modifiers, keyboard layout, etc (e.g., 'AltGr') (default: \"\")." },
                    { "name": "windowsVirtualKeyCode", "type": "integer", "optional": true, "description": "Windows virtual key code (default: 0)." },
                    { "name": "nativeVirtualKeyCode", "type": "integer", "optional": true, "description": "Native virtual key code (default: 0)." },
                    { "name": "autoRepeat", "type": "boolean", "optional": true, "description": "Whether the event was generated from auto repeat (default: false)." },
                    { "name": "isKeypad", "type": "boolean", "optional": true, "description": "Whether the event was generated from the keypad (default: false)." },
                    { "name": "isSystemKey", "type": "boolean", "optional": true, "description": "Whether the event was a system key event (default: false)." }
                ],
                "description": "Dispatches a key event to the page."
            },
            {
                "name": "dispatchMouseEvent",
                "parameters": [
                    { "name": "type", "type": "string", "enum": ["mousePressed", "mouseReleased", "mouseMoved", "mouseWheel"], "description": "Type of the mouse event." },
                    { "name": "x", "type": "number", "description": "X coordinate of the event relative to the main frame's viewport in CSS pixels."},
                    { "name": "y", "type": "number", "description": "Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to the top of the viewport and Y increases as it proceeds towards the bottom of the viewport."},
                    { "name": "modifiers", "type": "integer", "optional": true, "description": "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)." },
                    { "name": "timestamp", "$ref": "TimeSinceEpoch", "optional": true, "description": "Time at which the event occurred." },
                    { "name": "button", "type": "string", "enum": ["none", "left", "middle", "right"], "optional": true, "description": "Mouse button (default: \"none\")." },
                    { "name": "clickCount", "type": "integer", "optional": true, "description": "Number of times the mouse button was clicked (default: 0)." },
                    { "name": "deltaX", "type": "number", "optional": true, "description": "X delta in CSS pixels for mouse wheel event (default: 0)."},
                    { "name": "deltaY", "type": "number", "optional": true, "description": "Y delta in CSS pixels for mouse wheel event (default: 0)."}
                ],
                "description": "Dispatches a mouse event to the page."
            },
            {
                "name": "dispatchTouchEvent",
                "experimental": true,
                "parameters": [
                    { "name": "type", "type": "string", "enum": ["touchStart", "touchEnd", "touchMove", "touchCancel"], "description": "Type of the touch event. TouchEnd and TouchCancel must not contain any touch points, while TouchStart and TouchMove must contains at least one." },
                    { "name": "touchPoints", "type": "array", "items": { "$ref": "TouchPoint" }, "description": "Active touch points on the touch device. One event per any changed point (compared to previous touch event in a sequence) is generated, emulating pressing/moving/releasing points one by one." },
                    { "name": "modifiers", "type": "integer", "optional": true, "description": "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)." },
                    { "name": "timestamp", "$ref": "TimeSinceEpoch", "optional": true, "description": "Time at which the event occurred." }
                ],
                "description": "Dispatches a touch event to the page."
            },
            {
                "name": "emulateTouchFromMouseEvent",
                "experimental": true,
                "parameters": [
                    { "name": "type", "type": "string", "enum": ["mousePressed", "mouseReleased", "mouseMoved", "mouseWheel"], "description": "Type of the mouse event." },
                    { "name": "x", "type": "integer", "description": "X coordinate of the mouse pointer in DIP."},
                    { "name": "y", "type": "integer", "description": "Y coordinate of the mouse pointer in DIP."},
                    { "name": "timestamp", "$ref": "TimeSinceEpoch", "description": "Time at which the event occurred." },
                    { "name": "button", "type": "string", "enum": ["none", "left", "middle", "right"], "description": "Mouse button." },
                    { "name": "deltaX", "type": "number", "optional": true, "description": "X delta in DIP for mouse wheel event (default: 0)."},
                    { "name": "deltaY", "type": "number", "optional": true, "description": "Y delta in DIP for mouse wheel event (default: 0)."},
                    { "name": "modifiers", "type": "integer", "optional": true, "description": "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)." },
                    { "name": "clickCount", "type": "integer", "optional": true, "description": "Number of times the mouse button was clicked (default: 0)." }
                ],
                "description": "Emulates touch event from the mouse event parameters."
            },
            {
                "name": "synthesizePinchGesture",
                "parameters": [
                    { "name": "x", "type": "number", "description": "X coordinate of the start of the gesture in CSS pixels." },
                    { "name": "y", "type": "number", "description": "Y coordinate of the start of the gesture in CSS pixels." },
                    { "name": "scaleFactor", "type": "number", "description": "Relative scale factor after zooming (>1.0 zooms in, <1.0 zooms out)." },
                    { "name": "relativeSpeed", "type": "integer", "optional": true, "description": "Relative pointer speed in pixels per second (default: 800)." },
                    { "name": "gestureSourceType", "$ref": "GestureSourceType", "optional": true, "description": "Which type of input events to be generated (default: 'default', which queries the platform for the preferred input type)." }
                ],
                "description": "Synthesizes a pinch gesture over a time period by issuing appropriate touch events.",
                "experimental": true
            },
            {
                "name": "synthesizeScrollGesture",
                "parameters": [
                    { "name": "x", "type": "number", "description": "X coordinate of the start of the gesture in CSS pixels." },
                    { "name": "y", "type": "number", "description": "Y coordinate of the start of the gesture in CSS pixels." },
                    { "name": "xDistance", "type": "number", "optional": true, "description": "The distance to scroll along the X axis (positive to scroll left)." },
                    { "name": "yDistance", "type": "number", "optional": true, "description": "The distance to scroll along the Y axis (positive to scroll up)." },
                    { "name": "xOverscroll", "type": "number", "optional": true, "description": "The number of additional pixels to scroll back along the X axis, in addition to the given distance." },
                    { "name": "yOverscroll", "type": "number", "optional": true, "description": "The number of additional pixels to scroll back along the Y axis, in addition to the given distance." },
                    { "name": "preventFling", "type": "boolean", "optional": true, "description": "Prevent fling (default: true)." },
                    { "name": "speed", "type": "integer", "optional": true, "description": "Swipe speed in pixels per second (default: 800)." },
                    { "name": "gestureSourceType", "$ref": "GestureSourceType", "optional": true, "description": "Which type of input events to be generated (default: 'default', which queries the platform for the preferred input type)." },
                    { "name": "repeatCount", "type": "integer", "optional": true, "description": "The number of times to repeat the gesture (default: 0)." },
                    { "name": "repeatDelayMs", "type": "integer", "optional": true, "description": "The number of milliseconds delay between each repeat. (default: 250)." },
                    { "name": "interactionMarkerName", "type": "string", "optional": true, "description": "The name of the interaction markers to generate, if not empty (default: \"\")." }
                ],
                "description": "Synthesizes a scroll gesture over a time period by issuing appropriate touch events.",
                "experimental": true
            },
            {
                "name": "synthesizeTapGesture",
                "parameters": [
                    { "name": "x", "type": "number", "description": "X coordinate of the start of the gesture in CSS pixels." },
                    { "name": "y", "type": "number", "description": "Y coordinate of the start of the gesture in CSS pixels." },
                    { "name": "duration", "type": "integer", "optional": true, "description": "Duration between touchdown and touchup events in ms (default: 50)." },
                    { "name": "tapCount", "type": "integer", "optional": true, "description": "Number of times to perform the tap (e.g. 2 for double tap, default: 1)." },
                    { "name": "gestureSourceType", "$ref": "GestureSourceType", "optional": true, "description": "Which type of input events to be generated (default: 'default', which queries the platform for the preferred input type)." }
                ],
                "description": "Synthesizes a tap gesture over a time period by issuing appropriate touch events.",
                "experimental": true
            }
        ],
        "events": []
    },
    {
        "domain": "LayerTree",
        "experimental": true,
        "dependencies": ["DOM"],
        "types": [
            {
                "id": "LayerId",
                "type": "string",
                "description": "Unique Layer identifier."
            },
            {
                "id": "SnapshotId",
                "type": "string",
                "description": "Unique snapshot identifier."
            },
            {
                "id": "ScrollRect",
                "type": "object",
                "description": "Rectangle where scrolling happens on the main thread.",
                "properties": [
                    { "name": "rect", "$ref": "DOM.Rect", "description": "Rectangle itself." },
                    { "name": "type", "type": "string", "enum": ["RepaintsOnScroll", "TouchEventHandler", "WheelEventHandler"], "description": "Reason for rectangle to force scrolling on the main thread" }
                ]
            },
            {
                "id": "StickyPositionConstraint",
                "type": "object",
                "description": "Sticky position constraints.",
                "properties": [
                    { "name": "stickyBoxRect", "$ref": "DOM.Rect", "description": "Layout rectangle of the sticky element before being shifted" },
                    { "name": "containingBlockRect", "$ref": "DOM.Rect", "description": "Layout rectangle of the containing block of the sticky element" },
                    { "name": "nearestLayerShiftingStickyBox", "$ref": "LayerId", "optional": true, "description": "The nearest sticky layer that shifts the sticky box" },
                    { "name": "nearestLayerShiftingContainingBlock", "$ref": "LayerId", "optional": true, "description": "The nearest sticky layer that shifts the containing block" }
                ]
            },
            {
                "id": "PictureTile",
                "type": "object",
                "description": "Serialized fragment of layer picture along with its offset within the layer.",
                "properties": [
                    { "name": "x", "type": "number", "description": "Offset from owning layer left boundary" },
                    { "name": "y", "type": "number", "description": "Offset from owning layer top boundary" },
                    { "name": "picture", "type": "string", "description": "Base64-encoded snapshot data." }
                ]
            },
            {
                "id": "Layer",
                "type": "object",
                "description": "Information about a compositing layer.",
                "properties": [
                    { "name": "layerId", "$ref": "LayerId", "description": "The unique id for this layer." },
                    { "name": "parentLayerId", "$ref": "LayerId", "optional": true, "description": "The id of parent (not present for root)." },
                    { "name": "backendNodeId", "$ref": "DOM.BackendNodeId", "optional": true, "description": "The backend id for the node associated with this layer." },
                    { "name": "offsetX", "type": "number", "description": "Offset from parent layer, X coordinate." },
                    { "name": "offsetY", "type": "number", "description": "Offset from parent layer, Y coordinate." },
                    { "name": "width", "type": "number", "description": "Layer width." },
                    { "name": "height", "type": "number", "description": "Layer height." },
                    { "name": "transform", "type": "array", "items": { "type": "number" }, "minItems": 16, "maxItems": 16, "optional": true, "description": "Transformation matrix for layer, default is identity matrix" },
                    { "name": "anchorX", "type": "number", "optional": true, "description": "Transform anchor point X, absent if no transform specified" },
                    { "name": "anchorY", "type": "number", "optional": true, "description": "Transform anchor point Y, absent if no transform specified" },
                    { "name": "anchorZ", "type": "number", "optional": true, "description": "Transform anchor point Z, absent if no transform specified" },
                    { "name": "paintCount", "type": "integer", "description": "Indicates how many time this layer has painted." },
                    { "name": "drawsContent", "type": "boolean", "description": "Indicates whether this layer hosts any content, rather than being used for transform/scrolling purposes only." },
                    { "name": "invisible", "type": "boolean", "optional": true, "description": "Set if layer is not visible." },
                    { "name": "scrollRects", "type": "array", "items": { "$ref": "ScrollRect"}, "optional": true, "description": "Rectangles scrolling on main thread only."},
                    { "name": "stickyPositionConstraint", "$ref": "StickyPositionConstraint", "optional": true, "description": "Sticky position constraint information" }
                ]
            },
            {
                "id": "PaintProfile",
                "type": "array",
                "description": "Array of timings, one per paint step.",
                "items": {
                    "type": "number",
                    "description": "A time in seconds since the end of previous step (for the first step, time since painting started)"
                }
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables compositing tree inspection."
            },
            {
                "name": "disable",
                "description": "Disables compositing tree inspection."
            },
            {
                "name": "compositingReasons",
                "parameters": [
                    { "name": "layerId", "$ref": "LayerId", "description": "The id of the layer for which we want to get the reasons it was composited." }
                ],
                "description": "Provides the reasons why the given layer was composited.",
                "returns": [
                    { "name": "compositingReasons", "type": "array", "items": { "type": "string" }, "description": "A list of strings specifying reasons for the given layer to become composited." }
                ]
            },
            {
                "name": "makeSnapshot",
                "parameters": [
                    { "name": "layerId", "$ref": "LayerId", "description": "The id of the layer." }
                ],
                "description": "Returns the layer snapshot identifier.",
                "returns": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." }
                ]
            },
            {
                "name": "loadSnapshot",
                "parameters": [
                    { "name": "tiles", "type": "array", "items": { "$ref": "PictureTile" }, "minItems": 1, "description": "An array of tiles composing the snapshot." }
                ],
                "description": "Returns the snapshot identifier.",
                "returns": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the snapshot." }
                ]
            },
            {
                "name": "releaseSnapshot",
                "parameters": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." }
                ],
                "description": "Releases layer snapshot captured by the back-end."
            },
            {
                "name": "profileSnapshot",
                "parameters": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." },
                    { "name": "minRepeatCount", "type": "integer", "optional": true, "description": "The maximum number of times to replay the snapshot (1, if not specified)." },
                    { "name": "minDuration", "type": "number", "optional": true, "description": "The minimum duration (in seconds) to replay the snapshot." },
                    { "name": "clipRect", "$ref": "DOM.Rect", "optional": true, "description": "The clip rectangle to apply when replaying the snapshot." }
                ],
                "returns": [
                    { "name": "timings", "type": "array", "items": { "$ref": "PaintProfile" }, "description": "The array of paint profiles, one per run." }
                ]
            },
            {
                "name": "replaySnapshot",
                "parameters": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." },
                    { "name": "fromStep", "type": "integer", "optional": true, "description": "The first step to replay from (replay from the very start if not specified)." },
                    { "name": "toStep", "type": "integer", "optional": true, "description": "The last step to replay to (replay till the end if not specified)." },
                    { "name": "scale", "type": "number", "optional": true, "description": "The scale to apply while replaying (defaults to 1)." }
                ],
                "description": "Replays the layer snapshot and returns the resulting bitmap.",
                "returns": [
                    { "name": "dataURL", "type": "string", "description": "A data: URL for resulting image." }
                ]
            },
            {
                "name": "snapshotCommandLog",
                "parameters": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." }
                ],
                "description": "Replays the layer snapshot and returns canvas log.",
                "returns": [
                    { "name": "commandLog", "type": "array", "items": { "type": "object" }, "description": "The array of canvas function calls." }
                ]
            }
        ],
        "events": [
            {
                "name": "layerTreeDidChange",
                "parameters": [
                    { "name": "layers", "type": "array", "items": { "$ref": "Layer" }, "optional": true, "description": "Layer tree, absent if not in the comspositing mode." }
                ]
            },
            {
                "name": "layerPainted",
                "parameters": [
                    { "name": "layerId", "$ref": "LayerId", "description": "The id of the painted layer." },
                    { "name": "clip", "$ref": "DOM.Rect", "description": "Clip rectangle." }
                ]
            }
        ]
    },
    {
        "domain": "DeviceOrientation",
        "experimental": true,
        "commands": [
            {
                "name": "setDeviceOrientationOverride",
                "description": "Overrides the Device Orientation.",
                "parameters": [
                    { "name": "alpha", "type": "number", "description": "Mock alpha"},
                    { "name": "beta", "type": "number", "description": "Mock beta"},
                    { "name": "gamma", "type": "number", "description": "Mock gamma"}
                ]
            },
            {
                "name": "clearDeviceOrientationOverride",
                "description": "Clears the overridden Device Orientation."
            }
        ]
    },
    {
        "domain": "Tracing",
        "dependencies": ["IO"],
        "experimental": true,
        "types": [
            {
                "id": "MemoryDumpConfig",
                "type": "object",
                "description": "Configuration for memory dump. Used only when \"memory-infra\" category is enabled."
            },
            {
                "id": "TraceConfig",
                "type": "object",
                "properties": [
                    { "name": "recordMode", "type": "string", "optional": true, "enum": ["recordUntilFull", "recordContinuously", "recordAsMuchAsPossible", "echoToConsole"], "description": "Controls how the trace buffer stores data." },
                    { "name": "enableSampling", "type": "boolean", "optional": true, "description": "Turns on JavaScript stack sampling." },
                    { "name": "enableSystrace", "type": "boolean", "optional": true, "description": "Turns on system tracing." },
                    { "name": "enableArgumentFilter", "type": "boolean", "optional": true, "description": "Turns on argument filter." },
                    { "name": "includedCategories", "type": "array", "items": { "type": "string" }, "optional": true, "description": "Included category filters." },
                    { "name": "excludedCategories", "type": "array", "items": { "type": "string" }, "optional": true, "description": "Excluded category filters." },
                    { "name": "syntheticDelays", "type": "array", "items": { "type": "string" }, "optional": true, "description": "Configuration to synthesize the delays in tracing." },
                    { "name": "memoryDumpConfig", "$ref": "MemoryDumpConfig", "optional": true, "description": "Configuration for memory dump triggers. Used only when \"memory-infra\" category is enabled." }
                ]
            }
        ],
        "commands": [
            {
                "name": "start",
                "description": "Start trace events collection.",
                "parameters": [
                    { "name": "categories", "type": "string", "optional": true, "deprecated": true, "description": "Category/tag filter" },
                    { "name": "options", "type": "string", "optional": true, "deprecated": true, "description": "Tracing options" },
                    { "name": "bufferUsageReportingInterval", "type": "number", "optional": true, "description": "If set, the agent will issue bufferUsage events at this interval, specified in milliseconds" },
                    { "name": "transferMode", "type": "string", "enum": ["ReportEvents", "ReturnAsStream"], "optional": true, "description": "Whether to report trace events as series of dataCollected events or to save trace to a stream (defaults to <code>ReportEvents</code>)." },
                    { "name": "traceConfig", "$ref": "TraceConfig", "optional": true, "description": "" }
                ]
            },
            {
                "name": "end",
                "description": "Stop trace events collection."
            },
            {
                "name": "getCategories",
                "description": "Gets supported tracing categories.",
                "returns": [
                    { "name": "categories", "type": "array", "items": { "type": "string" }, "description": "A list of supported tracing categories." }
                ]
            },
            {
                "name": "requestMemoryDump",
                "description": "Request a global memory dump.",
                "returns": [
                    { "name": "dumpGuid", "type": "string", "description": "GUID of the resulting global memory dump." },
                    { "name": "success", "type": "boolean", "description": "True iff the global memory dump succeeded." }
                ]
            },
            {
                "name": "recordClockSyncMarker",
                "description": "Record a clock sync marker in the trace.",
                "parameters": [
                    { "name": "syncId", "type": "string", "description": "The ID of this clock sync marker" }
                ]
            }
        ],
        "events": [
            {
                "name": "dataCollected",
                "parameters": [
                    { "name": "value", "type": "array", "items": { "type": "object" } }
                ],
                "description": "Contains an bucket of collected trace events. When tracing is stopped collected events will be send as a sequence of dataCollected events followed by tracingComplete event."
            },
            {
                "name": "tracingComplete",
                "description": "Signals that tracing is stopped and there is no trace buffers pending flush, all data were delivered via dataCollected events.",
                "parameters": [
                    { "name": "stream", "$ref": "IO.StreamHandle", "optional": true, "description": "A handle of the stream that holds resulting trace data." }
                ]
            },
            {
                "name": "bufferUsage",
                "parameters": [
                    { "name": "percentFull", "type": "number", "optional": true, "description": "A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size." },
                    { "name": "eventCount", "type": "number", "optional": true, "description": "An approximate number of events in the trace log." },
                    { "name": "value", "type": "number", "optional": true, "description": "A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size." }
                ]
            }
        ]
    },
    {
        "domain": "Animation",
        "experimental": true,
        "dependencies": ["Runtime", "DOM"],
        "types": [
            {
                "id": "Animation",
                "type": "object",
                "experimental": true,
                "properties": [
                    { "name": "id", "type": "string", "description": "<code>Animation</code>'s id." },
                    { "name": "name", "type": "string", "description": "<code>Animation</code>'s name." },
                    { "name": "pausedState", "type": "boolean", "experimental": true, "description": "<code>Animation</code>'s internal paused state." },
                    { "name": "playState", "type": "string", "description": "<code>Animation</code>'s play state." },
                    { "name": "playbackRate", "type": "number", "description": "<code>Animation</code>'s playback rate." },
                    { "name": "startTime", "type": "number", "description": "<code>Animation</code>'s start time." },
                    { "name": "currentTime", "type": "number", "description": "<code>Animation</code>'s current time." },
                    { "name": "source", "$ref": "AnimationEffect", "description": "<code>Animation</code>'s source animation node." },
                    { "name": "type", "type": "string", "enum": ["CSSTransition", "CSSAnimation", "WebAnimation"], "description": "Animation type of <code>Animation</code>." },
                    { "name": "cssId", "type": "string", "optional": true, "description": "A unique ID for <code>Animation</code> representing the sources that triggered this CSS animation/transition."}
                ],
                "description": "Animation instance."
            },
            {
                "id": "AnimationEffect",
                "type": "object",
                "experimental": true,
                "properties": [
                    { "name": "delay", "type": "number", "description": "<code>AnimationEffect</code>'s delay." },
                    { "name": "endDelay", "type": "number", "description": "<code>AnimationEffect</code>'s end delay." },
                    { "name": "iterationStart", "type": "number", "description": "<code>AnimationEffect</code>'s iteration start." },
                    { "name": "iterations", "type": "number", "description": "<code>AnimationEffect</code>'s iterations." },
                    { "name": "duration", "type": "number", "description": "<code>AnimationEffect</code>'s iteration duration." },
                    { "name": "direction", "type": "string", "description": "<code>AnimationEffect</code>'s playback direction." },
                    { "name": "fill", "type": "string", "description": "<code>AnimationEffect</code>'s fill mode." },
                    { "name": "backendNodeId", "$ref": "DOM.BackendNodeId", "description": "<code>AnimationEffect</code>'s target node." },
                    { "name": "keyframesRule", "$ref": "KeyframesRule", "optional": true, "description": "<code>AnimationEffect</code>'s keyframes." },
                    { "name": "easing", "type": "string", "description": "<code>AnimationEffect</code>'s timing function." }
                ],
                "description": "AnimationEffect instance"
            },
            {
                "id": "KeyframesRule",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "optional": true, "description": "CSS keyframed animation's name." },
                    { "name": "keyframes", "type": "array", "items": { "$ref": "KeyframeStyle" }, "description": "List of animation keyframes." }
                ],
                "description": "Keyframes Rule"
            },
            {
                "id": "KeyframeStyle",
                "type": "object",
                "properties": [
                    { "name": "offset", "type": "string", "description": "Keyframe's time offset." },
                    { "name": "easing", "type": "string", "description": "<code>AnimationEffect</code>'s timing function." }
                ],
                "description": "Keyframe Style"
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables animation domain notifications."
            },
            {
                "name": "disable",
                "description": "Disables animation domain notifications."
            },
            {
                "name": "getPlaybackRate",
                "returns": [
                    { "name": "playbackRate", "type": "number", "description": "Playback rate for animations on page."}
                ],
                "description": "Gets the playback rate of the document timeline."
            },
            {
                "name": "setPlaybackRate",
                "parameters": [
                    { "name": "playbackRate", "type": "number", "description": "Playback rate for animations on page" }
                ],
                "description": "Sets the playback rate of the document timeline."
            },
            {
                "name": "getCurrentTime",
                "parameters": [
                    { "name": "id", "type": "string", "description": "Id of animation." }
                ],
                "returns": [
                    { "name": "currentTime", "type": "number", "description": "Current time of the page." }
                ],
                "description": "Returns the current time of the an animation."
            },
            {
                "name": "setPaused",
                "parameters": [
                    { "name": "animations", "type": "array", "items": { "type": "string" }, "description": "Animations to set the pause state of." },
                    { "name": "paused", "type": "boolean", "description": "Paused state to set to." }
                ],
                "description": "Sets the paused state of a set of animations."
            },
            {
                "name": "setTiming",
                "parameters": [
                    { "name": "animationId", "type": "string", "description": "Animation id." },
                    { "name": "duration", "type": "number", "description": "Duration of the animation." },
                    { "name": "delay", "type": "number", "description": "Delay of the animation." }
                ],
                "description": "Sets the timing of an animation node."
            },
            {
                "name": "seekAnimations",
                "parameters": [
                    { "name": "animations", "type": "array", "items": { "type": "string" }, "description": "List of animation ids to seek." },
                    { "name": "currentTime", "type": "number", "description": "Set the current time of each animation." }
                ],
                "description": "Seek a set of animations to a particular time within each animation."
            },
            {
                "name": "releaseAnimations",
                "parameters": [
                    { "name": "animations", "type": "array", "items": { "type": "string" }, "description": "List of animation ids to seek." }
                ],
                "description": "Releases a set of animations to no longer be manipulated."
            },
            {
                "name": "resolveAnimation",
                "parameters": [
                    { "name": "animationId", "type": "string", "description": "Animation id." }
                ],
                "returns": [
                    { "name": "remoteObject", "$ref": "Runtime.RemoteObject", "description": "Corresponding remote object." }
                ],
                "description": "Gets the remote object of the Animation."
            }
        ],
        "events": [
            {
                "name": "animationCreated",
                "parameters": [
                    { "name": "id", "type": "string", "description": "Id of the animation that was created." }
                ],
                "description": "Event for each animation that has been created."
            },
            {
                "name": "animationStarted",
                "parameters": [
                    { "name": "animation", "$ref": "Animation", "description": "Animation that was started." }
                ],
                "description": "Event for animation that has been started."
            },
            {
                "name": "animationCanceled",
                "parameters": [
                    { "name": "id", "type": "string", "description": "Id of the animation that was cancelled."}
                ],
                "description": "Event for when an animation has been cancelled."
            }
        ]
    },
    {
        "domain": "Accessibility",
        "experimental": true,
        "dependencies": ["DOM"],
        "types": [
            {
                "id": "AXNodeId",
                "type": "string",
                "description": "Unique accessibility node identifier."
            },
            {
                "id": "AXValueType",
                "type": "string",
                "enum": [ "boolean", "tristate", "booleanOrUndefined", "idref", "idrefList", "integer", "node", "nodeList", "number", "string", "computedString", "token", "tokenList", "domRelation", "role", "internalRole", "valueUndefined" ],
                "description": "Enum of possible property types."
            },
            {
                "id": "AXValueSourceType",
                "type": "string",
                "enum": [ "attribute", "implicit", "style", "contents", "placeholder", "relatedElement" ],
                "description": "Enum of possible property sources."
            },
            { "id": "AXValueNativeSourceType",
              "type": "string",
              "enum": [ "figcaption", "label", "labelfor", "labelwrapped", "legend", "tablecaption", "title", "other" ],
              "description": "Enum of possible native property sources (as a subtype of a particular AXValueSourceType)."
            },
            {
                "id": "AXValueSource",
                "type": "object",
                "properties": [
                    { "name": "type", "$ref": "AXValueSourceType", "description": "What type of source this is." },
                    { "name": "value", "$ref": "AXValue", "description": "The value of this property source.", "optional": true },
                    { "name": "attribute", "type": "string", "description": "The name of the relevant attribute, if any.", "optional": true },
                    { "name": "attributeValue", "$ref": "AXValue", "description": "The value of the relevant attribute, if any.", "optional": true },
                    { "name": "superseded", "type": "boolean", "description": "Whether this source is superseded by a higher priority source.", "optional": true },
                    { "name": "nativeSource", "$ref": "AXValueNativeSourceType", "description": "The native markup source for this value, e.g. a <label> element.", "optional": true },
                    { "name": "nativeSourceValue", "$ref": "AXValue", "description": "The value, such as a node or node list, of the native source.", "optional": true },
                    { "name": "invalid", "type": "boolean", "description": "Whether the value for this property is invalid.", "optional": true },
                    { "name": "invalidReason", "type": "string", "description": "Reason for the value being invalid, if it is.", "optional": true }
                ],
                "description": "A single source for a computed AX property."
            },
            {
                "id": "AXRelatedNode",
                "type": "object",
                "properties": [
                    { "name": "backendDOMNodeId", "$ref": "DOM.BackendNodeId", "description": "The BackendNodeId of the related DOM node." },
                    { "name": "idref", "type": "string", "description": "The IDRef value provided, if any.", "optional": true },
                    { "name": "text", "type": "string", "description": "The text alternative of this node in the current context.", "optional": true }
                ]
            },
            {
                "id": "AXProperty",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "description": "The name of this property." },
                    { "name": "value", "$ref": "AXValue", "description": "The value of this property." }
                ]
            },
            {
                "id": "AXValue",
                "type": "object",
                "properties": [
                    { "name": "type", "$ref": "AXValueType", "description": "The type of this value." },
                    { "name": "value", "type": "any", "description": "The computed value of this property.", "optional": true },
                    { "name": "relatedNodes", "type": "array", "items": { "$ref": "AXRelatedNode" }, "description": "One or more related nodes, if applicable.", "optional": true },
                    { "name": "sources", "type": "array", "items": { "$ref": "AXValueSource" }, "description": "The sources which contributed to the computation of this property.", "optional": true }
                ],
                "description": "A single computed AX property."
            },
            {
                "id": "AXGlobalStates",
                "type": "string",
                "enum": [ "busy", "disabled", "hidden", "hiddenRoot", "invalid", "keyshortcuts", "roledescription" ],
                "description": "States which apply to every AX node."
            },
            {
                "id": "AXLiveRegionAttributes",
                "type": "string",
                "enum": [ "live", "atomic", "relevant", "root" ],
                "description": "Attributes which apply to nodes in live regions."
            },
            {
                "id": "AXWidgetAttributes",
                "type": "string",
                "enum": [ "autocomplete", "haspopup", "level", "multiselectable", "orientation", "multiline", "readonly", "required", "valuemin", "valuemax", "valuetext" ],
                "description": "Attributes which apply to widgets."
            },
            {
                "id": "AXWidgetStates",
                "type": "string",
                "enum": [ "checked", "expanded", "modal", "pressed", "selected" ],
                "description": "States which apply to widgets."
            },
            {
                "id": "AXRelationshipAttributes",
                "type": "string",
                "enum": [ "activedescendant", "controls", "describedby", "details", "errormessage", "flowto", "labelledby", "owns" ],
                "description": "Relationships between elements other than parent/child/sibling."
            },
            {
                "id": "AXNode",
                "type": "object",
                "properties": [
                    { "name": "nodeId", "$ref": "AXNodeId", "description": "Unique identifier for this node." },
                    { "name": "ignored", "type": "boolean", "description": "Whether this node is ignored for accessibility" },
                    { "name": "ignoredReasons", "type": "array", "items": { "$ref": "AXProperty" }, "description": "Collection of reasons why this node is hidden.", "optional": true },
                    { "name": "role", "$ref": "AXValue", "description": "This <code>Node</code>'s role, whether explicit or implicit.", "optional": true},
                    { "name": "name", "$ref": "AXValue", "description": "The accessible name for this <code>Node</code>.", "optional": true },
                    { "name": "description", "$ref": "AXValue", "description": "The accessible description for this <code>Node</code>.", "optional": true },
                    { "name": "value", "$ref": "AXValue", "description": "The value for this <code>Node</code>.", "optional": true },
                    { "name": "properties", "type": "array", "items": { "$ref": "AXProperty" }, "description": "All other properties", "optional": true },
                    { "name": "childIds", "type": "array", "items": { "$ref": "AXNodeId" }, "description": "IDs for each of this node's child nodes.", "optional": true },
                    { "name": "backendDOMNodeId", "$ref": "DOM.BackendNodeId", "description": "The backend ID for the associated DOM node, if any.", "optional": true }
                ],
                "description": "A node in the accessibility tree."
            }
        ],
        "commands": [
            {
                "name": "getPartialAXTree",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "ID of node to get the partial accessibility tree for." },
                    { "name": "fetchRelatives", "type": "boolean", "description": "Whether to fetch this nodes ancestors, siblings and children. Defaults to true.", "optional": true }
                ],
                "returns": [
                    { "name": "nodes", "type": "array", "items": { "$ref": "AXNode" }, "description": "The <code>Accessibility.AXNode</code> for this DOM node, if it exists, plus its ancestors, siblings and children, if requested." }
                ],
                "description": "Fetches the accessibility node and partial accessibility tree for this DOM node, if it exists.",
                "experimental": true
            }
        ]
    },
    {
        "domain": "Storage",
        "experimental": true,
        "types": [
            {
                "id": "StorageType",
                "type": "string",
                "enum": [
                    "appcache",
                    "cookies",
                    "file_systems",
                    "indexeddb",
                    "local_storage",
                    "shader_cache",
                    "websql",
                    "service_workers",
                    "cache_storage",
                    "all",
                    "other"
                ],
                "description": "Enum of possible storage types."
            },
            {
                "id": "UsageForType",
                "type": "object",
                "description": "Usage for a storage type.",
                "properties": [
                    { "name": "storageType", "$ref": "StorageType", "description": "Name of storage type." },
                    { "name": "usage", "type": "number", "description": "Storage usage (bytes)." }
                ]
            }
        ],
        "commands": [
            {
                "name": "clearDataForOrigin",
                "parameters": [
                    { "name": "origin", "type": "string", "description": "Security origin." },
                    { "name": "storageTypes", "type": "string", "description": "Comma separated origin names." }
                ],
                "description": "Clears storage for origin."
            },
            {
                "name": "getUsageAndQuota",
                "parameters": [
                    { "name": "origin", "type": "string", "description": "Security origin." }
                ],
                "returns": [
                    { "name": "usage", "type": "number", "description": "Storage usage (bytes)." },
                    { "name": "quota", "type": "number", "description": "Storage quota (bytes)." },
                    { "name": "usageBreakdown", "type": "array", "items": { "$ref": "UsageForType" }, "description": "Storage usage per type (bytes)." }
                ],
                "description": "Returns usage and quota in bytes."
            },
            {
                "name": "trackCacheStorageForOrigin",
                "parameters": [
                    { "name": "origin", "type": "string", "description": "Security origin." }
                ],
                "description": "Registers origin to be notified when an update occurs to its cache storage list."
            },
            {
                "name": "untrackCacheStorageForOrigin",
                "parameters": [
                    { "name": "origin", "type": "string", "description": "Security origin." }
                ],
                "description": "Unregisters origin from receiving notifications for cache storage."
            }
        ],
        "events": [
            {
                "name": "cacheStorageListUpdated",
                "parameters": [
                    { "name": "origin", "type": "string", "description": "Origin to update." }
                ],
                "description": "A cache has been added/deleted."
            },
            {
                "name": "cacheStorageContentUpdated",
                "parameters": [
                    { "name": "origin", "type": "string", "description": "Origin to update." },
                    { "name": "cacheName", "type": "string", "description": "Name of cache in origin." }
                ],
                "description": "A cache's contents have been modified."
            }
        ]
    },
    {
        "domain": "Log",
        "description": "Provides access to log entries.",
        "dependencies": ["Runtime", "Network"],
        "experimental": true,
        "types": [
            {
                "id": "LogEntry",
                "type": "object",
                "description": "Log entry.",
                "properties": [
                    { "name": "source", "type": "string", "enum": ["xml", "javascript", "network", "storage", "appcache", "rendering", "security", "deprecation", "worker", "violation", "intervention", "other"], "description": "Log entry source." },
                    { "name": "level", "type": "string", "enum": ["verbose", "info", "warning", "error"], "description": "Log entry severity." },
                    { "name": "text", "type": "string", "description": "Logged text." },
                    { "name": "timestamp", "$ref": "Runtime.Timestamp", "description": "Timestamp when this entry was added." },
                    { "name": "url", "type": "string", "optional": true, "description": "URL of the resource if known." },
                    { "name": "lineNumber", "type": "integer", "optional": true, "description": "Line number in the resource." },
                    { "name": "stackTrace", "$ref": "Runtime.StackTrace", "optional": true, "description": "JavaScript stack trace." },
                    { "name": "networkRequestId", "$ref": "Network.RequestId", "optional": true, "description": "Identifier of the network request associated with this entry." },
                    { "name": "workerId", "type": "string", "optional": true, "description": "Identifier of the worker associated with this entry." }
                ]
            },
            {
                "id": "ViolationSetting",
                "type": "object",
                "description": "Violation configuration setting.",
                "properties": [
                    { "name": "name", "type": "string", "enum": ["longTask", "longLayout", "blockedEvent", "blockedParser", "discouragedAPIUse", "handler", "recurringHandler"], "description": "Violation type." },
                    { "name": "threshold", "type": "number", "description": "Time threshold to trigger upon." }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables log domain, sends the entries collected so far to the client by means of the <code>entryAdded</code> notification."
            },
            {
                "name": "disable",
                "description": "Disables log domain, prevents further log entries from being reported to the client."
            },
            {
                "name": "clear",
                "description": "Clears the log."
            },
            {
                "name": "startViolationsReport",
                "parameters": [
                    { "name": "config", "type": "array", "items": { "$ref": "ViolationSetting" }, "description": "Configuration for violations." }
                ],
                "description": "start violation reporting."
            },
            {
                "name": "stopViolationsReport",
                "description": "Stop violation reporting."
            }
        ],
        "events": [
            {
                "name": "entryAdded",
                "parameters": [
                    { "name": "entry", "$ref": "LogEntry", "description": "The entry." }
                ],
                "description": "Issued when new message was logged."
            }
        ]
    },
    {
        "domain": "SystemInfo",
        "description": "The SystemInfo domain defines methods and events for querying low-level system information.",
        "experimental": true,
        "types": [
            {
                "id": "GPUDevice",
                "type": "object",
                "properties": [
                    { "name": "vendorId", "type": "number", "description": "PCI ID of the GPU vendor, if available; 0 otherwise." },
                    { "name": "deviceId", "type": "number", "description": "PCI ID of the GPU device, if available; 0 otherwise." },
                    { "name": "vendorString", "type": "string", "description": "String description of the GPU vendor, if the PCI ID is not available." },
                    { "name": "deviceString", "type": "string", "description": "String description of the GPU device, if the PCI ID is not available." }
                ],
                "description": "Describes a single graphics processor (GPU)."
            },
            {
                "id": "GPUInfo",
                "type": "object",
                "properties": [
                    { "name": "devices", "type": "array", "items": { "$ref": "GPUDevice" }, "description": "The graphics devices on the system. Element 0 is the primary GPU." },
                    { "name": "auxAttributes", "type": "object", "optional": true, "description": "An optional dictionary of additional GPU related attributes." },
                    { "name": "featureStatus", "type": "object", "optional": true, "description": "An optional dictionary of graphics features and their status." },
                    { "name": "driverBugWorkarounds", "type": "array", "items": { "type": "string" }, "description": "An optional array of GPU driver bug workarounds." }
                ],
                "description": "Provides information about the GPU(s) on the system."
            }
        ],
        "commands": [
            {
                "name": "getInfo",
                "description": "Returns information about the system.",
                "returns": [
                    { "name": "gpu", "$ref": "GPUInfo", "description": "Information about the GPUs on the system." },
                    { "name": "modelName", "type": "string", "description": "A platform-dependent description of the model of the machine. On Mac OS, this is, for example, 'MacBookPro'. Will be the empty string if not supported." },
                    { "name": "modelVersion", "type": "string", "description": "A platform-dependent description of the version of the machine. On Mac OS, this is, for example, '10.1'. Will be the empty string if not supported." },
                    { "name": "commandLine", "type": "string", "description": "The command line string used to launch the browser. Will be the empty string if not supported." }
                ]
            }
        ]
    },
    {
        "domain": "Tethering",
        "description": "The Tethering domain defines methods and events for browser port binding.",
        "experimental": true,
        "commands": [
            {
                "name": "bind",
                "description": "Request browser port binding.",
                "parameters": [
                    { "name": "port", "type": "integer", "description": "Port number to bind." }
                ]
            },
            {
                "name": "unbind",
                "description": "Request browser port unbinding.",
                "parameters": [
                    { "name": "port", "type": "integer", "description": "Port number to unbind." }
                ]
            }
        ],
        "events": [
            {
                "name": "accepted",
                "description": "Informs that port was successfully bound and got a specified connection id.",
                "parameters": [
                    {"name": "port", "type": "integer", "description": "Port number that was successfully bound." },
                    {"name": "connectionId", "type": "string", "description": "Connection id to be used." }
                ]
            }
        ]
    },
    {
        "domain": "Browser",
        "description": "The Browser domain defines methods and events for browser managing.",
        "experimental": true,
        "types": [
            {
                "id": "WindowID",
                "type": "integer"
            },
            {
                "id": "WindowState",
                "type": "string",
                "enum": ["normal", "minimized", "maximized", "fullscreen"],
                "description": "The state of the browser window."
            },
            {
                "id": "Bounds",
                "type": "object",
                "description": "Browser window bounds information",
                "properties": [
                    { "name": "left", "type": "integer", "optional": true, "description": "The offset from the left edge of the screen to the window in pixels."},
                    { "name": "top", "type": "integer", "optional": true, "description": "The offset from the top edge of the screen to the window in pixels."},
                    { "name": "width", "type": "integer", "optional": true, "description": "The window width in pixels."},
                    { "name": "height", "type": "integer", "optional": true, "description": "The window height in pixels."},
                    { "name": "windowState", "$ref": "WindowState", "optional": true, "description": "The window state. Default to normal."}
                ]
            }
        ],
        "commands": [
            {
                "name": "getWindowForTarget",
                "description": "Get the browser window that contains the devtools target.",
                "parameters": [
                    { "name": "targetId", "$ref": "Target.TargetID", "description": "Devtools agent host id." }
                ],
                "returns": [
                    { "name": "windowId", "$ref": "WindowID", "description": "Browser window id." },
                    { "name": "bounds", "$ref": "Bounds", "description": "Bounds information of the window. When window state is 'minimized', the restored window position and size are returned." }
                ]
            },
            {
                "name": "getVersion",
                "description": "Returns version information.",
                "returns": [
                    { "name": "protocolVersion", "type": "string", "description": "Protocol version." },
                    { "name": "product", "type": "string", "description": "Product name." },
                    { "name": "revision", "type": "string", "description": "Product revision." },
                    { "name": "userAgent", "type": "string", "description": "User-Agent." },
                    { "name": "jsVersion", "type": "string", "description": "V8 version." }
                ]
            },
            {
                "name": "setWindowBounds",
                "description": "Set position and/or size of the browser window.",
                "parameters": [
                    { "name": "windowId", "$ref": "WindowID", "description": "Browser window id." },
                    { "name": "bounds", "$ref": "Bounds", "description": "New window bounds. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'. Leaves unspecified fields unchanged." }
                ]
            },
            {
                "name": "getWindowBounds",
                "description": "Get position and size of the browser window.",
                "parameters": [
                    { "name": "windowId", "$ref": "WindowID", "description": "Browser window id." }
                ],
                "returns": [
                    { "name": "bounds", "$ref": "Bounds", "description": "Bounds information of the window. When window state is 'minimized', the restored window position and size are returned." }
                ]
            }
        ]
    }]
}
