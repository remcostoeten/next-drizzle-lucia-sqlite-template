import { FileText, HelpCircle, LayoutDashboard, MessageSquare, Table } from "lucide-react";

export const searchOptions = [
  { icon: MessageSquare, label: 'Start a conversation', shortcut: 'C' },
  { icon: FileText, label: 'Write a query', shortcut: 'Q' },
  { icon: LayoutDashboard, label: 'Create a dashboard', shortcut: 'D' },
  { icon: Table, label: 'Create a table', shortcut: 'T' },
  { icon: HelpCircle, label: 'Contact support', shortcut: 'S' },
];
