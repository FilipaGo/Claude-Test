import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

// ─── Design system tokens ───────────────────────────────────────────────────
// Mapped from Simple Design System variables (Color + Size collections).
// States follow the DS: Default → Hover → Pressed → Disabled.
// Focus is not defined in the DS; ring style is added here for accessibility.
const tokens = {
  color: {
    // Backgrounds
    backgroundDefault:       '#FFFFFF',
    backgroundBrand:         '#1C1C1E',   // Background/Brand/Default
    backgroundBrandHover:    '#3A3A3C',   // Background/Brand/Hover  (slightly lighter)
    backgroundBrandPressed:  '#000000',   // Background/Brand/Pressed (deeper)
    backgroundBrandDisabled: '#9CA3AF',   // Background/Disabled
    backgroundNeutral:       '#F5F5F5',   // Neutral resting fill
    backgroundNeutralHover:  '#E9EAEB',   // Neutral hover fill
    backgroundNeutralPressed:'#D1D5DB',   // Neutral pressed fill
    // Text
    textDefault:   '#111827',   // Text/Default/Default
    textSecondary: '#6B7280',   // Text/Default/Secondary
    textTertiary:  '#9CA3AF',   // Text/Default/Tertiary
    textBrand:     '#1C1C1E',   // Text/Brand/Default
    textOnBrand:   '#FFFFFF',   // Text/Brand/On Brand
    textDisabled:  '#9CA3AF',   // Text/Disabled/Default
    textLink:      '#1C1C1E',   // Text/Brand/Default — matches DS Text Link component
    // Borders
    borderDefault: '#E5E7EB',   // Border/Default/Default
    borderNeutral: '#D1D5DB',
    borderFocus:   '#1C1C1E',   // brand color reused for focus ring (not in DS)
    borderError:   '#EF4444',
  },
  spacing: {
    xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48,
  },
  radius: {
    sm: 4, md: 8, lg: 12, full: 9999,
  },
  font: {
    sizeHeading:   24,
    sizeBody:      16,
    sizeBodySmall: 14,
    weightRegular:  '400' as const,
    weightSemiBold: '600' as const,
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
// Pressable `style` prop can accept a function — gives us hovered + pressed
// for free on web without any extra event wiring.
type PressState = { pressed: boolean; hovered?: boolean };

// ─── Component ───────────────────────────────────────────────────────────────
export default function LoginScreen() {
  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [rememberMe,      setRememberMe]      = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused,    setEmailFocused]    = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={tokens.color.backgroundDefault} />
      <ScrollView
        contentContainerStyle={styles.scrollOuter}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollContent}>

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>A</Text>
            </View>
          </View>

          {/* ── Headline ─────────────────────────────────────────────────── */}
          <View style={styles.headlineSection}>
            <Text style={styles.heading}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          {/* ── Social login ─────────────────────────────────────────────── */}
          <View style={styles.socialSection}>
            {/* Primary — Apple */}
            <Pressable style={({ pressed, hovered }: PressState) => [
              styles.btnPrimary,
              hovered  && styles.btnPrimaryHover,
              pressed  && styles.btnPrimaryPressed,
            ]}>
              {({ pressed, hovered }: PressState) => (
                <Text style={[
                  styles.btnPrimaryLabel,
                  (hovered || pressed) && styles.btnPrimaryLabelActive,
                ]}>Sign in with Apple</Text>
              )}
            </Pressable>

            {/* Neutral — Google */}
            <Pressable style={({ pressed, hovered }: PressState) => [
              styles.btnNeutral,
              hovered && styles.btnNeutralHover,
              pressed && styles.btnNeutralPressed,
            ]}>
              {({ pressed, hovered }: PressState) => (
                <Text style={[
                  styles.btnNeutralLabel,
                  (hovered || pressed) && styles.btnNeutralLabelActive,
                ]}>Sign in with Google</Text>
              )}
            </Pressable>
          </View>

          {/* ── Divider ──────────────────────────────────────────────────── */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* ── Form fields ──────────────────────────────────────────────── */}
          <View style={styles.formSection}>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, emailFocused && styles.inputFocused]}
                placeholder="Enter your email address"
                placeholderTextColor={tokens.color.textTertiary}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              {/* Focus ring lives on the container so it wraps the toggle too */}
              <View style={[
                styles.passwordContainer,
                passwordFocused && styles.passwordContainerFocused,
              ]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor={tokens.color.textTertiary}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                />
                <Pressable
                  style={({ pressed, hovered }: PressState) => [
                    styles.passwordToggle,
                    (hovered || pressed) && styles.passwordToggleActive,
                  ]}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.passwordToggleText}>
                    {passwordVisible ? 'Hide' : 'Show'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* ── Remember me + Forgot password ────────────────────────────── */}
          <View style={styles.rememberRow}>
            <Pressable
              style={({ pressed, hovered }: PressState) => [
                styles.checkboxRow,
                (hovered || pressed) && styles.checkboxRowActive,
              ]}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberLabel}>Remember me</Text>
            </Pressable>

            <Pressable style={({ pressed, hovered }: PressState) => [
              styles.forgotLinkWrapper,
              (hovered || pressed) && styles.forgotLinkWrapperActive,
            ]}>
              <Text style={styles.forgotLink}>Forgot password?</Text>
            </Pressable>
          </View>

          {/* ── Sign In CTA ───────────────────────────────────────────────── */}
          <Pressable style={({ pressed, hovered }: PressState) => [
            styles.btnPrimary,
            hovered && styles.btnPrimaryHover,
            pressed && styles.btnPrimaryPressed,
          ]}>
            {({ pressed, hovered }: PressState) => (
              <Text style={[
                styles.btnPrimaryLabel,
                (hovered || pressed) && styles.btnPrimaryLabelActive,
              ]}>Sign In</Text>
            )}
          </Pressable>

          {/* ── Sign Up link ──────────────────────────────────────────────── */}
          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Pressable style={({ pressed, hovered }: PressState) => [
              styles.signUpLinkWrapper,
              (hovered || pressed) && styles.signUpLinkWrapperActive,
            ]}>
              {({ pressed, hovered }: PressState) => (
                <Text style={[
                  styles.signUpLink,
                  (hovered || pressed) && styles.signUpLinkActive,
                ]}>Sign up</Text>
              )}
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const webCursor = Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : {};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: tokens.color.backgroundDefault,
  },
  scrollOuter: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: tokens.color.backgroundDefault,
  },
  scrollContent: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: tokens.spacing.xl,
    paddingTop: tokens.spacing.xl,
    paddingBottom: tokens.spacing.xxxl,
    gap: tokens.spacing.xl,
  },

  // ── Logo ────────────────────────────────────────────────────────────────────
  logoSection: {
    alignItems: 'center',
    paddingVertical: tokens.spacing.sm,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.color.backgroundBrand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: tokens.color.textOnBrand,
    fontSize: 28,
    fontWeight: tokens.font.weightSemiBold,
  },

  // ── Headline ─────────────────────────────────────────────────────────────────
  headlineSection: {
    gap: tokens.spacing.xs,
  },
  heading: {
    fontSize: tokens.font.sizeHeading,
    fontWeight: tokens.font.weightSemiBold,
    color: tokens.color.textDefault,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: tokens.font.sizeBody,
    fontWeight: tokens.font.weightRegular,
    color: tokens.color.textSecondary,
    lineHeight: 24,
  },

  // ── Buttons — Primary (DS: Default / Hover / Pressed / Disabled) ─────────────
  socialSection: {
    gap: tokens.spacing.md,
  },
  btnPrimary: {
    backgroundColor: tokens.color.backgroundBrand,   // DS: Default
    borderRadius: tokens.radius.md,
    paddingVertical: 14,
    paddingHorizontal: tokens.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...webCursor,
  },
  btnPrimaryHover: {
    backgroundColor: tokens.color.backgroundBrandHover,  // DS: Hover
  },
  btnPrimaryPressed: {
    backgroundColor: tokens.color.backgroundBrandPressed, // DS: Pressed
  },
  btnPrimaryLabel: {
    color: tokens.color.textOnBrand,
    fontSize: tokens.font.sizeBody,
    fontWeight: tokens.font.weightSemiBold,
    lineHeight: 20,
  },
  btnPrimaryLabelActive: {
    opacity: 0.9,
  },

  // ── Buttons — Neutral (DS: Default / Hover / Pressed) ────────────────────────
  btnNeutral: {
    backgroundColor: tokens.color.backgroundNeutral,  // DS: Default
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.color.borderNeutral,
    paddingVertical: 14,
    paddingHorizontal: tokens.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...webCursor,
  },
  btnNeutralHover: {
    backgroundColor: tokens.color.backgroundNeutralHover,  // DS: Hover
  },
  btnNeutralPressed: {
    backgroundColor: tokens.color.backgroundNeutralPressed, // DS: Pressed
  },
  btnNeutralLabel: {
    color: tokens.color.textDefault,
    fontSize: tokens.font.sizeBody,
    fontWeight: tokens.font.weightSemiBold,
    lineHeight: 20,
  },
  btnNeutralLabelActive: {
    opacity: 0.85,
  },

  // ── Divider ──────────────────────────────────────────────────────────────────
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: tokens.color.borderDefault,
  },
  dividerLabel: {
    fontSize: tokens.font.sizeBodySmall,
    color: tokens.color.textTertiary,
    lineHeight: 20,
  },

  // ── Inputs (DS: Default / Focus* / Error / Disabled) — *added for a11y ───────
  formSection: {
    gap: tokens.spacing.lg,
  },
  inputGroup: {
    gap: tokens.spacing.xs,
  },
  inputLabel: {
    fontSize: tokens.font.sizeBodySmall,
    fontWeight: tokens.font.weightSemiBold,
    color: tokens.color.textDefault,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: tokens.color.borderDefault,         // DS: Default
    borderRadius: tokens.radius.md,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    paddingHorizontal: tokens.spacing.lg,
    fontSize: tokens.font.sizeBody,
    color: tokens.color.textDefault,
    backgroundColor: tokens.color.backgroundDefault,
    minHeight: 48,
    // Remove browser default outline — we handle it ourselves
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}),
  },
  inputFocused: {
    // borderWidth stays at 1 — changing it shifts content. Ring is painted
    // outside the border with box-shadow so it takes zero layout space.
    borderColor: tokens.color.borderFocus,
    ...(Platform.OS === 'web'
      ? { boxShadow: `0 0 0 3px ${tokens.color.borderFocus}22` } as any
      : {}),
  },

  // ── Password input ───────────────────────────────────────────────────────────
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: tokens.color.borderDefault,         // DS: Default
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.color.backgroundDefault,
    minHeight: 48,
  },
  passwordContainerFocused: {
    borderColor: tokens.color.borderFocus,
    ...(Platform.OS === 'web'
      ? { boxShadow: `0 0 0 3px ${tokens.color.borderFocus}22` } as any
      : {}),
  },
  passwordInput: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    paddingHorizontal: tokens.spacing.lg,
    fontSize: tokens.font.sizeBody,
    color: tokens.color.textDefault,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}),
  },
  passwordToggle: {
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    marginRight: tokens.spacing.xs,   // 4px — matches the natural 3.75px top/bottom gap
    borderRadius: tokens.radius.sm,
    ...webCursor,
  },
  passwordToggleActive: {
    backgroundColor: tokens.color.backgroundNeutral,
  },
  passwordToggleText: {
    fontSize: tokens.font.sizeBodySmall,
    fontWeight: tokens.font.weightSemiBold,
    color: tokens.color.textBrand,
  },

  // ── Remember Me row ──────────────────────────────────────────────────────────
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.sm,
    paddingVertical: tokens.spacing.xs,
    paddingRight: tokens.spacing.xs,
    ...webCursor,
  },
  checkboxRowActive: {
    opacity: 0.75,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: tokens.radius.sm - 2,
    borderWidth: 1.5,
    borderColor: tokens.color.borderNeutral,         // DS: Unchecked/Default
    backgroundColor: tokens.color.backgroundDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: tokens.color.backgroundBrand,   // DS: Checked/Default
    borderColor: tokens.color.backgroundBrand,
  },
  checkmark: {
    color: tokens.color.textOnBrand,
    fontSize: 12,
    fontWeight: tokens.font.weightSemiBold,
    lineHeight: 16,
  },
  rememberLabel: {
    fontSize: tokens.font.sizeBodySmall,
    color: tokens.color.textDefault,
    lineHeight: 20,
  },
  forgotLinkWrapper: {
    borderRadius: tokens.radius.sm,
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.xs,
    ...webCursor,
  },
  forgotLinkWrapperActive: {
    opacity: 0.7,
  },
  forgotLink: {
    fontSize: tokens.font.sizeBodySmall,
    color: tokens.color.textBrand,
    fontWeight: tokens.font.weightSemiBold,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },

  // ── Sign Up link ─────────────────────────────────────────────────────────────
  signUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  signUpText: {
    fontSize: tokens.font.sizeBody,
    color: tokens.color.textSecondary,
    lineHeight: 24,
  },
  signUpLinkWrapper: {
    borderRadius: tokens.radius.sm,
    ...webCursor,
  },
  signUpLinkWrapperActive: {
    opacity: 0.75,
  },
  signUpLink: {
    fontSize: tokens.font.sizeBody,
    color: tokens.color.textLink,                   // Text/Brand/Default
    fontWeight: tokens.font.weightSemiBold,
    lineHeight: 24,
    textDecorationLine: 'underline',                // DS Text Link always underlined
  },
  signUpLinkActive: {
    opacity: 0.65,
  },
});
