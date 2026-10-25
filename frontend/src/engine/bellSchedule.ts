// ENGINE LAYER — dynamic bell schedule calculator.
// Pure mathematical functions, no React, no I/O.
import type { PeriodSlot, SchoolRules, TimingConfig } from '../domain/types';

export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 8 * 60; // 08:00 default
  const parts = timeStr.trim().split(':');
  const hours = parseInt(parts[0], 10) || 0;
  const mins = parseInt(parts[1], 10) || 0;
  return hours * 60 + mins;
}

export function formatMinutesToTime(totalMinutes: number, includeAmPm = false): string {
  const normalized = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const rawHours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  const period = rawHours >= 12 ? 'PM' : 'AM';
  let hours = rawHours % 12;
  if (hours === 0) hours = 12;

  const hStr = hours < 10 ? `0${hours}` : `${hours}`;
  const mStr = mins < 10 ? `0${mins}` : `${mins}`;

  return includeAmPm ? `${hStr}:${mStr} ${period}` : `${hStr}:${mStr}`;
}

export function formatRange(startMin: number, endMin: number): string {
  return `${formatMinutesToTime(startMin)} - ${formatMinutesToTime(endMin)}`;
}

export interface ComputedBellSchedule {
  slots: PeriodSlot[];
  prePrimaryDismissalTime?: string;
  primaryDismissalTime: string;
  seniorDismissalTime: string;
}

export function computeBellSchedule(timing: TimingConfig, rules: SchoolRules): ComputedBellSchedule {
  const slots: PeriodSlot[] = [];
  let currentMin = parseTimeToMinutes(timing.startTime);
  let prePrimaryDismissalTime = '';
  let primaryDismissalTime = '';
  let seniorDismissalTime = '';

  // 1. Zero Period / Homeroom (if enabled)
  if (timing.hasZeroPeriod && timing.zeroPeriodDurationMinutes > 0) {
    const zeroEnd = currentMin + timing.zeroPeriodDurationMinutes;
    slots.push({
      number: 0,
      label: timing.zeroPeriodLabel || 'Zero Period',
      time: formatRange(currentMin, zeroEnd),
      isBreak: true,
      type: 'zero',
    });
    currentMin = zeroEnd;
  }

  // 2. Step through Periods 1 through Senior End Period
  const seniorEnd = Math.max(rules.seniorEndPeriod || 6, rules.primaryEndPeriod || 4);

  for (let p = 1; p <= seniorEnd; p++) {
    const pEnd = currentMin + timing.periodDurationMinutes;
    const isPastPrimary = p > rules.primaryEndPeriod;

    let note: string | undefined = undefined;
    if (rules.prePrimaryEndPeriod && p === rules.prePrimaryEndPeriod) {
      prePrimaryDismissalTime = formatMinutesToTime(pEnd, true);
    }
    if (p === rules.primaryEndPeriod) {
      primaryDismissalTime = formatMinutesToTime(pEnd, true);
      note = `Primary Dismissal (${formatMinutesToTime(pEnd)})`;
    }
    if (p === rules.seniorEndPeriod) {
      seniorDismissalTime = formatMinutesToTime(pEnd, true);
      note = `Senior Dismissal (${formatMinutesToTime(pEnd)})`;
    }

    slots.push({
      number: p,
      label: `Period ${p}`,
      time: formatRange(currentMin, pEnd),
      isBreak: false,
      seniorOnly: isPastPrimary,
      note,
    });
    currentMin = pEnd;

    // Check Recess Break (if enabled)
    const hasRecess = timing.hasRecessBreak ?? true;
    if (hasRecess && p === timing.recessAfterPeriod && timing.recessDurationMinutes > 0) {
      const bEnd = currentMin + timing.recessDurationMinutes;
      slots.push({
        number: 'B1',
        label: timing.recessLabel || 'Short Break',
        time: formatRange(currentMin, bEnd),
        isBreak: true,
        type: 'break',
        seniorOnly: false,
      });
      currentMin = bEnd;
    }

    // Check Lunch Break (if enabled)
    const hasLunch = timing.hasLunchBreak ?? true;
    if (hasLunch && p === timing.lunchAfterPeriod && timing.lunchDurationMinutes > 0) {
      const lEnd = currentMin + timing.lunchDurationMinutes;
      slots.push({
        number: 'L1',
        label: timing.lunchLabel || 'Lunch Break',
        time: formatRange(currentMin, lEnd),
        isBreak: true,
        type: 'lunch',
        seniorOnly: timing.lunchSeniorOnly ?? false, // user preference: default same lunch time
      });
      currentMin = lEnd;
    }
  }

  return {
    slots,
    prePrimaryDismissalTime: prePrimaryDismissalTime || undefined,
    primaryDismissalTime: primaryDismissalTime || formatMinutesToTime(currentMin, true),
    seniorDismissalTime: seniorDismissalTime || formatMinutesToTime(currentMin, true),
  };
}
