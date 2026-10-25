// GREENWOOD PUBLIC SCHOOL (DATASET 2 — REAL-WORLD ISSUES TESTBED)
// Auto-generated from Test/School_Timetable_Dataset_2_With_Issues.xlsx
// Contains 55 Sections, 99 Staff, 67 Rooms, 25 Subjects, and 23 Documented Issues.

import type { School, PeriodSlot, ClassSection, Room, Subject, Teacher } from '../domain/types';

export interface KnownDatasetIssue {
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
}

export const GREENWOOD_PERIOD_SLOTS: PeriodSlot[] = [
  { number: 1, label: 'Period 1', time: '08:00 - 08:40', isBreak: false },
  { number: 2, label: 'Period 2', time: '08:40 - 09:20', isBreak: false },
  { number: 3, label: 'Period 3', time: '09:20 - 10:00', isBreak: false },
  { number: 'B1', label: 'Short Break', time: '10:00 - 10:20', isBreak: true, type: 'break' },
  { number: 4, label: 'Period 4', time: '10:20 - 11:00', isBreak: false },
  { number: 5, label: 'Period 5', time: '11:00 - 11:40', isBreak: false },
  { number: 6, label: 'Period 6', time: '11:40 - 12:20', isBreak: false, note: 'Pre-Primary Dismissal (12:20)' },
  { number: 'L1', label: 'Lunch Break', time: '12:20 - 12:50', isBreak: true, type: 'lunch' },
  { number: 7, label: 'Period 7', time: '12:50 - 13:30', isBreak: false, note: 'Primary Dismissal (13:30)' },
  { number: 8, label: 'Period 8', time: '13:30 - 14:10', isBreak: false, seniorOnly: true, note: 'Senior Dismissal (14:10)' },
];

