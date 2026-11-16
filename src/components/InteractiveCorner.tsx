import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent, PointerEvent } from "react";
import { FiCommand, FiMaximize2, FiTerminal, FiX } from "react-icons/fi";
import { projects } from "../../data/projects";
import { profile } from "../../data/profile";
import { toolkit, toolkitCategories } from "../../data/toolkit";

type Tab = "terminal" | "pixels";
type TerminalEntry = { command: string; output: string[] };

const colors = ["#c9ff57", "#f7f7f1", "#94b8ff", "#ff8e69", "#d0a6ff", "#20241e"];
const defaultColor = "#c9ff57";
const gridSize = 16;
const initialPixels = Array.from({ length: gridSize * gridSize }, () => "transparent");

function commandOutput(command: string) {
  const normalized = command.trim().toLowerCase();
  if (normalized === "help") {
    return [
      "whoami · about · projects · stack · location",
      "github · linkedin · contact · clear",
    ];
  }
  if (normalized === "whoami" || normalized === "about") {
    return [`${profile.name} — ${profile.role}.`, profile.intro];
  }
  if (normalized === "projects") {
    return projects.map((project) => `${project.title} — ${project.status}`);
  }
  if (normalized === "stack") {
    return toolkitCategories
      .filter((category) => category !== "All")
      .map((category) => {
        const names = toolkit
          .filter((item) => item.category === category)
          .map((item) => item.name);
        return `${category}: ${names.join(", ")}`;
      });
  }
  if (normalized === "location") return [`Based in ${profile.location}.`];
  if (normalized === "github") return [profile.social.github];
  if (normalized === "linkedin") return [profile.social.linkedin];
  if (normalized === "contact") {
    return [
      `GitHub: ${profile.social.github}`,
      `LinkedIn: ${profile.social.linkedin}`,
      profile.email ? `Email: ${profile.email}` : "Email: not configured yet.",
    ];
  }
  if (normalized === "clear") return [];
  return [`Command not found: ${command.trim()}. Type "help" to see available commands.`];
}

function TerminalPanel() {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [entries]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    if (command.toLowerCase() === "clear") {
      setEntries([]);
    } else {
      setEntries((current) => [...current, { command, output: commandOutput(command) }]);
    }
    setHistory((current) => [...current, command]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleHistory = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? "");
    }
    if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next] ?? "");
      }
    }
  };

  return (
    <div className="terminal-panel">
      <div className="terminal-screen" ref={outputRef} aria-live="polite">
        <p className="terminal-welcome">
          ritesh@portfolio <span>~</span> $ type <b>help</b> to get started
        </p>
        {entries.map((entry, index) => (
          <div className="terminal-entry" key={`${entry.command}-${index}`}>
            <p className="terminal-command">
              <span aria-hidden="true">›</span> {entry.command}
            </p>
            {entry.output.map((line) => (
              <p className="terminal-output" key={line}>
                {line.startsWith("https://") ? (
                  <a href={line} rel="noreferrer" target="_blank">
                    {line}
                  </a>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
        ))}
        <form className="terminal-input-row" onSubmit={submit}>
          <label htmlFor="terminal-command-input">›</label>
          <input
            autoComplete="off"
            id="terminal-command-input"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleHistory}
            ref={inputRef}
            spellCheck={false}
            value={input}
            aria-label="Enter a portfolio terminal command"
          />
          <span className="terminal-caret" aria-hidden="true" />
        </form>
      </div>
      <div className="terminal-hint">↑ / ↓ history <span>·</span> enter to run</div>
    </div>
  );
}

function PixelPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<string[]>(initialPixels);
  const [color, setColor] = useState(defaultColor);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeCell, setActiveCell] = useState(0);
  const [canvasError, setCanvasError] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      setCanvasError("Canvas drawing is unavailable in this browser.");
      return;
    }
    setCanvasError("");
    const cell = canvas.width / gridSize;
    context.clearRect(0, 0, canvas.width, canvas.height);
    pixels.forEach((pixel, index) => {
      if (pixel === "transparent") return;
      const x = (index % gridSize) * cell;
      const y = Math.floor(index / gridSize) * cell;
      context.fillStyle = pixel;
      context.fillRect(x, y, cell, cell);
    });
    context.strokeStyle = "rgba(201, 255, 87, .1)";
    context.lineWidth = 0.6;
    for (let index = 0; index <= gridSize; index += 1) {
      const offset = index * cell;
      context.beginPath();
      context.moveTo(offset, 0);
      context.lineTo(offset, canvas.height);
      context.moveTo(0, offset);
      context.lineTo(canvas.width, offset);
      context.stroke();
    }
    const activeX = (activeCell % gridSize) * cell;
    const activeY = Math.floor(activeCell / gridSize) * cell;
    context.strokeStyle = "rgba(238, 239, 231, .75)";
    context.lineWidth = 2;
    context.strokeRect(activeX + 1, activeY + 1, cell - 2, cell - 2);
  }, [activeCell, pixels]);

  const paint = (index: number) => {
    setActiveCell(index);
    setPixels((current) => {
      if (current[index] === color) return current;
      const next = [...current];
      next[index] = color;
      return next;
    });
  };

  const paintAtPointer = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const column = Math.min(gridSize - 1, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * gridSize)));
    const row = Math.min(gridSize - 1, Math.max(0, Math.floor(((event.clientY - rect.top) / rect.height) * gridSize)));
    paint(row * gridSize + column);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    const row = Math.floor(activeCell / gridSize);
    const column = activeCell % gridSize;
    let next = activeCell;
    if (event.key === "ArrowUp") next = Math.max(0, row - 1) * gridSize + column;
    else if (event.key === "ArrowDown") next = Math.min(gridSize - 1, row + 1) * gridSize + column;
    else if (event.key === "ArrowLeft") next = row * gridSize + Math.max(0, column - 1);
    else if (event.key === "ArrowRight") next = row * gridSize + Math.min(gridSize - 1, column + 1);
    else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      paint(activeCell);
      return;
    } else return;
    event.preventDefault();
    setActiveCell(next);
  };

  return (
    <div className="pixel-panel">
      <div className="pixel-canvas-frame">
        <canvas
          aria-label={`16 by 16 pixel canvas. Focus and use arrow keys to navigate, then press space to paint. Current cell ${Math.floor(activeCell / gridSize) + 1}, ${activeCell % gridSize + 1}.`}
          height={256}
          onKeyDown={handleKeyDown}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setIsDrawing(true);
            paintAtPointer(event);
          }}
          onPointerMove={(event) => {
            if (isDrawing) paintAtPointer(event);
          }}
          onPointerUp={() => setIsDrawing(false)}
          onPointerCancel={() => setIsDrawing(false)}
          ref={canvasRef}
          role="application"
          tabIndex={0}
          width={256}
        />
      </div>
      <div className="pixel-tools">
        <div className="pixel-palette" aria-label="Choose a pixel color">
          {colors.map((option) => (
            <button
              aria-label={`Use ${option} as the drawing color`}
              aria-pressed={color === option}
              className={color === option ? "selected" : ""}
              key={option}
              onClick={() => setColor(option)}
              style={{ "--swatch": option } as CSSProperties}
              type="button"
            />
          ))}
        </div>
        <button className="pixel-clear" onClick={() => setPixels(initialPixels)} type="button">
          Clear canvas
        </button>
      </div>
      <p className="pixel-instruction">Draw with pointer or touch · use arrow keys + space</p>
      {canvasError && <p className="pixel-error" role="status">{canvasError}</p>}
    </div>
  );
}

