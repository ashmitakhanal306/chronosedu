import json

with open('c:/Users/skuma/Documents/chronosedu/frontend/src/data/dataset2_dump.json', encoding='utf-8') as f:
    d = json.load(f)

subject_colors = {
    'ENG': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'HIN': 'bg-orange-50 text-orange-700 border-orange-200',
    'SAN': 'bg-amber-50 text-amber-700 border-amber-200',
    'MAT': 'bg-blue-50 text-blue-700 border-blue-200',
    'EVS': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'SCI': 'bg-teal-50 text-teal-700 border-teal-200',
    'SST': 'bg-yellow-50 text-yellow-800 border-yellow-200',
    'CS':  'bg-cyan-50 text-cyan-700 border-cyan-200',
    'PHY': 'bg-violet-50 text-violet-700 border-violet-200',
    'CHE': 'bg-purple-50 text-purple-700 border-purple-200',
    'BIO': 'bg-green-50 text-green-700 border-green-200',
    'PSY': 'bg-pink-50 text-pink-700 border-pink-200',
    'ACC': 'bg-sky-50 text-sky-700 border-sky-200',
    'BST': 'bg-blue-50 text-blue-800 border-blue-200',
    'ECO': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'HIS': 'bg-rose-50 text-rose-700 border-rose-200',
    'POL': 'bg-indigo-50 text-indigo-800 border-indigo-200',
    'GEO': 'bg-teal-50 text-teal-800 border-teal-200',
    'ART': 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    'MUS': 'bg-purple-100 text-purple-800 border-purple-300',
    'DAN': 'bg-pink-100 text-pink-800 border-pink-300',
    'PE':  'bg-lime-100 text-lime-800 border-lime-300',
    'LIB': 'bg-slate-100 text-slate-700 border-slate-300',
    'RHY': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'VE':  'bg-amber-100 text-amber-800 border-amber-300',
}

with open('c:/Users/skuma/Documents/chronosedu/scripts/requirements_dump.json', encoding='utf-8') as f_req:
    reqs_by_sec = json.load(f_req)

sections = []
for s in d['Sections']:
    tier = 'Primary' if s['Wing'] in ['Pre-Primary', 'Primary'] else 'Senior'
    sec_id = s['Section_ID']
    sections.append({
        'id': sec_id,
        'name': sec_id,
        'grade': s['Class_Name'],
        'tier': tier,
        'room': s['Home_Room_ID'],
        'wing': s['Wing'],
        'stream': s['Stream'],
        'strength': s['Strength'],
        'classTeacherId': s['Class_Teacher_ID'],
        'classTeacherName': s['Class_Teacher_Name'],
        'weeklySlots': s['Weekly_Slots'],
        'subjectRequirements': reqs_by_sec.get(sec_id, []),
    })

rooms = []
for r in d['Rooms']:
    rtype = r['Room_Type'].lower().replace(' ', '_')
    if 'classroom' in rtype:
        rtype = 'classroom'
    elif 'computer' in rtype:
        rtype = 'computer_lab'
    elif 'lab' in rtype:
        rtype = 'lab'
    elif 'studio' in rtype or 'room' in rtype:
        rtype = 'studio'
    elif 'play' in rtype:
        rtype = 'sports'
    elif 'library' in rtype:
        rtype = 'library'
    else:
        rtype = 'other'

    rooms.append({
        'id': r['Room_ID'],
        'name': r['Room_Name'],
        'type': rtype,
        'capacity': r['Capacity_Students'],
        'block': r['Block'],
        'floor': r['Floor'],
        'parallelClasses': r['Parallel_Classes'],
        'homeroomForClassId': r.get('Assigned_Section'),
        'homeroomForClassName': r.get('Assigned_Section'),
    })

subjects = []
for s in d['Subjects']:
    sub_id = s['Subject_ID']
    stype = 'activity' if s['Category'] in ['Activity', 'Special'] else 'academic'
    subjects.append({
        'id': sub_id,
        'name': s['Subject_Name'],
        'code': sub_id,
        'type': stype,
        'color': subject_colors.get(sub_id, 'bg-slate-50 text-slate-700 border-slate-200'),
        'freqPrimary': 4,
        'freqSenior': 5,
        'requiresDoublePeriod': sub_id in ['PHY', 'CHE', 'BIO', 'CS'],
        'category': s['Category'],
        'taughtBy': s['Taught_By'],
        'roomType': s['Room_Type'],
        'roomMandatory': s['Room_Mandatory'] == 'Y',
    })

