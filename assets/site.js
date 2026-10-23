(function () {
  "use strict";

  // Theme toggle
  var themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("adv-theme", next); } catch (e) {}
      
      var hljsTheme = document.getElementById('hljs-theme');
      if (hljsTheme) {
        hljsTheme.href = next === "dark" 
          ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css' 
          : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css';
      }
    });
  }


// Toast notification
  function showToast(message) {
    var toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function(){ toast.className = "toast"; }, 2500);
  }
  window.showToast = showToast;

  // Mode toggle
  var modeBtn = document.getElementById("modeToggle");
  if (modeBtn) {
    // Initialize button icon based on current state
    var currentMode = document.documentElement.getAttribute("data-mode") || "concept";
    modeBtn.textContent = currentMode === "tech" ? "📖" : "🎓";
    
    modeBtn.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-mode") === "tech" ? "tech" : "concept";
      var next = current === "tech" ? "concept" : "tech";
      root.setAttribute("data-mode", next);
      try { localStorage.setItem("adv-mode", next); } catch (e) {}
      
      if (next === "tech") {
        modeBtn.textContent = "📖";
        showToast("Technical Notes Enabled");
      } else {
        modeBtn.textContent = "🎓";
        showToast("Intuitive Analogies Enabled");
      }
    });
  }

  // Mobile menu (chapters + on-page contents)
  var navToggle = document.getElementById("navToggle");
  var navPanel = document.getElementById("navPanel");
  if (navToggle && navPanel) {
    navToggle.addEventListener("click", function () {
      var isOpen = navPanel.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navPanel.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navPanel.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }


  // Highlight.js initialization
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  var hljsStyle = document.createElement('link');
  hljsStyle.rel = 'stylesheet';
  hljsStyle.id = 'hljs-theme';
  hljsStyle.href = isDark 
    ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css' 
    : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css';
  document.head.appendChild(hljsStyle);

  var hljsScript = document.createElement('script');
  hljsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
  hljsScript.onload = function() {
    // Also load python language explicitly if needed, but core includes it.
    hljs.highlightAll();
  };
  document.head.appendChild(hljsScript);

  // Universal Modal Logic
  var openModalBtns = document.querySelectorAll('.open-modal');
  var closeBtns = document.querySelectorAll('.close-modal');

  openModalBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = btn.getAttribute('data-target');
      if (targetId) {
        var modal = document.getElementById(targetId);
        if (modal) modal.style.display = 'block';
      }
    });
  });

  closeBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var modal = e.target.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });

  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Universal Expand/Collapse All Toolbar for .quiz-list and .drill-list
  document.querySelectorAll('.quiz-list, .drill-list').forEach(function(container) {
    var items = container.querySelectorAll('details');
    if (items.length < 2) return;
    
    var toolbar = document.createElement('div');
    toolbar.className = 'list-toggle-toolbar';
    toolbar.innerHTML = 
      '<button type="button" class="list-toggle-btn expand-btn" title="Expand all questions in this section">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>' +
        '<span>Expand All</span>' +
      '</button>' +
      '<button type="button" class="list-toggle-btn collapse-btn" title="Collapse all questions in this section">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>' +
        '<span>Collapse All</span>' +
      '</button>';
      
    container.parentNode.insertBefore(toolbar, container);
    
    toolbar.querySelector('.expand-btn').addEventListener('click', function() {
      container.querySelectorAll('details').forEach(function(d) {
        d.open = true;
        d.setAttribute('open', '');
      });
      showToast('All items expanded');
    });
    
    toolbar.querySelector('.collapse-btn').addEventListener('click', function() {
      container.querySelectorAll('details').forEach(function(d) {
        d.open = false;
        d.removeAttribute('open');
      });
      showToast('All items collapsed');
    });
  });

  // ==========================================================================
  // PREMIUM €1,500 COURSE EXPERIENCE ENGINE (2026 EDITION)
  // ==========================================================================

  // Reading Progress Bar
  var progressBar = document.createElement("div");
  progressBar.className = "reading-progress-bar";
  document.body.appendChild(progressBar);
  window.addEventListener("scroll", function () {
    var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + "%";
  }, { passive: true });

  // Universal Tabs Engine
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab-btn");
    if (!btn) return;
    var container = btn.closest(".tabs-container");
    if (!container) return;
    var targetId = btn.getAttribute("data-tab");
    if (!targetId) return;

    container.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
    container.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });

    btn.classList.add("active");
    var panel = container.querySelector("#" + targetId);
    if (panel) panel.classList.add("active");
  });

  // Universal Interactive Quiz Engine
  document.addEventListener("click", function (e) {
    var opt = e.target.closest(".quiz-opt");
    if (!opt) return;
    var widget = opt.closest(".quiz-widget");
    if (!widget) return;
    var isCorrect = opt.getAttribute("data-correct") === "true";
    var feedback = widget.querySelector(".quiz-feedback");

    widget.querySelectorAll(".quiz-opt").forEach(function (o) {
      o.classList.remove("correct", "wrong");
    });

    if (isCorrect) {
      opt.classList.add("correct");
      if (feedback) {
        feedback.className = "quiz-feedback show-correct";
        feedback.innerHTML = "<strong>✅ Correct!</strong> " + (opt.getAttribute("data-reason") || "Spot on! You mastered this architectural trade-off.");
      }
    } else {
      opt.classList.add("wrong");
      var correctOpt = widget.querySelector('.quiz-opt[data-correct="true"]');
      if (correctOpt) correctOpt.classList.add("correct");
      if (feedback) {
        feedback.className = "quiz-feedback show-wrong";
        feedback.innerHTML = "<strong>❌ Incorrect.</strong> " + (opt.getAttribute("data-reason") || "Review the trade-off and try again.");
      }
    }
  });

  // SimUDuck Strategy Pattern Simulator Engine
  var simRunBtn = document.getElementById("simRunBtn");
  var simSwapBtn = document.getElementById("simSwapBtn");
  var simConsole = document.getElementById("simConsole");
  if (simRunBtn && simConsole) {
    simRunBtn.addEventListener("click", function () {
      var duckSelect = document.getElementById("simDuckSelect");
      var flySelect = document.getElementById("simFlySelect");
      var quackSelect = document.getElementById("simQuackSelect");
      var duckType = duckSelect ? duckSelect.value : "MallardDuck";
      var flyType = flySelect ? flySelect.value : "FlyWithWings";
      var quackType = quackSelect ? quackSelect.value : "Quack";

      var logs = [];
      logs.push(">> Instantiating Duck: " + duckType);
      logs.push(">> Strategy Injected: flyBehavior = new " + flyType + "()");
      logs.push(">> Strategy Injected: quackBehavior = new " + quackType + "()");
      logs.push("------------------------------------------------------------------");
      logs.push("[DUCK DISPLAY]  " + getDuckDisplay(duckType));
      logs.push("[FLY EXECUTE]   " + getFlyExecution(flyType));
      logs.push("[QUACK EXECUTE] " + getQuackExecution(quackType));
      logs.push("------------------------------------------------------------------");
      logs.push(">> Result: Clean runtime delegation. Zero subclass coupling!");

      simConsole.textContent = logs.join("\n");
    });

    if (simSwapBtn) {
      simSwapBtn.addEventListener("click", function () {
        var flySelect = document.getElementById("simFlySelect");
        if (flySelect) flySelect.value = "FlyRocketPowered";
        var duckSelect = document.getElementById("simDuckSelect");
        var quackSelect = document.getElementById("simQuackSelect");
        var duckType = duckSelect ? duckSelect.value : "ModelDuck";
        var quackType = quackSelect ? quackSelect.value : "Quack";

        var logs = [];
        logs.push("⚡ [RUNTIME HOT-SWAP TRIGGERED]");
        logs.push(">> Executing: duck.setFlyBehavior(new FlyRocketPowered())");
        logs.push(">> Context pointer re-bound: Target algorithm switched dynamically!");
        logs.push("------------------------------------------------------------------");
        logs.push("[DUCK DISPLAY]  " + getDuckDisplay(duckType));
        logs.push("[FLY EXECUTE]   🚀 WHOOOOSH! Mach 3 Jet Rocket Thrusters Ignited!");
        logs.push("[QUACK EXECUTE] " + getQuackExecution(quackType));
        logs.push("------------------------------------------------------------------");
        logs.push(">> Architectural Takeaway: Changed behavior in-flight without re-compilation or inheritance!");

        simConsole.textContent = logs.join("\n");
      });
    }
  }

  function getDuckDisplay(type) {
    switch (type) {
      case "MallardDuck": return "🦆 I am a genuine wild Mallard Duck with green plumage.";
      case "RedheadDuck": return "🦆 I am a North American Redhead diving duck.";
      case "RubberDuck": return "🐤 I am a yellow bath Rubber Duck. Made of 100% silicone.";
      case "DecoyDuck": return "🪵 I am an ornamental wooden Decoy Duck.";
      case "ModelDuck": return "🤖 I am a cybernetic Model Prototype Duck.";
      default: return "🦆 Generic Duck instance.";
    }
  }
  function getFlyExecution(type) {
    switch (type) {
      case "FlyWithWings": return "🪽 Flapping biological wings... Gliding gracefully at 30 km/h!";
      case "FlyNoWay": return "🚫 << Silence >> Cannot fly. Grounded or floating peacefully.";
      case "FlyRocketPowered": return "🚀 WHOOOOSH! Rocket thruster ignited! Flying at Mach 3!";
      default: return "Flying behavior executed.";
    }
  }
  function getQuackExecution(type) {
    switch (type) {
      case "Quack": return "🔊 QUACK! QUACK! Loud resonant duck call.";
      case "Squeak": return "🔉 Squeeeak! High-pitched vinyl squeak sound.";
      case "MuteQuack": return "🔇 << Absolute Silence >> Cannot produce sound.";
      default: return "Quack behavior executed.";
    }
  }

  // Universal Code Copy Button
  document.querySelectorAll(".code-container").forEach(function (box) {
    var header = box.querySelector(".code-header");
    var code = box.querySelector("code");
    if (!header || !code) return;

    var copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "copy-btn";
    copyBtn.style.cssText = "background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:0.75rem;display:inline-flex;align-items:center;gap:0.3rem;";
    copyBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
    
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(code.innerText).then(function () {
        copyBtn.innerHTML = '✓ Copied!';
        setTimeout(function () {
          copyBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
        }, 2000);
      });
    });
    header.appendChild(copyBtn);
  });

  // ==========================================================================
  // LUXURY €1,500 STUDIO INTERACTIVE ENGINE
  // ==========================================================================
  var currentDuck = "MallardDuck";
  var currentFly = "FlyWithWings";
  var currentQuack = "Quack";

  function setupSegmentedControl(containerId, onChange) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.addEventListener("click", function (e) {
      var btn = e.target.closest(".seg-btn");
      if (!btn) return;
      container.querySelectorAll(".seg-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var val = btn.getAttribute("data-val");
      if (val && onChange) onChange(val);
    });
  }

  setupSegmentedControl("duckSegmented", function (val) {
    currentDuck = val;
    updateStudioStage();
  });
  setupSegmentedControl("flySegmented", function (val) {
    currentFly = val;
    updateStudioStage();
  });
  setupSegmentedControl("quackSegmented", function (val) {
    currentQuack = val;
    updateStudioStage();
  });

  function updateStudioStage() {
    var avatar = document.getElementById("duckAvatar");
    var title = document.getElementById("duckTitle");
    var sub = document.getElementById("duckSub");
    var flight = document.getElementById("flightTelemetry");
    var quack = document.getElementById("quackTelemetry");
    var mem = document.getElementById("memoryTelemetry");

    if (!avatar || !title) return;

    if (currentDuck === "MallardDuck") {
      avatar.textContent = "🦆";
      title.textContent = "Mallard Duck";
      sub.textContent = "Anas platyrhynchos · Natural Waterfowl";
      if (mem) mem.textContent = "Stateless Flyweight · 0B Heap";
    } else if (currentDuck === "RubberDuck") {
      avatar.textContent = "🐤";
      title.textContent = "Rubber Bath Duck";
      sub.textContent = "Silicone Inanimate · Bath Toy Context";
      if (mem) mem.textContent = "Lightweight Value Object";
    } else if (currentDuck === "DecoyDuck") {
      avatar.textContent = "🪵";
      title.textContent = "Wooden Decoy Duck";
      sub.textContent = "Hardwood Carving · Inert Context";
      if (mem) mem.textContent = "Zero Dynamic Overhead";
    } else if (currentDuck === "ModelDuck") {
      avatar.textContent = "🤖";
      title.textContent = "Cybernetic Drone Duck";
      sub.textContent = "Autonomous UAV Simulator · Prototype";
      if (mem) mem.textContent = "Embedded Controller Stack";
    }

    if (flight) {
      if (currentFly === "FlyWithWings") {
        flight.textContent = "🪽 Biological Wings · 35 km/h";
      } else if (currentFly === "FlyNoWay") {
        flight.textContent = "🚫 Grounded (Safe from Bugs)";
      } else if (currentFly === "FlyRocketPowered") {
        flight.textContent = "🚀 Jet Propulsion · Mach 3 Speed!";
      }
    }

    if (quack) {
      if (currentQuack === "Quack") {
        quack.textContent = "🔊 Natural Quack · 85 dB";
      } else if (currentQuack === "Squeak") {
        quack.textContent = "🔉 Vinyl Air Valve Squeak";
      } else if (currentQuack === "MuteQuack") {
        quack.textContent = "🔇 Absolute Silence · 0 dB";
      }
    }
  }

  var studioRunBtn = document.getElementById("studioRunBtn");
  var studioHotSwapBtn = document.getElementById("studioHotSwapBtn");
  var studioConsole = document.getElementById("studioConsole");

  if (studioRunBtn && studioConsole) {
    studioRunBtn.addEventListener("click", function () {
      var ts = new Date().toISOString().substring(11, 23);
      var logs = [
        "[" + ts + "] [DISPATCH] Invoking context.performFly() & context.performQuack()",
        "[" + ts + "] [VTABLE] Resolved pointer: " + currentDuck + " -> " + currentFly + "::fly()",
        "[" + ts + "] [OUTPUT] " + getFlyExecution(currentFly),
        "[" + ts + "] [VTABLE] Resolved pointer: " + currentDuck + " -> " + currentQuack + "::quack()",
        "[" + ts + "] [OUTPUT] " + getQuackExecution(currentQuack),
        "[" + ts + "] [STATUS] Polymorphic dispatch completed with 0 heap allocations."
      ];
      studioConsole.textContent = logs.join("\n");
      showToast("Dispatch Executed Successfully");
    });
  }

  if (studioHotSwapBtn && studioConsole) {
    studioHotSwapBtn.addEventListener("click", function () {
      currentFly = "FlyRocketPowered";
      var flySeg = document.getElementById("flySegmented");
      if (flySeg) {
        flySeg.querySelectorAll(".seg-btn").forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-val") === "FlyRocketPowered");
        });
      }
      updateStudioStage();
      var ts = new Date().toISOString().substring(11, 23);
      var logs = [
        "[" + ts + "] ⚡ [HOT-SWAP] Re-binding: context.setFlyBehavior(new FlyRocketPowered())",
        "[" + ts + "] [MUTATION] Pointer updated in memory at runtime!",
        "[" + ts + "] [OUTPUT] 🚀 WHOOOOSH! Jet Thrusters Ignited! Flying at Mach 3!",
        "[" + ts + "] [TAKEAWAY] Zero subclass re-compilation. Strategy swapped dynamically in-flight!"
      ];
      studioConsole.textContent = logs.join("\n");
      showToast("⚡ Hot-Swapped to Rocket Engine at Runtime!");
    });
  }

  // Cert Quiz Handler
  document.addEventListener("click", function (e) {
    var opt = e.target.closest(".cert-opt");
    if (!opt) return;
    var card = opt.closest(".cert-quiz-card");
    if (!card) return;
    var isCorrect = opt.getAttribute("data-correct") === "true";
    var feedback = card.querySelector(".cert-feedback");

    card.querySelectorAll(".cert-opt").forEach(function (o) {
      o.classList.remove("correct", "wrong");
    });

    if (isCorrect) {
      opt.classList.add("correct");
      if (feedback) {
        feedback.className = "cert-feedback show-correct";
        feedback.innerHTML = "<strong>✅ Correct Architecture Decision!</strong> " + (opt.getAttribute("data-reason") || "Spot-on! You demonstrated mastery of this design principle.");
      }
      showToast("🎉 Correct Answer!");
    } else {
      opt.classList.add("wrong");
      var correctOpt = card.querySelector('.cert-opt[data-correct="true"]');
      if (correctOpt) correctOpt.classList.add("correct");
      if (feedback) {
        feedback.className = "cert-feedback show-wrong";
        feedback.innerHTML = "<strong>❌ Architectural Trap!</strong> " + (opt.getAttribute("data-reason") || "Review the trade-off and try again.");
      }
    }
  });
})();