export const GREENWOOD_SECTIONS: ClassSection[] = [
  {
    "id": "NUR-A",
    "name": "NUR-A",
    "grade": "Nursery",
    "tier": "Primary",
    "room": "A-101",
    "wing": "Pre-Primary",
    "stream": "General",
    "strength": 20,
    "classTeacherId": "T043",
    "classTeacherName": "Ruchi Ghosh",
    "weeklySlots": 30,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "RHY",
        "subjectName": "Rhymes & Storytelling",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Play Area",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "NUR-B",
    "name": "NUR-B",
    "grade": "Nursery",
    "tier": "Primary",
    "room": "A-102",
    "wing": "Pre-Primary",
    "stream": "General",
    "strength": 22,
    "classTeacherId": "T054",
    "classTeacherName": "Garima Tandon",
    "weeklySlots": 30,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "RHY",
        "subjectName": "Rhymes & Storytelling",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Play Area",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "LKG-A",
    "name": "LKG-A",
    "grade": "LKG",
    "tier": "Primary",
    "room": "A-103",
    "wing": "Pre-Primary",
    "stream": "General",
    "strength": 24,
    "classTeacherId": "T064",
    "classTeacherName": "Jyoti Nair",
    "weeklySlots": 30,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "RHY",
        "subjectName": "Rhymes & Storytelling",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Play Area",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "LKG-B",
    "name": "LKG-B",
    "grade": "LKG",
    "tier": "Primary",
    "room": "A-104",
    "wing": "Pre-Primary",
    "stream": "General",
    "strength": 24,
    "classTeacherId": "T073",
    "classTeacherName": "Harleen Pandey",
    "weeklySlots": 30,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "RHY",
        "subjectName": "Rhymes & Storytelling",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Play Area",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "LKG-C",
    "name": "LKG-C",
    "grade": "LKG",
    "tier": "Primary",
    "room": "A-105",
    "wing": "Pre-Primary",
    "stream": "General",
    "strength": 25,
    "classTeacherId": "T078",
    "classTeacherName": "Garima Malhotra",
    "weeklySlots": 30,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "RHY",
        "subjectName": "Rhymes & Storytelling",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Play Area",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "UKG-A",
    "name": "UKG-A",
    "grade": "UKG",
    "tier": "Primary",
    "room": "A-106",
    "wing": "Pre-Primary",
    "stream": "General",
    "strength": 26,
    "classTeacherId": "T090",
    "classTeacherName": "Tanvi Mukherjee",
    "weeklySlots": 30,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "RHY",
        "subjectName": "Rhymes & Storytelling",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Play Area",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "UKG-B",
    "name": "UKG-B",
    "grade": "UKG",
    "tier": "Primary",
    "room": "A-107",
    "wing": "Pre-Primary",
    "stream": "General",
    "strength": 20,
    "classTeacherId": "T095",
    "classTeacherName": "Chitra Singh",
    "weeklySlots": 30,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "RHY",
        "subjectName": "Rhymes & Storytelling",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Play Area",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "1-A",
    "name": "1-A",
    "grade": "Class 1",
    "tier": "Primary",
    "room": "A-108",
    "wing": "Primary",
    "stream": "General",
    "strength": 33,
    "classTeacherId": "T038",
    "classTeacherName": "Pooja Bisht",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "1-B",
    "name": "1-B",
    "grade": "Class 1",
    "tier": "Primary",
    "room": "A-201",
    "wing": "Primary",
    "stream": "General",
    "strength": 38,
    "classTeacherId": "T091",
    "classTeacherName": "Shalini Mehta",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "1-C",
    "name": "1-C",
    "grade": "Class 1",
    "tier": "Primary",
    "room": "A-202",
    "wing": "Primary",
    "stream": "General",
    "strength": 36,
    "classTeacherId": "T037",
    "classTeacherName": "Sunita Sharma",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "1-D",
    "name": "1-D",
    "grade": "Class 1",
    "tier": "Primary",
    "room": "A-203",
    "wing": "Primary",
    "stream": "General",
    "strength": 38,
    "classTeacherId": "T024",
    "classTeacherName": "Geeta Pandey",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "2-A",
    "name": "2-A",
    "grade": "Class 2",
    "tier": "Primary",
    "room": "A-204",
    "wing": "Primary",
    "stream": "General",
    "strength": 37,
    "classTeacherId": "T029",
    "classTeacherName": "Vinod Ghosh",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "2-B",
    "name": "2-B",
    "grade": "Class 2",
    "tier": "Primary",
    "room": "A-205",
    "wing": "Primary",
    "stream": "General",
    "strength": 37,
    "classTeacherId": "T033",
    "classTeacherName": "Sapna Bedi",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "2-C",
    "name": "2-C",
    "grade": "Class 2",
    "tier": "Primary",
    "room": "A-206",
    "wing": "Primary",
    "stream": "General",
    "strength": 33,
    "classTeacherId": "T042",
    "classTeacherName": "Preeti Bisht",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "EVS",
        "subjectName": "Environmental Studies",
        "periodsPerWeek": 5,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "3-A",
    "name": "3-A",
    "grade": "Class 3",
    "tier": "Primary",
    "room": "B-101",
    "wing": "Primary",
    "stream": "General",
    "strength": 30,
    "classTeacherId": "T096",
    "classTeacherName": "Savita Mehta",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "3-B",
    "name": "3-B",
    "grade": "Class 3",
    "tier": "Primary",
    "room": "B-102",
    "wing": "Primary",
    "stream": "General",
    "strength": 31,
    "classTeacherId": "T082",
    "classTeacherName": "Ekta Bhatia",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "3-C",
    "name": "3-C",
    "grade": "Class 3",
    "tier": "Primary",
    "room": "B-103",
    "wing": "Primary",
    "stream": "General",
    "strength": 31,
    "classTeacherId": "T080",
    "classTeacherName": "Vikram Chopra",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "3-D",
    "name": "3-D",
    "grade": "Class 3",
    "tier": "Primary",
    "room": "B-104",
    "wing": "Primary",
    "stream": "General",
    "strength": 34,
    "classTeacherId": "T057",
    "classTeacherName": "Anita Sharma",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "4-A",
    "name": "4-A",
    "grade": "Class 4",
    "tier": "Primary",
    "room": "B-105",
    "wing": "Primary",
    "stream": "General",
    "strength": 31,
    "classTeacherId": "T048",
    "classTeacherName": "Anita Kohli",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "4-B",
    "name": "4-B",
    "grade": "Class 4",
    "tier": "Primary",
    "room": "B-106",
    "wing": "Primary",
    "stream": "General",
    "strength": 37,
    "classTeacherId": "T098",
    "classTeacherName": "Archana Malhotra",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "4-C",
    "name": "4-C",
    "grade": "Class 4",
    "tier": "Primary",
    "room": "B-107",
    "wing": "Primary",
    "stream": "General",
    "strength": 30,
    "classTeacherId": "T056",
    "classTeacherName": "Payal Arora",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "5-A",
    "name": "5-A",
    "grade": "Class 5",
    "tier": "Primary",
    "room": "B-108",
    "wing": "Primary",
    "stream": "General",
    "strength": 37,
    "classTeacherId": "T039",
    "classTeacherName": "Divya Sharma",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "5-B",
    "name": "5-B",
    "grade": "Class 5",
    "tier": "Primary",
    "room": "B-201",
    "wing": "Primary",
    "stream": "General",
    "strength": 35,
    "classTeacherId": "T099",
    "classTeacherName": "Harish Rastogi",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "5-C",
    "name": "5-C",
    "grade": "Class 5",
    "tier": "Primary",
    "room": "B-202",
    "wing": "Primary",
    "stream": "General",
    "strength": 33,
    "classTeacherId": "T094",
    "classTeacherName": "Preeti Walia",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "5-D",
    "name": "5-D",
    "grade": "Class 5",
    "tier": "Primary",
    "room": "B-203",
    "wing": "Primary",
    "stream": "General",
    "strength": 36,
    "classTeacherId": "T035",
    "classTeacherName": "Rachna Tandon",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "5-E",
    "name": "5-E",
    "grade": "Class 5",
    "tier": "Primary",
    "room": "B-204",
    "wing": "Primary",
    "stream": "General",
    "strength": 34,
    "classTeacherId": "T058",
    "classTeacherName": "Sunita Chauhan",
    "weeklySlots": 42,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 3,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "6-A",
    "name": "6-A",
    "grade": "Class 6",
    "tier": "Senior",
    "room": "B-205",
    "wing": "Middle",
    "stream": "General",
    "strength": 36,
    "classTeacherId": "T008",
    "classTeacherName": "Aarti Banerjee",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "6-B",
    "name": "6-B",
    "grade": "Class 6",
    "tier": "Senior",
    "room": "B-206",
    "wing": "Middle",
    "stream": "General",
    "strength": 36,
    "classTeacherId": "T051",
    "classTeacherName": "Manju Tiwari",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "6-C",
    "name": "6-C",
    "grade": "Class 6",
    "tier": "Senior",
    "room": "B-207",
    "wing": "Middle",
    "stream": "General",
    "strength": 40,
    "classTeacherId": "T009",
    "classTeacherName": "Radha Bansal",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "6-D",
    "name": "6-D",
    "grade": "Class 6",
    "tier": "Senior",
    "room": "B-208",
    "wing": "Middle",
    "stream": "General",
    "strength": 37,
    "classTeacherId": "T030",
    "classTeacherName": "Rajesh Kumar",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "7-A",
    "name": "7-A",
    "grade": "Class 7",
    "tier": "Senior",
    "room": "B-301",
    "wing": "Middle",
    "stream": "General",
    "strength": 39,
    "classTeacherId": "T018",
    "classTeacherName": "Aarti Walia",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "7-B",
    "name": "7-B",
    "grade": "Class 7",
    "tier": "Senior",
    "room": "B-302",
    "wing": "Middle",
    "stream": "General",
    "strength": 38,
    "classTeacherId": "T041",
    "classTeacherName": "Sunita Sharma",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "7-C",
    "name": "7-C",
    "grade": "Class 7",
    "tier": "Senior",
    "room": "B-303",
    "wing": "Middle",
    "stream": "General",
    "strength": 39,
    "classTeacherId": "T015",
    "classTeacherName": "Vivek Sharma",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "7-D",
    "name": "7-D",
    "grade": "Class 7",
    "tier": "Senior",
    "room": "B-304",
    "wing": "Middle",
    "stream": "General",
    "strength": 34,
    "classTeacherId": "T055",
    "classTeacherName": "Namrata Sinha",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "8-A",
    "name": "8-A",
    "grade": "Class 8",
    "tier": "Senior",
    "room": "B-305",
    "wing": "Middle",
    "stream": "General",
    "strength": 39,
    "classTeacherId": "T031",
    "classTeacherName": "Tanvi Gill",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "8-B",
    "name": "8-B",
    "grade": "Class 8",
    "tier": "Senior",
    "room": "B-306",
    "wing": "Middle",
    "stream": "General",
    "strength": 36,
    "classTeacherId": "T070",
    "classTeacherName": "Rashmi Sharma",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "8-C",
    "name": "8-C",
    "grade": "Class 8",
    "tier": "Senior",
    "room": "B-307",
    "wing": "Middle",
    "stream": "General",
    "strength": 34,
    "classTeacherId": "T068",
    "classTeacherName": "Vandana Banerjee",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SAN",
        "subjectName": "Sanskrit",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 2,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "MUS",
        "subjectName": "Music",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Music Room",
        "roomMandatory": false
      },
      {
        "subjectId": "DAN",
        "subjectName": "Dance",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Dance Studio",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "9-A",
    "name": "9-A",
    "grade": "Class 9",
    "tier": "Senior",
    "room": "C-101",
    "wing": "Secondary",
    "stream": "General",
    "strength": 40,
    "classTeacherId": "T025",
    "classTeacherName": "Bhavna Gill",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 8,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "9-B",
    "name": "9-B",
    "grade": "Class 9",
    "tier": "Senior",
    "room": "C-102",
    "wing": "Secondary",
    "stream": "General",
    "strength": 48,
    "classTeacherId": "T085",
    "classTeacherName": "Rekha Mukherjee",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 8,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "9-C",
    "name": "9-C",
    "grade": "Class 9",
    "tier": "Senior",
    "room": "C-103",
    "wing": "Secondary",
    "stream": "General",
    "strength": 38,
    "classTeacherId": "T010",
    "classTeacherName": "Sunita Mehta",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 8,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "9-D",
    "name": "9-D",
    "grade": "Class 9",
    "tier": "Senior",
    "room": "C-104",
    "wing": "Secondary",
    "stream": "General",
    "strength": 38,
    "classTeacherId": "T027",
    "classTeacherName": "Hemant Singh",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 8,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "10-A",
    "name": "10-A",
    "grade": "Class 10",
    "tier": "Senior",
    "room": "C-105",
    "wing": "Secondary",
    "stream": "General",
    "strength": 39,
    "classTeacherId": "T028",
    "classTeacherName": "Poonam Thakur",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 8,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "10-B",
    "name": "10-B",
    "grade": "Class 10",
    "tier": "Senior",
    "room": "C-106",
    "wing": "Secondary",
    "stream": "General",
    "strength": 37,
    "classTeacherId": "T021",
    "classTeacherName": "Gopal Joshi",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 8,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "10-C",
    "name": "10-C",
    "grade": "Class 10",
    "tier": "Senior",
    "room": "C-107",
    "wing": "Secondary",
    "stream": "General",
    "strength": 41,
    "classTeacherId": "T086",
    "classTeacherName": "Mohit Bhatia",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 8,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "10-D",
    "name": "10-D",
    "grade": "Class 10",
    "tier": "Senior",
    "room": "C-108",
    "wing": "Secondary",
    "stream": "General",
    "strength": 41,
    "classTeacherId": "T053",
    "classTeacherName": "Isha Kumar",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIN",
        "subjectName": "Hindi",
        "periodsPerWeek": 6,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SCI",
        "subjectName": "Science",
        "periodsPerWeek": 8,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "SST",
        "subjectName": "Social Science",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 3,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "ART",
        "subjectName": "Art & Craft",
        "periodsPerWeek": 2,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Art Room",
        "roomMandatory": false
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "11-A",
    "name": "11-A",
    "grade": "Class 11",
    "tier": "Senior",
    "room": "C-201",
    "wing": "Senior Secondary",
    "stream": "Science (PCM)",
    "strength": 37,
    "classTeacherId": "T013",
    "classTeacherName": "Amit Dubey",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PHY",
        "subjectName": "Physics",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Physics Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "CHE",
        "subjectName": "Chemistry",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Chemistry Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 10,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 7,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "11-B",
    "name": "11-B",
    "grade": "Class 11",
    "tier": "Senior",
    "room": "C-202",
    "wing": "Senior Secondary",
    "stream": "Science (PCB)",
    "strength": 35,
    "classTeacherId": "T032",
    "classTeacherName": "Rajesh Sinha",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PHY",
        "subjectName": "Physics",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Physics Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "CHE",
        "subjectName": "Chemistry",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Chemistry Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "BIO",
        "subjectName": "Biology",
        "periodsPerWeek": 10,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Biology Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PSY",
        "subjectName": "Psychology",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "11-C",
    "name": "11-C",
    "grade": "Class 11",
    "tier": "Senior",
    "room": "C-203",
    "wing": "Senior Secondary",
    "stream": "Science (PCM)",
    "strength": 30,
    "classTeacherId": "T002",
    "classTeacherName": "Madhu Sinha",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PHY",
        "subjectName": "Physics",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Physics Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "CHE",
        "subjectName": "Chemistry",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Chemistry Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 10,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 7,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "11-D",
    "name": "11-D",
    "grade": "Class 11",
    "tier": "Senior",
    "room": "C-204",
    "wing": "Senior Secondary",
    "stream": "Commerce",
    "strength": 26,
    "classTeacherId": "T004",
    "classTeacherName": "Pradeep Malhotra",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ACC",
        "subjectName": "Accountancy",
        "periodsPerWeek": 10,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "BST",
        "subjectName": "Business Studies",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ECO",
        "subjectName": "Economics",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "11-E",
    "name": "11-E",
    "grade": "Class 11",
    "tier": "Senior",
    "room": "C-205",
    "wing": "Senior Secondary",
    "stream": "Commerce",
    "strength": 22,
    "classTeacherId": "T081",
    "classTeacherName": "Bhavna Tandon",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ACC",
        "subjectName": "Accountancy",
        "periodsPerWeek": 10,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "BST",
        "subjectName": "Business Studies",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ECO",
        "subjectName": "Economics",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "11-F",
    "name": "11-F",
    "grade": "Class 11",
    "tier": "Senior",
    "room": "C-206",
    "wing": "Senior Secondary",
    "stream": "Humanities",
    "strength": 37,
    "classTeacherId": "T006",
    "classTeacherName": "Rajesh Chopra",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIS",
        "subjectName": "History",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "POL",
        "subjectName": "Political Science",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "GEO",
        "subjectName": "Geography",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ECO",
        "subjectName": "Economics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "12-A",
    "name": "12-A",
    "grade": "Class 12",
    "tier": "Senior",
    "room": "C-207",
    "wing": "Senior Secondary",
    "stream": "Science (PCM)",
    "strength": 31,
    "classTeacherId": "T036",
    "classTeacherName": "Rakesh Rawat",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PHY",
        "subjectName": "Physics",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Physics Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "CHE",
        "subjectName": "Chemistry",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Chemistry Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 10,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "CS",
        "subjectName": "Computer Science / IT",
        "periodsPerWeek": 7,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Computer Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "12-B",
    "name": "12-B",
    "grade": "Class 12",
    "tier": "Senior",
    "room": "C-208",
    "wing": "Senior Secondary",
    "stream": "Science (PCB)",
    "strength": 31,
    "classTeacherId": "T047",
    "classTeacherName": "Lalit Joshi",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PHY",
        "subjectName": "Physics",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Physics Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "CHE",
        "subjectName": "Chemistry",
        "periodsPerWeek": 9,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Chemistry Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "BIO",
        "subjectName": "Biology",
        "periodsPerWeek": 10,
        "doublePeriods": 1,
        "maxPerDay": 2,
        "roomType": "Biology Lab",
        "roomMandatory": true
      },
      {
        "subjectId": "PSY",
        "subjectName": "Psychology",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "12-C",
    "name": "12-C",
    "grade": "Class 12",
    "tier": "Senior",
    "room": "C-301",
    "wing": "Senior Secondary",
    "stream": "Commerce",
    "strength": 33,
    "classTeacherId": "T019",
    "classTeacherName": "Rohit Jain",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ACC",
        "subjectName": "Accountancy",
        "periodsPerWeek": 10,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "BST",
        "subjectName": "Business Studies",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ECO",
        "subjectName": "Economics",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "MAT",
        "subjectName": "Mathematics",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  },
  {
    "id": "12-D",
    "name": "12-D",
    "grade": "Class 12",
    "tier": "Senior",
    "room": "C-302",
    "wing": "Senior Secondary",
    "stream": "Humanities",
    "strength": 32,
    "classTeacherId": "T023",
    "classTeacherName": "Archana Anand",
    "weeklySlots": 48,
    "subjectRequirements": [
      {
        "subjectId": "ENG",
        "subjectName": "English",
        "periodsPerWeek": 7,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "HIS",
        "subjectName": "History",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "POL",
        "subjectName": "Political Science",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "GEO",
        "subjectName": "Geography",
        "periodsPerWeek": 9,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "ECO",
        "subjectName": "Economics",
        "periodsPerWeek": 8,
        "doublePeriods": 0,
        "maxPerDay": 2,
        "roomType": "Home Classroom",
        "roomMandatory": false
      },
      {
        "subjectId": "PE",
        "subjectName": "Physical Education",
        "periodsPerWeek": 4,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Playground",
        "roomMandatory": true
      },
      {
        "subjectId": "LIB",
        "subjectName": "Library & Reading",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Library",
        "roomMandatory": true
      },
      {
        "subjectId": "VE",
        "subjectName": "Value Education / Class Teacher Period",
        "periodsPerWeek": 1,
        "doublePeriods": 0,
        "maxPerDay": 1,
        "roomType": "Home Classroom",
        "roomMandatory": false
      }
    ]
  }
];