teachers = []
for t in d['Teachers']:
    primary = t['Primary_Subject']
    secondary = t.get('Secondary_Subject')
    sub_list = [primary, f"sub-{primary.lower()}"] if primary else []
    if secondary:
        sub_list.extend([secondary, f"sub-{secondary.lower()}"])

    unavail = []
    wd = t.get('Working_Days', 'Mon-Sat')
    if wd == 'Mon-Fri':
        unavail = ['Saturday']
    elif wd == 'Mon,Wed,Fri':
        unavail = ['Tuesday', 'Thursday', 'Saturday']
    elif wd == 'Tue,Thu':
        unavail = ['Monday', 'Wednesday', 'Friday', 'Saturday']

    teachers.append({
        'id': t['Teacher_ID'],
        'name': t['Teacher_Name'],
        'email': f"{t['Teacher_Name'].lower().replace(' ', '.')}@greenwood.edu",
        'subjects': sub_list,
        'maxPerDay': t.get('Max_Periods_Day') or 6,
        'maxPerWeek': t.get('Max_Periods_Week') or 30,
        'unavailableDays': unavail,
        'gender': t.get('Gender'),
        'designation': t.get('Designation'),
        'primarySubject': primary,
        'secondarySubject': secondary,
        'teachingWings': t.get('Teaching_Wings'),
        'employmentType': t.get('Employment_Type'),
        'workingDays': wd,
        'status': t.get('Status', 'Active'),
        'statusTill': t.get('Status_Till'),
        'classTeacherOf': t.get('Class_Teacher_Of'),
    })

known_issues = []
for iss in d['Known_Issues']:
    iss_id = iss['Issue_ID']
    cat = 'shortage'
    if 'Surplus' in iss['Type']:
        cat = 'surplus'
    elif 'Room' in iss['Type']:
        cat = 'room'
    elif 'leave' in iss['Type'].lower():
        cat = 'leave'
    elif 'Availability' in iss['Type']:
        cat = 'availability'
    elif 'Data' in iss['Type']:
        cat = 'data_quality'
    elif 'Constraint' in iss['Type']:
        cat = 'constraint'

    fix_map = {
        'ISS-01': ('recruit_physics', '⚡ Recruit / Assign 2nd Physics PGT (+26 periods)'),
        'ISS-02': ('substitute_maths', '⚡ Assign Substitute for Madhu Sinha (Maths PGT & 11-C CT)'),
        'ISS-03': ('cover_commerce', '⚡ Utilize Economics PGTs for Accountancy & BST Gaps'),
        'ISS-04': ('assign_hindi_to_sanskrit', '⚡ Auto-Assign 3 Hindi Teachers to Sanskrit (+14 periods)'),
        'ISS-05': ('assign_secondary_cs', '⚡ Assign 4 Teachers with CS Secondary Subject (+21 periods)'),
        'ISS-06': ('cover_music', '⚡ Utilize Visiting Dance Teacher (Music Secondary)'),
        'ISS-07': ('cover_dance', '⚡ Partner Full-Time Music Teacher for Junior Dance'),
        'ISS-08': ('homeroom_library', '⚡ Enable Homeroom Reading Hour for Primary Sections'),
        'ISS-15': ('disambiguate_names', '⚡ Disambiguate Identical Staff Names with Dept Badges'),
        'ISS-16': ('lock_part_time_days', '⚡ Lock Lessons to Visiting Teachers Active Days'),
        'ISS-19': ('add_computer_lab', '⚡ Add Computer Lab 3 (Lab C-303, +48 slots)'),
        'ISS-21': ('reassign_room_9b', '⚡ Expand Room C-102 to 50 Desks (or Move 9-B)'),
        'ISS-23': ('fix_class_teacher_11c', '⚡ Reassign 11-C Class Teacher to Active Senior Faculty'),
    }

    fix_info = fix_map.get(iss_id, ('general_review', '⚡ Review & Auto-Balance'))

    known_issues.append({
        'id': iss_id,
        'type': iss['Type'],
        'category': cat,
        'severity': iss['Severity'],
        'area': iss['Area'],
        'problem': iss['What is wrong'],
        'evidence': iss['Numbers / evidence'],
        'advice': iss['How the website should handle or test it'],
        'fixType': fix_info[0],
        'fixLabel': fix_info[1],
        'isResolved': False,
    })

