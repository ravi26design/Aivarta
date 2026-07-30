/* Shared marketing header + footer injected into pages.
   Usage: <div data-header="pricing"></div>  and  <div data-footer></div>  */
(function () {
  // --- Demo auth gate: Select Plan opens Login first when signed out ---
  window.aivartaSelectPlan = function (type) {
    if (localStorage.getItem('aivarta_loggedin') === '1') {
      // Plan chosen (step 1 done) → go straight to step 2 (Upload Knowledge / Documents).
      location.href = type === 'voice' ? 'agent-voice-number.html' : 'onboard-upload.html';
      return false;
    }
    // Not logged in — remember this page, then send to login. We come back here afterwards.
    try {
      localStorage.setItem('aivarta_next', (location.pathname.split('/').pop() || 'pricing.html') + location.search);
    } catch (e) {}
    location.href = 'auth-login.html';
    return false;
  };

  // Opening login from a normal link (e.g. header) — remember this page so we return after login.
  window.aivartaOpenLogin = function () {
    try {
      localStorage.setItem('aivarta_next', (location.pathname.split('/').pop() || 'home.html') + location.search);
    } catch (e) {}
    location.href = 'auth-login.html';
    return false;
  };

  function isLoggedIn() {
    try { return localStorage.getItem('aivarta_loggedin') === '1'; } catch (e) { return false; }
  }

  const ICON = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5l4-1 2 5-3 2a12 12 0 006 6l2-3 5 2-1 4a2 2 0 01-2 2A16 16 0 013 7a2 2 0 011-2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'
  };

  function header(active, light) {
    const a = (id, label, href) =>
      `<a href="${href}"${active === id ? ' class="active"' : ''}>${label}</a>`;
    const authed = isLoggedIn();
    const cta = authed
      ? `<a class="profile" href="agents.html">
           <span class="pav"><img src="assets/user.png" alt=""></span>
           <span class="pname">John Doe</span>
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
         </a>`
      : `<a class="btn-grad sm" href="auth-login.html" onclick="return aivartaOpenLogin()">Login</a>`;
    return `
    <header class="site-header${light ? ' on-light' : ''}">
      <a class="logo" href="home.html">AI VARTA</a>
      <nav>
        ${a('home', 'Home', 'home.html')}
        ${authed ? '<a href="agents.html">My Agents</a><a href="leads.html">Leads</a><a href="chatlog.html">Chat-logs</a>' : ''}
        ${a('pricing', 'Pricing', 'pricing.html')}
        ${a('contact', 'Contact', 'contact.html')}
      </nav>
      ${cta}
    </header>`;
  }

  function footer() {
    return `
    <footer class="site-footer">
      <div class="footer-cols">
        <div class="footer-col">
          <div class="head">Company</div>
          <div class="links">
            <a href="home.html">Home</a>
            <a href="pricing.html">Pricing </a>
            <a href="contact.html">Contact</a>
            <a href="privacy.html">Privacy Policy</a>
            <a href="refund.html">Refund Policy</a>
            <a href="terms.html">Terms and Conditions</a>
          </div>
        </div>
        <div class="footer-col">
          <div class="head">Contact</div>
          <div class="links">
            <div class="footer-row">
              <span class="ic">${ICON.pin}</span>
              <div class="muted-14"><b>Technopark, IIT Kanpur</b><br>Indian Institute of Technology Kanpur, 401, 4th Floor, TechnoPark, National Aerosol Facility, Kanpur, Uttar Pradesh 208016</div>
            </div>
            <div class="footer-row" style="align-items:center">
              <span class="ic">${ICON.phone}</span><div class="muted-14">+91 9935274672</div>
            </div>
            <div class="footer-row" style="align-items:center">
              <span class="ic">${ICON.mail}</span><div class="muted-14">info@skyaitechnologies.com</div>
            </div>
          </div>
        </div>
        <div class="footer-col">
          <div class="head">Find us on</div>
          <div class="links">
            <p>LinkedIn</p><p>Instagram</p><p>Facebook</p><p>YouTube</p>
            <p>© 2025 SKYAI. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>`;
  }

  function appHeader(active) {
    const a = (id, label, href) =>
      `<a href="${href}"${active === id ? ' class="active"' : ''}>${label}</a>`;
    return `
    <header class="app-header">
      <a class="logo" href="home.html">AI VARTA</a>
      <nav class="app-nav">
        ${a('home', 'Home', 'home.html')}
        ${a('agents', 'My Agents', 'agents.html')}
        ${a('leads', 'Leads', 'leads.html')}
        ${a('chatlogs', 'Chat-logs', 'chatlog.html')}
        ${a('pricing', 'Pricing', 'pricing.html')}
        ${a('contact', 'Contact', 'contact.html')}
      </nav>
      <a class="profile" href="profile.html">
        <span class="pav"><img src="assets/user.png" alt=""></span>
        <span class="pname">John Doe</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </a>
    </header>`;
  }

  const STEPS = [
    ['Choose Plan & Pay', 'onboard-choose-plan.html'],
    ['Upload Documents', 'onboard-upload.html'],
    ['Customize Chatbot', 'onboard-customize.html'],
    ['Generate Widget', 'onboard-widget.html'],
    ['Integrate Chatbot', 'onboard-integrate.html']
  ];
  function steps(green, current) {
    green = parseInt(green || '0', 10);
    current = parseInt(current || '0', 10);
    return STEPS.map((s, i) => {
      const n = i + 1;
      let c = '';
      if (n <= green) c = ' done';
      else if (n === current) c = ' current';
      return `<a class="step${c}" href="${s[1]}"><span class="num">${n}</span><span class="lbl">${s[0]}</span></a>`;
    }).join('');
  }

  const DTABS = [
    ['Your Plan', 'dash-plan.html'],
    ['Upload Documents', 'dash-upload.html'],
    ['Customize Chatbot', 'dash-customize.html'],
    ['Generate Widget', 'dash-widget.html'],
    ['Integrate Chatbot', 'dash-integrate.html']
  ];
  function dsteps(current) {
    current = parseInt(current || '0', 10);
    return DTABS.map((s, i) => {
      const n = i + 1;
      const c = n === current ? ' current' : ' done';
      return `<a class="step${c}" href="${s[1]}"><span class="num">${n}</span><span class="lbl">${s[0]}</span></a>`;
    }).join('');
  }

  const SET_ICONS = {
    profile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>',
    plans: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16.5l9 5 9-5"/></svg>',
    subs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 8h6M9 8c3 0 4 2 4 4s-1 4-4 4M9 12h6M10 16l4-4"/></svg>',
    pass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a5 5 0 015 5c0 2-1 3-2 4l-9 9H3v-3l9-9M14 6l4 4"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 12H3m0 0l4-4m-4 4l4 4M13 4h6a1 1 0 011 1v14a1 1 0 01-1 1h-6"/></svg>'
  };
  function settingsSidebar(active) {
    const it = (id, label, href, icon) =>
      `<a class="set-item${active === id ? ' active' : ''}" href="${href}"><span class="si">${icon}</span>${label}</a>`;
    return `
      <div class="set-top"><a href="home.html" style="color:inherit"><b>AI VARTA</b></a><span class="sec">Profile</span></div>
      <div class="set-side">
        ${it('profile', 'My Profile', 'profile.html', SET_ICONS.profile)}
        ${it('plans', 'Active Plans', 'active-plans.html', SET_ICONS.plans)}
        ${it('subs', 'Subscriptions', 'subscriptions.html', SET_ICONS.subs)}
        ${it('pass', 'Change Password', 'change-password.html', SET_ICONS.pass)}
        <a class="set-item" href="home.html" onclick="localStorage.removeItem('aivarta_loggedin')"><span class="si">${SET_ICONS.logout}</span>Logout</a>
      </div>`;
  }

  const VSTEPS = [
    ['Choose Plan', 'agent-voice-plan.html'],
    ['Choose a Number', 'agent-voice-number.html'],
    ['Upload Knowledge', 'agent-voice-upload.html'],
    ['Configure Voice', 'agent-voice.html'],
    ['Go Live', 'agents.html']
  ];
  function vsteps(green, current) {
    green = parseInt(green || '0', 10);
    current = parseInt(current || '0', 10);
    return VSTEPS.map((s, i) => {
      const n = i + 1;
      let c = '';
      if (n <= green) c = ' done';
      else if (n === current) c = ' current';
      return `<a class="step${c}" href="${s[1]}"><span class="num">${n}</span><span class="lbl">${s[0]}</span></a>`;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-vsteps]').forEach(el => {
      const wrap = document.createElement('div');
      wrap.className = 'steps';
      wrap.innerHTML = vsteps(el.getAttribute('data-green'), el.getAttribute('data-current'));
      el.replaceWith(wrap);
    });
    document.querySelectorAll('[data-settings]').forEach(el => {
      const wrap = document.createElement('div');
      wrap.style.display = 'contents';
      wrap.innerHTML = settingsSidebar(el.getAttribute('data-settings'));
      el.replaceWith(wrap);
    });
    document.querySelectorAll('[data-dsteps]').forEach(el => {
      const wrap = document.createElement('div');
      wrap.className = 'steps';
      wrap.innerHTML = dsteps(el.getAttribute('data-current'));
      el.replaceWith(wrap);
    });
    document.querySelectorAll('[data-appheader]').forEach(el => {
      el.outerHTML = appHeader(el.getAttribute('data-appheader'));
    });
    document.querySelectorAll('[data-steps]').forEach(el => {
      const wrap = document.createElement('div');
      wrap.className = 'steps';
      wrap.innerHTML = steps(el.getAttribute('data-green'), el.getAttribute('data-current'));
      el.replaceWith(wrap);
    });
    document.querySelectorAll('[data-header]').forEach(el => {
      el.outerHTML = header(el.getAttribute('data-header'), el.hasAttribute('data-light'));
    });
    document.querySelectorAll('[data-footer]').forEach(el => { el.outerHTML = footer(); });

    document.querySelectorAll('.acc .acc-head').forEach(h => {
      h.addEventListener('click', () => h.closest('.acc').classList.toggle('open'));
    });
  });
})();
