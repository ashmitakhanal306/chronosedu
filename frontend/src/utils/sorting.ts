/**
 * ChronosEdu Natural Educational & Alphanumeric Sorting Utilities
 *
 * Implements:
 * 1. Natural educational progression sorting for classes / sections:
 *    - Pre-Nursery / Infant / Playgroup (Rank 1)
 *    - Nursery / Nur / nur / NURSERY / nursery (Rank 2)
 *    - LKG / lkg / L.K.G. / KG1 / Prep-1 / Jr. KG (Rank 3)
 *    - UKG / ukg / U.K.G. / KG2 / Prep-2 / Sr. KG (Rank 4)
 *    - Numbered classes 1 to 12+ / Roman numerals I to XII (Rank 10 + N)
 *    - Section letter (A < B < C < D...)
 *    - Stream / Track (General < Science < Commerce < Humanities)
 *
 * 2. Natural alphanumeric sorting for rooms / facilities:
 *    - Priority to room name/number (e.g., Classroom A-101 < B-105 < B-108 < C-302)
 *    - Tie-breaker to class section name
 *
 * 3. Dictionary-order sorting for teachers:
 *    - Case-insensitive alphabetical sorting A to Z (Aarti Banerjee < Amit Iyer < Vivek Sharma)
 */

export interface ClassSortable {
  name: string;
  grade?: string;
  room?: string;
}

export interface RoomSortable {
  room?: string;
  name?: string;
}

export interface TeacherSortable {
  name: string;
}

const ROMAN_MAP: Record<string, number> = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
  x: 10,
  xi: 11,
  xii: 12,
};

const STREAM_RANKS: Record<string, number> = {
  general: 0,
  science: 1,
  'science (pcm)': 1,
  'science (pcb)': 2,
  commerce: 3,
  humanities: 4,
  arts: 4,
};

/**
 * Extracts the educational rank, section, and stream from a class name / grade string.
 */
export function getClassSortRank(className: string, gradeName: string = ''): {
  tierRank: number;
  section: string;
  streamRank: number;
  raw: string;
} {
  const combined = `${className || ''} ${gradeName || ''}`.toLowerCase().trim();
  let tierRank = 100;

  // 1. Pre-Nursery / Infant / Playgroup
  if (/(\bpre[- ]?nur|\bplaygroup\b|\binfant\b|\bcreche\b|\btoddler\b)/i.test(combined)) {
    tierRank = 1;
  }
  // 2. Nursery variations (Nursery, Nur, nur, NURSERY, nursery, etc.)
  else if (/(\bnursery\b|\bnur\b|\bpre[- ]?k\b|\bpk\b)/i.test(combined)) {
    tierRank = 2;
  }
  // 3. LKG variations (LKG, lkg, L.K.G., KG1, KG-1, Prep-1, Jr. KG, Junior KG)
  else if (/(\bl\.?k\.?g\b|\bkg[- ]?1\b|\bprep[- ]?1\b|\bjr\.?[- ]?kg\b|\bjunior[- ]?kg\b)/i.test(combined)) {
    tierRank = 3;
  }
  // 4. UKG variations (UKG, ukg, U.K.G., KG2, KG-2, Prep-2, Sr. KG, Senior KG)
  else if (/(\bu\.?k\.?g\b|\bkg[- ]?2\b|\bprep[- ]?2\b|\bsr\.?[- ]?kg\b|\bsenior[- ]?kg\b)/i.test(combined)) {
    tierRank = 4;
  }
  // 5. Arabic numerals (Class 1 to 15, e.g., 4-A, 12-D, Class 10)
  else {
    const numMatch = combined.match(/(?:class|grade)?\s*(\b\d{1,2}\b)/i);
    if (numMatch) {
      tierRank = 10 + parseInt(numMatch[1], 10);
    } else {
      // 6. Roman numerals (I, II, IV, XII, etc.)
      const romanMatch = combined.match(/\b(xii|xi|ix|x|viii|vii|vi|iv|v|iii|ii|i)\b/i);
      if (romanMatch && ROMAN_MAP[romanMatch[1].toLowerCase()]) {
        tierRank = 10 + ROMAN_MAP[romanMatch[1].toLowerCase()];
      }
    }
  }

  // Extract section letter from className (e.g., '4-A' -> 'A', 'NUR-B' -> 'B', '12D' -> 'D')
  let section = '';
  const rawClass = (className || '').trim();
  const secMatch = rawClass.match(/[- /]([A-Za-z])\b|(?:\d|[A-Za-z]+)\s*([A-Za-z])$/);
  if (secMatch) {
    section = (secMatch[1] || secMatch[2] || '').toUpperCase();
  }

  // Extract stream rank
  let streamRank = 0;
  for (const [key, rank] of Object.entries(STREAM_RANKS)) {
    if (combined.includes(key)) {
      streamRank = rank;
      break;
    }
  }

  return { tierRank, section, streamRank, raw: rawClass };
}

