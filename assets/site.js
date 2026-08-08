/* Progressive enhancement only.
   With JS off the nav renders as a normal wrapping list, so nothing is lost. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var burger = document.querySelector(".burger");
  var nav = document.getElementById("primary-nav");
  if (!burger || !nav) return;

  var MOBILE = window.matchMedia("(max-width: 51.9375rem)");

  function setOpen(open) {
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      nav.setAttribute("data-open", "");
    } else {
      nav.removeAttribute("data-open");
    }
  }

  burger.hidden = false;
  setOpen(false);

  burger.addEventListener("click", function () {
    setOpen(burger.getAttribute("aria-expanded") !== "true");
  });

  // Close on Escape, and return focus to the button.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      burger.focus();
    }
  });

  // Close when a link is chosen.
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a") && MOBILE.matches) setOpen(false);
  });

  // Reset state when crossing the breakpoint.
  var onChange = function () { setOpen(false); };
  if (MOBILE.addEventListener) {
    MOBILE.addEventListener("change", onChange);
  } else if (MOBILE.addListener) {
    MOBILE.addListener(onChange);
  }
})();

/* ---- Heading anchors: progressive enhancement, ids derived from text ---- */
(function () {
  "use strict";
  var used = Object.create(null);
  var heads = document.querySelectorAll("main h2, main h3");
  for (var i = 0; i < heads.length; i++) {
    var h = heads[i];
    if (!h.textContent.trim()) continue;
    var id = h.id || h.textContent.trim().toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 48);
    if (!id) continue;
    if (used[id]) { id = id + "-" + (++used[id]); } else { used[id] = 1; }
    h.id = id;
    var a = document.createElement("a");
    a.className = "anchor";
    a.href = "#" + id;
    a.textContent = "#";
    a.setAttribute("aria-label", "Link to this section");
    h.appendChild(a);
  }
})();