// ==========================================================================
// €1,500 MASTERCLASS SUITE: MOBILE DOCK, WIZARD, SMELL DRILL & PLAYGROUND
// ==========================================================================

// 1. Mobile Bottom Dock & Desktop Sidebar Intersection Observer
(function initNavigationObserver() {
  var dockItems = document.querySelectorAll(".dock-item");
  var sidebarLinks = document.querySelectorAll(".sidebar-toc a");
  if (!dockItems.length && !sidebarLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute("id");
        if (!id) return;

        dockItems.forEach(function (item) {
          var target = item.getAttribute("data-target-stage") || item.getAttribute("href");
          var matches = target === id || target === "#" + id;
          item.classList.toggle("active", matches);
        });

        sidebarLinks.forEach(function (link) {
          var target = link.getAttribute("data-target-stage") || link.getAttribute("href");
          var matches = target === id || target === "#" + id;
          link.classList.toggle("active", matches);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: "-10% 0px -70% 0px" });

  document.querySelectorAll(".stage-view, section.chapter").forEach(function (sec) {
    observer.observe(sec);
  });
})();

// 2. Pattern Decision Wizard Engine
(function initPatternWizard() {
  var wizard = document.getElementById("patternWizard");
  if (!wizard) return;

  var state = {
    scope: null,      // 'algorithm' | 'step' | 'state' | 'command'
    runtime: null,    // 'yes' | 'no'
    structure: null   // 'delegation' | 'inheritance'
  };

  wizard.addEventListener("click", function (e) {
    var card = e.target.closest(".wizard-opt-card");
    if (!card) return;

    var group = card.getAttribute("data-group");
    var val = card.getAttribute("data-val");

    card.parentNode.querySelectorAll(".wizard-opt-card").forEach(function (c) {
      c.classList.remove("selected");
    });
    card.classList.add("selected");
    state[group] = val;

    checkWizardCompletion();
  });

  function checkWizardCompletion() {
    if (!state.scope || !state.runtime) return;

    var resultBox = document.getElementById("wizardResult");
    if (!resultBox) return;

    var title = "Strategy Pattern (Policy)";
    var badge = "100% Match";
    var rationale = "You need to swap entire algorithms polymorphically at runtime via delegation.";
    var tradeOffs = "Flexibility: High (10/10) · Decoupling: High (9/10) · Memory Cost: O(1) pointer";
    var code = 
      "// Context chassis delegates to interface strategy\n" +
      "public class Context {\n" +
      "    private Strategy strategy;\n" +
      "    public void setStrategy(Strategy s) { this.strategy = s; }\n" +
      "    public void execute() { strategy.algorithm(); }\n" +
      "}";

    if (state.scope === "step") {
      title = "Template Method Pattern";
      badge = "98% Match";
      rationale = "You have an invariant algorithm skeleton and only need subclasses to override specific primitive steps.";
      tradeOffs = "Flexibility: Moderate (5/10) · Decoupling: Low (Inheritance coupling) · Runtime Cost: Zero dispatch overhead";
      code = 
        "public abstract class AlgorithmSkeleton {\n" +
        "    public final void templateMethod() { stepOne(); stepTwo(); }\n" +
        "    protected abstract void stepTwo(); // Subclass hook\n" +
        "}";
    } else if (state.scope === "state") {
      title = "State Pattern";
      badge = "96% Match";
      rationale = "Object behavior changes dynamically based on internal state transitions without explicit conditional logic.";
      tradeOffs = "Flexibility: High (9/10) · State Transition Coupling: Medium · Memory Cost: O(State Count)";
      code = 
        "public class StateContext {\n" +
        "    private State currentState;\n" +
        "    public void request() { currentState.handle(this); }\n" +
        "}";
    } else if (state.scope === "command") {
      title = "Command Pattern";
      badge = "95% Match";
      rationale = "You want to encapsulate method calls as standalone objects to support undo/redo, queuing, and macro dispatch.";
      tradeOffs = "Flexibility: High (9/10) · Decoupling: Exceptional · Storage Cost: Command queues";
      code = 
        "public interface Command { void execute(); void undo(); }";
    }

    resultBox.innerHTML = 
      "<div style='display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;'>" +
        "<h3 style='margin:0; font-size:1.35rem; color:#38BDF8; font-family:var(--font-display);'>🎯 Recommended: " + title + "</h3>" +
        "<span style='font-family:var(--font-mono); font-size:0.75rem; font-weight:800; background:rgba(56,189,248,0.15); color:#38BDF8; padding:0.25rem 0.65rem; border-radius:999px; border:1px solid rgba(56,189,248,0.3);'>" + badge + "</span>" +
      "</div>" +
      "<p style='font-size:0.95rem; line-height:1.6; color:var(--text); margin-bottom:1rem;'>" + rationale + "</p>" +
      "<div style='font-family:var(--font-mono); font-size:0.8rem; background:rgba(255,255,255,0.04); padding:0.6rem 0.85rem; border-radius:6px; border:1px solid var(--border); color:var(--accent-ink); margin-bottom:1.25rem;'>" + tradeOffs + "</div>" +
      "<pre style='background:var(--code-bg); padding:1rem; border-radius:8px; border:1px solid var(--border); font-family:var(--font-mono); font-size:0.82rem; overflow-x:auto; color:#F8FAFC;'><code>" + code + "</code></pre>";

    resultBox.className = "wizard-result-box show";
    showToast("Architectural Pattern Calculated");
  }
})();

// 3. Architectural Smell Drill Engine
(function initSmellDrills() {
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".smell-btn");
    if (!btn) return;
    var group = btn.closest(".smell-case-card");
    if (!group) return;

    var isCorrect = btn.getAttribute("data-correct") === "true";
    var feedback = group.querySelector(".smell-feedback-text");

    group.querySelectorAll(".smell-btn").forEach(function (b) {
      b.classList.remove("correct", "wrong");
    });

    if (isCorrect) {
      btn.classList.add("correct");
      if (feedback) {
        feedback.innerHTML = "<strong>✅ Diagnostic Correct!</strong> " + (btn.getAttribute("data-reason") || "Accurately diagnosed.");
        feedback.className = "smell-feedback-text show";
        feedback.style.borderColor = "var(--emerald)";
        feedback.style.color = "#34D399";
      }
      showToast("Diagnostic Confirmed!");
    } else {
      btn.classList.add("wrong");
      var correctBtn = group.querySelector('.smell-btn[data-correct="true"]');
      if (correctBtn) correctBtn.classList.add("correct");
      if (feedback) {
        feedback.innerHTML = "<strong>❌ Misdiagnosis.</strong> " + (btn.getAttribute("data-reason") || "Examine class coupling and LSP obligations.");
        feedback.className = "smell-feedback-text show";
        feedback.style.borderColor = "var(--rose)";
        feedback.style.color = "#F87171";
      }
    }
  });
})();

