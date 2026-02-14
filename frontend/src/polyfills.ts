// Polyfill Web Crypto APIs for insecure (HTTP) contexts where they're unavailable.
// Must be imported before keycloak-js since it uses crypto.randomUUID and
// crypto.subtle.digest (for PKCE S256) at init/login time.

if (!window.isSecureContext) {
  // crypto.randomUUID — needed for Keycloak state/nonce generation.
  // Can't use @ungap/random-uuid here because Vite's CJS-to-ESM transform
  // scopes its `var crypto` locally, so it polyfills the wrong object.
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'undefined') {
    // https://stackoverflow.com/a/2117523 (CC BY-SA 4.0)
    crypto.randomUUID = () =>
      ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16),
      ) as ReturnType<Crypto['randomUUID']>
  }

  // crypto.subtle — needed for PKCE S256 challenge (SHA-256 digest)
  if (typeof crypto !== 'undefined' && typeof crypto.subtle === 'undefined') {
    const liner = await import('webcrypto-liner') as unknown as { crypto: Crypto }
    Object.defineProperty(crypto, 'subtle', {
      value: liner.crypto.subtle,
      configurable: true,
    })
  }
}
