// Polyfill Web Crypto APIs for insecure (HTTP) contexts where they're unavailable.
// Must be imported before keycloak-js since it uses crypto.randomUUID and
// crypto.subtle.digest (for PKCE S256) at init/login time.

if (!window.isSecureContext) {
  // crypto.randomUUID — needed for Keycloak state/nonce generation
  // @ts-expect-error -- no type declarations for this side-effect-only polyfill
  await import('@ungap/random-uuid')

  // crypto.subtle — needed for PKCE S256 challenge (SHA-256 digest)
  if (typeof crypto !== 'undefined' && typeof crypto.subtle === 'undefined') {
    const liner = await import('webcrypto-liner') as unknown as { crypto: Crypto }
    Object.defineProperty(crypto, 'subtle', {
      value: liner.crypto.subtle,
      configurable: true,
    })
  }
}