// 4. Algorithm Strategy Interactive Playground
(function initStrategyPlayground() {
  var playground = document.getElementById("strategyPlayground");
  if (!playground) return;

  var currentStrat = "QuickSort";
  var timeMeter = document.getElementById("stratTimeMeter");
  var spaceMeter = document.getElementById("stratSpaceMeter");
  var stabilityMeter = document.getElementById("stratStabilityMeter");
  var consoleOut = document.getElementById("stratConsole");

  playground.querySelectorAll(".strategy-pill-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      playground.querySelectorAll(".strategy-pill-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentStrat = btn.getAttribute("data-strat");
      updatePlaygroundState();
    });
  });

  var executeBtn = document.getElementById("stratExecBtn");
  if (executeBtn) {
    executeBtn.addEventListener("click", function () {
      executePlaygroundRun();
    });
  }

  function updatePlaygroundState() {
    var time = "O(N log N)";
    var space = "O(log N)";
    var stability = "Unstable";
    var note = "Pivot partitioning; cache-friendly in-place sorting.";

    if (currentStrat === "MergeSort") {
      time = "O(N log N)";
      space = "O(N)";
      stability = "Stable";
      note = "Divide-and-conquer; guarantees worst-case O(N log N) at memory trade-off.";
    } else if (currentStrat === "TimSort") {
      time = "O(N) best / O(N log N)";
      space = "O(N)";
      stability = "Stable";
      note = "Hybrid sort (Insertion + Merge); standard algorithm for Java & Python.";
    } else if (currentStrat === "HeapSort") {
      time = "O(N log N)";
      space = "O(1)";
      stability = "Unstable";
      note = "Binary heap selection; strictly O(1) auxiliary space.";
    }

    if (timeMeter) timeMeter.textContent = time;
    if (spaceMeter) spaceMeter.textContent = space;
    if (stabilityMeter) stabilityMeter.textContent = stability;

    if (consoleOut) {
      consoleOut.textContent = 
        ">> Dynamic Context Re-binding Triggered:\n" +
        ">> sorter.setStrategy(new " + currentStrat + "Strategy());\n" +
        ">> Ready to sort 50,000 dataset records.\n" +
        ">> Architectural Strategy Profile: " + note;
    }
    showToast("Strategy Swapped to " + currentStrat);
  }

  function executePlaygroundRun() {
    if (!consoleOut) return;
    var duration = (Math.random() * 8 + 4).toFixed(2);
    consoleOut.textContent = 
      ">> EXECUTING: sorter.sort(largeDataset)\n" +
      ">> Context Chassis: DatasetSorter<T> [State: INVARIANT]\n" +
      ">> Delegated To: " + currentStrat + "::sort(List<T>)\n" +
      ">> Execution Metrics: Processed 50,000 records in " + duration + " ms\n" +
      ">> Zero Modification to Context Source Code (OCP Compliant)";
    showToast("Executed " + currentStrat + " in " + duration + "ms");
  }
})();

