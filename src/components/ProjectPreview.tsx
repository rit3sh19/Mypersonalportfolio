import type { ProjectPreview as PreviewKind } from "../../data/projects";

type Props = {
  kind: PreviewKind;
};

function SpreadsheetPreview() {
  return (
    <div className="preview-window spreadsheet-preview">
      <div className="preview-toolbar">
        <span className="window-dots"><i /><i /><i /></span>
        <span>WORKBOOK / SHEET 01</span>
        <span className="toolbar-action">EXPORT ↗</span>
      </div>
      <div className="sheet-tabs">
        <span className="sheet-tab-active">Data preview</span>
        <span>Chart view</span>
        <span className="sheet-mark">XLSX</span>
      </div>
      <div className="sheet-table">
        <div className="sheet-row sheet-head">
          <span>FIELD A</span><span>FIELD B</span><span>FIELD C</span>
        </div>
        <div className="sheet-row">
          <span><i className="cell-dot cell-lime" /> North</span><span>—</span><span>—</span>
        </div>
        <div className="sheet-row">
          <span><i className="cell-dot cell-blue" /> Central</span><span>—</span><span>—</span>
        </div>
        <div className="sheet-row">
          <span><i className="cell-dot cell-peach" /> South</span><span>—</span><span>—</span>
        </div>
      </div>
      <div aria-hidden="true" className="chart-sketch">
        <span style={{ height: "36%" }} />
        <span style={{ height: "62%" }} />
        <span style={{ height: "48%" }} />
        <span style={{ height: "81%" }} />
        <span style={{ height: "57%" }} />
        <span style={{ height: "70%" }} />
      </div>
      <span className="preview-caption">ILLUSTRATIVE INTERFACE</span>
    </div>
  );
}

function WellbeingPreview() {
  return (
    <div className="preview-window wellbeing-preview">
      <div className="preview-toolbar">
        <span className="window-dots"><i /><i /><i /></span>
        <span>ZENZONE / CHECK-IN</span>
        <span className="toolbar-action">TODAY</span>
      </div>
      <div className="wellbeing-layout">
        <div className="mood-panel">
          <span className="mini-label">HOW ARE YOU FEELING?</span>
          <div className="mood-options">
            <span>🙂</span><span className="mood-selected">😐</span><span>😔</span>
          </div>
          <div className="mood-chart">
            <i style={{ height: "28%" }} /><i style={{ height: "49%" }} />
            <i style={{ height: "39%" }} /><i style={{ height: "65%" }} />
            <i style={{ height: "52%" }} /><i style={{ height: "78%" }} />
            <i style={{ height: "58%" }} />
          </div>
          <span className="mini-label">LOCAL REFLECTION</span>
        </div>
        <div className="chat-panel">
          <span className="mini-label">AI COMPANION</span>
          <div className="chat-bubble chat-bubble-user">I have a lot on my mind.</div>
          <div className="chat-bubble chat-bubble-ai">
            Want to take it one thing at a time?
          </div>
          <span className="chat-input-preview">Write a message… <b>↑</b></span>
        </div>
      </div>
      <span className="preview-caption">ILLUSTRATIVE INTERFACE</span>
    </div>
  );
}

function CensorshipPreview() {
  return (
    <div className="preview-window censorship-preview">
      <div className="preview-toolbar">
        <span className="window-dots"><i /><i /><i /></span>
        <span>MEDIA TOOL / AUDIO PASS</span>
        <span className="processing-mark"><i /> LOCAL</span>
      </div>
      <div className="media-stage">
        <div className="play-symbol">▶</div>
        <div className="media-timecode">VIDEO INPUT · AUDIO OUTPUT</div>
      </div>
      <div className="audio-track">
        <span className="track-label">ORIGINAL</span>
        <div className="waveform">
          {Array.from({ length: 34 }, (_, index) => (
            <i
              key={index}
              style={{ height: `${18 + ((index * 37 + 13) % 70)}%` }}
            />
          ))}
        </div>
      </div>
      <div className="audio-track audio-track-censored">
        <span className="track-label">CENSORED</span>
        <div className="waveform">
          {Array.from({ length: 34 }, (_, index) => (
            <i
              className={index > 14 && index < 19 ? "beep-segment" : ""}
              key={index}
              style={{ height: `${18 + ((index * 23 + 31) % 72)}%` }}
            />
          ))}
        </div>
      </div>
      <div className="flow-caption">
        <span>WHISPER</span><i /> <span>TIMESTAMPS</span><i /> <span>BEEP</span>
      </div>
      <span className="preview-caption">ILLUSTRATIVE INTERFACE</span>
    </div>
  );
}

function BlogPreview() {
  return (
    <div className="preview-window blog-preview">
      <div className="preview-toolbar">
        <span className="window-dots"><i /><i /><i /></span>
        <span>EDITOR / NEW POST</span>
        <span className="toolbar-action">DRAFT</span>
      </div>
      <div className="editor-sheet">
        <div className="editor-tools"><b>B</b><i>I</i><u>U</u><span>H1</span><span>≡</span><span>↗</span></div>
        <span className="mini-label">A NOTE ON BUILDING</span>
        <strong>Small ideas, made real.</strong>
        <div className="editor-line editor-line-long" />
        <div className="editor-line" />
        <div className="editor-line editor-line-short" />
        <span className="editor-status">EDITOR PREVIEW <i /> PUBLISH NOT CONNECTED</span>
      </div>
      <span className="preview-caption">ILLUSTRATIVE INTERFACE</span>
    </div>
  );
}

function CodingPreview() {
  return (
    <div className="preview-window coding-preview">
      <div className="preview-toolbar">
        <span className="window-dots"><i /><i /><i /></span>
        <span>ONLYDEVS / BATTLE ROOM</span>
        <span className="toolbar-action">DEMO</span>
      </div>
      <div className="coding-layout">
        <div className="challenge-panel">
          <span className="mini-label">CODING CHALLENGE</span>
          <strong>Challenge prompt</strong>
          <span className="challenge-description">Write and submit a solution in the battle room.</span>
          <span className="challenge-tag">NO CODE EXECUTION</span>
        </div>
        <div className="code-panel">
          <div className="code-panel-heading"><span>solution.js</span><i /></div>
          <div className="code-line"><b>01</b><span>function solve(input) {"{"}</span></div>
          <div className="code-line"><b>02</b><span className="code-indent">const result = null;</span></div>
          <div className="code-line"><b>03</b><span className="code-indent">return result;</span></div>
          <div className="code-line"><b>04</b><span>{"}"}</span></div>
        </div>
        <div className="opponent-panel">
          <span className="mini-label">MATCH</span>
          <div className="opponent-avatar">A</div>
          <strong>Opponent</strong>
          <span className="match-status"><i /> MOCK MATCH</span>
        </div>
      </div>
      <span className="preview-caption">ILLUSTRATIVE · MATCHMAKING IS SIMULATED</span>
    </div>
  );
}

export default function ProjectPreview({ kind }: Props) {
  return (
    <div className={`project-preview project-preview-${kind}`}>
      {kind === "spreadsheet" && <SpreadsheetPreview />}
      {kind === "wellbeing" && <WellbeingPreview />}
      {kind === "censoring" && <CensorshipPreview />}
      {kind === "blog" && <BlogPreview />}
      {kind === "coding" && <CodingPreview />}
    </div>
  );
}
