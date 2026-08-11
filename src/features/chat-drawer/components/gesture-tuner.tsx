import { Host, Slider } from "@expo/ui";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import { TUNING_SECTIONS } from "../constants";
import type {
  AppColorScheme,
  ColorPalette,
  DrawerTuning,
  NumericDrawerTuningKey,
} from "../types";
import { formatTuningValue, roundToStep } from "../utils";

type GestureTunerProps = {
  colorScheme: AppColorScheme;
  colors: ColorPalette;
  onClose: () => void;
  onNumericValueChange: (
    key: NumericDrawerTuningKey,
    value: number,
  ) => void;
  onOvershootClampingChange: (enabled: boolean) => void;
  onReset: () => void;
  onShare: () => void;
  tuning: DrawerTuning;
};

export function GestureTuner({
  colorScheme,
  colors,
  onClose,
  onNumericValueChange,
  onOvershootClampingChange,
  onReset,
  onShare,
  tuning,
}: GestureTunerProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.introduction}>
        <View style={styles.titleRow}>
          <View style={styles.titleGroup}>
            <Text selectable style={[styles.title, { color: colors.text }]}>
              Gesture tuner
            </Text>
            <Text selectable style={[styles.subtitle, { color: colors.muted }]}>
              Adjust a value, tap Done, then test the swipe.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={({ pressed }) => [
              styles.doneButton,
              { backgroundColor: colors.accent },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.doneLabel, { color: colors.accentText }]}>Done</Text>
          </Pressable>
        </View>
      </View>

      {TUNING_SECTIONS.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text selectable style={[styles.sectionTitle, { color: colors.muted }]}>
            {section.title.toUpperCase()}
          </Text>
          <View
            style={[
              styles.sectionCard,
              {
                backgroundColor: colors.composer,
                borderColor: colors.separator,
              },
            ]}
          >
            {section.controls.map((control, index) => {
              const value = tuning[control.key];

              return (
                <View
                  key={control.key}
                  style={[
                    styles.control,
                    index > 0 && {
                      borderTopColor: colors.separator,
                      borderTopWidth: StyleSheet.hairlineWidth,
                    },
                  ]}
                >
                  <View style={styles.controlTitleRow}>
                    <Text selectable style={[styles.controlLabel, { color: colors.text }]}>
                      {control.label}
                    </Text>
                    <Text selectable style={[styles.controlValue, { color: colors.accent }]}>
                      {formatTuningValue(value, control.format)}
                    </Text>
                  </View>
                  <Text selectable style={[styles.controlDescription, { color: colors.muted }]}>
                    {control.description}
                  </Text>
                  <Host
                    colorScheme={colorScheme}
                    seedColor={colors.accent}
                    style={styles.sliderHost}
                  >
                    <Slider
                      max={control.maximumValue}
                      min={control.minimumValue}
                      onValueChange={(nextValue) =>
                        onNumericValueChange(
                          control.key,
                          roundToStep(nextValue, control.step),
                        )
                      }
                      step={control.step}
                      value={value}
                    />
                  </Host>
                </View>
              );
            })}

            {section.title === "Spring" ? (
              <View
                style={[
                  styles.switchControl,
                  {
                    borderTopColor: colors.separator,
                    borderTopWidth: StyleSheet.hairlineWidth,
                  },
                ]}
              >
                <View style={styles.switchCopy}>
                  <Text selectable style={[styles.controlLabel, { color: colors.text }]}>
                    Clamp overshoot
                  </Text>
                  <Text selectable style={[styles.controlDescription, { color: colors.muted }]}>
                    Prevent the spring from moving beyond its destination.
                  </Text>
                </View>
                <Switch
                  onValueChange={onOvershootClampingChange}
                  value={tuning.overshootClamping}
                />
              </View>
            ) : null}
          </View>
        </View>
      ))}

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={onShare}
          style={({ pressed }) => [
            styles.actionButton,
            { backgroundColor: colors.accent },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.primaryActionLabel, { color: colors.accentText }]}>
            Share values
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onReset}
          style={({ pressed }) => [
            styles.actionButton,
            { backgroundColor: colors.composer },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.secondaryActionLabel, { color: colors.text }]}>
            Reset defaults
          </Text>
        </Pressable>
      </View>

      <Text selectable style={[styles.shareHint, { color: colors.muted }]}>
        Share Values exports the exact configuration as JSON.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: "center",
    gap: 22,
    maxWidth: 680,
    paddingHorizontal: 18,
    paddingVertical: 24,
    width: "100%",
  },
  introduction: {
    gap: 6,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  titleGroup: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  doneButton: {
    borderCurve: "continuous",
    borderRadius: 16,
    justifyContent: "center",
    minHeight: 38,
    paddingHorizontal: 16,
  },
  doneLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.7,
    paddingHorizontal: 4,
  },
  sectionCard: {
    borderCurve: "continuous",
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  control: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  controlTitleRow: {
    alignItems: "baseline",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  controlLabel: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  controlValue: {
    fontSize: 14,
    fontVariant: ["tabular-nums"],
    fontWeight: "700",
  },
  controlDescription: {
    fontSize: 12,
    lineHeight: 17,
    paddingTop: 3,
  },
  sliderHost: {
    height: 42,
    width: "100%",
  },
  switchControl: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  switchCopy: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 18,
    flex: 1,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 14,
  },
  primaryActionLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryActionLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  shareHint: {
    fontSize: 12,
    paddingBottom: 16,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.62,
  },
});