export const GREENWOOD_ROOMS: Room[] = [
  {
    "id": "A-101",
    "name": "Classroom A-101",
    "type": "classroom",
    "capacity": 28,
    "block": "A",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "NUR-A",
    "homeroomForClassName": "NUR-A"
  },
  {
    "id": "A-102",
    "name": "Classroom A-102",
    "type": "classroom",
    "capacity": 28,
    "block": "A",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "NUR-B",
    "homeroomForClassName": "NUR-B"
  },
  {
    "id": "A-103",
    "name": "Classroom A-103",
    "type": "classroom",
    "capacity": 28,
    "block": "A",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "LKG-A",
    "homeroomForClassName": "LKG-A"
  },
  {
    "id": "A-104",
    "name": "Classroom A-104",
    "type": "classroom",
    "capacity": 28,
    "block": "A",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "LKG-B",
    "homeroomForClassName": "LKG-B"
  },
  {
    "id": "A-105",
    "name": "Classroom A-105",
    "type": "classroom",
    "capacity": 28,
    "block": "A",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "LKG-C",
    "homeroomForClassName": "LKG-C"
  },
  {
    "id": "A-106",
    "name": "Classroom A-106",
    "type": "classroom",
    "capacity": 28,
    "block": "A",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "UKG-A",
    "homeroomForClassName": "UKG-A"
  },
  {
    "id": "A-107",
    "name": "Classroom A-107",
    "type": "classroom",
    "capacity": 28,
    "block": "A",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "UKG-B",
    "homeroomForClassName": "UKG-B"
  },
  {
    "id": "A-108",
    "name": "Classroom A-108",
    "type": "classroom",
    "capacity": 40,
    "block": "A",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "1-A",
    "homeroomForClassName": "1-A"
  },
  {
    "id": "A-201",
    "name": "Classroom A-201",
    "type": "classroom",
    "capacity": 40,
    "block": "A",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "1-B",
    "homeroomForClassName": "1-B"
  },
  {
    "id": "A-202",
    "name": "Classroom A-202",
    "type": "classroom",
    "capacity": 40,
    "block": "A",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "1-C",
    "homeroomForClassName": "1-C"
  },
  {
    "id": "A-203",
    "name": "Classroom A-203",
    "type": "classroom",
    "capacity": 40,
    "block": "A",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "1-D",
    "homeroomForClassName": "1-D"
  },
  {
    "id": "A-204",
    "name": "Classroom A-204",
    "type": "classroom",
    "capacity": 40,
    "block": "A",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "2-A",
    "homeroomForClassName": "2-A"
  },
  {
    "id": "A-205",
    "name": "Classroom A-205",
    "type": "classroom",
    "capacity": 40,
    "block": "A",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "2-B",
    "homeroomForClassName": "2-B"
  },
  {
    "id": "A-206",
    "name": "Classroom A-206",
    "type": "classroom",
    "capacity": 40,
    "block": "A",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "2-C",
    "homeroomForClassName": "2-C"
  },
  {
    "id": "B-101",
    "name": "Classroom B-101",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "3-A",
    "homeroomForClassName": "3-A"
  },
  {
    "id": "B-102",
    "name": "Classroom B-102",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "3-B",
    "homeroomForClassName": "3-B"
  },
  {
    "id": "B-103",
    "name": "Classroom B-103",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "3-C",
    "homeroomForClassName": "3-C"
  },
  {
    "id": "B-104",
    "name": "Classroom B-104",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "3-D",
    "homeroomForClassName": "3-D"
  },
  {
    "id": "B-105",
    "name": "Classroom B-105",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "4-A",
    "homeroomForClassName": "4-A"
  },
  {
    "id": "B-106",
    "name": "Classroom B-106",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "4-B",
    "homeroomForClassName": "4-B"
  },
  {
    "id": "B-107",
    "name": "Classroom B-107",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "4-C",
    "homeroomForClassName": "4-C"
  },
  {
    "id": "B-108",
    "name": "Classroom B-108",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "5-A",
    "homeroomForClassName": "5-A"
  },
  {
    "id": "B-201",
    "name": "Classroom B-201",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "5-B",
    "homeroomForClassName": "5-B"
  },
  {
    "id": "B-202",
    "name": "Classroom B-202",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "5-C",
    "homeroomForClassName": "5-C"
  },
  {
    "id": "B-203",
    "name": "Classroom B-203",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "5-D",
    "homeroomForClassName": "5-D"
  },
  {
    "id": "B-204",
    "name": "Classroom B-204",
    "type": "classroom",
    "capacity": 40,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "5-E",
    "homeroomForClassName": "5-E"
  },
  {
    "id": "B-205",
    "name": "Classroom B-205",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "6-A",
    "homeroomForClassName": "6-A"
  },
  {
    "id": "B-206",
    "name": "Classroom B-206",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "6-B",
    "homeroomForClassName": "6-B"
  },
  {
    "id": "B-207",
    "name": "Classroom B-207",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "6-C",
    "homeroomForClassName": "6-C"
  },
  {
    "id": "B-208",
    "name": "Classroom B-208",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "6-D",
    "homeroomForClassName": "6-D"
  },
  {
    "id": "B-301",
    "name": "Classroom B-301",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 3,
    "parallelClasses": 1,
    "homeroomForClassId": "7-A",
    "homeroomForClassName": "7-A"
  },
  {
    "id": "B-302",
    "name": "Classroom B-302",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 3,
    "parallelClasses": 1,
    "homeroomForClassId": "7-B",
    "homeroomForClassName": "7-B"
  },
  {
    "id": "B-303",
    "name": "Classroom B-303",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 3,
    "parallelClasses": 1,
    "homeroomForClassId": "7-C",
    "homeroomForClassName": "7-C"
  },
  {
    "id": "B-304",
    "name": "Classroom B-304",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 3,
    "parallelClasses": 1,
    "homeroomForClassId": "7-D",
    "homeroomForClassName": "7-D"
  },
  {
    "id": "B-305",
    "name": "Classroom B-305",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 3,
    "parallelClasses": 1,
    "homeroomForClassId": "8-A",
    "homeroomForClassName": "8-A"
  },
  {
    "id": "B-306",
    "name": "Classroom B-306",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 3,
    "parallelClasses": 1,
    "homeroomForClassId": "8-B",
    "homeroomForClassName": "8-B"
  },
  {
    "id": "B-307",
    "name": "Classroom B-307",
    "type": "classroom",
    "capacity": 45,
    "block": "B",
    "floor": 3,
    "parallelClasses": 1,
    "homeroomForClassId": "8-C",
    "homeroomForClassName": "8-C"
  },
  {
    "id": "C-101",
    "name": "Classroom C-101",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "9-A",
    "homeroomForClassName": "9-A"
  },
  {
    "id": "C-102",
    "name": "Classroom C-102",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "9-B",
    "homeroomForClassName": "9-B"
  },
  {
    "id": "C-103",
    "name": "Classroom C-103",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "9-C",
    "homeroomForClassName": "9-C"
  },
  {
    "id": "C-104",
    "name": "Classroom C-104",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "9-D",
    "homeroomForClassName": "9-D"
  },
  {
    "id": "C-105",
    "name": "Classroom C-105",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "10-A",
    "homeroomForClassName": "10-A"
  },
  {
    "id": "C-106",
    "name": "Classroom C-106",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "10-B",
    "homeroomForClassName": "10-B"
  },
  {
    "id": "C-107",
    "name": "Classroom C-107",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "10-C",
    "homeroomForClassName": "10-C"
  },
  {
    "id": "C-108",
    "name": "Classroom C-108",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": "10-D",
    "homeroomForClassName": "10-D"
  },
  {
    "id": "C-201",
    "name": "Classroom C-201",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "11-A",
    "homeroomForClassName": "11-A"
  },
  {
    "id": "C-202",
    "name": "Classroom C-202",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "11-B",
    "homeroomForClassName": "11-B"
  },
  {
    "id": "C-203",
    "name": "Classroom C-203",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "11-C",
    "homeroomForClassName": "11-C"
  },
  {
    "id": "C-204",
    "name": "Classroom C-204",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "11-D",
    "homeroomForClassName": "11-D"
  },
  {
    "id": "C-205",
    "name": "Classroom C-205",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "11-E",
    "homeroomForClassName": "11-E"
  },
  {
    "id": "C-206",
    "name": "Classroom C-206",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "11-F",
    "homeroomForClassName": "11-F"
  },
  {
    "id": "C-207",
    "name": "Classroom C-207",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "12-A",
    "homeroomForClassName": "12-A"
  },
  {
    "id": "C-208",
    "name": "Classroom C-208",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": "12-B",
    "homeroomForClassName": "12-B"
  },
  {
    "id": "C-301",
    "name": "Classroom C-301",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 3,
    "parallelClasses": 1,
    "homeroomForClassId": "12-C",
    "homeroomForClassName": "12-C"
  },
  {
    "id": "C-302",
    "name": "Classroom C-302",
    "type": "classroom",
    "capacity": 45,
    "block": "C",
    "floor": 3,
    "parallelClasses": 1,
    "homeroomForClassId": "12-D",
    "homeroomForClassName": "12-D"
  },
  {
    "id": "CL-1",
    "name": "Computer Lab 1",
    "type": "computer_lab",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "CL-2",
    "name": "Computer Lab 2",
    "type": "computer_lab",
    "capacity": 40,
    "block": "B",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "PL-1",
    "name": "Physics Lab",
    "type": "lab",
    "capacity": 40,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "CH-1",
    "name": "Chemistry Lab",
    "type": "lab",
    "capacity": 40,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "BL-1",
    "name": "Biology Lab",
    "type": "lab",
    "capacity": 40,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "LIB-1",
    "name": "Library",
    "type": "library",
    "capacity": 80,
    "block": "A",
    "floor": 1,
    "parallelClasses": 2,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "PG-1",
    "name": "Sports Ground",
    "type": "sports",
    "capacity": 160,
    "block": "-",
    "floor": 0,
    "parallelClasses": 4,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "PA-1",
    "name": "Pre-Primary Play Area",
    "type": "sports",
    "capacity": 60,
    "block": "A",
    "floor": 0,
    "parallelClasses": 2,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "AR-1",
    "name": "Art Room 1",
    "type": "studio",
    "capacity": 40,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "AR-2",
    "name": "Art Room 2",
    "type": "studio",
    "capacity": 40,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "MR-1",
    "name": "Music Room",
    "type": "studio",
    "capacity": 40,
    "block": "A",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "DS-1",
    "name": "Dance Studio",
    "type": "studio",
    "capacity": 45,
    "block": "A",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  }
];

