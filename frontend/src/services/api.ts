/**
 * API client wrapper for ChronosEdu FastAPI backend.
 * Base path '/api' is proxied to http://localhost:8000 via vite.config.ts.
 */

export interface ApiEntryOut {
  id?: string;
  class_id: string;
  class_name?: string | null;
  day: string;
  period: number;
  subject_id: string;
  subject_name?: string | null;
  teacher_id: string;
  teacher_name?: string | null;
  room?: string | null;
  is_manual_override: boolean;
  substitute_teacher_id?: string | null;
  substitute_teacher_name?: string | null;
}

export interface ApiDiagnosticOut {
  severity: 'error' | 'warning';
  title: string;
  detail: string;
}

export interface ApiTeacherWorkloadStat {
  teacher_id: string;
  name: string;
  assigned: number;
  max: number;
  pct: number;
}

export interface ApiQualityReportOut {
  total_entries: number;
  empty_period_count: number;
  unplaced_lessons: string[];
  teacher_workload: ApiTeacherWorkloadStat[];
  soft_score: number;
}

export interface ApiGenerateResponse {
  feasible: boolean;
  entries: ApiEntryOut[];
  diagnostics: ApiDiagnosticOut[];
  quality_report?: ApiQualityReportOut | null;
}

export interface ApiOverrideRequest {
  day: string;
  period: number;
  subject_id: string;
  teacher_id: string;
  room?: string | null;
}

export interface ApiAbsenceOut {
  id: string;
  school_id: string;
  teacher_id: string;
  teacher_name?: string | null;
  day: string;
  reason?: string | null;
}

export interface ApiCandidateOut {
  teacher_id: string;
  name: string;
  free_periods_today: number;
  assigned_today: number;
  is_qualified: boolean;
}

export interface ApiSubstitutionOut {
  id: string;
  entry_id: string;
  substitute_teacher_id: string;
  substitute_name?: string | null;
}

export interface ApiPublishResponse {
  published: boolean;
  message: string;
}

export interface ApiHoliday {
  id: string;
  school_id: string;
  name: string;
  start_date: string;
  end_date: string;
  holiday_type: string;
}

export interface ApiPinnedLesson {
  id: string;
  school_id: string;
  class_id: string;
  class_name?: string | null;
  subject_id: string;
  subject_name?: string | null;
  teacher_id: string;
  teacher_name?: string | null;
  day: string;
  period: number;
}

export interface ApiBlockedSlot {
  id: string;
  school_id: string;
  scope: string;
  scope_id?: string | null;
  scope_name?: string | null;
  day: string;
  period: number;
  label: string;
  on_date?: string | null;
}

export interface ApiVersionOut {
  id: string;
  school_id: string;
  version_number: number;
  state: 'draft' | 'approved' | 'published';
  effective_from?: string | null;
  published_by?: string | null;
  published_at?: string | null;
  notes?: string | null;
  entry_count: number;
  created_at: string;
}

export interface ApiAuditLog {
  id: string;
  school_id: string;
  actor_id?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  detail?: string | null;
  created_at: string;
}

export interface ApiAssignmentOut {
  id: string;
  school_id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  class_name?: string | null;
  subject_name?: string | null;
  teacher_name?: string | null;
  teacher_weekly_load: number;
}

export interface ApiAssignmentCreate {
  class_id: string;
  subject_id: string;
  teacher_id: string;
}

export interface ApiWorkloadItem {
  teacher_id: string;
  teacher_name: string;
  assigned_periods: number;
  max_periods_per_week: number;
  overloaded: boolean;
}

export interface ApiSuggestAssignmentsOut {
  suggestions: ApiAssignmentOut[];
  warnings: string[];
  workload_summary: ApiWorkloadItem[];
}

let currentToken: string | null = typeof window !== 'undefined' ? localStorage.getItem('chronos_token') : null;

export interface ApiAuthUser {
  user_id: string;
  school_id: string;
  role: 'admin' | 'teacher' | 'student';
  email?: string | null;
  teacher_id?: string | null;
  class_id?: string | null;
}

export interface ApiTokenResponse {
  access_token: string;
  token_type: string;
  user: ApiAuthUser;
}

export class ApiError extends Error {
  status: number;
  detail?: string;