/**
 * Natural educational comparator for classes and sections.
 * Guarantees Pre-Primary -> Class 1..12 -> Section A..Z.
 */
export function compareClassSections(
  a: ClassSortable | string | undefined | null,
  b: ClassSortable | string | undefined | null
): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;

  const aName = typeof a === 'string' ? a : a.name;
  const aGrade = typeof a === 'string' ? '' : a.grade;
  const bName = typeof b === 'string' ? b : b.name;
  const bGrade = typeof b === 'string' ? '' : b.grade;

  const rankA = getClassSortRank(aName, aGrade);
  const rankB = getClassSortRank(bName, bGrade);

  if (rankA.tierRank !== rankB.tierRank) {
    return rankA.tierRank - rankB.tierRank;
  }

  if (rankA.section && rankB.section && rankA.section !== rankB.section) {
    return rankA.section.localeCompare(rankB.section);
  }

  if (rankA.streamRank !== rankB.streamRank) {
    return rankA.streamRank - rankB.streamRank;
  }

  return rankA.raw.localeCompare(rankB.raw, undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * Natural alphanumeric comparator for room names/numbers.
 * Where both room and class name are present, priority is given to room name/number.
 */
export function compareRooms(
  a: RoomSortable | string | undefined | null,
  b: RoomSortable | string | undefined | null
): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;

  const aRoom = (typeof a === 'string' ? a : (a.room || a.name || '')).trim();
  const bRoom = (typeof b === 'string' ? b : (b.room || b.name || '')).trim();

  // Natural alphanumeric comparison (e.g., B-105 < B-108 < C-302)
  const roomDiff = aRoom.localeCompare(bRoom, undefined, { numeric: true, sensitivity: 'base' });
  if (roomDiff !== 0) {
    return roomDiff;
  }

  // If room names are identical, secondary tie-breaker uses class name if available
  const aClass = typeof a === 'object' && a !== null && 'name' in a ? (a as ClassSortable).name : '';
  const bClass = typeof b === 'object' && b !== null && 'name' in b ? (b as ClassSortable).name : '';
  if (aClass || bClass) {
    return compareClassSections(aClass, bClass);
  }

  return 0;
}

/**
 * Dictionary-order comparator for teachers (A to Z alphabetical).
 */
export function compareTeachers(
  a: TeacherSortable | string | undefined | null,
  b: TeacherSortable | string | undefined | null
): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;

  const aName = (typeof a === 'string' ? a : a.name || '').trim();
  const bName = (typeof b === 'string' ? b : b.name || '').trim();

  return aName.localeCompare(bName, undefined, { sensitivity: 'base' });
}

/**
 * Returns a sorted copy of classes in natural educational progression.
 */
export function sortClasses<T extends ClassSortable>(classes: readonly T[] | T[]): T[] {
  return [...classes].sort(compareClassSections);
}

/**
 * Returns a sorted copy of rooms / homeroom facilities, prioritizing room name/number.
 */
export function sortRooms<T extends RoomSortable>(rooms: readonly T[] | T[]): T[] {
  return [...rooms].sort(compareRooms);
}

/**
 * Returns a sorted copy of teachers in dictionary pattern (A to Z).
 */
export function sortTeachers<T extends TeacherSortable>(teachers: readonly T[] | T[]): T[] {
  return [...teachers].sort(compareTeachers);
}
