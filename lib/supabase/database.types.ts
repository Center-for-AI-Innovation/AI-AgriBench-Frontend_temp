export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      agribench_review_form_admin: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      agribench_review_form_assignment: {
        Row: {
          assigned_at: string | null
          id: number
          qna_id: number
          reviewer_id: number
        }
        Insert: {
          assigned_at?: string | null
          id?: number
          qna_id: number
          reviewer_id: number
        }
        Update: {
          assigned_at?: string | null
          id?: number
          qna_id?: number
          reviewer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "agribench_review_form_assignment_qna_id_fkey"
            columns: ["qna_id"]
            isOneToOne: false
            referencedRelation: "agribench_review_form_qna"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agribench_review_form_assignment_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "agribench_review_form_reviewer"
            referencedColumns: ["id"]
          },
        ]
      }
      agribench_review_form_qna: {
        Row: {
          answer: string
          categories: Json
          document_id: string | null
          id: number
          qna_id: string
          question: string
          reason: string | null
        }
        Insert: {
          answer: string
          categories: Json
          document_id?: string | null
          id?: number
          qna_id: string
          question: string
          reason?: string | null
        }
        Update: {
          answer?: string
          categories?: Json
          document_id?: string | null
          id?: number
          qna_id?: string
          question?: string
          reason?: string | null
        }
        Relationships: []
      }
      agribench_review_form_qna_edit_history: {
        Row: {
          changes: Json
          edited_at: string
          edited_by: string | null
          fields_changed: Json
          id: number
          qna_id: string
        }
        Insert: {
          changes: Json
          edited_at: string
          edited_by?: string | null
          fields_changed: Json
          id?: number
          qna_id: string
        }
        Update: {
          changes?: Json
          edited_at?: string
          edited_by?: string | null
          fields_changed?: Json
          id?: number
          qna_id?: string
        }
        Relationships: []
      }
      agribench_review_form_review: {
        Row: {
          answer_issues: Json | null
          answer_rating: string | null
          assignment_id: number
          created_at: string | null
          has_expertise: boolean
          id: number
          other_weakness_explanation: string | null
          question_properly_phrased: boolean | null
          question_reasonable: boolean | null
          updated_at: string | null
        }
        Insert: {
          answer_issues?: Json | null
          answer_rating?: string | null
          assignment_id: number
          created_at?: string | null
          has_expertise: boolean
          id?: number
          other_weakness_explanation?: string | null
          question_properly_phrased?: boolean | null
          question_reasonable?: boolean | null
          updated_at?: string | null
        }
        Update: {
          answer_issues?: Json | null
          answer_rating?: string | null
          assignment_id?: number
          created_at?: string | null
          has_expertise?: boolean
          id?: number
          other_weakness_explanation?: string | null
          question_properly_phrased?: boolean | null
          question_reasonable?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agribench_review_form_review_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "agribench_review_form_assignment"
            referencedColumns: ["id"]
          },
        ]
      }
      agribench_review_form_reviewer: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      evaluations: {
        Row: {
          created_at: string
          id: number
          judge_model: string
          judge_temperature: number
          subject_model: string
        }
        Insert: {
          created_at?: string
          id?: number
          judge_model: string
          judge_temperature: number
          subject_model: string
        }
        Update: {
          created_at?: string
          id?: number
          judge_model?: string
          judge_temperature?: number
          subject_model?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          accuracy: number
          categories: string[]
          completeness: number
          conciseness: number
          created_at: string
          evaluation_id: number
          id: number
          question_id: string
          relevance: number
        }
        Insert: {
          accuracy: number
          categories: string[]
          completeness: number
          conciseness: number
          created_at?: string
          evaluation_id: number
          id?: number
          question_id: string
          relevance: number
        }
        Update: {
          accuracy?: number
          categories?: string[]
          completeness?: number
          conciseness?: number
          created_at?: string
          evaluation_id?: number
          id?: number
          question_id?: string
          relevance?: number
        }
        Relationships: [
          {
            foreignKeyName: "scores_evaluation_id_fkey"
            columns: ["evaluation_id"]
            isOneToOne: false
            referencedRelation: "evaluations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
