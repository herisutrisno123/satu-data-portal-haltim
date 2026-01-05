
export enum Topic {
  ECONOMY = 'Ekonomi & Keuangan',
  HEALTH = 'Kesehatan',
  EDUCATION = 'Pendidikan',
  AGRICULTURE = 'Pertanian & Perikanan',
  INFRASTRUCTURE = 'Infrastruktur',
  DEMOGRAPHICS = 'Kependudukan',
  TOURISM = 'Pariwisata',
  MINING = 'Energi & Pertambangan'
}

export interface Dataset {
  id: string;
  title: string;
  topic: Topic;
  description: string;
  publisher: string;
  updatedAt: string;
  format: ('CSV' | 'XLSX' | 'PDF' | 'JSON')[];
  downloads: number;
  variables?: { name: string; value: string }[]; // Properti baru untuk menyimpan data isian
}

export interface PriorityIndicator {
  label: string;
  value: string;
  change: number;
  unit: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
