"""SQLAlchemy models for ChronosEdu.

Matches database/schema.sql and provides portable column types for both PostgreSQL and SQLite.
"""
from __future__ import annotations

import uuid
from datetime import date, datetime, timezone
from typing import Any

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    SmallInteger,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import ARRAY, UUID as PG_UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.types import TypeDecorator, JSON


class Base(DeclarativeBase):
    pass


class GUID(TypeDecorator):
    """Platform-independent GUID/UUID type.
    Uses PostgreSQL's native UUID, otherwise stores as a 36-char string.
    """
    impl = String(36)
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(PG_UUID(as_uuid=True))
        return dialect.type_descriptor(String(36))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        if dialect.name == "postgresql":
            return value if isinstance(value, uuid.UUID) else uuid.UUID(str(value))
        return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        if isinstance(value, uuid.UUID):
            return value
        return uuid.UUID(str(value))


class PortableStringList(TypeDecorator):
    """Stores list of strings as PostgreSQL ARRAY or JSON string elsewhere."""
    impl = JSON
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(ARRAY(String))
        return dialect.type_descriptor(JSON)

    def process_bind_param(self, value, dialect):
        if value is None:
            return []
        return list(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return []
        return list(value)


class PortableIntList(TypeDecorator):
    """Stores list of integers as PostgreSQL ARRAY or JSON string elsewhere."""
    impl = JSON
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(ARRAY(Integer))
        return dialect.type_descriptor(JSON)

    def process_bind_param(self, value, dialect):
        if value is None:
            return []
        return list(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return []
        return list(value)


class School(Base):
    __tablename__ = "school"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    subdomain: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    timezone: Mapped[str] = mapped_column(String(100), default="Asia/Kolkata", nullable=False)
    term: Mapped[str | None] = mapped_column(String(100), nullable=True)
    working_days: Mapped[list[str]] = mapped_column(
        PortableStringList,
        default=lambda: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        nullable=False,
    )
    published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    max_teacher_periods_per_day: Mapped[int] = mapped_column(SmallInteger, default=5, nullable=False)
    activity_day: Mapped[str] = mapped_column(String(50), default="Wednesday", nullable=False)
    activity_periods: Mapped[list[int]] = mapped_column(
        PortableIntList,
        default=lambda: [1, 2],
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    users: Mapped[list[AppUser]] = relationship("AppUser", back_populates="school", cascade="all, delete-orphan")
    grades: Mapped[list[GradeLevel]] = relationship("GradeLevel", back_populates="school", cascade="all, delete-orphan")
    rooms: Mapped[list[Room]] = relationship("Room", back_populates="school", cascade="all, delete-orphan")
    classes: Mapped[list[ClassSection]] = relationship("ClassSection", back_populates="school", cascade="all, delete-orphan")
    subjects: Mapped[list[Subject]] = relationship("Subject", back_populates="school", cascade="all, delete-orphan")
    teachers: Mapped[list[Teacher]] = relationship("Teacher", back_populates="school", cascade="all, delete-orphan")
    period_slots: Mapped[list[PeriodSlot]] = relationship("PeriodSlot", back_populates="school", cascade="all, delete-orphan")
    timetable_entries: Mapped[list[TimetableEntry]] = relationship("TimetableEntry", back_populates="school", cascade="all, delete-orphan")


class AppUser(Base):
    __tablename__ = "app_user"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), nullable=False)  # 'admin', 'teacher', 'student'
    teacher_id: Mapped[uuid.UUID | None] = mapped_column(GUID, nullable=True)
    class_id: Mapped[uuid.UUID | None] = mapped_column(GUID, nullable=True)

    __table_args__ = (UniqueConstraint("school_id", "email"),)
    school: Mapped[School] = relationship("School", back_populates="users")


class GradeLevel(Base):
    __tablename__ = "grade_level"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    tier: Mapped[str] = mapped_column(String(20), nullable=False)  # 'primary', 'senior'
    day_end_time: Mapped[str] = mapped_column(String(20), default="12:00", nullable=False)

    __table_args__ = (UniqueConstraint("school_id", "name"),)
    school: Mapped[School] = relationship("School", back_populates="grades")
    classes: Mapped[list[ClassSection]] = relationship("ClassSection", back_populates="grade", cascade="all, delete-orphan")
    requirements: Mapped[list[SubjectRequirement]] = relationship("SubjectRequirement", back_populates="grade", cascade="all, delete-orphan")


class Room(Base):
    __tablename__ = "room"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    type: Mapped[str] = mapped_column(String(50), default="classroom", nullable=False)

    __table_args__ = (UniqueConstraint("school_id", "name"),)
    school: Mapped[School] = relationship("School", back_populates="rooms")


class ClassSection(Base):
    __tablename__ = "class_section"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    grade_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("grade_level.id", ondelete="CASCADE"), nullable=False)
    section: Mapped[str] = mapped_column(String(50), nullable=False)
    home_room_id: Mapped[uuid.UUID | None] = mapped_column(GUID, ForeignKey("room.id"), nullable=True)

    __table_args__ = (UniqueConstraint("school_id", "grade_id", "section"),)
    school: Mapped[School] = relationship("School", back_populates="classes")
    grade: Mapped[GradeLevel] = relationship("GradeLevel", back_populates="classes")
    home_room: Mapped[Room | None] = relationship("Room")
    timetable_entries: Mapped[list[TimetableEntry]] = relationship("TimetableEntry", back_populates="class_section", cascade="all, delete-orphan")