// ==========================================================================
// €1,500 FOCUSED MASTERCLASS STAGE SYSTEM CONTROLLER
// ==========================================================================
(function initMasterclassStages() {
  var stageNav = document.querySelector(".masterclass-stage-nav");
  if (!stageNav) return;

  var pills = stageNav.querySelectorAll(".stage-pill");
  var stages = document.querySelectorAll(".stage-view");
  var modeBtn = document.getElementById("stageModeToggle");

  // Load user preference for view mode (default: focused)
  var isFocused = true;
  try {
    isFocused = localStorage.getItem("adv-stage-mode") !== "full";
  } catch (e) {}

  if (isFocused) {
    document.body.classList.add("mode-stage-focused");
    if (modeBtn) modeBtn.textContent = "📑 Focused Stage Mode";
  } else {
    document.body.classList.remove("mode-stage-focused");
    if (modeBtn) modeBtn.textContent = "📜 Full Document Mode";
  }

  if (modeBtn) {
    modeBtn.addEventListener("click", function () {
      var nowFocused = document.body.classList.toggle("mode-stage-focused");
      try { localStorage.setItem("adv-stage-mode", nowFocused ? "focused" : "full"); } catch (e) {}
      modeBtn.textContent = nowFocused ? "📑 Focused Stage Mode" : "📜 Full Document Mode";
      showToast(nowFocused ? "Focused Stage Mode Active (1 Stage at a time)" : "Full Document Mode Active (All stages visible)");
    });
  }

  // Handle stage pill clicks
  pills.forEach(function (pill) {
    pill.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = pill.getAttribute("data-stage");
      switchStage(targetId);
    });
  });

  // Handle "Next Stage" and "Prev Stage" action buttons
  document.addEventListener("click", function (e) {
    var jumpBtn = e.target.closest(".jump-stage-btn");
    if (!jumpBtn) return;
    var targetId = jumpBtn.getAttribute("data-target-stage");
    if (targetId) switchStage(targetId);
  });

  function switchStage(stageId) {
    pills.forEach(function (p) {
      p.classList.toggle("active", p.getAttribute("data-stage") === stageId);
    });

    stages.forEach(function (s) {
      s.classList.toggle("active", s.getAttribute("id") === stageId);
    });

    // Synchronize Mobile Bottom Dock navigation state
    var dockItems = document.querySelectorAll(".mobile-bottom-dock .dock-item");
    dockItems.forEach(function (di) {
      var target = di.getAttribute("data-target-stage");
      di.classList.toggle("active", target === stageId);
    });

    // Synchronize Sidebar Links
    var sidebarLinks = document.querySelectorAll(".sidebar .jump-stage-btn");
    sidebarLinks.forEach(function (sl) {
      var target = sl.getAttribute("data-target-stage");
      sl.classList.toggle("active", target === stageId);
    });

    // Reset scroll cleanly to the top of the newly displayed stage
    requestAnimationFrame(function () {
      var navBar = document.querySelector(".masterclass-stage-nav");
      var topNav = document.querySelector(".sitenav");
      if (document.body.classList.contains("mode-stage-focused") && navBar) {
        var topNavHeight = (topNav && window.getComputedStyle(topNav).display !== "none") ? topNav.offsetHeight : 0;
        var navBarTop = navBar.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: Math.max(0, navBarTop - topNavHeight), behavior: "smooth" });
      } else {
        var targetElement = document.getElementById(stageId);
        if (targetElement) {
          var headerOffset = window.innerWidth <= 900 ? 70 : 120;
          var elementPosition = targetElement.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: Math.max(0, offsetPosition), behavior: "smooth" });
        }
      }
    });
  }

  // ==========================================================================
  // INTERACTIVE 5-STEP STORY STEPPER
  // ==========================================================================
  var stepperBox = document.querySelector(".story-stepper-box");
  if (stepperBox) {
    var currentStep = 1;
    var totalSteps = 5;
    var stepNodes = stepperBox.querySelectorAll(".stepper-step-node");
    var slides = stepperBox.querySelectorAll(".stepper-slide");
    var prevBtn = stepperBox.querySelector(".btn-stepper-prev");
    var nextBtn = stepperBox.querySelector(".btn-stepper-next");

    function updateStepper(step, autoScroll) {
      currentStep = step;
      stepNodes.forEach(function (node) {
        var num = parseInt(node.getAttribute("data-step"), 10);
        node.classList.toggle("active", num === step);
        node.classList.toggle("completed", num < step);
      });

      slides.forEach(function (slide) {
        var num = parseInt(slide.getAttribute("data-step"), 10);
        slide.classList.toggle("active", num === step);
      });

      if (prevBtn) prevBtn.style.visibility = step === 1 ? "hidden" : "visible";
      if (nextBtn) {
        nextBtn.innerHTML = step === totalSteps 
          ? "Proceed to Stage 2: Architecture Blueprint →" 
          : "Next: Step " + (step + 1) + " →";
      }

      if (autoScroll) {
        var boxRect = stepperBox.getBoundingClientRect();
        if (boxRect.top < 70) {
          var headerOffset = 65;
          var targetScroll = window.pageYOffset + boxRect.top - headerOffset;
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
      }
    }

    stepNodes.forEach(function (node) {
      node.addEventListener("click", function () {
        var step = parseInt(node.getAttribute("data-step"), 10);
        updateStepper(step, true);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (currentStep > 1) updateStepper(currentStep - 1, true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (currentStep < totalSteps) {
          updateStepper(currentStep + 1, true);
        } else {
          switchStage("stage-2-architecture");
        }
      });
    }

    updateStepper(1);
  }

  // ==========================================================================
  // INTERACTIVE VECTOR UML INSPECTOR
  // ==========================================================================
  var umlNodes = document.querySelectorAll(".uml-interactive-node");
  var inspectorCard = document.getElementById("umlInspectorCard");

  var componentData = {
    "context": {
      title: "Context (The Stable Domain Chassis)",
      badge: "Maintains Interface Pointer",
      role: "Represents the primary domain class (e.g. Duck, PaymentGateway, DatasetSorter). Holds a reference to a Strategy interface. Completely closed for modification when new algorithms are invented.",
      principles: "Open-Closed Principle (OCP) & Dependency Inversion Principle (DIP).",
      code: "public abstract class Duck {\n    protected FlyBehavior flyBehavior; // Interface pointer!\n    public void performFly() { flyBehavior.fly(); } // Delegates!\n    public void setFlyBehavior(FlyBehavior fb) { this.flyBehavior = fb; }\n}"
    },
    "strategy": {
      title: "Strategy Interface (The Algorithmic Contract)",
      badge: "Polymorphic Abstraction",
      role: "Defines the common algorithm interface recognized by Context. Decouples the client context from the underlying implementation algorithms.",
      principles: "Program to an Interface, Not an Implementation.",
      code: "@FunctionalInterface\npublic interface FlyBehavior {\n    void fly(); // All concrete algorithms must fulfill this contract\n}"
    },
    "concreteA": {
      title: "ConcreteStrategyA (FlyWithWings)",
      badge: "Encapsulated Variant A",
      role: "Implements the standard biological wing flight algorithm. Fully encapsulates internal aerodynamic mathematics and properties without leaking to Duck.",
      principles: "Single Responsibility Principle (SRP).",
      code: "public class FlyWithWings implements FlyBehavior {\n    @Override\n    public void fly() {\n        System.out.println(\"Gliding through the air with biological wings!\");\n    }\n}"
    },
    "concreteB": {
      title: "ConcreteStrategyB (FlyNoWay)",
      badge: "Encapsulated Variant B",
      role: "Represents entities that cannot fly (Rubber Ducks, Decoys). Fulfills the interface contract safely without broken empty no-op methods inside Duck.",
      principles: "Liskov Substitution Principle (LSP Compliant).",
      code: "public class FlyNoWay implements FlyBehavior {\n    @Override\n    public void fly() {\n        System.out.println(\"<< Silence >> Grounded or floating peacefully.\");\n    }\n}"
    }
  };

  umlNodes.forEach(function (node) {
    node.addEventListener("click", function () {
      var compKey = node.getAttribute("data-component");
      var data = componentData[compKey];
      if (!data || !inspectorCard) return;

      umlNodes.forEach(function (n) { n.classList.remove("inspect-active"); });
      node.classList.add("inspect-active");

      inspectorCard.innerHTML = 
        "<div style='display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;'>" +
          "<h4 style='margin:0; font-size:1.15rem; color:#38BDF8; font-family:var(--font-display);'>" + data.title + "</h4>" +
          "<span style='font-family:var(--font-mono); font-size:0.72rem; font-weight:700; background:rgba(56,189,248,0.14); color:#38BDF8; padding:0.2rem 0.6rem; border-radius:999px;'>" + data.badge + "</span>" +
        "</div>" +
        "<p style='font-size:0.92rem; color:var(--text); line-height:1.6; margin-bottom:0.75rem;'>" + data.role + "</p>" +
        "<div style='font-size:0.84rem; color:var(--accent-ink); font-weight:600; margin-bottom:1rem;'>🏛️ Architectural Principle: " + data.principles + "</div>" +
        "<div class='ide-window' style='margin:0;'>" +
          "<div class='ide-header'>" +
            "<div class='ide-controls'><span class='ide-dot ide-dot-red'></span><span class='ide-dot ide-dot-yellow'></span><span class='ide-dot ide-dot-green'></span></div>" +
            "<div class='ide-tab'><svg class='ide-file-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path><polyline points='13 2 13 9 20 9'></polyline></svg><span>" + data.badge + ".java</span></div>" +
            "<button type='button' class='ide-copy-btn'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect><path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path></svg><span class='copy-text'>Copy</span></button>" +
          "</div>" +
          "<pre class='ide-code'><code>" + data.code + "</code></pre>" +
        "</div>";

      showToast("Inspecting " + data.title);
    });
  });

  // ==========================================================================
  // BEFORE & AFTER REFACTORING SWITCHER
  // ==========================================================================
  var baSeg = document.querySelector(".before-after-segmented");
  if (baSeg) {
    baSeg.addEventListener("click", function (e) {
      var btn = e.target.closest(".ba-seg-btn");
      if (!btn) return;
      var target = btn.getAttribute("data-view");

      baSeg.querySelectorAll(".ba-seg-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      document.querySelectorAll(".ba-panel").forEach(function (panel) {
        panel.classList.toggle("active", panel.getAttribute("id") === target);
      });
    });
  }

  // ==========================================================================
  // IDE CODE BLOCK CLIPBOARD COPYING
  // ==========================================================================
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".ide-copy-btn");
    if (!btn) return;
    var ideWindow = btn.closest(".ide-window");
    if (!ideWindow) return;
    var codeElem = ideWindow.querySelector("code");
    if (!codeElem) return;

    var text = codeElem.innerText;
    navigator.clipboard.writeText(text).then(function () {
      btn.classList.add("copied");
      var textSpan = btn.querySelector(".copy-text");
      var origText = textSpan ? textSpan.textContent : "Copy";
      if (textSpan) textSpan.textContent = "Copied!";
      showToast("Code copied to clipboard!");
      setTimeout(function () {
        btn.classList.remove("copied");
        if (textSpan) textSpan.textContent = origText;
      }, 2000);
    }).catch(function () {
      showToast("Press Ctrl+C to copy");
    });
  });

  // ==========================================================================
  // STAGE MASTERY PROGRESSION TRACKING
  // ==========================================================================
  (function initStageMastery() {
    var masteryBtns = document.querySelectorAll(".stage-mastery-btn");
    if (!masteryBtns.length) return;

    masteryBtns.forEach(function (btn) {
      var stageId = btn.getAttribute("data-stage");
      var isMastered = false;
      try {
        isMastered = localStorage.getItem("adv-mastery-" + stageId) === "true";
      } catch (e) {}
      if (isMastered) updateMasteryUI(btn, stageId, true);

      btn.addEventListener("click", function () {
        var current = btn.classList.contains("mastered");
        var nextState = !current;
        try {
          localStorage.setItem("adv-mastery-" + stageId, nextState ? "true" : "false");
        } catch (e) {}
        updateMasteryUI(btn, stageId, nextState);
        showToast(nextState ? "🎯 Stage marked as Mastered!" : "Stage status reset to In Progress");
      });
    });

    function updateMasteryUI(btn, stageId, state) {
      btn.classList.toggle("mastered", state);
      var icon = btn.querySelector(".mastery-check");
      var label = btn.querySelector(".mastery-label");
      if (icon) icon.textContent = state ? "✓" : "○";
      if (label) label.textContent = state ? "Mastered" : "Mark Mastered";

      // Also update top stage pill
      var pill = document.querySelector(".stage-pill[data-stage='" + stageId + "']");
      if (pill) {
        var existingBadge = pill.querySelector(".pill-check");
        if (state) {
          if (!existingBadge) {
            var b = document.createElement("span");
            b.className = "pill-check";
            b.style.cssText = "color:#10b981; font-weight:800; margin-left:2px;";
            b.textContent = "✓";
            pill.appendChild(b);
          }
        } else if (existingBadge) {
          existingBadge.remove();
        }
      }
    }
  })();

  // ==========================================================================
  // READING PROGRESS BAR SYNC
  // ==========================================================================
  window.addEventListener("scroll", function () {
    var bar = document.getElementById("readingProgressBar");
    if (!bar) return;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var pct = total > 0 ? (window.pageYOffset / total) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
  }, { passive: true });
})();

