// Globally patch window.fetch to auto-refresh on 401/403 and retry once.
// Zero changes to the rest of your code.

export function setupAutoRefresh() {
  const origFetch = window.fetch;
  let refreshPromise = null;

  function isAuthPath(input) {
    try {
      const url = typeof input === 'string' ? input : input?.url || '';
      return url.startsWith('/api/auth/');
    } catch { return false; }
  }

  async function startRefresh() {
    if (!refreshPromise) {
      refreshPromise = origFetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      }).finally(() => { refreshPromise = null; });
    }
    return refreshPromise;
  }

  window.fetch = async function patchedFetch(input, init = {}) {
    // Always include cookies
    const opts = { ...init, credentials: 'include' };

    // Don’t try to refresh for auth endpoints themselves (signin/signup/refresh/signout)
    if (isAuthPath(input)) {
      return origFetch(input, opts);
    }

    // If a refresh is already happening, wait (prevents a burst of 401/403s)
    if (refreshPromise) {
      try { await refreshPromise; } catch {}
    }

    let res = await origFetch(input, opts);

    // Some Spring setups use 401, others 403 for unauthenticated
    const needsRefresh = (res.status === 401 || res.status === 403);
    const alreadyRetried = opts._retried;

    if (!needsRefresh || alreadyRetried) {
      return res;
    }

    // Try to refresh, then retry once
    const r = await startRefresh();
    if (!r || !r.ok) return res;

    return origFetch(input, { ...opts, _retried: true });
  };
}