  constructor(status: number, message: string, detail?: string) {
    super(detail || message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = path.startsWith('/api') ? path : `/api${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (currentToken) {
    headers['Authorization'] = `Bearer ${currentToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorDetail = response.statusText;
    try {
      const errorJson = await response.json();
      if (errorJson && errorJson.detail) {
        errorDetail = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
      }
    } catch {
      // ignore json parse error on error response
    }
    throw new ApiError(response.status, `HTTP ${response.status}`, errorDetail);
  }

  return response.json() as Promise<T>;
}

export interface ApiGeneratePreferences {
  spread_subjects?: boolean;
  smooth_teacher_workload?: boolean;
  minimize_teacher_gaps?: boolean;
  morning_core_priority?: boolean;
  consecutive_double_periods?: boolean;
}

export const api = {
  /** Set or clear the JWT authentication token */
  setAuthToken(token: string | null) {
    currentToken = token;
    if (token) {
      localStorage.setItem('chronos_token', token);
    } else {
      localStorage.removeItem('chronos_token');
    }
  },

  getAuthToken(): string | null {
    return currentToken;
  },

  /** Request JWT access token from backend using real credentials */
  async login(payload: {
    school_id: string;
    email: string;
    password: string;
  }): Promise<ApiTokenResponse> {
    const res = await request<ApiTokenResponse>('/auth/token', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    this.setAuthToken(res.access_token);
    return res;
  },

  /** Retrieve currently authenticated user profile */
  async getMe(): Promise<ApiAuthUser> {
    return request<ApiAuthUser>('/auth/me');
  },

  /** Retrieve all registered school tenants */
  async listSchools(): Promise<{ id: string; name: string; subdomain: string; published: boolean }[]> {
    return request('/schools');
  },

  /** Retrieve fully hydrated school structure */
  async getFullSchool(schoolId: string): Promise<any> {
    return request<any>(`/schools/${schoolId}/full`);
  },

  /** Resolve school by subdomain */
  async resolveSchool(subdomain?: string): Promise<{ id: string; name: string; subdomain: string; published: boolean }> {
    const query = subdomain ? `?subdomain=${encodeURIComponent(subdomain)}` : '';
    return request(`/auth/resolve-school${query}`);
  },

  /** Fetch timetable entries from backend */
  async getTimetable(schoolId: string, classId?: string, teacherId?: string): Promise<ApiEntryOut[]> {
    const params = new URLSearchParams();
    if (classId) params.set('class_id', classId);
    if (teacherId) params.set('teacher_id', teacherId);
    const query = params.toString() ? `?${params.toString()}` : '';
    return request<ApiEntryOut[]>(`/schools/${schoolId}/timetable${query}`);
  },

  /** Run constraint solver on the backend and persist generated draft */
  async generateTimetable(schoolId: string, preferences?: ApiGeneratePreferences): Promise<ApiGenerateResponse> {
    return request<ApiGenerateResponse>(`/schools/${schoolId}/generate`, {
      method: 'POST',
      body: preferences ? JSON.stringify(preferences) : undefined,
    });
  },

  /** Manual override for a timetable slot (re-validates H1/H2/H7; returns 409 on clash) */
  async updateEntry(schoolId: string, entryId: string, override: ApiOverrideRequest): Promise<ApiEntryOut> {
    return request<ApiEntryOut>(`/schools/${schoolId}/entries/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify(override),
    });
  },

  /** Lock a timetable entry */
  async lockEntry(schoolId: string, entryId: string): Promise<{ id: string; is_locked: boolean }> {
    return request<{ id: string; is_locked: boolean }>(`/schools/${schoolId}/entries/${entryId}/lock`, {
      method: 'PATCH',
    });
  },

  /** Unlock a timetable entry */
  async unlockEntry(schoolId: string, entryId: string): Promise<{ id: string; is_locked: boolean }> {
    return request<{ id: string; is_locked: boolean }>(`/schools/${schoolId}/entries/${entryId}/unlock`, {
      method: 'PATCH',
    });
  },

  /** Delete a timetable entry slot */
  async deleteEntry(schoolId: string, entryId: string): Promise<void> {
    return request<void>(`/schools/${schoolId}/entries/${entryId}`, {
      method: 'DELETE',
    });
  },

  /** Move a timetable entry to new day and period */
  async moveEntry(schoolId: string, entryId: string, newDay: string, newPeriod: number): Promise<ApiEntryOut> {
    return request<ApiEntryOut>(`/schools/${schoolId}/entries/${entryId}/move`, {
      method: 'PATCH',
      body: JSON.stringify({ new_day: newDay, new_period: newPeriod }),
    });
  },

  /** Swap two timetable entries */
  async swapEntries(schoolId: string, entryAId: string, entryBId: string): Promise<ApiEntryOut[]> {
    return request<ApiEntryOut[]>(`/schools/${schoolId}/entries/${entryAId}/swap/${entryBId}`, {
      method: 'POST',
    });
  },

  /** Publish timetable */
  async publish(schoolId: string): Promise<ApiPublishResponse> {
    return request<ApiPublishResponse>(`/schools/${schoolId}/publish`, {
      method: 'POST',
    });
  },

  /** Log teacher absence */
  async logAbsence(schoolId: string, teacherId: string, day: string, reason: string = ''): Promise<ApiAbsenceOut> {
    return request<ApiAbsenceOut>(`/schools/${schoolId}/absences`, {
      method: 'POST',
      body: JSON.stringify({ teacher_id: teacherId, day, reason }),
    });
  },

  /** Get ranked substitute candidates for an absence */
  async getSubstitutes(schoolId: string, absenceId: string): Promise<ApiCandidateOut[]> {
    return request<ApiCandidateOut[]>(`/schools/${schoolId}/absences/${absenceId}/substitutes`);
  },

  /** Assign a substitute teacher to a slot */
  async assignSubstitution(schoolId: string, entryId: string, substituteTeacherId: string): Promise<ApiSubstitutionOut> {
    return request<ApiSubstitutionOut>(`/schools/${schoolId}/substitutions`, {
      method: 'POST',
      body: JSON.stringify({ entry_id: entryId, substitute_teacher_id: substituteTeacherId }),
    });
  },

  /** List all teaching assignments */
  async listAssignments(schoolId: string): Promise<ApiAssignmentOut[]> {
    return request<ApiAssignmentOut[]>(`/schools/${schoolId}/assignments`);
  },

  /** Upsert teaching assignment for a class + subject */
  async upsertAssignment(schoolId: string, data: ApiAssignmentCreate): Promise<ApiAssignmentOut> {
    return request<ApiAssignmentOut>(`/schools/${schoolId}/assignments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /** Delete a teaching assignment */
  async deleteAssignment(schoolId: string, assignmentId: string): Promise<void> {
    return request<void>(`/schools/${schoolId}/assignments/${assignmentId}`, {
      method: 'DELETE',
    });
  },

  /** Auto-suggest teacher assignments based on subject qualification and lowest current load */
  async suggestAssignments(schoolId: string): Promise<ApiSuggestAssignmentsOut> {
    return request<ApiSuggestAssignmentsOut>(`/schools/${schoolId}/assignments/suggest`, {
      method: 'POST',
    });
  },

  // ── Holiday methods (Phase 2-A) ───────────────────────────────────────────
  async listHolidays(schoolId: string): Promise<ApiHoliday[]> {
    return request<ApiHoliday[]>(`/schools/${schoolId}/holidays`);
  },

  async createHoliday(schoolId: string, data: { name: string; start_date: string; end_date: string; holiday_type?: string }): Promise<ApiHoliday> {
    return request<ApiHoliday>(`/schools/${schoolId}/holidays`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async deleteHoliday(schoolId: string, holidayId: string): Promise<void> {
    return request<void>(`/schools/${schoolId}/holidays/${holidayId}`, {
      method: 'DELETE',
    });
  },

  // ── Pinned Lesson methods (Phase 2-C) ─────────────────────────────────────
  async listPinnedLessons(schoolId: string): Promise<ApiPinnedLesson[]> {
    return request<ApiPinnedLesson[]>(`/schools/${schoolId}/pinned-lessons`);
  },

  async createPinnedLesson(schoolId: string, data: { class_id: string; subject_id: string; teacher_id: string; day: string; period: number }): Promise<ApiPinnedLesson> {
    return request<ApiPinnedLesson>(`/schools/${schoolId}/pinned-lessons`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async deletePinnedLesson(schoolId: string, pinId: string): Promise<void> {
    return request<void>(`/schools/${schoolId}/pinned-lessons/${pinId}`, {
      method: 'DELETE',
    });
  },

  // ── Blocked Slot methods (Phase 2-C) ───────────────────────────────────────
  async listBlockedSlots(schoolId: string): Promise<ApiBlockedSlot[]> {
    return request<ApiBlockedSlot[]>(`/schools/${schoolId}/blocked-slots`);
  },

  async createBlockedSlot(schoolId: string, data: { scope?: string; scope_id?: string | null; day: string; period: number; label: string; on_date?: string | null }): Promise<ApiBlockedSlot> {
    return request<ApiBlockedSlot>(`/schools/${schoolId}/blocked-slots`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async deleteBlockedSlot(schoolId: string, slotId: string): Promise<void> {
    return request<void>(`/schools/${schoolId}/blocked-slots/${slotId}`, {
      method: 'DELETE',
    });
  },

  // ── Timetable Version methods (Phase 2-D) ──────────────────────────────────
  async listVersions(schoolId: string): Promise<ApiVersionOut[]> {
    return request<ApiVersionOut[]>(`/schools/${schoolId}/versions`);
  },

  async approveVersion(schoolId: string, versionId: string): Promise<ApiVersionOut> {
    return request<ApiVersionOut>(`/schools/${schoolId}/versions/${versionId}/approve`, {
      method: 'POST',
    });
  },

  async publishVersion(schoolId: string, versionId: string, effectiveFrom?: string): Promise<ApiVersionOut> {
    return request<ApiVersionOut>(`/schools/${schoolId}/versions/${versionId}/publish`, {
      method: 'POST',
      body: JSON.stringify(effectiveFrom ? { effective_from: effectiveFrom } : {}),
    });
  },

  async rollbackVersion(schoolId: string, versionId: string): Promise<ApiVersionOut> {
    return request<ApiVersionOut>(`/schools/${schoolId}/versions/${versionId}/rollback`, {
      method: 'POST',
    });
  },

  // ── Audit Log methods (Phase 2-E) ──────────────────────────────────────────
  async listAuditLogs(schoolId: string): Promise<ApiAuditLog[]> {
    return request<ApiAuditLog[]>(`/schools/${schoolId}/audit-logs`);
  },
};
