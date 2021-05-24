/*
 * This file is used to share the snippet injection code between PSClickWrap.js and PSBrowseWrap.js. It is mostly the same as the existing snippet code, only exception is the
 * PS.JS source location is paramaterized.
 */

function injectSnippet(scriptURL, backupScriptURL) {
	if (!window) return; // Support for SSR

	(function(w, d, s, c, f, n, t, g, a, b, l) {
		// Defines the global _ps object and initializes the _ps() function
		// that will queue commands until the PactSafe Library is ready.
		w.PactSafeObject = n;
		(w[n] = w[n] || function() {
				(w[n].q = w[n].q || []).push(arguments);
			}), (w[n].on = function() { // Defines the event functions for the global _ps object.
				(w[n].e = w[n].e || []).push(arguments);
			}), (w[n].once = function() {
				(w[n].eo = w[n].eo || []).push(arguments);
			}), (w[n].off = function() {
				(w[n].o = w[n].o || []).push(arguments);
			}), (w[n].t = 1 * new Date()), (w[n].l = 0); // Marks the time that the script is inserted.

		// Inserts a new script element to load the PactSafe Library JS file (ps.js).
		a = d.createElement(s);
		b = d.getElementsByTagName(s)[0];
		a.async = 1;
		a.src = c;

		// Marks that the script has started loading or failed to load.
		a.onload = a.onreadystatechange = function() {
			w[n].l = 1;
		};
		a.onerror = a.onabort = function() {
			w[n].l = 0;
		};

		// Insert the script tag to the DOM, n a testing context, no script tags exist so b is undefined.
		if (b) {
			b.parentNode.insertBefore(a, b);
		} else {
			document.body.appendChild(a);
		}

		// Retry loading the script from a fallback location after 4 seconds.
		setTimeout(() => {
			if (!w[n].l && !w[n].loaded) {
				w[n].error = 1;
				a = d.createElement(s);
				a.async = 1;
				a.src = f;
				a.onload = a.onreadystatechange = function() {
					w[n].l = 1;
				};
				a.onerror = a.onabort = function() {
					w[n].l = 0;
				};
				b.parentNode.insertBefore(a, b);

				// Log the loading error via beacon.
				l = function(u, e) {
					try {
						e = d.createElement("img");
						e.src = "https://d3r8bdci515tjv.cloudfront.net/error.gif?t=" + w[n].t + "&u=" + encodeURIComponent(u);
						d.getElementsByTagName("body")[0].appendChild(e);
					} catch (x) {}
				};
				l(c);

				// Call the optional error callback function after a second failed attempt.
				setTimeout(function() {
					if (!w[n].l && !w[n].loaded) {
						w[n].error = 1;
						if (g && "function" == typeof g) {
							g.call(this);
						}
						l(f);
					}
				}, t);
			}
		}, t);
	})(
		window,
		document,
		"script",
		scriptURL,
		backupScriptURL,
		"_ps",
		4000,
		function optionalErrorCallback() {
			console.log("Unable to load the PactSafe PS.JS Library.");
		}
	);
}

function isSnippetLoaded(psScriptURL) {
	const scripts = document.getElementsByTagName('script');
	if (window && window._ps && window._ps.loaded && window._ps.realThang === 317) return true;
    for (let i = 0; i < scripts.length; i += 1) {
      if (scripts[i].src.indexOf(psScriptURL) !== -1){
		return true;
	  }
	}
	return false;
}

module.exports = {
	injectSnippet,
	isSnippetLoaded
}
