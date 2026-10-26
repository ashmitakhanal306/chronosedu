// GREENWOOD PUBLIC SCHOOL (DATASET 1 — CLEAN BASELINE PRESENTATION)
// Auto-generated from Test/School_Timetable_Dataset_1_Clean.xlsx
// Fully verified: 55 Sections, 106 Teachers, 71 Rooms, 25 Subjects, 587 Conflict-Free Assignments, 2,400 Scheduled Lessons.

import type { School, PeriodSlot, ClassSection, Room, Subject, Teacher, TeachingAssignment, TimetableEntry, ScheduleResult } from '../domain/types';

export const DEMO_SCHOOL_ID = 'a0000000-0000-0000-0000-000000000001';

export const GREENWOOD_CLEAN_PERIOD_SLOTS: PeriodSlot[] = [
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

export const GREENWOOD_CLEAN_SECTIONS: ClassSection[] = [
  {
    "id": "NUR-A",
    "name": "NUR-A",
    "grade": "Nursery",
    "tier": "Primary",
    "room": "A-101",
    "wing": "Pre-Primary",
    "stream": "General",
    "strength": 20,
    "classTeacherId": "T034",
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
    "classTeacherId": "T052",
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
    "classTeacherId": "T061",
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
    "classTeacherId": "T076",
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
    "classTeacherId": "T079",
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
    "classTeacherId": "T098",
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
    "classTeacherId": "T103",
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
    "classTeacherId": "T014",
    "classTeacherName": "Preeti Tandon",
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
    "classTeacherId": "T096",
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
    "classTeacherId": "T047",
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
    "classTeacherId": "T035",
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
    "id": "2-A",
    "name": "2-A",
    "grade": "Class 2",
    "tier": "Primary",
    "room": "A-204",
    "wing": "Primary",
    "stream": "General",
    "strength": 37,
    "classTeacherId": "T086",
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
    "classTeacherId": "T029",
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
    "classTeacherId": "T059",
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
    "classTeacherId": "T031",
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
    "classTeacherId": "T026",
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
    "classTeacherId": "T101",
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
    "id": "3-D",
    "name": "3-D",
    "grade": "Class 3",
    "tier": "Primary",
    "room": "B-104",
    "wing": "Primary",
    "stream": "General",
    "strength": 34,
    "classTeacherId": "T036",
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
    "classTeacherId": "T057",
    "classTeacherName": "Smita Bansal",
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
    "classTeacherId": "T058",
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
    "id": "4-C",
    "name": "4-C",
    "grade": "Class 4",
    "tier": "Primary",
    "room": "B-107",
    "wing": "Primary",
    "stream": "General",
    "strength": 30,
    "classTeacherId": "T060",
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
    "id": "5-A",
    "name": "5-A",
    "grade": "Class 5",
    "tier": "Primary",
    "room": "B-108",
    "wing": "Primary",
    "stream": "General",
    "strength": 37,
    "classTeacherId": "T102",
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
    "id": "5-B",
    "name": "5-B",
    "grade": "Class 5",
    "tier": "Primary",
    "room": "B-201",
    "wing": "Primary",
    "stream": "General",
    "strength": 35,
    "classTeacherId": "T037",
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
    "id": "5-C",
    "name": "5-C",
    "grade": "Class 5",
    "tier": "Primary",
    "room": "B-202",
    "wing": "Primary",
    "stream": "General",
    "strength": 33,
    "classTeacherId": "T062",
    "classTeacherName": "Aarti Pandey",
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
    "classTeacherId": "T106",
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
    "id": "5-E",
    "name": "5-E",
    "grade": "Class 5",
    "tier": "Primary",
    "room": "B-204",
    "wing": "Primary",
    "stream": "General",
    "strength": 34,
    "classTeacherId": "T023",
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
    "classTeacherId": "T033",
    "classTeacherName": "Radha Pandey",
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
    "classTeacherId": "T002",
    "classTeacherName": "Nisha Reddy",
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
    "classTeacherId": "T007",
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
    "classTeacherId": "T008",
    "classTeacherName": "Sunita Mehta",
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
    "classTeacherId": "T045",
    "classTeacherName": "Pankaj Khanna",
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
    "classTeacherId": "T006",
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
    "id": "7-C",
    "name": "7-C",
    "grade": "Class 7",
    "tier": "Senior",
    "room": "B-303",
    "wing": "Middle",
    "stream": "General",
    "strength": 39,
    "classTeacherId": "T091",
    "classTeacherName": "Meena Tiwari",
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
    "classTeacherId": "T049",
    "classTeacherName": "Isha Kumar",
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
    "classTeacherId": "T013",
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
    "id": "8-B",
    "name": "8-B",
    "grade": "Class 8",
    "tier": "Senior",
    "room": "B-306",
    "wing": "Middle",
    "stream": "General",
    "strength": 36,
    "classTeacherId": "T019",
    "classTeacherName": "Gopal Joshi",
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
    "classTeacherId": "T011",
    "classTeacherName": "Tarun Khanna",
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
    "classTeacherId": "T039",
    "classTeacherName": "Pallavi Walia",
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
    "strength": 40,
    "classTeacherId": "T069",
    "classTeacherName": "Rashmi Sharma",
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
    "classTeacherId": "T022",
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
    "id": "9-D",
    "name": "9-D",
    "grade": "Class 9",
    "tier": "Senior",
    "room": "C-104",
    "wing": "Secondary",
    "stream": "General",
    "strength": 38,
    "classTeacherId": "T072",
    "classTeacherName": "Meena Gill",
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
    "id": "10-B",
    "name": "10-B",
    "grade": "Class 10",
    "tier": "Senior",
    "room": "C-106",
    "wing": "Secondary",
    "stream": "General",
    "strength": 37,
    "classTeacherId": "T077",
    "classTeacherName": "Rachna Pandey",
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
    "classTeacherId": "T051",
    "classTeacherName": "Manju Tiwari",
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
    "classTeacherId": "T056",
    "classTeacherName": "Namrata Sinha",
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
    "classTeacherId": "T090",
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
    "classTeacherId": "T004",
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
    "classTeacherId": "T074",
    "classTeacherName": "Pankaj Reddy",
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
    "classTeacherId": "T001",
    "classTeacherName": "Pradeep Iyer",
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
    "strength": 39,
    "classTeacherId": "T042",
    "classTeacherName": "Bhavna Tiwari",
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
    "classTeacherId": "T025",
    "classTeacherName": "Seema Rawat",
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
    "classTeacherId": "T015",
    "classTeacherName": "Pankaj Iyer",
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
    "classTeacherId": "T081",
    "classTeacherName": "Rohit Aggarwal",
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
    "classTeacherId": "T075",
    "classTeacherName": "Garima Gupta",
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
    "classTeacherId": "T083",
    "classTeacherName": "Gunjan Banerjee",
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

export const GREENWOOD_CLEAN_ROOMS: Room[] = [
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
    "id": "CL-3",
    "name": "Computer Lab 3",
    "type": "computer_lab",
    "capacity": 40,
    "block": "B",
    "floor": 2,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "PL-1",
    "name": "Physics Lab 1",
    "type": "lab",
    "capacity": 40,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "PL-2",
    "name": "Physics Lab 2",
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
    "name": "Chemistry Lab 1",
    "type": "lab",
    "capacity": 40,
    "block": "C",
    "floor": 1,
    "parallelClasses": 1,
    "homeroomForClassId": null,
    "homeroomForClassName": null
  },
  {
    "id": "CH-2",
    "name": "Chemistry Lab 2",
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
    "id": "PG-2",
    "name": "Multipurpose Court",
    "type": "sports",
    "capacity": 80,
    "block": "-",
    "floor": 0,
    "parallelClasses": 2,
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

export const GREENWOOD_CLEAN_SUBJECTS: Subject[] = [
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
    "requiresDoublePeriod": false,
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
    "type": "activity",
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
    "type": "activity",
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
    "type": "activity",
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
    "type": "activity",
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
    "type": "activity",
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
    "type": "activity",
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

export const GREENWOOD_CLEAN_TEACHERS: Teacher[] = [
  {
    "id": "T001",
    "name": "Pradeep Iyer",
    "email": "pradeep.iyer@greenwood.edu",
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
    "id": "T002",
    "name": "Nisha Reddy",
    "email": "nisha.reddy@greenwood.edu",
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
    "classTeacherOf": "6-B"
  },
  {
    "id": "T003",
    "name": "Amit Iyer",
    "email": "amit.iyer@greenwood.edu",
    "subjects": [
      "ACC",
      "sub-acc"
    ],
    "maxPerDay": 4,
    "maxPerWeek": 18,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "ACC",
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
    "name": "Rajesh Chopra",
    "email": "rajesh.chopra@greenwood.edu",
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
    "id": "T005",
    "name": "Pradeep Malhotra",
    "email": "pradeep.malhotra@greenwood.edu",
    "subjects": [
      "PHY",
      "sub-phy"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 27,
    "unavailableDays": [],
    "gender": "M",
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
    "id": "T006",
    "name": "Aarti Banerjee",
    "email": "aarti.banerjee@greenwood.edu",
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
    "classTeacherOf": "7-B"
  },
  {
    "id": "T007",
    "name": "Radha Bansal",
    "email": "radha.bansal@greenwood.edu",
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
    "classTeacherOf": "6-C"
  },
  {
    "id": "T008",
    "name": "Sunita Mehta",
    "email": "sunita.mehta@greenwood.edu",
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
    "classTeacherOf": "6-D"
  },
  {
    "id": "T009",
    "name": "Manju Mukherjee",
    "email": "manju.mukherjee@greenwood.edu",
    "subjects": [
      "DAN",
      "sub-dan"
    ],
    "maxPerDay": 4,
    "maxPerWeek": 15,
    "unavailableDays": [],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "DAN",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary;Primary;Middle",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T010",
    "name": "Kamal Kapoor",
    "email": "kamal.kapoor@greenwood.edu",
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
    "id": "T011",
    "name": "Tarun Khanna",
    "email": "tarun.khanna@greenwood.edu",
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
    "classTeacherOf": "8-C"
  },
  {
    "id": "T012",
    "name": "Lata Pandey",
    "email": "lata.pandey@greenwood.edu",
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
    "id": "T013",
    "name": "Vivek Sharma",
    "email": "vivek.sharma@greenwood.edu",
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
    "classTeacherOf": "8-A"
  },
  {
    "id": "T014",
    "name": "Preeti Tandon",
    "email": "preeti.tandon@greenwood.edu",
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
    "classTeacherOf": "1-A"
  },
  {
    "id": "T015",
    "name": "Pankaj Iyer",
    "email": "pankaj.iyer@greenwood.edu",
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
    "id": "T016",
    "name": "Amit Dubey",
    "email": "amit.dubey@greenwood.edu",
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
    "id": "T017",
    "name": "Kamal Tiwari",
    "email": "kamal.tiwari@greenwood.edu",
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
    "id": "T018",
    "name": "Ekta Jain",
    "email": "ekta.jain@greenwood.edu",
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
    "id": "T019",
    "name": "Gopal Joshi",
    "email": "gopal.joshi@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng",
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "ENG",
    "secondarySubject": "SST",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "8-B"
  },
  {
    "id": "T020",
    "name": "Renu Banerjee",
    "email": "renu.banerjee@greenwood.edu",
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
    "id": "T021",
    "name": "Rohit Jain",
    "email": "rohit.jain@greenwood.edu",
    "subjects": [
      "PHY",
      "sub-phy"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 27,
    "unavailableDays": [],
    "gender": "M",
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
    "id": "T022",
    "name": "Poonam Thakur",
    "email": "poonam.thakur@greenwood.edu",
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
    "id": "T023",
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
    "classTeacherOf": "5-E"
  },
  {
    "id": "T024",
    "name": "Nitin Aggarwal",
    "email": "nitin.aggarwal@greenwood.edu",
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
    "id": "T025",
    "name": "Seema Rawat",
    "email": "seema.rawat@greenwood.edu",
    "subjects": [
      "HIS",
      "sub-his",
      "POL",
      "sub-pol"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "F",
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
    "id": "T026",
    "name": "Vinod Ghosh",
    "email": "vinod.ghosh@greenwood.edu",
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
    "classTeacherOf": "3-B"
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
    "classTeacherOf": "10-A"
  },
  {
    "id": "T028",
    "name": "Tanvi Gill",
    "email": "tanvi.gill@greenwood.edu",
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
    "classTeacherOf": null
  },
  {
    "id": "T029",
    "name": "Rachna Tandon",
    "email": "rachna.tandon@greenwood.edu",
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
    "classTeacherOf": "2-B"
  },
  {
    "id": "T030",
    "name": "Rajesh Sinha",
    "email": "rajesh.sinha@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PGT",
    "primarySubject": "MAT",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T031",
    "name": "Sapna Bedi",
    "email": "sapna.bedi@greenwood.edu",
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
    "classTeacherOf": "3-A"
  },
  {
    "id": "T032",
    "name": "Swati Sandhu",
    "email": "swati.sandhu@greenwood.edu",
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
    "id": "T033",
    "name": "Radha Pandey",
    "email": "radha.pandey@greenwood.edu",
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
    "classTeacherOf": "6-A"
  },
  {
    "id": "T034",
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
    "unavailableDays": [],
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
    "id": "T035",
    "name": "Preeti Bisht",
    "email": "preeti.bisht@greenwood.edu",
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
    "id": "T036",
    "name": "Pooja Bisht",
    "email": "pooja.bisht@greenwood.edu",
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
    "id": "T037",
    "name": "Divya Sharma",
    "email": "divya.sharma@greenwood.edu",
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
    "classTeacherOf": "5-B"
  },
  {
    "id": "T038",
    "name": "Meena Khanna",
    "email": "meena.khanna@greenwood.edu",
    "subjects": [
      "MUS",
      "sub-mus"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "MUS",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary;Primary;Middle",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T039",
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
    "classTeacherOf": "9-A"
  },
  {
    "id": "T040",
    "name": "Rachna Grover",
    "email": "rachna.grover@greenwood.edu",
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
    "id": "T041",
    "name": "Aarti Thakur",
    "email": "aarti.thakur@greenwood.edu",
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
    "id": "T042",
    "name": "Bhavna Tiwari",
    "email": "bhavna.tiwari@greenwood.edu",
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
    "id": "T043",
    "name": "Dinesh Mishra",
    "email": "dinesh.mishra@greenwood.edu",
    "subjects": [
      "BST",
      "sub-bst"
    ],
    "maxPerDay": 4,
    "maxPerWeek": 16,
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
    "classTeacherOf": null
  },
  {
    "id": "T044",
    "name": "Umesh Ghosh",
    "email": "umesh.ghosh@greenwood.edu",
    "subjects": [
      "CS",
      "sub-cs"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
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
    "id": "T045",
    "name": "Pankaj Khanna",
    "email": "pankaj.khanna@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "SAN",
      "sub-san"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "HIN",
    "secondarySubject": "SAN",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "7-A"
  },
  {
    "id": "T046",
    "name": "Lalit Joshi",
    "email": "lalit.joshi@greenwood.edu",
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
    "id": "T047",
    "name": "Anita Kohli",
    "email": "anita.kohli@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "SCI",
      "sub-sci"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PRT",
    "primarySubject": "HIN",
    "secondarySubject": "SCI",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "1-C"
  },
  {
    "id": "T048",
    "name": "Hemant Aggarwal",
    "email": "hemant.aggarwal@greenwood.edu",
    "subjects": [
      "GEO",
      "sub-geo"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "M",
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
    "id": "T049",
    "name": "Isha Kumar",
    "email": "isha.kumar@greenwood.edu",
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
    "classTeacherOf": "7-D"
  },
  {
    "id": "T050",
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
    "id": "T051",
    "name": "Manju Tiwari",
    "email": "manju.tiwari@greenwood.edu",
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
    "classTeacherOf": "10-C"
  },
  {
    "id": "T052",
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
    "unavailableDays": [],
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
    "id": "T053",
    "name": "Nitin Tandon",
    "email": "nitin.tandon@greenwood.edu",
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
    "id": "T054",
    "name": "Umesh Verma",
    "email": "umesh.verma@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst",
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "SST",
    "secondarySubject": "ENG",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T055",
    "name": "Vivek Gill",
    "email": "vivek.gill@greenwood.edu",
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
    "id": "T056",
    "name": "Namrata Sinha",
    "email": "namrata.sinha@greenwood.edu",
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
    "classTeacherOf": "10-D"
  },
  {
    "id": "T057",
    "name": "Smita Bansal",
    "email": "smita.bansal@greenwood.edu",
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
    "classTeacherOf": "4-A"
  },
  {
    "id": "T058",
    "name": "Payal Arora",
    "email": "payal.arora@greenwood.edu",
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
    "classTeacherOf": "4-B"
  },
  {
    "id": "T059",
    "name": "Anita Sharma",
    "email": "anita.sharma@greenwood.edu",
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
    "designation": "PRT",
    "primarySubject": "MAT",
    "secondarySubject": "CS",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "2-C"
  },
  {
    "id": "T060",
    "name": "Sunita Chauhan",
    "email": "sunita.chauhan@greenwood.edu",
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
    "classTeacherOf": "4-C"
  },
  {
    "id": "T061",
    "name": "Jyoti Nair",
    "email": "jyoti.nair@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [],
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
    "id": "T062",
    "name": "Aarti Pandey",
    "email": "aarti.pandey@greenwood.edu",
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
    "designation": "PRT",
    "primarySubject": "SCI",
    "secondarySubject": "MAT",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": "5-C"
  },
  {
    "id": "T063",
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
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T064",
    "name": "Mamta Gupta",
    "email": "mamta.gupta@greenwood.edu",
    "subjects": [
      "PSY",
      "sub-psy"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 18,
    "unavailableDays": [],
    "gender": "F",
    "designation": "PGT",
    "primarySubject": "PSY",
    "secondarySubject": null,
    "teachingWings": "Senior Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T065",
    "name": "Anita Tandon",
    "email": "anita.tandon@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 4,
    "maxPerWeek": 14,
    "unavailableDays": [],
    "gender": "F",
    "designation": "NTT",
    "primarySubject": "HIN",
    "secondarySubject": null,
    "teachingWings": "Pre-Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Fri",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T066",
    "name": "Rashmi Ghosh",
    "email": "rashmi.ghosh@greenwood.edu",
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
    "id": "T067",
    "name": "Anil Walia",
    "email": "anil.walia@greenwood.edu",
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
    "id": "T068",
    "name": "Divya Saxena",
    "email": "divya.saxena@greenwood.edu",
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
    "id": "T069",
    "name": "Rashmi Sharma",
    "email": "rashmi.sharma@greenwood.edu",
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
    "classTeacherOf": "9-B"
  },
  {
    "id": "T070",
    "name": "Ashok Kohli",
    "email": "ashok.kohli@greenwood.edu",
    "subjects": [
      "LIB",
      "sub-lib"
    ],
    "maxPerDay": 4,
    "maxPerWeek": 16,
    "unavailableDays": [],
    "gender": "M",
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
    "id": "T071",
    "name": "Nidhi Tiwari",
    "email": "nidhi.tiwari@greenwood.edu",
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
    "id": "T072",
    "name": "Meena Gill",
    "email": "meena.gill@greenwood.edu",
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
    "classTeacherOf": "9-D"
  },
  {
    "id": "T073",
    "name": "Shweta Bhatia",
    "email": "shweta.bhatia@greenwood.edu",
    "subjects": [
      "ECO",
      "sub-eco",
      "BST",
      "sub-bst"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "F",
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
    "id": "T074",
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
    "classTeacherOf": "11-C"
  },
  {
    "id": "T075",
    "name": "Garima Gupta",
    "email": "garima.gupta@greenwood.edu",
    "subjects": [
      "BST",
      "sub-bst"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 26,
    "unavailableDays": [],
    "gender": "F",
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
    "id": "T076",
    "name": "Harleen Pandey",
    "email": "harleen.pandey@greenwood.edu",
    "subjects": [
      "ENG",
      "sub-eng"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [],
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
    "id": "T077",
    "name": "Rachna Pandey",
    "email": "rachna.pandey@greenwood.edu",
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
    "classTeacherOf": "10-B"
  },
  {
    "id": "T078",
    "name": "Suman Nair",
    "email": "suman.nair@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
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
    "id": "T079",
    "name": "Garima Malhotra",
    "email": "garima.malhotra@greenwood.edu",
    "subjects": [
      "MAT",
      "sub-mat"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 28,
    "unavailableDays": [],
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
    "id": "T080",
    "name": "Tarun Iyer",
    "email": "tarun.iyer@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin",
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
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
    "id": "T081",
    "name": "Rohit Aggarwal",
    "email": "rohit.aggarwal@greenwood.edu",
    "subjects": [
      "CHE",
      "sub-che"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 27,
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
    "id": "T082",
    "name": "Vikram Chopra",
    "email": "vikram.chopra@greenwood.edu",
    "subjects": [
      "EVS",
      "sub-evs",
      "SST",
      "sub-sst"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 20,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PRT",
    "primarySubject": "EVS",
    "secondarySubject": "SST",
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T083",
    "name": "Gunjan Banerjee",
    "email": "gunjan.banerjee@greenwood.edu",
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
    "id": "T084",
    "name": "Kapil Nair",
    "email": "kapil.nair@greenwood.edu",
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
    "id": "T085",
    "name": "Harleen Anand",
    "email": "harleen.anand@greenwood.edu",
    "subjects": [
      "DAN",
      "sub-dan",
      "MUS",
      "sub-mus"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "Specialist",
    "primarySubject": "DAN",
    "secondarySubject": "MUS",
    "teachingWings": "Primary;Middle",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T086",
    "name": "Ekta Bhatia",
    "email": "ekta.bhatia@greenwood.edu",
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
    "classTeacherOf": "2-A"
  },
  {
    "id": "T087",
    "name": "Vandana Banerjee",
    "email": "vandana.banerjee@greenwood.edu",
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
    "id": "T088",
    "name": "Lalit Bansal",
    "email": "lalit.bansal@greenwood.edu",
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
    "id": "T089",
    "name": "Rakesh Bhatia",
    "email": "rakesh.bhatia@greenwood.edu",
    "subjects": [
      "SST",
      "sub-sst",
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "TGT",
    "primarySubject": "SST",
    "secondarySubject": "HIN",
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T090",
    "name": "Bhavna Tandon",
    "email": "bhavna.tandon@greenwood.edu",
    "subjects": [
      "CHE",
      "sub-che"
    ],
    "maxPerDay": 5,
    "maxPerWeek": 27,
    "unavailableDays": [],
    "gender": "F",
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
    "id": "T091",
    "name": "Meena Tiwari",
    "email": "meena.tiwari@greenwood.edu",
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
    "classTeacherOf": "7-C"
  },
  {
    "id": "T092",
    "name": "Mohit Bhatia",
    "email": "mohit.bhatia@greenwood.edu",
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
    "classTeacherOf": null
  },
  {
    "id": "T093",
    "name": "Ritu Khanna",
    "email": "ritu.khanna@greenwood.edu",
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
    "id": "T094",
    "name": "Lalit Anand",
    "email": "lalit.anand@greenwood.edu",
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
    "id": "T095",
    "name": "Anita Ghosh",
    "email": "anita.ghosh@greenwood.edu",
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
    "id": "T096",
    "name": "Shalini Mehta",
    "email": "shalini.mehta@greenwood.edu",
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
    "classTeacherOf": "1-B"
  },
  {
    "id": "T097",
    "name": "Aarti Walia",
    "email": "aarti.walia@greenwood.edu",
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
    "classTeacherOf": null
  },
  {
    "id": "T098",
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
    "unavailableDays": [],
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
    "id": "T099",
    "name": "Harish Rastogi",
    "email": "harish.rastogi@greenwood.edu",
    "subjects": [
      "HIN",
      "sub-hin"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "M",
    "designation": "PRT",
    "primarySubject": "HIN",
    "secondarySubject": null,
    "teachingWings": "Primary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T100",
    "name": "Rekha Mukherjee",
    "email": "rekha.mukherjee@greenwood.edu",
    "subjects": [
      "SAN",
      "sub-san"
    ],
    "maxPerDay": 6,
    "maxPerWeek": 30,
    "unavailableDays": [],
    "gender": "F",
    "designation": "TGT",
    "primarySubject": "SAN",
    "secondarySubject": null,
    "teachingWings": "Middle;Secondary",
    "employmentType": "Full-time",
    "workingDays": "Mon-Sat",
    "status": "Active",
    "statusTill": null,
    "classTeacherOf": null
  },
  {
    "id": "T101",
    "name": "Preeti Walia",
    "email": "preeti.walia@greenwood.edu",
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
    "classTeacherOf": "3-C"
  },
  {
    "id": "T102",
    "name": "Savita Mehta",
    "email": "savita.mehta@greenwood.edu",
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
    "classTeacherOf": "5-A"
  },
  {
    "id": "T103",
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
    "unavailableDays": [],
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
    "id": "T104",
    "name": "Naveen Verma",
    "email": "naveen.verma@greenwood.edu",
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
    "id": "T105",
    "name": "Ramesh Mukherjee",
    "email": "ramesh.mukherjee@greenwood.edu",
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
    "id": "T106",
    "name": "Archana Malhotra",
    "email": "archana.malhotra@greenwood.edu",
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
    "classTeacherOf": "5-D"
  }
];

export const GREENWOOD_CLEAN_ASSIGNMENTS: TeachingAssignment[] = [
  {
    "id": "asgn-1",
    "classId": "NUR-A",
    "subjectId": "ENG",
    "teacherId": "T034",
    "className": "NUR-A",
    "subjectName": "English",
    "teacherName": "Ruchi Ghosh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-2",
    "classId": "NUR-A",
    "subjectId": "HIN",
    "teacherId": "T034",
    "className": "NUR-A",
    "subjectName": "Hindi",
    "teacherName": "Ruchi Ghosh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-3",
    "classId": "NUR-A",
    "subjectId": "MAT",
    "teacherId": "T034",
    "className": "NUR-A",
    "subjectName": "Mathematics",
    "teacherName": "Ruchi Ghosh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-4",
    "classId": "NUR-A",
    "subjectId": "EVS",
    "teacherId": "T034",
    "className": "NUR-A",
    "subjectName": "Environmental Studies",
    "teacherName": "Ruchi Ghosh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-5",
    "classId": "NUR-A",
    "subjectId": "RHY",
    "teacherId": "T034",
    "className": "NUR-A",
    "subjectName": "Rhymes & Storytelling",
    "teacherName": "Ruchi Ghosh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-6",
    "classId": "NUR-A",
    "subjectId": "ART",
    "teacherId": "T104",
    "className": "NUR-A",
    "subjectName": "Art & Craft",
    "teacherName": "Naveen Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-7",
    "classId": "NUR-A",
    "subjectId": "MUS",
    "teacherId": "T105",
    "className": "NUR-A",
    "subjectName": "Music",
    "teacherName": "Ramesh Mukherjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-8",
    "classId": "NUR-A",
    "subjectId": "PE",
    "teacherId": "T094",
    "className": "NUR-A",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-9",
    "classId": "NUR-A",
    "subjectId": "VE",
    "teacherId": "T034",
    "className": "NUR-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Ruchi Ghosh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-10",
    "classId": "NUR-B",
    "subjectId": "ENG",
    "teacherId": "T052",
    "className": "NUR-B",
    "subjectName": "English",
    "teacherName": "Garima Tandon",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-11",
    "classId": "NUR-B",
    "subjectId": "HIN",
    "teacherId": "T052",
    "className": "NUR-B",
    "subjectName": "Hindi",
    "teacherName": "Garima Tandon",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-12",
    "classId": "NUR-B",
    "subjectId": "MAT",
    "teacherId": "T052",
    "className": "NUR-B",
    "subjectName": "Mathematics",
    "teacherName": "Garima Tandon",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-13",
    "classId": "NUR-B",
    "subjectId": "EVS",
    "teacherId": "T052",
    "className": "NUR-B",
    "subjectName": "Environmental Studies",
    "teacherName": "Garima Tandon",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-14",
    "classId": "NUR-B",
    "subjectId": "RHY",
    "teacherId": "T052",
    "className": "NUR-B",
    "subjectName": "Rhymes & Storytelling",
    "teacherName": "Garima Tandon",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-15",
    "classId": "NUR-B",
    "subjectId": "ART",
    "teacherId": "T104",
    "className": "NUR-B",
    "subjectName": "Art & Craft",
    "teacherName": "Naveen Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-16",
    "classId": "NUR-B",
    "subjectId": "MUS",
    "teacherId": "T105",
    "className": "NUR-B",
    "subjectName": "Music",
    "teacherName": "Ramesh Mukherjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-17",
    "classId": "NUR-B",
    "subjectId": "PE",
    "teacherId": "T088",
    "className": "NUR-B",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-18",
    "classId": "NUR-B",
    "subjectId": "VE",
    "teacherId": "T052",
    "className": "NUR-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Garima Tandon",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-19",
    "classId": "LKG-A",
    "subjectId": "ENG",
    "teacherId": "T061",
    "className": "LKG-A",
    "subjectName": "English",
    "teacherName": "Jyoti Nair",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-20",
    "classId": "LKG-A",
    "subjectId": "HIN",
    "teacherId": "T061",
    "className": "LKG-A",
    "subjectName": "Hindi",
    "teacherName": "Jyoti Nair",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-21",
    "classId": "LKG-A",
    "subjectId": "MAT",
    "teacherId": "T061",
    "className": "LKG-A",
    "subjectName": "Mathematics",
    "teacherName": "Jyoti Nair",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-22",
    "classId": "LKG-A",
    "subjectId": "EVS",
    "teacherId": "T061",
    "className": "LKG-A",
    "subjectName": "Environmental Studies",
    "teacherName": "Jyoti Nair",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-23",
    "classId": "LKG-A",
    "subjectId": "RHY",
    "teacherId": "T061",
    "className": "LKG-A",
    "subjectName": "Rhymes & Storytelling",
    "teacherName": "Jyoti Nair",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-24",
    "classId": "LKG-A",
    "subjectId": "ART",
    "teacherId": "T104",
    "className": "LKG-A",
    "subjectName": "Art & Craft",
    "teacherName": "Naveen Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-25",
    "classId": "LKG-A",
    "subjectId": "MUS",
    "teacherId": "T105",
    "className": "LKG-A",
    "subjectName": "Music",
    "teacherName": "Ramesh Mukherjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-26",
    "classId": "LKG-A",
    "subjectId": "PE",
    "teacherId": "T088",
    "className": "LKG-A",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-27",
    "classId": "LKG-A",
    "subjectId": "VE",
    "teacherId": "T061",
    "className": "LKG-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Jyoti Nair",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-28",
    "classId": "LKG-B",
    "subjectId": "ENG",
    "teacherId": "T076",
    "className": "LKG-B",
    "subjectName": "English",
    "teacherName": "Harleen Pandey",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-29",
    "classId": "LKG-B",
    "subjectId": "HIN",
    "teacherId": "T076",
    "className": "LKG-B",
    "subjectName": "Hindi",
    "teacherName": "Harleen Pandey",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-30",
    "classId": "LKG-B",
    "subjectId": "MAT",
    "teacherId": "T076",
    "className": "LKG-B",
    "subjectName": "Mathematics",
    "teacherName": "Harleen Pandey",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-31",
    "classId": "LKG-B",
    "subjectId": "EVS",
    "teacherId": "T076",
    "className": "LKG-B",
    "subjectName": "Environmental Studies",
    "teacherName": "Harleen Pandey",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-32",
    "classId": "LKG-B",
    "subjectId": "RHY",
    "teacherId": "T076",
    "className": "LKG-B",
    "subjectName": "Rhymes & Storytelling",
    "teacherName": "Harleen Pandey",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-33",
    "classId": "LKG-B",
    "subjectId": "ART",
    "teacherId": "T104",
    "className": "LKG-B",
    "subjectName": "Art & Craft",
    "teacherName": "Naveen Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-34",
    "classId": "LKG-B",
    "subjectId": "MUS",
    "teacherId": "T105",
    "className": "LKG-B",
    "subjectName": "Music",
    "teacherName": "Ramesh Mukherjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-35",
    "classId": "LKG-B",
    "subjectId": "PE",
    "teacherId": "T088",
    "className": "LKG-B",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-36",
    "classId": "LKG-B",
    "subjectId": "VE",
    "teacherId": "T076",
    "className": "LKG-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Harleen Pandey",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-37",
    "classId": "LKG-C",
    "subjectId": "ENG",
    "teacherId": "T079",
    "className": "LKG-C",
    "subjectName": "English",
    "teacherName": "Garima Malhotra",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-38",
    "classId": "LKG-C",
    "subjectId": "HIN",
    "teacherId": "T079",
    "className": "LKG-C",
    "subjectName": "Hindi",
    "teacherName": "Garima Malhotra",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-39",
    "classId": "LKG-C",
    "subjectId": "MAT",
    "teacherId": "T079",
    "className": "LKG-C",
    "subjectName": "Mathematics",
    "teacherName": "Garima Malhotra",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-40",
    "classId": "LKG-C",
    "subjectId": "EVS",
    "teacherId": "T079",
    "className": "LKG-C",
    "subjectName": "Environmental Studies",
    "teacherName": "Garima Malhotra",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-41",
    "classId": "LKG-C",
    "subjectId": "RHY",
    "teacherId": "T079",
    "className": "LKG-C",
    "subjectName": "Rhymes & Storytelling",
    "teacherName": "Garima Malhotra",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-42",
    "classId": "LKG-C",
    "subjectId": "ART",
    "teacherId": "T104",
    "className": "LKG-C",
    "subjectName": "Art & Craft",
    "teacherName": "Naveen Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-43",
    "classId": "LKG-C",
    "subjectId": "MUS",
    "teacherId": "T085",
    "className": "LKG-C",
    "subjectName": "Music",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-44",
    "classId": "LKG-C",
    "subjectId": "PE",
    "teacherId": "T088",
    "className": "LKG-C",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-45",
    "classId": "LKG-C",
    "subjectId": "VE",
    "teacherId": "T079",
    "className": "LKG-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Garima Malhotra",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-46",
    "classId": "UKG-A",
    "subjectId": "ENG",
    "teacherId": "T098",
    "className": "UKG-A",
    "subjectName": "English",
    "teacherName": "Tanvi Mukherjee",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-47",
    "classId": "UKG-A",
    "subjectId": "HIN",
    "teacherId": "T098",
    "className": "UKG-A",
    "subjectName": "Hindi",
    "teacherName": "Tanvi Mukherjee",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-48",
    "classId": "UKG-A",
    "subjectId": "MAT",
    "teacherId": "T098",
    "className": "UKG-A",
    "subjectName": "Mathematics",
    "teacherName": "Tanvi Mukherjee",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-49",
    "classId": "UKG-A",
    "subjectId": "EVS",
    "teacherId": "T098",
    "className": "UKG-A",
    "subjectName": "Environmental Studies",
    "teacherName": "Tanvi Mukherjee",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-50",
    "classId": "UKG-A",
    "subjectId": "RHY",
    "teacherId": "T098",
    "className": "UKG-A",
    "subjectName": "Rhymes & Storytelling",
    "teacherName": "Tanvi Mukherjee",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-51",
    "classId": "UKG-A",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "UKG-A",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-52",
    "classId": "UKG-A",
    "subjectId": "MUS",
    "teacherId": "T085",
    "className": "UKG-A",
    "subjectName": "Music",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-53",
    "classId": "UKG-A",
    "subjectId": "PE",
    "teacherId": "T088",
    "className": "UKG-A",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-54",
    "classId": "UKG-A",
    "subjectId": "VE",
    "teacherId": "T098",
    "className": "UKG-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Tanvi Mukherjee",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-55",
    "classId": "UKG-B",
    "subjectId": "ENG",
    "teacherId": "T103",
    "className": "UKG-B",
    "subjectName": "English",
    "teacherName": "Chitra Singh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-56",
    "classId": "UKG-B",
    "subjectId": "HIN",
    "teacherId": "T103",
    "className": "UKG-B",
    "subjectName": "Hindi",
    "teacherName": "Chitra Singh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-57",
    "classId": "UKG-B",
    "subjectId": "MAT",
    "teacherId": "T103",
    "className": "UKG-B",
    "subjectName": "Mathematics",
    "teacherName": "Chitra Singh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-58",
    "classId": "UKG-B",
    "subjectId": "EVS",
    "teacherId": "T103",
    "className": "UKG-B",
    "subjectName": "Environmental Studies",
    "teacherName": "Chitra Singh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-59",
    "classId": "UKG-B",
    "subjectId": "RHY",
    "teacherId": "T103",
    "className": "UKG-B",
    "subjectName": "Rhymes & Storytelling",
    "teacherName": "Chitra Singh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-60",
    "classId": "UKG-B",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "UKG-B",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-61",
    "classId": "UKG-B",
    "subjectId": "MUS",
    "teacherId": "T085",
    "className": "UKG-B",
    "subjectName": "Music",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-62",
    "classId": "UKG-B",
    "subjectId": "PE",
    "teacherId": "T088",
    "className": "UKG-B",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-63",
    "classId": "UKG-B",
    "subjectId": "VE",
    "teacherId": "T103",
    "className": "UKG-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Chitra Singh",
    "teacherWeeklyLoad": 28,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-64",
    "classId": "1-A",
    "subjectId": "ENG",
    "teacherId": "T102",
    "className": "1-A",
    "subjectName": "English",
    "teacherName": "Savita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-65",
    "classId": "1-A",
    "subjectId": "HIN",
    "teacherId": "T095",
    "className": "1-A",
    "subjectName": "Hindi",
    "teacherName": "Anita Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-66",
    "classId": "1-A",
    "subjectId": "MAT",
    "teacherId": "T106",
    "className": "1-A",
    "subjectName": "Mathematics",
    "teacherName": "Archana Malhotra",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-67",
    "classId": "1-A",
    "subjectId": "EVS",
    "teacherId": "T014",
    "className": "1-A",
    "subjectName": "Environmental Studies",
    "teacherName": "Preeti Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-68",
    "classId": "1-A",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "1-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-69",
    "classId": "1-A",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "1-A",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-70",
    "classId": "1-A",
    "subjectId": "MUS",
    "teacherId": "T085",
    "className": "1-A",
    "subjectName": "Music",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-71",
    "classId": "1-A",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "1-A",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-72",
    "classId": "1-A",
    "subjectId": "PE",
    "teacherId": "T088",
    "className": "1-A",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-73",
    "classId": "1-A",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "1-A",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-74",
    "classId": "1-A",
    "subjectId": "VE",
    "teacherId": "T014",
    "className": "1-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Preeti Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-75",
    "classId": "1-B",
    "subjectId": "ENG",
    "teacherId": "T096",
    "className": "1-B",
    "subjectName": "English",
    "teacherName": "Shalini Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-76",
    "classId": "1-B",
    "subjectId": "HIN",
    "teacherId": "T096",
    "className": "1-B",
    "subjectName": "Hindi",
    "teacherName": "Shalini Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-77",
    "classId": "1-B",
    "subjectId": "MAT",
    "teacherId": "T106",
    "className": "1-B",
    "subjectName": "Mathematics",
    "teacherName": "Archana Malhotra",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-78",
    "classId": "1-B",
    "subjectId": "EVS",
    "teacherId": "T087",
    "className": "1-B",
    "subjectName": "Environmental Studies",
    "teacherName": "Vandana Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-79",
    "classId": "1-B",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "1-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-80",
    "classId": "1-B",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "1-B",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-81",
    "classId": "1-B",
    "subjectId": "MUS",
    "teacherId": "T085",
    "className": "1-B",
    "subjectName": "Music",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-82",
    "classId": "1-B",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "1-B",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-83",
    "classId": "1-B",
    "subjectId": "PE",
    "teacherId": "T088",
    "className": "1-B",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-84",
    "classId": "1-B",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "1-B",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-85",
    "classId": "1-B",
    "subjectId": "VE",
    "teacherId": "T096",
    "className": "1-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Shalini Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-86",
    "classId": "1-C",
    "subjectId": "ENG",
    "teacherId": "T102",
    "className": "1-C",
    "subjectName": "English",
    "teacherName": "Savita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-87",
    "classId": "1-C",
    "subjectId": "HIN",
    "teacherId": "T047",
    "className": "1-C",
    "subjectName": "Hindi",
    "teacherName": "Anita Kohli",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-88",
    "classId": "1-C",
    "subjectId": "MAT",
    "teacherId": "T062",
    "className": "1-C",
    "subjectName": "Mathematics",
    "teacherName": "Aarti Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-89",
    "classId": "1-C",
    "subjectId": "EVS",
    "teacherId": "T087",
    "className": "1-C",
    "subjectName": "Environmental Studies",
    "teacherName": "Vandana Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-90",
    "classId": "1-C",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "1-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-91",
    "classId": "1-C",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "1-C",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-92",
    "classId": "1-C",
    "subjectId": "MUS",
    "teacherId": "T085",
    "className": "1-C",
    "subjectName": "Music",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-93",
    "classId": "1-C",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "1-C",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-94",
    "classId": "1-C",
    "subjectId": "PE",
    "teacherId": "T088",
    "className": "1-C",
    "subjectName": "Physical Education",
    "teacherName": "Lalit Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-95",
    "classId": "1-C",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "1-C",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-96",
    "classId": "1-C",
    "subjectId": "VE",
    "teacherId": "T047",
    "className": "1-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Anita Kohli",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-97",
    "classId": "1-D",
    "subjectId": "ENG",
    "teacherId": "T101",
    "className": "1-D",
    "subjectName": "English",
    "teacherName": "Preeti Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-98",
    "classId": "1-D",
    "subjectId": "HIN",
    "teacherId": "T095",
    "className": "1-D",
    "subjectName": "Hindi",
    "teacherName": "Anita Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-99",
    "classId": "1-D",
    "subjectId": "MAT",
    "teacherId": "T035",
    "className": "1-D",
    "subjectName": "Mathematics",
    "teacherName": "Preeti Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-100",
    "classId": "1-D",
    "subjectId": "EVS",
    "teacherId": "T037",
    "className": "1-D",
    "subjectName": "Environmental Studies",
    "teacherName": "Divya Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-101",
    "classId": "1-D",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "1-D",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-102",
    "classId": "1-D",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "1-D",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-103",
    "classId": "1-D",
    "subjectId": "MUS",
    "teacherId": "T085",
    "className": "1-D",
    "subjectName": "Music",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-104",
    "classId": "1-D",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "1-D",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-105",
    "classId": "1-D",
    "subjectId": "PE",
    "teacherId": "T084",
    "className": "1-D",
    "subjectName": "Physical Education",
    "teacherName": "Kapil Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-106",
    "classId": "1-D",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "1-D",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-107",
    "classId": "1-D",
    "subjectId": "VE",
    "teacherId": "T035",
    "className": "1-D",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Preeti Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-108",
    "classId": "2-A",
    "subjectId": "ENG",
    "teacherId": "T101",
    "className": "2-A",
    "subjectName": "English",
    "teacherName": "Preeti Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-109",
    "classId": "2-A",
    "subjectId": "HIN",
    "teacherId": "T086",
    "className": "2-A",
    "subjectName": "Hindi",
    "teacherName": "Ekta Bhatia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-110",
    "classId": "2-A",
    "subjectId": "MAT",
    "teacherId": "T062",
    "className": "2-A",
    "subjectName": "Mathematics",
    "teacherName": "Aarti Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-111",
    "classId": "2-A",
    "subjectId": "EVS",
    "teacherId": "T037",
    "className": "2-A",
    "subjectName": "Environmental Studies",
    "teacherName": "Divya Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-112",
    "classId": "2-A",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "2-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-113",
    "classId": "2-A",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "2-A",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-114",
    "classId": "2-A",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "2-A",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-115",
    "classId": "2-A",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "2-A",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-116",
    "classId": "2-A",
    "subjectId": "PE",
    "teacherId": "T084",
    "className": "2-A",
    "subjectName": "Physical Education",
    "teacherName": "Kapil Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-117",
    "classId": "2-A",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "2-A",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-118",
    "classId": "2-A",
    "subjectId": "VE",
    "teacherId": "T086",
    "className": "2-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Ekta Bhatia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-119",
    "classId": "2-B",
    "subjectId": "ENG",
    "teacherId": "T029",
    "className": "2-B",
    "subjectName": "English",
    "teacherName": "Rachna Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-120",
    "classId": "2-B",
    "subjectId": "HIN",
    "teacherId": "T029",
    "className": "2-B",
    "subjectName": "Hindi",
    "teacherName": "Rachna Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-121",
    "classId": "2-B",
    "subjectId": "MAT",
    "teacherId": "T059",
    "className": "2-B",
    "subjectName": "Mathematics",
    "teacherName": "Anita Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-122",
    "classId": "2-B",
    "subjectId": "EVS",
    "teacherId": "T037",
    "className": "2-B",
    "subjectName": "Environmental Studies",
    "teacherName": "Divya Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-123",
    "classId": "2-B",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "2-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-124",
    "classId": "2-B",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "2-B",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-125",
    "classId": "2-B",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "2-B",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-126",
    "classId": "2-B",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "2-B",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-127",
    "classId": "2-B",
    "subjectId": "PE",
    "teacherId": "T084",
    "className": "2-B",
    "subjectName": "Physical Education",
    "teacherName": "Kapil Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-128",
    "classId": "2-B",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "2-B",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-129",
    "classId": "2-B",
    "subjectId": "VE",
    "teacherId": "T029",
    "className": "2-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Rachna Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-130",
    "classId": "2-C",
    "subjectId": "ENG",
    "teacherId": "T096",
    "className": "2-C",
    "subjectName": "English",
    "teacherName": "Shalini Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-131",
    "classId": "2-C",
    "subjectId": "HIN",
    "teacherId": "T095",
    "className": "2-C",
    "subjectName": "Hindi",
    "teacherName": "Anita Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-132",
    "classId": "2-C",
    "subjectId": "MAT",
    "teacherId": "T059",
    "className": "2-C",
    "subjectName": "Mathematics",
    "teacherName": "Anita Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-133",
    "classId": "2-C",
    "subjectId": "EVS",
    "teacherId": "T037",
    "className": "2-C",
    "subjectName": "Environmental Studies",
    "teacherName": "Divya Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 5
  },
  {
    "id": "asgn-134",
    "classId": "2-C",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "2-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-135",
    "classId": "2-C",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "2-C",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-136",
    "classId": "2-C",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "2-C",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-137",
    "classId": "2-C",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "2-C",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-138",
    "classId": "2-C",
    "subjectId": "PE",
    "teacherId": "T084",
    "className": "2-C",
    "subjectName": "Physical Education",
    "teacherName": "Kapil Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-139",
    "classId": "2-C",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "2-C",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-140",
    "classId": "2-C",
    "subjectId": "VE",
    "teacherId": "T059",
    "className": "2-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Anita Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-141",
    "classId": "3-A",
    "subjectId": "ENG",
    "teacherId": "T096",
    "className": "3-A",
    "subjectName": "English",
    "teacherName": "Shalini Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-142",
    "classId": "3-A",
    "subjectId": "HIN",
    "teacherId": "T031",
    "className": "3-A",
    "subjectName": "Hindi",
    "teacherName": "Sapna Bedi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-143",
    "classId": "3-A",
    "subjectId": "MAT",
    "teacherId": "T059",
    "className": "3-A",
    "subjectName": "Mathematics",
    "teacherName": "Anita Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-144",
    "classId": "3-A",
    "subjectId": "SCI",
    "teacherId": "T037",
    "className": "3-A",
    "subjectName": "Science",
    "teacherName": "Divya Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-145",
    "classId": "3-A",
    "subjectId": "SST",
    "teacherId": "T031",
    "className": "3-A",
    "subjectName": "Social Science",
    "teacherName": "Sapna Bedi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-146",
    "classId": "3-A",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "3-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-147",
    "classId": "3-A",
    "subjectId": "ART",
    "teacherId": "T093",
    "className": "3-A",
    "subjectName": "Art & Craft",
    "teacherName": "Ritu Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-148",
    "classId": "3-A",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "3-A",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-149",
    "classId": "3-A",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "3-A",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-150",
    "classId": "3-A",
    "subjectId": "PE",
    "teacherId": "T084",
    "className": "3-A",
    "subjectName": "Physical Education",
    "teacherName": "Kapil Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-151",
    "classId": "3-A",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "3-A",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-152",
    "classId": "3-A",
    "subjectId": "VE",
    "teacherId": "T031",
    "className": "3-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Sapna Bedi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-153",
    "classId": "3-B",
    "subjectId": "ENG",
    "teacherId": "T060",
    "className": "3-B",
    "subjectName": "English",
    "teacherName": "Sunita Chauhan",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-154",
    "classId": "3-B",
    "subjectId": "HIN",
    "teacherId": "T086",
    "className": "3-B",
    "subjectName": "Hindi",
    "teacherName": "Ekta Bhatia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-155",
    "classId": "3-B",
    "subjectId": "MAT",
    "teacherId": "T026",
    "className": "3-B",
    "subjectName": "Mathematics",
    "teacherName": "Vinod Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-156",
    "classId": "3-B",
    "subjectId": "SCI",
    "teacherId": "T026",
    "className": "3-B",
    "subjectName": "Science",
    "teacherName": "Vinod Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-157",
    "classId": "3-B",
    "subjectId": "SST",
    "teacherId": "T087",
    "className": "3-B",
    "subjectName": "Social Science",
    "teacherName": "Vandana Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-158",
    "classId": "3-B",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "3-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-159",
    "classId": "3-B",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "3-B",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-160",
    "classId": "3-B",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "3-B",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-161",
    "classId": "3-B",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "3-B",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-162",
    "classId": "3-B",
    "subjectId": "PE",
    "teacherId": "T084",
    "className": "3-B",
    "subjectName": "Physical Education",
    "teacherName": "Kapil Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-163",
    "classId": "3-B",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "3-B",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-164",
    "classId": "3-B",
    "subjectId": "VE",
    "teacherId": "T026",
    "className": "3-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Vinod Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-165",
    "classId": "3-C",
    "subjectId": "ENG",
    "teacherId": "T101",
    "className": "3-C",
    "subjectName": "English",
    "teacherName": "Preeti Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-166",
    "classId": "3-C",
    "subjectId": "HIN",
    "teacherId": "T086",
    "className": "3-C",
    "subjectName": "Hindi",
    "teacherName": "Ekta Bhatia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-167",
    "classId": "3-C",
    "subjectId": "MAT",
    "teacherId": "T059",
    "className": "3-C",
    "subjectName": "Mathematics",
    "teacherName": "Anita Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-168",
    "classId": "3-C",
    "subjectId": "SCI",
    "teacherId": "T036",
    "className": "3-C",
    "subjectName": "Science",
    "teacherName": "Pooja Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-169",
    "classId": "3-C",
    "subjectId": "SST",
    "teacherId": "T087",
    "className": "3-C",
    "subjectName": "Social Science",
    "teacherName": "Vandana Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-170",
    "classId": "3-C",
    "subjectId": "CS",
    "teacherId": "T068",
    "className": "3-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Divya Saxena",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-171",
    "classId": "3-C",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "3-C",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-172",
    "classId": "3-C",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "3-C",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-173",
    "classId": "3-C",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "3-C",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-174",
    "classId": "3-C",
    "subjectId": "PE",
    "teacherId": "T084",
    "className": "3-C",
    "subjectName": "Physical Education",
    "teacherName": "Kapil Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-175",
    "classId": "3-C",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "3-C",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-176",
    "classId": "3-C",
    "subjectId": "VE",
    "teacherId": "T101",
    "className": "3-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Preeti Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-177",
    "classId": "3-D",
    "subjectId": "ENG",
    "teacherId": "T060",
    "className": "3-D",
    "subjectName": "English",
    "teacherName": "Sunita Chauhan",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-178",
    "classId": "3-D",
    "subjectId": "HIN",
    "teacherId": "T086",
    "className": "3-D",
    "subjectName": "Hindi",
    "teacherName": "Ekta Bhatia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-179",
    "classId": "3-D",
    "subjectId": "MAT",
    "teacherId": "T036",
    "className": "3-D",
    "subjectName": "Mathematics",
    "teacherName": "Pooja Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-180",
    "classId": "3-D",
    "subjectId": "SCI",
    "teacherId": "T036",
    "className": "3-D",
    "subjectName": "Science",
    "teacherName": "Pooja Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-181",
    "classId": "3-D",
    "subjectId": "SST",
    "teacherId": "T082",
    "className": "3-D",
    "subjectName": "Social Science",
    "teacherName": "Vikram Chopra",
    "teacherWeeklyLoad": 20,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-182",
    "classId": "3-D",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "3-D",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-183",
    "classId": "3-D",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "3-D",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-184",
    "classId": "3-D",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "3-D",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-185",
    "classId": "3-D",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "3-D",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-186",
    "classId": "3-D",
    "subjectId": "PE",
    "teacherId": "T084",
    "className": "3-D",
    "subjectName": "Physical Education",
    "teacherName": "Kapil Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-187",
    "classId": "3-D",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "3-D",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-188",
    "classId": "3-D",
    "subjectId": "VE",
    "teacherId": "T036",
    "className": "3-D",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Pooja Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-189",
    "classId": "4-A",
    "subjectId": "ENG",
    "teacherId": "T057",
    "className": "4-A",
    "subjectName": "English",
    "teacherName": "Smita Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-190",
    "classId": "4-A",
    "subjectId": "HIN",
    "teacherId": "T057",
    "className": "4-A",
    "subjectName": "Hindi",
    "teacherName": "Smita Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-191",
    "classId": "4-A",
    "subjectId": "MAT",
    "teacherId": "T036",
    "className": "4-A",
    "subjectName": "Mathematics",
    "teacherName": "Pooja Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-192",
    "classId": "4-A",
    "subjectId": "SCI",
    "teacherId": "T036",
    "className": "4-A",
    "subjectName": "Science",
    "teacherName": "Pooja Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-193",
    "classId": "4-A",
    "subjectId": "SST",
    "teacherId": "T082",
    "className": "4-A",
    "subjectName": "Social Science",
    "teacherName": "Vikram Chopra",
    "teacherWeeklyLoad": 20,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-194",
    "classId": "4-A",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "4-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-195",
    "classId": "4-A",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "4-A",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-196",
    "classId": "4-A",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "4-A",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-197",
    "classId": "4-A",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "4-A",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-198",
    "classId": "4-A",
    "subjectId": "PE",
    "teacherId": "T067",
    "className": "4-A",
    "subjectName": "Physical Education",
    "teacherName": "Anil Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-199",
    "classId": "4-A",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "4-A",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-200",
    "classId": "4-A",
    "subjectId": "VE",
    "teacherId": "T057",
    "className": "4-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Smita Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-201",
    "classId": "4-B",
    "subjectId": "ENG",
    "teacherId": "T058",
    "className": "4-B",
    "subjectName": "English",
    "teacherName": "Payal Arora",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-202",
    "classId": "4-B",
    "subjectId": "HIN",
    "teacherId": "T086",
    "className": "4-B",
    "subjectName": "Hindi",
    "teacherName": "Ekta Bhatia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-203",
    "classId": "4-B",
    "subjectId": "MAT",
    "teacherId": "T035",
    "className": "4-B",
    "subjectName": "Mathematics",
    "teacherName": "Preeti Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-204",
    "classId": "4-B",
    "subjectId": "SCI",
    "teacherId": "T014",
    "className": "4-B",
    "subjectName": "Science",
    "teacherName": "Preeti Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-205",
    "classId": "4-B",
    "subjectId": "SST",
    "teacherId": "T082",
    "className": "4-B",
    "subjectName": "Social Science",
    "teacherName": "Vikram Chopra",
    "teacherWeeklyLoad": 20,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-206",
    "classId": "4-B",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "4-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-207",
    "classId": "4-B",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "4-B",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-208",
    "classId": "4-B",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "4-B",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-209",
    "classId": "4-B",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "4-B",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-210",
    "classId": "4-B",
    "subjectId": "PE",
    "teacherId": "T067",
    "className": "4-B",
    "subjectName": "Physical Education",
    "teacherName": "Anil Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-211",
    "classId": "4-B",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "4-B",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-212",
    "classId": "4-B",
    "subjectId": "VE",
    "teacherId": "T058",
    "className": "4-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Payal Arora",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-213",
    "classId": "4-C",
    "subjectId": "ENG",
    "teacherId": "T060",
    "className": "4-C",
    "subjectName": "English",
    "teacherName": "Sunita Chauhan",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-214",
    "classId": "4-C",
    "subjectId": "HIN",
    "teacherId": "T047",
    "className": "4-C",
    "subjectName": "Hindi",
    "teacherName": "Anita Kohli",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-215",
    "classId": "4-C",
    "subjectId": "MAT",
    "teacherId": "T035",
    "className": "4-C",
    "subjectName": "Mathematics",
    "teacherName": "Preeti Bisht",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-216",
    "classId": "4-C",
    "subjectId": "SCI",
    "teacherId": "T014",
    "className": "4-C",
    "subjectName": "Science",
    "teacherName": "Preeti Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-217",
    "classId": "4-C",
    "subjectId": "SST",
    "teacherId": "T082",
    "className": "4-C",
    "subjectName": "Social Science",
    "teacherName": "Vikram Chopra",
    "teacherWeeklyLoad": 20,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-218",
    "classId": "4-C",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "4-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-219",
    "classId": "4-C",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "4-C",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-220",
    "classId": "4-C",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "4-C",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-221",
    "classId": "4-C",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "4-C",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-222",
    "classId": "4-C",
    "subjectId": "PE",
    "teacherId": "T067",
    "className": "4-C",
    "subjectName": "Physical Education",
    "teacherName": "Anil Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-223",
    "classId": "4-C",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "4-C",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-224",
    "classId": "4-C",
    "subjectId": "VE",
    "teacherId": "T060",
    "className": "4-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Sunita Chauhan",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-225",
    "classId": "5-A",
    "subjectId": "ENG",
    "teacherId": "T102",
    "className": "5-A",
    "subjectName": "English",
    "teacherName": "Savita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-226",
    "classId": "5-A",
    "subjectId": "HIN",
    "teacherId": "T047",
    "className": "5-A",
    "subjectName": "Hindi",
    "teacherName": "Anita Kohli",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-227",
    "classId": "5-A",
    "subjectId": "MAT",
    "teacherId": "T026",
    "className": "5-A",
    "subjectName": "Mathematics",
    "teacherName": "Vinod Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-228",
    "classId": "5-A",
    "subjectId": "SCI",
    "teacherId": "T014",
    "className": "5-A",
    "subjectName": "Science",
    "teacherName": "Preeti Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-229",
    "classId": "5-A",
    "subjectId": "SST",
    "teacherId": "T102",
    "className": "5-A",
    "subjectName": "Social Science",
    "teacherName": "Savita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-230",
    "classId": "5-A",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "5-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-231",
    "classId": "5-A",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "5-A",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-232",
    "classId": "5-A",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "5-A",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-233",
    "classId": "5-A",
    "subjectId": "DAN",
    "teacherId": "T085",
    "className": "5-A",
    "subjectName": "Dance",
    "teacherName": "Harleen Anand",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-234",
    "classId": "5-A",
    "subjectId": "PE",
    "teacherId": "T067",
    "className": "5-A",
    "subjectName": "Physical Education",
    "teacherName": "Anil Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-235",
    "classId": "5-A",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "5-A",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-236",
    "classId": "5-A",
    "subjectId": "VE",
    "teacherId": "T102",
    "className": "5-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Savita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-237",
    "classId": "5-B",
    "subjectId": "ENG",
    "teacherId": "T058",
    "className": "5-B",
    "subjectName": "English",
    "teacherName": "Payal Arora",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-238",
    "classId": "5-B",
    "subjectId": "HIN",
    "teacherId": "T047",
    "className": "5-B",
    "subjectName": "Hindi",
    "teacherName": "Anita Kohli",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-239",
    "classId": "5-B",
    "subjectId": "MAT",
    "teacherId": "T026",
    "className": "5-B",
    "subjectName": "Mathematics",
    "teacherName": "Vinod Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-240",
    "classId": "5-B",
    "subjectId": "SCI",
    "teacherId": "T037",
    "className": "5-B",
    "subjectName": "Science",
    "teacherName": "Divya Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-241",
    "classId": "5-B",
    "subjectId": "SST",
    "teacherId": "T082",
    "className": "5-B",
    "subjectName": "Social Science",
    "teacherName": "Vikram Chopra",
    "teacherWeeklyLoad": 20,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-242",
    "classId": "5-B",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "5-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-243",
    "classId": "5-B",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "5-B",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-244",
    "classId": "5-B",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "5-B",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-245",
    "classId": "5-B",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "5-B",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-246",
    "classId": "5-B",
    "subjectId": "PE",
    "teacherId": "T067",
    "className": "5-B",
    "subjectName": "Physical Education",
    "teacherName": "Anil Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-247",
    "classId": "5-B",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "5-B",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-248",
    "classId": "5-B",
    "subjectId": "VE",
    "teacherId": "T037",
    "className": "5-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Divya Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-249",
    "classId": "5-C",
    "subjectId": "ENG",
    "teacherId": "T057",
    "className": "5-C",
    "subjectName": "English",
    "teacherName": "Smita Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-250",
    "classId": "5-C",
    "subjectId": "HIN",
    "teacherId": "T047",
    "className": "5-C",
    "subjectName": "Hindi",
    "teacherName": "Anita Kohli",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-251",
    "classId": "5-C",
    "subjectId": "MAT",
    "teacherId": "T062",
    "className": "5-C",
    "subjectName": "Mathematics",
    "teacherName": "Aarti Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-252",
    "classId": "5-C",
    "subjectId": "SCI",
    "teacherId": "T062",
    "className": "5-C",
    "subjectName": "Science",
    "teacherName": "Aarti Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-253",
    "classId": "5-C",
    "subjectId": "SST",
    "teacherId": "T031",
    "className": "5-C",
    "subjectName": "Social Science",
    "teacherName": "Sapna Bedi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-254",
    "classId": "5-C",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "5-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-255",
    "classId": "5-C",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "5-C",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-256",
    "classId": "5-C",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "5-C",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-257",
    "classId": "5-C",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "5-C",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-258",
    "classId": "5-C",
    "subjectId": "PE",
    "teacherId": "T067",
    "className": "5-C",
    "subjectName": "Physical Education",
    "teacherName": "Anil Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-259",
    "classId": "5-C",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "5-C",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-260",
    "classId": "5-C",
    "subjectId": "VE",
    "teacherId": "T062",
    "className": "5-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Aarti Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-261",
    "classId": "5-D",
    "subjectId": "ENG",
    "teacherId": "T057",
    "className": "5-D",
    "subjectName": "English",
    "teacherName": "Smita Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-262",
    "classId": "5-D",
    "subjectId": "HIN",
    "teacherId": "T031",
    "className": "5-D",
    "subjectName": "Hindi",
    "teacherName": "Sapna Bedi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-263",
    "classId": "5-D",
    "subjectId": "MAT",
    "teacherId": "T106",
    "className": "5-D",
    "subjectName": "Mathematics",
    "teacherName": "Archana Malhotra",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-264",
    "classId": "5-D",
    "subjectId": "SCI",
    "teacherId": "T014",
    "className": "5-D",
    "subjectName": "Science",
    "teacherName": "Preeti Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-265",
    "classId": "5-D",
    "subjectId": "SST",
    "teacherId": "T031",
    "className": "5-D",
    "subjectName": "Social Science",
    "teacherName": "Sapna Bedi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-266",
    "classId": "5-D",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "5-D",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-267",
    "classId": "5-D",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "5-D",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-268",
    "classId": "5-D",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "5-D",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-269",
    "classId": "5-D",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "5-D",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-270",
    "classId": "5-D",
    "subjectId": "PE",
    "teacherId": "T067",
    "className": "5-D",
    "subjectName": "Physical Education",
    "teacherName": "Anil Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-271",
    "classId": "5-D",
    "subjectId": "LIB",
    "teacherId": "T066",
    "className": "5-D",
    "subjectName": "Library & Reading",
    "teacherName": "Rashmi Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-272",
    "classId": "5-D",
    "subjectId": "VE",
    "teacherId": "T106",
    "className": "5-D",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Archana Malhotra",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-273",
    "classId": "5-E",
    "subjectId": "ENG",
    "teacherId": "T029",
    "className": "5-E",
    "subjectName": "English",
    "teacherName": "Rachna Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-274",
    "classId": "5-E",
    "subjectId": "HIN",
    "teacherId": "T029",
    "className": "5-E",
    "subjectName": "Hindi",
    "teacherName": "Rachna Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-275",
    "classId": "5-E",
    "subjectId": "MAT",
    "teacherId": "T023",
    "className": "5-E",
    "subjectName": "Mathematics",
    "teacherName": "Geeta Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-276",
    "classId": "5-E",
    "subjectId": "SCI",
    "teacherId": "T014",
    "className": "5-E",
    "subjectName": "Science",
    "teacherName": "Preeti Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-277",
    "classId": "5-E",
    "subjectId": "SST",
    "teacherId": "T031",
    "className": "5-E",
    "subjectName": "Social Science",
    "teacherName": "Sapna Bedi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-278",
    "classId": "5-E",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "5-E",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-279",
    "classId": "5-E",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "5-E",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-280",
    "classId": "5-E",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "5-E",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-281",
    "classId": "5-E",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "5-E",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-282",
    "classId": "5-E",
    "subjectId": "PE",
    "teacherId": "T067",
    "className": "5-E",
    "subjectName": "Physical Education",
    "teacherName": "Anil Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-283",
    "classId": "5-E",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "5-E",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-284",
    "classId": "5-E",
    "subjectId": "VE",
    "teacherId": "T023",
    "className": "5-E",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Geeta Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-285",
    "classId": "6-A",
    "subjectId": "ENG",
    "teacherId": "T028",
    "className": "6-A",
    "subjectName": "English",
    "teacherName": "Tanvi Gill",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-286",
    "classId": "6-A",
    "subjectId": "HIN",
    "teacherId": "T078",
    "className": "6-A",
    "subjectName": "Hindi",
    "teacherName": "Suman Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-287",
    "classId": "6-A",
    "subjectId": "SAN",
    "teacherId": "T100",
    "className": "6-A",
    "subjectName": "Sanskrit",
    "teacherName": "Rekha Mukherjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-288",
    "classId": "6-A",
    "subjectId": "MAT",
    "teacherId": "T092",
    "className": "6-A",
    "subjectName": "Mathematics",
    "teacherName": "Mohit Bhatia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-289",
    "classId": "6-A",
    "subjectId": "SCI",
    "teacherId": "T033",
    "className": "6-A",
    "subjectName": "Science",
    "teacherName": "Radha Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-290",
    "classId": "6-A",
    "subjectId": "SST",
    "teacherId": "T054",
    "className": "6-A",
    "subjectName": "Social Science",
    "teacherName": "Umesh Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-291",
    "classId": "6-A",
    "subjectId": "CS",
    "teacherId": "T044",
    "className": "6-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Umesh Ghosh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-292",
    "classId": "6-A",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "6-A",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-293",
    "classId": "6-A",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "6-A",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-294",
    "classId": "6-A",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "6-A",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-295",
    "classId": "6-A",
    "subjectId": "PE",
    "teacherId": "T067",
    "className": "6-A",
    "subjectName": "Physical Education",
    "teacherName": "Anil Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-296",
    "classId": "6-A",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "6-A",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-297",
    "classId": "6-A",
    "subjectId": "VE",
    "teacherId": "T033",
    "className": "6-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Radha Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-298",
    "classId": "6-B",
    "subjectId": "ENG",
    "teacherId": "T028",
    "className": "6-B",
    "subjectName": "English",
    "teacherName": "Tanvi Gill",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-299",
    "classId": "6-B",
    "subjectId": "HIN",
    "teacherId": "T078",
    "className": "6-B",
    "subjectName": "Hindi",
    "teacherName": "Suman Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-300",
    "classId": "6-B",
    "subjectId": "SAN",
    "teacherId": "T100",
    "className": "6-B",
    "subjectName": "Sanskrit",
    "teacherName": "Rekha Mukherjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-301",
    "classId": "6-B",
    "subjectId": "MAT",
    "teacherId": "T092",
    "className": "6-B",
    "subjectName": "Mathematics",
    "teacherName": "Mohit Bhatia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-302",
    "classId": "6-B",
    "subjectId": "SCI",
    "teacherId": "T097",
    "className": "6-B",
    "subjectName": "Science",
    "teacherName": "Aarti Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-303",
    "classId": "6-B",
    "subjectId": "SST",
    "teacherId": "T002",
    "className": "6-B",
    "subjectName": "Social Science",
    "teacherName": "Nisha Reddy",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-304",
    "classId": "6-B",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "6-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-305",
    "classId": "6-B",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "6-B",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-306",
    "classId": "6-B",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "6-B",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-307",
    "classId": "6-B",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "6-B",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-308",
    "classId": "6-B",
    "subjectId": "PE",
    "teacherId": "T053",
    "className": "6-B",
    "subjectName": "Physical Education",
    "teacherName": "Nitin Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-309",
    "classId": "6-B",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "6-B",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-310",
    "classId": "6-B",
    "subjectId": "VE",
    "teacherId": "T002",
    "className": "6-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Nisha Reddy",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-311",
    "classId": "6-C",
    "subjectId": "ENG",
    "teacherId": "T007",
    "className": "6-C",
    "subjectName": "English",
    "teacherName": "Radha Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-312",
    "classId": "6-C",
    "subjectId": "HIN",
    "teacherId": "T078",
    "className": "6-C",
    "subjectName": "Hindi",
    "teacherName": "Suman Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-313",
    "classId": "6-C",
    "subjectId": "SAN",
    "teacherId": "T100",
    "className": "6-C",
    "subjectName": "Sanskrit",
    "teacherName": "Rekha Mukherjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-314",
    "classId": "6-C",
    "subjectId": "MAT",
    "teacherId": "T092",
    "className": "6-C",
    "subjectName": "Mathematics",
    "teacherName": "Mohit Bhatia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-315",
    "classId": "6-C",
    "subjectId": "SCI",
    "teacherId": "T077",
    "className": "6-C",
    "subjectName": "Science",
    "teacherName": "Rachna Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-316",
    "classId": "6-C",
    "subjectId": "SST",
    "teacherId": "T054",
    "className": "6-C",
    "subjectName": "Social Science",
    "teacherName": "Umesh Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-317",
    "classId": "6-C",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "6-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-318",
    "classId": "6-C",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "6-C",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-319",
    "classId": "6-C",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "6-C",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-320",
    "classId": "6-C",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "6-C",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-321",
    "classId": "6-C",
    "subjectId": "PE",
    "teacherId": "T053",
    "className": "6-C",
    "subjectName": "Physical Education",
    "teacherName": "Nitin Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-322",
    "classId": "6-C",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "6-C",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-323",
    "classId": "6-C",
    "subjectId": "VE",
    "teacherId": "T007",
    "className": "6-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Radha Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-324",
    "classId": "6-D",
    "subjectId": "ENG",
    "teacherId": "T008",
    "className": "6-D",
    "subjectName": "English",
    "teacherName": "Sunita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-325",
    "classId": "6-D",
    "subjectId": "HIN",
    "teacherId": "T008",
    "className": "6-D",
    "subjectName": "Hindi",
    "teacherName": "Sunita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-326",
    "classId": "6-D",
    "subjectId": "SAN",
    "teacherId": "T100",
    "className": "6-D",
    "subjectName": "Sanskrit",
    "teacherName": "Rekha Mukherjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-327",
    "classId": "6-D",
    "subjectId": "MAT",
    "teacherId": "T091",
    "className": "6-D",
    "subjectName": "Mathematics",
    "teacherName": "Meena Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-328",
    "classId": "6-D",
    "subjectId": "SCI",
    "teacherId": "T077",
    "className": "6-D",
    "subjectName": "Science",
    "teacherName": "Rachna Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-329",
    "classId": "6-D",
    "subjectId": "SST",
    "teacherId": "T054",
    "className": "6-D",
    "subjectName": "Social Science",
    "teacherName": "Umesh Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-330",
    "classId": "6-D",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "6-D",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-331",
    "classId": "6-D",
    "subjectId": "ART",
    "teacherId": "T018",
    "className": "6-D",
    "subjectName": "Art & Craft",
    "teacherName": "Ekta Jain",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-332",
    "classId": "6-D",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "6-D",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-333",
    "classId": "6-D",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "6-D",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-334",
    "classId": "6-D",
    "subjectId": "PE",
    "teacherId": "T053",
    "className": "6-D",
    "subjectName": "Physical Education",
    "teacherName": "Nitin Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-335",
    "classId": "6-D",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "6-D",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-336",
    "classId": "6-D",
    "subjectId": "VE",
    "teacherId": "T008",
    "className": "6-D",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Sunita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-337",
    "classId": "7-A",
    "subjectId": "ENG",
    "teacherId": "T028",
    "className": "7-A",
    "subjectName": "English",
    "teacherName": "Tanvi Gill",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-338",
    "classId": "7-A",
    "subjectId": "HIN",
    "teacherId": "T045",
    "className": "7-A",
    "subjectName": "Hindi",
    "teacherName": "Pankaj Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-339",
    "classId": "7-A",
    "subjectId": "SAN",
    "teacherId": "T045",
    "className": "7-A",
    "subjectName": "Sanskrit",
    "teacherName": "Pankaj Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-340",
    "classId": "7-A",
    "subjectId": "MAT",
    "teacherId": "T091",
    "className": "7-A",
    "subjectName": "Mathematics",
    "teacherName": "Meena Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-341",
    "classId": "7-A",
    "subjectId": "SCI",
    "teacherId": "T077",
    "className": "7-A",
    "subjectName": "Science",
    "teacherName": "Rachna Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-342",
    "classId": "7-A",
    "subjectId": "SST",
    "teacherId": "T054",
    "className": "7-A",
    "subjectName": "Social Science",
    "teacherName": "Umesh Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-343",
    "classId": "7-A",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "7-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-344",
    "classId": "7-A",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "7-A",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-345",
    "classId": "7-A",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "7-A",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-346",
    "classId": "7-A",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "7-A",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-347",
    "classId": "7-A",
    "subjectId": "PE",
    "teacherId": "T053",
    "className": "7-A",
    "subjectName": "Physical Education",
    "teacherName": "Nitin Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-348",
    "classId": "7-A",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "7-A",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-349",
    "classId": "7-A",
    "subjectId": "VE",
    "teacherId": "T045",
    "className": "7-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Pankaj Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-350",
    "classId": "7-B",
    "subjectId": "ENG",
    "teacherId": "T028",
    "className": "7-B",
    "subjectName": "English",
    "teacherName": "Tanvi Gill",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-351",
    "classId": "7-B",
    "subjectId": "HIN",
    "teacherId": "T078",
    "className": "7-B",
    "subjectName": "Hindi",
    "teacherName": "Suman Nair",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-352",
    "classId": "7-B",
    "subjectId": "SAN",
    "teacherId": "T045",
    "className": "7-B",
    "subjectName": "Sanskrit",
    "teacherName": "Pankaj Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-353",
    "classId": "7-B",
    "subjectId": "MAT",
    "teacherId": "T091",
    "className": "7-B",
    "subjectName": "Mathematics",
    "teacherName": "Meena Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-354",
    "classId": "7-B",
    "subjectId": "SCI",
    "teacherId": "T006",
    "className": "7-B",
    "subjectName": "Science",
    "teacherName": "Aarti Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-355",
    "classId": "7-B",
    "subjectId": "SST",
    "teacherId": "T054",
    "className": "7-B",
    "subjectName": "Social Science",
    "teacherName": "Umesh Verma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-356",
    "classId": "7-B",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "7-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-357",
    "classId": "7-B",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "7-B",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-358",
    "classId": "7-B",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "7-B",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-359",
    "classId": "7-B",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "7-B",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-360",
    "classId": "7-B",
    "subjectId": "PE",
    "teacherId": "T053",
    "className": "7-B",
    "subjectName": "Physical Education",
    "teacherName": "Nitin Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-361",
    "classId": "7-B",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "7-B",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-362",
    "classId": "7-B",
    "subjectId": "VE",
    "teacherId": "T006",
    "className": "7-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Aarti Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-363",
    "classId": "7-C",
    "subjectId": "ENG",
    "teacherId": "T027",
    "className": "7-C",
    "subjectName": "English",
    "teacherName": "Hemant Singh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-364",
    "classId": "7-C",
    "subjectId": "HIN",
    "teacherId": "T045",
    "className": "7-C",
    "subjectName": "Hindi",
    "teacherName": "Pankaj Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-365",
    "classId": "7-C",
    "subjectId": "SAN",
    "teacherId": "T045",
    "className": "7-C",
    "subjectName": "Sanskrit",
    "teacherName": "Pankaj Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-366",
    "classId": "7-C",
    "subjectId": "MAT",
    "teacherId": "T091",
    "className": "7-C",
    "subjectName": "Mathematics",
    "teacherName": "Meena Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-367",
    "classId": "7-C",
    "subjectId": "SCI",
    "teacherId": "T072",
    "className": "7-C",
    "subjectName": "Science",
    "teacherName": "Meena Gill",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-368",
    "classId": "7-C",
    "subjectId": "SST",
    "teacherId": "T050",
    "className": "7-C",
    "subjectName": "Social Science",
    "teacherName": "Urmila Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-369",
    "classId": "7-C",
    "subjectId": "CS",
    "teacherId": "T091",
    "className": "7-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Meena Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-370",
    "classId": "7-C",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "7-C",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-371",
    "classId": "7-C",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "7-C",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-372",
    "classId": "7-C",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "7-C",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-373",
    "classId": "7-C",
    "subjectId": "PE",
    "teacherId": "T053",
    "className": "7-C",
    "subjectName": "Physical Education",
    "teacherName": "Nitin Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-374",
    "classId": "7-C",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "7-C",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-375",
    "classId": "7-C",
    "subjectId": "VE",
    "teacherId": "T091",
    "className": "7-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Meena Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-376",
    "classId": "7-D",
    "subjectId": "ENG",
    "teacherId": "T027",
    "className": "7-D",
    "subjectName": "English",
    "teacherName": "Hemant Singh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-377",
    "classId": "7-D",
    "subjectId": "HIN",
    "teacherId": "T045",
    "className": "7-D",
    "subjectName": "Hindi",
    "teacherName": "Pankaj Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-378",
    "classId": "7-D",
    "subjectId": "SAN",
    "teacherId": "T039",
    "className": "7-D",
    "subjectName": "Sanskrit",
    "teacherName": "Pallavi Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-379",
    "classId": "7-D",
    "subjectId": "MAT",
    "teacherId": "T049",
    "className": "7-D",
    "subjectName": "Mathematics",
    "teacherName": "Isha Kumar",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-380",
    "classId": "7-D",
    "subjectId": "SCI",
    "teacherId": "T072",
    "className": "7-D",
    "subjectName": "Science",
    "teacherName": "Meena Gill",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-381",
    "classId": "7-D",
    "subjectId": "SST",
    "teacherId": "T050",
    "className": "7-D",
    "subjectName": "Social Science",
    "teacherName": "Urmila Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-382",
    "classId": "7-D",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "7-D",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-383",
    "classId": "7-D",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "7-D",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-384",
    "classId": "7-D",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "7-D",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-385",
    "classId": "7-D",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "7-D",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-386",
    "classId": "7-D",
    "subjectId": "PE",
    "teacherId": "T053",
    "className": "7-D",
    "subjectName": "Physical Education",
    "teacherName": "Nitin Tandon",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-387",
    "classId": "7-D",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "7-D",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-388",
    "classId": "7-D",
    "subjectId": "VE",
    "teacherId": "T049",
    "className": "7-D",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Isha Kumar",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-389",
    "classId": "8-A",
    "subjectId": "ENG",
    "teacherId": "T013",
    "className": "8-A",
    "subjectName": "English",
    "teacherName": "Vivek Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-390",
    "classId": "8-A",
    "subjectId": "HIN",
    "teacherId": "T013",
    "className": "8-A",
    "subjectName": "Hindi",
    "teacherName": "Vivek Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-391",
    "classId": "8-A",
    "subjectId": "SAN",
    "teacherId": "T039",
    "className": "8-A",
    "subjectName": "Sanskrit",
    "teacherName": "Pallavi Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-392",
    "classId": "8-A",
    "subjectId": "MAT",
    "teacherId": "T056",
    "className": "8-A",
    "subjectName": "Mathematics",
    "teacherName": "Namrata Sinha",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-393",
    "classId": "8-A",
    "subjectId": "SCI",
    "teacherId": "T069",
    "className": "8-A",
    "subjectName": "Science",
    "teacherName": "Rashmi Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-394",
    "classId": "8-A",
    "subjectId": "SST",
    "teacherId": "T050",
    "className": "8-A",
    "subjectName": "Social Science",
    "teacherName": "Urmila Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-395",
    "classId": "8-A",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "8-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-396",
    "classId": "8-A",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "8-A",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-397",
    "classId": "8-A",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "8-A",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-398",
    "classId": "8-A",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "8-A",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-399",
    "classId": "8-A",
    "subjectId": "PE",
    "teacherId": "T041",
    "className": "8-A",
    "subjectName": "Physical Education",
    "teacherName": "Aarti Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-400",
    "classId": "8-A",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "8-A",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-401",
    "classId": "8-A",
    "subjectId": "VE",
    "teacherId": "T013",
    "className": "8-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Vivek Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-402",
    "classId": "8-B",
    "subjectId": "ENG",
    "teacherId": "T019",
    "className": "8-B",
    "subjectName": "English",
    "teacherName": "Gopal Joshi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-403",
    "classId": "8-B",
    "subjectId": "HIN",
    "teacherId": "T039",
    "className": "8-B",
    "subjectName": "Hindi",
    "teacherName": "Pallavi Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-404",
    "classId": "8-B",
    "subjectId": "SAN",
    "teacherId": "T039",
    "className": "8-B",
    "subjectName": "Sanskrit",
    "teacherName": "Pallavi Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-405",
    "classId": "8-B",
    "subjectId": "MAT",
    "teacherId": "T056",
    "className": "8-B",
    "subjectName": "Mathematics",
    "teacherName": "Namrata Sinha",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-406",
    "classId": "8-B",
    "subjectId": "SCI",
    "teacherId": "T033",
    "className": "8-B",
    "subjectName": "Science",
    "teacherName": "Radha Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-407",
    "classId": "8-B",
    "subjectId": "SST",
    "teacherId": "T019",
    "className": "8-B",
    "subjectName": "Social Science",
    "teacherName": "Gopal Joshi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-408",
    "classId": "8-B",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "8-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-409",
    "classId": "8-B",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "8-B",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-410",
    "classId": "8-B",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "8-B",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-411",
    "classId": "8-B",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "8-B",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-412",
    "classId": "8-B",
    "subjectId": "PE",
    "teacherId": "T041",
    "className": "8-B",
    "subjectName": "Physical Education",
    "teacherName": "Aarti Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-413",
    "classId": "8-B",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "8-B",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-414",
    "classId": "8-B",
    "subjectId": "VE",
    "teacherId": "T019",
    "className": "8-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Gopal Joshi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-415",
    "classId": "8-C",
    "subjectId": "ENG",
    "teacherId": "T027",
    "className": "8-C",
    "subjectName": "English",
    "teacherName": "Hemant Singh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-416",
    "classId": "8-C",
    "subjectId": "HIN",
    "teacherId": "T039",
    "className": "8-C",
    "subjectName": "Hindi",
    "teacherName": "Pallavi Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-417",
    "classId": "8-C",
    "subjectId": "SAN",
    "teacherId": "T024",
    "className": "8-C",
    "subjectName": "Sanskrit",
    "teacherName": "Nitin Aggarwal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-418",
    "classId": "8-C",
    "subjectId": "MAT",
    "teacherId": "T056",
    "className": "8-C",
    "subjectName": "Mathematics",
    "teacherName": "Namrata Sinha",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-419",
    "classId": "8-C",
    "subjectId": "SCI",
    "teacherId": "T006",
    "className": "8-C",
    "subjectName": "Science",
    "teacherName": "Aarti Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-420",
    "classId": "8-C",
    "subjectId": "SST",
    "teacherId": "T011",
    "className": "8-C",
    "subjectName": "Social Science",
    "teacherName": "Tarun Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-421",
    "classId": "8-C",
    "subjectId": "CS",
    "teacherId": "T012",
    "className": "8-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Lata Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-422",
    "classId": "8-C",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "8-C",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-423",
    "classId": "8-C",
    "subjectId": "MUS",
    "teacherId": "T038",
    "className": "8-C",
    "subjectName": "Music",
    "teacherName": "Meena Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-424",
    "classId": "8-C",
    "subjectId": "DAN",
    "teacherId": "T009",
    "className": "8-C",
    "subjectName": "Dance",
    "teacherName": "Manju Mukherjee",
    "teacherWeeklyLoad": 15,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-425",
    "classId": "8-C",
    "subjectId": "PE",
    "teacherId": "T041",
    "className": "8-C",
    "subjectName": "Physical Education",
    "teacherName": "Aarti Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-426",
    "classId": "8-C",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "8-C",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-427",
    "classId": "8-C",
    "subjectId": "VE",
    "teacherId": "T011",
    "className": "8-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Tarun Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-428",
    "classId": "9-A",
    "subjectId": "ENG",
    "teacherId": "T022",
    "className": "9-A",
    "subjectName": "English",
    "teacherName": "Poonam Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-429",
    "classId": "9-A",
    "subjectId": "HIN",
    "teacherId": "T039",
    "className": "9-A",
    "subjectName": "Hindi",
    "teacherName": "Pallavi Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-430",
    "classId": "9-A",
    "subjectId": "MAT",
    "teacherId": "T051",
    "className": "9-A",
    "subjectName": "Mathematics",
    "teacherName": "Manju Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-431",
    "classId": "9-A",
    "subjectId": "SCI",
    "teacherId": "T069",
    "className": "9-A",
    "subjectName": "Science",
    "teacherName": "Rashmi Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-432",
    "classId": "9-A",
    "subjectId": "SST",
    "teacherId": "T050",
    "className": "9-A",
    "subjectName": "Social Science",
    "teacherName": "Urmila Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-433",
    "classId": "9-A",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "9-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-434",
    "classId": "9-A",
    "subjectId": "PE",
    "teacherId": "T041",
    "className": "9-A",
    "subjectName": "Physical Education",
    "teacherName": "Aarti Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-435",
    "classId": "9-A",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "9-A",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-436",
    "classId": "9-A",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "9-A",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-437",
    "classId": "9-A",
    "subjectId": "VE",
    "teacherId": "T039",
    "className": "9-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Pallavi Walia",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-438",
    "classId": "9-B",
    "subjectId": "ENG",
    "teacherId": "T022",
    "className": "9-B",
    "subjectName": "English",
    "teacherName": "Poonam Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-439",
    "classId": "9-B",
    "subjectId": "HIN",
    "teacherId": "T024",
    "className": "9-B",
    "subjectName": "Hindi",
    "teacherName": "Nitin Aggarwal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-440",
    "classId": "9-B",
    "subjectId": "MAT",
    "teacherId": "T069",
    "className": "9-B",
    "subjectName": "Mathematics",
    "teacherName": "Rashmi Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-441",
    "classId": "9-B",
    "subjectId": "SCI",
    "teacherId": "T069",
    "className": "9-B",
    "subjectName": "Science",
    "teacherName": "Rashmi Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-442",
    "classId": "9-B",
    "subjectId": "SST",
    "teacherId": "T019",
    "className": "9-B",
    "subjectName": "Social Science",
    "teacherName": "Gopal Joshi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-443",
    "classId": "9-B",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "9-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-444",
    "classId": "9-B",
    "subjectId": "PE",
    "teacherId": "T041",
    "className": "9-B",
    "subjectName": "Physical Education",
    "teacherName": "Aarti Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-445",
    "classId": "9-B",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "9-B",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-446",
    "classId": "9-B",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "9-B",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-447",
    "classId": "9-B",
    "subjectId": "VE",
    "teacherId": "T069",
    "className": "9-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Rashmi Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-448",
    "classId": "9-C",
    "subjectId": "ENG",
    "teacherId": "T022",
    "className": "9-C",
    "subjectName": "English",
    "teacherName": "Poonam Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-449",
    "classId": "9-C",
    "subjectId": "HIN",
    "teacherId": "T024",
    "className": "9-C",
    "subjectName": "Hindi",
    "teacherName": "Nitin Aggarwal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-450",
    "classId": "9-C",
    "subjectId": "MAT",
    "teacherId": "T051",
    "className": "9-C",
    "subjectName": "Mathematics",
    "teacherName": "Manju Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-451",
    "classId": "9-C",
    "subjectId": "SCI",
    "teacherId": "T033",
    "className": "9-C",
    "subjectName": "Science",
    "teacherName": "Radha Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-452",
    "classId": "9-C",
    "subjectId": "SST",
    "teacherId": "T011",
    "className": "9-C",
    "subjectName": "Social Science",
    "teacherName": "Tarun Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-453",
    "classId": "9-C",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "9-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-454",
    "classId": "9-C",
    "subjectId": "PE",
    "teacherId": "T041",
    "className": "9-C",
    "subjectName": "Physical Education",
    "teacherName": "Aarti Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-455",
    "classId": "9-C",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "9-C",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-456",
    "classId": "9-C",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "9-C",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-457",
    "classId": "9-C",
    "subjectId": "VE",
    "teacherId": "T022",
    "className": "9-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Poonam Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-458",
    "classId": "9-D",
    "subjectId": "ENG",
    "teacherId": "T019",
    "className": "9-D",
    "subjectName": "English",
    "teacherName": "Gopal Joshi",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-459",
    "classId": "9-D",
    "subjectId": "HIN",
    "teacherId": "T024",
    "className": "9-D",
    "subjectName": "Hindi",
    "teacherName": "Nitin Aggarwal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-460",
    "classId": "9-D",
    "subjectId": "MAT",
    "teacherId": "T072",
    "className": "9-D",
    "subjectName": "Mathematics",
    "teacherName": "Meena Gill",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-461",
    "classId": "9-D",
    "subjectId": "SCI",
    "teacherId": "T072",
    "className": "9-D",
    "subjectName": "Science",
    "teacherName": "Meena Gill",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-462",
    "classId": "9-D",
    "subjectId": "SST",
    "teacherId": "T011",
    "className": "9-D",
    "subjectName": "Social Science",
    "teacherName": "Tarun Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-463",
    "classId": "9-D",
    "subjectId": "CS",
    "teacherId": "T020",
    "className": "9-D",
    "subjectName": "Computer Science / IT",
    "teacherName": "Renu Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-464",
    "classId": "9-D",
    "subjectId": "PE",
    "teacherId": "T041",
    "className": "9-D",
    "subjectName": "Physical Education",
    "teacherName": "Aarti Thakur",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-465",
    "classId": "9-D",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "9-D",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-466",
    "classId": "9-D",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "9-D",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-467",
    "classId": "9-D",
    "subjectId": "VE",
    "teacherId": "T072",
    "className": "9-D",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Meena Gill",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-468",
    "classId": "10-A",
    "subjectId": "ENG",
    "teacherId": "T027",
    "className": "10-A",
    "subjectName": "English",
    "teacherName": "Hemant Singh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-469",
    "classId": "10-A",
    "subjectId": "HIN",
    "teacherId": "T024",
    "className": "10-A",
    "subjectName": "Hindi",
    "teacherName": "Nitin Aggarwal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-470",
    "classId": "10-A",
    "subjectId": "MAT",
    "teacherId": "T049",
    "className": "10-A",
    "subjectName": "Mathematics",
    "teacherName": "Isha Kumar",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-471",
    "classId": "10-A",
    "subjectId": "SCI",
    "teacherId": "T033",
    "className": "10-A",
    "subjectName": "Science",
    "teacherName": "Radha Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-472",
    "classId": "10-A",
    "subjectId": "SST",
    "teacherId": "T011",
    "className": "10-A",
    "subjectName": "Social Science",
    "teacherName": "Tarun Khanna",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-473",
    "classId": "10-A",
    "subjectId": "CS",
    "teacherId": "T012",
    "className": "10-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Lata Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-474",
    "classId": "10-A",
    "subjectId": "PE",
    "teacherId": "T040",
    "className": "10-A",
    "subjectName": "Physical Education",
    "teacherName": "Rachna Grover",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-475",
    "classId": "10-A",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "10-A",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-476",
    "classId": "10-A",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "10-A",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-477",
    "classId": "10-A",
    "subjectId": "VE",
    "teacherId": "T027",
    "className": "10-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Hemant Singh",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-478",
    "classId": "10-B",
    "subjectId": "ENG",
    "teacherId": "T013",
    "className": "10-B",
    "subjectName": "English",
    "teacherName": "Vivek Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-479",
    "classId": "10-B",
    "subjectId": "HIN",
    "teacherId": "T013",
    "className": "10-B",
    "subjectName": "Hindi",
    "teacherName": "Vivek Sharma",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-480",
    "classId": "10-B",
    "subjectId": "MAT",
    "teacherId": "T049",
    "className": "10-B",
    "subjectName": "Mathematics",
    "teacherName": "Isha Kumar",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-481",
    "classId": "10-B",
    "subjectId": "SCI",
    "teacherId": "T077",
    "className": "10-B",
    "subjectName": "Science",
    "teacherName": "Rachna Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-482",
    "classId": "10-B",
    "subjectId": "SST",
    "teacherId": "T002",
    "className": "10-B",
    "subjectName": "Social Science",
    "teacherName": "Nisha Reddy",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-483",
    "classId": "10-B",
    "subjectId": "CS",
    "teacherId": "T012",
    "className": "10-B",
    "subjectName": "Computer Science / IT",
    "teacherName": "Lata Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-484",
    "classId": "10-B",
    "subjectId": "PE",
    "teacherId": "T040",
    "className": "10-B",
    "subjectName": "Physical Education",
    "teacherName": "Rachna Grover",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-485",
    "classId": "10-B",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "10-B",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-486",
    "classId": "10-B",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "10-B",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-487",
    "classId": "10-B",
    "subjectId": "VE",
    "teacherId": "T077",
    "className": "10-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Rachna Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-488",
    "classId": "10-C",
    "subjectId": "ENG",
    "teacherId": "T007",
    "className": "10-C",
    "subjectName": "English",
    "teacherName": "Radha Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-489",
    "classId": "10-C",
    "subjectId": "HIN",
    "teacherId": "T008",
    "className": "10-C",
    "subjectName": "Hindi",
    "teacherName": "Sunita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-490",
    "classId": "10-C",
    "subjectId": "MAT",
    "teacherId": "T051",
    "className": "10-C",
    "subjectName": "Mathematics",
    "teacherName": "Manju Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-491",
    "classId": "10-C",
    "subjectId": "SCI",
    "teacherId": "T006",
    "className": "10-C",
    "subjectName": "Science",
    "teacherName": "Aarti Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-492",
    "classId": "10-C",
    "subjectId": "SST",
    "teacherId": "T002",
    "className": "10-C",
    "subjectName": "Social Science",
    "teacherName": "Nisha Reddy",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-493",
    "classId": "10-C",
    "subjectId": "CS",
    "teacherId": "T012",
    "className": "10-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Lata Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-494",
    "classId": "10-C",
    "subjectId": "PE",
    "teacherId": "T040",
    "className": "10-C",
    "subjectName": "Physical Education",
    "teacherName": "Rachna Grover",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-495",
    "classId": "10-C",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "10-C",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-496",
    "classId": "10-C",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "10-C",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-497",
    "classId": "10-C",
    "subjectId": "VE",
    "teacherId": "T051",
    "className": "10-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Manju Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-498",
    "classId": "10-D",
    "subjectId": "ENG",
    "teacherId": "T007",
    "className": "10-D",
    "subjectName": "English",
    "teacherName": "Radha Bansal",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-499",
    "classId": "10-D",
    "subjectId": "HIN",
    "teacherId": "T008",
    "className": "10-D",
    "subjectName": "Hindi",
    "teacherName": "Sunita Mehta",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 6
  },
  {
    "id": "asgn-500",
    "classId": "10-D",
    "subjectId": "MAT",
    "teacherId": "T056",
    "className": "10-D",
    "subjectName": "Mathematics",
    "teacherName": "Namrata Sinha",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-501",
    "classId": "10-D",
    "subjectId": "SCI",
    "teacherId": "T006",
    "className": "10-D",
    "subjectName": "Science",
    "teacherName": "Aarti Banerjee",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-502",
    "classId": "10-D",
    "subjectId": "SST",
    "teacherId": "T002",
    "className": "10-D",
    "subjectName": "Social Science",
    "teacherName": "Nisha Reddy",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-503",
    "classId": "10-D",
    "subjectId": "CS",
    "teacherId": "T012",
    "className": "10-D",
    "subjectName": "Computer Science / IT",
    "teacherName": "Lata Pandey",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 3
  },
  {
    "id": "asgn-504",
    "classId": "10-D",
    "subjectId": "PE",
    "teacherId": "T040",
    "className": "10-D",
    "subjectName": "Physical Education",
    "teacherName": "Rachna Grover",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-505",
    "classId": "10-D",
    "subjectId": "ART",
    "teacherId": "T010",
    "className": "10-D",
    "subjectName": "Art & Craft",
    "teacherName": "Kamal Kapoor",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 2
  },
  {
    "id": "asgn-506",
    "classId": "10-D",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "10-D",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-507",
    "classId": "10-D",
    "subjectId": "VE",
    "teacherId": "T056",
    "className": "10-D",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Namrata Sinha",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-508",
    "classId": "11-A",
    "subjectId": "ENG",
    "teacherId": "T071",
    "className": "11-A",
    "subjectName": "English",
    "teacherName": "Nidhi Tiwari",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-509",
    "classId": "11-A",
    "subjectId": "PHY",
    "teacherId": "T021",
    "className": "11-A",
    "subjectName": "Physics",
    "teacherName": "Rohit Jain",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-510",
    "classId": "11-A",
    "subjectId": "CHE",
    "teacherId": "T090",
    "className": "11-A",
    "subjectName": "Chemistry",
    "teacherName": "Bhavna Tandon",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-511",
    "classId": "11-A",
    "subjectId": "MAT",
    "teacherId": "T063",
    "className": "11-A",
    "subjectName": "Mathematics",
    "teacherName": "Madhu Sinha",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 10
  },
  {
    "id": "asgn-512",
    "classId": "11-A",
    "subjectId": "CS",
    "teacherId": "T055",
    "className": "11-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Vivek Gill",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-513",
    "classId": "11-A",
    "subjectId": "PE",
    "teacherId": "T040",
    "className": "11-A",
    "subjectName": "Physical Education",
    "teacherName": "Rachna Grover",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-514",
    "classId": "11-A",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "11-A",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-515",
    "classId": "11-A",
    "subjectId": "VE",
    "teacherId": "T090",
    "className": "11-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Bhavna Tandon",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-516",
    "classId": "11-B",
    "subjectId": "ENG",
    "teacherId": "T046",
    "className": "11-B",
    "subjectName": "English",
    "teacherName": "Lalit Joshi",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-517",
    "classId": "11-B",
    "subjectId": "PHY",
    "teacherId": "T021",
    "className": "11-B",
    "subjectName": "Physics",
    "teacherName": "Rohit Jain",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-518",
    "classId": "11-B",
    "subjectId": "CHE",
    "teacherId": "T090",
    "className": "11-B",
    "subjectName": "Chemistry",
    "teacherName": "Bhavna Tandon",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-519",
    "classId": "11-B",
    "subjectId": "BIO",
    "teacherId": "T004",
    "className": "11-B",
    "subjectName": "Biology",
    "teacherName": "Rajesh Chopra",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 10
  },
  {
    "id": "asgn-520",
    "classId": "11-B",
    "subjectId": "PSY",
    "teacherId": "T064",
    "className": "11-B",
    "subjectName": "Psychology",
    "teacherName": "Mamta Gupta",
    "teacherWeeklyLoad": 18,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-521",
    "classId": "11-B",
    "subjectId": "PE",
    "teacherId": "T040",
    "className": "11-B",
    "subjectName": "Physical Education",
    "teacherName": "Rachna Grover",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-522",
    "classId": "11-B",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "11-B",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-523",
    "classId": "11-B",
    "subjectId": "VE",
    "teacherId": "T004",
    "className": "11-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Rajesh Chopra",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-524",
    "classId": "11-C",
    "subjectId": "ENG",
    "teacherId": "T046",
    "className": "11-C",
    "subjectName": "English",
    "teacherName": "Lalit Joshi",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-525",
    "classId": "11-C",
    "subjectId": "PHY",
    "teacherId": "T005",
    "className": "11-C",
    "subjectName": "Physics",
    "teacherName": "Pradeep Malhotra",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-526",
    "classId": "11-C",
    "subjectId": "CHE",
    "teacherId": "T081",
    "className": "11-C",
    "subjectName": "Chemistry",
    "teacherName": "Rohit Aggarwal",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-527",
    "classId": "11-C",
    "subjectId": "MAT",
    "teacherId": "T074",
    "className": "11-C",
    "subjectName": "Mathematics",
    "teacherName": "Pankaj Reddy",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 10
  },
  {
    "id": "asgn-528",
    "classId": "11-C",
    "subjectId": "CS",
    "teacherId": "T074",
    "className": "11-C",
    "subjectName": "Computer Science / IT",
    "teacherName": "Pankaj Reddy",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-529",
    "classId": "11-C",
    "subjectId": "PE",
    "teacherId": "T040",
    "className": "11-C",
    "subjectName": "Physical Education",
    "teacherName": "Rachna Grover",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-530",
    "classId": "11-C",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "11-C",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-531",
    "classId": "11-C",
    "subjectId": "VE",
    "teacherId": "T074",
    "className": "11-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Pankaj Reddy",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-532",
    "classId": "11-D",
    "subjectId": "ENG",
    "teacherId": "T046",
    "className": "11-D",
    "subjectName": "English",
    "teacherName": "Lalit Joshi",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-533",
    "classId": "11-D",
    "subjectId": "ACC",
    "teacherId": "T001",
    "className": "11-D",
    "subjectName": "Accountancy",
    "teacherName": "Pradeep Iyer",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 10
  },
  {
    "id": "asgn-534",
    "classId": "11-D",
    "subjectId": "BST",
    "teacherId": "T073",
    "className": "11-D",
    "subjectName": "Business Studies",
    "teacherName": "Shweta Bhatia",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-535",
    "classId": "11-D",
    "subjectId": "ECO",
    "teacherId": "T073",
    "className": "11-D",
    "subjectName": "Economics",
    "teacherName": "Shweta Bhatia",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-536",
    "classId": "11-D",
    "subjectId": "MAT",
    "teacherId": "T063",
    "className": "11-D",
    "subjectName": "Mathematics",
    "teacherName": "Madhu Sinha",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-537",
    "classId": "11-D",
    "subjectId": "PE",
    "teacherId": "T017",
    "className": "11-D",
    "subjectName": "Physical Education",
    "teacherName": "Kamal Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-538",
    "classId": "11-D",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "11-D",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-539",
    "classId": "11-D",
    "subjectId": "VE",
    "teacherId": "T001",
    "className": "11-D",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Pradeep Iyer",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-540",
    "classId": "11-E",
    "subjectId": "ENG",
    "teacherId": "T016",
    "className": "11-E",
    "subjectName": "English",
    "teacherName": "Amit Dubey",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-541",
    "classId": "11-E",
    "subjectId": "ACC",
    "teacherId": "T003",
    "className": "11-E",
    "subjectName": "Accountancy",
    "teacherName": "Amit Iyer",
    "teacherWeeklyLoad": 18,
    "weeklyFrequency": 10
  },
  {
    "id": "asgn-542",
    "classId": "11-E",
    "subjectId": "BST",
    "teacherId": "T043",
    "className": "11-E",
    "subjectName": "Business Studies",
    "teacherName": "Dinesh Mishra",
    "teacherWeeklyLoad": 16,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-543",
    "classId": "11-E",
    "subjectId": "ECO",
    "teacherId": "T042",
    "className": "11-E",
    "subjectName": "Economics",
    "teacherName": "Bhavna Tiwari",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-544",
    "classId": "11-E",
    "subjectId": "MAT",
    "teacherId": "T030",
    "className": "11-E",
    "subjectName": "Mathematics",
    "teacherName": "Rajesh Sinha",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-545",
    "classId": "11-E",
    "subjectId": "PE",
    "teacherId": "T017",
    "className": "11-E",
    "subjectName": "Physical Education",
    "teacherName": "Kamal Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-546",
    "classId": "11-E",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "11-E",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-547",
    "classId": "11-E",
    "subjectId": "VE",
    "teacherId": "T042",
    "className": "11-E",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Bhavna Tiwari",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-548",
    "classId": "11-F",
    "subjectId": "ENG",
    "teacherId": "T016",
    "className": "11-F",
    "subjectName": "English",
    "teacherName": "Amit Dubey",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-549",
    "classId": "11-F",
    "subjectId": "HIS",
    "teacherId": "T025",
    "className": "11-F",
    "subjectName": "History",
    "teacherName": "Seema Rawat",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-550",
    "classId": "11-F",
    "subjectId": "POL",
    "teacherId": "T025",
    "className": "11-F",
    "subjectName": "Political Science",
    "teacherName": "Seema Rawat",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-551",
    "classId": "11-F",
    "subjectId": "GEO",
    "teacherId": "T048",
    "className": "11-F",
    "subjectName": "Geography",
    "teacherName": "Hemant Aggarwal",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-552",
    "classId": "11-F",
    "subjectId": "ECO",
    "teacherId": "T073",
    "className": "11-F",
    "subjectName": "Economics",
    "teacherName": "Shweta Bhatia",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-553",
    "classId": "11-F",
    "subjectId": "PE",
    "teacherId": "T017",
    "className": "11-F",
    "subjectName": "Physical Education",
    "teacherName": "Kamal Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-554",
    "classId": "11-F",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "11-F",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-555",
    "classId": "11-F",
    "subjectId": "VE",
    "teacherId": "T025",
    "className": "11-F",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Seema Rawat",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-556",
    "classId": "12-A",
    "subjectId": "ENG",
    "teacherId": "T015",
    "className": "12-A",
    "subjectName": "English",
    "teacherName": "Pankaj Iyer",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-557",
    "classId": "12-A",
    "subjectId": "PHY",
    "teacherId": "T005",
    "className": "12-A",
    "subjectName": "Physics",
    "teacherName": "Pradeep Malhotra",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-558",
    "classId": "12-A",
    "subjectId": "CHE",
    "teacherId": "T090",
    "className": "12-A",
    "subjectName": "Chemistry",
    "teacherName": "Bhavna Tandon",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-559",
    "classId": "12-A",
    "subjectId": "MAT",
    "teacherId": "T030",
    "className": "12-A",
    "subjectName": "Mathematics",
    "teacherName": "Rajesh Sinha",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 10
  },
  {
    "id": "asgn-560",
    "classId": "12-A",
    "subjectId": "CS",
    "teacherId": "T055",
    "className": "12-A",
    "subjectName": "Computer Science / IT",
    "teacherName": "Vivek Gill",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-561",
    "classId": "12-A",
    "subjectId": "PE",
    "teacherId": "T017",
    "className": "12-A",
    "subjectName": "Physical Education",
    "teacherName": "Kamal Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-562",
    "classId": "12-A",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "12-A",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-563",
    "classId": "12-A",
    "subjectId": "VE",
    "teacherId": "T015",
    "className": "12-A",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Pankaj Iyer",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-564",
    "classId": "12-B",
    "subjectId": "ENG",
    "teacherId": "T016",
    "className": "12-B",
    "subjectName": "English",
    "teacherName": "Amit Dubey",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-565",
    "classId": "12-B",
    "subjectId": "PHY",
    "teacherId": "T021",
    "className": "12-B",
    "subjectName": "Physics",
    "teacherName": "Rohit Jain",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-566",
    "classId": "12-B",
    "subjectId": "CHE",
    "teacherId": "T081",
    "className": "12-B",
    "subjectName": "Chemistry",
    "teacherName": "Rohit Aggarwal",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-567",
    "classId": "12-B",
    "subjectId": "BIO",
    "teacherId": "T004",
    "className": "12-B",
    "subjectName": "Biology",
    "teacherName": "Rajesh Chopra",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 10
  },
  {
    "id": "asgn-568",
    "classId": "12-B",
    "subjectId": "PSY",
    "teacherId": "T064",
    "className": "12-B",
    "subjectName": "Psychology",
    "teacherName": "Mamta Gupta",
    "teacherWeeklyLoad": 18,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-569",
    "classId": "12-B",
    "subjectId": "PE",
    "teacherId": "T017",
    "className": "12-B",
    "subjectName": "Physical Education",
    "teacherName": "Kamal Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-570",
    "classId": "12-B",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "12-B",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-571",
    "classId": "12-B",
    "subjectId": "VE",
    "teacherId": "T081",
    "className": "12-B",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Rohit Aggarwal",
    "teacherWeeklyLoad": 27,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-572",
    "classId": "12-C",
    "subjectId": "ENG",
    "teacherId": "T015",
    "className": "12-C",
    "subjectName": "English",
    "teacherName": "Pankaj Iyer",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-573",
    "classId": "12-C",
    "subjectId": "ACC",
    "teacherId": "T001",
    "className": "12-C",
    "subjectName": "Accountancy",
    "teacherName": "Pradeep Iyer",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 10
  },
  {
    "id": "asgn-574",
    "classId": "12-C",
    "subjectId": "BST",
    "teacherId": "T075",
    "className": "12-C",
    "subjectName": "Business Studies",
    "teacherName": "Garima Gupta",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-575",
    "classId": "12-C",
    "subjectId": "ECO",
    "teacherId": "T042",
    "className": "12-C",
    "subjectName": "Economics",
    "teacherName": "Bhavna Tiwari",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-576",
    "classId": "12-C",
    "subjectId": "MAT",
    "teacherId": "T030",
    "className": "12-C",
    "subjectName": "Mathematics",
    "teacherName": "Rajesh Sinha",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-577",
    "classId": "12-C",
    "subjectId": "PE",
    "teacherId": "T017",
    "className": "12-C",
    "subjectName": "Physical Education",
    "teacherName": "Kamal Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-578",
    "classId": "12-C",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "12-C",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-579",
    "classId": "12-C",
    "subjectId": "VE",
    "teacherId": "T075",
    "className": "12-C",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Garima Gupta",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-580",
    "classId": "12-D",
    "subjectId": "ENG",
    "teacherId": "T015",
    "className": "12-D",
    "subjectName": "English",
    "teacherName": "Pankaj Iyer",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 7
  },
  {
    "id": "asgn-581",
    "classId": "12-D",
    "subjectId": "HIS",
    "teacherId": "T083",
    "className": "12-D",
    "subjectName": "History",
    "teacherName": "Gunjan Banerjee",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-582",
    "classId": "12-D",
    "subjectId": "POL",
    "teacherId": "T083",
    "className": "12-D",
    "subjectName": "Political Science",
    "teacherName": "Gunjan Banerjee",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-583",
    "classId": "12-D",
    "subjectId": "GEO",
    "teacherId": "T048",
    "className": "12-D",
    "subjectName": "Geography",
    "teacherName": "Hemant Aggarwal",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 9
  },
  {
    "id": "asgn-584",
    "classId": "12-D",
    "subjectId": "ECO",
    "teacherId": "T042",
    "className": "12-D",
    "subjectName": "Economics",
    "teacherName": "Bhavna Tiwari",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 8
  },
  {
    "id": "asgn-585",
    "classId": "12-D",
    "subjectId": "PE",
    "teacherId": "T017",
    "className": "12-D",
    "subjectName": "Physical Education",
    "teacherName": "Kamal Tiwari",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 4
  },
  {
    "id": "asgn-586",
    "classId": "12-D",
    "subjectId": "LIB",
    "teacherId": "T032",
    "className": "12-D",
    "subjectName": "Library & Reading",
    "teacherName": "Swati Sandhu",
    "teacherWeeklyLoad": 30,
    "weeklyFrequency": 1
  },
  {
    "id": "asgn-587",
    "classId": "12-D",
    "subjectId": "VE",
    "teacherId": "T083",
    "className": "12-D",
    "subjectName": "Value Education / Class Teacher Period",
    "teacherName": "Gunjan Banerjee",
    "teacherWeeklyLoad": 26,
    "weeklyFrequency": 1
  }
];

export const GREENWOOD_CLEAN_ENTRIES: Record<string, TimetableEntry> = {
  "Monday-1-1-A": {
    "classId": "1-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-108",
    "isActivity": false
  },
  "Monday-1-1-B": {
    "classId": "1-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-201",
    "isActivity": true
  },
  "Monday-1-1-C": {
    "classId": "1-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "A-202",
    "isActivity": false
  },
  "Monday-1-1-D": {
    "classId": "1-D",
    "day": "Monday",
    "period": 1,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-203",
    "isActivity": false
  },
  "Monday-1-10-A": {
    "classId": "10-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-105",
    "isActivity": true
  },
  "Monday-1-10-B": {
    "classId": "10-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-106",
    "isActivity": false
  },
  "Monday-1-10-C": {
    "classId": "10-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-107",
    "isActivity": false
  },
  "Monday-1-10-D": {
    "classId": "10-D",
    "day": "Monday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-108",
    "isActivity": false
  },
  "Monday-1-11-A": {
    "classId": "11-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-201",
    "isActivity": false
  },
  "Monday-1-11-B": {
    "classId": "11-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-202",
    "isActivity": false
  },
  "Monday-1-11-C": {
    "classId": "11-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-203",
    "isActivity": false
  },
  "Monday-1-11-D": {
    "classId": "11-D",
    "day": "Monday",
    "period": 1,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Monday-1-11-E": {
    "classId": "11-E",
    "day": "Monday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-205",
    "isActivity": false
  },
  "Monday-1-11-F": {
    "classId": "11-F",
    "day": "Monday",
    "period": 1,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-206",
    "isActivity": false
  },
  "Monday-1-12-A": {
    "classId": "12-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-207",
    "isActivity": false
  },
  "Monday-1-12-B": {
    "classId": "12-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Monday-1-12-C": {
    "classId": "12-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-301",
    "isActivity": false
  },
  "Monday-1-12-D": {
    "classId": "12-D",
    "day": "Monday",
    "period": 1,
    "subjectId": "HIS",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Monday-1-2-A": {
    "classId": "2-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "A-204",
    "isActivity": true
  },
  "Monday-1-2-B": {
    "classId": "2-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-205",
    "isActivity": true
  },
  "Monday-1-2-C": {
    "classId": "2-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-206",
    "isActivity": false
  },
  "Monday-1-3-A": {
    "classId": "3-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "B-101",
    "isActivity": false
  },
  "Monday-1-3-B": {
    "classId": "3-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "B-102",
    "isActivity": false
  },
  "Monday-1-3-C": {
    "classId": "3-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "B-103",
    "isActivity": false
  },
  "Monday-1-3-D": {
    "classId": "3-D",
    "day": "Monday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Monday-1-4-A": {
    "classId": "4-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-105",
    "isActivity": true
  },
  "Monday-1-4-B": {
    "classId": "4-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-106",
    "isActivity": false
  },
  "Monday-1-4-C": {
    "classId": "4-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-107",
    "isActivity": false
  },
  "Monday-1-5-A": {
    "classId": "5-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-108",
    "isActivity": false
  },
  "Monday-1-5-B": {
    "classId": "5-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-201",
    "isActivity": false
  },
  "Monday-1-5-C": {
    "classId": "5-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Monday-1-5-D": {
    "classId": "5-D",
    "day": "Monday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Monday-1-5-E": {
    "classId": "5-E",
    "day": "Monday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-204",
    "isActivity": false
  },
  "Monday-1-6-A": {
    "classId": "6-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-205",
    "isActivity": false
  },
  "Monday-1-6-B": {
    "classId": "6-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-206",
    "isActivity": false
  },
  "Monday-1-6-C": {
    "classId": "6-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "B-207",
    "isActivity": false
  },
  "Monday-1-6-D": {
    "classId": "6-D",
    "day": "Monday",
    "period": 1,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-208",
    "isActivity": false
  },
  "Monday-1-7-A": {
    "classId": "7-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-301",
    "isActivity": true
  },
  "Monday-1-7-B": {
    "classId": "7-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-302",
    "isActivity": false
  },
  "Monday-1-7-C": {
    "classId": "7-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": false
  },
  "Monday-1-7-D": {
    "classId": "7-D",
    "day": "Monday",
    "period": 1,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-304",
    "isActivity": false
  },
  "Monday-1-8-A": {
    "classId": "8-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Monday-1-8-B": {
    "classId": "8-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-306",
    "isActivity": false
  },
  "Monday-1-8-C": {
    "classId": "8-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "SAN",
    "teacherId": "T024",
    "room": "B-307",
    "isActivity": false
  },
  "Monday-1-9-A": {
    "classId": "9-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "C-101",
    "isActivity": false
  },
  "Monday-1-9-B": {
    "classId": "9-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "C-102",
    "isActivity": false
  },
  "Monday-1-9-C": {
    "classId": "9-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-103",
    "isActivity": true
  },
  "Monday-1-9-D": {
    "classId": "9-D",
    "day": "Monday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": true
  },
  "Monday-1-LKG-A": {
    "classId": "LKG-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": true
  },
  "Monday-1-LKG-B": {
    "classId": "LKG-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Monday-1-LKG-C": {
    "classId": "LKG-C",
    "day": "Monday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Monday-1-NUR-A": {
    "classId": "NUR-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "RHY",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Monday-1-NUR-B": {
    "classId": "NUR-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Monday-1-UKG-A": {
    "classId": "UKG-A",
    "day": "Monday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-106",
    "isActivity": true
  },
  "Monday-1-UKG-B": {
    "classId": "UKG-B",
    "day": "Monday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Monday-2-1-A": {
    "classId": "1-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-108",
    "isActivity": false
  },
  "Monday-2-1-B": {
    "classId": "1-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-201",
    "isActivity": false
  },
  "Monday-2-1-C": {
    "classId": "1-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-202",
    "isActivity": true
  },
  "Monday-2-1-D": {
    "classId": "1-D",
    "day": "Monday",
    "period": 2,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-203",
    "isActivity": true
  },
  "Monday-2-10-A": {
    "classId": "10-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-105",
    "isActivity": false
  },
  "Monday-2-10-B": {
    "classId": "10-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-106",
    "isActivity": false
  },
  "Monday-2-10-C": {
    "classId": "10-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-107",
    "isActivity": false
  },
  "Monday-2-10-D": {
    "classId": "10-D",
    "day": "Monday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-108",
    "isActivity": false
  },
  "Monday-2-11-A": {
    "classId": "11-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T071",
    "room": "C-201",
    "isActivity": false
  },
  "Monday-2-11-B": {
    "classId": "11-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-202",
    "isActivity": false
  },
  "Monday-2-11-C": {
    "classId": "11-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Monday-2-11-D": {
    "classId": "11-D",
    "day": "Monday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-204",
    "isActivity": false
  },
  "Monday-2-11-E": {
    "classId": "11-E",
    "day": "Monday",
    "period": 2,
    "subjectId": "BST",
    "teacherId": "T043",
    "room": "C-205",
    "isActivity": false
  },
  "Monday-2-11-F": {
    "classId": "11-F",
    "day": "Monday",
    "period": 2,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-206",
    "isActivity": false
  },
  "Monday-2-12-A": {
    "classId": "12-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-207",
    "isActivity": true
  },
  "Monday-2-12-B": {
    "classId": "12-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": false
  },
  "Monday-2-12-C": {
    "classId": "12-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-301",
    "isActivity": false
  },
  "Monday-2-12-D": {
    "classId": "12-D",
    "day": "Monday",
    "period": 2,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-302",
    "isActivity": false
  },
  "Monday-2-2-A": {
    "classId": "2-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-204",
    "isActivity": false
  },
  "Monday-2-2-B": {
    "classId": "2-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Monday-2-2-C": {
    "classId": "2-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-206",
    "isActivity": false
  },
  "Monday-2-3-A": {
    "classId": "3-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "B-101",
    "isActivity": false
  },
  "Monday-2-3-B": {
    "classId": "3-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "B-102",
    "isActivity": true
  },
  "Monday-2-3-C": {
    "classId": "3-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "B-103",
    "isActivity": false
  },
  "Monday-2-3-D": {
    "classId": "3-D",
    "day": "Monday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-104",
    "isActivity": false
  },
  "Monday-2-4-A": {
    "classId": "4-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Monday-2-4-B": {
    "classId": "4-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-106",
    "isActivity": false
  },
  "Monday-2-4-C": {
    "classId": "4-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-107",
    "isActivity": false
  },
  "Monday-2-5-A": {
    "classId": "5-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Monday-2-5-B": {
    "classId": "5-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T037",
    "room": "B-201",
    "isActivity": false
  },
  "Monday-2-5-C": {
    "classId": "5-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-202",
    "isActivity": false
  },
  "Monday-2-5-D": {
    "classId": "5-D",
    "day": "Monday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Monday-2-5-E": {
    "classId": "5-E",
    "day": "Monday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-204",
    "isActivity": true
  },
  "Monday-2-6-A": {
    "classId": "6-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-205",
    "isActivity": false
  },
  "Monday-2-6-B": {
    "classId": "6-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-206",
    "isActivity": true
  },
  "Monday-2-6-C": {
    "classId": "6-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-207",
    "isActivity": true
  },
  "Monday-2-6-D": {
    "classId": "6-D",
    "day": "Monday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-208",
    "isActivity": false
  },
  "Monday-2-7-A": {
    "classId": "7-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Monday-2-7-B": {
    "classId": "7-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-302",
    "isActivity": false
  },
  "Monday-2-7-C": {
    "classId": "7-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-303",
    "isActivity": false
  },
  "Monday-2-7-D": {
    "classId": "7-D",
    "day": "Monday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-304",
    "isActivity": true
  },
  "Monday-2-8-A": {
    "classId": "8-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Monday-2-8-B": {
    "classId": "8-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Monday-2-8-C": {
    "classId": "8-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "SAN",
    "teacherId": "T024",
    "room": "B-307",
    "isActivity": false
  },
  "Monday-2-9-A": {
    "classId": "9-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "C-101",
    "isActivity": false
  },
  "Monday-2-9-B": {
    "classId": "9-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-102",
    "isActivity": true
  },
  "Monday-2-9-C": {
    "classId": "9-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-103",
    "isActivity": false
  },
  "Monday-2-9-D": {
    "classId": "9-D",
    "day": "Monday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-104",
    "isActivity": false
  },
  "Monday-2-LKG-A": {
    "classId": "LKG-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Monday-2-LKG-B": {
    "classId": "LKG-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Monday-2-LKG-C": {
    "classId": "LKG-C",
    "day": "Monday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Monday-2-NUR-A": {
    "classId": "NUR-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-101",
    "isActivity": true
  },
  "Monday-2-NUR-B": {
    "classId": "NUR-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "VE",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": true
  },
  "Monday-2-UKG-A": {
    "classId": "UKG-A",
    "day": "Monday",
    "period": 2,
    "subjectId": "EVS",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Monday-2-UKG-B": {
    "classId": "UKG-B",
    "day": "Monday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-107",
    "isActivity": true
  },
  "Monday-3-1-A": {
    "classId": "1-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-108",
    "isActivity": false
  },
  "Monday-3-1-B": {
    "classId": "1-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-201",
    "isActivity": false
  },
  "Monday-3-1-C": {
    "classId": "1-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-202",
    "isActivity": false
  },
  "Monday-3-1-D": {
    "classId": "1-D",
    "day": "Monday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-203",
    "isActivity": false
  },
  "Monday-3-10-A": {
    "classId": "10-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-105",
    "isActivity": true
  },
  "Monday-3-10-B": {
    "classId": "10-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Monday-3-10-C": {
    "classId": "10-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-107",
    "isActivity": false
  },
  "Monday-3-10-D": {
    "classId": "10-D",
    "day": "Monday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "C-108",
    "isActivity": false
  },
  "Monday-3-11-A": {
    "classId": "11-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T071",
    "room": "C-201",
    "isActivity": false
  },
  "Monday-3-11-B": {
    "classId": "11-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Monday-3-11-C": {
    "classId": "11-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Monday-3-11-D": {
    "classId": "11-D",
    "day": "Monday",
    "period": 3,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Monday-3-11-E": {
    "classId": "11-E",
    "day": "Monday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-205",
    "isActivity": true
  },
  "Monday-3-11-F": {
    "classId": "11-F",
    "day": "Monday",
    "period": 3,
    "subjectId": "HIS",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Monday-3-12-A": {
    "classId": "12-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-207",
    "isActivity": false
  },
  "Monday-3-12-B": {
    "classId": "12-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-208",
    "isActivity": false
  },
  "Monday-3-12-C": {
    "classId": "12-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "BST",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": false
  },
  "Monday-3-12-D": {
    "classId": "12-D",
    "day": "Monday",
    "period": 3,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-302",
    "isActivity": false
  },
  "Monday-3-2-A": {
    "classId": "2-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-204",
    "isActivity": true
  },
  "Monday-3-2-B": {
    "classId": "2-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-205",
    "isActivity": false
  },
  "Monday-3-2-C": {
    "classId": "2-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-206",
    "isActivity": true
  },
  "Monday-3-3-A": {
    "classId": "3-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Monday-3-3-B": {
    "classId": "3-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": true
  },
  "Monday-3-3-C": {
    "classId": "3-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "B-103",
    "isActivity": false
  },
  "Monday-3-3-D": {
    "classId": "3-D",
    "day": "Monday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-104",
    "isActivity": false
  },
  "Monday-3-4-A": {
    "classId": "4-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Monday-3-4-B": {
    "classId": "4-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-106",
    "isActivity": false
  },
  "Monday-3-4-C": {
    "classId": "4-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-107",
    "isActivity": false
  },
  "Monday-3-5-A": {
    "classId": "5-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-108",
    "isActivity": false
  },
  "Monday-3-5-B": {
    "classId": "5-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-201",
    "isActivity": false
  },
  "Monday-3-5-C": {
    "classId": "5-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-202",
    "isActivity": true
  },
  "Monday-3-5-D": {
    "classId": "5-D",
    "day": "Monday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-203",
    "isActivity": false
  },
  "Monday-3-5-E": {
    "classId": "5-E",
    "day": "Monday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Monday-3-6-A": {
    "classId": "6-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-205",
    "isActivity": false
  },
  "Monday-3-6-B": {
    "classId": "6-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-206",
    "isActivity": false
  },
  "Monday-3-6-C": {
    "classId": "6-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-207",
    "isActivity": false
  },
  "Monday-3-6-D": {
    "classId": "6-D",
    "day": "Monday",
    "period": 3,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-208",
    "isActivity": false
  },
  "Monday-3-7-A": {
    "classId": "7-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-301",
    "isActivity": false
  },
  "Monday-3-7-B": {
    "classId": "7-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-302",
    "isActivity": false
  },
  "Monday-3-7-C": {
    "classId": "7-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Monday-3-7-D": {
    "classId": "7-D",
    "day": "Monday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-304",
    "isActivity": false
  },
  "Monday-3-8-A": {
    "classId": "8-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "B-305",
    "isActivity": false
  },
  "Monday-3-8-B": {
    "classId": "8-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Monday-3-8-C": {
    "classId": "8-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-307",
    "isActivity": false
  },
  "Monday-3-9-A": {
    "classId": "9-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "C-101",
    "isActivity": false
  },
  "Monday-3-9-B": {
    "classId": "9-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-102",
    "isActivity": false
  },
  "Monday-3-9-C": {
    "classId": "9-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-103",
    "isActivity": false
  },
  "Monday-3-9-D": {
    "classId": "9-D",
    "day": "Monday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Monday-3-LKG-A": {
    "classId": "LKG-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Monday-3-LKG-B": {
    "classId": "LKG-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "RHY",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Monday-3-LKG-C": {
    "classId": "LKG-C",
    "day": "Monday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Monday-3-NUR-A": {
    "classId": "NUR-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-101",
    "isActivity": true
  },
  "Monday-3-NUR-B": {
    "classId": "NUR-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Monday-3-UKG-A": {
    "classId": "UKG-A",
    "day": "Monday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": true
  },
  "Monday-3-UKG-B": {
    "classId": "UKG-B",
    "day": "Monday",
    "period": 3,
    "subjectId": "RHY",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Monday-4-1-A": {
    "classId": "1-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-108",
    "isActivity": true
  },
  "Monday-4-1-B": {
    "classId": "1-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-201",
    "isActivity": false
  },
  "Monday-4-1-C": {
    "classId": "1-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-202",
    "isActivity": true
  },
  "Monday-4-1-D": {
    "classId": "1-D",
    "day": "Monday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-203",
    "isActivity": false
  },
  "Monday-4-10-A": {
    "classId": "10-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-105",
    "isActivity": false
  },
  "Monday-4-10-B": {
    "classId": "10-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-106",
    "isActivity": false
  },
  "Monday-4-10-C": {
    "classId": "10-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-107",
    "isActivity": false
  },
  "Monday-4-10-D": {
    "classId": "10-D",
    "day": "Monday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-108",
    "isActivity": false
  },
  "Monday-4-11-A": {
    "classId": "11-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": false
  },
  "Monday-4-11-B": {
    "classId": "11-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-202",
    "isActivity": false
  },
  "Monday-4-11-C": {
    "classId": "11-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-203",
    "isActivity": false
  },
  "Monday-4-11-D": {
    "classId": "11-D",
    "day": "Monday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-204",
    "isActivity": true
  },
  "Monday-4-11-E": {
    "classId": "11-E",
    "day": "Monday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-205",
    "isActivity": false
  },
  "Monday-4-11-F": {
    "classId": "11-F",
    "day": "Monday",
    "period": 4,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-206",
    "isActivity": false
  },
  "Monday-4-12-A": {
    "classId": "12-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-207",
    "isActivity": false
  },
  "Monday-4-12-B": {
    "classId": "12-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-208",
    "isActivity": true
  },
  "Monday-4-12-C": {
    "classId": "12-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Monday-4-12-D": {
    "classId": "12-D",
    "day": "Monday",
    "period": 4,
    "subjectId": "HIS",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Monday-4-2-A": {
    "classId": "2-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-204",
    "isActivity": false
  },
  "Monday-4-2-B": {
    "classId": "2-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-205",
    "isActivity": false
  },
  "Monday-4-2-C": {
    "classId": "2-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-206",
    "isActivity": false
  },
  "Monday-4-3-A": {
    "classId": "3-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "B-101",
    "isActivity": false
  },
  "Monday-4-3-B": {
    "classId": "3-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-102",
    "isActivity": true
  },
  "Monday-4-3-C": {
    "classId": "3-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-103",
    "isActivity": true
  },
  "Monday-4-3-D": {
    "classId": "3-D",
    "day": "Monday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-104",
    "isActivity": false
  },
  "Monday-4-4-A": {
    "classId": "4-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Monday-4-4-B": {
    "classId": "4-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-106",
    "isActivity": false
  },
  "Monday-4-4-C": {
    "classId": "4-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-107",
    "isActivity": false
  },
  "Monday-4-5-A": {
    "classId": "5-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Monday-4-5-B": {
    "classId": "5-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-201",
    "isActivity": false
  },
  "Monday-4-5-C": {
    "classId": "5-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-202",
    "isActivity": false
  },
  "Monday-4-5-D": {
    "classId": "5-D",
    "day": "Monday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Monday-4-5-E": {
    "classId": "5-E",
    "day": "Monday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T023",
    "room": "B-204",
    "isActivity": false
  },
  "Monday-4-6-A": {
    "classId": "6-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-205",
    "isActivity": false
  },
  "Monday-4-6-B": {
    "classId": "6-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T097",
    "room": "B-206",
    "isActivity": false
  },
  "Monday-4-6-C": {
    "classId": "6-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-207",
    "isActivity": false
  },
  "Monday-4-6-D": {
    "classId": "6-D",
    "day": "Monday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-208",
    "isActivity": true
  },
  "Monday-4-7-A": {
    "classId": "7-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-301",
    "isActivity": true
  },
  "Monday-4-7-B": {
    "classId": "7-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-302",
    "isActivity": true
  },
  "Monday-4-7-C": {
    "classId": "7-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-303",
    "isActivity": false
  },
  "Monday-4-7-D": {
    "classId": "7-D",
    "day": "Monday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-304",
    "isActivity": false
  },
  "Monday-4-8-A": {
    "classId": "8-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-305",
    "isActivity": false
  },
  "Monday-4-8-B": {
    "classId": "8-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Monday-4-8-C": {
    "classId": "8-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "B-307",
    "isActivity": false
  },
  "Monday-4-9-A": {
    "classId": "9-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-101",
    "isActivity": false
  },
  "Monday-4-9-B": {
    "classId": "9-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": true
  },
  "Monday-4-9-C": {
    "classId": "9-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-103",
    "isActivity": false
  },
  "Monday-4-9-D": {
    "classId": "9-D",
    "day": "Monday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-104",
    "isActivity": true
  },
  "Monday-4-LKG-A": {
    "classId": "LKG-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-103",
    "isActivity": true
  },
  "Monday-4-LKG-B": {
    "classId": "LKG-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": true
  },
  "Monday-4-LKG-C": {
    "classId": "LKG-C",
    "day": "Monday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-105",
    "isActivity": true
  },
  "Monday-4-NUR-A": {
    "classId": "NUR-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "RHY",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Monday-4-NUR-B": {
    "classId": "NUR-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Monday-4-UKG-A": {
    "classId": "UKG-A",
    "day": "Monday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Monday-4-UKG-B": {
    "classId": "UKG-B",
    "day": "Monday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Monday-5-1-A": {
    "classId": "1-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-108",
    "isActivity": true
  },
  "Monday-5-1-B": {
    "classId": "1-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Monday-5-1-C": {
    "classId": "1-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-202",
    "isActivity": false
  },
  "Monday-5-1-D": {
    "classId": "1-D",
    "day": "Monday",
    "period": 5,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-203",
    "isActivity": true
  },
  "Monday-5-10-A": {
    "classId": "10-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-105",
    "isActivity": false
  },
  "Monday-5-10-B": {
    "classId": "10-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-106",
    "isActivity": false
  },
  "Monday-5-10-C": {
    "classId": "10-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-107",
    "isActivity": false
  },
  "Monday-5-10-D": {
    "classId": "10-D",
    "day": "Monday",
    "period": 5,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-108",
    "isActivity": true
  },
  "Monday-5-11-A": {
    "classId": "11-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Monday-5-11-B": {
    "classId": "11-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-202",
    "isActivity": true
  },
  "Monday-5-11-C": {
    "classId": "11-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Monday-5-11-D": {
    "classId": "11-D",
    "day": "Monday",
    "period": 5,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Monday-5-11-E": {
    "classId": "11-E",
    "day": "Monday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-205",
    "isActivity": false
  },
  "Monday-5-11-F": {
    "classId": "11-F",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIS",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Monday-5-12-A": {
    "classId": "12-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-207",
    "isActivity": false
  },
  "Monday-5-12-B": {
    "classId": "12-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-208",
    "isActivity": false
  },
  "Monday-5-12-C": {
    "classId": "12-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "BST",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": false
  },
  "Monday-5-12-D": {
    "classId": "12-D",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIS",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Monday-5-2-A": {
    "classId": "2-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-204",
    "isActivity": false
  },
  "Monday-5-2-B": {
    "classId": "2-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-205",
    "isActivity": false
  },
  "Monday-5-2-C": {
    "classId": "2-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "A-206",
    "isActivity": true
  },
  "Monday-5-3-A": {
    "classId": "3-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T037",
    "room": "B-101",
    "isActivity": false
  },
  "Monday-5-3-B": {
    "classId": "3-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T087",
    "room": "B-102",
    "isActivity": false
  },
  "Monday-5-3-C": {
    "classId": "3-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-103",
    "isActivity": false
  },
  "Monday-5-3-D": {
    "classId": "3-D",
    "day": "Monday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-104",
    "isActivity": true
  },
  "Monday-5-4-A": {
    "classId": "4-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Monday-5-4-B": {
    "classId": "4-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-106",
    "isActivity": false
  },
  "Monday-5-4-C": {
    "classId": "4-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-107",
    "isActivity": false
  },
  "Monday-5-5-A": {
    "classId": "5-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-108",
    "isActivity": false
  },
  "Monday-5-5-B": {
    "classId": "5-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-201",
    "isActivity": false
  },
  "Monday-5-5-C": {
    "classId": "5-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-202",
    "isActivity": false
  },
  "Monday-5-5-D": {
    "classId": "5-D",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "B-203",
    "isActivity": false
  },
  "Monday-5-5-E": {
    "classId": "5-E",
    "day": "Monday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-204",
    "isActivity": false
  },
  "Monday-5-6-A": {
    "classId": "6-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-205",
    "isActivity": false
  },
  "Monday-5-6-B": {
    "classId": "6-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-206",
    "isActivity": false
  },
  "Monday-5-6-C": {
    "classId": "6-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-207",
    "isActivity": false
  },
  "Monday-5-6-D": {
    "classId": "6-D",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-208",
    "isActivity": false
  },
  "Monday-5-7-A": {
    "classId": "7-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-301",
    "isActivity": false
  },
  "Monday-5-7-B": {
    "classId": "7-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-302",
    "isActivity": true
  },
  "Monday-5-7-C": {
    "classId": "7-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-303",
    "isActivity": false
  },
  "Monday-5-7-D": {
    "classId": "7-D",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-304",
    "isActivity": false
  },
  "Monday-5-8-A": {
    "classId": "8-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-305",
    "isActivity": false
  },
  "Monday-5-8-B": {
    "classId": "8-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Monday-5-8-C": {
    "classId": "8-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-307",
    "isActivity": false
  },
  "Monday-5-9-A": {
    "classId": "9-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "VE",
    "teacherId": "T039",
    "room": "C-101",
    "isActivity": true
  },
  "Monday-5-9-B": {
    "classId": "9-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-102",
    "isActivity": true
  },
  "Monday-5-9-C": {
    "classId": "9-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-103",
    "isActivity": false
  },
  "Monday-5-9-D": {
    "classId": "9-D",
    "day": "Monday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Monday-5-LKG-A": {
    "classId": "LKG-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Monday-5-LKG-B": {
    "classId": "LKG-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Monday-5-LKG-C": {
    "classId": "LKG-C",
    "day": "Monday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-105",
    "isActivity": true
  },
  "Monday-5-NUR-A": {
    "classId": "NUR-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Monday-5-NUR-B": {
    "classId": "NUR-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "RHY",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Monday-5-UKG-A": {
    "classId": "UKG-A",
    "day": "Monday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-106",
    "isActivity": true
  },
  "Monday-5-UKG-B": {
    "classId": "UKG-B",
    "day": "Monday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Monday-6-1-A": {
    "classId": "1-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-108",
    "isActivity": false
  },
  "Monday-6-1-B": {
    "classId": "1-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-201",
    "isActivity": false
  },
  "Monday-6-1-C": {
    "classId": "1-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-202",
    "isActivity": false
  },
  "Monday-6-1-D": {
    "classId": "1-D",
    "day": "Monday",
    "period": 6,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-203",
    "isActivity": false
  },
  "Monday-6-10-A": {
    "classId": "10-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "C-105",
    "isActivity": false
  },
  "Monday-6-10-B": {
    "classId": "10-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "VE",
    "teacherId": "T077",
    "room": "C-106",
    "isActivity": true
  },
  "Monday-6-10-C": {
    "classId": "10-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-107",
    "isActivity": false
  },
  "Monday-6-10-D": {
    "classId": "10-D",
    "day": "Monday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-108",
    "isActivity": false
  },
  "Monday-6-11-A": {
    "classId": "11-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-201",
    "isActivity": true
  },
  "Monday-6-11-B": {
    "classId": "11-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-202",
    "isActivity": false
  },
  "Monday-6-11-C": {
    "classId": "11-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-203",
    "isActivity": false
  },
  "Monday-6-11-D": {
    "classId": "11-D",
    "day": "Monday",
    "period": 6,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Monday-6-11-E": {
    "classId": "11-E",
    "day": "Monday",
    "period": 6,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": false
  },
  "Monday-6-11-F": {
    "classId": "11-F",
    "day": "Monday",
    "period": 6,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-206",
    "isActivity": false
  },
  "Monday-6-12-A": {
    "classId": "12-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Monday-6-12-B": {
    "classId": "12-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-208",
    "isActivity": false
  },
  "Monday-6-12-C": {
    "classId": "12-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-301",
    "isActivity": true
  },
  "Monday-6-12-D": {
    "classId": "12-D",
    "day": "Monday",
    "period": 6,
    "subjectId": "POL",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Monday-6-2-A": {
    "classId": "2-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-204",
    "isActivity": false
  },
  "Monday-6-2-B": {
    "classId": "2-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Monday-6-2-C": {
    "classId": "2-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-206",
    "isActivity": false
  },
  "Monday-6-3-A": {
    "classId": "3-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-101",
    "isActivity": false
  },
  "Monday-6-3-B": {
    "classId": "3-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Monday-6-3-C": {
    "classId": "3-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-103",
    "isActivity": false
  },
  "Monday-6-3-D": {
    "classId": "3-D",
    "day": "Monday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-104",
    "isActivity": false
  },
  "Monday-6-4-A": {
    "classId": "4-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Monday-6-4-B": {
    "classId": "4-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "B-106",
    "isActivity": true
  },
  "Monday-6-4-C": {
    "classId": "4-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-107",
    "isActivity": false
  },
  "Monday-6-5-A": {
    "classId": "5-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Monday-6-5-B": {
    "classId": "5-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-201",
    "isActivity": true
  },
  "Monday-6-5-C": {
    "classId": "5-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-202",
    "isActivity": false
  },
  "Monday-6-5-D": {
    "classId": "5-D",
    "day": "Monday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-203",
    "isActivity": false
  },
  "Monday-6-5-E": {
    "classId": "5-E",
    "day": "Monday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-204",
    "isActivity": true
  },
  "Monday-6-6-A": {
    "classId": "6-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-205",
    "isActivity": false
  },
  "Monday-6-6-B": {
    "classId": "6-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T097",
    "room": "B-206",
    "isActivity": false
  },
  "Monday-6-6-C": {
    "classId": "6-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-207",
    "isActivity": true
  },
  "Monday-6-6-D": {
    "classId": "6-D",
    "day": "Monday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-208",
    "isActivity": false
  },
  "Monday-6-7-A": {
    "classId": "7-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-301",
    "isActivity": false
  },
  "Monday-6-7-B": {
    "classId": "7-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-302",
    "isActivity": false
  },
  "Monday-6-7-C": {
    "classId": "7-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Monday-6-7-D": {
    "classId": "7-D",
    "day": "Monday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-304",
    "isActivity": true
  },
  "Monday-6-8-A": {
    "classId": "8-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-305",
    "isActivity": false
  },
  "Monday-6-8-B": {
    "classId": "8-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Monday-6-8-C": {
    "classId": "8-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-307",
    "isActivity": true
  },
  "Monday-6-9-A": {
    "classId": "9-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-101",
    "isActivity": false
  },
  "Monday-6-9-B": {
    "classId": "9-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Monday-6-9-C": {
    "classId": "9-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-103",
    "isActivity": false
  },
  "Monday-6-9-D": {
    "classId": "9-D",
    "day": "Monday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-104",
    "isActivity": false
  },
  "Monday-6-LKG-A": {
    "classId": "LKG-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-103",
    "isActivity": true
  },
  "Monday-6-LKG-B": {
    "classId": "LKG-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-104",
    "isActivity": true
  },
  "Monday-6-LKG-C": {
    "classId": "LKG-C",
    "day": "Monday",
    "period": 6,
    "subjectId": "RHY",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Monday-6-NUR-A": {
    "classId": "NUR-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Monday-6-NUR-B": {
    "classId": "NUR-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Monday-6-UKG-A": {
    "classId": "UKG-A",
    "day": "Monday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Monday-6-UKG-B": {
    "classId": "UKG-B",
    "day": "Monday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-107",
    "isActivity": true
  },
  "Monday-7-1-A": {
    "classId": "1-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-108",
    "isActivity": true
  },
  "Monday-7-1-B": {
    "classId": "1-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-201",
    "isActivity": true
  },
  "Monday-7-1-C": {
    "classId": "1-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-202",
    "isActivity": false
  },
  "Monday-7-1-D": {
    "classId": "1-D",
    "day": "Monday",
    "period": 7,
    "subjectId": "VE",
    "teacherId": "T035",
    "room": "A-203",
    "isActivity": true
  },
  "Monday-7-10-A": {
    "classId": "10-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-105",
    "isActivity": false
  },
  "Monday-7-10-B": {
    "classId": "10-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-106",
    "isActivity": true
  },
  "Monday-7-10-C": {
    "classId": "10-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-107",
    "isActivity": false
  },
  "Monday-7-10-D": {
    "classId": "10-D",
    "day": "Monday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-108",
    "isActivity": false
  },
  "Monday-7-11-A": {
    "classId": "11-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-201",
    "isActivity": false
  },
  "Monday-7-11-B": {
    "classId": "11-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-202",
    "isActivity": false
  },
  "Monday-7-11-C": {
    "classId": "11-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-203",
    "isActivity": false
  },
  "Monday-7-11-D": {
    "classId": "11-D",
    "day": "Monday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-204",
    "isActivity": false
  },
  "Monday-7-11-E": {
    "classId": "11-E",
    "day": "Monday",
    "period": 7,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Monday-7-11-F": {
    "classId": "11-F",
    "day": "Monday",
    "period": 7,
    "subjectId": "HIS",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Monday-7-12-A": {
    "classId": "12-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-207",
    "isActivity": false
  },
  "Monday-7-12-B": {
    "classId": "12-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": false
  },
  "Monday-7-12-C": {
    "classId": "12-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Monday-7-12-D": {
    "classId": "12-D",
    "day": "Monday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-302",
    "isActivity": false
  },
  "Monday-7-2-A": {
    "classId": "2-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-204",
    "isActivity": false
  },
  "Monday-7-2-B": {
    "classId": "2-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "VE",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": true
  },
  "Monday-7-2-C": {
    "classId": "2-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-206",
    "isActivity": true
  },
  "Monday-7-3-A": {
    "classId": "3-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "B-101",
    "isActivity": false
  },
  "Monday-7-3-B": {
    "classId": "3-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Monday-7-3-C": {
    "classId": "3-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-103",
    "isActivity": false
  },
  "Monday-7-3-D": {
    "classId": "3-D",
    "day": "Monday",
    "period": 7,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-104",
    "isActivity": true
  },
  "Monday-7-4-A": {
    "classId": "4-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Monday-7-4-B": {
    "classId": "4-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-106",
    "isActivity": false
  },
  "Monday-7-4-C": {
    "classId": "4-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-107",
    "isActivity": false
  },
  "Monday-7-5-A": {
    "classId": "5-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-108",
    "isActivity": false
  },
  "Monday-7-5-B": {
    "classId": "5-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-201",
    "isActivity": false
  },
  "Monday-7-5-C": {
    "classId": "5-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-202",
    "isActivity": true
  },
  "Monday-7-5-D": {
    "classId": "5-D",
    "day": "Monday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Monday-7-5-E": {
    "classId": "5-E",
    "day": "Monday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-204",
    "isActivity": false
  },
  "Monday-7-6-A": {
    "classId": "6-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-205",
    "isActivity": false
  },
  "Monday-7-6-B": {
    "classId": "6-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-206",
    "isActivity": false
  },
  "Monday-7-6-C": {
    "classId": "6-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-207",
    "isActivity": false
  },
  "Monday-7-6-D": {
    "classId": "6-D",
    "day": "Monday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-208",
    "isActivity": true
  },
  "Monday-7-7-A": {
    "classId": "7-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-301",
    "isActivity": false
  },
  "Monday-7-7-B": {
    "classId": "7-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-302",
    "isActivity": true
  },
  "Monday-7-7-C": {
    "classId": "7-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": false
  },
  "Monday-7-7-D": {
    "classId": "7-D",
    "day": "Monday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-304",
    "isActivity": false
  },
  "Monday-7-8-A": {
    "classId": "8-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-305",
    "isActivity": false
  },
  "Monday-7-8-B": {
    "classId": "8-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-306",
    "isActivity": false
  },
  "Monday-7-8-C": {
    "classId": "8-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-307",
    "isActivity": false
  },
  "Monday-7-9-A": {
    "classId": "9-A",
    "day": "Monday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-101",
    "isActivity": false
  },
  "Monday-7-9-B": {
    "classId": "9-B",
    "day": "Monday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-102",
    "isActivity": false
  },
  "Monday-7-9-C": {
    "classId": "9-C",
    "day": "Monday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-103",
    "isActivity": false
  },
  "Monday-7-9-D": {
    "classId": "9-D",
    "day": "Monday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Monday-8-10-A": {
    "classId": "10-A",
    "day": "Monday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-105",
    "isActivity": false
  },
  "Monday-8-10-B": {
    "classId": "10-B",
    "day": "Monday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-106",
    "isActivity": false
  },
  "Monday-8-10-C": {
    "classId": "10-C",
    "day": "Monday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-107",
    "isActivity": false
  },
  "Monday-8-10-D": {
    "classId": "10-D",
    "day": "Monday",
    "period": 8,
    "subjectId": "VE",
    "teacherId": "T056",
    "room": "C-108",
    "isActivity": true
  },
  "Monday-8-11-A": {
    "classId": "11-A",
    "day": "Monday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Monday-8-11-B": {
    "classId": "11-B",
    "day": "Monday",
    "period": 8,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-202",
    "isActivity": false
  },
  "Monday-8-11-C": {
    "classId": "11-C",
    "day": "Monday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Monday-8-11-D": {
    "classId": "11-D",
    "day": "Monday",
    "period": 8,
    "subjectId": "BST",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Monday-8-11-E": {
    "classId": "11-E",
    "day": "Monday",
    "period": 8,
    "subjectId": "VE",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": true
  },
  "Monday-8-11-F": {
    "classId": "11-F",
    "day": "Monday",
    "period": 8,
    "subjectId": "HIS",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Monday-8-12-A": {
    "classId": "12-A",
    "day": "Monday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-207",
    "isActivity": false
  },
  "Monday-8-12-B": {
    "classId": "12-B",
    "day": "Monday",
    "period": 8,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-208",
    "isActivity": false
  },
  "Monday-8-12-C": {
    "classId": "12-C",
    "day": "Monday",
    "period": 8,
    "subjectId": "BST",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": false
  },
  "Monday-8-12-D": {
    "classId": "12-D",
    "day": "Monday",
    "period": 8,
    "subjectId": "POL",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Monday-8-6-A": {
    "classId": "6-A",
    "day": "Monday",
    "period": 8,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-205",
    "isActivity": true
  },
  "Monday-8-6-B": {
    "classId": "6-B",
    "day": "Monday",
    "period": 8,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-206",
    "isActivity": true
  },
  "Monday-8-6-C": {
    "classId": "6-C",
    "day": "Monday",
    "period": 8,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-207",
    "isActivity": false
  },
  "Monday-8-6-D": {
    "classId": "6-D",
    "day": "Monday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-208",
    "isActivity": false
  },
  "Monday-8-7-A": {
    "classId": "7-A",
    "day": "Monday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-301",
    "isActivity": true
  },
  "Monday-8-7-B": {
    "classId": "7-B",
    "day": "Monday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-302",
    "isActivity": false
  },
  "Monday-8-7-C": {
    "classId": "7-C",
    "day": "Monday",
    "period": 8,
    "subjectId": "CS",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": false
  },
  "Monday-8-7-D": {
    "classId": "7-D",
    "day": "Monday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-304",
    "isActivity": false
  },
  "Monday-8-8-A": {
    "classId": "8-A",
    "day": "Monday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "B-305",
    "isActivity": false
  },
  "Monday-8-8-B": {
    "classId": "8-B",
    "day": "Monday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-306",
    "isActivity": true
  },
  "Monday-8-8-C": {
    "classId": "8-C",
    "day": "Monday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-307",
    "isActivity": false
  },
  "Monday-8-9-A": {
    "classId": "9-A",
    "day": "Monday",
    "period": 8,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-101",
    "isActivity": true
  },
  "Monday-8-9-B": {
    "classId": "9-B",
    "day": "Monday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-102",
    "isActivity": false
  },
  "Monday-8-9-C": {
    "classId": "9-C",
    "day": "Monday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-103",
    "isActivity": false
  },
  "Monday-8-9-D": {
    "classId": "9-D",
    "day": "Monday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-104",
    "isActivity": false
  },
  "Tuesday-1-1-A": {
    "classId": "1-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-108",
    "isActivity": false
  },
  "Tuesday-1-1-B": {
    "classId": "1-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Tuesday-1-1-C": {
    "classId": "1-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "A-202",
    "isActivity": true
  },
  "Tuesday-1-1-D": {
    "classId": "1-D",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "A-203",
    "isActivity": false
  },
  "Tuesday-1-10-A": {
    "classId": "10-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "C-105",
    "isActivity": false
  },
  "Tuesday-1-10-B": {
    "classId": "10-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "C-106",
    "isActivity": false
  },
  "Tuesday-1-10-C": {
    "classId": "10-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-107",
    "isActivity": false
  },
  "Tuesday-1-10-D": {
    "classId": "10-D",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-108",
    "isActivity": false
  },
  "Tuesday-1-11-A": {
    "classId": "11-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-201",
    "isActivity": false
  },
  "Tuesday-1-11-B": {
    "classId": "11-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Tuesday-1-11-C": {
    "classId": "11-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-203",
    "isActivity": false
  },
  "Tuesday-1-11-D": {
    "classId": "11-D",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-204",
    "isActivity": false
  },
  "Tuesday-1-11-E": {
    "classId": "11-E",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Tuesday-1-11-F": {
    "classId": "11-F",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "POL",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Tuesday-1-12-A": {
    "classId": "12-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-207",
    "isActivity": false
  },
  "Tuesday-1-12-B": {
    "classId": "12-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-208",
    "isActivity": false
  },
  "Tuesday-1-12-C": {
    "classId": "12-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-301",
    "isActivity": false
  },
  "Tuesday-1-12-D": {
    "classId": "12-D",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-302",
    "isActivity": false
  },
  "Tuesday-1-2-A": {
    "classId": "2-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-204",
    "isActivity": false
  },
  "Tuesday-1-2-B": {
    "classId": "2-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-205",
    "isActivity": false
  },
  "Tuesday-1-2-C": {
    "classId": "2-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-206",
    "isActivity": false
  },
  "Tuesday-1-3-A": {
    "classId": "3-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Tuesday-1-3-B": {
    "classId": "3-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T087",
    "room": "B-102",
    "isActivity": false
  },
  "Tuesday-1-3-C": {
    "classId": "3-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "B-103",
    "isActivity": false
  },
  "Tuesday-1-3-D": {
    "classId": "3-D",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-104",
    "isActivity": false
  },
  "Tuesday-1-4-A": {
    "classId": "4-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Tuesday-1-4-B": {
    "classId": "4-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-106",
    "isActivity": false
  },
  "Tuesday-1-4-C": {
    "classId": "4-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-107",
    "isActivity": true
  },
  "Tuesday-1-5-A": {
    "classId": "5-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Tuesday-1-5-B": {
    "classId": "5-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T037",
    "room": "B-201",
    "isActivity": false
  },
  "Tuesday-1-5-C": {
    "classId": "5-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-202",
    "isActivity": false
  },
  "Tuesday-1-5-D": {
    "classId": "5-D",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-203",
    "isActivity": true
  },
  "Tuesday-1-5-E": {
    "classId": "5-E",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Tuesday-1-6-A": {
    "classId": "6-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-205",
    "isActivity": false
  },
  "Tuesday-1-6-B": {
    "classId": "6-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-206",
    "isActivity": false
  },
  "Tuesday-1-6-C": {
    "classId": "6-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-207",
    "isActivity": false
  },
  "Tuesday-1-6-D": {
    "classId": "6-D",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-208",
    "isActivity": true
  },
  "Tuesday-1-7-A": {
    "classId": "7-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-301",
    "isActivity": false
  },
  "Tuesday-1-7-B": {
    "classId": "7-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-302",
    "isActivity": false
  },
  "Tuesday-1-7-C": {
    "classId": "7-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Tuesday-1-7-D": {
    "classId": "7-D",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "B-304",
    "isActivity": false
  },
  "Tuesday-1-8-A": {
    "classId": "8-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Tuesday-1-8-B": {
    "classId": "8-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-306",
    "isActivity": true
  },
  "Tuesday-1-8-C": {
    "classId": "8-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "B-307",
    "isActivity": false
  },
  "Tuesday-1-9-A": {
    "classId": "9-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-101",
    "isActivity": true
  },
  "Tuesday-1-9-B": {
    "classId": "9-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Tuesday-1-9-C": {
    "classId": "9-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-103",
    "isActivity": false
  },
  "Tuesday-1-9-D": {
    "classId": "9-D",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Tuesday-1-LKG-A": {
    "classId": "LKG-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Tuesday-1-LKG-B": {
    "classId": "LKG-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Tuesday-1-LKG-C": {
    "classId": "LKG-C",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "EVS",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Tuesday-1-NUR-A": {
    "classId": "NUR-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MUS",
    "teacherId": "T105",
    "room": "A-101",
    "isActivity": true
  },
  "Tuesday-1-NUR-B": {
    "classId": "NUR-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Tuesday-1-UKG-A": {
    "classId": "UKG-A",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Tuesday-1-UKG-B": {
    "classId": "UKG-B",
    "day": "Tuesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Tuesday-2-1-A": {
    "classId": "1-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-108",
    "isActivity": false
  },
  "Tuesday-2-1-B": {
    "classId": "1-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Tuesday-2-1-C": {
    "classId": "1-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-202",
    "isActivity": false
  },
  "Tuesday-2-1-D": {
    "classId": "1-D",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-203",
    "isActivity": false
  },
  "Tuesday-2-10-A": {
    "classId": "10-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-105",
    "isActivity": false
  },
  "Tuesday-2-10-B": {
    "classId": "10-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-106",
    "isActivity": true
  },
  "Tuesday-2-10-C": {
    "classId": "10-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-107",
    "isActivity": false
  },
  "Tuesday-2-10-D": {
    "classId": "10-D",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "C-108",
    "isActivity": false
  },
  "Tuesday-2-11-A": {
    "classId": "11-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Tuesday-2-11-B": {
    "classId": "11-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-202",
    "isActivity": false
  },
  "Tuesday-2-11-C": {
    "classId": "11-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Tuesday-2-11-D": {
    "classId": "11-D",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "BST",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Tuesday-2-11-E": {
    "classId": "11-E",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": false
  },
  "Tuesday-2-11-F": {
    "classId": "11-F",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-206",
    "isActivity": false
  },
  "Tuesday-2-12-A": {
    "classId": "12-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-207",
    "isActivity": false
  },
  "Tuesday-2-12-B": {
    "classId": "12-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": false
  },
  "Tuesday-2-12-C": {
    "classId": "12-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "BST",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": false
  },
  "Tuesday-2-12-D": {
    "classId": "12-D",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-302",
    "isActivity": true
  },
  "Tuesday-2-2-A": {
    "classId": "2-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "A-204",
    "isActivity": false
  },
  "Tuesday-2-2-B": {
    "classId": "2-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Tuesday-2-2-C": {
    "classId": "2-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-206",
    "isActivity": true
  },
  "Tuesday-2-3-A": {
    "classId": "3-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T037",
    "room": "B-101",
    "isActivity": false
  },
  "Tuesday-2-3-B": {
    "classId": "3-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Tuesday-2-3-C": {
    "classId": "3-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "B-103",
    "isActivity": false
  },
  "Tuesday-2-3-D": {
    "classId": "3-D",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-104",
    "isActivity": false
  },
  "Tuesday-2-4-A": {
    "classId": "4-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-105",
    "isActivity": false
  },
  "Tuesday-2-4-B": {
    "classId": "4-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-106",
    "isActivity": false
  },
  "Tuesday-2-4-C": {
    "classId": "4-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-107",
    "isActivity": true
  },
  "Tuesday-2-5-A": {
    "classId": "5-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Tuesday-2-5-B": {
    "classId": "5-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-201",
    "isActivity": false
  },
  "Tuesday-2-5-C": {
    "classId": "5-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-202",
    "isActivity": false
  },
  "Tuesday-2-5-D": {
    "classId": "5-D",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-203",
    "isActivity": false
  },
  "Tuesday-2-5-E": {
    "classId": "5-E",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-204",
    "isActivity": false
  },
  "Tuesday-2-6-A": {
    "classId": "6-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-205",
    "isActivity": false
  },
  "Tuesday-2-6-B": {
    "classId": "6-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-206",
    "isActivity": false
  },
  "Tuesday-2-6-C": {
    "classId": "6-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "B-207",
    "isActivity": false
  },
  "Tuesday-2-6-D": {
    "classId": "6-D",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-208",
    "isActivity": false
  },
  "Tuesday-2-7-A": {
    "classId": "7-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-301",
    "isActivity": false
  },
  "Tuesday-2-7-B": {
    "classId": "7-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-302",
    "isActivity": false
  },
  "Tuesday-2-7-C": {
    "classId": "7-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-303",
    "isActivity": true
  },
  "Tuesday-2-7-D": {
    "classId": "7-D",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-304",
    "isActivity": false
  },
  "Tuesday-2-8-A": {
    "classId": "8-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Tuesday-2-8-B": {
    "classId": "8-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Tuesday-2-8-C": {
    "classId": "8-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-307",
    "isActivity": true
  },
  "Tuesday-2-9-A": {
    "classId": "9-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-101",
    "isActivity": false
  },
  "Tuesday-2-9-B": {
    "classId": "9-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-102",
    "isActivity": true
  },
  "Tuesday-2-9-C": {
    "classId": "9-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-103",
    "isActivity": false
  },
  "Tuesday-2-9-D": {
    "classId": "9-D",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Tuesday-2-LKG-A": {
    "classId": "LKG-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Tuesday-2-LKG-B": {
    "classId": "LKG-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Tuesday-2-LKG-C": {
    "classId": "LKG-C",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "EVS",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Tuesday-2-NUR-A": {
    "classId": "NUR-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Tuesday-2-NUR-B": {
    "classId": "NUR-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-102",
    "isActivity": true
  },
  "Tuesday-2-UKG-A": {
    "classId": "UKG-A",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Tuesday-2-UKG-B": {
    "classId": "UKG-B",
    "day": "Tuesday",
    "period": 2,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-107",
    "isActivity": true
  },
  "Tuesday-3-1-A": {
    "classId": "1-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-108",
    "isActivity": false
  },
  "Tuesday-3-1-B": {
    "classId": "1-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Tuesday-3-1-C": {
    "classId": "1-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-202",
    "isActivity": false
  },
  "Tuesday-3-1-D": {
    "classId": "1-D",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-203",
    "isActivity": false
  },
  "Tuesday-3-10-A": {
    "classId": "10-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-105",
    "isActivity": true
  },
  "Tuesday-3-10-B": {
    "classId": "10-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Tuesday-3-10-C": {
    "classId": "10-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-107",
    "isActivity": false
  },
  "Tuesday-3-10-D": {
    "classId": "10-D",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-108",
    "isActivity": false
  },
  "Tuesday-3-11-A": {
    "classId": "11-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-201",
    "isActivity": true
  },
  "Tuesday-3-11-B": {
    "classId": "11-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-202",
    "isActivity": false
  },
  "Tuesday-3-11-C": {
    "classId": "11-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-203",
    "isActivity": false
  },
  "Tuesday-3-11-D": {
    "classId": "11-D",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Tuesday-3-11-E": {
    "classId": "11-E",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Tuesday-3-11-F": {
    "classId": "11-F",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "POL",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Tuesday-3-12-A": {
    "classId": "12-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Tuesday-3-12-B": {
    "classId": "12-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-208",
    "isActivity": true
  },
  "Tuesday-3-12-C": {
    "classId": "12-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "BST",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": false
  },
  "Tuesday-3-12-D": {
    "classId": "12-D",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-302",
    "isActivity": false
  },
  "Tuesday-3-2-A": {
    "classId": "2-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-204",
    "isActivity": false
  },
  "Tuesday-3-2-B": {
    "classId": "2-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "A-205",
    "isActivity": true
  },
  "Tuesday-3-2-C": {
    "classId": "2-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-206",
    "isActivity": false
  },
  "Tuesday-3-3-A": {
    "classId": "3-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "B-101",
    "isActivity": true
  },
  "Tuesday-3-3-B": {
    "classId": "3-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-102",
    "isActivity": false
  },
  "Tuesday-3-3-C": {
    "classId": "3-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-103",
    "isActivity": true
  },
  "Tuesday-3-3-D": {
    "classId": "3-D",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Tuesday-3-4-A": {
    "classId": "4-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-105",
    "isActivity": false
  },
  "Tuesday-3-4-B": {
    "classId": "4-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-106",
    "isActivity": false
  },
  "Tuesday-3-4-C": {
    "classId": "4-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-107",
    "isActivity": false
  },
  "Tuesday-3-5-A": {
    "classId": "5-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-108",
    "isActivity": false
  },
  "Tuesday-3-5-B": {
    "classId": "5-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-201",
    "isActivity": true
  },
  "Tuesday-3-5-C": {
    "classId": "5-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-202",
    "isActivity": false
  },
  "Tuesday-3-5-D": {
    "classId": "5-D",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-203",
    "isActivity": true
  },
  "Tuesday-3-5-E": {
    "classId": "5-E",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Tuesday-3-6-A": {
    "classId": "6-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-205",
    "isActivity": false
  },
  "Tuesday-3-6-B": {
    "classId": "6-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-206",
    "isActivity": false
  },
  "Tuesday-3-6-C": {
    "classId": "6-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-207",
    "isActivity": false
  },
  "Tuesday-3-6-D": {
    "classId": "6-D",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-208",
    "isActivity": false
  },
  "Tuesday-3-7-A": {
    "classId": "7-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-301",
    "isActivity": false
  },
  "Tuesday-3-7-B": {
    "classId": "7-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-302",
    "isActivity": false
  },
  "Tuesday-3-7-C": {
    "classId": "7-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-303",
    "isActivity": false
  },
  "Tuesday-3-7-D": {
    "classId": "7-D",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-304",
    "isActivity": true
  },
  "Tuesday-3-8-A": {
    "classId": "8-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "B-305",
    "isActivity": false
  },
  "Tuesday-3-8-B": {
    "classId": "8-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-306",
    "isActivity": false
  },
  "Tuesday-3-8-C": {
    "classId": "8-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "B-307",
    "isActivity": false
  },
  "Tuesday-3-9-A": {
    "classId": "9-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-101",
    "isActivity": true
  },
  "Tuesday-3-9-B": {
    "classId": "9-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-102",
    "isActivity": false
  },
  "Tuesday-3-9-C": {
    "classId": "9-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-103",
    "isActivity": false
  },
  "Tuesday-3-9-D": {
    "classId": "9-D",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "C-104",
    "isActivity": false
  },
  "Tuesday-3-LKG-A": {
    "classId": "LKG-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Tuesday-3-LKG-B": {
    "classId": "LKG-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-104",
    "isActivity": true
  },
  "Tuesday-3-LKG-C": {
    "classId": "LKG-C",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": true
  },
  "Tuesday-3-NUR-A": {
    "classId": "NUR-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": true
  },
  "Tuesday-3-NUR-B": {
    "classId": "NUR-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MUS",
    "teacherId": "T105",
    "room": "A-102",
    "isActivity": true
  },
  "Tuesday-3-UKG-A": {
    "classId": "UKG-A",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Tuesday-3-UKG-B": {
    "classId": "UKG-B",
    "day": "Tuesday",
    "period": 3,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-107",
    "isActivity": true
  },
  "Tuesday-4-1-A": {
    "classId": "1-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "A-108",
    "isActivity": true
  },
  "Tuesday-4-1-B": {
    "classId": "1-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": true
  },
  "Tuesday-4-1-C": {
    "classId": "1-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-202",
    "isActivity": false
  },
  "Tuesday-4-1-D": {
    "classId": "1-D",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-203",
    "isActivity": true
  },
  "Tuesday-4-10-A": {
    "classId": "10-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-105",
    "isActivity": false
  },
  "Tuesday-4-10-B": {
    "classId": "10-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Tuesday-4-10-C": {
    "classId": "10-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-107",
    "isActivity": false
  },
  "Tuesday-4-10-D": {
    "classId": "10-D",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "C-108",
    "isActivity": false
  },
  "Tuesday-4-11-A": {
    "classId": "11-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Tuesday-4-11-B": {
    "classId": "11-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-202",
    "isActivity": false
  },
  "Tuesday-4-11-C": {
    "classId": "11-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-203",
    "isActivity": true
  },
  "Tuesday-4-11-D": {
    "classId": "11-D",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-204",
    "isActivity": true
  },
  "Tuesday-4-11-E": {
    "classId": "11-E",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "BST",
    "teacherId": "T043",
    "room": "C-205",
    "isActivity": false
  },
  "Tuesday-4-11-F": {
    "classId": "11-F",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-206",
    "isActivity": false
  },
  "Tuesday-4-12-A": {
    "classId": "12-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-207",
    "isActivity": false
  },
  "Tuesday-4-12-B": {
    "classId": "12-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Tuesday-4-12-C": {
    "classId": "12-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Tuesday-4-12-D": {
    "classId": "12-D",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-302",
    "isActivity": true
  },
  "Tuesday-4-2-A": {
    "classId": "2-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-204",
    "isActivity": false
  },
  "Tuesday-4-2-B": {
    "classId": "2-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Tuesday-4-2-C": {
    "classId": "2-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-206",
    "isActivity": false
  },
  "Tuesday-4-3-A": {
    "classId": "3-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": true
  },
  "Tuesday-4-3-B": {
    "classId": "3-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-102",
    "isActivity": false
  },
  "Tuesday-4-3-C": {
    "classId": "3-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-103",
    "isActivity": true
  },
  "Tuesday-4-3-D": {
    "classId": "3-D",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-104",
    "isActivity": false
  },
  "Tuesday-4-4-A": {
    "classId": "4-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Tuesday-4-4-B": {
    "classId": "4-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-106",
    "isActivity": true
  },
  "Tuesday-4-4-C": {
    "classId": "4-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-107",
    "isActivity": false
  },
  "Tuesday-4-5-A": {
    "classId": "5-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Tuesday-4-5-B": {
    "classId": "5-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-201",
    "isActivity": false
  },
  "Tuesday-4-5-C": {
    "classId": "5-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-202",
    "isActivity": true
  },
  "Tuesday-4-5-D": {
    "classId": "5-D",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "B-203",
    "isActivity": false
  },
  "Tuesday-4-5-E": {
    "classId": "5-E",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T023",
    "room": "B-204",
    "isActivity": true
  },
  "Tuesday-4-6-A": {
    "classId": "6-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-205",
    "isActivity": true
  },
  "Tuesday-4-6-B": {
    "classId": "6-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "B-206",
    "isActivity": false
  },
  "Tuesday-4-6-C": {
    "classId": "6-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-207",
    "isActivity": false
  },
  "Tuesday-4-6-D": {
    "classId": "6-D",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Tuesday-4-7-A": {
    "classId": "7-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Tuesday-4-7-B": {
    "classId": "7-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-302",
    "isActivity": false
  },
  "Tuesday-4-7-C": {
    "classId": "7-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-303",
    "isActivity": true
  },
  "Tuesday-4-7-D": {
    "classId": "7-D",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-304",
    "isActivity": false
  },
  "Tuesday-4-8-A": {
    "classId": "8-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-305",
    "isActivity": true
  },
  "Tuesday-4-8-B": {
    "classId": "8-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-306",
    "isActivity": true
  },
  "Tuesday-4-8-C": {
    "classId": "8-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "B-307",
    "isActivity": false
  },
  "Tuesday-4-9-A": {
    "classId": "9-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-101",
    "isActivity": false
  },
  "Tuesday-4-9-B": {
    "classId": "9-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "C-102",
    "isActivity": false
  },
  "Tuesday-4-9-C": {
    "classId": "9-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-103",
    "isActivity": false
  },
  "Tuesday-4-9-D": {
    "classId": "9-D",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Tuesday-4-LKG-A": {
    "classId": "LKG-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Tuesday-4-LKG-B": {
    "classId": "LKG-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "MUS",
    "teacherId": "T105",
    "room": "A-104",
    "isActivity": true
  },
  "Tuesday-4-LKG-C": {
    "classId": "LKG-C",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Tuesday-4-NUR-A": {
    "classId": "NUR-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Tuesday-4-NUR-B": {
    "classId": "NUR-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Tuesday-4-UKG-A": {
    "classId": "UKG-A",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Tuesday-4-UKG-B": {
    "classId": "UKG-B",
    "day": "Tuesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-107",
    "isActivity": true
  },
  "Tuesday-5-1-A": {
    "classId": "1-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-108",
    "isActivity": false
  },
  "Tuesday-5-1-B": {
    "classId": "1-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "A-201",
    "isActivity": true
  },
  "Tuesday-5-1-C": {
    "classId": "1-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-202",
    "isActivity": false
  },
  "Tuesday-5-1-D": {
    "classId": "1-D",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-203",
    "isActivity": false
  },
  "Tuesday-5-10-A": {
    "classId": "10-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-105",
    "isActivity": false
  },
  "Tuesday-5-10-B": {
    "classId": "10-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-106",
    "isActivity": true
  },
  "Tuesday-5-10-C": {
    "classId": "10-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-107",
    "isActivity": false
  },
  "Tuesday-5-10-D": {
    "classId": "10-D",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-108",
    "isActivity": false
  },
  "Tuesday-5-11-A": {
    "classId": "11-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Tuesday-5-11-B": {
    "classId": "11-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-202",
    "isActivity": false
  },
  "Tuesday-5-11-C": {
    "classId": "11-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-203",
    "isActivity": true
  },
  "Tuesday-5-11-D": {
    "classId": "11-D",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Tuesday-5-11-E": {
    "classId": "11-E",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-205",
    "isActivity": false
  },
  "Tuesday-5-11-F": {
    "classId": "11-F",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-206",
    "isActivity": true
  },
  "Tuesday-5-12-A": {
    "classId": "12-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-207",
    "isActivity": false
  },
  "Tuesday-5-12-B": {
    "classId": "12-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Tuesday-5-12-C": {
    "classId": "12-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-301",
    "isActivity": false
  },
  "Tuesday-5-12-D": {
    "classId": "12-D",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "HIS",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Tuesday-5-2-A": {
    "classId": "2-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "VE",
    "teacherId": "T086",
    "room": "A-204",
    "isActivity": true
  },
  "Tuesday-5-2-B": {
    "classId": "2-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-205",
    "isActivity": false
  },
  "Tuesday-5-2-C": {
    "classId": "2-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-206",
    "isActivity": false
  },
  "Tuesday-5-3-A": {
    "classId": "3-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T037",
    "room": "B-101",
    "isActivity": false
  },
  "Tuesday-5-3-B": {
    "classId": "3-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-102",
    "isActivity": false
  },
  "Tuesday-5-3-C": {
    "classId": "3-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T087",
    "room": "B-103",
    "isActivity": false
  },
  "Tuesday-5-3-D": {
    "classId": "3-D",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-104",
    "isActivity": false
  },
  "Tuesday-5-4-A": {
    "classId": "4-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Tuesday-5-4-B": {
    "classId": "4-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-106",
    "isActivity": true
  },
  "Tuesday-5-4-C": {
    "classId": "4-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-107",
    "isActivity": false
  },
  "Tuesday-5-5-A": {
    "classId": "5-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-108",
    "isActivity": false
  },
  "Tuesday-5-5-B": {
    "classId": "5-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-201",
    "isActivity": false
  },
  "Tuesday-5-5-C": {
    "classId": "5-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Tuesday-5-5-D": {
    "classId": "5-D",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Tuesday-5-5-E": {
    "classId": "5-E",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Tuesday-5-6-A": {
    "classId": "6-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-205",
    "isActivity": false
  },
  "Tuesday-5-6-B": {
    "classId": "6-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T097",
    "room": "B-206",
    "isActivity": false
  },
  "Tuesday-5-6-C": {
    "classId": "6-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-207",
    "isActivity": true
  },
  "Tuesday-5-6-D": {
    "classId": "6-D",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-208",
    "isActivity": false
  },
  "Tuesday-5-7-A": {
    "classId": "7-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-301",
    "isActivity": false
  },
  "Tuesday-5-7-B": {
    "classId": "7-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-302",
    "isActivity": false
  },
  "Tuesday-5-7-C": {
    "classId": "7-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-303",
    "isActivity": false
  },
  "Tuesday-5-7-D": {
    "classId": "7-D",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-304",
    "isActivity": false
  },
  "Tuesday-5-8-A": {
    "classId": "8-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-305",
    "isActivity": false
  },
  "Tuesday-5-8-B": {
    "classId": "8-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Tuesday-5-8-C": {
    "classId": "8-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "B-307",
    "isActivity": false
  },
  "Tuesday-5-9-A": {
    "classId": "9-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "C-101",
    "isActivity": false
  },
  "Tuesday-5-9-B": {
    "classId": "9-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Tuesday-5-9-C": {
    "classId": "9-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-103",
    "isActivity": false
  },
  "Tuesday-5-9-D": {
    "classId": "9-D",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-104",
    "isActivity": true
  },
  "Tuesday-5-LKG-A": {
    "classId": "LKG-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Tuesday-5-LKG-B": {
    "classId": "LKG-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "EVS",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Tuesday-5-LKG-C": {
    "classId": "LKG-C",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Tuesday-5-NUR-A": {
    "classId": "NUR-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-101",
    "isActivity": true
  },
  "Tuesday-5-NUR-B": {
    "classId": "NUR-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Tuesday-5-UKG-A": {
    "classId": "UKG-A",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-106",
    "isActivity": true
  },
  "Tuesday-5-UKG-B": {
    "classId": "UKG-B",
    "day": "Tuesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Tuesday-6-1-A": {
    "classId": "1-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "EVS",
    "teacherId": "T014",
    "room": "A-108",
    "isActivity": false
  },
  "Tuesday-6-1-B": {
    "classId": "1-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-201",
    "isActivity": false
  },
  "Tuesday-6-1-C": {
    "classId": "1-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-202",
    "isActivity": false
  },
  "Tuesday-6-1-D": {
    "classId": "1-D",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-203",
    "isActivity": false
  },
  "Tuesday-6-10-A": {
    "classId": "10-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-105",
    "isActivity": false
  },
  "Tuesday-6-10-B": {
    "classId": "10-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "C-106",
    "isActivity": false
  },
  "Tuesday-6-10-C": {
    "classId": "10-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-107",
    "isActivity": false
  },
  "Tuesday-6-10-D": {
    "classId": "10-D",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-108",
    "isActivity": false
  },
  "Tuesday-6-11-A": {
    "classId": "11-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-201",
    "isActivity": false
  },
  "Tuesday-6-11-B": {
    "classId": "11-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "VE",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": true
  },
  "Tuesday-6-11-C": {
    "classId": "11-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-203",
    "isActivity": true
  },
  "Tuesday-6-11-D": {
    "classId": "11-D",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-204",
    "isActivity": false
  },
  "Tuesday-6-11-E": {
    "classId": "11-E",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": false
  },
  "Tuesday-6-11-F": {
    "classId": "11-F",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "POL",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Tuesday-6-12-A": {
    "classId": "12-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-207",
    "isActivity": true
  },
  "Tuesday-6-12-B": {
    "classId": "12-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-208",
    "isActivity": false
  },
  "Tuesday-6-12-C": {
    "classId": "12-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-301",
    "isActivity": false
  },
  "Tuesday-6-12-D": {
    "classId": "12-D",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-302",
    "isActivity": false
  },
  "Tuesday-6-2-A": {
    "classId": "2-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "A-204",
    "isActivity": false
  },
  "Tuesday-6-2-B": {
    "classId": "2-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "A-205",
    "isActivity": true
  },
  "Tuesday-6-2-C": {
    "classId": "2-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-206",
    "isActivity": false
  },
  "Tuesday-6-3-A": {
    "classId": "3-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "B-101",
    "isActivity": true
  },
  "Tuesday-6-3-B": {
    "classId": "3-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-102",
    "isActivity": false
  },
  "Tuesday-6-3-C": {
    "classId": "3-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "B-103",
    "isActivity": false
  },
  "Tuesday-6-3-D": {
    "classId": "3-D",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Tuesday-6-4-A": {
    "classId": "4-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-105",
    "isActivity": false
  },
  "Tuesday-6-4-B": {
    "classId": "4-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-106",
    "isActivity": false
  },
  "Tuesday-6-4-C": {
    "classId": "4-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-107",
    "isActivity": true
  },
  "Tuesday-6-5-A": {
    "classId": "5-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Tuesday-6-5-B": {
    "classId": "5-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-201",
    "isActivity": true
  },
  "Tuesday-6-5-C": {
    "classId": "5-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-202",
    "isActivity": false
  },
  "Tuesday-6-5-D": {
    "classId": "5-D",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "B-203",
    "isActivity": false
  },
  "Tuesday-6-5-E": {
    "classId": "5-E",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Tuesday-6-6-A": {
    "classId": "6-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-205",
    "isActivity": false
  },
  "Tuesday-6-6-B": {
    "classId": "6-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T097",
    "room": "B-206",
    "isActivity": false
  },
  "Tuesday-6-6-C": {
    "classId": "6-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-207",
    "isActivity": false
  },
  "Tuesday-6-6-D": {
    "classId": "6-D",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Tuesday-6-7-A": {
    "classId": "7-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Tuesday-6-7-B": {
    "classId": "7-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-302",
    "isActivity": false
  },
  "Tuesday-6-7-C": {
    "classId": "7-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-303",
    "isActivity": true
  },
  "Tuesday-6-7-D": {
    "classId": "7-D",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-304",
    "isActivity": false
  },
  "Tuesday-6-8-A": {
    "classId": "8-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-305",
    "isActivity": false
  },
  "Tuesday-6-8-B": {
    "classId": "8-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-306",
    "isActivity": true
  },
  "Tuesday-6-8-C": {
    "classId": "8-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-307",
    "isActivity": false
  },
  "Tuesday-6-9-A": {
    "classId": "9-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-101",
    "isActivity": false
  },
  "Tuesday-6-9-B": {
    "classId": "9-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-102",
    "isActivity": false
  },
  "Tuesday-6-9-C": {
    "classId": "9-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-103",
    "isActivity": false
  },
  "Tuesday-6-9-D": {
    "classId": "9-D",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Tuesday-6-LKG-A": {
    "classId": "LKG-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Tuesday-6-LKG-B": {
    "classId": "LKG-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-104",
    "isActivity": true
  },
  "Tuesday-6-LKG-C": {
    "classId": "LKG-C",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "RHY",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Tuesday-6-NUR-A": {
    "classId": "NUR-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T094",
    "room": "A-101",
    "isActivity": true
  },
  "Tuesday-6-NUR-B": {
    "classId": "NUR-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "MUS",
    "teacherId": "T105",
    "room": "A-102",
    "isActivity": true
  },
  "Tuesday-6-UKG-A": {
    "classId": "UKG-A",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "EVS",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Tuesday-6-UKG-B": {
    "classId": "UKG-B",
    "day": "Tuesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Tuesday-7-1-A": {
    "classId": "1-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-108",
    "isActivity": false
  },
  "Tuesday-7-1-B": {
    "classId": "1-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-201",
    "isActivity": true
  },
  "Tuesday-7-1-C": {
    "classId": "1-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-202",
    "isActivity": true
  },
  "Tuesday-7-1-D": {
    "classId": "1-D",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-203",
    "isActivity": false
  },
  "Tuesday-7-10-A": {
    "classId": "10-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "C-105",
    "isActivity": false
  },
  "Tuesday-7-10-B": {
    "classId": "10-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-106",
    "isActivity": false
  },
  "Tuesday-7-10-C": {
    "classId": "10-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-107",
    "isActivity": false
  },
  "Tuesday-7-10-D": {
    "classId": "10-D",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-108",
    "isActivity": false
  },
  "Tuesday-7-11-A": {
    "classId": "11-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-201",
    "isActivity": true
  },
  "Tuesday-7-11-B": {
    "classId": "11-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-202",
    "isActivity": false
  },
  "Tuesday-7-11-C": {
    "classId": "11-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-203",
    "isActivity": true
  },
  "Tuesday-7-11-D": {
    "classId": "11-D",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-204",
    "isActivity": false
  },
  "Tuesday-7-11-E": {
    "classId": "11-E",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Tuesday-7-11-F": {
    "classId": "11-F",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-206",
    "isActivity": true
  },
  "Tuesday-7-12-A": {
    "classId": "12-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-207",
    "isActivity": false
  },
  "Tuesday-7-12-B": {
    "classId": "12-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Tuesday-7-12-C": {
    "classId": "12-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-301",
    "isActivity": false
  },
  "Tuesday-7-12-D": {
    "classId": "12-D",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-302",
    "isActivity": false
  },
  "Tuesday-7-2-A": {
    "classId": "2-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-204",
    "isActivity": false
  },
  "Tuesday-7-2-B": {
    "classId": "2-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-205",
    "isActivity": true
  },
  "Tuesday-7-2-C": {
    "classId": "2-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-206",
    "isActivity": false
  },
  "Tuesday-7-3-A": {
    "classId": "3-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-101",
    "isActivity": false
  },
  "Tuesday-7-3-B": {
    "classId": "3-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Tuesday-7-3-C": {
    "classId": "3-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-103",
    "isActivity": true
  },
  "Tuesday-7-3-D": {
    "classId": "3-D",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "B-104",
    "isActivity": true
  },
  "Tuesday-7-4-A": {
    "classId": "4-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-105",
    "isActivity": true
  },
  "Tuesday-7-4-B": {
    "classId": "4-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-106",
    "isActivity": false
  },
  "Tuesday-7-4-C": {
    "classId": "4-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-107",
    "isActivity": false
  },
  "Tuesday-7-5-A": {
    "classId": "5-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-108",
    "isActivity": true
  },
  "Tuesday-7-5-B": {
    "classId": "5-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-201",
    "isActivity": false
  },
  "Tuesday-7-5-C": {
    "classId": "5-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-202",
    "isActivity": false
  },
  "Tuesday-7-5-D": {
    "classId": "5-D",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-203",
    "isActivity": false
  },
  "Tuesday-7-5-E": {
    "classId": "5-E",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T023",
    "room": "B-204",
    "isActivity": false
  },
  "Tuesday-7-6-A": {
    "classId": "6-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-205",
    "isActivity": false
  },
  "Tuesday-7-6-B": {
    "classId": "6-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-206",
    "isActivity": false
  },
  "Tuesday-7-6-C": {
    "classId": "6-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-207",
    "isActivity": true
  },
  "Tuesday-7-6-D": {
    "classId": "6-D",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Tuesday-7-7-A": {
    "classId": "7-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-301",
    "isActivity": false
  },
  "Tuesday-7-7-B": {
    "classId": "7-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-302",
    "isActivity": false
  },
  "Tuesday-7-7-C": {
    "classId": "7-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Tuesday-7-7-D": {
    "classId": "7-D",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "B-304",
    "isActivity": false
  },
  "Tuesday-7-8-A": {
    "classId": "8-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-305",
    "isActivity": false
  },
  "Tuesday-7-8-B": {
    "classId": "8-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-306",
    "isActivity": true
  },
  "Tuesday-7-8-C": {
    "classId": "8-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-307",
    "isActivity": true
  },
  "Tuesday-7-9-A": {
    "classId": "9-A",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-101",
    "isActivity": false
  },
  "Tuesday-7-9-B": {
    "classId": "9-B",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-102",
    "isActivity": false
  },
  "Tuesday-7-9-C": {
    "classId": "9-C",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-103",
    "isActivity": false
  },
  "Tuesday-7-9-D": {
    "classId": "9-D",
    "day": "Tuesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-104",
    "isActivity": false
  },
  "Tuesday-8-10-A": {
    "classId": "10-A",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-105",
    "isActivity": false
  },
  "Tuesday-8-10-B": {
    "classId": "10-B",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "C-106",
    "isActivity": false
  },
  "Tuesday-8-10-C": {
    "classId": "10-C",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-107",
    "isActivity": false
  },
  "Tuesday-8-10-D": {
    "classId": "10-D",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-108",
    "isActivity": false
  },
  "Tuesday-8-11-A": {
    "classId": "11-A",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Tuesday-8-11-B": {
    "classId": "11-B",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-202",
    "isActivity": false
  },
  "Tuesday-8-11-C": {
    "classId": "11-C",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Tuesday-8-11-D": {
    "classId": "11-D",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "BST",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Tuesday-8-11-E": {
    "classId": "11-E",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-205",
    "isActivity": false
  },
  "Tuesday-8-11-F": {
    "classId": "11-F",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-206",
    "isActivity": false
  },
  "Tuesday-8-12-A": {
    "classId": "12-A",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-207",
    "isActivity": false
  },
  "Tuesday-8-12-B": {
    "classId": "12-B",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-208",
    "isActivity": false
  },
  "Tuesday-8-12-C": {
    "classId": "12-C",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-301",
    "isActivity": false
  },
  "Tuesday-8-12-D": {
    "classId": "12-D",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-302",
    "isActivity": false
  },
  "Tuesday-8-6-A": {
    "classId": "6-A",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-205",
    "isActivity": false
  },
  "Tuesday-8-6-B": {
    "classId": "6-B",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-206",
    "isActivity": false
  },
  "Tuesday-8-6-C": {
    "classId": "6-C",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-207",
    "isActivity": false
  },
  "Tuesday-8-6-D": {
    "classId": "6-D",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "VE",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": true
  },
  "Tuesday-8-7-A": {
    "classId": "7-A",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-301",
    "isActivity": false
  },
  "Tuesday-8-7-B": {
    "classId": "7-B",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-302",
    "isActivity": true
  },
  "Tuesday-8-7-C": {
    "classId": "7-C",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Tuesday-8-7-D": {
    "classId": "7-D",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-304",
    "isActivity": false
  },
  "Tuesday-8-8-A": {
    "classId": "8-A",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-305",
    "isActivity": false
  },
  "Tuesday-8-8-B": {
    "classId": "8-B",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Tuesday-8-8-C": {
    "classId": "8-C",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-307",
    "isActivity": true
  },
  "Tuesday-8-9-A": {
    "classId": "9-A",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-101",
    "isActivity": false
  },
  "Tuesday-8-9-B": {
    "classId": "9-B",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Tuesday-8-9-C": {
    "classId": "9-C",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-103",
    "isActivity": false
  },
  "Tuesday-8-9-D": {
    "classId": "9-D",
    "day": "Tuesday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Wednesday-1-1-A": {
    "classId": "1-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-108",
    "isActivity": false
  },
  "Wednesday-1-1-B": {
    "classId": "1-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Wednesday-1-1-C": {
    "classId": "1-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T047",
    "room": "A-202",
    "isActivity": true
  },
  "Wednesday-1-1-D": {
    "classId": "1-D",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "A-203",
    "isActivity": false
  },
  "Wednesday-1-10-A": {
    "classId": "10-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-105",
    "isActivity": false
  },
  "Wednesday-1-10-B": {
    "classId": "10-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Wednesday-1-10-C": {
    "classId": "10-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-107",
    "isActivity": false
  },
  "Wednesday-1-10-D": {
    "classId": "10-D",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-108",
    "isActivity": false
  },
  "Wednesday-1-11-A": {
    "classId": "11-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": true
  },
  "Wednesday-1-11-B": {
    "classId": "11-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-202",
    "isActivity": false
  },
  "Wednesday-1-11-C": {
    "classId": "11-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Wednesday-1-11-D": {
    "classId": "11-D",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Wednesday-1-11-E": {
    "classId": "11-E",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-205",
    "isActivity": false
  },
  "Wednesday-1-11-F": {
    "classId": "11-F",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-206",
    "isActivity": false
  },
  "Wednesday-1-12-A": {
    "classId": "12-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-207",
    "isActivity": false
  },
  "Wednesday-1-12-B": {
    "classId": "12-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-208",
    "isActivity": false
  },
  "Wednesday-1-12-C": {
    "classId": "12-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-301",
    "isActivity": true
  },
  "Wednesday-1-12-D": {
    "classId": "12-D",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-302",
    "isActivity": false
  },
  "Wednesday-1-2-A": {
    "classId": "2-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-204",
    "isActivity": false
  },
  "Wednesday-1-2-B": {
    "classId": "2-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Wednesday-1-2-C": {
    "classId": "2-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-206",
    "isActivity": false
  },
  "Wednesday-1-3-A": {
    "classId": "3-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-101",
    "isActivity": false
  },
  "Wednesday-1-3-B": {
    "classId": "3-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Wednesday-1-3-C": {
    "classId": "3-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-103",
    "isActivity": false
  },
  "Wednesday-1-3-D": {
    "classId": "3-D",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-104",
    "isActivity": true
  },
  "Wednesday-1-4-A": {
    "classId": "4-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-105",
    "isActivity": false
  },
  "Wednesday-1-4-B": {
    "classId": "4-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-106",
    "isActivity": true
  },
  "Wednesday-1-4-C": {
    "classId": "4-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-107",
    "isActivity": false
  },
  "Wednesday-1-5-A": {
    "classId": "5-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-108",
    "isActivity": true
  },
  "Wednesday-1-5-B": {
    "classId": "5-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-201",
    "isActivity": true
  },
  "Wednesday-1-5-C": {
    "classId": "5-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Wednesday-1-5-D": {
    "classId": "5-D",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-203",
    "isActivity": false
  },
  "Wednesday-1-5-E": {
    "classId": "5-E",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-204",
    "isActivity": false
  },
  "Wednesday-1-6-A": {
    "classId": "6-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-205",
    "isActivity": false
  },
  "Wednesday-1-6-B": {
    "classId": "6-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-206",
    "isActivity": false
  },
  "Wednesday-1-6-C": {
    "classId": "6-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "B-207",
    "isActivity": false
  },
  "Wednesday-1-6-D": {
    "classId": "6-D",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Wednesday-1-7-A": {
    "classId": "7-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-301",
    "isActivity": false
  },
  "Wednesday-1-7-B": {
    "classId": "7-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-302",
    "isActivity": false
  },
  "Wednesday-1-7-C": {
    "classId": "7-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-303",
    "isActivity": true
  },
  "Wednesday-1-7-D": {
    "classId": "7-D",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-304",
    "isActivity": false
  },
  "Wednesday-1-8-A": {
    "classId": "8-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "B-305",
    "isActivity": false
  },
  "Wednesday-1-8-B": {
    "classId": "8-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Wednesday-1-8-C": {
    "classId": "8-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-307",
    "isActivity": true
  },
  "Wednesday-1-9-A": {
    "classId": "9-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "C-101",
    "isActivity": false
  },
  "Wednesday-1-9-B": {
    "classId": "9-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "C-102",
    "isActivity": false
  },
  "Wednesday-1-9-C": {
    "classId": "9-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-103",
    "isActivity": false
  },
  "Wednesday-1-9-D": {
    "classId": "9-D",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Wednesday-1-LKG-A": {
    "classId": "LKG-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-103",
    "isActivity": true
  },
  "Wednesday-1-LKG-B": {
    "classId": "LKG-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Wednesday-1-LKG-C": {
    "classId": "LKG-C",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Wednesday-1-NUR-A": {
    "classId": "NUR-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Wednesday-1-NUR-B": {
    "classId": "NUR-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Wednesday-1-UKG-A": {
    "classId": "UKG-A",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-106",
    "isActivity": true
  },
  "Wednesday-1-UKG-B": {
    "classId": "UKG-B",
    "day": "Wednesday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Wednesday-2-1-A": {
    "classId": "1-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "EVS",
    "teacherId": "T014",
    "room": "A-108",
    "isActivity": false
  },
  "Wednesday-2-1-B": {
    "classId": "1-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-201",
    "isActivity": true
  },
  "Wednesday-2-1-C": {
    "classId": "1-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-202",
    "isActivity": false
  },
  "Wednesday-2-1-D": {
    "classId": "1-D",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-203",
    "isActivity": false
  },
  "Wednesday-2-10-A": {
    "classId": "10-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-105",
    "isActivity": false
  },
  "Wednesday-2-10-B": {
    "classId": "10-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-106",
    "isActivity": false
  },
  "Wednesday-2-10-C": {
    "classId": "10-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-107",
    "isActivity": false
  },
  "Wednesday-2-10-D": {
    "classId": "10-D",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-108",
    "isActivity": true
  },
  "Wednesday-2-11-A": {
    "classId": "11-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-201",
    "isActivity": false
  },
  "Wednesday-2-11-B": {
    "classId": "11-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Wednesday-2-11-C": {
    "classId": "11-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-203",
    "isActivity": false
  },
  "Wednesday-2-11-D": {
    "classId": "11-D",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Wednesday-2-11-E": {
    "classId": "11-E",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-205",
    "isActivity": false
  },
  "Wednesday-2-11-F": {
    "classId": "11-F",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "POL",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Wednesday-2-12-A": {
    "classId": "12-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-207",
    "isActivity": false
  },
  "Wednesday-2-12-B": {
    "classId": "12-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-208",
    "isActivity": false
  },
  "Wednesday-2-12-C": {
    "classId": "12-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-301",
    "isActivity": false
  },
  "Wednesday-2-12-D": {
    "classId": "12-D",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "HIS",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Wednesday-2-2-A": {
    "classId": "2-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-204",
    "isActivity": true
  },
  "Wednesday-2-2-B": {
    "classId": "2-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-205",
    "isActivity": true
  },
  "Wednesday-2-2-C": {
    "classId": "2-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-206",
    "isActivity": false
  },
  "Wednesday-2-3-A": {
    "classId": "3-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Wednesday-2-3-B": {
    "classId": "3-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-102",
    "isActivity": false
  },
  "Wednesday-2-3-C": {
    "classId": "3-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-103",
    "isActivity": false
  },
  "Wednesday-2-3-D": {
    "classId": "3-D",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-104",
    "isActivity": false
  },
  "Wednesday-2-4-A": {
    "classId": "4-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Wednesday-2-4-B": {
    "classId": "4-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-106",
    "isActivity": false
  },
  "Wednesday-2-4-C": {
    "classId": "4-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-107",
    "isActivity": false
  },
  "Wednesday-2-5-A": {
    "classId": "5-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-108",
    "isActivity": false
  },
  "Wednesday-2-5-B": {
    "classId": "5-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-201",
    "isActivity": false
  },
  "Wednesday-2-5-C": {
    "classId": "5-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "VE",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": true
  },
  "Wednesday-2-5-D": {
    "classId": "5-D",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-203",
    "isActivity": true
  },
  "Wednesday-2-5-E": {
    "classId": "5-E",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T023",
    "room": "B-204",
    "isActivity": false
  },
  "Wednesday-2-6-A": {
    "classId": "6-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-205",
    "isActivity": false
  },
  "Wednesday-2-6-B": {
    "classId": "6-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-206",
    "isActivity": false
  },
  "Wednesday-2-6-C": {
    "classId": "6-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-207",
    "isActivity": false
  },
  "Wednesday-2-6-D": {
    "classId": "6-D",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-208",
    "isActivity": true
  },
  "Wednesday-2-7-A": {
    "classId": "7-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-301",
    "isActivity": false
  },
  "Wednesday-2-7-B": {
    "classId": "7-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-302",
    "isActivity": false
  },
  "Wednesday-2-7-C": {
    "classId": "7-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "VE",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": true
  },
  "Wednesday-2-7-D": {
    "classId": "7-D",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-304",
    "isActivity": false
  },
  "Wednesday-2-8-A": {
    "classId": "8-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-305",
    "isActivity": true
  },
  "Wednesday-2-8-B": {
    "classId": "8-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Wednesday-2-8-C": {
    "classId": "8-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-307",
    "isActivity": false
  },
  "Wednesday-2-9-A": {
    "classId": "9-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "C-101",
    "isActivity": false
  },
  "Wednesday-2-9-B": {
    "classId": "9-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Wednesday-2-9-C": {
    "classId": "9-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-103",
    "isActivity": false
  },
  "Wednesday-2-9-D": {
    "classId": "9-D",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-104",
    "isActivity": true
  },
  "Wednesday-2-LKG-A": {
    "classId": "LKG-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Wednesday-2-LKG-B": {
    "classId": "LKG-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Wednesday-2-LKG-C": {
    "classId": "LKG-C",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-105",
    "isActivity": true
  },
  "Wednesday-2-NUR-A": {
    "classId": "NUR-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Wednesday-2-NUR-B": {
    "classId": "NUR-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Wednesday-2-UKG-A": {
    "classId": "UKG-A",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Wednesday-2-UKG-B": {
    "classId": "UKG-B",
    "day": "Wednesday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Wednesday-3-1-A": {
    "classId": "1-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-108",
    "isActivity": false
  },
  "Wednesday-3-1-B": {
    "classId": "1-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-201",
    "isActivity": false
  },
  "Wednesday-3-1-C": {
    "classId": "1-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-202",
    "isActivity": false
  },
  "Wednesday-3-1-D": {
    "classId": "1-D",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-203",
    "isActivity": false
  },
  "Wednesday-3-10-A": {
    "classId": "10-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-105",
    "isActivity": false
  },
  "Wednesday-3-10-B": {
    "classId": "10-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-106",
    "isActivity": true
  },
  "Wednesday-3-10-C": {
    "classId": "10-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-107",
    "isActivity": true
  },
  "Wednesday-3-10-D": {
    "classId": "10-D",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-108",
    "isActivity": false
  },
  "Wednesday-3-11-A": {
    "classId": "11-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-201",
    "isActivity": true
  },
  "Wednesday-3-11-B": {
    "classId": "11-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-202",
    "isActivity": false
  },
  "Wednesday-3-11-C": {
    "classId": "11-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-203",
    "isActivity": false
  },
  "Wednesday-3-11-D": {
    "classId": "11-D",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Wednesday-3-11-E": {
    "classId": "11-E",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": false
  },
  "Wednesday-3-11-F": {
    "classId": "11-F",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-206",
    "isActivity": true
  },
  "Wednesday-3-12-A": {
    "classId": "12-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-207",
    "isActivity": false
  },
  "Wednesday-3-12-B": {
    "classId": "12-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-208",
    "isActivity": false
  },
  "Wednesday-3-12-C": {
    "classId": "12-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-301",
    "isActivity": false
  },
  "Wednesday-3-12-D": {
    "classId": "12-D",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-302",
    "isActivity": false
  },
  "Wednesday-3-2-A": {
    "classId": "2-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-204",
    "isActivity": true
  },
  "Wednesday-3-2-B": {
    "classId": "2-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Wednesday-3-2-C": {
    "classId": "2-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-206",
    "isActivity": false
  },
  "Wednesday-3-3-A": {
    "classId": "3-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-101",
    "isActivity": false
  },
  "Wednesday-3-3-B": {
    "classId": "3-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-102",
    "isActivity": false
  },
  "Wednesday-3-3-C": {
    "classId": "3-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T087",
    "room": "B-103",
    "isActivity": false
  },
  "Wednesday-3-3-D": {
    "classId": "3-D",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Wednesday-3-4-A": {
    "classId": "4-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-105",
    "isActivity": false
  },
  "Wednesday-3-4-B": {
    "classId": "4-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-106",
    "isActivity": false
  },
  "Wednesday-3-4-C": {
    "classId": "4-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-107",
    "isActivity": false
  },
  "Wednesday-3-5-A": {
    "classId": "5-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-108",
    "isActivity": false
  },
  "Wednesday-3-5-B": {
    "classId": "5-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-201",
    "isActivity": false
  },
  "Wednesday-3-5-C": {
    "classId": "5-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-202",
    "isActivity": false
  },
  "Wednesday-3-5-D": {
    "classId": "5-D",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "B-203",
    "isActivity": false
  },
  "Wednesday-3-5-E": {
    "classId": "5-E",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T023",
    "room": "B-204",
    "isActivity": false
  },
  "Wednesday-3-6-A": {
    "classId": "6-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-205",
    "isActivity": false
  },
  "Wednesday-3-6-B": {
    "classId": "6-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "B-206",
    "isActivity": false
  },
  "Wednesday-3-6-C": {
    "classId": "6-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-207",
    "isActivity": false
  },
  "Wednesday-3-6-D": {
    "classId": "6-D",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-208",
    "isActivity": false
  },
  "Wednesday-3-7-A": {
    "classId": "7-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Wednesday-3-7-B": {
    "classId": "7-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-302",
    "isActivity": true
  },
  "Wednesday-3-7-C": {
    "classId": "7-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-303",
    "isActivity": false
  },
  "Wednesday-3-7-D": {
    "classId": "7-D",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "B-304",
    "isActivity": false
  },
  "Wednesday-3-8-A": {
    "classId": "8-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-305",
    "isActivity": false
  },
  "Wednesday-3-8-B": {
    "classId": "8-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-306",
    "isActivity": false
  },
  "Wednesday-3-8-C": {
    "classId": "8-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-307",
    "isActivity": true
  },
  "Wednesday-3-9-A": {
    "classId": "9-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-101",
    "isActivity": false
  },
  "Wednesday-3-9-B": {
    "classId": "9-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Wednesday-3-9-C": {
    "classId": "9-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-103",
    "isActivity": false
  },
  "Wednesday-3-9-D": {
    "classId": "9-D",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "C-104",
    "isActivity": false
  },
  "Wednesday-3-LKG-A": {
    "classId": "LKG-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Wednesday-3-LKG-B": {
    "classId": "LKG-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Wednesday-3-LKG-C": {
    "classId": "LKG-C",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-105",
    "isActivity": true
  },
  "Wednesday-3-NUR-A": {
    "classId": "NUR-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Wednesday-3-NUR-B": {
    "classId": "NUR-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Wednesday-3-UKG-A": {
    "classId": "UKG-A",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-106",
    "isActivity": true
  },
  "Wednesday-3-UKG-B": {
    "classId": "UKG-B",
    "day": "Wednesday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-107",
    "isActivity": true
  },
  "Wednesday-4-1-A": {
    "classId": "1-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T014",
    "room": "A-108",
    "isActivity": false
  },
  "Wednesday-4-1-B": {
    "classId": "1-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Wednesday-4-1-C": {
    "classId": "1-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "A-202",
    "isActivity": false
  },
  "Wednesday-4-1-D": {
    "classId": "1-D",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-203",
    "isActivity": true
  },
  "Wednesday-4-10-A": {
    "classId": "10-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-105",
    "isActivity": false
  },
  "Wednesday-4-10-B": {
    "classId": "10-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "C-106",
    "isActivity": false
  },
  "Wednesday-4-10-C": {
    "classId": "10-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-107",
    "isActivity": false
  },
  "Wednesday-4-10-D": {
    "classId": "10-D",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-108",
    "isActivity": false
  },
  "Wednesday-4-11-A": {
    "classId": "11-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": false
  },
  "Wednesday-4-11-B": {
    "classId": "11-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-202",
    "isActivity": true
  },
  "Wednesday-4-11-C": {
    "classId": "11-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-203",
    "isActivity": false
  },
  "Wednesday-4-11-D": {
    "classId": "11-D",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "BST",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Wednesday-4-11-E": {
    "classId": "11-E",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "BST",
    "teacherId": "T043",
    "room": "C-205",
    "isActivity": false
  },
  "Wednesday-4-11-F": {
    "classId": "11-F",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-206",
    "isActivity": false
  },
  "Wednesday-4-12-A": {
    "classId": "12-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-207",
    "isActivity": false
  },
  "Wednesday-4-12-B": {
    "classId": "12-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-208",
    "isActivity": true
  },
  "Wednesday-4-12-C": {
    "classId": "12-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-301",
    "isActivity": false
  },
  "Wednesday-4-12-D": {
    "classId": "12-D",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-302",
    "isActivity": false
  },
  "Wednesday-4-2-A": {
    "classId": "2-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-204",
    "isActivity": true
  },
  "Wednesday-4-2-B": {
    "classId": "2-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-205",
    "isActivity": false
  },
  "Wednesday-4-2-C": {
    "classId": "2-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T059",
    "room": "A-206",
    "isActivity": true
  },
  "Wednesday-4-3-A": {
    "classId": "3-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-101",
    "isActivity": true
  },
  "Wednesday-4-3-B": {
    "classId": "3-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-102",
    "isActivity": true
  },
  "Wednesday-4-3-C": {
    "classId": "3-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T101",
    "room": "B-103",
    "isActivity": true
  },
  "Wednesday-4-3-D": {
    "classId": "3-D",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Wednesday-4-4-A": {
    "classId": "4-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Wednesday-4-4-B": {
    "classId": "4-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-106",
    "isActivity": false
  },
  "Wednesday-4-4-C": {
    "classId": "4-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-107",
    "isActivity": false
  },
  "Wednesday-4-5-A": {
    "classId": "5-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-108",
    "isActivity": false
  },
  "Wednesday-4-5-B": {
    "classId": "5-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-201",
    "isActivity": false
  },
  "Wednesday-4-5-C": {
    "classId": "5-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Wednesday-4-5-D": {
    "classId": "5-D",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Wednesday-4-5-E": {
    "classId": "5-E",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Wednesday-4-6-A": {
    "classId": "6-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T033",
    "room": "B-205",
    "isActivity": true
  },
  "Wednesday-4-6-B": {
    "classId": "6-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-206",
    "isActivity": false
  },
  "Wednesday-4-6-C": {
    "classId": "6-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-207",
    "isActivity": true
  },
  "Wednesday-4-6-D": {
    "classId": "6-D",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-208",
    "isActivity": true
  },
  "Wednesday-4-7-A": {
    "classId": "7-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-301",
    "isActivity": false
  },
  "Wednesday-4-7-B": {
    "classId": "7-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-302",
    "isActivity": false
  },
  "Wednesday-4-7-C": {
    "classId": "7-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-303",
    "isActivity": false
  },
  "Wednesday-4-7-D": {
    "classId": "7-D",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "B-304",
    "isActivity": false
  },
  "Wednesday-4-8-A": {
    "classId": "8-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Wednesday-4-8-B": {
    "classId": "8-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Wednesday-4-8-C": {
    "classId": "8-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "SAN",
    "teacherId": "T024",
    "room": "B-307",
    "isActivity": false
  },
  "Wednesday-4-9-A": {
    "classId": "9-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "C-101",
    "isActivity": false
  },
  "Wednesday-4-9-B": {
    "classId": "9-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-102",
    "isActivity": false
  },
  "Wednesday-4-9-C": {
    "classId": "9-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-103",
    "isActivity": true
  },
  "Wednesday-4-9-D": {
    "classId": "9-D",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Wednesday-4-LKG-A": {
    "classId": "LKG-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Wednesday-4-LKG-B": {
    "classId": "LKG-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-104",
    "isActivity": true
  },
  "Wednesday-4-LKG-C": {
    "classId": "LKG-C",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-105",
    "isActivity": true
  },
  "Wednesday-4-NUR-A": {
    "classId": "NUR-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Wednesday-4-NUR-B": {
    "classId": "NUR-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Wednesday-4-UKG-A": {
    "classId": "UKG-A",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "RHY",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Wednesday-4-UKG-B": {
    "classId": "UKG-B",
    "day": "Wednesday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Wednesday-5-1-A": {
    "classId": "1-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-108",
    "isActivity": false
  },
  "Wednesday-5-1-B": {
    "classId": "1-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Wednesday-5-1-C": {
    "classId": "1-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-202",
    "isActivity": false
  },
  "Wednesday-5-1-D": {
    "classId": "1-D",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "A-203",
    "isActivity": false
  },
  "Wednesday-5-10-A": {
    "classId": "10-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "VE",
    "teacherId": "T027",
    "room": "C-105",
    "isActivity": true
  },
  "Wednesday-5-10-B": {
    "classId": "10-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-106",
    "isActivity": false
  },
  "Wednesday-5-10-C": {
    "classId": "10-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-107",
    "isActivity": false
  },
  "Wednesday-5-10-D": {
    "classId": "10-D",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-108",
    "isActivity": false
  },
  "Wednesday-5-11-A": {
    "classId": "11-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-201",
    "isActivity": false
  },
  "Wednesday-5-11-B": {
    "classId": "11-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-202",
    "isActivity": false
  },
  "Wednesday-5-11-C": {
    "classId": "11-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Wednesday-5-11-D": {
    "classId": "11-D",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "BST",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Wednesday-5-11-E": {
    "classId": "11-E",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "BST",
    "teacherId": "T043",
    "room": "C-205",
    "isActivity": false
  },
  "Wednesday-5-11-F": {
    "classId": "11-F",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-206",
    "isActivity": false
  },
  "Wednesday-5-12-A": {
    "classId": "12-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-207",
    "isActivity": false
  },
  "Wednesday-5-12-B": {
    "classId": "12-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Wednesday-5-12-C": {
    "classId": "12-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-301",
    "isActivity": false
  },
  "Wednesday-5-12-D": {
    "classId": "12-D",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-302",
    "isActivity": false
  },
  "Wednesday-5-2-A": {
    "classId": "2-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-204",
    "isActivity": false
  },
  "Wednesday-5-2-B": {
    "classId": "2-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Wednesday-5-2-C": {
    "classId": "2-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "A-206",
    "isActivity": true
  },
  "Wednesday-5-3-A": {
    "classId": "3-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Wednesday-5-3-B": {
    "classId": "3-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-102",
    "isActivity": false
  },
  "Wednesday-5-3-C": {
    "classId": "3-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-103",
    "isActivity": true
  },
  "Wednesday-5-3-D": {
    "classId": "3-D",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-104",
    "isActivity": true
  },
  "Wednesday-5-4-A": {
    "classId": "4-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Wednesday-5-4-B": {
    "classId": "4-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-106",
    "isActivity": false
  },
  "Wednesday-5-4-C": {
    "classId": "4-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "VE",
    "teacherId": "T060",
    "room": "B-107",
    "isActivity": true
  },
  "Wednesday-5-5-A": {
    "classId": "5-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-108",
    "isActivity": false
  },
  "Wednesday-5-5-B": {
    "classId": "5-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-201",
    "isActivity": true
  },
  "Wednesday-5-5-C": {
    "classId": "5-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-202",
    "isActivity": false
  },
  "Wednesday-5-5-D": {
    "classId": "5-D",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-203",
    "isActivity": false
  },
  "Wednesday-5-5-E": {
    "classId": "5-E",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T023",
    "room": "B-204",
    "isActivity": false
  },
  "Wednesday-5-6-A": {
    "classId": "6-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-205",
    "isActivity": false
  },
  "Wednesday-5-6-B": {
    "classId": "6-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-206",
    "isActivity": true
  },
  "Wednesday-5-6-C": {
    "classId": "6-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-207",
    "isActivity": false
  },
  "Wednesday-5-6-D": {
    "classId": "6-D",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Wednesday-5-7-A": {
    "classId": "7-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-301",
    "isActivity": false
  },
  "Wednesday-5-7-B": {
    "classId": "7-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-302",
    "isActivity": false
  },
  "Wednesday-5-7-C": {
    "classId": "7-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": false
  },
  "Wednesday-5-7-D": {
    "classId": "7-D",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-304",
    "isActivity": true
  },
  "Wednesday-5-8-A": {
    "classId": "8-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Wednesday-5-8-B": {
    "classId": "8-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-306",
    "isActivity": false
  },
  "Wednesday-5-8-C": {
    "classId": "8-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-307",
    "isActivity": false
  },
  "Wednesday-5-9-A": {
    "classId": "9-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-101",
    "isActivity": false
  },
  "Wednesday-5-9-B": {
    "classId": "9-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "C-102",
    "isActivity": false
  },
  "Wednesday-5-9-C": {
    "classId": "9-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-103",
    "isActivity": true
  },
  "Wednesday-5-9-D": {
    "classId": "9-D",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-104",
    "isActivity": false
  },
  "Wednesday-5-LKG-A": {
    "classId": "LKG-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "EVS",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Wednesday-5-LKG-B": {
    "classId": "LKG-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Wednesday-5-LKG-C": {
    "classId": "LKG-C",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Wednesday-5-NUR-A": {
    "classId": "NUR-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Wednesday-5-NUR-B": {
    "classId": "NUR-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-102",
    "isActivity": true
  },
  "Wednesday-5-UKG-A": {
    "classId": "UKG-A",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-106",
    "isActivity": true
  },
  "Wednesday-5-UKG-B": {
    "classId": "UKG-B",
    "day": "Wednesday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Wednesday-6-1-A": {
    "classId": "1-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-108",
    "isActivity": false
  },
  "Wednesday-6-1-B": {
    "classId": "1-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-201",
    "isActivity": true
  },
  "Wednesday-6-1-C": {
    "classId": "1-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-202",
    "isActivity": false
  },
  "Wednesday-6-1-D": {
    "classId": "1-D",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-203",
    "isActivity": false
  },
  "Wednesday-6-10-A": {
    "classId": "10-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-105",
    "isActivity": true
  },
  "Wednesday-6-10-B": {
    "classId": "10-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Wednesday-6-10-C": {
    "classId": "10-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-107",
    "isActivity": false
  },
  "Wednesday-6-10-D": {
    "classId": "10-D",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-108",
    "isActivity": false
  },
  "Wednesday-6-11-A": {
    "classId": "11-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-201",
    "isActivity": false
  },
  "Wednesday-6-11-B": {
    "classId": "11-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-202",
    "isActivity": false
  },
  "Wednesday-6-11-C": {
    "classId": "11-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-203",
    "isActivity": false
  },
  "Wednesday-6-11-D": {
    "classId": "11-D",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "BST",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Wednesday-6-11-E": {
    "classId": "11-E",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Wednesday-6-11-F": {
    "classId": "11-F",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "HIS",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Wednesday-6-12-A": {
    "classId": "12-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-207",
    "isActivity": false
  },
  "Wednesday-6-12-B": {
    "classId": "12-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Wednesday-6-12-C": {
    "classId": "12-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Wednesday-6-12-D": {
    "classId": "12-D",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-302",
    "isActivity": false
  },
  "Wednesday-6-2-A": {
    "classId": "2-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-204",
    "isActivity": true
  },
  "Wednesday-6-2-B": {
    "classId": "2-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "A-205",
    "isActivity": true
  },
  "Wednesday-6-2-C": {
    "classId": "2-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-206",
    "isActivity": false
  },
  "Wednesday-6-3-A": {
    "classId": "3-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Wednesday-6-3-B": {
    "classId": "3-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-102",
    "isActivity": false
  },
  "Wednesday-6-3-C": {
    "classId": "3-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-103",
    "isActivity": false
  },
  "Wednesday-6-3-D": {
    "classId": "3-D",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Wednesday-6-4-A": {
    "classId": "4-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-105",
    "isActivity": true
  },
  "Wednesday-6-4-B": {
    "classId": "4-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-106",
    "isActivity": false
  },
  "Wednesday-6-4-C": {
    "classId": "4-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-107",
    "isActivity": false
  },
  "Wednesday-6-5-A": {
    "classId": "5-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Wednesday-6-5-B": {
    "classId": "5-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-201",
    "isActivity": false
  },
  "Wednesday-6-5-C": {
    "classId": "5-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-202",
    "isActivity": false
  },
  "Wednesday-6-5-D": {
    "classId": "5-D",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-203",
    "isActivity": true
  },
  "Wednesday-6-5-E": {
    "classId": "5-E",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-204",
    "isActivity": true
  },
  "Wednesday-6-6-A": {
    "classId": "6-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-205",
    "isActivity": false
  },
  "Wednesday-6-6-B": {
    "classId": "6-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-206",
    "isActivity": true
  },
  "Wednesday-6-6-C": {
    "classId": "6-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-207",
    "isActivity": false
  },
  "Wednesday-6-6-D": {
    "classId": "6-D",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Wednesday-6-7-A": {
    "classId": "7-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-301",
    "isActivity": false
  },
  "Wednesday-6-7-B": {
    "classId": "7-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-302",
    "isActivity": true
  },
  "Wednesday-6-7-C": {
    "classId": "7-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": false
  },
  "Wednesday-6-7-D": {
    "classId": "7-D",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-304",
    "isActivity": false
  },
  "Wednesday-6-8-A": {
    "classId": "8-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "B-305",
    "isActivity": false
  },
  "Wednesday-6-8-B": {
    "classId": "8-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-306",
    "isActivity": true
  },
  "Wednesday-6-8-C": {
    "classId": "8-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-307",
    "isActivity": false
  },
  "Wednesday-6-9-A": {
    "classId": "9-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "C-101",
    "isActivity": false
  },
  "Wednesday-6-9-B": {
    "classId": "9-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-102",
    "isActivity": false
  },
  "Wednesday-6-9-C": {
    "classId": "9-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-103",
    "isActivity": false
  },
  "Wednesday-6-9-D": {
    "classId": "9-D",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-104",
    "isActivity": true
  },
  "Wednesday-6-LKG-A": {
    "classId": "LKG-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Wednesday-6-LKG-B": {
    "classId": "LKG-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Wednesday-6-LKG-C": {
    "classId": "LKG-C",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Wednesday-6-NUR-A": {
    "classId": "NUR-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Wednesday-6-NUR-B": {
    "classId": "NUR-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-102",
    "isActivity": true
  },
  "Wednesday-6-UKG-A": {
    "classId": "UKG-A",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Wednesday-6-UKG-B": {
    "classId": "UKG-B",
    "day": "Wednesday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Wednesday-7-1-A": {
    "classId": "1-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-108",
    "isActivity": true
  },
  "Wednesday-7-1-B": {
    "classId": "1-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Wednesday-7-1-C": {
    "classId": "1-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-202",
    "isActivity": false
  },
  "Wednesday-7-1-D": {
    "classId": "1-D",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-203",
    "isActivity": true
  },
  "Wednesday-7-10-A": {
    "classId": "10-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-105",
    "isActivity": false
  },
  "Wednesday-7-10-B": {
    "classId": "10-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Wednesday-7-10-C": {
    "classId": "10-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-107",
    "isActivity": false
  },
  "Wednesday-7-10-D": {
    "classId": "10-D",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-108",
    "isActivity": false
  },
  "Wednesday-7-11-A": {
    "classId": "11-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T071",
    "room": "C-201",
    "isActivity": false
  },
  "Wednesday-7-11-B": {
    "classId": "11-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-202",
    "isActivity": true
  },
  "Wednesday-7-11-C": {
    "classId": "11-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-203",
    "isActivity": false
  },
  "Wednesday-7-11-D": {
    "classId": "11-D",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-204",
    "isActivity": false
  },
  "Wednesday-7-11-E": {
    "classId": "11-E",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-205",
    "isActivity": false
  },
  "Wednesday-7-11-F": {
    "classId": "11-F",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-206",
    "isActivity": false
  },
  "Wednesday-7-12-A": {
    "classId": "12-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-207",
    "isActivity": false
  },
  "Wednesday-7-12-B": {
    "classId": "12-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Wednesday-7-12-C": {
    "classId": "12-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Wednesday-7-12-D": {
    "classId": "12-D",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-302",
    "isActivity": true
  },
  "Wednesday-7-2-A": {
    "classId": "2-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-204",
    "isActivity": false
  },
  "Wednesday-7-2-B": {
    "classId": "2-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-205",
    "isActivity": false
  },
  "Wednesday-7-2-C": {
    "classId": "2-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-206",
    "isActivity": true
  },
  "Wednesday-7-3-A": {
    "classId": "3-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-101",
    "isActivity": false
  },
  "Wednesday-7-3-B": {
    "classId": "3-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "B-102",
    "isActivity": false
  },
  "Wednesday-7-3-C": {
    "classId": "3-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-103",
    "isActivity": false
  },
  "Wednesday-7-3-D": {
    "classId": "3-D",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Wednesday-7-4-A": {
    "classId": "4-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Wednesday-7-4-B": {
    "classId": "4-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-106",
    "isActivity": false
  },
  "Wednesday-7-4-C": {
    "classId": "4-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-107",
    "isActivity": false
  },
  "Wednesday-7-5-A": {
    "classId": "5-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Wednesday-7-5-B": {
    "classId": "5-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-201",
    "isActivity": false
  },
  "Wednesday-7-5-C": {
    "classId": "5-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Wednesday-7-5-D": {
    "classId": "5-D",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-203",
    "isActivity": true
  },
  "Wednesday-7-5-E": {
    "classId": "5-E",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-204",
    "isActivity": false
  },
  "Wednesday-7-6-A": {
    "classId": "6-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-205",
    "isActivity": false
  },
  "Wednesday-7-6-B": {
    "classId": "6-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "B-206",
    "isActivity": false
  },
  "Wednesday-7-6-C": {
    "classId": "6-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-207",
    "isActivity": false
  },
  "Wednesday-7-6-D": {
    "classId": "6-D",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-208",
    "isActivity": true
  },
  "Wednesday-7-7-A": {
    "classId": "7-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-301",
    "isActivity": false
  },
  "Wednesday-7-7-B": {
    "classId": "7-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-302",
    "isActivity": false
  },
  "Wednesday-7-7-C": {
    "classId": "7-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-303",
    "isActivity": false
  },
  "Wednesday-7-7-D": {
    "classId": "7-D",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-304",
    "isActivity": true
  },
  "Wednesday-7-8-A": {
    "classId": "8-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-305",
    "isActivity": false
  },
  "Wednesday-7-8-B": {
    "classId": "8-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-306",
    "isActivity": false
  },
  "Wednesday-7-8-C": {
    "classId": "8-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "VE",
    "teacherId": "T011",
    "room": "B-307",
    "isActivity": true
  },
  "Wednesday-7-9-A": {
    "classId": "9-A",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "C-101",
    "isActivity": false
  },
  "Wednesday-7-9-B": {
    "classId": "9-B",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-102",
    "isActivity": false
  },
  "Wednesday-7-9-C": {
    "classId": "9-C",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-103",
    "isActivity": false
  },
  "Wednesday-7-9-D": {
    "classId": "9-D",
    "day": "Wednesday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "C-104",
    "isActivity": false
  },
  "Wednesday-8-10-A": {
    "classId": "10-A",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-105",
    "isActivity": false
  },
  "Wednesday-8-10-B": {
    "classId": "10-B",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "C-106",
    "isActivity": false
  },
  "Wednesday-8-10-C": {
    "classId": "10-C",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-107",
    "isActivity": false
  },
  "Wednesday-8-10-D": {
    "classId": "10-D",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-108",
    "isActivity": false
  },
  "Wednesday-8-11-A": {
    "classId": "11-A",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T071",
    "room": "C-201",
    "isActivity": false
  },
  "Wednesday-8-11-B": {
    "classId": "11-B",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Wednesday-8-11-C": {
    "classId": "11-C",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-203",
    "isActivity": false
  },
  "Wednesday-8-11-D": {
    "classId": "11-D",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "BST",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Wednesday-8-11-E": {
    "classId": "11-E",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "BST",
    "teacherId": "T043",
    "room": "C-205",
    "isActivity": false
  },
  "Wednesday-8-11-F": {
    "classId": "11-F",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "HIS",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Wednesday-8-12-A": {
    "classId": "12-A",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-207",
    "isActivity": false
  },
  "Wednesday-8-12-B": {
    "classId": "12-B",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-208",
    "isActivity": false
  },
  "Wednesday-8-12-C": {
    "classId": "12-C",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-301",
    "isActivity": false
  },
  "Wednesday-8-12-D": {
    "classId": "12-D",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "POL",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Wednesday-8-6-A": {
    "classId": "6-A",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-205",
    "isActivity": false
  },
  "Wednesday-8-6-B": {
    "classId": "6-B",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-206",
    "isActivity": false
  },
  "Wednesday-8-6-C": {
    "classId": "6-C",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-207",
    "isActivity": false
  },
  "Wednesday-8-6-D": {
    "classId": "6-D",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-208",
    "isActivity": false
  },
  "Wednesday-8-7-A": {
    "classId": "7-A",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-301",
    "isActivity": true
  },
  "Wednesday-8-7-B": {
    "classId": "7-B",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-302",
    "isActivity": true
  },
  "Wednesday-8-7-C": {
    "classId": "7-C",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-303",
    "isActivity": false
  },
  "Wednesday-8-7-D": {
    "classId": "7-D",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-304",
    "isActivity": false
  },
  "Wednesday-8-8-A": {
    "classId": "8-A",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-305",
    "isActivity": true
  },
  "Wednesday-8-8-B": {
    "classId": "8-B",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Wednesday-8-8-C": {
    "classId": "8-C",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-307",
    "isActivity": false
  },
  "Wednesday-8-9-A": {
    "classId": "9-A",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-101",
    "isActivity": false
  },
  "Wednesday-8-9-B": {
    "classId": "9-B",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Wednesday-8-9-C": {
    "classId": "9-C",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-103",
    "isActivity": false
  },
  "Wednesday-8-9-D": {
    "classId": "9-D",
    "day": "Wednesday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-104",
    "isActivity": false
  },
  "Thursday-1-1-A": {
    "classId": "1-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-108",
    "isActivity": true
  },
  "Thursday-1-1-B": {
    "classId": "1-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-201",
    "isActivity": false
  },
  "Thursday-1-1-C": {
    "classId": "1-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T047",
    "room": "A-202",
    "isActivity": true
  },
  "Thursday-1-1-D": {
    "classId": "1-D",
    "day": "Thursday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-203",
    "isActivity": true
  },
  "Thursday-1-10-A": {
    "classId": "10-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-105",
    "isActivity": false
  },
  "Thursday-1-10-B": {
    "classId": "10-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Thursday-1-10-C": {
    "classId": "10-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T051",
    "room": "C-107",
    "isActivity": true
  },
  "Thursday-1-10-D": {
    "classId": "10-D",
    "day": "Thursday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-108",
    "isActivity": false
  },
  "Thursday-1-11-A": {
    "classId": "11-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": false
  },
  "Thursday-1-11-B": {
    "classId": "11-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Thursday-1-11-C": {
    "classId": "11-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Thursday-1-11-D": {
    "classId": "11-D",
    "day": "Thursday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-204",
    "isActivity": false
  },
  "Thursday-1-11-E": {
    "classId": "11-E",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Thursday-1-11-F": {
    "classId": "11-F",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-206",
    "isActivity": false
  },
  "Thursday-1-12-A": {
    "classId": "12-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Thursday-1-12-B": {
    "classId": "12-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-208",
    "isActivity": true
  },
  "Thursday-1-12-C": {
    "classId": "12-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Thursday-1-12-D": {
    "classId": "12-D",
    "day": "Thursday",
    "period": 1,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-302",
    "isActivity": false
  },
  "Thursday-1-2-A": {
    "classId": "2-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T086",
    "room": "A-204",
    "isActivity": true
  },
  "Thursday-1-2-B": {
    "classId": "2-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Thursday-1-2-C": {
    "classId": "2-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "A-206",
    "isActivity": true
  },
  "Thursday-1-3-A": {
    "classId": "3-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "B-101",
    "isActivity": false
  },
  "Thursday-1-3-B": {
    "classId": "3-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-102",
    "isActivity": true
  },
  "Thursday-1-3-C": {
    "classId": "3-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "B-103",
    "isActivity": false
  },
  "Thursday-1-3-D": {
    "classId": "3-D",
    "day": "Thursday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-104",
    "isActivity": false
  },
  "Thursday-1-4-A": {
    "classId": "4-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Thursday-1-4-B": {
    "classId": "4-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-106",
    "isActivity": true
  },
  "Thursday-1-4-C": {
    "classId": "4-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-107",
    "isActivity": false
  },
  "Thursday-1-5-A": {
    "classId": "5-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-108",
    "isActivity": true
  },
  "Thursday-1-5-B": {
    "classId": "5-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-201",
    "isActivity": false
  },
  "Thursday-1-5-C": {
    "classId": "5-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-202",
    "isActivity": false
  },
  "Thursday-1-5-D": {
    "classId": "5-D",
    "day": "Thursday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-203",
    "isActivity": false
  },
  "Thursday-1-5-E": {
    "classId": "5-E",
    "day": "Thursday",
    "period": 1,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-204",
    "isActivity": true
  },
  "Thursday-1-6-A": {
    "classId": "6-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-205",
    "isActivity": false
  },
  "Thursday-1-6-B": {
    "classId": "6-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-206",
    "isActivity": false
  },
  "Thursday-1-6-C": {
    "classId": "6-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-207",
    "isActivity": true
  },
  "Thursday-1-6-D": {
    "classId": "6-D",
    "day": "Thursday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-208",
    "isActivity": true
  },
  "Thursday-1-7-A": {
    "classId": "7-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Thursday-1-7-B": {
    "classId": "7-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-302",
    "isActivity": false
  },
  "Thursday-1-7-C": {
    "classId": "7-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-303",
    "isActivity": false
  },
  "Thursday-1-7-D": {
    "classId": "7-D",
    "day": "Thursday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-304",
    "isActivity": false
  },
  "Thursday-1-8-A": {
    "classId": "8-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-305",
    "isActivity": false
  },
  "Thursday-1-8-B": {
    "classId": "8-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-306",
    "isActivity": false
  },
  "Thursday-1-8-C": {
    "classId": "8-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-307",
    "isActivity": false
  },
  "Thursday-1-9-A": {
    "classId": "9-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-101",
    "isActivity": false
  },
  "Thursday-1-9-B": {
    "classId": "9-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-102",
    "isActivity": false
  },
  "Thursday-1-9-C": {
    "classId": "9-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-103",
    "isActivity": false
  },
  "Thursday-1-9-D": {
    "classId": "9-D",
    "day": "Thursday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-104",
    "isActivity": false
  },
  "Thursday-1-LKG-A": {
    "classId": "LKG-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "MUS",
    "teacherId": "T105",
    "room": "A-103",
    "isActivity": true
  },
  "Thursday-1-LKG-B": {
    "classId": "LKG-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-104",
    "isActivity": true
  },
  "Thursday-1-LKG-C": {
    "classId": "LKG-C",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Thursday-1-NUR-A": {
    "classId": "NUR-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Thursday-1-NUR-B": {
    "classId": "NUR-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-102",
    "isActivity": true
  },
  "Thursday-1-UKG-A": {
    "classId": "UKG-A",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Thursday-1-UKG-B": {
    "classId": "UKG-B",
    "day": "Thursday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Thursday-2-1-A": {
    "classId": "1-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-108",
    "isActivity": false
  },
  "Thursday-2-1-B": {
    "classId": "1-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "VE",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": true
  },
  "Thursday-2-1-C": {
    "classId": "1-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-202",
    "isActivity": true
  },
  "Thursday-2-1-D": {
    "classId": "1-D",
    "day": "Thursday",
    "period": 2,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-203",
    "isActivity": true
  },
  "Thursday-2-10-A": {
    "classId": "10-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-105",
    "isActivity": false
  },
  "Thursday-2-10-B": {
    "classId": "10-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Thursday-2-10-C": {
    "classId": "10-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-107",
    "isActivity": false
  },
  "Thursday-2-10-D": {
    "classId": "10-D",
    "day": "Thursday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-108",
    "isActivity": false
  },
  "Thursday-2-11-A": {
    "classId": "11-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-201",
    "isActivity": false
  },
  "Thursday-2-11-B": {
    "classId": "11-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-202",
    "isActivity": false
  },
  "Thursday-2-11-C": {
    "classId": "11-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-203",
    "isActivity": false
  },
  "Thursday-2-11-D": {
    "classId": "11-D",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Thursday-2-11-E": {
    "classId": "11-E",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Thursday-2-11-F": {
    "classId": "11-F",
    "day": "Thursday",
    "period": 2,
    "subjectId": "POL",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Thursday-2-12-A": {
    "classId": "12-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-207",
    "isActivity": false
  },
  "Thursday-2-12-B": {
    "classId": "12-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-208",
    "isActivity": false
  },
  "Thursday-2-12-C": {
    "classId": "12-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-301",
    "isActivity": false
  },
  "Thursday-2-12-D": {
    "classId": "12-D",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-302",
    "isActivity": false
  },
  "Thursday-2-2-A": {
    "classId": "2-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-204",
    "isActivity": false
  },
  "Thursday-2-2-B": {
    "classId": "2-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Thursday-2-2-C": {
    "classId": "2-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-206",
    "isActivity": false
  },
  "Thursday-2-3-A": {
    "classId": "3-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "B-101",
    "isActivity": false
  },
  "Thursday-2-3-B": {
    "classId": "3-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-102",
    "isActivity": true
  },
  "Thursday-2-3-C": {
    "classId": "3-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-103",
    "isActivity": false
  },
  "Thursday-2-3-D": {
    "classId": "3-D",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-104",
    "isActivity": false
  },
  "Thursday-2-4-A": {
    "classId": "4-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Thursday-2-4-B": {
    "classId": "4-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-106",
    "isActivity": false
  },
  "Thursday-2-4-C": {
    "classId": "4-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-107",
    "isActivity": true
  },
  "Thursday-2-5-A": {
    "classId": "5-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-108",
    "isActivity": false
  },
  "Thursday-2-5-B": {
    "classId": "5-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-201",
    "isActivity": false
  },
  "Thursday-2-5-C": {
    "classId": "5-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-202",
    "isActivity": false
  },
  "Thursday-2-5-D": {
    "classId": "5-D",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-203",
    "isActivity": false
  },
  "Thursday-2-5-E": {
    "classId": "5-E",
    "day": "Thursday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-204",
    "isActivity": false
  },
  "Thursday-2-6-A": {
    "classId": "6-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-205",
    "isActivity": true
  },
  "Thursday-2-6-B": {
    "classId": "6-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-206",
    "isActivity": false
  },
  "Thursday-2-6-C": {
    "classId": "6-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-207",
    "isActivity": false
  },
  "Thursday-2-6-D": {
    "classId": "6-D",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Thursday-2-7-A": {
    "classId": "7-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-301",
    "isActivity": true
  },
  "Thursday-2-7-B": {
    "classId": "7-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-302",
    "isActivity": true
  },
  "Thursday-2-7-C": {
    "classId": "7-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-303",
    "isActivity": false
  },
  "Thursday-2-7-D": {
    "classId": "7-D",
    "day": "Thursday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-304",
    "isActivity": false
  },
  "Thursday-2-8-A": {
    "classId": "8-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-305",
    "isActivity": false
  },
  "Thursday-2-8-B": {
    "classId": "8-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-306",
    "isActivity": true
  },
  "Thursday-2-8-C": {
    "classId": "8-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-307",
    "isActivity": false
  },
  "Thursday-2-9-A": {
    "classId": "9-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-101",
    "isActivity": false
  },
  "Thursday-2-9-B": {
    "classId": "9-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-102",
    "isActivity": false
  },
  "Thursday-2-9-C": {
    "classId": "9-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-103",
    "isActivity": false
  },
  "Thursday-2-9-D": {
    "classId": "9-D",
    "day": "Thursday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "C-104",
    "isActivity": false
  },
  "Thursday-2-LKG-A": {
    "classId": "LKG-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "RHY",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Thursday-2-LKG-B": {
    "classId": "LKG-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "RHY",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Thursday-2-LKG-C": {
    "classId": "LKG-C",
    "day": "Thursday",
    "period": 2,
    "subjectId": "RHY",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Thursday-2-NUR-A": {
    "classId": "NUR-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "EVS",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Thursday-2-NUR-B": {
    "classId": "NUR-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-102",
    "isActivity": true
  },
  "Thursday-2-UKG-A": {
    "classId": "UKG-A",
    "day": "Thursday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Thursday-2-UKG-B": {
    "classId": "UKG-B",
    "day": "Thursday",
    "period": 2,
    "subjectId": "RHY",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Thursday-3-1-A": {
    "classId": "1-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-108",
    "isActivity": false
  },
  "Thursday-3-1-B": {
    "classId": "1-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-201",
    "isActivity": false
  },
  "Thursday-3-1-C": {
    "classId": "1-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "A-202",
    "isActivity": false
  },
  "Thursday-3-1-D": {
    "classId": "1-D",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-203",
    "isActivity": false
  },
  "Thursday-3-10-A": {
    "classId": "10-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-105",
    "isActivity": true
  },
  "Thursday-3-10-B": {
    "classId": "10-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-106",
    "isActivity": false
  },
  "Thursday-3-10-C": {
    "classId": "10-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-107",
    "isActivity": false
  },
  "Thursday-3-10-D": {
    "classId": "10-D",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-108",
    "isActivity": false
  },
  "Thursday-3-11-A": {
    "classId": "11-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Thursday-3-11-B": {
    "classId": "11-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-202",
    "isActivity": false
  },
  "Thursday-3-11-C": {
    "classId": "11-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-203",
    "isActivity": true
  },
  "Thursday-3-11-D": {
    "classId": "11-D",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-204",
    "isActivity": false
  },
  "Thursday-3-11-E": {
    "classId": "11-E",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-205",
    "isActivity": false
  },
  "Thursday-3-11-F": {
    "classId": "11-F",
    "day": "Thursday",
    "period": 3,
    "subjectId": "POL",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Thursday-3-12-A": {
    "classId": "12-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Thursday-3-12-B": {
    "classId": "12-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-208",
    "isActivity": false
  },
  "Thursday-3-12-C": {
    "classId": "12-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Thursday-3-12-D": {
    "classId": "12-D",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-302",
    "isActivity": false
  },
  "Thursday-3-2-A": {
    "classId": "2-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-204",
    "isActivity": true
  },
  "Thursday-3-2-B": {
    "classId": "2-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-205",
    "isActivity": false
  },
  "Thursday-3-2-C": {
    "classId": "2-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-206",
    "isActivity": false
  },
  "Thursday-3-3-A": {
    "classId": "3-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "B-101",
    "isActivity": false
  },
  "Thursday-3-3-B": {
    "classId": "3-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-102",
    "isActivity": false
  },
  "Thursday-3-3-C": {
    "classId": "3-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T087",
    "room": "B-103",
    "isActivity": false
  },
  "Thursday-3-3-D": {
    "classId": "3-D",
    "day": "Thursday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-104",
    "isActivity": false
  },
  "Thursday-3-4-A": {
    "classId": "4-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-105",
    "isActivity": true
  },
  "Thursday-3-4-B": {
    "classId": "4-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-106",
    "isActivity": false
  },
  "Thursday-3-4-C": {
    "classId": "4-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-107",
    "isActivity": false
  },
  "Thursday-3-5-A": {
    "classId": "5-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-108",
    "isActivity": false
  },
  "Thursday-3-5-B": {
    "classId": "5-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-201",
    "isActivity": true
  },
  "Thursday-3-5-C": {
    "classId": "5-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Thursday-3-5-D": {
    "classId": "5-D",
    "day": "Thursday",
    "period": 3,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-203",
    "isActivity": true
  },
  "Thursday-3-5-E": {
    "classId": "5-E",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Thursday-3-6-A": {
    "classId": "6-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-205",
    "isActivity": false
  },
  "Thursday-3-6-B": {
    "classId": "6-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-206",
    "isActivity": false
  },
  "Thursday-3-6-C": {
    "classId": "6-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-207",
    "isActivity": true
  },
  "Thursday-3-6-D": {
    "classId": "6-D",
    "day": "Thursday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Thursday-3-7-A": {
    "classId": "7-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-301",
    "isActivity": false
  },
  "Thursday-3-7-B": {
    "classId": "7-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-302",
    "isActivity": false
  },
  "Thursday-3-7-C": {
    "classId": "7-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-303",
    "isActivity": false
  },
  "Thursday-3-7-D": {
    "classId": "7-D",
    "day": "Thursday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T049",
    "room": "B-304",
    "isActivity": true
  },
  "Thursday-3-8-A": {
    "classId": "8-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-305",
    "isActivity": false
  },
  "Thursday-3-8-B": {
    "classId": "8-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Thursday-3-8-C": {
    "classId": "8-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-307",
    "isActivity": false
  },
  "Thursday-3-9-A": {
    "classId": "9-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-101",
    "isActivity": false
  },
  "Thursday-3-9-B": {
    "classId": "9-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Thursday-3-9-C": {
    "classId": "9-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-103",
    "isActivity": false
  },
  "Thursday-3-9-D": {
    "classId": "9-D",
    "day": "Thursday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-104",
    "isActivity": false
  },
  "Thursday-3-LKG-A": {
    "classId": "LKG-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-103",
    "isActivity": true
  },
  "Thursday-3-LKG-B": {
    "classId": "LKG-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Thursday-3-LKG-C": {
    "classId": "LKG-C",
    "day": "Thursday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Thursday-3-NUR-A": {
    "classId": "NUR-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Thursday-3-NUR-B": {
    "classId": "NUR-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "RHY",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Thursday-3-UKG-A": {
    "classId": "UKG-A",
    "day": "Thursday",
    "period": 3,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-106",
    "isActivity": true
  },
  "Thursday-3-UKG-B": {
    "classId": "UKG-B",
    "day": "Thursday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": true
  },
  "Thursday-4-1-A": {
    "classId": "1-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-108",
    "isActivity": false
  },
  "Thursday-4-1-B": {
    "classId": "1-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-201",
    "isActivity": false
  },
  "Thursday-4-1-C": {
    "classId": "1-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-202",
    "isActivity": false
  },
  "Thursday-4-1-D": {
    "classId": "1-D",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-203",
    "isActivity": false
  },
  "Thursday-4-10-A": {
    "classId": "10-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "C-105",
    "isActivity": false
  },
  "Thursday-4-10-B": {
    "classId": "10-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-106",
    "isActivity": false
  },
  "Thursday-4-10-C": {
    "classId": "10-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-107",
    "isActivity": false
  },
  "Thursday-4-10-D": {
    "classId": "10-D",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "C-108",
    "isActivity": false
  },
  "Thursday-4-11-A": {
    "classId": "11-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-201",
    "isActivity": false
  },
  "Thursday-4-11-B": {
    "classId": "11-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-202",
    "isActivity": false
  },
  "Thursday-4-11-C": {
    "classId": "11-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-203",
    "isActivity": false
  },
  "Thursday-4-11-D": {
    "classId": "11-D",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Thursday-4-11-E": {
    "classId": "11-E",
    "day": "Thursday",
    "period": 4,
    "subjectId": "BST",
    "teacherId": "T043",
    "room": "C-205",
    "isActivity": false
  },
  "Thursday-4-11-F": {
    "classId": "11-F",
    "day": "Thursday",
    "period": 4,
    "subjectId": "HIS",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Thursday-4-12-A": {
    "classId": "12-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Thursday-4-12-B": {
    "classId": "12-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": false
  },
  "Thursday-4-12-C": {
    "classId": "12-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-301",
    "isActivity": true
  },
  "Thursday-4-12-D": {
    "classId": "12-D",
    "day": "Thursday",
    "period": 4,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-302",
    "isActivity": false
  },
  "Thursday-4-2-A": {
    "classId": "2-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-204",
    "isActivity": false
  },
  "Thursday-4-2-B": {
    "classId": "2-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-205",
    "isActivity": false
  },
  "Thursday-4-2-C": {
    "classId": "2-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-206",
    "isActivity": false
  },
  "Thursday-4-3-A": {
    "classId": "3-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-101",
    "isActivity": true
  },
  "Thursday-4-3-B": {
    "classId": "3-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-102",
    "isActivity": false
  },
  "Thursday-4-3-C": {
    "classId": "3-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "B-103",
    "isActivity": true
  },
  "Thursday-4-3-D": {
    "classId": "3-D",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-104",
    "isActivity": false
  },
  "Thursday-4-4-A": {
    "classId": "4-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Thursday-4-4-B": {
    "classId": "4-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-106",
    "isActivity": false
  },
  "Thursday-4-4-C": {
    "classId": "4-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-107",
    "isActivity": false
  },
  "Thursday-4-5-A": {
    "classId": "5-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-108",
    "isActivity": false
  },
  "Thursday-4-5-B": {
    "classId": "5-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-201",
    "isActivity": false
  },
  "Thursday-4-5-C": {
    "classId": "5-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-202",
    "isActivity": true
  },
  "Thursday-4-5-D": {
    "classId": "5-D",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-203",
    "isActivity": false
  },
  "Thursday-4-5-E": {
    "classId": "5-E",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Thursday-4-6-A": {
    "classId": "6-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-205",
    "isActivity": false
  },
  "Thursday-4-6-B": {
    "classId": "6-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-206",
    "isActivity": true
  },
  "Thursday-4-6-C": {
    "classId": "6-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-207",
    "isActivity": false
  },
  "Thursday-4-6-D": {
    "classId": "6-D",
    "day": "Thursday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-208",
    "isActivity": false
  },
  "Thursday-4-7-A": {
    "classId": "7-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-301",
    "isActivity": false
  },
  "Thursday-4-7-B": {
    "classId": "7-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-302",
    "isActivity": false
  },
  "Thursday-4-7-C": {
    "classId": "7-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Thursday-4-7-D": {
    "classId": "7-D",
    "day": "Thursday",
    "period": 4,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-304",
    "isActivity": true
  },
  "Thursday-4-8-A": {
    "classId": "8-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-305",
    "isActivity": true
  },
  "Thursday-4-8-B": {
    "classId": "8-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-306",
    "isActivity": false
  },
  "Thursday-4-8-C": {
    "classId": "8-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "B-307",
    "isActivity": false
  },
  "Thursday-4-9-A": {
    "classId": "9-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-101",
    "isActivity": false
  },
  "Thursday-4-9-B": {
    "classId": "9-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-102",
    "isActivity": true
  },
  "Thursday-4-9-C": {
    "classId": "9-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-103",
    "isActivity": false
  },
  "Thursday-4-9-D": {
    "classId": "9-D",
    "day": "Thursday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Thursday-4-LKG-A": {
    "classId": "LKG-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-103",
    "isActivity": true
  },
  "Thursday-4-LKG-B": {
    "classId": "LKG-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Thursday-4-LKG-C": {
    "classId": "LKG-C",
    "day": "Thursday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Thursday-4-NUR-A": {
    "classId": "NUR-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T094",
    "room": "A-101",
    "isActivity": true
  },
  "Thursday-4-NUR-B": {
    "classId": "NUR-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Thursday-4-UKG-A": {
    "classId": "UKG-A",
    "day": "Thursday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Thursday-4-UKG-B": {
    "classId": "UKG-B",
    "day": "Thursday",
    "period": 4,
    "subjectId": "RHY",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Thursday-5-1-A": {
    "classId": "1-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "EVS",
    "teacherId": "T014",
    "room": "A-108",
    "isActivity": false
  },
  "Thursday-5-1-B": {
    "classId": "1-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Thursday-5-1-C": {
    "classId": "1-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-202",
    "isActivity": false
  },
  "Thursday-5-1-D": {
    "classId": "1-D",
    "day": "Thursday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-203",
    "isActivity": false
  },
  "Thursday-5-10-A": {
    "classId": "10-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-105",
    "isActivity": false
  },
  "Thursday-5-10-B": {
    "classId": "10-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Thursday-5-10-C": {
    "classId": "10-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-107",
    "isActivity": false
  },
  "Thursday-5-10-D": {
    "classId": "10-D",
    "day": "Thursday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-108",
    "isActivity": true
  },
  "Thursday-5-11-A": {
    "classId": "11-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Thursday-5-11-B": {
    "classId": "11-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-202",
    "isActivity": false
  },
  "Thursday-5-11-C": {
    "classId": "11-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Thursday-5-11-D": {
    "classId": "11-D",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-204",
    "isActivity": false
  },
  "Thursday-5-11-E": {
    "classId": "11-E",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Thursday-5-11-F": {
    "classId": "11-F",
    "day": "Thursday",
    "period": 5,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-206",
    "isActivity": true
  },
  "Thursday-5-12-A": {
    "classId": "12-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-207",
    "isActivity": false
  },
  "Thursday-5-12-B": {
    "classId": "12-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": false
  },
  "Thursday-5-12-C": {
    "classId": "12-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-301",
    "isActivity": false
  },
  "Thursday-5-12-D": {
    "classId": "12-D",
    "day": "Thursday",
    "period": 5,
    "subjectId": "POL",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Thursday-5-2-A": {
    "classId": "2-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "A-204",
    "isActivity": true
  },
  "Thursday-5-2-B": {
    "classId": "2-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-205",
    "isActivity": false
  },
  "Thursday-5-2-C": {
    "classId": "2-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-206",
    "isActivity": true
  },
  "Thursday-5-3-A": {
    "classId": "3-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-101",
    "isActivity": false
  },
  "Thursday-5-3-B": {
    "classId": "3-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-102",
    "isActivity": false
  },
  "Thursday-5-3-C": {
    "classId": "3-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "B-103",
    "isActivity": false
  },
  "Thursday-5-3-D": {
    "classId": "3-D",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Thursday-5-4-A": {
    "classId": "4-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Thursday-5-4-B": {
    "classId": "4-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-106",
    "isActivity": false
  },
  "Thursday-5-4-C": {
    "classId": "4-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-107",
    "isActivity": false
  },
  "Thursday-5-5-A": {
    "classId": "5-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "B-108",
    "isActivity": true
  },
  "Thursday-5-5-B": {
    "classId": "5-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-201",
    "isActivity": true
  },
  "Thursday-5-5-C": {
    "classId": "5-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-202",
    "isActivity": false
  },
  "Thursday-5-5-D": {
    "classId": "5-D",
    "day": "Thursday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Thursday-5-5-E": {
    "classId": "5-E",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-204",
    "isActivity": true
  },
  "Thursday-5-6-A": {
    "classId": "6-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-205",
    "isActivity": false
  },
  "Thursday-5-6-B": {
    "classId": "6-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "VE",
    "teacherId": "T002",
    "room": "B-206",
    "isActivity": true
  },
  "Thursday-5-6-C": {
    "classId": "6-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "B-207",
    "isActivity": false
  },
  "Thursday-5-6-D": {
    "classId": "6-D",
    "day": "Thursday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-208",
    "isActivity": false
  },
  "Thursday-5-7-A": {
    "classId": "7-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-301",
    "isActivity": false
  },
  "Thursday-5-7-B": {
    "classId": "7-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-302",
    "isActivity": false
  },
  "Thursday-5-7-C": {
    "classId": "7-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-303",
    "isActivity": false
  },
  "Thursday-5-7-D": {
    "classId": "7-D",
    "day": "Thursday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-304",
    "isActivity": false
  },
  "Thursday-5-8-A": {
    "classId": "8-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-305",
    "isActivity": false
  },
  "Thursday-5-8-B": {
    "classId": "8-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Thursday-5-8-C": {
    "classId": "8-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-307",
    "isActivity": false
  },
  "Thursday-5-9-A": {
    "classId": "9-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-101",
    "isActivity": true
  },
  "Thursday-5-9-B": {
    "classId": "9-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Thursday-5-9-C": {
    "classId": "9-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-103",
    "isActivity": true
  },
  "Thursday-5-9-D": {
    "classId": "9-D",
    "day": "Thursday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-104",
    "isActivity": false
  },
  "Thursday-5-LKG-A": {
    "classId": "LKG-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Thursday-5-LKG-B": {
    "classId": "LKG-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-104",
    "isActivity": true
  },
  "Thursday-5-LKG-C": {
    "classId": "LKG-C",
    "day": "Thursday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Thursday-5-NUR-A": {
    "classId": "NUR-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Thursday-5-NUR-B": {
    "classId": "NUR-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Thursday-5-UKG-A": {
    "classId": "UKG-A",
    "day": "Thursday",
    "period": 5,
    "subjectId": "RHY",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Thursday-5-UKG-B": {
    "classId": "UKG-B",
    "day": "Thursday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-107",
    "isActivity": true
  },
  "Thursday-6-1-A": {
    "classId": "1-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-108",
    "isActivity": true
  },
  "Thursday-6-1-B": {
    "classId": "1-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-201",
    "isActivity": false
  },
  "Thursday-6-1-C": {
    "classId": "1-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-202",
    "isActivity": true
  },
  "Thursday-6-1-D": {
    "classId": "1-D",
    "day": "Thursday",
    "period": 6,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "A-203",
    "isActivity": true
  },
  "Thursday-6-10-A": {
    "classId": "10-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-105",
    "isActivity": false
  },
  "Thursday-6-10-B": {
    "classId": "10-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Thursday-6-10-C": {
    "classId": "10-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-107",
    "isActivity": true
  },
  "Thursday-6-10-D": {
    "classId": "10-D",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "C-108",
    "isActivity": false
  },
  "Thursday-6-11-A": {
    "classId": "11-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": false
  },
  "Thursday-6-11-B": {
    "classId": "11-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Thursday-6-11-C": {
    "classId": "11-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-203",
    "isActivity": false
  },
  "Thursday-6-11-D": {
    "classId": "11-D",
    "day": "Thursday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-204",
    "isActivity": true
  },
  "Thursday-6-11-E": {
    "classId": "11-E",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": false
  },
  "Thursday-6-11-F": {
    "classId": "11-F",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-206",
    "isActivity": false
  },
  "Thursday-6-12-A": {
    "classId": "12-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Thursday-6-12-B": {
    "classId": "12-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-208",
    "isActivity": false
  },
  "Thursday-6-12-C": {
    "classId": "12-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "VE",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": true
  },
  "Thursday-6-12-D": {
    "classId": "12-D",
    "day": "Thursday",
    "period": 6,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-302",
    "isActivity": false
  },
  "Thursday-6-2-A": {
    "classId": "2-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-204",
    "isActivity": false
  },
  "Thursday-6-2-B": {
    "classId": "2-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-205",
    "isActivity": true
  },
  "Thursday-6-2-C": {
    "classId": "2-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-206",
    "isActivity": false
  },
  "Thursday-6-3-A": {
    "classId": "3-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-101",
    "isActivity": false
  },
  "Thursday-6-3-B": {
    "classId": "3-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Thursday-6-3-C": {
    "classId": "3-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-103",
    "isActivity": true
  },
  "Thursday-6-3-D": {
    "classId": "3-D",
    "day": "Thursday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-104",
    "isActivity": true
  },
  "Thursday-6-4-A": {
    "classId": "4-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Thursday-6-4-B": {
    "classId": "4-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-106",
    "isActivity": false
  },
  "Thursday-6-4-C": {
    "classId": "4-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-107",
    "isActivity": false
  },
  "Thursday-6-5-A": {
    "classId": "5-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Thursday-6-5-B": {
    "classId": "5-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-201",
    "isActivity": false
  },
  "Thursday-6-5-C": {
    "classId": "5-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-202",
    "isActivity": false
  },
  "Thursday-6-5-D": {
    "classId": "5-D",
    "day": "Thursday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-203",
    "isActivity": true
  },
  "Thursday-6-5-E": {
    "classId": "5-E",
    "day": "Thursday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Thursday-6-6-A": {
    "classId": "6-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-205",
    "isActivity": false
  },
  "Thursday-6-6-B": {
    "classId": "6-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "B-206",
    "isActivity": false
  },
  "Thursday-6-6-C": {
    "classId": "6-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "B-207",
    "isActivity": false
  },
  "Thursday-6-6-D": {
    "classId": "6-D",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-208",
    "isActivity": false
  },
  "Thursday-6-7-A": {
    "classId": "7-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-301",
    "isActivity": false
  },
  "Thursday-6-7-B": {
    "classId": "7-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-302",
    "isActivity": false
  },
  "Thursday-6-7-C": {
    "classId": "7-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Thursday-6-7-D": {
    "classId": "7-D",
    "day": "Thursday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-304",
    "isActivity": false
  },
  "Thursday-6-8-A": {
    "classId": "8-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-305",
    "isActivity": true
  },
  "Thursday-6-8-B": {
    "classId": "8-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Thursday-6-8-C": {
    "classId": "8-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "SAN",
    "teacherId": "T024",
    "room": "B-307",
    "isActivity": false
  },
  "Thursday-6-9-A": {
    "classId": "9-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "C-101",
    "isActivity": false
  },
  "Thursday-6-9-B": {
    "classId": "9-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-102",
    "isActivity": true
  },
  "Thursday-6-9-C": {
    "classId": "9-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "VE",
    "teacherId": "T022",
    "room": "C-103",
    "isActivity": true
  },
  "Thursday-6-9-D": {
    "classId": "9-D",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-104",
    "isActivity": true
  },
  "Thursday-6-LKG-A": {
    "classId": "LKG-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Thursday-6-LKG-B": {
    "classId": "LKG-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Thursday-6-LKG-C": {
    "classId": "LKG-C",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Thursday-6-NUR-A": {
    "classId": "NUR-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Thursday-6-NUR-B": {
    "classId": "NUR-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "EVS",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Thursday-6-UKG-A": {
    "classId": "UKG-A",
    "day": "Thursday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Thursday-6-UKG-B": {
    "classId": "UKG-B",
    "day": "Thursday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Thursday-7-1-A": {
    "classId": "1-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-108",
    "isActivity": false
  },
  "Thursday-7-1-B": {
    "classId": "1-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-201",
    "isActivity": true
  },
  "Thursday-7-1-C": {
    "classId": "1-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "A-202",
    "isActivity": false
  },
  "Thursday-7-1-D": {
    "classId": "1-D",
    "day": "Thursday",
    "period": 7,
    "subjectId": "VE",
    "teacherId": "T035",
    "room": "A-203",
    "isActivity": true
  },
  "Thursday-7-10-A": {
    "classId": "10-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "C-105",
    "isActivity": false
  },
  "Thursday-7-10-B": {
    "classId": "10-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "C-106",
    "isActivity": false
  },
  "Thursday-7-10-C": {
    "classId": "10-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-107",
    "isActivity": false
  },
  "Thursday-7-10-D": {
    "classId": "10-D",
    "day": "Thursday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "C-108",
    "isActivity": false
  },
  "Thursday-7-11-A": {
    "classId": "11-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-201",
    "isActivity": false
  },
  "Thursday-7-11-B": {
    "classId": "11-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-202",
    "isActivity": false
  },
  "Thursday-7-11-C": {
    "classId": "11-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Thursday-7-11-D": {
    "classId": "11-D",
    "day": "Thursday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-204",
    "isActivity": false
  },
  "Thursday-7-11-E": {
    "classId": "11-E",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Thursday-7-11-F": {
    "classId": "11-F",
    "day": "Thursday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-206",
    "isActivity": true
  },
  "Thursday-7-12-A": {
    "classId": "12-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-207",
    "isActivity": false
  },
  "Thursday-7-12-B": {
    "classId": "12-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-208",
    "isActivity": false
  },
  "Thursday-7-12-C": {
    "classId": "12-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-301",
    "isActivity": false
  },
  "Thursday-7-12-D": {
    "classId": "12-D",
    "day": "Thursday",
    "period": 7,
    "subjectId": "HIS",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Thursday-7-2-A": {
    "classId": "2-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-204",
    "isActivity": true
  },
  "Thursday-7-2-B": {
    "classId": "2-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Thursday-7-2-C": {
    "classId": "2-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-206",
    "isActivity": false
  },
  "Thursday-7-3-A": {
    "classId": "3-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "B-101",
    "isActivity": true
  },
  "Thursday-7-3-B": {
    "classId": "3-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-102",
    "isActivity": false
  },
  "Thursday-7-3-C": {
    "classId": "3-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-103",
    "isActivity": false
  },
  "Thursday-7-3-D": {
    "classId": "3-D",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-104",
    "isActivity": false
  },
  "Thursday-7-4-A": {
    "classId": "4-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-105",
    "isActivity": false
  },
  "Thursday-7-4-B": {
    "classId": "4-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-106",
    "isActivity": true
  },
  "Thursday-7-4-C": {
    "classId": "4-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-107",
    "isActivity": true
  },
  "Thursday-7-5-A": {
    "classId": "5-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Thursday-7-5-B": {
    "classId": "5-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-201",
    "isActivity": false
  },
  "Thursday-7-5-C": {
    "classId": "5-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Thursday-7-5-D": {
    "classId": "5-D",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-203",
    "isActivity": false
  },
  "Thursday-7-5-E": {
    "classId": "5-E",
    "day": "Thursday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T023",
    "room": "B-204",
    "isActivity": false
  },
  "Thursday-7-6-A": {
    "classId": "6-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-205",
    "isActivity": false
  },
  "Thursday-7-6-B": {
    "classId": "6-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "B-206",
    "isActivity": false
  },
  "Thursday-7-6-C": {
    "classId": "6-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-207",
    "isActivity": false
  },
  "Thursday-7-6-D": {
    "classId": "6-D",
    "day": "Thursday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-208",
    "isActivity": false
  },
  "Thursday-7-7-A": {
    "classId": "7-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-301",
    "isActivity": true
  },
  "Thursday-7-7-B": {
    "classId": "7-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-302",
    "isActivity": false
  },
  "Thursday-7-7-C": {
    "classId": "7-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Thursday-7-7-D": {
    "classId": "7-D",
    "day": "Thursday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-304",
    "isActivity": false
  },
  "Thursday-7-8-A": {
    "classId": "8-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Thursday-7-8-B": {
    "classId": "8-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Thursday-7-8-C": {
    "classId": "8-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-307",
    "isActivity": false
  },
  "Thursday-7-9-A": {
    "classId": "9-A",
    "day": "Thursday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "C-101",
    "isActivity": false
  },
  "Thursday-7-9-B": {
    "classId": "9-B",
    "day": "Thursday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Thursday-7-9-C": {
    "classId": "9-C",
    "day": "Thursday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-103",
    "isActivity": false
  },
  "Thursday-7-9-D": {
    "classId": "9-D",
    "day": "Thursday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Thursday-8-10-A": {
    "classId": "10-A",
    "day": "Thursday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-105",
    "isActivity": false
  },
  "Thursday-8-10-B": {
    "classId": "10-B",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Thursday-8-10-C": {
    "classId": "10-C",
    "day": "Thursday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-107",
    "isActivity": false
  },
  "Thursday-8-10-D": {
    "classId": "10-D",
    "day": "Thursday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-108",
    "isActivity": false
  },
  "Thursday-8-11-A": {
    "classId": "11-A",
    "day": "Thursday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-201",
    "isActivity": true
  },
  "Thursday-8-11-B": {
    "classId": "11-B",
    "day": "Thursday",
    "period": 8,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-202",
    "isActivity": false
  },
  "Thursday-8-11-C": {
    "classId": "11-C",
    "day": "Thursday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Thursday-8-11-D": {
    "classId": "11-D",
    "day": "Thursday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-204",
    "isActivity": true
  },
  "Thursday-8-11-E": {
    "classId": "11-E",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": false
  },
  "Thursday-8-11-F": {
    "classId": "11-F",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-206",
    "isActivity": false
  },
  "Thursday-8-12-A": {
    "classId": "12-A",
    "day": "Thursday",
    "period": 8,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-207",
    "isActivity": false
  },
  "Thursday-8-12-B": {
    "classId": "12-B",
    "day": "Thursday",
    "period": 8,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-208",
    "isActivity": false
  },
  "Thursday-8-12-C": {
    "classId": "12-C",
    "day": "Thursday",
    "period": 8,
    "subjectId": "BST",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": false
  },
  "Thursday-8-12-D": {
    "classId": "12-D",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-302",
    "isActivity": false
  },
  "Thursday-8-6-A": {
    "classId": "6-A",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-205",
    "isActivity": true
  },
  "Thursday-8-6-B": {
    "classId": "6-B",
    "day": "Thursday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "B-206",
    "isActivity": false
  },
  "Thursday-8-6-C": {
    "classId": "6-C",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "B-207",
    "isActivity": false
  },
  "Thursday-8-6-D": {
    "classId": "6-D",
    "day": "Thursday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-208",
    "isActivity": false
  },
  "Thursday-8-7-A": {
    "classId": "7-A",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-301",
    "isActivity": false
  },
  "Thursday-8-7-B": {
    "classId": "7-B",
    "day": "Thursday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-302",
    "isActivity": false
  },
  "Thursday-8-7-C": {
    "classId": "7-C",
    "day": "Thursday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-303",
    "isActivity": false
  },
  "Thursday-8-7-D": {
    "classId": "7-D",
    "day": "Thursday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-304",
    "isActivity": false
  },
  "Thursday-8-8-A": {
    "classId": "8-A",
    "day": "Thursday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-305",
    "isActivity": false
  },
  "Thursday-8-8-B": {
    "classId": "8-B",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-306",
    "isActivity": true
  },
  "Thursday-8-8-C": {
    "classId": "8-C",
    "day": "Thursday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "B-307",
    "isActivity": false
  },
  "Thursday-8-9-A": {
    "classId": "9-A",
    "day": "Thursday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-101",
    "isActivity": false
  },
  "Thursday-8-9-B": {
    "classId": "9-B",
    "day": "Thursday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-102",
    "isActivity": true
  },
  "Thursday-8-9-C": {
    "classId": "9-C",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-103",
    "isActivity": false
  },
  "Thursday-8-9-D": {
    "classId": "9-D",
    "day": "Thursday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "C-104",
    "isActivity": false
  },
  "Friday-1-1-A": {
    "classId": "1-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-108",
    "isActivity": false
  },
  "Friday-1-1-B": {
    "classId": "1-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Friday-1-1-C": {
    "classId": "1-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-202",
    "isActivity": true
  },
  "Friday-1-1-D": {
    "classId": "1-D",
    "day": "Friday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "A-203",
    "isActivity": false
  },
  "Friday-1-10-A": {
    "classId": "10-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "C-105",
    "isActivity": false
  },
  "Friday-1-10-B": {
    "classId": "10-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-106",
    "isActivity": false
  },
  "Friday-1-10-C": {
    "classId": "10-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-107",
    "isActivity": false
  },
  "Friday-1-10-D": {
    "classId": "10-D",
    "day": "Friday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-108",
    "isActivity": false
  },
  "Friday-1-11-A": {
    "classId": "11-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-201",
    "isActivity": false
  },
  "Friday-1-11-B": {
    "classId": "11-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Friday-1-11-C": {
    "classId": "11-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Friday-1-11-D": {
    "classId": "11-D",
    "day": "Friday",
    "period": 1,
    "subjectId": "BST",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Friday-1-11-E": {
    "classId": "11-E",
    "day": "Friday",
    "period": 1,
    "subjectId": "BST",
    "teacherId": "T043",
    "room": "C-205",
    "isActivity": false
  },
  "Friday-1-11-F": {
    "classId": "11-F",
    "day": "Friday",
    "period": 1,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-206",
    "isActivity": false
  },
  "Friday-1-12-A": {
    "classId": "12-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Friday-1-12-B": {
    "classId": "12-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-208",
    "isActivity": false
  },
  "Friday-1-12-C": {
    "classId": "12-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-301",
    "isActivity": true
  },
  "Friday-1-12-D": {
    "classId": "12-D",
    "day": "Friday",
    "period": 1,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-302",
    "isActivity": false
  },
  "Friday-1-2-A": {
    "classId": "2-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "A-204",
    "isActivity": false
  },
  "Friday-1-2-B": {
    "classId": "2-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": true
  },
  "Friday-1-2-C": {
    "classId": "2-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-206",
    "isActivity": false
  },
  "Friday-1-3-A": {
    "classId": "3-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-101",
    "isActivity": true
  },
  "Friday-1-3-B": {
    "classId": "3-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-102",
    "isActivity": false
  },
  "Friday-1-3-C": {
    "classId": "3-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-103",
    "isActivity": true
  },
  "Friday-1-3-D": {
    "classId": "3-D",
    "day": "Friday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Friday-1-4-A": {
    "classId": "4-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-105",
    "isActivity": true
  },
  "Friday-1-4-B": {
    "classId": "4-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-106",
    "isActivity": false
  },
  "Friday-1-4-C": {
    "classId": "4-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-107",
    "isActivity": false
  },
  "Friday-1-5-A": {
    "classId": "5-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-108",
    "isActivity": false
  },
  "Friday-1-5-B": {
    "classId": "5-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T037",
    "room": "B-201",
    "isActivity": false
  },
  "Friday-1-5-C": {
    "classId": "5-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Friday-1-5-D": {
    "classId": "5-D",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-203",
    "isActivity": false
  },
  "Friday-1-5-E": {
    "classId": "5-E",
    "day": "Friday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-204",
    "isActivity": false
  },
  "Friday-1-6-A": {
    "classId": "6-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-205",
    "isActivity": false
  },
  "Friday-1-6-B": {
    "classId": "6-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-206",
    "isActivity": false
  },
  "Friday-1-6-C": {
    "classId": "6-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-207",
    "isActivity": false
  },
  "Friday-1-6-D": {
    "classId": "6-D",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Friday-1-7-A": {
    "classId": "7-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-301",
    "isActivity": true
  },
  "Friday-1-7-B": {
    "classId": "7-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-302",
    "isActivity": false
  },
  "Friday-1-7-C": {
    "classId": "7-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Friday-1-7-D": {
    "classId": "7-D",
    "day": "Friday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-304",
    "isActivity": false
  },
  "Friday-1-8-A": {
    "classId": "8-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "B-305",
    "isActivity": false
  },
  "Friday-1-8-B": {
    "classId": "8-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Friday-1-8-C": {
    "classId": "8-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-307",
    "isActivity": false
  },
  "Friday-1-9-A": {
    "classId": "9-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "C-101",
    "isActivity": false
  },
  "Friday-1-9-B": {
    "classId": "9-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-102",
    "isActivity": true
  },
  "Friday-1-9-C": {
    "classId": "9-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-103",
    "isActivity": false
  },
  "Friday-1-9-D": {
    "classId": "9-D",
    "day": "Friday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Friday-1-LKG-A": {
    "classId": "LKG-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "RHY",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Friday-1-LKG-B": {
    "classId": "LKG-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "MUS",
    "teacherId": "T105",
    "room": "A-104",
    "isActivity": true
  },
  "Friday-1-LKG-C": {
    "classId": "LKG-C",
    "day": "Friday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-105",
    "isActivity": true
  },
  "Friday-1-NUR-A": {
    "classId": "NUR-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Friday-1-NUR-B": {
    "classId": "NUR-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "RHY",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Friday-1-UKG-A": {
    "classId": "UKG-A",
    "day": "Friday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Friday-1-UKG-B": {
    "classId": "UKG-B",
    "day": "Friday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Friday-2-1-A": {
    "classId": "1-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-108",
    "isActivity": false
  },
  "Friday-2-1-B": {
    "classId": "1-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-201",
    "isActivity": true
  },
  "Friday-2-1-C": {
    "classId": "1-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-202",
    "isActivity": true
  },
  "Friday-2-1-D": {
    "classId": "1-D",
    "day": "Friday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-203",
    "isActivity": false
  },
  "Friday-2-10-A": {
    "classId": "10-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-105",
    "isActivity": false
  },
  "Friday-2-10-B": {
    "classId": "10-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "C-106",
    "isActivity": false
  },
  "Friday-2-10-C": {
    "classId": "10-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-107",
    "isActivity": false
  },
  "Friday-2-10-D": {
    "classId": "10-D",
    "day": "Friday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-108",
    "isActivity": false
  },
  "Friday-2-11-A": {
    "classId": "11-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": false
  },
  "Friday-2-11-B": {
    "classId": "11-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-202",
    "isActivity": false
  },
  "Friday-2-11-C": {
    "classId": "11-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-203",
    "isActivity": false
  },
  "Friday-2-11-D": {
    "classId": "11-D",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-204",
    "isActivity": false
  },
  "Friday-2-11-E": {
    "classId": "11-E",
    "day": "Friday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-205",
    "isActivity": true
  },
  "Friday-2-11-F": {
    "classId": "11-F",
    "day": "Friday",
    "period": 2,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-206",
    "isActivity": false
  },
  "Friday-2-12-A": {
    "classId": "12-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Friday-2-12-B": {
    "classId": "12-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-208",
    "isActivity": false
  },
  "Friday-2-12-C": {
    "classId": "12-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-301",
    "isActivity": false
  },
  "Friday-2-12-D": {
    "classId": "12-D",
    "day": "Friday",
    "period": 2,
    "subjectId": "HIS",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Friday-2-2-A": {
    "classId": "2-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-204",
    "isActivity": false
  },
  "Friday-2-2-B": {
    "classId": "2-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-205",
    "isActivity": true
  },
  "Friday-2-2-C": {
    "classId": "2-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-206",
    "isActivity": false
  },
  "Friday-2-3-A": {
    "classId": "3-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Friday-2-3-B": {
    "classId": "3-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Friday-2-3-C": {
    "classId": "3-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-103",
    "isActivity": false
  },
  "Friday-2-3-D": {
    "classId": "3-D",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Friday-2-4-A": {
    "classId": "4-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Friday-2-4-B": {
    "classId": "4-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-106",
    "isActivity": false
  },
  "Friday-2-4-C": {
    "classId": "4-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-107",
    "isActivity": false
  },
  "Friday-2-5-A": {
    "classId": "5-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-108",
    "isActivity": false
  },
  "Friday-2-5-B": {
    "classId": "5-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-201",
    "isActivity": false
  },
  "Friday-2-5-C": {
    "classId": "5-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-202",
    "isActivity": false
  },
  "Friday-2-5-D": {
    "classId": "5-D",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "B-203",
    "isActivity": false
  },
  "Friday-2-5-E": {
    "classId": "5-E",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T023",
    "room": "B-204",
    "isActivity": false
  },
  "Friday-2-6-A": {
    "classId": "6-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-205",
    "isActivity": false
  },
  "Friday-2-6-B": {
    "classId": "6-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T097",
    "room": "B-206",
    "isActivity": false
  },
  "Friday-2-6-C": {
    "classId": "6-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-207",
    "isActivity": true
  },
  "Friday-2-6-D": {
    "classId": "6-D",
    "day": "Friday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-208",
    "isActivity": false
  },
  "Friday-2-7-A": {
    "classId": "7-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-301",
    "isActivity": false
  },
  "Friday-2-7-B": {
    "classId": "7-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-302",
    "isActivity": false
  },
  "Friday-2-7-C": {
    "classId": "7-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-303",
    "isActivity": true
  },
  "Friday-2-7-D": {
    "classId": "7-D",
    "day": "Friday",
    "period": 2,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-304",
    "isActivity": true
  },
  "Friday-2-8-A": {
    "classId": "8-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Friday-2-8-B": {
    "classId": "8-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-306",
    "isActivity": true
  },
  "Friday-2-8-C": {
    "classId": "8-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-307",
    "isActivity": false
  },
  "Friday-2-9-A": {
    "classId": "9-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "C-101",
    "isActivity": false
  },
  "Friday-2-9-B": {
    "classId": "9-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-102",
    "isActivity": false
  },
  "Friday-2-9-C": {
    "classId": "9-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-103",
    "isActivity": false
  },
  "Friday-2-9-D": {
    "classId": "9-D",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Friday-2-LKG-A": {
    "classId": "LKG-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "RHY",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Friday-2-LKG-B": {
    "classId": "LKG-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Friday-2-LKG-C": {
    "classId": "LKG-C",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Friday-2-NUR-A": {
    "classId": "NUR-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "RHY",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Friday-2-NUR-B": {
    "classId": "NUR-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Friday-2-UKG-A": {
    "classId": "UKG-A",
    "day": "Friday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Friday-2-UKG-B": {
    "classId": "UKG-B",
    "day": "Friday",
    "period": 2,
    "subjectId": "EVS",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Friday-3-1-A": {
    "classId": "1-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T014",
    "room": "A-108",
    "isActivity": true
  },
  "Friday-3-1-B": {
    "classId": "1-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-201",
    "isActivity": true
  },
  "Friday-3-1-C": {
    "classId": "1-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "A-202",
    "isActivity": false
  },
  "Friday-3-1-D": {
    "classId": "1-D",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-203",
    "isActivity": false
  },
  "Friday-3-10-A": {
    "classId": "10-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "C-105",
    "isActivity": false
  },
  "Friday-3-10-B": {
    "classId": "10-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-106",
    "isActivity": false
  },
  "Friday-3-10-C": {
    "classId": "10-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-107",
    "isActivity": true
  },
  "Friday-3-10-D": {
    "classId": "10-D",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "C-108",
    "isActivity": false
  },
  "Friday-3-11-A": {
    "classId": "11-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-201",
    "isActivity": false
  },
  "Friday-3-11-B": {
    "classId": "11-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-202",
    "isActivity": false
  },
  "Friday-3-11-C": {
    "classId": "11-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-203",
    "isActivity": false
  },
  "Friday-3-11-D": {
    "classId": "11-D",
    "day": "Friday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": true
  },
  "Friday-3-11-E": {
    "classId": "11-E",
    "day": "Friday",
    "period": 3,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-205",
    "isActivity": true
  },
  "Friday-3-11-F": {
    "classId": "11-F",
    "day": "Friday",
    "period": 3,
    "subjectId": "HIS",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Friday-3-12-A": {
    "classId": "12-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-207",
    "isActivity": true
  },
  "Friday-3-12-B": {
    "classId": "12-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-208",
    "isActivity": false
  },
  "Friday-3-12-C": {
    "classId": "12-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "BST",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": false
  },
  "Friday-3-12-D": {
    "classId": "12-D",
    "day": "Friday",
    "period": 3,
    "subjectId": "POL",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Friday-3-2-A": {
    "classId": "2-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-204",
    "isActivity": false
  },
  "Friday-3-2-B": {
    "classId": "2-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-205",
    "isActivity": false
  },
  "Friday-3-2-C": {
    "classId": "2-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-206",
    "isActivity": true
  },
  "Friday-3-3-A": {
    "classId": "3-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "B-101",
    "isActivity": false
  },
  "Friday-3-3-B": {
    "classId": "3-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Friday-3-3-C": {
    "classId": "3-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "B-103",
    "isActivity": false
  },
  "Friday-3-3-D": {
    "classId": "3-D",
    "day": "Friday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-104",
    "isActivity": false
  },
  "Friday-3-4-A": {
    "classId": "4-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Friday-3-4-B": {
    "classId": "4-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-106",
    "isActivity": false
  },
  "Friday-3-4-C": {
    "classId": "4-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-107",
    "isActivity": true
  },
  "Friday-3-5-A": {
    "classId": "5-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": true
  },
  "Friday-3-5-B": {
    "classId": "5-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-201",
    "isActivity": false
  },
  "Friday-3-5-C": {
    "classId": "5-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-202",
    "isActivity": false
  },
  "Friday-3-5-D": {
    "classId": "5-D",
    "day": "Friday",
    "period": 3,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-203",
    "isActivity": true
  },
  "Friday-3-5-E": {
    "classId": "5-E",
    "day": "Friday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Friday-3-6-A": {
    "classId": "6-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-205",
    "isActivity": false
  },
  "Friday-3-6-B": {
    "classId": "6-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-206",
    "isActivity": false
  },
  "Friday-3-6-C": {
    "classId": "6-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-207",
    "isActivity": false
  },
  "Friday-3-6-D": {
    "classId": "6-D",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-208",
    "isActivity": false
  },
  "Friday-3-7-A": {
    "classId": "7-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-301",
    "isActivity": false
  },
  "Friday-3-7-B": {
    "classId": "7-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-302",
    "isActivity": false
  },
  "Friday-3-7-C": {
    "classId": "7-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-303",
    "isActivity": false
  },
  "Friday-3-7-D": {
    "classId": "7-D",
    "day": "Friday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-304",
    "isActivity": false
  },
  "Friday-3-8-A": {
    "classId": "8-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-305",
    "isActivity": true
  },
  "Friday-3-8-B": {
    "classId": "8-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-306",
    "isActivity": false
  },
  "Friday-3-8-C": {
    "classId": "8-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-307",
    "isActivity": false
  },
  "Friday-3-9-A": {
    "classId": "9-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-101",
    "isActivity": false
  },
  "Friday-3-9-B": {
    "classId": "9-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Friday-3-9-C": {
    "classId": "9-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-103",
    "isActivity": false
  },
  "Friday-3-9-D": {
    "classId": "9-D",
    "day": "Friday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-104",
    "isActivity": false
  },
  "Friday-3-LKG-A": {
    "classId": "LKG-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "MUS",
    "teacherId": "T105",
    "room": "A-103",
    "isActivity": true
  },
  "Friday-3-LKG-B": {
    "classId": "LKG-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Friday-3-LKG-C": {
    "classId": "LKG-C",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Friday-3-NUR-A": {
    "classId": "NUR-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Friday-3-NUR-B": {
    "classId": "NUR-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Friday-3-UKG-A": {
    "classId": "UKG-A",
    "day": "Friday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Friday-3-UKG-B": {
    "classId": "UKG-B",
    "day": "Friday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Friday-4-1-A": {
    "classId": "1-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-108",
    "isActivity": false
  },
  "Friday-4-1-B": {
    "classId": "1-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-201",
    "isActivity": false
  },
  "Friday-4-1-C": {
    "classId": "1-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-202",
    "isActivity": false
  },
  "Friday-4-1-D": {
    "classId": "1-D",
    "day": "Friday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-203",
    "isActivity": false
  },
  "Friday-4-10-A": {
    "classId": "10-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-105",
    "isActivity": true
  },
  "Friday-4-10-B": {
    "classId": "10-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "C-106",
    "isActivity": false
  },
  "Friday-4-10-C": {
    "classId": "10-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-107",
    "isActivity": true
  },
  "Friday-4-10-D": {
    "classId": "10-D",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "C-108",
    "isActivity": false
  },
  "Friday-4-11-A": {
    "classId": "11-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": false
  },
  "Friday-4-11-B": {
    "classId": "11-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-202",
    "isActivity": false
  },
  "Friday-4-11-C": {
    "classId": "11-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Friday-4-11-D": {
    "classId": "11-D",
    "day": "Friday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-204",
    "isActivity": false
  },
  "Friday-4-11-E": {
    "classId": "11-E",
    "day": "Friday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-205",
    "isActivity": false
  },
  "Friday-4-11-F": {
    "classId": "11-F",
    "day": "Friday",
    "period": 4,
    "subjectId": "POL",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Friday-4-12-A": {
    "classId": "12-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-207",
    "isActivity": false
  },
  "Friday-4-12-B": {
    "classId": "12-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": false
  },
  "Friday-4-12-C": {
    "classId": "12-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-301",
    "isActivity": true
  },
  "Friday-4-12-D": {
    "classId": "12-D",
    "day": "Friday",
    "period": 4,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-302",
    "isActivity": false
  },
  "Friday-4-2-A": {
    "classId": "2-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-204",
    "isActivity": true
  },
  "Friday-4-2-B": {
    "classId": "2-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-205",
    "isActivity": false
  },
  "Friday-4-2-C": {
    "classId": "2-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-206",
    "isActivity": false
  },
  "Friday-4-3-A": {
    "classId": "3-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-101",
    "isActivity": false
  },
  "Friday-4-3-B": {
    "classId": "3-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-102",
    "isActivity": true
  },
  "Friday-4-3-C": {
    "classId": "3-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-103",
    "isActivity": false
  },
  "Friday-4-3-D": {
    "classId": "3-D",
    "day": "Friday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-104",
    "isActivity": false
  },
  "Friday-4-4-A": {
    "classId": "4-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Friday-4-4-B": {
    "classId": "4-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-106",
    "isActivity": true
  },
  "Friday-4-4-C": {
    "classId": "4-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-107",
    "isActivity": false
  },
  "Friday-4-5-A": {
    "classId": "5-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-108",
    "isActivity": true
  },
  "Friday-4-5-B": {
    "classId": "5-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T037",
    "room": "B-201",
    "isActivity": false
  },
  "Friday-4-5-C": {
    "classId": "5-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Friday-4-5-D": {
    "classId": "5-D",
    "day": "Friday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Friday-4-5-E": {
    "classId": "5-E",
    "day": "Friday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Friday-4-6-A": {
    "classId": "6-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-205",
    "isActivity": false
  },
  "Friday-4-6-B": {
    "classId": "6-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-206",
    "isActivity": true
  },
  "Friday-4-6-C": {
    "classId": "6-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "B-207",
    "isActivity": false
  },
  "Friday-4-6-D": {
    "classId": "6-D",
    "day": "Friday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-208",
    "isActivity": false
  },
  "Friday-4-7-A": {
    "classId": "7-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-301",
    "isActivity": false
  },
  "Friday-4-7-B": {
    "classId": "7-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-302",
    "isActivity": false
  },
  "Friday-4-7-C": {
    "classId": "7-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-303",
    "isActivity": false
  },
  "Friday-4-7-D": {
    "classId": "7-D",
    "day": "Friday",
    "period": 4,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-304",
    "isActivity": false
  },
  "Friday-4-8-A": {
    "classId": "8-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-305",
    "isActivity": true
  },
  "Friday-4-8-B": {
    "classId": "8-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": true
  },
  "Friday-4-8-C": {
    "classId": "8-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-307",
    "isActivity": false
  },
  "Friday-4-9-A": {
    "classId": "9-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-101",
    "isActivity": false
  },
  "Friday-4-9-B": {
    "classId": "9-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Friday-4-9-C": {
    "classId": "9-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-103",
    "isActivity": false
  },
  "Friday-4-9-D": {
    "classId": "9-D",
    "day": "Friday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-104",
    "isActivity": false
  },
  "Friday-4-LKG-A": {
    "classId": "LKG-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Friday-4-LKG-B": {
    "classId": "LKG-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Friday-4-LKG-C": {
    "classId": "LKG-C",
    "day": "Friday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-105",
    "isActivity": true
  },
  "Friday-4-NUR-A": {
    "classId": "NUR-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "MUS",
    "teacherId": "T105",
    "room": "A-101",
    "isActivity": true
  },
  "Friday-4-NUR-B": {
    "classId": "NUR-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Friday-4-UKG-A": {
    "classId": "UKG-A",
    "day": "Friday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Friday-4-UKG-B": {
    "classId": "UKG-B",
    "day": "Friday",
    "period": 4,
    "subjectId": "EVS",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Friday-5-1-A": {
    "classId": "1-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "EVS",
    "teacherId": "T014",
    "room": "A-108",
    "isActivity": false
  },
  "Friday-5-1-B": {
    "classId": "1-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Friday-5-1-C": {
    "classId": "1-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-202",
    "isActivity": false
  },
  "Friday-5-1-D": {
    "classId": "1-D",
    "day": "Friday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-203",
    "isActivity": true
  },
  "Friday-5-10-A": {
    "classId": "10-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-105",
    "isActivity": false
  },
  "Friday-5-10-B": {
    "classId": "10-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-106",
    "isActivity": true
  },
  "Friday-5-10-C": {
    "classId": "10-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-107",
    "isActivity": false
  },
  "Friday-5-10-D": {
    "classId": "10-D",
    "day": "Friday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-108",
    "isActivity": false
  },
  "Friday-5-11-A": {
    "classId": "11-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Friday-5-11-B": {
    "classId": "11-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-202",
    "isActivity": true
  },
  "Friday-5-11-C": {
    "classId": "11-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-203",
    "isActivity": false
  },
  "Friday-5-11-D": {
    "classId": "11-D",
    "day": "Friday",
    "period": 5,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Friday-5-11-E": {
    "classId": "11-E",
    "day": "Friday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-205",
    "isActivity": false
  },
  "Friday-5-11-F": {
    "classId": "11-F",
    "day": "Friday",
    "period": 5,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-206",
    "isActivity": false
  },
  "Friday-5-12-A": {
    "classId": "12-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-207",
    "isActivity": false
  },
  "Friday-5-12-B": {
    "classId": "12-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": false
  },
  "Friday-5-12-C": {
    "classId": "12-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-301",
    "isActivity": false
  },
  "Friday-5-12-D": {
    "classId": "12-D",
    "day": "Friday",
    "period": 5,
    "subjectId": "POL",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Friday-5-2-A": {
    "classId": "2-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-204",
    "isActivity": false
  },
  "Friday-5-2-B": {
    "classId": "2-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-205",
    "isActivity": true
  },
  "Friday-5-2-C": {
    "classId": "2-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-206",
    "isActivity": false
  },
  "Friday-5-3-A": {
    "classId": "3-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-101",
    "isActivity": true
  },
  "Friday-5-3-B": {
    "classId": "3-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-102",
    "isActivity": true
  },
  "Friday-5-3-C": {
    "classId": "3-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-103",
    "isActivity": false
  },
  "Friday-5-3-D": {
    "classId": "3-D",
    "day": "Friday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-104",
    "isActivity": false
  },
  "Friday-5-4-A": {
    "classId": "4-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-105",
    "isActivity": true
  },
  "Friday-5-4-B": {
    "classId": "4-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-106",
    "isActivity": false
  },
  "Friday-5-4-C": {
    "classId": "4-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-107",
    "isActivity": false
  },
  "Friday-5-5-A": {
    "classId": "5-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-108",
    "isActivity": false
  },
  "Friday-5-5-B": {
    "classId": "5-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-201",
    "isActivity": false
  },
  "Friday-5-5-C": {
    "classId": "5-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-202",
    "isActivity": false
  },
  "Friday-5-5-D": {
    "classId": "5-D",
    "day": "Friday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-203",
    "isActivity": false
  },
  "Friday-5-5-E": {
    "classId": "5-E",
    "day": "Friday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Friday-5-6-A": {
    "classId": "6-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-205",
    "isActivity": true
  },
  "Friday-5-6-B": {
    "classId": "6-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-206",
    "isActivity": false
  },
  "Friday-5-6-C": {
    "classId": "6-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-207",
    "isActivity": false
  },
  "Friday-5-6-D": {
    "classId": "6-D",
    "day": "Friday",
    "period": 5,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-208",
    "isActivity": false
  },
  "Friday-5-7-A": {
    "classId": "7-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Friday-5-7-B": {
    "classId": "7-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-302",
    "isActivity": true
  },
  "Friday-5-7-C": {
    "classId": "7-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-303",
    "isActivity": false
  },
  "Friday-5-7-D": {
    "classId": "7-D",
    "day": "Friday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-304",
    "isActivity": false
  },
  "Friday-5-8-A": {
    "classId": "8-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Friday-5-8-B": {
    "classId": "8-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Friday-5-8-C": {
    "classId": "8-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-307",
    "isActivity": false
  },
  "Friday-5-9-A": {
    "classId": "9-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-101",
    "isActivity": false
  },
  "Friday-5-9-B": {
    "classId": "9-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-102",
    "isActivity": false
  },
  "Friday-5-9-C": {
    "classId": "9-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-103",
    "isActivity": false
  },
  "Friday-5-9-D": {
    "classId": "9-D",
    "day": "Friday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Friday-5-LKG-A": {
    "classId": "LKG-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-103",
    "isActivity": true
  },
  "Friday-5-LKG-B": {
    "classId": "LKG-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "RHY",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Friday-5-LKG-C": {
    "classId": "LKG-C",
    "day": "Friday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T079",
    "room": "A-105",
    "isActivity": false
  },
  "Friday-5-NUR-A": {
    "classId": "NUR-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T094",
    "room": "A-101",
    "isActivity": true
  },
  "Friday-5-NUR-B": {
    "classId": "NUR-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T052",
    "room": "A-102",
    "isActivity": false
  },
  "Friday-5-UKG-A": {
    "classId": "UKG-A",
    "day": "Friday",
    "period": 5,
    "subjectId": "RHY",
    "teacherId": "T098",
    "room": "A-106",
    "isActivity": false
  },
  "Friday-5-UKG-B": {
    "classId": "UKG-B",
    "day": "Friday",
    "period": 5,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-107",
    "isActivity": true
  },
  "Friday-6-1-A": {
    "classId": "1-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-108",
    "isActivity": true
  },
  "Friday-6-1-B": {
    "classId": "1-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Friday-6-1-C": {
    "classId": "1-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "A-202",
    "isActivity": false
  },
  "Friday-6-1-D": {
    "classId": "1-D",
    "day": "Friday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-203",
    "isActivity": true
  },
  "Friday-6-10-A": {
    "classId": "10-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-105",
    "isActivity": false
  },
  "Friday-6-10-B": {
    "classId": "10-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-106",
    "isActivity": false
  },
  "Friday-6-10-C": {
    "classId": "10-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-107",
    "isActivity": false
  },
  "Friday-6-10-D": {
    "classId": "10-D",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-108",
    "isActivity": false
  },
  "Friday-6-11-A": {
    "classId": "11-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T071",
    "room": "C-201",
    "isActivity": false
  },
  "Friday-6-11-B": {
    "classId": "11-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-202",
    "isActivity": false
  },
  "Friday-6-11-C": {
    "classId": "11-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-203",
    "isActivity": false
  },
  "Friday-6-11-D": {
    "classId": "11-D",
    "day": "Friday",
    "period": 6,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Friday-6-11-E": {
    "classId": "11-E",
    "day": "Friday",
    "period": 6,
    "subjectId": "BST",
    "teacherId": "T043",
    "room": "C-205",
    "isActivity": false
  },
  "Friday-6-11-F": {
    "classId": "11-F",
    "day": "Friday",
    "period": 6,
    "subjectId": "HIS",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Friday-6-12-A": {
    "classId": "12-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-207",
    "isActivity": false
  },
  "Friday-6-12-B": {
    "classId": "12-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-208",
    "isActivity": false
  },
  "Friday-6-12-C": {
    "classId": "12-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-301",
    "isActivity": false
  },
  "Friday-6-12-D": {
    "classId": "12-D",
    "day": "Friday",
    "period": 6,
    "subjectId": "POL",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Friday-6-2-A": {
    "classId": "2-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "A-204",
    "isActivity": false
  },
  "Friday-6-2-B": {
    "classId": "2-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-205",
    "isActivity": true
  },
  "Friday-6-2-C": {
    "classId": "2-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-206",
    "isActivity": false
  },
  "Friday-6-3-A": {
    "classId": "3-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Friday-6-3-B": {
    "classId": "3-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Friday-6-3-C": {
    "classId": "3-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-103",
    "isActivity": false
  },
  "Friday-6-3-D": {
    "classId": "3-D",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-104",
    "isActivity": false
  },
  "Friday-6-4-A": {
    "classId": "4-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Friday-6-4-B": {
    "classId": "4-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-106",
    "isActivity": true
  },
  "Friday-6-4-C": {
    "classId": "4-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-107",
    "isActivity": false
  },
  "Friday-6-5-A": {
    "classId": "5-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "B-108",
    "isActivity": false
  },
  "Friday-6-5-B": {
    "classId": "5-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-201",
    "isActivity": false
  },
  "Friday-6-5-C": {
    "classId": "5-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-202",
    "isActivity": true
  },
  "Friday-6-5-D": {
    "classId": "5-D",
    "day": "Friday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "B-203",
    "isActivity": false
  },
  "Friday-6-5-E": {
    "classId": "5-E",
    "day": "Friday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-204",
    "isActivity": false
  },
  "Friday-6-6-A": {
    "classId": "6-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-205",
    "isActivity": false
  },
  "Friday-6-6-B": {
    "classId": "6-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-206",
    "isActivity": false
  },
  "Friday-6-6-C": {
    "classId": "6-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-207",
    "isActivity": false
  },
  "Friday-6-6-D": {
    "classId": "6-D",
    "day": "Friday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-208",
    "isActivity": false
  },
  "Friday-6-7-A": {
    "classId": "7-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-301",
    "isActivity": true
  },
  "Friday-6-7-B": {
    "classId": "7-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-302",
    "isActivity": false
  },
  "Friday-6-7-C": {
    "classId": "7-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-303",
    "isActivity": true
  },
  "Friday-6-7-D": {
    "classId": "7-D",
    "day": "Friday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-304",
    "isActivity": false
  },
  "Friday-6-8-A": {
    "classId": "8-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-305",
    "isActivity": false
  },
  "Friday-6-8-B": {
    "classId": "8-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-306",
    "isActivity": false
  },
  "Friday-6-8-C": {
    "classId": "8-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-307",
    "isActivity": false
  },
  "Friday-6-9-A": {
    "classId": "9-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-101",
    "isActivity": true
  },
  "Friday-6-9-B": {
    "classId": "9-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "C-102",
    "isActivity": false
  },
  "Friday-6-9-C": {
    "classId": "9-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-103",
    "isActivity": true
  },
  "Friday-6-9-D": {
    "classId": "9-D",
    "day": "Friday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-104",
    "isActivity": false
  },
  "Friday-6-LKG-A": {
    "classId": "LKG-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T061",
    "room": "A-103",
    "isActivity": false
  },
  "Friday-6-LKG-B": {
    "classId": "LKG-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T076",
    "room": "A-104",
    "isActivity": false
  },
  "Friday-6-LKG-C": {
    "classId": "LKG-C",
    "day": "Friday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-105",
    "isActivity": true
  },
  "Friday-6-NUR-A": {
    "classId": "NUR-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T034",
    "room": "A-101",
    "isActivity": false
  },
  "Friday-6-NUR-B": {
    "classId": "NUR-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T104",
    "room": "A-102",
    "isActivity": true
  },
  "Friday-6-UKG-A": {
    "classId": "UKG-A",
    "day": "Friday",
    "period": 6,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-106",
    "isActivity": true
  },
  "Friday-6-UKG-B": {
    "classId": "UKG-B",
    "day": "Friday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T103",
    "room": "A-107",
    "isActivity": false
  },
  "Friday-7-1-A": {
    "classId": "1-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "VE",
    "teacherId": "T014",
    "room": "A-108",
    "isActivity": true
  },
  "Friday-7-1-B": {
    "classId": "1-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Friday-7-1-C": {
    "classId": "1-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-202",
    "isActivity": true
  },
  "Friday-7-1-D": {
    "classId": "1-D",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "A-203",
    "isActivity": false
  },
  "Friday-7-10-A": {
    "classId": "10-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-105",
    "isActivity": false
  },
  "Friday-7-10-B": {
    "classId": "10-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Friday-7-10-C": {
    "classId": "10-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-107",
    "isActivity": false
  },
  "Friday-7-10-D": {
    "classId": "10-D",
    "day": "Friday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-108",
    "isActivity": true
  },
  "Friday-7-11-A": {
    "classId": "11-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-201",
    "isActivity": false
  },
  "Friday-7-11-B": {
    "classId": "11-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-202",
    "isActivity": false
  },
  "Friday-7-11-C": {
    "classId": "11-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-203",
    "isActivity": false
  },
  "Friday-7-11-D": {
    "classId": "11-D",
    "day": "Friday",
    "period": 7,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Friday-7-11-E": {
    "classId": "11-E",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-205",
    "isActivity": false
  },
  "Friday-7-11-F": {
    "classId": "11-F",
    "day": "Friday",
    "period": 7,
    "subjectId": "POL",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Friday-7-12-A": {
    "classId": "12-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-207",
    "isActivity": false
  },
  "Friday-7-12-B": {
    "classId": "12-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Friday-7-12-C": {
    "classId": "12-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Friday-7-12-D": {
    "classId": "12-D",
    "day": "Friday",
    "period": 7,
    "subjectId": "POL",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Friday-7-2-A": {
    "classId": "2-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-204",
    "isActivity": false
  },
  "Friday-7-2-B": {
    "classId": "2-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Friday-7-2-C": {
    "classId": "2-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-206",
    "isActivity": true
  },
  "Friday-7-3-A": {
    "classId": "3-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Friday-7-3-B": {
    "classId": "3-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-102",
    "isActivity": true
  },
  "Friday-7-3-C": {
    "classId": "3-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-103",
    "isActivity": false
  },
  "Friday-7-3-D": {
    "classId": "3-D",
    "day": "Friday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-104",
    "isActivity": false
  },
  "Friday-7-4-A": {
    "classId": "4-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Friday-7-4-B": {
    "classId": "4-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-106",
    "isActivity": false
  },
  "Friday-7-4-C": {
    "classId": "4-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "B-107",
    "isActivity": true
  },
  "Friday-7-5-A": {
    "classId": "5-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-108",
    "isActivity": true
  },
  "Friday-7-5-B": {
    "classId": "5-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-201",
    "isActivity": false
  },
  "Friday-7-5-C": {
    "classId": "5-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Friday-7-5-D": {
    "classId": "5-D",
    "day": "Friday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-203",
    "isActivity": false
  },
  "Friday-7-5-E": {
    "classId": "5-E",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T023",
    "room": "B-204",
    "isActivity": false
  },
  "Friday-7-6-A": {
    "classId": "6-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-205",
    "isActivity": false
  },
  "Friday-7-6-B": {
    "classId": "6-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-206",
    "isActivity": true
  },
  "Friday-7-6-C": {
    "classId": "6-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "VE",
    "teacherId": "T007",
    "room": "B-207",
    "isActivity": true
  },
  "Friday-7-6-D": {
    "classId": "6-D",
    "day": "Friday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Friday-7-7-A": {
    "classId": "7-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-301",
    "isActivity": false
  },
  "Friday-7-7-B": {
    "classId": "7-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-302",
    "isActivity": false
  },
  "Friday-7-7-C": {
    "classId": "7-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-303",
    "isActivity": true
  },
  "Friday-7-7-D": {
    "classId": "7-D",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "B-304",
    "isActivity": false
  },
  "Friday-7-8-A": {
    "classId": "8-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-305",
    "isActivity": false
  },
  "Friday-7-8-B": {
    "classId": "8-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Friday-7-8-C": {
    "classId": "8-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-307",
    "isActivity": false
  },
  "Friday-7-9-A": {
    "classId": "9-A",
    "day": "Friday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-101",
    "isActivity": false
  },
  "Friday-7-9-B": {
    "classId": "9-B",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Friday-7-9-C": {
    "classId": "9-C",
    "day": "Friday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-103",
    "isActivity": false
  },
  "Friday-7-9-D": {
    "classId": "9-D",
    "day": "Friday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-104",
    "isActivity": true
  },
  "Friday-8-10-A": {
    "classId": "10-A",
    "day": "Friday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-105",
    "isActivity": false
  },
  "Friday-8-10-B": {
    "classId": "10-B",
    "day": "Friday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-106",
    "isActivity": true
  },
  "Friday-8-10-C": {
    "classId": "10-C",
    "day": "Friday",
    "period": 8,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-107",
    "isActivity": true
  },
  "Friday-8-10-D": {
    "classId": "10-D",
    "day": "Friday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-108",
    "isActivity": false
  },
  "Friday-8-11-A": {
    "classId": "11-A",
    "day": "Friday",
    "period": 8,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-201",
    "isActivity": false
  },
  "Friday-8-11-B": {
    "classId": "11-B",
    "day": "Friday",
    "period": 8,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-202",
    "isActivity": false
  },
  "Friday-8-11-C": {
    "classId": "11-C",
    "day": "Friday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-203",
    "isActivity": false
  },
  "Friday-8-11-D": {
    "classId": "11-D",
    "day": "Friday",
    "period": 8,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Friday-8-11-E": {
    "classId": "11-E",
    "day": "Friday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-205",
    "isActivity": true
  },
  "Friday-8-11-F": {
    "classId": "11-F",
    "day": "Friday",
    "period": 8,
    "subjectId": "POL",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": false
  },
  "Friday-8-12-A": {
    "classId": "12-A",
    "day": "Friday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Friday-8-12-B": {
    "classId": "12-B",
    "day": "Friday",
    "period": 8,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-208",
    "isActivity": false
  },
  "Friday-8-12-C": {
    "classId": "12-C",
    "day": "Friday",
    "period": 8,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Friday-8-12-D": {
    "classId": "12-D",
    "day": "Friday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-302",
    "isActivity": false
  },
  "Friday-8-6-A": {
    "classId": "6-A",
    "day": "Friday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-205",
    "isActivity": false
  },
  "Friday-8-6-B": {
    "classId": "6-B",
    "day": "Friday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-206",
    "isActivity": false
  },
  "Friday-8-6-C": {
    "classId": "6-C",
    "day": "Friday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-207",
    "isActivity": false
  },
  "Friday-8-6-D": {
    "classId": "6-D",
    "day": "Friday",
    "period": 8,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-208",
    "isActivity": true
  },
  "Friday-8-7-A": {
    "classId": "7-A",
    "day": "Friday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Friday-8-7-B": {
    "classId": "7-B",
    "day": "Friday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-302",
    "isActivity": false
  },
  "Friday-8-7-C": {
    "classId": "7-C",
    "day": "Friday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": false
  },
  "Friday-8-7-D": {
    "classId": "7-D",
    "day": "Friday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-304",
    "isActivity": true
  },
  "Friday-8-8-A": {
    "classId": "8-A",
    "day": "Friday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Friday-8-8-B": {
    "classId": "8-B",
    "day": "Friday",
    "period": 8,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-306",
    "isActivity": false
  },
  "Friday-8-8-C": {
    "classId": "8-C",
    "day": "Friday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-307",
    "isActivity": false
  },
  "Friday-8-9-A": {
    "classId": "9-A",
    "day": "Friday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-101",
    "isActivity": false
  },
  "Friday-8-9-B": {
    "classId": "9-B",
    "day": "Friday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "C-102",
    "isActivity": false
  },
  "Friday-8-9-C": {
    "classId": "9-C",
    "day": "Friday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-103",
    "isActivity": false
  },
  "Friday-8-9-D": {
    "classId": "9-D",
    "day": "Friday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T072",
    "room": "C-104",
    "isActivity": false
  },
  "Saturday-1-1-A": {
    "classId": "1-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-108",
    "isActivity": true
  },
  "Saturday-1-1-B": {
    "classId": "1-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-201",
    "isActivity": false
  },
  "Saturday-1-1-C": {
    "classId": "1-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-202",
    "isActivity": false
  },
  "Saturday-1-1-D": {
    "classId": "1-D",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-203",
    "isActivity": false
  },
  "Saturday-1-10-A": {
    "classId": "10-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-105",
    "isActivity": false
  },
  "Saturday-1-10-B": {
    "classId": "10-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-106",
    "isActivity": false
  },
  "Saturday-1-10-C": {
    "classId": "10-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-107",
    "isActivity": true
  },
  "Saturday-1-10-D": {
    "classId": "10-D",
    "day": "Saturday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-108",
    "isActivity": false
  },
  "Saturday-1-11-A": {
    "classId": "11-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": false
  },
  "Saturday-1-11-B": {
    "classId": "11-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Saturday-1-11-C": {
    "classId": "11-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Saturday-1-11-D": {
    "classId": "11-D",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Saturday-1-11-E": {
    "classId": "11-E",
    "day": "Saturday",
    "period": 1,
    "subjectId": "BST",
    "teacherId": "T043",
    "room": "C-205",
    "isActivity": false
  },
  "Saturday-1-11-F": {
    "classId": "11-F",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-206",
    "isActivity": false
  },
  "Saturday-1-12-A": {
    "classId": "12-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-207",
    "isActivity": true
  },
  "Saturday-1-12-B": {
    "classId": "12-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": false
  },
  "Saturday-1-12-C": {
    "classId": "12-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-301",
    "isActivity": false
  },
  "Saturday-1-12-D": {
    "classId": "12-D",
    "day": "Saturday",
    "period": 1,
    "subjectId": "HIS",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Saturday-1-2-A": {
    "classId": "2-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-204",
    "isActivity": false
  },
  "Saturday-1-2-B": {
    "classId": "2-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-205",
    "isActivity": true
  },
  "Saturday-1-2-C": {
    "classId": "2-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-206",
    "isActivity": false
  },
  "Saturday-1-3-A": {
    "classId": "3-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "B-101",
    "isActivity": false
  },
  "Saturday-1-3-B": {
    "classId": "3-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Saturday-1-3-C": {
    "classId": "3-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-103",
    "isActivity": false
  },
  "Saturday-1-3-D": {
    "classId": "3-D",
    "day": "Saturday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Saturday-1-4-A": {
    "classId": "4-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "DAN",
    "teacherId": "T085",
    "room": "B-105",
    "isActivity": true
  },
  "Saturday-1-4-B": {
    "classId": "4-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-106",
    "isActivity": false
  },
  "Saturday-1-4-C": {
    "classId": "4-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-107",
    "isActivity": false
  },
  "Saturday-1-5-A": {
    "classId": "5-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-108",
    "isActivity": false
  },
  "Saturday-1-5-B": {
    "classId": "5-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T037",
    "room": "B-201",
    "isActivity": true
  },
  "Saturday-1-5-C": {
    "classId": "5-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-202",
    "isActivity": true
  },
  "Saturday-1-5-D": {
    "classId": "5-D",
    "day": "Saturday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Saturday-1-5-E": {
    "classId": "5-E",
    "day": "Saturday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Saturday-1-6-A": {
    "classId": "6-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-205",
    "isActivity": false
  },
  "Saturday-1-6-B": {
    "classId": "6-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-206",
    "isActivity": true
  },
  "Saturday-1-6-C": {
    "classId": "6-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-207",
    "isActivity": false
  },
  "Saturday-1-6-D": {
    "classId": "6-D",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Saturday-1-7-A": {
    "classId": "7-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "VE",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": true
  },
  "Saturday-1-7-B": {
    "classId": "7-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-302",
    "isActivity": false
  },
  "Saturday-1-7-C": {
    "classId": "7-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-303",
    "isActivity": true
  },
  "Saturday-1-7-D": {
    "classId": "7-D",
    "day": "Saturday",
    "period": 1,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-304",
    "isActivity": false
  },
  "Saturday-1-8-A": {
    "classId": "8-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Saturday-1-8-B": {
    "classId": "8-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-306",
    "isActivity": false
  },
  "Saturday-1-8-C": {
    "classId": "8-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "B-307",
    "isActivity": false
  },
  "Saturday-1-9-A": {
    "classId": "9-A",
    "day": "Saturday",
    "period": 1,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-101",
    "isActivity": false
  },
  "Saturday-1-9-B": {
    "classId": "9-B",
    "day": "Saturday",
    "period": 1,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "C-102",
    "isActivity": false
  },
  "Saturday-1-9-C": {
    "classId": "9-C",
    "day": "Saturday",
    "period": 1,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-103",
    "isActivity": false
  },
  "Saturday-1-9-D": {
    "classId": "9-D",
    "day": "Saturday",
    "period": 1,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-104",
    "isActivity": false
  },
  "Saturday-2-1-A": {
    "classId": "1-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-108",
    "isActivity": true
  },
  "Saturday-2-1-B": {
    "classId": "1-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-201",
    "isActivity": false
  },
  "Saturday-2-1-C": {
    "classId": "1-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-202",
    "isActivity": false
  },
  "Saturday-2-1-D": {
    "classId": "1-D",
    "day": "Saturday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "A-203",
    "isActivity": false
  },
  "Saturday-2-10-A": {
    "classId": "10-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "C-105",
    "isActivity": false
  },
  "Saturday-2-10-B": {
    "classId": "10-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-106",
    "isActivity": false
  },
  "Saturday-2-10-C": {
    "classId": "10-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-107",
    "isActivity": false
  },
  "Saturday-2-10-D": {
    "classId": "10-D",
    "day": "Saturday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-108",
    "isActivity": false
  },
  "Saturday-2-11-A": {
    "classId": "11-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": false
  },
  "Saturday-2-11-B": {
    "classId": "11-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Saturday-2-11-C": {
    "classId": "11-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "VE",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": true
  },
  "Saturday-2-11-D": {
    "classId": "11-D",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Saturday-2-11-E": {
    "classId": "11-E",
    "day": "Saturday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-205",
    "isActivity": false
  },
  "Saturday-2-11-F": {
    "classId": "11-F",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-206",
    "isActivity": false
  },
  "Saturday-2-12-A": {
    "classId": "12-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-207",
    "isActivity": false
  },
  "Saturday-2-12-B": {
    "classId": "12-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-208",
    "isActivity": false
  },
  "Saturday-2-12-C": {
    "classId": "12-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "BST",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": false
  },
  "Saturday-2-12-D": {
    "classId": "12-D",
    "day": "Saturday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-302",
    "isActivity": true
  },
  "Saturday-2-2-A": {
    "classId": "2-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "A-204",
    "isActivity": false
  },
  "Saturday-2-2-B": {
    "classId": "2-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Saturday-2-2-C": {
    "classId": "2-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-206",
    "isActivity": true
  },
  "Saturday-2-3-A": {
    "classId": "3-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-101",
    "isActivity": true
  },
  "Saturday-2-3-B": {
    "classId": "3-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Saturday-2-3-C": {
    "classId": "3-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "B-103",
    "isActivity": false
  },
  "Saturday-2-3-D": {
    "classId": "3-D",
    "day": "Saturday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": false
  },
  "Saturday-2-4-A": {
    "classId": "4-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "VE",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": true
  },
  "Saturday-2-4-B": {
    "classId": "4-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-106",
    "isActivity": false
  },
  "Saturday-2-4-C": {
    "classId": "4-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-107",
    "isActivity": false
  },
  "Saturday-2-5-A": {
    "classId": "5-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-108",
    "isActivity": false
  },
  "Saturday-2-5-B": {
    "classId": "5-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-201",
    "isActivity": false
  },
  "Saturday-2-5-C": {
    "classId": "5-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-202",
    "isActivity": false
  },
  "Saturday-2-5-D": {
    "classId": "5-D",
    "day": "Saturday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "B-203",
    "isActivity": false
  },
  "Saturday-2-5-E": {
    "classId": "5-E",
    "day": "Saturday",
    "period": 2,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-204",
    "isActivity": true
  },
  "Saturday-2-6-A": {
    "classId": "6-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-205",
    "isActivity": true
  },
  "Saturday-2-6-B": {
    "classId": "6-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-206",
    "isActivity": false
  },
  "Saturday-2-6-C": {
    "classId": "6-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-207",
    "isActivity": false
  },
  "Saturday-2-6-D": {
    "classId": "6-D",
    "day": "Saturday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Saturday-2-7-A": {
    "classId": "7-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Saturday-2-7-B": {
    "classId": "7-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-302",
    "isActivity": false
  },
  "Saturday-2-7-C": {
    "classId": "7-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "CS",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": false
  },
  "Saturday-2-7-D": {
    "classId": "7-D",
    "day": "Saturday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-304",
    "isActivity": false
  },
  "Saturday-2-8-A": {
    "classId": "8-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "B-305",
    "isActivity": true
  },
  "Saturday-2-8-B": {
    "classId": "8-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "HIN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Saturday-2-8-C": {
    "classId": "8-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-307",
    "isActivity": true
  },
  "Saturday-2-9-A": {
    "classId": "9-A",
    "day": "Saturday",
    "period": 2,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-101",
    "isActivity": false
  },
  "Saturday-2-9-B": {
    "classId": "9-B",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-102",
    "isActivity": false
  },
  "Saturday-2-9-C": {
    "classId": "9-C",
    "day": "Saturday",
    "period": 2,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-103",
    "isActivity": false
  },
  "Saturday-2-9-D": {
    "classId": "9-D",
    "day": "Saturday",
    "period": 2,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "C-104",
    "isActivity": false
  },
  "Saturday-3-1-A": {
    "classId": "1-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-108",
    "isActivity": false
  },
  "Saturday-3-1-B": {
    "classId": "1-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T087",
    "room": "A-201",
    "isActivity": false
  },
  "Saturday-3-1-C": {
    "classId": "1-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-202",
    "isActivity": true
  },
  "Saturday-3-1-D": {
    "classId": "1-D",
    "day": "Saturday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-203",
    "isActivity": false
  },
  "Saturday-3-10-A": {
    "classId": "10-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-105",
    "isActivity": false
  },
  "Saturday-3-10-B": {
    "classId": "10-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-106",
    "isActivity": false
  },
  "Saturday-3-10-C": {
    "classId": "10-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-107",
    "isActivity": true
  },
  "Saturday-3-10-D": {
    "classId": "10-D",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-108",
    "isActivity": true
  },
  "Saturday-3-11-A": {
    "classId": "11-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T071",
    "room": "C-201",
    "isActivity": false
  },
  "Saturday-3-11-B": {
    "classId": "11-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-202",
    "isActivity": false
  },
  "Saturday-3-11-C": {
    "classId": "11-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Saturday-3-11-D": {
    "classId": "11-D",
    "day": "Saturday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-204",
    "isActivity": true
  },
  "Saturday-3-11-E": {
    "classId": "11-E",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ACC",
    "teacherId": "T003",
    "room": "C-205",
    "isActivity": false
  },
  "Saturday-3-11-F": {
    "classId": "11-F",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-206",
    "isActivity": false
  },
  "Saturday-3-12-A": {
    "classId": "12-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-207",
    "isActivity": false
  },
  "Saturday-3-12-B": {
    "classId": "12-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Saturday-3-12-C": {
    "classId": "12-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "BST",
    "teacherId": "T075",
    "room": "C-301",
    "isActivity": false
  },
  "Saturday-3-12-D": {
    "classId": "12-D",
    "day": "Saturday",
    "period": 3,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-302",
    "isActivity": true
  },
  "Saturday-3-2-A": {
    "classId": "2-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "A-204",
    "isActivity": false
  },
  "Saturday-3-2-B": {
    "classId": "2-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-205",
    "isActivity": false
  },
  "Saturday-3-2-C": {
    "classId": "2-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "EVS",
    "teacherId": "T037",
    "room": "A-206",
    "isActivity": false
  },
  "Saturday-3-3-A": {
    "classId": "3-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "B-101",
    "isActivity": false
  },
  "Saturday-3-3-B": {
    "classId": "3-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "B-102",
    "isActivity": false
  },
  "Saturday-3-3-C": {
    "classId": "3-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "B-103",
    "isActivity": false
  },
  "Saturday-3-3-D": {
    "classId": "3-D",
    "day": "Saturday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T036",
    "room": "B-104",
    "isActivity": true
  },
  "Saturday-3-4-A": {
    "classId": "4-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Saturday-3-4-B": {
    "classId": "4-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-106",
    "isActivity": false
  },
  "Saturday-3-4-C": {
    "classId": "4-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-107",
    "isActivity": true
  },
  "Saturday-3-5-A": {
    "classId": "5-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "B-108",
    "isActivity": true
  },
  "Saturday-3-5-B": {
    "classId": "5-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-201",
    "isActivity": true
  },
  "Saturday-3-5-C": {
    "classId": "5-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-202",
    "isActivity": false
  },
  "Saturday-3-5-D": {
    "classId": "5-D",
    "day": "Saturday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "B-203",
    "isActivity": false
  },
  "Saturday-3-5-E": {
    "classId": "5-E",
    "day": "Saturday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-204",
    "isActivity": false
  },
  "Saturday-3-6-A": {
    "classId": "6-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-205",
    "isActivity": false
  },
  "Saturday-3-6-B": {
    "classId": "6-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-206",
    "isActivity": false
  },
  "Saturday-3-6-C": {
    "classId": "6-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-207",
    "isActivity": false
  },
  "Saturday-3-6-D": {
    "classId": "6-D",
    "day": "Saturday",
    "period": 3,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-208",
    "isActivity": false
  },
  "Saturday-3-7-A": {
    "classId": "7-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Saturday-3-7-B": {
    "classId": "7-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "VE",
    "teacherId": "T006",
    "room": "B-302",
    "isActivity": true
  },
  "Saturday-3-7-C": {
    "classId": "7-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": false
  },
  "Saturday-3-7-D": {
    "classId": "7-D",
    "day": "Saturday",
    "period": 3,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-304",
    "isActivity": false
  },
  "Saturday-3-8-A": {
    "classId": "8-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Saturday-3-8-B": {
    "classId": "8-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Saturday-3-8-C": {
    "classId": "8-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-307",
    "isActivity": false
  },
  "Saturday-3-9-A": {
    "classId": "9-A",
    "day": "Saturday",
    "period": 3,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-101",
    "isActivity": true
  },
  "Saturday-3-9-B": {
    "classId": "9-B",
    "day": "Saturday",
    "period": 3,
    "subjectId": "MAT",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Saturday-3-9-C": {
    "classId": "9-C",
    "day": "Saturday",
    "period": 3,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-103",
    "isActivity": false
  },
  "Saturday-3-9-D": {
    "classId": "9-D",
    "day": "Saturday",
    "period": 3,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "C-104",
    "isActivity": false
  },
  "Saturday-4-1-A": {
    "classId": "1-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-108",
    "isActivity": false
  },
  "Saturday-4-1-B": {
    "classId": "1-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-201",
    "isActivity": true
  },
  "Saturday-4-1-C": {
    "classId": "1-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "A-202",
    "isActivity": false
  },
  "Saturday-4-1-D": {
    "classId": "1-D",
    "day": "Saturday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "A-203",
    "isActivity": false
  },
  "Saturday-4-10-A": {
    "classId": "10-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-105",
    "isActivity": false
  },
  "Saturday-4-10-B": {
    "classId": "10-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-106",
    "isActivity": false
  },
  "Saturday-4-10-C": {
    "classId": "10-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-107",
    "isActivity": false
  },
  "Saturday-4-10-D": {
    "classId": "10-D",
    "day": "Saturday",
    "period": 4,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-108",
    "isActivity": true
  },
  "Saturday-4-11-A": {
    "classId": "11-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-201",
    "isActivity": false
  },
  "Saturday-4-11-B": {
    "classId": "11-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-202",
    "isActivity": false
  },
  "Saturday-4-11-C": {
    "classId": "11-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-203",
    "isActivity": false
  },
  "Saturday-4-11-D": {
    "classId": "11-D",
    "day": "Saturday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-204",
    "isActivity": false
  },
  "Saturday-4-11-E": {
    "classId": "11-E",
    "day": "Saturday",
    "period": 4,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": false
  },
  "Saturday-4-11-F": {
    "classId": "11-F",
    "day": "Saturday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-206",
    "isActivity": false
  },
  "Saturday-4-12-A": {
    "classId": "12-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-207",
    "isActivity": true
  },
  "Saturday-4-12-B": {
    "classId": "12-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-208",
    "isActivity": false
  },
  "Saturday-4-12-C": {
    "classId": "12-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-301",
    "isActivity": false
  },
  "Saturday-4-12-D": {
    "classId": "12-D",
    "day": "Saturday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": true
  },
  "Saturday-4-2-A": {
    "classId": "2-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-204",
    "isActivity": false
  },
  "Saturday-4-2-B": {
    "classId": "2-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Saturday-4-2-C": {
    "classId": "2-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-206",
    "isActivity": false
  },
  "Saturday-4-3-A": {
    "classId": "3-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Saturday-4-3-B": {
    "classId": "3-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T087",
    "room": "B-102",
    "isActivity": false
  },
  "Saturday-4-3-C": {
    "classId": "3-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-103",
    "isActivity": false
  },
  "Saturday-4-3-D": {
    "classId": "3-D",
    "day": "Saturday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "B-104",
    "isActivity": true
  },
  "Saturday-4-4-A": {
    "classId": "4-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T036",
    "room": "B-105",
    "isActivity": false
  },
  "Saturday-4-4-B": {
    "classId": "4-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-106",
    "isActivity": false
  },
  "Saturday-4-4-C": {
    "classId": "4-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-107",
    "isActivity": false
  },
  "Saturday-4-5-A": {
    "classId": "5-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-108",
    "isActivity": false
  },
  "Saturday-4-5-B": {
    "classId": "5-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T058",
    "room": "B-201",
    "isActivity": false
  },
  "Saturday-4-5-C": {
    "classId": "5-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-202",
    "isActivity": true
  },
  "Saturday-4-5-D": {
    "classId": "5-D",
    "day": "Saturday",
    "period": 4,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-203",
    "isActivity": false
  },
  "Saturday-4-5-E": {
    "classId": "5-E",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-204",
    "isActivity": false
  },
  "Saturday-4-6-A": {
    "classId": "6-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-205",
    "isActivity": false
  },
  "Saturday-4-6-B": {
    "classId": "6-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SAN",
    "teacherId": "T100",
    "room": "B-206",
    "isActivity": false
  },
  "Saturday-4-6-C": {
    "classId": "6-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-207",
    "isActivity": true
  },
  "Saturday-4-6-D": {
    "classId": "6-D",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-208",
    "isActivity": false
  },
  "Saturday-4-7-A": {
    "classId": "7-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-301",
    "isActivity": false
  },
  "Saturday-4-7-B": {
    "classId": "7-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-302",
    "isActivity": false
  },
  "Saturday-4-7-C": {
    "classId": "7-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-303",
    "isActivity": false
  },
  "Saturday-4-7-D": {
    "classId": "7-D",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T072",
    "room": "B-304",
    "isActivity": false
  },
  "Saturday-4-8-A": {
    "classId": "8-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "VE",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": true
  },
  "Saturday-4-8-B": {
    "classId": "8-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SST",
    "teacherId": "T019",
    "room": "B-306",
    "isActivity": false
  },
  "Saturday-4-8-C": {
    "classId": "8-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "B-307",
    "isActivity": false
  },
  "Saturday-4-9-A": {
    "classId": "9-A",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-101",
    "isActivity": false
  },
  "Saturday-4-9-B": {
    "classId": "9-B",
    "day": "Saturday",
    "period": 4,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-102",
    "isActivity": false
  },
  "Saturday-4-9-C": {
    "classId": "9-C",
    "day": "Saturday",
    "period": 4,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "C-103",
    "isActivity": false
  },
  "Saturday-4-9-D": {
    "classId": "9-D",
    "day": "Saturday",
    "period": 4,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "C-104",
    "isActivity": true
  },
  "Saturday-5-1-A": {
    "classId": "1-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-108",
    "isActivity": true
  },
  "Saturday-5-1-B": {
    "classId": "1-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T106",
    "room": "A-201",
    "isActivity": false
  },
  "Saturday-5-1-C": {
    "classId": "1-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MUS",
    "teacherId": "T085",
    "room": "A-202",
    "isActivity": true
  },
  "Saturday-5-1-D": {
    "classId": "1-D",
    "day": "Saturday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-203",
    "isActivity": true
  },
  "Saturday-5-10-A": {
    "classId": "10-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "C-105",
    "isActivity": false
  },
  "Saturday-5-10-B": {
    "classId": "10-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Saturday-5-10-C": {
    "classId": "10-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-107",
    "isActivity": false
  },
  "Saturday-5-10-D": {
    "classId": "10-D",
    "day": "Saturday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-108",
    "isActivity": true
  },
  "Saturday-5-11-A": {
    "classId": "11-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-201",
    "isActivity": false
  },
  "Saturday-5-11-B": {
    "classId": "11-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "BIO",
    "teacherId": "T004",
    "room": "C-202",
    "isActivity": false
  },
  "Saturday-5-11-C": {
    "classId": "11-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-203",
    "isActivity": false
  },
  "Saturday-5-11-D": {
    "classId": "11-D",
    "day": "Saturday",
    "period": 5,
    "subjectId": "BST",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Saturday-5-11-E": {
    "classId": "11-E",
    "day": "Saturday",
    "period": 5,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": false
  },
  "Saturday-5-11-F": {
    "classId": "11-F",
    "day": "Saturday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T016",
    "room": "C-206",
    "isActivity": false
  },
  "Saturday-5-12-A": {
    "classId": "12-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "VE",
    "teacherId": "T015",
    "room": "C-207",
    "isActivity": true
  },
  "Saturday-5-12-B": {
    "classId": "12-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "PSY",
    "teacherId": "T064",
    "room": "C-208",
    "isActivity": false
  },
  "Saturday-5-12-C": {
    "classId": "12-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-301",
    "isActivity": false
  },
  "Saturday-5-12-D": {
    "classId": "12-D",
    "day": "Saturday",
    "period": 5,
    "subjectId": "POL",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Saturday-5-2-A": {
    "classId": "2-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-204",
    "isActivity": true
  },
  "Saturday-5-2-B": {
    "classId": "2-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "A-205",
    "isActivity": false
  },
  "Saturday-5-2-C": {
    "classId": "2-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-206",
    "isActivity": true
  },
  "Saturday-5-3-A": {
    "classId": "3-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "B-101",
    "isActivity": false
  },
  "Saturday-5-3-B": {
    "classId": "3-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-102",
    "isActivity": false
  },
  "Saturday-5-3-C": {
    "classId": "3-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T087",
    "room": "B-103",
    "isActivity": false
  },
  "Saturday-5-3-D": {
    "classId": "3-D",
    "day": "Saturday",
    "period": 5,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-104",
    "isActivity": true
  },
  "Saturday-5-4-A": {
    "classId": "4-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-105",
    "isActivity": false
  },
  "Saturday-5-4-B": {
    "classId": "4-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-106",
    "isActivity": false
  },
  "Saturday-5-4-C": {
    "classId": "4-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-107",
    "isActivity": false
  },
  "Saturday-5-5-A": {
    "classId": "5-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T014",
    "room": "B-108",
    "isActivity": false
  },
  "Saturday-5-5-B": {
    "classId": "5-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-201",
    "isActivity": false
  },
  "Saturday-5-5-C": {
    "classId": "5-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Saturday-5-5-D": {
    "classId": "5-D",
    "day": "Saturday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-203",
    "isActivity": false
  },
  "Saturday-5-5-E": {
    "classId": "5-E",
    "day": "Saturday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "B-204",
    "isActivity": false
  },
  "Saturday-5-6-A": {
    "classId": "6-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-205",
    "isActivity": true
  },
  "Saturday-5-6-B": {
    "classId": "6-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-206",
    "isActivity": true
  },
  "Saturday-5-6-C": {
    "classId": "6-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-207",
    "isActivity": false
  },
  "Saturday-5-6-D": {
    "classId": "6-D",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-208",
    "isActivity": false
  },
  "Saturday-5-7-A": {
    "classId": "7-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-301",
    "isActivity": true
  },
  "Saturday-5-7-B": {
    "classId": "7-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-302",
    "isActivity": false
  },
  "Saturday-5-7-C": {
    "classId": "7-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "B-303",
    "isActivity": true
  },
  "Saturday-5-7-D": {
    "classId": "7-D",
    "day": "Saturday",
    "period": 5,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-304",
    "isActivity": false
  },
  "Saturday-5-8-A": {
    "classId": "8-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-305",
    "isActivity": true
  },
  "Saturday-5-8-B": {
    "classId": "8-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-306",
    "isActivity": false
  },
  "Saturday-5-8-C": {
    "classId": "8-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-307",
    "isActivity": false
  },
  "Saturday-5-9-A": {
    "classId": "9-A",
    "day": "Saturday",
    "period": 5,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-101",
    "isActivity": false
  },
  "Saturday-5-9-B": {
    "classId": "9-B",
    "day": "Saturday",
    "period": 5,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Saturday-5-9-C": {
    "classId": "9-C",
    "day": "Saturday",
    "period": 5,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-103",
    "isActivity": false
  },
  "Saturday-5-9-D": {
    "classId": "9-D",
    "day": "Saturday",
    "period": 5,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-104",
    "isActivity": false
  },
  "Saturday-6-1-A": {
    "classId": "1-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T095",
    "room": "A-108",
    "isActivity": false
  },
  "Saturday-6-1-B": {
    "classId": "1-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-201",
    "isActivity": true
  },
  "Saturday-6-1-C": {
    "classId": "1-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T102",
    "room": "A-202",
    "isActivity": false
  },
  "Saturday-6-1-D": {
    "classId": "1-D",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T101",
    "room": "A-203",
    "isActivity": false
  },
  "Saturday-6-10-A": {
    "classId": "10-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-105",
    "isActivity": true
  },
  "Saturday-6-10-B": {
    "classId": "10-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-106",
    "isActivity": false
  },
  "Saturday-6-10-C": {
    "classId": "10-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-107",
    "isActivity": false
  },
  "Saturday-6-10-D": {
    "classId": "10-D",
    "day": "Saturday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T008",
    "room": "C-108",
    "isActivity": false
  },
  "Saturday-6-11-A": {
    "classId": "11-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "PHY",
    "teacherId": "T021",
    "room": "C-201",
    "isActivity": false
  },
  "Saturday-6-11-B": {
    "classId": "11-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-202",
    "isActivity": false
  },
  "Saturday-6-11-C": {
    "classId": "11-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T074",
    "room": "C-203",
    "isActivity": false
  },
  "Saturday-6-11-D": {
    "classId": "11-D",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-204",
    "isActivity": false
  },
  "Saturday-6-11-E": {
    "classId": "11-E",
    "day": "Saturday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-205",
    "isActivity": true
  },
  "Saturday-6-11-F": {
    "classId": "11-F",
    "day": "Saturday",
    "period": 6,
    "subjectId": "GEO",
    "teacherId": "T048",
    "room": "C-206",
    "isActivity": false
  },
  "Saturday-6-12-A": {
    "classId": "12-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-207",
    "isActivity": false
  },
  "Saturday-6-12-B": {
    "classId": "12-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "CHE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": false
  },
  "Saturday-6-12-C": {
    "classId": "12-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-301",
    "isActivity": false
  },
  "Saturday-6-12-D": {
    "classId": "12-D",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-302",
    "isActivity": false
  },
  "Saturday-6-2-A": {
    "classId": "2-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T068",
    "room": "A-204",
    "isActivity": false
  },
  "Saturday-6-2-B": {
    "classId": "2-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-205",
    "isActivity": true
  },
  "Saturday-6-2-C": {
    "classId": "2-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "VE",
    "teacherId": "T059",
    "room": "A-206",
    "isActivity": true
  },
  "Saturday-6-3-A": {
    "classId": "3-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T031",
    "room": "B-101",
    "isActivity": false
  },
  "Saturday-6-3-B": {
    "classId": "3-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-102",
    "isActivity": false
  },
  "Saturday-6-3-C": {
    "classId": "3-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T086",
    "room": "B-103",
    "isActivity": false
  },
  "Saturday-6-3-D": {
    "classId": "3-D",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T060",
    "room": "B-104",
    "isActivity": false
  },
  "Saturday-6-4-A": {
    "classId": "4-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-105",
    "isActivity": true
  },
  "Saturday-6-4-B": {
    "classId": "4-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "VE",
    "teacherId": "T058",
    "room": "B-106",
    "isActivity": true
  },
  "Saturday-6-4-C": {
    "classId": "4-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-107",
    "isActivity": false
  },
  "Saturday-6-5-A": {
    "classId": "5-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-108",
    "isActivity": false
  },
  "Saturday-6-5-B": {
    "classId": "5-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-201",
    "isActivity": false
  },
  "Saturday-6-5-C": {
    "classId": "5-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "B-202",
    "isActivity": true
  },
  "Saturday-6-5-D": {
    "classId": "5-D",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T057",
    "room": "B-203",
    "isActivity": false
  },
  "Saturday-6-5-E": {
    "classId": "5-E",
    "day": "Saturday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-204",
    "isActivity": true
  },
  "Saturday-6-6-A": {
    "classId": "6-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-205",
    "isActivity": false
  },
  "Saturday-6-6-B": {
    "classId": "6-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-206",
    "isActivity": false
  },
  "Saturday-6-6-C": {
    "classId": "6-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-207",
    "isActivity": false
  },
  "Saturday-6-6-D": {
    "classId": "6-D",
    "day": "Saturday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T054",
    "room": "B-208",
    "isActivity": false
  },
  "Saturday-6-7-A": {
    "classId": "7-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "CS",
    "teacherId": "T020",
    "room": "B-301",
    "isActivity": false
  },
  "Saturday-6-7-B": {
    "classId": "7-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-302",
    "isActivity": false
  },
  "Saturday-6-7-C": {
    "classId": "7-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "SST",
    "teacherId": "T050",
    "room": "B-303",
    "isActivity": false
  },
  "Saturday-6-7-D": {
    "classId": "7-D",
    "day": "Saturday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "B-304",
    "isActivity": false
  },
  "Saturday-6-8-A": {
    "classId": "8-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-305",
    "isActivity": false
  },
  "Saturday-6-8-B": {
    "classId": "8-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-306",
    "isActivity": false
  },
  "Saturday-6-8-C": {
    "classId": "8-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-307",
    "isActivity": true
  },
  "Saturday-6-9-A": {
    "classId": "9-A",
    "day": "Saturday",
    "period": 6,
    "subjectId": "MAT",
    "teacherId": "T051",
    "room": "C-101",
    "isActivity": false
  },
  "Saturday-6-9-B": {
    "classId": "9-B",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-102",
    "isActivity": false
  },
  "Saturday-6-9-C": {
    "classId": "9-C",
    "day": "Saturday",
    "period": 6,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-103",
    "isActivity": true
  },
  "Saturday-6-9-D": {
    "classId": "9-D",
    "day": "Saturday",
    "period": 6,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "C-104",
    "isActivity": false
  },
  "Saturday-7-1-A": {
    "classId": "1-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "LIB",
    "teacherId": "T066",
    "room": "A-108",
    "isActivity": true
  },
  "Saturday-7-1-B": {
    "classId": "1-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T093",
    "room": "A-201",
    "isActivity": true
  },
  "Saturday-7-1-C": {
    "classId": "1-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T088",
    "room": "A-202",
    "isActivity": true
  },
  "Saturday-7-1-D": {
    "classId": "1-D",
    "day": "Saturday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T084",
    "room": "A-203",
    "isActivity": true
  },
  "Saturday-7-10-A": {
    "classId": "10-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T012",
    "room": "C-105",
    "isActivity": false
  },
  "Saturday-7-10-B": {
    "classId": "10-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T040",
    "room": "C-106",
    "isActivity": true
  },
  "Saturday-7-10-C": {
    "classId": "10-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-107",
    "isActivity": false
  },
  "Saturday-7-10-D": {
    "classId": "10-D",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T007",
    "room": "C-108",
    "isActivity": false
  },
  "Saturday-7-11-A": {
    "classId": "11-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-201",
    "isActivity": false
  },
  "Saturday-7-11-B": {
    "classId": "11-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "LIB",
    "teacherId": "T032",
    "room": "C-202",
    "isActivity": true
  },
  "Saturday-7-11-C": {
    "classId": "11-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-203",
    "isActivity": false
  },
  "Saturday-7-11-D": {
    "classId": "11-D",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-204",
    "isActivity": false
  },
  "Saturday-7-11-E": {
    "classId": "11-E",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-205",
    "isActivity": false
  },
  "Saturday-7-11-F": {
    "classId": "11-F",
    "day": "Saturday",
    "period": 7,
    "subjectId": "VE",
    "teacherId": "T025",
    "room": "C-206",
    "isActivity": true
  },
  "Saturday-7-12-A": {
    "classId": "12-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "PHY",
    "teacherId": "T005",
    "room": "C-207",
    "isActivity": false
  },
  "Saturday-7-12-B": {
    "classId": "12-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T017",
    "room": "C-208",
    "isActivity": true
  },
  "Saturday-7-12-C": {
    "classId": "12-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ACC",
    "teacherId": "T001",
    "room": "C-301",
    "isActivity": false
  },
  "Saturday-7-12-D": {
    "classId": "12-D",
    "day": "Saturday",
    "period": 7,
    "subjectId": "HIS",
    "teacherId": "T083",
    "room": "C-302",
    "isActivity": false
  },
  "Saturday-7-2-A": {
    "classId": "2-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "MUS",
    "teacherId": "T038",
    "room": "A-204",
    "isActivity": true
  },
  "Saturday-7-2-B": {
    "classId": "2-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T029",
    "room": "A-205",
    "isActivity": false
  },
  "Saturday-7-2-C": {
    "classId": "2-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T096",
    "room": "A-206",
    "isActivity": false
  },
  "Saturday-7-3-A": {
    "classId": "3-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T037",
    "room": "B-101",
    "isActivity": false
  },
  "Saturday-7-3-B": {
    "classId": "3-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T087",
    "room": "B-102",
    "isActivity": false
  },
  "Saturday-7-3-C": {
    "classId": "3-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T059",
    "room": "B-103",
    "isActivity": false
  },
  "Saturday-7-3-D": {
    "classId": "3-D",
    "day": "Saturday",
    "period": 7,
    "subjectId": "SST",
    "teacherId": "T082",
    "room": "B-104",
    "isActivity": false
  },
  "Saturday-7-4-A": {
    "classId": "4-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "CS",
    "teacherId": "T044",
    "room": "B-105",
    "isActivity": false
  },
  "Saturday-7-4-B": {
    "classId": "4-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T035",
    "room": "B-106",
    "isActivity": false
  },
  "Saturday-7-4-C": {
    "classId": "4-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T047",
    "room": "B-107",
    "isActivity": false
  },
  "Saturday-7-5-A": {
    "classId": "5-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T018",
    "room": "B-108",
    "isActivity": true
  },
  "Saturday-7-5-B": {
    "classId": "5-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T026",
    "room": "B-201",
    "isActivity": false
  },
  "Saturday-7-5-C": {
    "classId": "5-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T062",
    "room": "B-202",
    "isActivity": false
  },
  "Saturday-7-5-D": {
    "classId": "5-D",
    "day": "Saturday",
    "period": 7,
    "subjectId": "VE",
    "teacherId": "T106",
    "room": "B-203",
    "isActivity": true
  },
  "Saturday-7-5-E": {
    "classId": "5-E",
    "day": "Saturday",
    "period": 7,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-204",
    "isActivity": true
  },
  "Saturday-7-6-A": {
    "classId": "6-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T067",
    "room": "B-205",
    "isActivity": true
  },
  "Saturday-7-6-B": {
    "classId": "6-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T097",
    "room": "B-206",
    "isActivity": false
  },
  "Saturday-7-6-C": {
    "classId": "6-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-207",
    "isActivity": false
  },
  "Saturday-7-6-D": {
    "classId": "6-D",
    "day": "Saturday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-208",
    "isActivity": true
  },
  "Saturday-7-7-A": {
    "classId": "7-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "SAN",
    "teacherId": "T045",
    "room": "B-301",
    "isActivity": false
  },
  "Saturday-7-7-B": {
    "classId": "7-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-302",
    "isActivity": false
  },
  "Saturday-7-7-C": {
    "classId": "7-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T091",
    "room": "B-303",
    "isActivity": false
  },
  "Saturday-7-7-D": {
    "classId": "7-D",
    "day": "Saturday",
    "period": 7,
    "subjectId": "MAT",
    "teacherId": "T049",
    "room": "B-304",
    "isActivity": false
  },
  "Saturday-7-8-A": {
    "classId": "8-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "B-305",
    "isActivity": false
  },
  "Saturday-7-8-B": {
    "classId": "8-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-306",
    "isActivity": false
  },
  "Saturday-7-8-C": {
    "classId": "8-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "PE",
    "teacherId": "T041",
    "room": "B-307",
    "isActivity": true
  },
  "Saturday-7-9-A": {
    "classId": "9-A",
    "day": "Saturday",
    "period": 7,
    "subjectId": "SCI",
    "teacherId": "T069",
    "room": "C-101",
    "isActivity": false
  },
  "Saturday-7-9-B": {
    "classId": "9-B",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ENG",
    "teacherId": "T022",
    "room": "C-102",
    "isActivity": false
  },
  "Saturday-7-9-C": {
    "classId": "9-C",
    "day": "Saturday",
    "period": 7,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-103",
    "isActivity": true
  },
  "Saturday-7-9-D": {
    "classId": "9-D",
    "day": "Saturday",
    "period": 7,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-104",
    "isActivity": false
  },
  "Saturday-8-10-A": {
    "classId": "10-A",
    "day": "Saturday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T024",
    "room": "C-105",
    "isActivity": false
  },
  "Saturday-8-10-B": {
    "classId": "10-B",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T013",
    "room": "C-106",
    "isActivity": false
  },
  "Saturday-8-10-C": {
    "classId": "10-C",
    "day": "Saturday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T006",
    "room": "C-107",
    "isActivity": false
  },
  "Saturday-8-10-D": {
    "classId": "10-D",
    "day": "Saturday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T002",
    "room": "C-108",
    "isActivity": false
  },
  "Saturday-8-11-A": {
    "classId": "11-A",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T071",
    "room": "C-201",
    "isActivity": false
  },
  "Saturday-8-11-B": {
    "classId": "11-B",
    "day": "Saturday",
    "period": 8,
    "subjectId": "CHE",
    "teacherId": "T090",
    "room": "C-202",
    "isActivity": false
  },
  "Saturday-8-11-C": {
    "classId": "11-C",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T046",
    "room": "C-203",
    "isActivity": false
  },
  "Saturday-8-11-D": {
    "classId": "11-D",
    "day": "Saturday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T063",
    "room": "C-204",
    "isActivity": false
  },
  "Saturday-8-11-E": {
    "classId": "11-E",
    "day": "Saturday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T030",
    "room": "C-205",
    "isActivity": false
  },
  "Saturday-8-11-F": {
    "classId": "11-F",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ECO",
    "teacherId": "T073",
    "room": "C-206",
    "isActivity": false
  },
  "Saturday-8-12-A": {
    "classId": "12-A",
    "day": "Saturday",
    "period": 8,
    "subjectId": "CS",
    "teacherId": "T055",
    "room": "C-207",
    "isActivity": false
  },
  "Saturday-8-12-B": {
    "classId": "12-B",
    "day": "Saturday",
    "period": 8,
    "subjectId": "VE",
    "teacherId": "T081",
    "room": "C-208",
    "isActivity": true
  },
  "Saturday-8-12-C": {
    "classId": "12-C",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T015",
    "room": "C-301",
    "isActivity": false
  },
  "Saturday-8-12-D": {
    "classId": "12-D",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ECO",
    "teacherId": "T042",
    "room": "C-302",
    "isActivity": false
  },
  "Saturday-8-6-A": {
    "classId": "6-A",
    "day": "Saturday",
    "period": 8,
    "subjectId": "DAN",
    "teacherId": "T009",
    "room": "B-205",
    "isActivity": true
  },
  "Saturday-8-6-B": {
    "classId": "6-B",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T028",
    "room": "B-206",
    "isActivity": false
  },
  "Saturday-8-6-C": {
    "classId": "6-C",
    "day": "Saturday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T092",
    "room": "B-207",
    "isActivity": false
  },
  "Saturday-8-6-D": {
    "classId": "6-D",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T008",
    "room": "B-208",
    "isActivity": false
  },
  "Saturday-8-7-A": {
    "classId": "7-A",
    "day": "Saturday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T077",
    "room": "B-301",
    "isActivity": false
  },
  "Saturday-8-7-B": {
    "classId": "7-B",
    "day": "Saturday",
    "period": 8,
    "subjectId": "HIN",
    "teacherId": "T078",
    "room": "B-302",
    "isActivity": false
  },
  "Saturday-8-7-C": {
    "classId": "7-C",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T027",
    "room": "B-303",
    "isActivity": false
  },
  "Saturday-8-7-D": {
    "classId": "7-D",
    "day": "Saturday",
    "period": 8,
    "subjectId": "PE",
    "teacherId": "T053",
    "room": "B-304",
    "isActivity": true
  },
  "Saturday-8-8-A": {
    "classId": "8-A",
    "day": "Saturday",
    "period": 8,
    "subjectId": "SAN",
    "teacherId": "T039",
    "room": "B-305",
    "isActivity": false
  },
  "Saturday-8-8-B": {
    "classId": "8-B",
    "day": "Saturday",
    "period": 8,
    "subjectId": "SCI",
    "teacherId": "T033",
    "room": "B-306",
    "isActivity": false
  },
  "Saturday-8-8-C": {
    "classId": "8-C",
    "day": "Saturday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T056",
    "room": "B-307",
    "isActivity": false
  },
  "Saturday-8-9-A": {
    "classId": "9-A",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ART",
    "teacherId": "T010",
    "room": "C-101",
    "isActivity": true
  },
  "Saturday-8-9-B": {
    "classId": "9-B",
    "day": "Saturday",
    "period": 8,
    "subjectId": "MAT",
    "teacherId": "T069",
    "room": "C-102",
    "isActivity": false
  },
  "Saturday-8-9-C": {
    "classId": "9-C",
    "day": "Saturday",
    "period": 8,
    "subjectId": "SST",
    "teacherId": "T011",
    "room": "C-103",
    "isActivity": false
  },
  "Saturday-8-9-D": {
    "classId": "9-D",
    "day": "Saturday",
    "period": 8,
    "subjectId": "ENG",
    "teacherId": "T019",
    "room": "C-104",
    "isActivity": false
  }
};

export function createGreenwoodCleanSchool(): School {
  return {
    id: DEMO_SCHOOL_ID,
    name: 'Greenwood Public School',
    subdomain: 'greenwood.chronos.edu',
    timezone: 'IST (UTC+5:30)',
    term: 'Academic Year 2026-27',
    published: true,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    rules: {
      primaryEndPeriod: 7,
      seniorEndPeriod: 8,
      prePrimaryEndPeriod: 6,
      maxTeacherPeriodsPerDay: 6,
      activityDay: 'None',
      activityPeriods: [],
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
    periodSlots: GREENWOOD_CLEAN_PERIOD_SLOTS,
    classes: JSON.parse(JSON.stringify(GREENWOOD_CLEAN_SECTIONS)),
    rooms: JSON.parse(JSON.stringify(GREENWOOD_CLEAN_ROOMS)),
    subjects: JSON.parse(JSON.stringify(GREENWOOD_CLEAN_SUBJECTS)),
    teachers: JSON.parse(JSON.stringify(GREENWOOD_CLEAN_TEACHERS)),
    assignments: JSON.parse(JSON.stringify(GREENWOOD_CLEAN_ASSIGNMENTS)),
    absences: [],
    substitutions: {},
  };
}

export function getGreenwoodCleanInitialSchedule(): ScheduleResult {
  return {
    entries: JSON.parse(JSON.stringify(GREENWOOD_CLEAN_ENTRIES)),
    diagnostics: [],
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    qualityReport: {
      total_entries: 2400,
      empty_period_count: 0,
      unplaced_lessons: [],
      teacher_workload: [],
      soft_score: 100,
    },
  };
}
