export interface Show {
  id: string;
  user_id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  fee: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ShowFormData {
  title: string;
  venue: string;
  date: string;
  time: string;
  fee: number;
  notes?: string;
}
