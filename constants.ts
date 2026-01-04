import { ThemeColor } from './types';

export const PRE_CURATED_COLORS: ThemeColor[] = [
  { name: 'Amethyst', hex: '#8A4FFF' },
  { name: 'Sage', hex: '#4A7C59' },
  { name: 'Denim', hex: '#3A5BA0' },
  { name: 'Terracotta', hex: '#CC7357' },
  { name: 'Slate', hex: '#5D6B7E' },
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

export const MOCK_TABLE_DATA = [
  { id: 'ORD-001', product: 'Craft Gin', date: '2024-07-21', total: '$45.00', status: 'Delivered' },
  { id: 'ORD-002', product: 'Single Malt Whiskey', date: '2024-07-21', total: '$89.50', status: 'Processing' },
  { id: 'ORD-003', product: 'Organic Vodka', date: '2024-07-20', total: '$32.00', status: 'Delivered' },
  { id: 'ORD-004', product: 'Red Wine Trio', date: '2024-07-19', total: '$120.00', status: 'Cancelled' },
  { id: 'ORD-005', product: 'Local IPA Pack', date: '2024-07-18', total: '$24.75', status: 'Delivered' },
];
