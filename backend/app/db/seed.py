"""Database seed script for ChronosEdu.

Populates initial multi-tenant demo data (Greenwood High) if the database is empty,
including curriculum requirements, rooms, teachers, subjects, admin user, and solves
the initial schedule using Google OR-Tools CP-SAT.
"""
from __future__ import annotations

import logging
import uuid
from sqlalchemy import select

from app.core.security import hash_password
from app.db import models
from app.db.session import tenant_session
from app.services import timetable_service

logger = logging.getLogger(__name__)

# Fixed UUIDs for predictable demo tenant referencing
DEMO_SCHOOL_ID = uuid.UUID("a0000000-0000-0000-0000-000000000001")


def seed_demo_school_if_empty() -> str:
    """Seeds Greenwood High School if no schools exist in the database.
    
    Returns the school ID (string).
    """
    with tenant_session(str(DEMO_SCHOOL_ID)) as session:
        existing = session.scalar(select(models.School).where(models.School.id == DEMO_SCHOOL_ID))
        if existing:
            return str(existing.id)

        logger.info("Database is empty or missing demo tenant. Seeding Greenwood High School...")

        # 1. School Tenant
        school = models.School(
            id=DEMO_SCHOOL_ID,
            name="Greenwood High School",
            subdomain="greenwood",
            timezone="Asia/Kolkata",
            term="Academic Year 2026-27 (Term 1)",
            working_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            published=True,
            max_teacher_periods_per_day=5,
            activity_day="Wednesday",
            activity_periods=[1, 2],
        )
        session.add(school)

        # 2. Rooms
        room_101 = models.Room(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Room 101", type="classroom")
        room_102 = models.Room(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Room 102", type="classroom")
        room_201 = models.Room(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Room 201", type="classroom")
        room_202 = models.Room(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Room 202", type="classroom")
        room_mus = models.Room(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Music Studio", type="activity", capacity=2)
        room_art = models.Room(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Art Atelier", type="activity", capacity=2)
        room_game = models.Room(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Sports Arena", type="activity", capacity=4)

        session.add_all([room_101, room_102, room_201, room_202, room_mus, room_art, room_game])

        # 3. Grade Levels
        g4 = models.GradeLevel(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Grade 4", tier="primary", day_end_time="12:00")
        g5 = models.GradeLevel(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Grade 5", tier="primary", day_end_time="12:00")
        g9 = models.GradeLevel(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Grade 9", tier="senior", day_end_time="14:00")
        g10 = models.GradeLevel(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Grade 10", tier="senior", day_end_time="14:00")

        session.add_all([g4, g5, g9, g10])

        # 4. Class Sections
        c_4a = models.ClassSection(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g4.id, section="4A", home_room_id=room_101.id)
        c_5b = models.ClassSection(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g5.id, section="5B", home_room_id=room_102.id)
        c_9a = models.ClassSection(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g9.id, section="9A", home_room_id=room_201.id)
        c_10a = models.ClassSection(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g10.id, section="10A", home_room_id=room_202.id)

        session.add_all([c_4a, c_5b, c_9a, c_10a])

        # 5. Subjects
        sub_math = models.Subject(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Mathematics", code="MATH", type="academic")
        sub_eng = models.Subject(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="English Lit", code="ENG", type="academic")
        sub_sci = models.Subject(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="General Science", code="SCI", type="academic", requires_double_period=True)
        sub_sst = models.Subject(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Social Studies", code="SST", type="academic")
        sub_cs = models.Subject(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Computer Sci", code="CS", type="academic")
        sub_lang = models.Subject(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Second Language", code="LANG", type="academic")

        sub_mus = models.Subject(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Dance & Music", code="MUS", type="activity", room_id=room_mus.id)
        sub_art = models.Subject(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Art & Craft", code="ART", type="activity", room_id=room_art.id)
        sub_game = models.Subject(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Sports & Games", code="GAME", type="activity", room_id=room_game.id)

        session.add_all([sub_math, sub_eng, sub_sci, sub_sst, sub_cs, sub_lang, sub_mus, sub_art, sub_game])

        # 6. Subject Requirements
        # Primary Grades (4 & 5): 20 periods/week
        requirements = [
            # Grade 4
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g4.id, subject_id=sub_math.id, weekly_frequency=5),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g4.id, subject_id=sub_eng.id, weekly_frequency=5),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g4.id, subject_id=sub_sci.id, weekly_frequency=4),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g4.id, subject_id=sub_sst.id, weekly_frequency=4),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g4.id, subject_id=sub_mus.id, weekly_frequency=1),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g4.id, subject_id=sub_art.id, weekly_frequency=1),

            # Grade 5
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g5.id, subject_id=sub_math.id, weekly_frequency=5),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g5.id, subject_id=sub_eng.id, weekly_frequency=5),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g5.id, subject_id=sub_sci.id, weekly_frequency=4),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g5.id, subject_id=sub_sst.id, weekly_frequency=4),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g5.id, subject_id=sub_mus.id, weekly_frequency=1),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g5.id, subject_id=sub_art.id, weekly_frequency=1),

            # Grade 9 (Senior): 30 periods/week
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g9.id, subject_id=sub_math.id, weekly_frequency=6),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g9.id, subject_id=sub_eng.id, weekly_frequency=5),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g9.id, subject_id=sub_sci.id, weekly_frequency=6),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g9.id, subject_id=sub_sst.id, weekly_frequency=5),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g9.id, subject_id=sub_cs.id, weekly_frequency=3),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g9.id, subject_id=sub_lang.id, weekly_frequency=3),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g9.id, subject_id=sub_mus.id, weekly_frequency=1),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g9.id, subject_id=sub_game.id, weekly_frequency=1),

            # Grade 10 (Senior): 30 periods/week
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g10.id, subject_id=sub_math.id, weekly_frequency=6),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g10.id, subject_id=sub_eng.id, weekly_frequency=5),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g10.id, subject_id=sub_sci.id, weekly_frequency=6),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g10.id, subject_id=sub_sst.id, weekly_frequency=5),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g10.id, subject_id=sub_cs.id, weekly_frequency=3),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g10.id, subject_id=sub_lang.id, weekly_frequency=3),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g10.id, subject_id=sub_mus.id, weekly_frequency=1),
            models.SubjectRequirement(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, grade_id=g10.id, subject_id=sub_game.id, weekly_frequency=1),
        ]
        session.add_all(requirements)

        # 7. Teachers & Qualifications
        t1 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Dr. Aris Thorne", email="aris.thorne@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t2 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Ms. Priya Nair", email="priya.nair@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t3 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Mr. David Miller", email="david.miller@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t4 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Mrs. Kavita Rao", email="kavita.rao@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t5 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Dr. Neha Verma", email="neha.verma@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t6 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Mr. Rohan Joshi", email="rohan.joshi@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t7 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Ms. Sarah Jenkins", email="sarah.jenkins@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t8 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Mr. Vikram Singh", email="vikram.singh@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t9 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Maestro Carlos (Music)", email="carlos.music@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t10 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Ms. Elena Rostova (Art)", email="elena.art@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t11 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Coach Marcus Vance (Sports)", email="marcus.sports@greenwood.edu", max_periods_per_day=5, unavailable_days=[])
        t12 = models.Teacher(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, name="Ms. Tara Sharma (Activity)", email="tara.activity@greenwood.edu", max_periods_per_day=5, unavailable_days=[])

        session.add_all([t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12])

        # Teacher Subject Mappings
        teacher_subjects = [
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t1.id, subject_id=sub_math.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t2.id, subject_id=sub_math.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t2.id, subject_id=sub_cs.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t3.id, subject_id=sub_eng.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t4.id, subject_id=sub_eng.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t4.id, subject_id=sub_lang.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t5.id, subject_id=sub_sci.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t6.id, subject_id=sub_sci.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t6.id, subject_id=sub_cs.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t7.id, subject_id=sub_sst.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t8.id, subject_id=sub_sst.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t8.id, subject_id=sub_lang.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t9.id, subject_id=sub_mus.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t10.id, subject_id=sub_art.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t10.id, subject_id=sub_mus.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t11.id, subject_id=sub_game.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t11.id, subject_id=sub_art.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t12.id, subject_id=sub_game.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t12.id, subject_id=sub_art.id),
            models.TeacherSubject(school_id=DEMO_SCHOOL_ID, teacher_id=t12.id, subject_id=sub_mus.id),
        ]
        session.add_all(teacher_subjects)

        # 7b. Teaching Assignments (ONE dedicated teacher per class-subject pair)
        teaching_assignments = [
            # Grade 4A
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_4a.id, subject_id=sub_math.id, teacher_id=t1.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_4a.id, subject_id=sub_eng.id, teacher_id=t3.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_4a.id, subject_id=sub_sci.id, teacher_id=t5.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_4a.id, subject_id=sub_sst.id, teacher_id=t7.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_4a.id, subject_id=sub_mus.id, teacher_id=t9.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_4a.id, subject_id=sub_art.id, teacher_id=t10.id),

            # Grade 5B
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_5b.id, subject_id=sub_math.id, teacher_id=t2.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_5b.id, subject_id=sub_eng.id, teacher_id=t4.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_5b.id, subject_id=sub_sci.id, teacher_id=t6.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_5b.id, subject_id=sub_sst.id, teacher_id=t8.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_5b.id, subject_id=sub_mus.id, teacher_id=t9.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_5b.id, subject_id=sub_art.id, teacher_id=t10.id),

            # Grade 9A
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_9a.id, subject_id=sub_math.id, teacher_id=t1.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_9a.id, subject_id=sub_eng.id, teacher_id=t3.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_9a.id, subject_id=sub_sci.id, teacher_id=t5.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_9a.id, subject_id=sub_sst.id, teacher_id=t7.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_9a.id, subject_id=sub_cs.id, teacher_id=t2.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_9a.id, subject_id=sub_lang.id, teacher_id=t4.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_9a.id, subject_id=sub_mus.id, teacher_id=t12.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_9a.id, subject_id=sub_game.id, teacher_id=t11.id),

            # Grade 10A
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_10a.id, subject_id=sub_math.id, teacher_id=t2.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_10a.id, subject_id=sub_eng.id, teacher_id=t4.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_10a.id, subject_id=sub_sci.id, teacher_id=t6.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_10a.id, subject_id=sub_sst.id, teacher_id=t8.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_10a.id, subject_id=sub_cs.id, teacher_id=t6.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_10a.id, subject_id=sub_lang.id, teacher_id=t8.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_10a.id, subject_id=sub_mus.id, teacher_id=t12.id),
            models.TeachingAssignment(id=uuid.uuid4(), school_id=DEMO_SCHOOL_ID, class_id=c_10a.id, subject_id=sub_game.id, teacher_id=t11.id),
        ]
        session.add_all(teaching_assignments)

        # 8. Demo User Accounts (Admin, all Teachers, all Class Sections)
        admin_user = models.AppUser(
            id=uuid.uuid4(),
            school_id=DEMO_SCHOOL_ID,
            email="admin@greenwood.edu",
            password_hash=hash_password("AdminPass123!"),
            role="admin",
        )
        users = [admin_user]

        # Seed all 12 teacher accounts with TeacherPass123!
        all_teachers = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12]
        for t in all_teachers:
            if t.email:
                users.append(
                    models.AppUser(
                        id=uuid.uuid4(),
                        school_id=DEMO_SCHOOL_ID,
                        email=t.email.lower(),
                        password_hash=hash_password("TeacherPass123!"),
                        role="teacher",
                        teacher_id=t.id,
                    )
                )

        # Seed student accounts for each class with StudentPass123!
        all_classes = [c_4a, c_5b, c_9a, c_10a]
        for c in all_classes:
            sec_clean = c.section.lower()
            users.append(
                models.AppUser(
                    id=uuid.uuid4(),
                    school_id=DEMO_SCHOOL_ID,
                    email=f"student.{sec_clean}@greenwood.edu",
                    password_hash=hash_password("StudentPass123!"),
                    role="student",
                    class_id=c.id,
                )
            )

        session.add_all(users)

        # 9. Example Teacher Absence
        absence = models.TeacherAbsence(
            id=uuid.uuid4(),
            school_id=DEMO_SCHOOL_ID,
            teacher_id=t1.id,
            day="Tuesday",
            reason="Medical Leave",
        )
        session.add(absence)

        session.flush()
        logger.info("Database entities seeded successfully.")

    # 10. Run OR-Tools CP-SAT solver to pre-generate initial timetable
    try:
        logger.info("Running Google OR-Tools CP-SAT engine to pre-solve initial timetable...")
        solve_res = timetable_service.generate(str(DEMO_SCHOOL_ID))
        logger.info("Timetable generated: feasible=%s, %d entries created.", solve_res.feasible, len(solve_res.entries))
    except Exception as e:
        logger.warning("Auto-generate during seeding failed (non-fatal): %s", e)

    return str(DEMO_SCHOOL_ID)