content = f"""// GREENWOOD PUBLIC SCHOOL (DATASET 2 — REAL-WORLD ISSUES TESTBED)
// Auto-generated from Test/School_Timetable_Dataset_2_With_Issues.xlsx
// Contains 55 Sections, 99 Staff, 67 Rooms, 25 Subjects, and 23 Documented Issues.

import type {{ School, PeriodSlot, ClassSection, Room, Subject, Teacher }} from '../domain/types';

export interface KnownDatasetIssue {{
  id: string;
  type: string;
  category: 'shortage' | 'surplus' | 'room' | 'overcrowding' | 'leave' | 'availability' | 'data_quality' | 'constraint';
  severity: 'High' | 'Medium' | 'Low';
  area: string;
  problem: string;
  evidence: string;
  advice: string;
  fixType: string;
  fixLabel: string;
  isResolved: boolean;
}}

export const GREENWOOD_PERIOD_SLOTS: PeriodSlot[] = [
  {{ number: 1, label: 'Period 1', time: '08:00 - 08:40', isBreak: false }},
  {{ number: 2, label: 'Period 2', time: '08:40 - 09:20', isBreak: false }},
  {{ number: 3, label: 'Period 3', time: '09:20 - 10:00', isBreak: false }},
  {{ number: 'B1', label: 'Short Break', time: '10:00 - 10:20', isBreak: true, type: 'break' }},
  {{ number: 4, label: 'Period 4', time: '10:20 - 11:00', isBreak: false }},
  {{ number: 5, label: 'Period 5', time: '11:00 - 11:40', isBreak: false }},
  {{ number: 6, label: 'Period 6', time: '11:40 - 12:20', isBreak: false, note: 'Pre-Primary Dismissal (12:20)' }},
  {{ number: 'L1', label: 'Lunch Break', time: '12:20 - 12:50', isBreak: true, type: 'lunch' }},
  {{ number: 7, label: 'Period 7', time: '12:50 - 13:30', isBreak: false, note: 'Primary Dismissal (13:30)' }},
  {{ number: 8, label: 'Period 8', time: '13:30 - 14:10', isBreak: false, seniorOnly: true, note: 'Senior Dismissal (14:10)' }},
];

export const GREENWOOD_SECTIONS: ClassSection[] = {json.dumps(sections, indent=2)};

export const GREENWOOD_ROOMS: Room[] = {json.dumps(rooms, indent=2)};

export const GREENWOOD_SUBJECTS: Subject[] = {json.dumps(subjects, indent=2)};

export const GREENWOOD_TEACHERS: Teacher[] = {json.dumps(teachers, indent=2)};

export const KNOWN_ISSUES_DATASET_2: KnownDatasetIssue[] = {json.dumps(known_issues, indent=2)};

export const GREENWOOD_ISSUES_SCHOOL_ID = 'greenwood-public-issues-testbed';

export function createGreenwoodIssuesSchool(): School {{
  return {{
    id: GREENWOOD_ISSUES_SCHOOL_ID,
    name: 'Greenwood Public School (Dataset 2 — Issues Testbed)',
    subdomain: 'greenwood-issues.chronos.edu',
    timezone: 'IST (UTC+5:30)',
    term: 'Academic Year 2026-27',
    published: false,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    rules: {{
      primaryEndPeriod: 7,
      seniorEndPeriod: 8,
      maxTeacherPeriodsPerDay: 6,
      activityDay: 'Wednesday',
      activityPeriods: [7, 8],
      zeroPeriodLabel: 'Homeroom / Assembly',
      lunchAfterPeriod: 6,
    }},
    timingConfig: {{
      startTime: '08:00',
      periodDurationMinutes: 40,
      hasZeroPeriod: false,
      zeroPeriodDurationMinutes: 0,
      zeroPeriodLabel: 'Zero Period',
      recessAfterPeriod: 3,
      recessDurationMinutes: 20,
      recessLabel: 'Short Break',
      lunchAfterPeriod: 6,
      lunchDurationMinutes: 30,
      lunchLabel: 'Lunch Break',
      lunchSeniorOnly: false,
    }},
    periodSlots: GREENWOOD_PERIOD_SLOTS,
    classes: JSON.parse(JSON.stringify(GREENWOOD_SECTIONS)),
    rooms: JSON.parse(JSON.stringify(GREENWOOD_ROOMS)),
    subjects: JSON.parse(JSON.stringify(GREENWOOD_SUBJECTS)),
    teachers: JSON.parse(JSON.stringify(GREENWOOD_TEACHERS)),
    absences: [
      {{ id: 'abs-madhu', teacherId: 'T002', day: 'Monday', reason: 'Maternity Leave (until 31-Jan-2027)' }}
    ],
    substitutions: {{}},
  }};
}}
"""

with open('c:/Users/skuma/Documents/chronosedu/frontend/src/data/greenwoodIssuesSchool.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Generated frontend/src/data/greenwoodIssuesSchool.ts successfully!')
