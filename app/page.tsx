const creativeApps = [
  "ADOBE",
  "DAVINCI RESOLVE",
  "ABLETON",
  "AVID",
  "MAXON",
  "BLENDER",
  "AFFINITY",
  "IZOTOPE",
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;
const version = "0.6.1";
const releaseRoot = `https://github.com/tomislavrupic/kitkat-mac-health/releases/download/v${version}`;
const downloadURL = `${releaseRoot}/KITKAT-Mac-Health-${version}.dmg`;
const checksumURL = `${releaseRoot}/KITKAT-Mac-Health-${version}.dmg.sha256`;

const healthRows = [
  { label: "GPU / ACTIVE", value: "100%", state: "AI WORK", width: "100%" },
  { label: "MEMORY", value: "60 / 96 GB", state: "NORMAL", width: "63%" },
  { label: "THERMAL", value: "STANDARD", state: "QUIET", width: "50%" },
];

function MiniSignal({ color = "cyan" }: { color?: "cyan" | "green" | "amber" }) {
  return (
    <span className={`mini-signal mini-signal--${color}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <div className="ambient-grid" aria-hidden="true" />

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="KITKAT Mac Health home">
          <img src={assetPath("/media/kitkat-icon.png")} alt="" />
          <span>
            <strong>KITKAT</strong>
            <small>MAC HEALTH / PIX-7</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#system">SYSTEM</a>
          <a href="#capture">CAPTURE</a>
          <a href="#memory">MEMORY</a>
          <a href="#cleanup">CLEANUP</a>
          <a href="#safety">SAFETY</a>
        </nav>

        <a className="header-download" href={downloadURL}>
          DOWNLOAD <span>↓</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow reveal reveal-1">
            <span className="status-dot" /> NATIVE MACOS SYSTEM UTILITY / V{version}
          </div>
          <h1 className="reveal reveal-2">
            YOUR MAC.
            <br />
            <span>UNDER CONTROL.</span>
          </h1>
          <p className="hero-lede reveal reveal-3">
            KITKAT watches CPU, RAM, storage, and Codex usage, records desktop sessions with system audio,
            and keeps selected creative memory connected without touching source files. Sirius can propose
            useful links across projects and drives; nothing becomes canonical until you approve it.
          </p>
          <div className="hero-actions reveal reveal-4">
            <a className="button button--primary" href={downloadURL}>
              <span>DOWNLOAD FOR MAC</span>
              <b>V{version}</b>
            </a>
            <a className="button button--ghost" href="#system">
              INSPECT THE SYSTEM
            </a>
          </div>
          <div className="hero-compat reveal reveal-4">
            <span>MACOS 15+</span>
            <span>APPLE SILICON</span>
            <span>LOCAL FIRST</span>
            <span>REVIEWED AI</span>
            <span>ENCRYPTED SYNC</span>
            <span>NO TELEMETRY</span>
          </div>
        </div>

        <div className="hero-instrument reveal reveal-3" aria-label="KITKAT system health preview">
          <div className="instrument-frame">
            <div className="instrument-head">
              <span>KITKAT / LIVE SIGNAL</span>
              <div>
                <i /> SYSTEM NOMINAL
              </div>
            </div>
            <div className="instrument-stage">
              <div className="icon-orbit">
                <div className="orbit orbit--outer" />
                <div className="orbit orbit--inner" />
                <img src={assetPath("/media/kitkat-icon.png")} alt="KITKAT application icon" />
                <span className="orbit-tag orbit-tag--top">READ ONLY</span>
                <span className="orbit-tag orbit-tag--bottom">ECO / 30 SEC</span>
              </div>
            </div>
            <div className="instrument-metrics">
              {healthRows.map((row) => (
                <div className="metric-row" key={row.label}>
                  <div>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                  <div className="metric-track">
                    <i style={{ width: row.width }} />
                  </div>
                  <small>{row.state}</small>
                </div>
              ))}
            </div>
            <div className="instrument-foot">
              <span>LAST SAMPLE / NOW</span>
              <MiniSignal color="green" />
              <span>BACKGROUND AGENT / ACTIVE</span>
            </div>
          </div>
          <div className="instrument-shadow" aria-hidden="true" />
        </div>
      </section>

      <div className="signal-rail" aria-hidden="true">
        <span>01 / OBSERVE</span>
        <i />
        <span>02 / CAPTURE</span>
        <i />
        <span>03 / CONNECT</span>
        <i />
        <span>04 / CLEAN SAFELY</span>
        <i />
        <span>05 / RESTORE</span>
      </div>

      <section className="section system-section" id="system">
        <div className="section-heading">
          <span className="section-index">01</span>
          <div>
            <p>THE SYSTEM, WITHOUT THE PANIC</p>
            <h2>REAL SIGNAL.<br />HONEST CONTEXT.</h2>
          </div>
          <p className="section-note">
            WindowServer at 44% of one core is not 44% of your Mac. KITKAT shows both values,
            because dramatic numbers are not a diagnosis.
          </p>
        </div>

        <div className="diagnostic-board">
          <div className="diagnostic-sidebar">
            <div className="diag-brand">K7</div>
            <span className="active">OVERVIEW</span>
            <span>STORAGE</span>
            <span>PROCESSES</span>
            <span>SECURITY</span>
          </div>
          <div className="diagnostic-main">
            <div className="diag-topline">
              <span>ACTIVE LOAD / CORE + SYSTEM</span>
              <span className="nominal"><i /> LIVE</span>
            </div>
            <div className="process-table">
              <div className="process-row process-row--head">
                <span>#</span><span>PROCESS</span><span>CORE</span><span>SYSTEM</span><span>STATE</span>
              </div>
              <div className="process-row process-row--active">
                <span>01</span><span>ALI LTX Worker <small>LOCAL AI WORKER</small></span><b>23.6%</b><strong>0.7%</strong><em>AI ACTIVE</em>
              </div>
              <div className="process-row">
                <span>02</span><span>WindowServer <small>DISPLAY COMPOSITOR</small></span><b>43.1%</b><strong>1.3%</strong><em>NOMINAL</em>
              </div>
              <div className="process-row">
                <span>03</span><span>ChatGPT</span><b>2.7%</b><strong>0.1%</strong><em>STABLE</em>
              </div>
            </div>
            <div className="diag-cards">
              <div><span>MEMORY</span><strong>60 / 96 GB</strong><small>NORMAL PRESSURE</small></div>
              <div><span>THERMAL</span><strong>STANDARD</strong><small>QUIET MONITOR</small></div>
              <div><span>GPU SAMPLE</span><strong>100%</strong><small>ON DEMAND</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section capture-section" id="capture">
        <div className="section-heading">
          <span className="section-index">02</span>
          <div>
            <p>NATIVE SCREEN CAPTURE / SYSTEM AUDIO</p>
            <h2>RECORD THE WORK.<br />KEEP THE SOUND.</h2>
          </div>
          <p className="section-note">
            One small control captures your main display, cursor, and stereo system audio.
            KITKAT hides itself from the recording and files everything in one predictable folder.
          </p>
        </div>

        <div className="capture-console">
          <div className="capture-screen">
            <div className="capture-topline">
              <span>KITKAT / QUICK CAPTURE</span>
              <span className="capture-armed"><i /> SYSTEM AUDIO ARMED</span>
            </div>
            <div className="capture-stage">
              <div className="capture-reticle capture-reticle--a" />
              <div className="capture-reticle capture-reticle--b" />
              <div className="capture-window">
                <div className="capture-window__bar">
                  <i /><i /><i />
                  <span>MAIN DISPLAY / 3008 × 1692</span>
                </div>
                <div className="capture-wave" aria-hidden="true">
                  {Array.from({ length: 38 }, (_, index) => (
                    <i
                      key={index}
                      style={{ height: `${18 + ((index * 17) % 68)}%` }}
                    />
                  ))}
                </div>
                <div className="capture-window__signal">
                  <span>STEREO / 48 KHZ</span>
                  <span>H.264 + AAC</span>
                </div>
              </div>
            </div>
            <div className="capture-controls">
              <div className="record-control">
                <span className="record-stop" />
                <strong>00:42</strong>
                <small>RECORDING</small>
              </div>
              <div className="record-route">
                <span className="folder-glyph" aria-hidden="true"><i /></span>
                <span>
                  <small>SAVING TO</small>
                  <strong>MOVIES / KITKAT RECORDINGS</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="capture-specs">
            <div>
              <span>VIDEO</span>
              <strong>UP TO 4K / 30 FPS</strong>
              <small>MAIN DISPLAY + CURSOR</small>
            </div>
            <div>
              <span>AUDIO</span>
              <strong>SYSTEM / STEREO</strong>
              <small>NATIVE 48 KHZ CAPTURE</small>
            </div>
            <div>
              <span>OUTPUT</span>
              <strong>ONE CLEAN MP4</strong>
              <small>FOLDER OPENS IN ONE CLICK</small>
            </div>
            <div className="capture-specs__idle">
              <span>IDLE</span>
              <strong>RECORDER ASLEEP</strong>
              <small>NO CAPTURE WORK UNTIL ASKED</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section memory-section" id="memory">
        <div className="section-heading">
          <span className="section-index">03</span>
          <div>
            <p>LOCAL CONTEXT / REVIEWED INTELLIGENCE</p>
            <h2>SEE THE LOAD.<br />CONNECT THE WORK.</h2>
          </div>
          <p className="section-note">
            Codex quota, CPU, RAM, and disk stay visible beside quick capture tools.
            When you ask Sirius to find a connection, it receives a small, exact candidate set—not your whole vault.
          </p>
        </div>

        <div className="memory-console">
          <div className="memory-utility">
            <div className="memory-topline">
              <span>KITKAT / LIVE UTILITY STRIP</span>
              <span className="nominal"><i /> LOCAL</span>
            </div>
            <div className="usage-grid">
              <div className="usage-dial usage-dial--codex">
                <i><b>73%</b></i><span>CODEX</span><small>SESSION WINDOW</small>
              </div>
              <div className="usage-dial usage-dial--cpu">
                <i><b>24%</b></i><span>CPU</span><small>LIVE SYSTEM</small>
              </div>
              <div className="usage-dial usage-dial--ram">
                <i><b>63%</b></i><span>RAM</span><small>NORMAL PRESSURE</small>
              </div>
              <div className="usage-dial usage-dial--disk">
                <i><b>58%</b></i><span>DISK</span><small>LOCAL VOLUME</small>
              </div>
            </div>
            <div className="utility-actions">
              <div>
                <span>⌘K</span>
                <strong>QUICK CAPTURE</strong>
                <small>TEXT / LINK / FILE / SCREENSHOT</small>
              </div>
              <div>
                <span>⌘C</span>
                <strong>CLIPBOARD HISTORY</strong>
                <small>OPT-IN / SESSION ONLY / SECRET FILTERED</small>
              </div>
              <div>
                <span>↗</span>
                <strong>RECENT FOLDERS</strong>
                <small>RETURN WITHOUT RE-SCANNING CONTENT</small>
              </div>
            </div>
          </div>

          <div className="connection-panel">
            <div className="connection-head">
              <div><span>SIRIUS / CONNECTION INBOX</span><strong>2 PROPOSALS</strong></div>
              <small>NOTHING WRITES BEFORE REVIEW</small>
            </div>
            <div className="connection-map" aria-label="Bounded cross-project connection preview">
              <div className="memory-node memory-node--seed"><small>SEED / PROJECT</small><strong>KITKAT MEMORY</strong><span>ACTIVE CONTEXT</span></div>
              <div className="memory-link memory-link--a" aria-hidden="true" />
              <div className="memory-node memory-node--drive"><small>DRIVE / MEDIA</small><strong>FESTIVAL PUTNIKA</strong><span>REFERENCE ONLY</span></div>
              <div className="memory-link memory-link--b" aria-hidden="true" />
              <div className="memory-node memory-node--project"><small>PROJECT / ENGINE</small><strong>SIRIUS</strong><span>SHARED METHOD</span></div>
            </div>
            <div className="proposal-list">
              <div className="proposal-card">
                <div><span>RELATED TO / 91%</span><strong>KITKAT MEMORY ↔ SIRIUS</strong><small>Shared reviewed-context contract</small></div>
                <div><button type="button">ACCEPT</button><button type="button">REJECT</button></div>
              </div>
              <div className="proposal-card">
                <div><span>INFORMED BY / 84%</span><strong>PROJECT ↔ MEDIA REFERENCE</strong><small>Metadata match; source remains untouched</small></div>
                <div><button type="button">ACCEPT</button><button type="button">REJECT</button></div>
              </div>
            </div>
            <div className="connection-foot"><span>MAX 24 CANDIDATES</span><span>SHA-256 PINNED</span><span>HUMAN APPROVAL</span></div>
          </div>
        </div>
      </section>

      <section className="section cleanup-section" id="cleanup">
        <div className="section-heading section-heading--compact">
          <span className="section-index">04</span>
          <div>
            <p>CREATIVE SOFTWARE MAKES ART. AND DEBRIS.</p>
            <h2>CLEAN THE CACHE.<br />KEEP THE WORK.</h2>
          </div>
        </div>

        <div className="cleanup-layout">
          <div className="cache-stack">
            {creativeApps.map((app, index) => (
              <div className="cache-item" key={app} style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{app}</strong>
                <i />
                <small>RECOGNIZED</small>
              </div>
            ))}
          </div>
          <div className="cleanup-copy">
            <div className="cleanup-stat">
              <span>SAFE CACHE</span>
              <strong>MOVE TO TRASH</strong>
              <p>Nothing is vaporized. Every approved cleanup creates an action record and a restoration route.</p>
            </div>
            <div className="cleanup-stat cleanup-stat--amber">
              <span>REVIEW FIRST</span>
              <strong>GENERATED MEDIA</strong>
              <p>Resolve CacheClip, recovery data, and application state stay behind an explicit second approval.</p>
            </div>
            <div className="restore-route">
              <span>INSPECT</span><i />
              <span>CONFIRM</span><i />
              <span>TRASH</span><i />
              <span>RESTORE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section safety-section" id="safety">
        <div className="safety-copy">
          <span className="section-index">05</span>
          <p>CONTROLLED CHAOS / HARD BOUNDARIES</p>
          <h2>CLEAN<br />WITHOUT<br /><span>REGRET.</span></h2>
        </div>
        <div className="safety-matrix">
          <div className="safety-cell safety-cell--safe">
            <span>SAFE</span>
            <strong>KNOWN CACHE PATHS</strong>
            <p>Selectable, inspectable, reversible.</p>
          </div>
          <div className="safety-cell safety-cell--review">
            <span>REVIEW</span>
            <strong>GENERATED MEDIA</strong>
            <p>Requires a deliberate second confirmation.</p>
          </div>
          <div className="safety-cell safety-cell--protected">
            <span>PROTECTED</span>
            <strong>PROJECTS + ASSETS</strong>
            <p>Cannot be selected. The strange idea survives.</p>
          </div>
          <div className="safety-cell safety-cell--history">
            <span>HISTORY</span>
            <strong>EVERY ACTION LOGGED</strong>
            <p>Restore never overwrites data an app recreated.</p>
          </div>
        </div>
      </section>

      <section className="quiet-section">
        <div className="quiet-label">BACKGROUND MODE / MEASURED</div>
        <div className="quiet-metrics">
          <div><strong>~0.03%</strong><span>SYSTEM-WIDE IDLE CPU</span></div>
          <div><strong>~116 MB</strong><span>SETTLED MEMORY</span></div>
          <div><strong>30 SEC</strong><span>ECO SAMPLE RATE</span></div>
          <div><strong>77 / 77</strong><span>TESTS PASSING</span></div>
        </div>
        <p>
          Detailed process inspection wakes only when you open the console. Sleep suspends monitoring.
          KITKAT stays in the menu bar, where backstage technicians belong.
        </p>
      </section>

      <section className="download-section">
        <div className="download-glow" aria-hidden="true" />
        <div className="kitkat-cameo" aria-hidden="true">
          <div className="kitkat-cameo__portrait">
            <img src={assetPath("/media/kitkat-character.jpg")} alt="" />
          </div>
          <div className="kitkat-cameo__tag">
            <span>CREW DOSSIER / LGG-KK7</span>
            <strong>BACKGROUND OPERATOR / ACTIVE</strong>
          </div>
        </div>
        <img src={assetPath("/media/kitkat-icon.png")} alt="" />
        <span>KITKAT MAC HEALTH / {version}</span>
        <h2>THE QUIETEST<br />MEMBER OF YOUR CREW.</h2>
        <p>Native. Local. Reversible. Slightly suspicious of unnecessary cache files.</p>
        <a className="button button--primary button--large" href={downloadURL}>
          <span>DOWNLOAD FOR MAC</span>
          <b>↓</b>
        </a>
        <a className="checksum-link" href={checksumURL}>
          SHA-256 CHECKSUM
        </a>
      </section>

      <footer>
        <div className="brand-lockup brand-lockup--footer">
          <img src={assetPath("/media/kitkat-icon.png")} alt="" />
          <span><strong>KITKAT</strong><small>MAC HEALTH</small></span>
        </div>
        <p>BUILT FOR CREATIVE MACS / PIX-7 DESIGN SYSTEM</p>
        <p>LOCAL BUILD / MACOS 15+ / ARM64</p>
      </footer>
    </main>
  );
}