class Subject(Base):
    __tablename__ = "subject"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    code: Mapped[str] = mapped_column(String(50), nullable=False)
    type: Mapped[str] = mapped_column(String(50), default="academic", nullable=False)  # 'academic', 'activity'
    room_id: Mapped[uuid.UUID | None] = mapped_column(GUID, ForeignKey("room.id"), nullable=True)
    requires_double_period: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    __table_args__ = (UniqueConstraint("school_id", "code"),)
    school: Mapped[School] = relationship("School", back_populates="subjects")
    room: Mapped[Room | None] = relationship("Room")
    requirements: Mapped[list[SubjectRequirement]] = relationship("SubjectRequirement", back_populates="subject", cascade="all, delete-orphan")


class SubjectRequirement(Base):
    __tablename__ = "subject_requirement"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    subject_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("subject.id", ondelete="CASCADE"), nullable=False)
    grade_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("grade_level.id", ondelete="CASCADE"), nullable=False)
    weekly_frequency: Mapped[int] = mapped_column(SmallInteger, nullable=False)

    __table_args__ = (
        UniqueConstraint("subject_id", "grade_id"),
        CheckConstraint("weekly_frequency >= 0"),
    )
    subject: Mapped[Subject] = relationship("Subject", back_populates="requirements")
    grade: Mapped[GradeLevel] = relationship("GradeLevel", back_populates="requirements")


class Teacher(Base):
    __tablename__ = "teacher"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    max_periods_per_day: Mapped[int] = mapped_column(SmallInteger, default=5, nullable=False)
    unavailable_days: Mapped[list[str]] = mapped_column(PortableStringList, default=list, nullable=False)

    school: Mapped[School] = relationship("School", back_populates="teachers")
    subjects: Mapped[list[TeacherSubject]] = relationship("TeacherSubject", back_populates="teacher", cascade="all, delete-orphan")
    absences: Mapped[list[TeacherAbsence]] = relationship("TeacherAbsence", back_populates="teacher", cascade="all, delete-orphan")
    timetable_entries: Mapped[list[TimetableEntry]] = relationship("TimetableEntry", back_populates="teacher", cascade="all, delete-orphan")


class TeacherSubject(Base):
    __tablename__ = "teacher_subject"

    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    teacher_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("teacher.id", ondelete="CASCADE"), primary_key=True)
    subject_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("subject.id", ondelete="CASCADE"), primary_key=True)

    teacher: Mapped[Teacher] = relationship("Teacher", back_populates="subjects")
    subject: Mapped[Subject] = relationship("Subject")


class TeacherAbsence(Base):
    __tablename__ = "teacher_absence"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    teacher_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("teacher.id", ondelete="CASCADE"), nullable=False)
    day: Mapped[str] = mapped_column(String(50), nullable=False)
    on_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    reason: Mapped[str | None] = mapped_column(Text, nullable=True)

    __table_args__ = (UniqueConstraint("teacher_id", "day", "on_date"),)
    teacher: Mapped[Teacher] = relationship("Teacher", back_populates="absences")


class PeriodSlot(Base):
    __tablename__ = "period_slot"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    tier: Mapped[str] = mapped_column(String(20), nullable=False)  # 'primary', 'senior'
    kind: Mapped[str] = mapped_column(String(20), default="period", nullable=False)  # 'period', 'zero', 'break', 'lunch'
    period_number: Mapped[int | None] = mapped_column(SmallInteger, nullable=True)
    start_time: Mapped[str] = mapped_column(String(20), nullable=False)
    end_time: Mapped[str] = mapped_column(String(20), nullable=False)
    is_break: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    school: Mapped[School] = relationship("School", back_populates="period_slots")


class TimetableEntry(Base):
    __tablename__ = "timetable_entry"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    class_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("class_section.id", ondelete="CASCADE"), nullable=False)
    day: Mapped[str] = mapped_column(String(50), nullable=False)
    period: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    subject_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("subject.id"), nullable=False)
    teacher_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("teacher.id"), nullable=False)
    room_id: Mapped[uuid.UUID | None] = mapped_column(GUID, ForeignKey("room.id"), nullable=True)
    is_manual_override: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    __table_args__ = (
        UniqueConstraint("school_id", "class_id", "day", "period"),
        UniqueConstraint("school_id", "teacher_id", "day", "period"),
        Index("ix_timetable_entry_class", "school_id", "class_id"),
        Index("ix_timetable_entry_teacher_day", "school_id", "teacher_id", "day"),
    )

    school: Mapped[School] = relationship("School", back_populates="timetable_entries")
    class_section: Mapped[ClassSection] = relationship("ClassSection", back_populates="timetable_entries")
    subject: Mapped[Subject] = relationship("Subject")
    teacher: Mapped[Teacher] = relationship("Teacher", back_populates="timetable_entries")
    room: Mapped[Room | None] = relationship("Room")
    substitutions: Mapped[list[Substitution]] = relationship("Substitution", back_populates="entry", cascade="all, delete-orphan")


class Substitution(Base):
    __tablename__ = "substitution"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("school.id", ondelete="CASCADE"), nullable=False)
    entry_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("timetable_entry.id", ondelete="CASCADE"), nullable=False)
    substitute_teacher_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("teacher.id"), nullable=False)
    on_date: Mapped[date | None] = mapped_column(Date, nullable=True)

    __table_args__ = (UniqueConstraint("entry_id", "on_date"),)
    entry: Mapped[TimetableEntry] = relationship("TimetableEntry", back_populates="substitutions")
    substitute_teacher: Mapped[Teacher] = relationship("Teacher")