// ==========================================================================
// 8-PILLAR ARCHITECTURE BLUEPRINT COMMAND CENTER
// ==========================================================================
(function initBlueprintSuite() {
  var suite = document.getElementById("blueprintSuite");
  if (!suite) return;

  var tabBtns = suite.querySelectorAll(".pillar-tab-btn");
  var panes = suite.querySelectorAll(".pillar-pane");
  var explorerBtn = document.getElementById("btnViewExplorer");
  var matrixBtn = document.getElementById("btnViewMatrix");
  var pillsBar = document.getElementById("blueprintPillsBar");
  var contentArea = document.getElementById("blueprintContentArea");
  var matrixArea = document.getElementById("blueprintMatrixArea");
  var collapseBtn = document.getElementById("btnCollapseBlueprint");
  var collBody = document.getElementById("blueprintCollapsibleBody");

  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pillarId = btn.getAttribute("data-pillar");
      selectPillar(pillarId);
    });
  });

  function selectPillar(pillarId) {
    tabBtns.forEach(function (b) {
      var match = b.getAttribute("data-pillar") === pillarId;
      b.classList.toggle("active", match);
      b.setAttribute("aria-selected", match ? "true" : "false");
    });
    panes.forEach(function (p) {
      p.classList.toggle("active", p.getAttribute("id") === "pane-" + pillarId);
    });
  }

  function setView(view) {
    if (view === "matrix") {
      if (explorerBtn) explorerBtn.classList.remove("active");
      if (matrixBtn) matrixBtn.classList.add("active");
      if (pillsBar) pillsBar.style.display = "none";
      if (contentArea) contentArea.style.display = "none";
      if (matrixArea) matrixArea.style.display = "block";
    } else {
      if (explorerBtn) explorerBtn.classList.add("active");
      if (matrixBtn) matrixBtn.classList.remove("active");
      if (pillsBar) pillsBar.style.display = "flex";
      if (contentArea) contentArea.style.display = "block";
      if (matrixArea) matrixArea.style.display = "none";
    }
  }

  var _lastCollapseTime = 0;
  function toggleCollapse(forceState) {
    var now = Date.now();
    if (typeof forceState !== "boolean" && now - _lastCollapseTime < 250) {
      return; // Debounce guard against double execution
    }
    _lastCollapseTime = now;

    var isCurrentlyCollapsed = suite.classList.contains("is-collapsed");
    var willCollapse = (typeof forceState === "boolean") ? forceState : !isCurrentlyCollapsed;
    var hint = document.getElementById("blueprintCollapsedHint");

    if (willCollapse) {
      suite.classList.add("is-collapsed");
      if (collBody) collBody.style.display = "none";
      if (hint) hint.style.display = "flex";
    } else {
      suite.classList.remove("is-collapsed");
      if (collBody) collBody.style.display = "block";
      if (hint) hint.style.display = "none";
    }

    if (collapseBtn) {
      var icon = collapseBtn.querySelector(".collapse-icon");
      var label = collapseBtn.querySelector(".collapse-label");
      if (willCollapse) {
        if (icon) icon.textContent = "▼";
        if (label) label.textContent = "Expand Rubric";
        collapseBtn.setAttribute("aria-expanded", "false");
        collapseBtn.title = "Expand the 8-Pillar Architecture Rubric";
      } else {
        if (icon) icon.textContent = "▲";
        if (label) label.textContent = "Collapse Rubric";
        collapseBtn.setAttribute("aria-expanded", "true");
        collapseBtn.title = "Collapse the 8-Pillar Architecture Rubric";
      }
    }
  }

  if (explorerBtn) explorerBtn.addEventListener("click", function () { setView("explorer"); });
  if (matrixBtn) matrixBtn.addEventListener("click", function () { setView("matrix"); });

  // Sidebar blueprint trigger listener
  var sidebarTrigger = document.getElementById("sidebarBlueprintBtn");
  if (sidebarTrigger) {
    sidebarTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      toggleCollapse(false);
      suite.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  window.selectPillar = selectPillar;
  window.setBlueprintView = setView;
  window.toggleBlueprintCollapse = toggleCollapse;
})();
