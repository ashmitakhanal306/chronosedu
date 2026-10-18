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

export interface ApiGenerateResponse {
  feasible: boolean;
  entries: ApiEntryOut[];
  diagnostics: ApiDiagnosticOut[];
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
};
