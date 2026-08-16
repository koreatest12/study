import { describe, expect, it } from 'vitest';
import StudyUtils from '../../public/study-utils.js';

describe('StudyUtils subnet calculator', () => {
  it('calculates /26 network correctly', () => {
    expect(StudyUtils.calculateSubnet('192.168.10.70', 26)).toMatchObject({ network: '192.168.10.64', broadcast: '192.168.10.127', firstHost: '192.168.10.65', lastHost: '192.168.10.126', usable: 62 });
  });
  it('rejects invalid IPv4', () => { expect(() => StudyUtils.calculateSubnet('999.1.1.1', 24)).toThrow(); });
});

describe('StudyUtils learning logic', () => {
  it('calculates accuracy', () => { expect(StudyUtils.accuracy(8, 10)).toBe(80); expect(StudyUtils.accuracy(0, 0)).toBe(0); });
  it('evaluates firewall web ports', () => { expect(StudyUtils.evaluateFirewallPort(443).allowed).toBe(true); expect(StudyUtils.evaluateFirewallPort(25).allowed).toBe(false); });
  it('normalizes imported state safely', () => { const state = StudyUtils.normalizeState({ solved: 2, bookmarks: 'bad' }); expect(state.solved).toBe(2); expect(state.bookmarks).toEqual([]); expect(state.version).toBe(3); });
});