export const GREENWOOD_SUBJECTS: Subject[] = [
  {
    "id": "ENG",
    "name": "English",
    "code": "ENG",
    "type": "academic",
    "color": "bg-indigo-50 text-indigo-700 border-indigo-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Language",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "HIN",
    "name": "Hindi",
    "code": "HIN",
    "type": "academic",
    "color": "bg-orange-50 text-orange-700 border-orange-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Language",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "SAN",
    "name": "Sanskrit",
    "code": "SAN",
    "type": "academic",
    "color": "bg-amber-50 text-amber-700 border-amber-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Language",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "MAT",
    "name": "Mathematics",
    "code": "MAT",
    "type": "academic",
    "color": "bg-blue-50 text-blue-700 border-blue-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Core",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "EVS",
    "name": "Environmental Studies",
    "code": "EVS",
    "type": "academic",
    "color": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Core",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "SCI",
    "name": "Science",
    "code": "SCI",
    "type": "academic",
    "color": "bg-teal-50 text-teal-700 border-teal-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Core",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "SST",
    "name": "Social Science",
    "code": "SST",
    "type": "academic",
    "color": "bg-yellow-50 text-yellow-800 border-yellow-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Core",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "CS",
    "name": "Computer Science / IT",
    "code": "CS",
    "type": "academic",
    "color": "bg-cyan-50 text-cyan-700 border-cyan-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": true,
    "category": "Skill",
    "taughtBy": "Subject Teacher",
    "roomType": "Computer Lab",
    "roomMandatory": true
  },
  {
    "id": "PHY",
    "name": "Physics",
    "code": "PHY",
    "type": "academic",
    "color": "bg-violet-50 text-violet-700 border-violet-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": true,
    "category": "Senior Science",
    "taughtBy": "Subject Teacher",
    "roomType": "Physics Lab",
    "roomMandatory": true
  },
  {
    "id": "CHE",
    "name": "Chemistry",
    "code": "CHE",
    "type": "academic",
    "color": "bg-purple-50 text-purple-700 border-purple-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": true,
    "category": "Senior Science",
    "taughtBy": "Subject Teacher",
    "roomType": "Chemistry Lab",
    "roomMandatory": true
  },
  {
    "id": "BIO",
    "name": "Biology",
    "code": "BIO",
    "type": "academic",
    "color": "bg-green-50 text-green-700 border-green-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": true,
    "category": "Senior Science",
    "taughtBy": "Subject Teacher",
    "roomType": "Biology Lab",
    "roomMandatory": true
  },
  {
    "id": "PSY",
    "name": "Psychology",
    "code": "PSY",
    "type": "academic",
    "color": "bg-pink-50 text-pink-700 border-pink-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Elective",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "ACC",
    "name": "Accountancy",
    "code": "ACC",
    "type": "academic",
    "color": "bg-sky-50 text-sky-700 border-sky-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Elective",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "BST",
    "name": "Business Studies",
    "code": "BST",
    "type": "academic",
    "color": "bg-blue-50 text-blue-800 border-blue-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Elective",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "ECO",
    "name": "Economics",
    "code": "ECO",
    "type": "academic",
    "color": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Elective",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "HIS",
    "name": "History",
    "code": "HIS",
    "type": "academic",
    "color": "bg-rose-50 text-rose-700 border-rose-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Elective",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "POL",
    "name": "Political Science",
    "code": "POL",
    "type": "academic",
    "color": "bg-indigo-50 text-indigo-800 border-indigo-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Elective",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "GEO",
    "name": "Geography",
    "code": "GEO",
    "type": "academic",
    "color": "bg-teal-50 text-teal-800 border-teal-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Elective",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "ART",
    "name": "Art & Craft",
    "code": "ART",
    "type": "academic",
    "color": "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Co-scholastic",
    "taughtBy": "Specialist",
    "roomType": "Art Room",
    "roomMandatory": false
  },
  {
    "id": "MUS",
    "name": "Music",
    "code": "MUS",
    "type": "academic",
    "color": "bg-purple-100 text-purple-800 border-purple-300",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Co-scholastic",
    "taughtBy": "Specialist",
    "roomType": "Music Room",
    "roomMandatory": false
  },
  {
    "id": "DAN",
    "name": "Dance",
    "code": "DAN",
    "type": "academic",
    "color": "bg-pink-100 text-pink-800 border-pink-300",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Co-scholastic",
    "taughtBy": "Specialist",
    "roomType": "Dance Studio",
    "roomMandatory": true
  },
  {
    "id": "PE",
    "name": "Physical Education",
    "code": "PE",
    "type": "academic",
    "color": "bg-lime-100 text-lime-800 border-lime-300",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Co-scholastic",
    "taughtBy": "Specialist",
    "roomType": "Playground",
    "roomMandatory": true
  },
  {
    "id": "LIB",
    "name": "Library & Reading",
    "code": "LIB",
    "type": "academic",
    "color": "bg-slate-100 text-slate-700 border-slate-300",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Co-scholastic",
    "taughtBy": "Specialist",
    "roomType": "Library",
    "roomMandatory": true
  },
  {
    "id": "RHY",
    "name": "Rhymes & Storytelling",
    "code": "RHY",
    "type": "academic",
    "color": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Pre-Primary",
    "taughtBy": "Subject Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  },
  {
    "id": "VE",
    "name": "Value Education / Class Teacher Period",
    "code": "VE",
    "type": "academic",
    "color": "bg-amber-100 text-amber-800 border-amber-300",
    "freqPrimary": 4,
    "freqSenior": 5,
    "requiresDoublePeriod": false,
    "category": "Co-scholastic",
    "taughtBy": "Class Teacher",
    "roomType": "Home Classroom",
    "roomMandatory": false
  }
];

export const GREENWOOD_TEACHERS: Teacher[] = [
  {
    "id": "T001",
    "name": "Nidhi Tiwari",
    "email": "nidhi.tiwari@greenwood.edu",
    "subjects": [
      "PHY",
      "sub-phy"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PGT",
    "primarySubject": "PHY",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T002",
    "name": "Madhu Sinha",
    "email": "madhu.sinha@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PGT",
    "primarySubject": "MAT",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "On Leave",
    "statusTill": "2027-01-31T00:00:00",
    "classTeacherOf": "11-C"
  },
  {
    "id": "T003",
    "name": "Archana Kapoor",
    "email": "archana.kapoor@greenwood.edu",
    "subjects": [
      "GEO",
      "sub-geo"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PGT",
    "primarySubject": "GEO",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T004",
    "name": "Pradeep Malhotra",
    "email": "pradeep.malhotra@greenwood.edu",
    "subjects": [
      "ACC",
      "sub-acc",
      "ECO",
      "sub-eco"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "ACC",
    "secondarySubject": "ECO",
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "11-D"
  },
  {
    "id": "T005",
    "name": "Madhu Mehta",
    "email": "madhu.mehta@greenwood.edu",
    "subjects": [
      "CS",
      "sub-cs",
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "CS",
    "secondarySubject": "MAT",
    "teachingWings": "Primary;Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T006",
    "name": "Rajesh Chopra",
    "email": "rajesh.chopra@greenwood.edu",
    "subjects": [
      "HIS",
      "sub-his",
      "POL",
      "sub-pol"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "HIS",
    "secondarySubject": "POL",
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "11-F"
  },
  {
    "id": "T007",
    "name": "Umesh Chopra",
    "email": "umesh.chopra@greenwood.edu",
    "subjects": [
      "PE",
      "sub-pe"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "Specialist",
    "primarySubject": "PE",
    "secondarySubject": null,
    "teachingWings": "All",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T008",
    "name": "Aarti Banerjee",
    "email": "aarti.banerjee@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SST",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "6-A"
  },
  {
    "id": "T009",
    "name": "Radha Bansal",
    "email": "radha.bansal@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "SAN",
      "sub-san"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "HIN",
    "secondarySubject": "SAN",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "6-C"
  },
  {
    "id": "T010",
    "name": "Sunita Mehta",
    "email": "sunita.mehta@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "9-C"
  },
  {
    "id": "T011",
    "name": "Tarun Khanna",
    "email": "tarun.khanna@greenwood.edu",
    "subjects": [
      "SAN",
      "sub-san",
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "SAN",
    "secondarySubject": "HIN",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T012",
    "name": "Lata Pandey",
    "email": "lata.pandey@greenwood.edu",
    "subjects": [
      "CS",
      "sub-cs"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "CS",
    "secondarySubject": null,
    "teachingWings": "Primary;Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T013",
    "name": "Amit Dubey",
    "email": "amit.dubey@greenwood.edu",
    "subjects": [
      "CHE",
      "sub-che"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "CHE",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "11-A"
  },
  {
    "id": "T014",
    "name": "Preeti Tandon",
    "email": "preeti.tandon@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst",
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "SST",
    "secondarySubject": "HIN",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T015",
    "name": "Vivek Sharma",
    "email": "vivek.sharma@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "HIN",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "7-C"
  },
  {
    "id": "T016",
    "name": "Manju Mukherjee",
    "email": "manju.mukherjee@greenwood.edu",
    "subjects": [
      "PE",
      "sub-pe"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "PE",
    "secondarySubject": null,
    "teachingWings": "All",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T017",
    "name": "Kavita Malhotra",
    "email": "kavita.malhotra@greenwood.edu",
    "subjects": [
      "PSY",
      "sub-psy"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 15,
    "unavailableDays": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "gender": "F",
    "designation": "PGT",
    "primarySubject": "PSY",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Part-time",
    "workingDays": "Mon,Wed,Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T018",
    "name": "Aarti Walia",
    "email": "aarti.walia@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst",
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SST",
    "secondarySubject": "ENG",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "7-A"
  },
  {
    "id": "T019",
    "name": "Rohit Jain",
    "email": "rohit.jain@greenwood.edu",
    "subjects": [
      "BST",
      "sub-bst"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "BST",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "12-C"
  },
  {
    "id": "T020",
    "name": "Pradeep Kumar",
    "email": "pradeep.kumar@greenwood.edu",
    "subjects": [
      "PE",
      "sub-pe"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "Specialist",
    "primarySubject": "PE",
    "secondarySubject": null,
    "teachingWings": "All",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T021",
    "name": "Gopal Joshi",
    "email": "gopal.joshi@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "10-B"
  },
  {
    "id": "T022",
    "name": "Renu Banerjee",
    "email": "renu.banerjee@greenwood.edu",
    "subjects": [
      "CS",
      "sub-cs"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 15,
    "unavailableDays": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "CS",
    "secondarySubject": null,
    "teachingWings": "Primary;Middle;Secondary",
    "employmentType": "Part-time",
    "workingDays": "Mon,Wed,Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T023",
    "name": "Archana Anand",
    "email": "archana.anand@greenwood.edu",
    "subjects": [
      "POL",
      "sub-pol",
      "HIS",
      "sub-his"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PGT",
    "primarySubject": "POL",
    "secondarySubject": "HIS",
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "12-D"
  },
  {
    "id": "T024",
    "name": "Geeta Pandey",
    "email": "geeta.pandey@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "MAT",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "1-D"
  },
  {
    "id": "T025",
    "name": "Bhavna Gill",
    "email": "bhavna.gill@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat",
      "CS",
      "sub-cs"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "MAT",
    "secondarySubject": "CS",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "9-A"
  },
  {
    "id": "T026",
    "name": "Rahul Mishra",
    "email": "rahul.mishra@greenwood.edu",
    "subjects": [
      "PE",
      "sub-pe"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "Specialist",
    "primarySubject": "PE",
    "secondarySubject": null,
    "teachingWings": "All",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T027",
    "name": "Hemant Singh",
    "email": "hemant.singh@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "9-D"
  },
  {
    "id": "T028",
    "name": "Poonam Thakur",
    "email": "poonam.thakur@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "SAN",
      "sub-san"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "HIN",
    "secondarySubject": "SAN",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "10-A"
  },
  {
    "id": "T029",
    "name": "Vinod Ghosh",
    "email": "vinod.ghosh@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat",
      "CS",
      "sub-cs"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PRT",
    "primarySubject": "MAT",
    "secondarySubject": "CS",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "2-A"
  },
  {
    "id": "T030",
    "name": "Rajesh Kumar",
    "email": "rajesh.kumar@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat",
      "CS",
      "sub-cs"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "MAT",
    "secondarySubject": "CS",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "6-D"
  },
  {
    "id": "T031",
    "name": "Tanvi Gill",
    "email": "tanvi.gill@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng",
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "ENG",
    "secondarySubject": "SST",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "8-A"
  },
  {
    "id": "T032",
    "name": "Rajesh Sinha",
    "email": "rajesh.sinha@greenwood.edu",
    "subjects": [
      "BIO",
      "sub-bio"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "BIO",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "11-B"
  },
  {
    "id": "T033",
    "name": "Sapna Bedi",
    "email": "sapna.bedi@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "HIN",
    "secondarySubject": "ENG",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "2-B"
  },
  {
    "id": "T034",
    "name": "Suresh Chauhan",
    "email": "suresh.chauhan@greenwood.edu",
    "subjects": [
      "ART",
      "sub-art"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "Specialist",
    "primarySubject": "ART",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary;Primary;Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T035",
    "name": "Rachna Tandon",
    "email": "rachna.tandon@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "5-D"
  },
  {
    "id": "T036",
    "name": "Rakesh Rawat",
    "email": "rakesh.rawat@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "12-A"
  },
  {
    "id": "T037",
    "name": "Sunita Sharma",
    "email": "sunita.sharma@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng",
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "ENG",
    "secondarySubject": "HIN",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "1-C"
  },
  {
    "id": "T038",
    "name": "Pooja Bisht",
    "email": "pooja.bisht@greenwood.edu",
    "subjects": [
      "EVS",
      "sub-evs",
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "EVS",
    "secondarySubject": "SST",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "1-A"
  },
  {
    "id": "T039",
    "name": "Divya Sharma",
    "email": "divya.sharma@greenwood.edu",
    "subjects": [
      "SCI",
      "sub-sci",
      "EVS",
      "sub-evs"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "SCI",
    "secondarySubject": "EVS",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "5-A"
  },
  {
    "id": "T040",
    "name": "Jitendra Bhatia",
    "email": "jitendra.bhatia@greenwood.edu",
    "subjects": [
      "MUS",
      "sub-mus",
      "DAN",
      "sub-dan"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "Specialist",
    "primarySubject": "MUS",
    "secondarySubject": "DAN",
    "teachingWings": "Pre-Primary;Primary;Middle",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T041",
    "name": "Sunita Sharma",
    "email": "sunita.sharma@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst",
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SST",
    "secondarySubject": "HIN",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "7-B"
  },
  {
    "id": "T042",
    "name": "Preeti Bisht",
    "email": "preeti.bisht@greenwood.edu",
    "subjects": [
      "EVS",
      "sub-evs"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "EVS",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "2-C"
  },
  {
    "id": "T043",
    "name": "Ruchi Ghosh",
    "email": "ruchi.ghosh@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng",
      "RHY",
      "sub-rhy"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [
      "Saturday"
    ],
    "gender": "F",
    "designation": "NTT",
    "primarySubject": "ENG",
    "secondarySubject": "RHY",
    "teachingWings": "Pre-Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "NUR-A"
  },
  {
    "id": "T044",
    "name": "Pallavi Walia",
    "email": "pallavi.walia@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "SAN",
      "sub-san"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "HIN",
    "secondarySubject": "SAN",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T045",
    "name": "Pankaj Khanna",
    "email": "pankaj.khanna@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "HIN",
    "secondarySubject": "ENG",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T046",
    "name": "Sarita Joshi",
    "email": "sarita.joshi@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PGT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T047",
    "name": "Lalit Joshi",
    "email": "lalit.joshi@greenwood.edu",
    "subjects": [
      "CHE",
      "sub-che"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "CHE",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "12-B"
  },
  {
    "id": "T048",
    "name": "Anita Kohli",
    "email": "anita.kohli@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "MAT",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "4-A"
  },
  {
    "id": "T049",
    "name": "Urmila Walia",
    "email": "urmila.walia@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SST",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T050",
    "name": "Renu Tandon",
    "email": "renu.tandon@greenwood.edu",
    "subjects": [
      "LIB",
      "sub-lib"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "LIB",
    "secondarySubject": null,
    "teachingWings": "Primary;Middle;Secondary;Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T051",
    "name": "Manju Tiwari",
    "email": "manju.tiwari@greenwood.edu",
    "subjects": [
      "SCI",
      "sub-sci"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SCI",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "6-B"
  },
  {
    "id": "T052",
    "name": "Naresh Kaur",
    "email": "naresh.kaur@greenwood.edu",
    "subjects": [
      "ART",
      "sub-art"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "Specialist",
    "primarySubject": "ART",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary;Primary;Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T053",
    "name": "Isha Kumar",
    "email": "isha.kumar@greenwood.edu",
    "subjects": [
      "SCI",
      "sub-sci"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SCI",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "10-D"
  },
  {
    "id": "T054",
    "name": "Garima Tandon",
    "email": "garima.tandon@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat",
      "EVS",
      "sub-evs"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [
      "Saturday"
    ],
    "gender": "F",
    "designation": "NTT",
    "primarySubject": "MAT",
    "secondarySubject": "EVS",
    "teachingWings": "Pre-Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "NUR-B"
  },
  {
    "id": "T055",
    "name": "Namrata Sinha",
    "email": "namrata.sinha@greenwood.edu",
    "subjects": [
      "SCI",
      "sub-sci"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SCI",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "7-D"
  },
  {
    "id": "T056",
    "name": "Payal Arora",
    "email": "payal.arora@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng",
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "ENG",
    "secondarySubject": "SST",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "4-C"
  },
  {
    "id": "T057",
    "name": "Anita Sharma",
    "email": "anita.sharma@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat",
      "SCI",
      "sub-sci"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "MAT",
    "secondarySubject": "SCI",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "3-D"
  },
  {
    "id": "T058",
    "name": "Sunita Chauhan",
    "email": "sunita.chauhan@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng",
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "ENG",
    "secondarySubject": "HIN",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "5-E"
  },
  {
    "id": "T059",
    "name": "Smita Bansal",
    "email": "smita.bansal@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "HIN",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": "2026-11-30T00:00:00",
    "classTeacherOf": null
  },
  {
    "id": "T060",
    "name": "Umesh Verma",
    "email": "umesh.verma@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "SST",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T061",
    "name": "Manoj Anand",
    "email": "manoj.anand@greenwood.edu",
    "subjects": [
      "PE",
      "sub-pe"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "Specialist",
    "primarySubject": "PE",
    "secondarySubject": null,
    "teachingWings": "All",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T062",
    "name": "Sanjay Sinha",
    "email": "sanjay.sinha@greenwood.edu",
    "subjects": [
      "HIS",
      "sub-his",
      "GEO",
      "sub-geo"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "HIS",
    "secondarySubject": "GEO",
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T063",
    "name": "Deepa Iyer",
    "email": "deepa.iyer@greenwood.edu",
    "subjects": [
      "PE",
      "sub-pe"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "PE",
    "secondarySubject": null,
    "teachingWings": "All",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T064",
    "name": "Jyoti Nair",
    "email": "jyoti.nair@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [
      "Saturday"
    ],
    "gender": "F",
    "designation": "NTT",
    "primarySubject": "HIN",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "LKG-A"
  },
  {
    "id": "T065",
    "name": "Aarti Pandey",
    "email": "aarti.pandey@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst",
      "EVS",
      "sub-evs"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "SST",
    "secondarySubject": "EVS",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T066",
    "name": "Bhavna Tiwari",
    "email": "bhavna.tiwari@greenwood.edu",
    "subjects": [
      "ART",
      "sub-art"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "ART",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary;Primary;Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T067",
    "name": "Varsha Sinha",
    "email": "varsha.sinha@greenwood.edu",
    "subjects": [
      "DAN",
      "sub-dan",
      "MUS",
      "sub-mus"
    ],
    "maxPerDay": 4,
    "maxPerWeek": 12,
    "unavailableDays": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "DAN",
    "secondarySubject": "MUS",
    "teachingWings": "Primary;Middle",
    "employmentType": "Visiting",
    "workingDays": "Mon,Wed,Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T068",
    "name": "Vandana Banerjee",
    "email": "vandana.banerjee@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng",
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "ENG",
    "secondarySubject": "HIN",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "8-C"
  },
  {
    "id": "T069",
    "name": "Archana Nair",
    "email": "archana.nair@greenwood.edu",
    "subjects": [
      "ART",
      "sub-art"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "ART",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary;Primary;Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T070",
    "name": "Rashmi Sharma",
    "email": "rashmi.sharma@greenwood.edu",
    "subjects": [
      "SCI",
      "sub-sci"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SCI",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "8-B"
  },
  {
    "id": "T071",
    "name": "Meena Gill",
    "email": "meena.gill@greenwood.edu",
    "subjects": [
      "SCI",
      "sub-sci",
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SCI",
    "secondarySubject": "MAT",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T072",
    "name": "Rohit Aggarwal",
    "email": "rohit.aggarwal@greenwood.edu",
    "subjects": [
      "ECO",
      "sub-eco",
      "BST",
      "sub-bst"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "ECO",
    "secondarySubject": "BST",
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T073",
    "name": "Harleen Pandey",
    "email": "harleen.pandey@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [
      "Saturday"
    ],
    "gender": "F",
    "designation": "NTT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "LKG-B"
  },
  {
    "id": "T074",
    "name": "Suman Nair",
    "email": "suman.nair@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "HIN",
    "secondarySubject": "SST",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T075",
    "name": "Tarun Iyer",
    "email": "tarun.iyer@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "HIN",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T076",
    "name": "Pankaj Reddy",
    "email": "pankaj.reddy@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat",
      "CS",
      "sub-cs"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "MAT",
    "secondarySubject": "CS",
    "teachingWings": "Senior Secondary;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T077",
    "name": "Mohit Gupta",
    "email": "mohit.gupta@greenwood.edu",
    "subjects": [
      "CS",
      "sub-cs"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "CS",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T078",
    "name": "Garima Malhotra",
    "email": "garima.malhotra@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [
      "Saturday"
    ],
    "gender": "F",
    "designation": "NTT",
    "primarySubject": "MAT",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "LKG-C"
  },
  {
    "id": "T079",
    "name": "Rachna Pandey",
    "email": "rachna.pandey@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SST",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T080",
    "name": "Vikram Chopra",
    "email": "vikram.chopra@greenwood.edu",
    "subjects": [
      "SCI",
      "sub-sci",
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PRT",
    "primarySubject": "SCI",
    "secondarySubject": "MAT",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "3-C"
  },
  {
    "id": "T081",
    "name": "Bhavna Tandon",
    "email": "bhavna.tandon@greenwood.edu",
    "subjects": [
      "ECO",
      "sub-eco"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PGT",
    "primarySubject": "ECO",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "11-E"
  },
  {
    "id": "T082",
    "name": "Ekta Bhatia",
    "email": "ekta.bhatia@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "HIN",
    "secondarySubject": "SST",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "3-B"
  },
  {
    "id": "T083",
    "name": "Amit Thakur",
    "email": "amit.thakur@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T084",
    "name": "Rakesh Bhatia",
    "email": "rakesh.bhatia@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "SST",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T085",
    "name": "Rekha Mukherjee",
    "email": "rekha.mukherjee@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat",
      "SCI",
      "sub-sci"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "MAT",
    "secondarySubject": "SCI",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "9-B"
  },
  {
    "id": "T086",
    "name": "Mohit Bhatia",
    "email": "mohit.bhatia@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "MAT",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "10-C"
  },
  {
    "id": "T087",
    "name": "Anita Ghosh",
    "email": "anita.ghosh@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "SST",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T088",
    "name": "Meena Tiwari",
    "email": "meena.tiwari@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "MAT",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T089",
    "name": "Ritu Khanna",
    "email": "ritu.khanna@greenwood.edu",
    "subjects": [
      "PE",
      "sub-pe"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "PE",
    "secondarySubject": null,
    "teachingWings": "All",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T090",
    "name": "Tanvi Mukherjee",
    "email": "tanvi.mukherjee@greenwood.edu",
    "subjects": [
      "RHY",
      "sub-rhy",
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [
      "Saturday"
    ],
    "gender": "F",
    "designation": "NTT",
    "primarySubject": "RHY",
    "secondarySubject": "ENG",
    "teachingWings": "Pre-Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "UKG-A"
  },
  {
    "id": "T091",
    "name": "Shalini Mehta",
    "email": "shalini.mehta@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "1-B"
  },
  {
    "id": "T092",
    "name": "Renu Joshi",
    "email": "renu.joshi@greenwood.edu",
    "subjects": [
      "MUS",
      "sub-mus"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 10,
    "unavailableDays": [
      "Monday",
      "Wednesday",
      "Friday",
      "Saturday"
    ],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "MUS",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary;Primary;Middle",
    "employmentType": "Part-time",
    "workingDays": "Tue,Thu",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T093",
    "name": "Rajesh Kumar",
    "email": "rajesh.kumar@greenwood.edu",
    "subjects": [
      "PE",
      "sub-pe"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "Specialist",
    "primarySubject": "PE",
    "secondarySubject": null,
    "teachingWings": "All",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T094",
    "name": "Preeti Walia",
    "email": "preeti.walia@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "HIN",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "5-C"
  },
  {
    "id": "T095",
    "name": "Chitra Singh",
    "email": "chitra.singh@greenwood.edu",
    "subjects": [
      "EVS",
      "sub-evs",
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [
      "Saturday"
    ],
    "gender": "F",
    "designation": "NTT",
    "primarySubject": "EVS",
    "secondarySubject": "ENG",
    "teachingWings": "Pre-Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "UKG-B"
  },
  {
    "id": "T096",
    "name": "Savita Mehta",
    "email": "savita.mehta@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "ENG",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "3-A"
  },
  {
    "id": "T097",
    "name": "Naveen Verma",
    "email": "naveen.verma@greenwood.edu",
    "subjects": [
      "PE",
      "sub-pe"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "Specialist",
    "primarySubject": "PE",
    "secondarySubject": null,
    "teachingWings": "All",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T098",
    "name": "Archana Malhotra",
    "email": "archana.malhotra@greenwood.edu",
    "subjects": [
      "EVS",
      "sub-evs",
      "SCI",
      "sub-sci"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "EVS",
    "secondarySubject": "SCI",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "4-B"
  },
  {
    "id": "T099",
    "name": "Harish Rastogi",
    "email": "harish.rastogi@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat",
      "SCI",
      "sub-sci"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PRT",
    "primarySubject": "MAT",
    "secondarySubject": "SCI",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "5-B"
  }
];

export const KNOWN_ISSUES_DATASET_2: KnownDatasetIssue[] = [
  {
    "id": "ISS-01",
    "type": "Shortage",
    "category": "shortage",
    "severity": "High",
    "area": "Physics (PGT)",
    "problem": "Only one Physics teacher (T001 Nidhi Tiwari) for 5 science sections in Class 11-12.",
    "evidence": "Need 45 periods/week, capacity 26 (max load) -> short by 19 periods.",
    "advice": "Timetable generator should leave the overflow Physics periods unassigned and report exactly which sections are affected, not crash or silently drop them.",
    "fixType": "recruit_physics",
    "fixLabel": "\u26a1 Recruit / Assign 2nd Physics PGT (+26 periods)",
    "isResolved": false
  },
  {
    "id": "ISS-02",
    "type": "Shortage (leave)",
    "category": "leave",
    "severity": "High",
    "area": "Mathematics (PGT)",
    "problem": "Two senior Maths teachers on roll, but T002 Madhu Sinha is on maternity leave until 31-Jan-2027. She is also the class teacher of 11-C.",
    "evidence": "Need 51 periods/week. Nominal capacity 52 (looks fine), effective capacity 26 -> short by 25.",
    "advice": "Respect Teachers.Status / Status_Till. Show a 'needs substitute class teacher' warning for 11-C. Test that On Leave teachers get zero periods.",
    "fixType": "substitute_maths",
    "fixLabel": "\u26a1 Assign Substitute for Madhu Sinha (Maths PGT & 11-C CT)",
    "isResolved": false
  },
  {
    "id": "ISS-03",
    "type": "Shortage (marginal)",
    "category": "shortage",
    "severity": "Medium",
    "area": "Accountancy and Business Studies (PGT)",
    "problem": "One teacher each (T004 Pradeep Malhotra; T019 Rohit Jain) and the commerce sections need slightly more than a full load.",
    "evidence": "Accountancy need 30 vs capacity 26; Business Studies need 27 vs capacity 26.",
    "advice": "Small gaps (4 and 1 periods) - checks that the app shows partial shortages, and that Economics teachers with BST/ACC as secondary subject can be suggested.",
    "fixType": "cover_commerce",
    "fixLabel": "\u26a1 Utilize Economics PGTs for Accountancy & BST Gaps",
    "isResolved": false
  },
  {
    "id": "ISS-04",
    "type": "Shortage",
    "category": "shortage",
    "severity": "High",
    "area": "Sanskrit (TGT)",
    "problem": "One Sanskrit teacher (T011 Tarun Khanna) for 11 sections of Class 6-8.",
    "evidence": "Need 44 periods/week, capacity 30 -> short by 14.",
    "advice": "Fix is possible from the Hindi surplus: 3 Hindi TGTs list Sanskrit as Secondary_Subject (T009 Radha Bansal, T028 Poonam Thakur, T044 Pallavi Walia). Good test for 'suggest from secondary subject' logic.",
    "fixType": "assign_hindi_to_sanskrit",
    "fixLabel": "\u26a1 Auto-Assign 3 Hindi Teachers to Sanskrit (+14 periods)",
    "isResolved": false
  },
  {
    "id": "ISS-05",
    "type": "Shortage",
    "category": "shortage",
    "severity": "High",
    "area": "Computer (Class 1-10)",
    "problem": "Only 2 full-time and 1 part-time computer teacher (T022 Renu Banerjee, Mon/Wed/Fri only) for 38 sections of Class 1-10.",
    "evidence": "Need 96 periods/week, capacity 75 -> short by 21.",
    "advice": "Teachers with CS as secondary subject: T025 Bhavna Gill, T029 Vinod Ghosh, T030 Rajesh Kumar, T076 Pankaj Reddy.",
    "fixType": "assign_secondary_cs",
    "fixLabel": "\u26a1 Assign 4 Teachers with CS Secondary Subject (+21 periods)",
    "isResolved": false
  },
  {
    "id": "ISS-06",
    "type": "Shortage",
    "category": "shortage",
    "severity": "Medium",
    "area": "Music",
    "problem": "One full-time music teacher plus one part-time (T092 Renu Joshi, Tue/Thu only).",
    "evidence": "Need 51 periods/week, capacity 40 -> short by 11.",
    "advice": "The visiting dance teacher (T067 Varsha Sinha) lists Music as a secondary subject and could cover part of the gap.",
    "fixType": "cover_music",
    "fixLabel": "\u26a1 Utilize Visiting Dance Teacher (Music Secondary)",
    "isResolved": false
  },
  {
    "id": "ISS-07",
    "type": "Shortage",
    "category": "shortage",
    "severity": "High",
    "area": "Dance",
    "problem": "Dance is taught by a visiting teacher (T067 Varsha Sinha) available Mon/Wed/Fri only, max 12 periods a week.",
    "evidence": "Need 30 periods/week, capacity 12 -> short by 18.",
    "advice": "Some Class 1-8 sections will not get all their Dance periods. The full-time music teacher lists Dance as a secondary subject.",
    "fixType": "cover_dance",
    "fixLabel": "\u26a1 Partner Full-Time Music Teacher for Junior Dance",
    "isResolved": false
  },
  {
    "id": "ISS-08",
    "type": "Shortage",
    "category": "shortage",
    "severity": "Medium",
    "area": "Library",
    "problem": "One librarian (T050 Renu Tandon) for library periods of all 48 sections of Class 1-12.",
    "evidence": "Need 55 periods/week, capacity 30 -> short by 25.",
    "advice": "Tests handling of a single-teacher subject that spans every wing.",
    "fixType": "homeroom_library",
    "fixLabel": "\u26a1 Enable Homeroom Reading Hour for Primary Sections",
    "isResolved": false
  },
  {
    "id": "ISS-09",
    "type": "Surplus",
    "category": "surplus",
    "severity": "Medium",
    "area": "EVS (Primary)",
    "problem": "3 teachers for a small workload. EVS exists only in Class 1-2, but 3 PRTs are hired for it.",
    "evidence": "Need 35 periods/week, capacity 90 -> utilization 39% (about 1.8 teachers spare).",
    "advice": "App should show these as under-used and avoid forcing full loads. Spare teachers can cover shortage subjects via their secondary subjects.",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-10",
    "type": "Surplus",
    "category": "surplus",
    "severity": "Low",
    "area": "Social Science (Primary)",
    "problem": "3 teachers for a small workload. Only Class 3-5 teach it (12 sections x 4 periods).",
    "evidence": "Need 48 periods/week, capacity 90 -> utilization 53% (about 1.4 teachers spare).",
    "advice": "App should show these as under-used and avoid forcing full loads. Spare teachers can cover shortage subjects via their secondary subjects.",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-11",
    "type": "Surplus",
    "category": "surplus",
    "severity": "Low",
    "area": "Hindi (Class 6-10)",
    "problem": "7 teachers for a small workload. Seven TGTs for the Hindi periods of 19 sections; three of them also list Sanskrit as a secondary subject.",
    "evidence": "Need 114 periods/week, capacity 210 -> utilization 54% (about 3.2 teachers spare).",
    "advice": "App should show these as under-used and avoid forcing full loads. Spare teachers can cover shortage subjects via their secondary subjects.",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-12",
    "type": "Surplus",
    "category": "surplus",
    "severity": "Low",
    "area": "Social Science (Class 6-10)",
    "problem": "7 teachers for a small workload. Seven TGTs for 19 sections.",
    "evidence": "Need 122 periods/week, capacity 210 -> utilization 58% (about 2.9 teachers spare).",
    "advice": "App should show these as under-used and avoid forcing full loads. Spare teachers can cover shortage subjects via their secondary subjects.",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-13",
    "type": "Surplus",
    "category": "surplus",
    "severity": "Medium",
    "area": "History (Class 11-12)",
    "problem": "2 teachers for a small workload. Only 2 Humanities sections exist (11-F, 12-D) but two History PGTs are on roll.",
    "evidence": "Need 18 periods/week, capacity 52 -> utilization 35% (about 1.1 teachers spare).",
    "advice": "App should show these as under-used and avoid forcing full loads. Spare teachers can cover shortage subjects via their secondary subjects.",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-14",
    "type": "Tight / upcoming",
    "category": "shortage",
    "severity": "Medium",
    "area": "Hindi (Primary) and other near-full subjects",
    "problem": "These groups run at 94-100% of capacity, so there is no room for substitution or free periods: NTT Hindi (28/28), PRT Hindi, PRT Maths, TGT English, TGT Maths, Psychology (14/15). T059 Smita Bansal (PRT Hindi) is serving notice and leaves on 30-Nov-2026.",
    "evidence": "PRT Hindi: need 114, capacity now 120; after the notice teacher leaves 90 -> short by 24.",
    "advice": "Use Status_Till to simulate the timetable after a given date. Very high utilization is a good stress test: Max_Periods_Day limits may make it unsolvable.",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-15",
    "type": "Data quality",
    "category": "data_quality",
    "severity": "Low",
    "area": "Teacher names",
    "problem": "Two pairs of different teachers share the same full name (different IDs, different subjects).",
    "evidence": "T030 Rajesh Kumar, T037 Sunita Sharma, T041 Sunita Sharma, T093 Rajesh Kumar",
    "advice": "Always join on Teacher_ID, never on name. Show Teacher_ID or subject next to the name in the UI to avoid confusion.",
    "fixType": "disambiguate_names",
    "fixLabel": "\u26a1 Disambiguate Identical Staff Names with Dept Badges",
    "isResolved": false
  },
  {
    "id": "ISS-16",
    "type": "Availability",
    "category": "availability",
    "severity": "Medium",
    "area": "Part-time / visiting teachers",
    "problem": "Some teachers are only available on certain days and have a low weekly cap.",
    "evidence": "T017 Kavita Malhotra (PSY, Mon,Wed,Fri, max 15/wk, 5/day); T022 Renu Banerjee (CS, Mon,Wed,Fri, max 15/wk, 5/day); T067 Varsha Sinha (DAN, Mon,Wed,Fri, max 12/wk, 4/day); T092 Renu Joshi (MUS, Tue,Thu, max 10/wk, 5/day)",
    "advice": "Respect Working_Days and Max_Periods_Day. A subject with 2 periods/week spread over 6 days will clash with a Tue/Thu-only teacher.",
    "fixType": "lock_part_time_days",
    "fixLabel": "\u26a1 Lock Lessons to Visiting Teachers Active Days",
    "isResolved": false
  },
  {
    "id": "ISS-17",
    "type": "Configuration",
    "category": "shortage",
    "severity": "Medium",
    "area": "Different school week per wing",
    "problem": "Pre-Primary runs Mon-Fri with 6 periods/day (30 slots); Primary runs Mon-Sat with 7 periods (42 slots); Class 6-12 run Mon-Sat with 8 periods (48 slots). NTTs work Mon-Fri only.",
    "evidence": "Weekly slots are in Sections.Weekly_Slots; every section's requirements add up exactly to its weekly slots.",
    "advice": "Timetable grid size must change by section. Specialists (Art, Music, PE) work across wings with different bell schedules.",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-18",
    "type": "Configuration",
    "category": "shortage",
    "severity": "Low",
    "area": "Uneven sections",
    "problem": "Number of sections differs by class: Nursery 2, LKG 3, UKG 2, Class 1: 4, 2: 3, 3: 4, 4: 3, 5: 5, 6: 4, 7: 4, 8: 3, 9: 4, 10: 4, Class 11: 6 (3 streams), Class 12: 4.",
    "evidence": "55 sections in total. Class 12 has one PCM section while Class 11 has two; 11-E is small (22 students).",
    "advice": "Do not assume equal sections per class. Senior sections have stream-specific subjects (PCM / PCB / Commerce / Humanities).",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-19",
    "type": "Room",
    "category": "room",
    "severity": "High",
    "area": "Computer labs",
    "problem": "Two computer labs, but Computer periods across Class 1-12 need more lab slots than exist.",
    "evidence": "117 mandatory lab periods vs 96 slots (2 labs x 48). See Room_Check.",
    "advice": "Even with enough teachers, a clash-free timetable is impossible. The app should detect room shortage separately from teacher shortage.",
    "fixType": "add_computer_lab",
    "fixLabel": "\u26a1 Add Computer Lab 3 (Lab C-303, +48 slots)",
    "isResolved": false
  },
  {
    "id": "ISS-20",
    "type": "Room",
    "category": "room",
    "severity": "Medium",
    "area": "Science labs and ground",
    "problem": "Physics Lab 45/48 and Chemistry Lab 45/48 slots; Sports Ground 180/192 slots.",
    "evidence": "Utilization about 94% each. See Room_Check.",
    "advice": "Almost no slack: one extra section or one lost slot creates conflicts.",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-21",
    "type": "Room",
    "category": "room",
    "severity": "Medium",
    "area": "Overcrowded section",
    "problem": "Section 9-B has 48 students but its home room holds 45.",
    "evidence": "Home room of 9-B is C-102.",
    "advice": "Show a capacity warning when Sections.Strength > Rooms.Capacity_Students for the home room.",
    "fixType": "reassign_room_9b",
    "fixLabel": "\u26a1 Expand Room C-102 to 50 Desks (or Move 9-B)",
    "isResolved": false
  },
  {
    "id": "ISS-22",
    "type": "Constraint",
    "category": "constraint",
    "severity": "Medium",
    "area": "Double periods",
    "problem": "Practicals (Class 11-12 Physics, Chemistry, Biology, Computer; Class 3-10 Computer; Class 9-10 Science lab) need one double period per week (see Requirements.Double_Periods).",
    "evidence": "A double period cannot straddle the Short Break (after P3) or Lunch (after P6): valid pairs are P1-P2, P2-P3, P4-P5, P5-P6, P7-P8.",
    "advice": "Generator must place consecutive periods in the same lab and not across a break.",
    "fixType": "general_review",
    "fixLabel": "\u26a1 Review & Auto-Balance",
    "isResolved": false
  },
  {
    "id": "ISS-23",
    "type": "Constraint",
    "category": "constraint",
    "severity": "Low",
    "area": "Class teacher period",
    "problem": "Value Education / Circle Time must always be taken by the section's own class teacher (all 55 sections have one).",
    "evidence": "Class teacher of 11-C (T002 Madhu Sinha) is on leave - see ISS-02.",
    "advice": "Place the class-teacher period in a slot when that teacher is free; supply a substitute when the class teacher is unavailable.",
    "fixType": "fix_class_teacher_11c",
    "fixLabel": "\u26a1 Reassign 11-C Class Teacher to Active Senior Faculty",
    "isResolved": false
  }
];

export const GREENWOOD_ISSUES_SCHOOL_ID = 'greenwood-public-issues-testbed';

export function createGreenwoodIssuesSchool(): School {
  return {
    id: GREENWOOD_ISSUES_SCHOOL_ID,
    name: 'Greenwood Public School (Dataset 2 — Issues Testbed)',
    subdomain: 'greenwood-issues.chronos.edu',
    timezone: 'IST (UTC+5:30)',
    term: 'Academic Year 2026-27',
    published: false,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    rules: {
      primaryEndPeriod: 7,
      seniorEndPeriod: 8,
      maxTeacherPeriodsPerDay: 6,
      activityDay: 'Wednesday',
      activityPeriods: [7, 8],
      zeroPeriodLabel: 'Homeroom / Assembly',
      lunchAfterPeriod: 6,
    },
    timingConfig: {
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
    },
    periodSlots: GREENWOOD_PERIOD_SLOTS,
    classes: JSON.parse(JSON.stringify(GREENWOOD_SECTIONS)),
    rooms: JSON.parse(JSON.stringify(GREENWOOD_ROOMS)),
    subjects: JSON.parse(JSON.stringify(GREENWOOD_SUBJECTS)),
    teachers: JSON.parse(JSON.stringify(GREENWOOD_TEACHERS)),
    absences: [
      { id: 'abs-madhu', teacherId: 'T002', day: 'Monday', reason: 'Maternity Leave (until 31-Jan-2027)' }
    ],
    substitutions: {},
  };
}
