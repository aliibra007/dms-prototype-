# Password Reset via Phone Number – Product Requirements Document (PRD)

## 1. **Overview**
This document describes the requirements for implementing a **phone-based password reset flow**. Instead of sending a reset link via email, the system will send an **SMS verification code** to the user’s registered phone number. Upon successful code verification, the user will be allowed to set a new password, followed by a success confirmation screen.

---

## 2. **Goals & Objectives**
- Provide users with a secure and fast way to reset their password using their **phone number**.
- Enhance account recovery options beyond email.
- Increase user trust and improve accessibility.

---

## 3. **User Flow**
1. **User selects “Forgot password?”**
2. User is redirected to a screen requesting their **phone number**.
3. User enters phone number and taps **“Send code”**.
4. System sends an **SMS verification code** to the provided number.
5. User enters the received code.
6. If code is valid, the user is redirected to the **Set New Password** screen.
7. User enters and confirms the new password.
8. User sees a **success message** and is prompted to log in.

---

## 4. **Functional Requirements**

### 4.1 Phone Number Input Screen
- A field to input phone number.
- Button: **Send code**.
- Validation:
  - Phone number must match allowed formats.
  - Error shown if number is not associated with an account.

### 4.2 SMS Code Sending
- System generates a **random 6-digit numeric code**.
- SMS is sent to the user via an SMS provider.
- Code is valid for **5 minutes**.
- Code attempts limit: **5 attempts per reset session**.

### 4.3 Code Verification Screen
- Input field for the 6-digit code.
- Button: **Verify code**.
- Validations:
  - Incorrect code → Show error.
  - Expired code → Prompt to resend.
- Link: **Resend code** (max 3 resends).

### 4.4 Set New Password Screen
- Two input fields:
  - New password
  - Confirm new password
- Password must meet requirements:
  - At least 8 characters
  - Contains at least 1 special character
- Button: **Reset password**.
- Error if:
  - Passwords don’t match
  - Password doesn’t meet rules
  - Password matches previous password

### 4.5 Success Screen
- Message: **“Your password has been reset successfully.”**
- Button: **Back to log in**.

---

## 5. **Non‑Functional Requirements**
- **Security**:
  - SMS codes must be single-use and time-limited.
  - Rate limiting on attempts to prevent brute-force attacks.
  - All password operations must be encrypted.
- **Performance**:
  - SMS should be delivered within 5 seconds (provider-dependent).
  - UI screens must load within 2 seconds.
- **Compliance**:
  - Must follow data protection and privacy regulations.

---

## 6. **Edge Cases & Errors**
- User enters a phone number not registered → Show “No account found”.
- User enters wrong code too many times → Lock flow for 10 minutes.
- SMS not received → Allow resend with limit.
- Password reset token/session expires → User must restart flow.

---

## 7. **Success Metrics**
- Increased password recovery success rate.
- Reduced support tickets about login issues.
- Low failure rate in SMS delivery.

---

## 8. **Screens Included**
- Forgot password – phone number entry
- Enter SMS verification code
- Set new password
- Success message

---

## 9. **Dependencies**
- SMS provider (e.g., Twilio, Nexmo)
- Backend user authentication service

---

## 10. **Future Enhancements**
- Option to choose between email or SMS recovery.
- Add 2FA integration.
- Add voice call fallback for SMS failures.

---

**End of Document**