export default function InteractiveCorner() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("terminal");

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <section
          aria-label="Interactive portfolio tools"
          aria-modal="false"
          className="interactive-window"
          role="dialog"
        >
          <div className="interactive-titlebar">
            <div className="interactive-title">
              <FiCommand aria-hidden="true" />
              <span>playground.exe</span>
            </div>
            <div className="interactive-title-actions">
              <span className="window-indicator"><i /> LIVE</span>
              <button
                aria-label="Close interactive tools"
                className="window-close"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="interactive-tabs" role="tablist" aria-label="Choose a playground">
            <button
              aria-selected={activeTab === "terminal"}
              className={activeTab === "terminal" ? "active" : ""}
              onClick={() => setActiveTab("terminal")}
              role="tab"
              type="button"
            >
              <FiTerminal aria-hidden="true" /> terminal
            </button>
            <button
              aria-selected={activeTab === "pixels"}
              className={activeTab === "pixels" ? "active" : ""}
              onClick={() => setActiveTab("pixels")}
              role="tab"
              type="button"
            >
              <FiMaximize2 aria-hidden="true" /> pixel lab
            </button>
          </div>
          {activeTab === "terminal" ? <TerminalPanel /> : <PixelPanel />}
        </section>
      )}
      <div className="playground-dock">
        <span className="dock-label">TRY SOMETHING</span>
        <button
          aria-expanded={isOpen && activeTab === "terminal"}
          aria-label="Open portfolio terminal"
          className="dock-button"
          onClick={() => {
            setActiveTab("terminal");
            setIsOpen(true);
          }}
          type="button"
        >
          <FiTerminal aria-hidden="true" /> <span>Terminal</span>
        </button>
        <button
          aria-expanded={isOpen && activeTab === "pixels"}
          aria-label="Open pixel drawing playground"
          className="dock-button"
          onClick={() => {
            setActiveTab("pixels");
            setIsOpen(true);
          }}
          type="button"
        >
          <FiMaximize2 aria-hidden="true" /> <span>Pixel lab</span>
        </button>
      </div>
    </>
  );
}
